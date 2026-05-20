import { useEffect, useState } from 'react';
import { Zap, Sparkles } from 'lucide-react'; 

export default function ProgressBar({ percentage }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWidth(percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div className="w-full max-w-md mx-auto mt-6 flex flex-col gap-2">
      
      <div className="flex justify-between text-sm font-bold px-1">
        
        <div className="flex items-center gap-1.5 text-[#c2dafd] drop-shadow-sm">
          <Zap className="h-4 w-4" />
          <span>Masculino</span>
        </div>
        <div className="flex items-center gap-1.5 text-pink-500 drop-shadow-sm">
          <span>Femenino</span>
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      <div className="relative h-10 w-full rounded-full bg-[#c2dafd]/30 overflow-hidden shadow-inner border-2 border-[#e0c9f7]">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#f7c9f2] to-pink-400 transition-all duration-1000 ease-out flex items-center justify-end px-3"
          style={{ width: `${width}%` }}
        >
          <span className="text-white font-black text-lg drop-shadow-md">
            {width}%
          </span>
        </div>
      </div>
      <p className="text-center text-slate-700 font-bold mt-2">
        {width >= 50 
          ? "✨ Tus facciones tienen una fuerte inclinación femenina." 
          : "🔹 Tus facciones tienen una inclinación más masculina."}
      </p>
    </div>
  );
}