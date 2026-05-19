import { useRef, useEffect, useState } from 'react';
import { useFaceMorphAnalyzer } from '../../hooks/useFaceMorphAnalyzer';
import AnalysisResults from './AnalysisResults';
import FemboySpinner from '../ui/FemboySpinner';

export default function ScannerScreen() {
  const videoRef = useRef(null);
  const { isModelLoaded, result, isScanning, analyzeFace, resetScanner } = useFaceMorphAnalyzer(videoRef);
  
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isModelLoaded && !result) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => { 
          if (videoRef.current) videoRef.current.srcObject = stream; 
        })
        .catch((err) => console.error("Error de cámara:", err));
    }
  }, [isModelLoaded, result]);

  const handleReset = () => {
    setIsResetting(true); 
    
    setTimeout(() => {
      resetScanner();      
      setIsResetting(false); 
    }, 1200); 
  };

  return (
    <div className="w-full max-w-2xl rounded-3xl border-4 border-[#f7c9f2] bg-white p-6 sm:p-10 shadow-xl flex flex-col justify-between z-10 relative min-h-[calc(100vh-6rem)] text-center">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        
        {!isModelLoaded ? (
          <div className="py-12">
            <FemboySpinner text="inicializando IA" />
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-6">
            
            {/* Instrucciones */}
            {!result && !isResetting && (
              <p className="text-slate-600 font-bold">Mira fijamente a la cámara y asegúrate de tener buena luz.</p>
            )}
            {isResetting && (
              <div className="py-10">
                <FemboySpinner text="reiniciando cámara" />
              </div>
            )}
            <div className={`relative w-full max-w-[480px] overflow-hidden rounded-2xl border-4 border-[#c2dafd] bg-slate-100 shadow-md ${(result || isResetting) ? 'hidden' : 'block'}`}>
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline
                className="aspect-[4/3] w-full object-cover -scale-x-100" 
              />
            </div>
            {!result ? (
              isScanning ? (
                <div className="py-4">
                  <FemboySpinner text="Analizando Rostro" />
                </div>
              ) : !isResetting && (
                <button 
                  onClick={analyzeFace}
                  className="w-full sm:w-auto rounded-xl bg-[#f7c9f2] px-10 py-4 font-bold text-lg text-slate-800 shadow-md transition-all hover:bg-[#c2dafd] hover:-translate-y-1 cursor-pointer"
                >
                  📸 Tomar Foto y Escanear
                </button>
              )
            ) : (
              !isResetting && (
                <button 
                  onClick={handleReset}
                  className="w-full sm:w-auto rounded-xl border-2 border-[#c2dafd] bg-white px-8 py-4 font-bold text-lg text-slate-700 transition-colors hover:bg-[#c2dafd]/20 cursor-pointer mb-2"
                >
                  🔄 Intentar con otra foto
                </button>
              )
            )}
            {result && !isResetting && (
              <div className="w-full text-left animate-in zoom-in duration-500">
                {result.success ? (
                  <>
                    <h3 className="text-2xl font-black text-slate-800 text-center mb-2">
                      Resultados del Escáner
                    </h3>
                    <AnalysisResults 
                      femPercentage={result.fem} 
                      mascPercentage={result.masc} 
                    />
                  </>
                ) : (
                  <div className="rounded-2xl border-4 border-red-300 bg-red-50 p-6 text-center mt-4 shadow-sm">
                    <span className="text-4xl block mb-3">🤔</span>
                    <p className="text-lg font-bold text-red-600">
                      {result.message}
                    </p>
                  </div>
                )}
              </div>
            )}
            
          </div>
        )}
      </div>
      <footer className="mt-12 w-full border-t-2 border-[#f7c9f2]/50 pt-6 text-center">
        <p className="text-sm font-bold text-slate-400">
          Asegúrate de no usar gafas oscuras o sombreros para un mejor resultado.
        </p>
      </footer>

    </div>
  );
}