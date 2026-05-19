export default function WelcomeScreen({ onStart }) {
  return (
    <div className="w-full max-w-2xl rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl flex flex-col justify-between z-10 relative min-h-[calc(100vh-9rem)]">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#c2dafd] text-4xl shadow-sm">
          ✨
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
          
          <div className="rounded-xl bg-[#c2dafd]/30 p-4 border-2 border-[#c2dafd] text-sm text-slate-800 mt-6 shadow-sm">
            🔒 <strong className="text-slate-900">Privacidad 100% garantizada:</strong> El análisis se procesa en tu dispositivo. Ninguna foto es enviada a internet.
          </div>
        </div>

        <button 
          onClick={onStart}
          className="w-full sm:w-auto rounded-xl bg-[#f7c9f2] px-10 py-4 font-bold text-lg text-slate-800 shadow-md transition-all hover:bg-[#c2dafd] hover:-translate-y-1 cursor-pointer"
        >
          Empezar Test y Encender Cámara
        </button>
      </div>
      <footer className="mt-12 w-full border-t-2 border-[#f7c9f2]/50 pt-6 text-center">
        <p className="text-sm font-bold text-slate-400">
          Desarrollado con ✨ para la comunidad.
        </p>
        <p className="text-xs font-medium text-slate-400/80 mt-1">
          v1.0.0 • IA Local
        </p>
      </footer>

    </div>
  );
}