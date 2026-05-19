import { useState, useCallback } from 'react';
import { supabase } from '../supabase';

export default function useAnalysisHistory() {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);

  const cargarHistorial = useCallback(async (userLocalId) => {
    if (!userLocalId) return;
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .eq('user_local_id', userLocalId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error cargando historial:', error);
        return;
      }
      setHistorial(data || []);
    } catch (err) {
      console.error('Error en cargarHistorial:', err);
    } finally {
      setCargando(false);
    }
  }, []);

  const guardarAnalisis = useCallback(async (userLocalId, detalles) => {
    if (!userLocalId) return null;
    const supabaseUserId = detalles.supabaseUserId || null;
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .insert({
          user_local_id: userLocalId,
          supabase_user_id: supabaseUserId,
          feminine_percentage: detalles.femPercentage,
          masculine_percentage: detalles.mascPercentage,
          success: detalles.success ?? true,
          error_message: detalles.errorMessage || null,
          description: detalles.description || null,
          result_image: detalles.resultImage || null,
          user_agent: navigator.userAgent,
        })
        .select()
        .single();

      if (error) {
        console.error('Error guardando análisis:', error);
        return null;
      }

      await supabase
        .from('profiles')
        .update({ ultimo_analisis: new Date().toISOString() })
        .eq('local_id', userLocalId);

      setHistorial((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error en guardarAnalisis:', err);
      return null;
    }
  }, []);

  const eliminarHistorial = useCallback(async (userLocalId) => {
    if (!userLocalId) return;
    try {
      const { error } = await supabase
        .from('analysis_history')
        .delete()
        .eq('user_local_id', userLocalId);
      if (error) console.error('Error eliminando historial:', error);
      setHistorial([]);
    } catch (err) {
      console.error('Error en eliminarHistorial:', err);
    }
  }, []);

  return { historial, cargando, cargarHistorial, guardarAnalisis, eliminarHistorial };
}
