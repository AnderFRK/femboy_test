import { useState, useEffect } from 'react';
import * as faceapi from '@vladmandic/face-api';

export function useFaceMorphAnalyzer(videoRef) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        // 1. Intentamos usar la Tarjeta Gráfica (WebGL) primero
        try {
          await faceapi.tf.setBackend('webgl');
          await faceapi.tf.ready();
          console.log("✅ Motor WebGL activado (Rápido)");
        } catch (webglError) {
          // 2. Si WebGL falla, atrapamos el error y forzamos el uso del CPU
          console.warn("⚠️ WebGL no soportado, cambiando a CPU...");
          await faceapi.tf.setBackend('cpu');
          await faceapi.tf.ready();
          console.log("✅ Motor CPU activado (Seguro)");
        }
        
        // 3. Cargamos los modelos desde la carpeta public/models
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

    // 1. Pausamos el video y activamos el estado de carga (esto muestra el FemboySpinner)
    videoRef.current.pause();
    setIsScanning(true);
    // Eliminamos el setResult temporal aquí, porque si "result" existe, tu UI oculta la cámara.

    // MEJORA 2: El truco del "Respiro". Retrasamos la IA 150ms para que la UI se renderice fluida.
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
            
          // MEJORA 3: En lugar de un texto, devolvemos un objeto con los datos exactos.
          setResult({
            success: true,
            fem: femPercentage,
            masc: mascPercentage
          });
        } else {
          // Si falla, devolvemos success: false y un mensaje
          setResult({
            success: false,
            message: "No detecté un rostro claro. ¡Asegúrate de tener buena luz y mirar de frente!"
          });
        }
      } catch (error) {
        console.error("Error procesando imagen:", error);
        setResult({ success: false, message: "Hubo un error interno al analizar la foto." });
      } finally {
        // Terminamos el escaneo
        setIsScanning(false);
      }
    }, 150); // 150 milisegundos de respiro para la animación
  };

  const resetScanner = () => {
    videoRef.current.play();
    setResult(null);
  };

  return { isModelLoaded, result, isScanning, analyzeFace, resetScanner };
}