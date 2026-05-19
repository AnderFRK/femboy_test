export default function FemboySpinner({ text = "cargando" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-10 animate-in fade-in duration-500">
      <div className="relative">
        <img 
          src="/kissingboy.gif" 
          alt="Cargando..." 
          className="h-24 w-24 rounded-full border-4 border-[#f7c9f2] bg-white object-cover shadow-lg animate-spin"
          style={{ animationDuration: '2s' }}
        />
        <span className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</span>
      </div>

      <p className="text-2xl font-black text-slate-950 tracking-wide flex items-center">
        {text}
        <span className="animate-dots text-pink-500 ml-1"></span>
      </p>
    </div>
  );
}