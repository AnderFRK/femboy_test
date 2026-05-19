import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#f7c9f2]/50 bg-[#e0c9f7]/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Femboy<span className="text-pink-500">Test</span>
          </h1>
        </Link>

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
      </div>
    </header>
  );
}