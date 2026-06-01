import { useState, useEffect, useCallback } from 'react';
import * as faceapi from '@vladmandic/face-api';
// 1. Importamos la función para decirle a TF de dónde bajar WASM
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm'; 

export function useFaceMorphAnalyzer(videoRef) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        // 2. Le decimos que si necesita WASM, lo baje de internet, no del proyecto local
        setWasmPaths('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm/dist/');

        try {
          await faceapi.tf.setBackend('webgl');
          await faceapi.tf.ready();
          console.log("✅ Motor WebGL activado (Rápido)");
        } catch {
          console.warn("⚠️ WebGL no soportado, probando WASM o CPU...");
          
          try {
            // 3. Intentamos usar WASM como plan B antes de usar CPU (es más rápido)
            await faceapi.tf.setBackend('wasm');
            await faceapi.tf.ready();
            console.log("✅ Motor WASM activado (Respaldo)");
          } catch {
             console.warn("⚠️ WASM falló, cambiando a CPU...");
             await faceapi.tf.setBackend('cpu');
             await faceapi.tf.ready();
             console.log("✅ Motor CPU activado (Seguro)");
          }
        }
        
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.ageGenderNet.loadFromUri('/models');
        
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error al cargar IA:", error);
      }
    };
    loadModels();
  }, []);

  const analyzeFace = async () => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    setIsScanning(true);

    setTimeout(async () => {
      try {
        const detections = await faceapi.detectSingleFace(
          videoRef.current, 
          new faceapi.SsdMobilenetv1Options() 
        ).withAgeAndGender();

        if (detections) {
          const isFemale = detections.gender === 'female';
          const femPercentage = isFemale 
            ? Math.round(detections.genderProbability * 100) 
            : Math.round((1 - detections.genderProbability) * 100);
          
          const mascPercentage = 100 - femPercentage;
            
          setResult({
            success: true,
            fem: femPercentage,
            masc: mascPercentage
          });
        } else {
          setResult({
            success: false,
            message: "No detecté un rostro claro. ¡Asegúrate de tener buena luz y mirar de frente!"
          });
        }
      } catch (error) {
        console.error("Error procesando imagen:", error);
        setResult({ success: false, message: "Hubo un error interno al analizar la foto." });
      } finally {
        setIsScanning(false);
      }
    }, 150);
  };

  const startContinuousAnalysis = useCallback((onFrame, intervalMs = 500) => {
    if (!videoRef.current || !isModelLoaded) return () => {};

    const id = setInterval(async () => {
      try {
        const detections = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.SsdMobilenetv1Options()
        ).withAgeAndGender();

        if (detections) {
          const isFemale = detections.gender === 'female';
          const fem = isFemale
            ? Math.round(detections.genderProbability * 100)
            : Math.round((1 - detections.genderProbability) * 100);
          const masc = 100 - fem;
          onFrame({ fem, masc, success: true });
        } else {
          onFrame({ success: false });
        }
      } catch (err) {
        console.error("Error en análisis continuo:", err);
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [videoRef, isModelLoaded]);

  const resetScanner = () => {
    if (videoRef.current) videoRef.current.play();
    setResult(null);
  };

  return { isModelLoaded, result, isScanning, analyzeFace, startContinuousAnalysis, resetScanner };
}