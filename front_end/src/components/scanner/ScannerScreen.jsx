import { useRef, useEffect } from 'react';
import { useFaceMorphAnalyzer } from '../../hooks/useFaceMorphAnalyzer';

export default function ScannerScreen() {
  const videoRef = useRef(null);
  const { isModelLoaded, result, isScanning, analyzeFace, resetScanner } = useFaceMorphAnalyzer(videoRef);
  useEffect(() => {
    if (isModelLoaded) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => { 
          if (videoRef.current) videoRef.current.srcObject = stream; 
        })
        .catch((err) => console.error("Error de cámara:", err));
    }
  }, [isModelLoaded]);

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-10 shadow-2xl backdrop-blur-sm flex flex-col items-center text-center">
      {!isModelLoaded ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
          <p className="text-xl text-pink-300 font-medium tracking-wide">Cargando motor neuronal...</p>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-6">
          <p className="text-neutral-400 font-medium">Mira fijamente a la cámara y asegúrate de tener buena luz.</p>
          
          <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border-4 border-neutral-800 bg-black shadow-[0_0_40px_-15px_rgba(236,72,153,0.3)]">
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline
              className="aspect-[4/3] w-full object-cover -scale-x-100" 
            />
          </div>

          {!result ? (
            <button 
              onClick={analyzeFace}
              disabled={isScanning}
              className={`group relative w-full sm:w-auto overflow-hidden rounded-xl px-8 py-4 font-bold text-lg text-white shadow-lg transition-all ${
                isScanning ? 'bg-neutral-600 cursor-wait' : 'bg-pink-600 hover:bg-pink-500 hover:-translate-y-1 hover:shadow-pink-500/25 cursor-pointer'
              }`}
            >
              {isScanning ? 'Analizando facciones...' : '📸 Tomar Foto y Escanear'}
            </button>
          ) : (
            <button 
              onClick={resetScanner}
              className="w-full sm:w-auto rounded-xl border border-neutral-600 bg-transparent px-8 py-4 font-bold text-lg text-white transition-colors hover:bg-neutral-800 cursor-pointer"
            >
              🔄 Intentar con otra foto
            </button>
          )}

          {result && (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-6 shadow-inner">
                <p className="text-2xl sm:text-3xl font-black text-pink-200">
                  {result}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}