export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 border-t border-[#f7c9f2]/30 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-center gap-6 text-xs text-slate-500">
        <a href="/privacidad" className="hover:text-slate-700 transition-colors">Políticas de Privacidad</a>
        <a href="/terminos" className="hover:text-slate-700 transition-colors">Términos y Condiciones</a>
      </div>
    </footer>
  );
}
