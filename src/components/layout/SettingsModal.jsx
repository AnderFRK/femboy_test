import { useState } from 'react';

export default function SettingsModal({ abierto, onCerrar, usuario, esAnonimo, onCerrarSesion, onActualizarNickname, onAbrirLogin }) {
  const [editandoNick, setEditandoNick] = useState(false);
  const [nickInput, setNickInput] = useState(usuario.nickname);

  if (!abierto) return null;

  function guardarNick() {
    if (nickInput.trim()) {
      onActualizarNickname(nickInput.trim());
    }
    setEditandoNick(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onCerrar}>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Configuración</h2>
          <button onClick={onCerrar} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <section className="mb-5">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cuenta</h3>
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-2">
            {esAnonimo ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Estado</span>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Anónimo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Nickname</span>
                  {editandoNick ? (
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={nickInput}
                        onChange={(e) => setNickInput(e.target.value)}
                        className="w-28 rounded-lg border border-slate-200 px-2 py-0.5 text-xs outline-none focus:border-pink-300"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && guardarNick()}
                      />
                      <button onClick={guardarNick} className="text-xs text-pink-500 font-semibold hover:text-pink-700">OK</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditandoNick(true)} className="text-xs font-mono text-slate-700 hover:text-pink-500 transition-colors">
                      {usuario.nickname} ✏️
                    </button>
                  )}
                </div>
                <button
                  onClick={() => { onCerrar(); onAbrirLogin(); }}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  <svg className="h-4 w-4" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                  </svg>
                  Vincular cuenta de Google
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Estado</span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Autenticado</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Nombre</span>
                  <span className="text-xs font-semibold text-slate-700">{usuario.nombre}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Correo</span>
                  <span className="text-xs font-mono text-slate-600">{usuario.correo}</span>
                </div>
                <button onClick={onCerrarSesion} className="mt-1 w-full rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 transition-all">
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">ID de dispositivo</h3>
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
            <p className="text-xs font-mono text-slate-500 break-all select-all">{usuario.id}</p>
            <p className="text-[10px] text-slate-400 mt-1">Este ID es único y anónimo. Se usa para identificar tu dispositivo.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
