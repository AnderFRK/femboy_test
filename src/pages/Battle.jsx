import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserIdentity from '../hooks/useUserIdentity';
import { useFaceMorphAnalyzer } from '../hooks/useFaceMorphAnalyzer';
import useBattle from '../hooks/useBattle';
import WaitingRoom from '../components/battle/WaitingRoom';
import BattleArena from '../components/battle/BattleArena';
import BattleResults from '../components/battle/BattleResults';

export default function Battle() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { usuario } = useUserIdentity();
  const { isModelLoaded, startContinuousAnalysis } = useFaceMorphAnalyzer(videoRef);

  const battle = useBattle({
    localId: usuario?.id,
    nickname: usuario?.nickname,
    videoRef,
    startContinuousAnalysis,
  });

  const handleFindMatch = () => {
    if (!isModelLoaded) return;
    battle.findMatch();
  };

  const handleHome = () => navigate('/');

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      {battle.phase === 'idle' && (
        <div className="text-center animate-in fade-in duration-500">
          <div className="rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl max-w-md mx-auto">
            {!isModelLoaded ? (
              <div className="py-12">
                <div className="h-12 w-12 mx-auto animate-spin rounded-full border-4 border-[#f7c9f2] border-t-pink-500 mb-4" />
                <p className="text-slate-600 font-bold">Preparando IA para la batalla...</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-6xl">⚔️</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">Batalla 1vs1</h2>
                <p className="text-slate-600 font-medium mb-6">
                  Enfréntate a otro usuario en una batalla de 45 segundos.
                  Quien tenga el mayor porcentaje de rasgos femeninos gana.
                </p>
                <div className="bg-slate-50 border-2 border-slate-100 rounded-xl p-4 mb-8 text-sm text-slate-600 text-left space-y-2">
                  <p>📷 <strong>Cámara</strong> — Ambos se verán en vivo</p>
                  <p>⏱ <strong>Temporizador</strong> — 45 segundos de análisis continuo</p>
                  <p>🏆 <strong>Gana</strong> — El de mayor % femenino al final</p>
                </div>
                <button
                  onClick={handleFindMatch}
                  className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#f7c9f2] to-pink-400 px-10 py-4 font-bold text-lg text-white shadow-md transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                >
                  ⚔ Iniciar Batalla
                </button>
              </>
            )}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleHome}
              className="text-sm text-slate-500 hover:text-pink-500 transition-colors cursor-pointer"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      )}

      {battle.phase === 'searching' && (
        <WaitingRoom onCancel={() => { battle.cancelMatchmaking(); handleHome(); }} />
      )}

      {(battle.phase === 'connecting' || battle.phase === 'inProgress') && (
        <BattleArena
          phase={battle.phase}
          timer={battle.timer}
          myFem={battle.myFem}
          oppFem={battle.oppFem}
          opponent={battle.opponent}
          remoteStream={battle.remoteStream}
          videoRef={videoRef}
          onLeave={() => { battle.cleanup(); handleHome(); }}
        />
      )}

      {battle.phase === 'completed' && (
        <BattleResults
          winner={battle.winner}
          myFem={battle.myAvgFem}
          oppFem={battle.oppAvgFem}
          opponent={battle.opponent}
          onRematch={() => { battle.cleanup(); handleFindMatch(); }}
          onHome={() => { battle.cleanup(); handleHome(); }}
        />
      )}
    </div>
  );
}
