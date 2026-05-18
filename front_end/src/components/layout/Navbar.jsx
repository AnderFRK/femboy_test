export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-500/20 bg-neutral-900/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">✨</span>
          <h1 className="text-xl font-extrabold tracking-tight text-white">
            Femboy<span className="text-pink-400">Test</span>
          </h1>
        </div>
        <nav className="hidden sm:flex gap-4">
          <a href="#" className="text-sm font-medium text-neutral-300 hover:text-pink-400 transition-colors">
            Inicio
          </a>
          <a href="#" className="text-sm font-medium text-neutral-300 hover:text-pink-400 transition-colors">
            Acerca de
          </a>
        </nav>
      </div>
    </header>
  );
}