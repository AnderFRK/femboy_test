import { Info, Users, Sparkles } from 'lucide-react';

const AVATAR_VICTOR = "https://github.com/victovictorio00.png";
const AVATAR_FRANK = "https://github.com/AnderFRK.png";

export default function About() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4 pb-12">
      <div className="rounded-3xl border-4 border-[#f7c9f2] bg-white p-8 sm:p-12 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 text-center relative overflow-hidden">
        
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-pink-100/50 blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-32 w-32 rounded-full bg-blue-100/50 blur-2xl pointer-events-none"></div>

        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 shadow-sm relative z-10">
          <Info className="h-10 w-10 text-pink-500" />
        </div>

        <h2 className="mb-6 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 relative z-10">
          Sobre <span className="text-pink-500">Nosotros</span>
        </h2>
        <p className="text-slate-600 text-lg font-medium mb-10 leading-relaxed bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 shadow-sm relative z-10">
          Somos un equipo pequeño de 2 personas que no teníamos nada que hacer y creamos este proyecto para perder el tiempo.
        </p>
        <div className="mb-10 relative z-10">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Users className="h-6 w-6 text-[#c2dafd]" />
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">El Equipo</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-white border-2 border-pink-100 p-6 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
              
              <div className="h-20 w-20 rounded-full border-4 border-white shadow-md overflow-hidden mb-4 group-hover:scale-110 group-hover:border-pink-200 transition-all duration-300 bg-slate-100">
                <img 
                  src={AVATAR_VICTOR} 
                  alt="GitHub Ploman (Victor)" 
                  className="h-full w-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.backgroundColor = '#fbcfe8'; }}
                />
              </div>

              <span className="font-black text-xl text-slate-800 tracking-tight">Ploman</span>
              <span className="text-sm font-bold text-pink-500">(Victor)</span>
              
              <a 
                href="https://github.com/victovictorio00" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                @victovictorio00
              </a>
            </div>
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 p-6 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
              <div className="h-20 w-20 rounded-full border-4 border-white shadow-md overflow-hidden mb-4 group-hover:scale-110 group-hover:border-blue-200 transition-all duration-300 bg-slate-100">
                <img 
                  src={AVATAR_FRANK} 
                  alt="GitHub AnderFRK (Frank)" 
                  className="h-full w-full object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.style.backgroundColor = '#bfdbfe'; }}
                />
              </div>

              <span className="font-black text-xl text-slate-800 tracking-tight">AnderFRK</span>
              <span className="text-sm font-bold text-blue-500">(Frank)</span>

              <a 
                href="https://github.com/AnderFRK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                @AnderFRK
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t-2 border-slate-100 pt-8 relative z-10">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-400 bg-slate-50 py-3 px-4 rounded-xl w-fit mx-auto border border-slate-100 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>Pronto tal vez agreguemos más información o redes sociales...</span>
          </div>
        </div>

      </div>
    </div>
  );
}