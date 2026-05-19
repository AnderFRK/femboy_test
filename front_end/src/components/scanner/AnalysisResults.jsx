import { useEffect, useState } from 'react';

export default function AnalysisResults({ femPercentage, mascPercentage }) {
  const [femValue, setFemValue] = useState(0);
  const [mascValue, setMascValue] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const frameRate = 1000 / 60; 
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setFemValue(Math.round(femPercentage * easeOut));
      setMascValue(Math.round(mascPercentage * easeOut));

      if (frame === totalFrames) {
        clearInterval(counter);
        setFemValue(femPercentage);
        setMascValue(mascPercentage);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [femPercentage, mascPercentage]);

  const getDynamicDescription = () => {
    if (femPercentage >= 95) return "¡ALERTA DE IMPOSTOR! ඞ Nivel sospechosamente alto. ¿Seguro que eres un femboy y no una chica biológica encubierta? ¡Muy SUS!";
    if (femPercentage >= 80) return "¡Nivel extremo! 💅 Eres prácticamente la realeza Femboy. Tus facciones son abrumadoramente femeninas y delicadas.";
    if (femPercentage >= 60) return "¡Súper cute! 🌸 Tus facciones se inclinan notablemente hacia lo femenino. Tienes rasgos muy suaves.";
    if (femPercentage >= 40) return "¡Equilibrio andrógino! ⚖️✨ Estás justo en el medio, tienes la mezcla perfecta de ambos mundos.";
    if (femPercentage >= 20) return "Tus facciones tienen una estructura más marcada y se inclinan más hacia lo masculino. 🔹💪";
    return "¡Full Masculino! 🗿 Tus rasgos geométricos son súper definidos y tradicionales.";
  };

  // segun el porcentaje definira la imagen final.
  const getFinalImage = () => {
    if (femPercentage >= 95) return "/sus.gif";
    if (femPercentage > mascPercentage) return "/kissingboy.gif";
    return "/gigachad.jpg";
  };

  return (
    <div className="w-full mt-6 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* --- BARRA FEMENINA --- */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-bold px-2">
          <span className="text-pink-500">Nivel Femenino</span>
          <span className="text-pink-500 text-lg">{femValue}%</span>
        </div>
        
        <div className="relative h-8 w-full rounded-full bg-[#f7c9f2]/30 shadow-inner border-2 border-[#f7c9f2]">
          <div 
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#f7c9f2] to-pink-500 transition-all duration-[2500ms] ease-out"
            style={{ width: `${femValue}%` }}
          >
            <img 
              src="/tomoko.png" 
              alt="Femenino" 
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 max-w-none rounded-full border-2 border-white shadow-lg bg-white object-cover z-10"
            />
          </div>
        </div>
      </div>

      {/* --- BARRA MASCULINA --- */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm font-bold px-2">
          <span className="text-[#c2dafd] text-slate-700">Nivel Masculino</span>
          <span className="text-slate-700 text-lg">{mascValue}%</span>
        </div>
        
        <div className="relative h-8 w-full rounded-full bg-[#c2dafd]/30 shadow-inner border-2 border-[#c2dafd]">
          <div 
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#c2dafd] to-blue-400 transition-all duration-[2500ms] ease-out"
            style={{ width: `${mascValue}%` }}
          >
            <img 
              src="/gigachad.jpg" 
              alt="Masculino" 
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 max-w-none rounded-full border-2 border-white shadow-lg bg-white object-cover z-10"
            />
          </div>
        </div>
      </div>

      {/* --- DESCRIPCIÓN DINÁMICA --- */}
      <div className={`mt-4 rounded-2xl border-2 p-5 shadow-sm transition-colors duration-1000 ${
        femPercentage >= 95 ? "bg-red-500/10 border-red-500" : "bg-slate-50 border-[#e0c9f7]"
      }`}>
        <p className={`font-bold text-lg leading-relaxed text-center ${
          femPercentage >= 95 ? "text-red-600 animate-pulse" : "text-slate-800"
        }`}>
          {getDynamicDescription()}
        </p>
      </div>

      {/* --- IMAGEN DINÁMICA FINAL --- */}
      <div className="flex justify-center mt-2 animate-in zoom-in duration-700 delay-500">
        <img 
          src={getFinalImage()} 
          alt="Resultado visual" 
          className="h-40 w-auto rounded-2xl shadow-md border-4 border-white object-cover"
        />
      </div>

    </div>
  );
}