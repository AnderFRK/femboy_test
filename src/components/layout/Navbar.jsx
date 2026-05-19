import { Link } from 'react-router-dom';

export default function Navbar({ onAbrirSettings }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#f7c9f2]/50 bg-[#e0c9f7]/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Femboy<span className="text-pink-500">Test</span>
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-4">
            <Link to="/" className="text-sm font-bold text-slate-800 hover:text-pink-500 transition-colors">
              Inicio
            </Link>
            <Link to="/acerca" className="text-sm font-bold text-slate-800 hover:text-pink-500 transition-colors">
              Acerca de
            </Link>
            <Link to="/donar" className="text-sm font-bold text-slate-800 hover:text-pink-500 transition-colors">
              Donar
            </Link>
          </nav>
          <button
            onClick={onAbrirSettings}
            className="flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-white/60 hover:text-slate-900 transition-all"
            title="Configuración"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
