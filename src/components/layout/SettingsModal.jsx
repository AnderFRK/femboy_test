import { useState } from 'react';
import { X, Edit2, Check, LogOut, Fingerprint, User, Mail, ShieldAlert, ShieldCheck, Settings } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={onCerrar}>
      
      {/* MODAL CONTENEDOR con animacion de rebote suave */}
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#f7c9f2]/50 p-6 sm:p-8 w-full max-w-sm mx-4 animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-pink-500" />
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Configuración</h2>
          </div>
          <button onClick={onCerrar} className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-pink-500 transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SECCIÓN DE CUENTA */}
        <section className="mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pl-1">Detalles de Cuenta</h3>
          
          <div className="rounded-2xl bg-slate-50 border-2 border-slate-100 p-4 space-y-4 shadow-inner">
            {esAnonimo ? (
              <>
                {/* ESTADO ANÓNIMO */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <ShieldAlert className="h-4 w-4" />
                    <span className="text-sm font-medium">Estado</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full shadow-sm">
                    Anónimo
                  </span>
                </div>

                {/* EDITAR NICKNAME */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Apodo</span>
                  </div>
                  
                  {editandoNick ? (
                    <div className="flex gap-1 animate-in slide-in-from-right-2">
                      <input
                        type="text"
                        value={nickInput}
                        onChange={(e) => setNickInput(e.target.value)}
                        className="w-28 rounded-lg border-2 border-pink-200 bg-white px-2 py-1 text-sm outline-none focus:border-pink-500 transition-colors shadow-sm"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && guardarNick()}
                      />
                      <button onClick={guardarNick} className="flex items-center justify-center rounded-lg bg-pink-500 p-1 text-white hover:bg-pink-600 shadow-sm transition-colors">
                        <Check className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setEditandoNick(true)} 
                      className="group flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-pink-500 transition-colors"
                    >
                      {usuario.nickname} 
                      <Edit2 className="h-3 w-3 text-slate-400 group-hover:text-pink-500 transition-colors" />
                    </button>
                  )}
                </div>

                {/* BOTÓN VINCULAR GOOGLE */}
                <button
                  onClick={() => { onCerrar(); onAbrirLogin(); }}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-[#c2dafd] hover:bg-[#c2dafd]/10 hover:text-blue-600 transition-all shadow-sm group"
                >
                  <svg className="h-5 w-5 group-hover:scale-110 transition-transform" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                  </svg>
                  Vincular con Google
                </button>
              </>
            ) : (
              <>
                {/* ESTADO AUTENTICADO */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Estado</span>
                  </div>
                  <span className="text-xs font-bold text-green-700 bg-green-100 border border-green-200 px-2.5 py-1 rounded-full shadow-sm">
                    Autenticado
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Nombre</span>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{usuario.nombre}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Correo</span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 truncate max-w-[140px]" title={usuario.correo}>
                    {usuario.correo}
                  </span>
                </div>

                {/* BOTÓN CERRAR SESIÓN */}
                <button 
                  onClick={onCerrarSesion} 
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </section>

        {/* SECCIÓN DEVICE ID */}
        <section>
          <div className="flex items-center gap-2 mb-2 pl-1">
            <Fingerprint className="h-4 w-4 text-slate-400" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">ID de dispositivo</h3>
          </div>
          
          <div className="rounded-xl bg-slate-100 border border-slate-200 p-3 relative group">
            <p className="text-xs font-mono text-slate-600 break-all select-all text-center">{usuario.id}</p>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center px-2">
            Este identificador es anónimo y se usa para guardar tu historial de forma local.
          </p>
        </section>

      </div>
    </div>
  );
}