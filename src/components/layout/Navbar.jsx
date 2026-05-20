import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Menu, X, Home, Info, Heart } from 'lucide-react'; 

export default function Navbar({ onAbrirSettings }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#f7c9f2]/50 bg-[#e0c9f7]/70 backdrop-blur-md shadow-sm transition-all">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 relative">
        
        {/* LOGO Y TÍTULO */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleCloseMenu}>
          <img 
            src="/astolfo.png" 
            alt="Logo Astolfo" 
            className="h-10 w-10 object-contain drop-shadow-md"
          />
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Femboy<span className="text-pink-500">Test</span>
          </h1>
        </Link>

        {/* CONTROLES DERECHOS */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* NAVEGACIÓN ESCRITORIO */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-pink-500 transition-colors">
              <Home className="h-4 w-4" /> Inicio
            </Link>
            <Link to="/acerca" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-pink-500 transition-colors">
              <Info className="h-4 w-4" /> Acerca de
            </Link>
            
            {/* BOTÓN DONAR DESTACADO (Pill Button) */}
            <Link 
              to="/donar" 
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 px-4 py-1.5 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg hover:from-pink-500 hover:to-pink-600"
            >
              <Heart className="h-4 w-4 fill-white/20" /> Donar
            </Link>
          </nav>

          {/* LÍNEA DIVISORIA (Solo escritorio) */}
          <div className="hidden sm:block h-6 w-px bg-slate-300/50"></div>

          {/* BOTÓN CONFIGURACIÓN */}
          <button
            onClick={onAbrirSettings}
            className="flex items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-white/60 hover:text-pink-500 transition-all cursor-pointer"
            title="Configuración"
          >
            {/* Ícono súper limpio de Lucide */}
            <Settings className="h-5 w-5 hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* BOTÓN HAMBURGUESA CELULAR */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex sm:hidden items-center justify-center rounded-xl p-2 text-slate-600 hover:bg-white/60 hover:text-pink-500 transition-all"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </div>

      {/* MENÚ DESPLEGABLE CELULAR */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 border-b border-[#f7c9f2]/50 bg-[#e0c9f7]/95 backdrop-blur-xl shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            <Link 
              to="/" 
              onClick={handleCloseMenu}
              className="flex items-center gap-3 text-base font-bold text-slate-700 hover:text-pink-500 hover:bg-white/40 p-3 rounded-xl transition-all"
            >
              <Home className="h-5 w-5" /> Inicio
            </Link>
            <Link 
              to="/acerca" 
              onClick={handleCloseMenu}
              className="flex items-center gap-3 text-base font-bold text-slate-700 hover:text-pink-500 hover:bg-white/40 p-3 rounded-xl transition-all"
            >
              <Info className="h-5 w-5" /> Acerca de
            </Link>
            <div className="pt-2 pb-1">
              <Link 
                to="/donar" 
                onClick={handleCloseMenu}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-pink-500 p-3 text-base font-bold text-white shadow-md transition-all hover:bg-pink-600"
              >
                <Heart className="h-5 w-5" /> Apoyar el proyecto
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}