import { useState, useRef, useCallback } from 'react';
import { supabase } from '../supabase';

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

const BATTLE_DURATION = 45;

export default function useBattle({ localId, nickname, videoRef, startContinuousAnalysis }) {
  const [phase, setPhase] = useState('idle');
  const [opponent, setOpponent] = useState(null);
  const [timer, setTimer] = useState(BATTLE_DURATION);
  const [myFem, setMyFem] = useState(0);
  const [oppFem, setOppFem] = useState(0);
  const [remoteStream, setRemoteStream] = useState(null);
  const [winner, setWinner] = useState(null);
  const [myAvgFem, setMyAvgFem] = useState(0);
  const [oppAvgFem, setOppAvgFem] = useState(0);
  const [isHost, setIsHost] = useState(false);

  const r = useRef({
    battleId: null,
    channel: null,
    pc: null,
    localStream: null,
    cleanupAnalysis: null,
    cleanupTimer: null,
    myScores: [],
    oppScores: [],
    ended: false,
  });

  const cleanup = useCallback(() => {
    const s = r.current;
    s.ended = true;
    s.cleanupAnalysis?.();
    s.cleanupTimer?.();
    s.localStream?.getTracks().forEach(t => t.stop());
    s.pc?.close();
    s.channel?.unsubscribe();
    supabase.from('battle_queue').delete().eq('local_id', localId);
    setPhase('idle');
    setOpponent(null);
    setRemoteStream(null);
    setWinner(null);
    setMyFem(0);
    setOppFem(0);
    setMyAvgFem(0);
    setOppAvgFem(0);
    s.myScores = [];
    s.oppScores = [];
    s.battleId = null;
    s.channel = null;
    s.pc = null;
    s.localStream = null;
  }, [localId]);

  const finishBattle = useCallback(() => {
    const s = r.current;
    if (s.ended) return;
    s.ended = true;
    s.cleanupAnalysis?.();
    s.cleanupTimer?.();

    const myAvg = Math.round(s.myScores.reduce((a, b) => a + b, 0) / Math.max(s.myScores.length, 1));
    const oppAvg = Math.round(s.oppScores.reduce((a, b) => a + b, 0) / Math.max(s.oppScores.length, 1));
    setMyAvgFem(myAvg);
    setOppAvgFem(oppAvg);

    if (isHost && s.channel) {
      s.channel.send({
        type: 'broadcast',
        event: 'battle_end',
        payload: { myAvg },
      });
    }

    if (myAvg > oppAvg) setWinner('me');
    else if (oppAvg > myAvg) setWinner('opponent');
    else setWinner('tie');

    setPhase('completed');
  }, [isHost]);

  const startBattle = useCallback(() => {
    const s = r.current;
    if (!s.channel || !videoRef?.current) return;

    setPhase('inProgress');
    setTimer(BATTLE_DURATION);
    s.myScores = [];
    s.oppScores = [];
    s.ended = false;

    s.cleanupAnalysis = startContinuousAnalysis((result) => {
      if (result.success && s.channel && !s.ended) {
        s.myScores.push(result.fem);
        setMyFem(result.fem);
        s.channel.send({
          type: 'broadcast',
          event: 'score',
          payload: { fem: result.fem },
        });
      }
    }, 500);

    let remaining = BATTLE_DURATION;
    s.cleanupTimer = setInterval(() => {
      remaining--;
      setTimer(remaining);
      if (isHost && s.channel) {
        s.channel.send({
          type: 'broadcast',
          event: 'timer',
          payload: { remaining },
        });
      }
      if (remaining <= 0) finishBattle();
    }, 1000);
  }, [videoRef, startContinuousAnalysis, isHost, finishBattle]);

  const initChannel = useCallback(async (battleId, host) => {
    const s = r.current;
    s.battleId = battleId;

    let localStream;
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      s.localStream = localStream;
      if (videoRef?.current) videoRef.current.srcObject = localStream;
    } catch {
      setPhase('idle');
      return;
    }

    const channel = supabase.channel(`battle:${battleId}`);
    s.channel = channel;

    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    s.pc = pc;
    localStream.getTracks().forEach(t => pc.addTrack(t, localStream));

    pc.ontrack = (e) => setRemoteStream(e.streams[0]);

    channel.on('broadcast', { event: 'signal' }, async ({ payload }) => {
      try {
        if (payload.type === 'offer') {
          await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload.sdp }));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          channel.send({ type: 'broadcast', event: 'signal', payload: { type: 'answer', sdp: answer.sdp } });
        } else if (payload.type === 'answer') {
          await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload.sdp }));
        } else if (payload.type === 'ice') {
          await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
        }
      } catch { /* ignore signaling errors */ }
    });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        channel.send({ type: 'broadcast', event: 'signal', payload: { type: 'ice', candidate: e.candidate.toJSON() } });
      }
    };

    channel.on('broadcast', { event: 'score' }, ({ payload }) => {
      if (!s.ended) {
        s.oppScores.push(payload.fem);
        setOppFem(payload.fem);
      }
    });

    channel.on('broadcast', { event: 'timer' }, ({ payload }) => {
      if (payload.remaining <= 0) finishBattle();
      else setTimer(payload.remaining);
    });

    channel.on('broadcast', { event: 'battle_end' }, ({ payload }) => {
      if (s.ended) return;
      s.ended = true;
      s.cleanupAnalysis?.();
      s.cleanupTimer?.();

      const myAvg = Math.round(s.myScores.reduce((a, b) => a + b, 0) / Math.max(s.myScores.length, 1));
      const oppAvg = Math.round(payload.myAvg);
      setMyAvgFem(myAvg);
      setOppAvgFem(oppAvg);

      if (myAvg > oppAvg) setWinner('me');
      else if (oppAvg > myAvg) setWinner('opponent');
      else setWinner('tie');

      setPhase('completed');
    });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        if (host) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          channel.send({ type: 'broadcast', event: 'signal', payload: { type: 'offer', sdp: offer.sdp } });
        }
        setTimeout(() => startBattle(), 3000);
      }
    });
  }, [videoRef, startBattle, finishBattle]);

  const findMatch = useCallback(async () => {
    setPhase('searching');

    try {
      await supabase.from('battle_queue').delete().eq('local_id', localId);
    } catch { /* ignore cleanup errors */ }

    const { data: waiting } = await supabase
      .from('battle_queue')
      .select('id, local_id, nickname')
      .eq('status', 'waiting')
      .order('created_at', { ascending: true })
      .limit(1);

    if (waiting?.length) {
      const opp = waiting[0];
      const { data: claimed } = await supabase
        .from('battle_queue')
        .update({ status: 'matched', matched_with: localId, matched_nickname: nickname })
        .eq('id', opp.id)
        .eq('status', 'waiting')
        .select();

      if (claimed?.length) {
        setPhase('connecting');
        setOpponent({ localId: opp.local_id, nickname: opp.nickname });
        setIsHost(false);
        initChannel(opp.id, false);
        return;
      }
    }

    const { data: me } = await supabase
      .from('battle_queue')
      .insert({ local_id: localId, nickname, status: 'waiting' })
      .select()
      .single();

    if (!me) { setPhase('idle'); return; }

    const sub = supabase
      .channel(`bq:${me.id}`)
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'battle_queue', filter: `id=eq.${me.id}` },
        (payload) => {
          if (payload.new.status === 'matched') {
            sub.unsubscribe();
            setPhase('connecting');
            setOpponent({ localId: payload.new.matched_with, nickname: payload.new.matched_nickname });
            setIsHost(true);
            initChannel(me.id, true);
          }
        }
      )
      .subscribe();

    r.current._sub = sub;
    r.current._battleId = me.id;
  }, [localId, nickname, initChannel]);

  const cancelMatchmaking = useCallback(() => {
    const s = r.current;
    s._sub?.unsubscribe();
    if (s._battleId) {
      supabase.from('battle_queue').delete().eq('id', s._battleId);
    }
    setPhase('idle');
  }, []);

  return {
    phase, opponent, timer, myFem, oppFem, myAvgFem, oppAvgFem, remoteStream, winner, isHost,
    findMatch, cancelMatchmaking, cleanup,
    BATTLE_DURATION,
  };
}
