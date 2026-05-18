import { useState, useEffect } from 'react';
import * as faceapi from '@vladmandic/face-api';

export function useFaceMorphAnalyzer(videoRef) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [result, setResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.tf.setBackend('cpu');
        await faceapi.tf.ready();
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
    setResult("Procesando proporciones faciales con alta precisión...");

    // CAMBIO 2: Usamos las opciones del modelo SSD para escanear la foto
    const detections = await faceapi.detectSingleFace(
      videoRef.current, 
      new faceapi.SsdMobilenetv1Options() 
    ).withAgeAndGender();

    if (detections) {
      const isFemale = detections.gender === 'female';
      const percentage = isFemale 
        ? Math.round(detections.genderProbability * 100) 
        : Math.round((1 - detections.genderProbability) * 100);
        
      setResult(`Tienes un ${percentage}% de facciones femeninas`);
    } else {
      setResult("No se detectó un rostro claro. Asegúrate de tener buena iluminación y mirar de frente.");
    }
    
    setIsScanning(false);
  };

  const resetScanner = () => {
    videoRef.current.play();
    setResult(null);
  };

  return { isModelLoaded, result, isScanning, analyzeFace, resetScanner };
}