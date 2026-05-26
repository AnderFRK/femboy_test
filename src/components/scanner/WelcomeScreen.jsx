import { ShieldCheck, Sparkles, Swords } from 'lucide-react';

export default function WelcomeScreen({ onStart, onBattle }) {
  return (
    <div className="w-full max-w-2xl rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl flex flex-col justify-between z-10 relative min-h-[calc(100vh-6rem)]">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-6 animate-in zoom-in duration-500">
          <img 
            src="/astolfo.png" 
            alt="Logo FemboyTest" 
            className="h-28 w-28 object-contain drop-shadow-xl"
          />
        </div>
        
        <h2 className="mb-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
          Femboy<span className="text-pink-500">Test</span>
        </h2>
        
        <div className="mb-8 space-y-4 text-slate-700 text-lg font-medium">
          <p>
            ¿Alguna vez te has preguntado qué porcentaje de tus facciones se inclinan hacia lo femenino?
          </p>
          <p>
            Este escáner utiliza Inteligencia Artificial para analizar las proporciones geométricas de tu rostro.
          </p>
          
          <div className="flex items-center justify-center gap-3 rounded-xl bg-[#c2dafd]/30 p-4 border-2 border-[#c2dafd] text-sm text-slate-800 mt-6 shadow-sm text-left">
            <div className="shrink-0 text-slate-700 bg-white p-2 rounded-full shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <p>
              <strong className="text-slate-900">Privacidad 100% garantizada:</strong> El análisis se procesa en tu dispositivo. Ninguna foto es enviada a internet.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onStart}
            className="rounded-xl bg-[#f7c9f2] px-10 py-4 font-bold text-lg text-slate-800 shadow-md transition-all hover:bg-[#c2dafd] hover:-translate-y-1 cursor-pointer"
          >
            📷 Empezar Test
          </button>

          {onBattle && (
            <button
              onClick={onBattle}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-4 font-bold text-lg text-white shadow-md transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <Swords className="h-5 w-5" />
              Batalla 1vs1
            </button>
          )}
        </div>
      </div>

      <footer className="mt-12 w-full border-t-2 border-[#f7c9f2]/50 pt-6 text-center">
        <p className="text-sm font-bold text-slate-400 flex items-center justify-center gap-1.5">
          Desarrollado con 
          <Sparkles className="h-4 w-4 text-pink-400" /> 
          para la comunidad.
        </p>
        <p className="text-xs font-medium text-slate-400/80 mt-1">
          v1.0.0 • IA Local
        </p>
      </footer>

    </div>
  );
}