export default function Navbar() {
  return (
    // Cambiamos sticky por fixed, y añadimos left-0 y right-0
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#f7c9f2]/50 bg-[#e0c9f7]/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Femboy<span className="text-pink-500">Test</span>
          </h1>
        </div>

        <nav className="hidden sm:flex gap-4">
          <a href="#" className="text-sm font-bold text-slate-800 hover:text-pink-500 transition-colors">
            Inicio
          </a>
          <a href="#" className="text-sm font-bold text-slate-800 hover:text-pink-500 transition-colors">
            Acerca de
          </a>
        </nav>
      </div>
    </header>
  );
}