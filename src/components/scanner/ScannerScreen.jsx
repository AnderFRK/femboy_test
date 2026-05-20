import { useRef, useEffect, useState, useCallback } from 'react';
import { Camera, RefreshCw } from 'lucide-react'; // <-- Agregamos los iconos aquí
import { useFaceMorphAnalyzer } from '../../hooks/useFaceMorphAnalyzer';
import useUserIdentity from '../../hooks/useUserIdentity';
import useAnalysisHistory from '../../hooks/useAnalysisHistory';
import AnalysisResults from './AnalysisResults';
import FemboySpinner from '../ui/FemboySpinner';

function getResultDescription(femPercentage) {
  if (femPercentage >= 95) return '¡ALERTA DE IMPOSTOR! ඞ Nivel sospechosamente alto.';
  if (femPercentage >= 80) return '¡Nivel extremo! 💅 Eres prácticamente la realeza Femboy.';
  if (femPercentage >= 60) return '¡Súper cute! 🌸 Tus facciones se inclinan hacia lo femenino.';
  if (femPercentage >= 40) return '¡Equilibrio andrógino! ⚖️✨';
  if (femPercentage >= 20) return 'Tus facciones se inclinan más hacia lo masculino. 🔹';
  return '¡Full Masculino! 🗿';
}

function getResultImage(femPercentage, mascPercentage) {
  if (femPercentage >= 95) return '/sus.gif';
  if (femPercentage > mascPercentage) return '/kissingboy.gif';
  return '/gigachad.jpg';
}

export default function ScannerScreen() {
  const videoRef = useRef(null);
  const { isModelLoaded, result, isScanning, analyzeFace, resetScanner } = useFaceMorphAnalyzer(videoRef);
  const { usuario } = useUserIdentity();
  const { guardarAnalisis } = useAnalysisHistory();
  
  const [isResetting, setIsResetting] = useState(false);
  const analisisGuardadoRef = useRef(false);

  useEffect(() => {
    if (result?.success && usuario?.id && !analisisGuardadoRef.current) {
      analisisGuardadoRef.current = true;
      guardarAnalisis(usuario.id, {
        femPercentage: result.fem,
        mascPercentage: result.masc,
        success: true,
        description: getResultDescription(result.fem),
        resultImage: getResultImage(result.fem, result.masc),
        supabaseUserId: usuario.supabaseUserId || null,
      });
    }
    if (result && !result.success) {
      analisisGuardadoRef.current = true;
    }
  }, [result, usuario.id, guardarAnalisis]);

  const handleReset = () => {
    setIsResetting(true);
    analisisGuardadoRef.current = false;
    setTimeout(() => {
      resetScanner();      
      setIsResetting(false); 
    }, 1200); 
  };

  useEffect(() => {
    if (isModelLoaded && !result) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => { 
          if (videoRef.current) videoRef.current.srcObject = stream; 
        })
        .catch((err) => console.error("Error de cámara:", err));
    }
  }, [isModelLoaded, result]);

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
                  // Le agregamos flex y gap para alinear el icono con el texto
                  className="w-full sm:w-auto rounded-xl bg-[#f7c9f2] px-10 py-4 font-bold text-lg text-slate-800 shadow-md transition-all hover:bg-[#c2dafd] hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Camera className="h-5 w-5" />
                  Tomar Foto y Escanear
                </button>
              )
            ) : (
              !isResetting && (
                <button 
                  onClick={handleReset}
                  // Le agregamos flex y gap para alinear el icono con el texto
                  className="w-full sm:w-auto rounded-xl border-2 border-[#c2dafd] bg-white px-8 py-4 font-bold text-lg text-slate-700 transition-colors hover:bg-[#c2dafd]/20 cursor-pointer mb-2 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-5 w-5 text-[#c2dafd]" />
                  Intentar con otra foto
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
                    <span className="text-4xl block mb-3">Hmmmm...?</span>
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