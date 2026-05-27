import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords, ArrowLeft, Camera, Timer, Trophy } from 'lucide-react';
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
          <div className="rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl max-w-md mx-auto relative overflow-hidden">
            
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-pink-100/50 blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-32 w-32 rounded-full bg-blue-100/50 blur-2xl pointer-events-none"></div>

            {!isModelLoaded ? (
              <div className="py-12 relative z-10">
                <div className="h-12 w-12 mx-auto animate-spin rounded-full border-4 border-[#f7c9f2] border-t-pink-500 mb-4 shadow-sm" />
                <p className="text-slate-600 font-bold">Preparando IA para la batalla...</p>
              </div>
            ) : (
              <div className="relative z-10">
                
                {/* LA IMAGEN PVP CON EFECTO DE ZOOM Y FLOTACIÓN */}
                <div className="mb-6 flex justify-center animate-in zoom-in duration-700">
                  <div className="relative group animate-[bounce_3s_ease-in-out_infinite]">
                    <div className="absolute inset-0 rounded-full bg-pink-400 opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500"></div>
                    
                    {/* CONTENEDOR CÍRCULO QUE HACE EL RECORTE */}
                    <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-[#f7c9f2] bg-pink-50 shadow-lg overflow-hidden z-10">
                      <img 
                        src="/pvp.png" 
                        alt="PVP Battle" 
                        className="h-full w-full object-cover object-top scale-[1.6] translate-y-3"
                      />
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Batalla <span className="text-pink-500">1vs1</span></h2>
                <p className="text-slate-600 font-medium mb-6 leading-relaxed">
                  Enfréntate a otro usuario en una batalla en vivo. Quien tenga el mayor porcentaje de rasgos femeninos tras 45 segundos, gana.
                </p>

                {/* REGLAS ESTILIZADAS CON ICONOS */}
                <div className="bg-slate-50 border-2 border-[#e0c9f7] rounded-2xl p-5 mb-8 text-sm text-slate-700 text-left space-y-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Camera className="h-4 w-4" /></div>
                    <p><strong>Cámara:</strong> Ambos se verán en tiempo real.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg text-amber-600"><Timer className="h-4 w-4" /></div>
                    <p><strong>Tiempo:</strong> 45 segundos de análisis continuo.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-100 rounded-lg text-pink-600"><Trophy className="h-4 w-4" /></div>
                    <p><strong>Victoria:</strong> El de mayor % femenino al final.</p>
                  </div>
                </div>

                {/* BOTÓN INICIAR BATALLA */}
                <button
                  onClick={handleFindMatch}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-10 py-4 font-black text-lg text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] active:scale-95 cursor-pointer mx-auto"
                >
                  <Swords className="h-6 w-6" />
                  Buscar Oponente
                </button>
              </div>
            )}
          </div>

          {/* BOTÓN VOLVER (Fuera de la tarjeta blanca) */}
          <div className="mt-6 text-center">
            <button
              onClick={handleHome}
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-pink-500 transition-colors cursor-pointer bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-slate-200/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
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