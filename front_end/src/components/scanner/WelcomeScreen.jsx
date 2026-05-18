export default function WelcomeScreen({ onStart }) {
  return (
    <div className="w-full max-w-2xl rounded-3xl border border-neutral-800 bg-neutral-900/50 p-8 sm:p-12 shadow-2xl backdrop-blur-sm text-center">
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-pink-500/20 text-4xl">
        ✨
      </div>
      <h2 className="mb-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
        Femboy<span className="text-pink-400">Test</span>
      </h2>
      
      <div className="mb-8 space-y-4 text-neutral-300 text-lg">
        <p>
          ¿Alguna vez te has preguntado qué porcentaje de tus facciones se inclinan hacia lo femenino?
        </p>
        <p>
          Este escáner utiliza Inteligencia Artificial (Redes Neuronales de Visión Computacional) para analizar las proporciones geométricas de tu rostro.
        </p>
        <div className="rounded-xl bg-black/30 p-4 border border-neutral-800 text-sm text-neutral-400 mt-6">
          🔒 <strong className="text-pink-300">Privacidad 100% garantizada:</strong> El análisis se procesa directamente en tu dispositivo. Ninguna foto es enviada a servidores externos.
        </div>
      </div>

      <button 
        onClick={onStart}
        className="w-full sm:w-auto rounded-xl bg-pink-600 px-10 py-4 font-bold text-lg text-white shadow-lg transition-all hover:bg-pink-500 hover:-translate-y-1 hover:shadow-pink-500/25 cursor-pointer"
      >
        Empezar Test y Encender Cámara
      </button>
    </div>
  );
}