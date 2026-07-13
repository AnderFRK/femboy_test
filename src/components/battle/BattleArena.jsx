import { useEffect, useRef, useState } from 'react';
import { PhoneOff } from 'lucide-react';
import FemboySpinner from '../ui/FemboySpinner';

export default function BattleArena({
  timer,
  myFem,
  oppFem,
  opponent,
  remoteStream,
  videoRef,
  onLeave,
  phase,
}) {
  const remoteVideoRef = useRef(null);
  const [remoteVideoReady, setRemoteVideoReady] = useState(false);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
      setRemoteVideoReady(true);
    } else {
      setRemoteVideoReady(false);
    }
  }, [remoteStream]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-4">
        <div className={`inline-block rounded-full px-6 py-2 font-black text-2xl tracking-widest shadow-lg ${
          timer <= 10 ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-slate-800 border-4 border-[#f7c9f2]'
        }`}>
          {timeStr}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* LOCAL PLAYER */}
        <div className="rounded-3xl border-4 border-[#f7c9f2] bg-white overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-[#f7c9f2] to-pink-300 px-4 py-2 text-center">
            <h3 className="font-black text-slate-800 text-lg">TÚ</h3>
          </div>
          <div className="aspect-[4/3] bg-slate-900 relative">
            {phase === 'connecting' ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <FemboySpinner text="iniciando" />
              </div>
            ) : null}
            <video
              ref={videoRef}
              autoPlay muted playsInline
              className="h-full w-full object-cover -scale-x-100"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-pink-500">Nivel Femenino</span>
              <span className="text-lg font-black text-pink-500">{myFem}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-[#f7c9f2]/30 border border-[#f7c9f2] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f7c9f2] to-pink-500 transition-all duration-300 ease-out"
                style={{ width: `${myFem}%` }}
              />
            </div>
          </div>
        </div>

        {/* OPPONENT */}
        <div className="rounded-3xl border-4 border-[#c2dafd] bg-white overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-[#c2dafd] to-blue-300 px-4 py-2 text-center">
            <h3 className="font-black text-slate-800 text-lg">{opponent?.nickname || 'Rival'}</h3>
          </div>
          <div className="aspect-[4/3] bg-slate-900 relative flex items-center justify-center">
            {!remoteStream ? (
              <div className="flex flex-col items-center gap-2 text-white/80">
                <FemboySpinner text="conectando video" />
                <span className="text-xs font-medium">Esperando cámara del rival...</span>
              </div>
            ) : !remoteVideoReady ? (
              <div className="flex flex-col items-center gap-2 text-white/80">
                <FemboySpinner text="cargando video" />
              </div>
            ) : null}
            <video
              ref={remoteVideoRef}
              autoPlay muted playsInline
              className={`h-full w-full object-cover ${!remoteStream ? 'hidden' : ''}`}
              onLoadedData={() => setRemoteVideoReady(true)}
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold text-slate-700">Nivel Femenino</span>
              <span className="text-lg font-black text-slate-700">{oppFem}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-[#c2dafd]/30 border border-[#c2dafd] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#c2dafd] to-blue-400 transition-all duration-300 ease-out"
                style={{ width: `${oppFem}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onLeave}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-red-200 bg-white px-6 py-3 font-bold text-red-500 hover:bg-red-50 transition-all cursor-pointer"
        >
          <PhoneOff className="h-5 w-5" />
          Abandonar batalla
        </button>
      </div>
    </div>
  );
}
