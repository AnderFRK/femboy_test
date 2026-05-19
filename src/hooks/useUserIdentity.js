import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../supabase';

const STORAGE_KEY = 'femboy_user_identity';

function generarIdUnico() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function generarNicknameTemporal() {
  const adjetivos = ['Strange', 'Soft', 'Pink', 'Moon', 'Sweet', 'Luna', 'Star', 'Rosa', 'Lovely', 'Cute'];
  return `${adjetivos[Math.floor(Math.random() * adjetivos.length)]}_${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function cargarLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.id && parsed?.nickname) return parsed;
    }
  } catch { /* ignorar */ }
  return null;
}

function guardarLocal(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

async function crearOSincronizarPerfil(localId, nickname, supabaseUser) {
  try {
    const { data: existente } = await supabase
      .from('profiles')
      .select('id, supabase_user_id')
      .eq('local_id', localId)
      .maybeSingle();

    if (existente) {
      const updates = { nickname, updated_at: new Date().toISOString() };
      if (supabaseUser) {
        updates.supabase_user_id = supabaseUser.id;
        updates.display_name = supabaseUser.user_metadata?.full_name || supabaseUser.email;
        updates.email = supabaseUser.email;
        updates.avatar_url = supabaseUser.user_metadata?.avatar_url || null;
      }
      const { error } = await supabase.from('profiles').update(updates).eq('local_id', localId);
      if (error) console.error('Error actualizando perfil:', error);
      else console.log('Perfil actualizado:', updates);
    } else {
      const { error } = await supabase.from('profiles').insert({
        local_id: localId,
        nickname,
        supabase_user_id: supabaseUser?.id || null,
        display_name: supabaseUser?.user_metadata?.full_name || supabaseUser?.email || null,
        email: supabaseUser?.email || null,
        avatar_url: supabaseUser?.user_metadata?.avatar_url || null,
      });
      if (error) console.error('Error insertando perfil:', error);
      else console.log('Perfil creado:', localId);
    }
  } catch (err) {
    console.error('Error en crearOSincronizarPerfil:', err);
  }
}

export default function useUserIdentity() {
  const [supabaseListo, setSupabaseListo] = useState(false);
  const syncAnon = useRef(false);

  const [usuario, setUsuario] = useState(() => {
    const existente = cargarLocal();
    if (existente) return { ...existente, autenticado: false };
    const id = generarIdUnico();
    const nickname = generarNicknameTemporal();
    guardarLocal({ id, nickname, autenticado: false });
    return { id, nickname, autenticado: false };
  });

  const identidadRef = useRef({ id: usuario.id, nickname: usuario.nickname });
  useEffect(() => { identidadRef.current = { id: usuario.id, nickname: usuario.nickname }; }, [usuario.id, usuario.nickname]);
  useEffect(() => { guardarLocal(usuario); }, [usuario]);

  // Sync perfil anónimo (1 vez)
  useEffect(() => {
    if (!syncAnon.current) {
      syncAnon.current = true;
      crearOSincronizarPerfil(usuario.id, usuario.nickname, null);
    }
  }, [usuario.id, usuario.nickname]);

  // Auth listener con sync directo
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const supabaseUser = session?.user || null;

      if (supabaseUser) {
        const meta = supabaseUser.user_metadata || {};
        const { id, nickname } = identidadRef.current;
        console.log('Supabase auth cambiado — sync perfil para:', id);

        setUsuario((prev) => ({
          ...prev,
          autenticado: true,
          supabaseUserId: supabaseUser.id,
          nombre: meta.full_name || supabaseUser.email || 'Usuario',
          correo: supabaseUser.email || '',
          proveedor: 'google',
          foto: meta.avatar_url || null,
        }));

        crearOSincronizarPerfil(id, nickname, supabaseUser);
      } else {
        setUsuario((prev) => {
          if (!prev.autenticado) return prev;
          return { id: prev.id, nickname: prev.nickname, autenticado: false };
        });
      }
      setSupabaseListo(true);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const { id, nickname } = identidadRef.current;
        const meta = session.user.user_metadata || {};
        setUsuario((prev) => ({
          ...prev,
          autenticado: true,
          supabaseUserId: session.user.id,
          nombre: meta.full_name || session.user.email || 'Usuario',
          correo: session.user.email || '',
          proveedor: 'google',
          foto: meta.avatar_url || null,
        }));
        crearOSincronizarPerfil(id, nickname, session.user);
      }
      setSupabaseListo(true);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  const esAnonimo = !usuario.autenticado;

  const loginGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  }, []);

  const cerrarSesion = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const actualizarNickname = useCallback(async (nuevoNickname) => {
    setUsuario((prev) => ({ ...prev, nickname: nuevoNickname }));
    const { error } = await supabase
      .from('profiles')
      .update({ nickname: nuevoNickname, updated_at: new Date().toISOString() })
      .eq('local_id', usuario.id);
    if (error) console.error('Error actualizando nickname:', error);
  }, [usuario.id]);

  return { usuario, esAnonimo, supabaseListo, loginGoogle, cerrarSesion, actualizarNickname };
}
