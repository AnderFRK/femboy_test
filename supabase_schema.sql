-- ============================================================
-- SCHEMA PRODUCCIÓN CORREGIDO — FemboyTest
-- Resuelve: RLS bloquea UPDATE + análisis duplicados
-- ============================================================

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

DROP VIEW IF EXISTS user_stats;
DROP TABLE IF EXISTS analysis_history;
DROP TABLE IF EXISTS profiles;

-- ============================================================
-- TABLA: profiles
-- ============================================================
CREATE TABLE profiles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  local_id TEXT UNIQUE NOT NULL,
  supabase_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT,
  display_name TEXT,
  email TEXT,
  avatar_url TEXT,
  total_analisis INTEGER DEFAULT 0,
  ultimo_analisis TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- ============================================================
-- TABLA: analysis_history
-- ============================================================
CREATE TABLE analysis_history (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_local_id TEXT NOT NULL REFERENCES profiles(local_id) ON DELETE CASCADE,
  supabase_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  feminine_percentage NUMERIC(5,2) NOT NULL,
  masculine_percentage NUMERIC(5,2) NOT NULL,
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,
  description TEXT,
  result_image TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_history_user_local_id ON analysis_history(user_local_id);
CREATE INDEX idx_history_supabase_user_id ON analysis_history(supabase_user_id);
CREATE INDEX idx_profiles_supabase_user_id ON profiles(supabase_user_id);
CREATE INDEX idx_history_created_at_desc ON analysis_history(user_local_id, created_at DESC);

-- ============================================================
-- VISTA: user_stats
-- ============================================================
CREATE OR REPLACE VIEW user_stats
WITH (security_invoker = true) AS
SELECT
  user_local_id,
  COUNT(*) AS total_analisis,
  ROUND(AVG(feminine_percentage), 2) AS fem_promedio,
  ROUND(AVG(masculine_percentage), 2) AS masc_promedio,
  MAX(feminine_percentage) AS fem_maximo,
  MIN(feminine_percentage) AS fem_minimo,
  MAX(created_at) AS ultimo_analisis
FROM analysis_history
WHERE success = TRUE
GROUP BY user_local_id;

-- ============================================================
-- ROW LEVEL SECURITY — CORREGIDO
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

-- --- PROFILES ---

-- Cualquiera puede crear un perfil
CREATE POLICY "insert_profiles" ON profiles
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Ver: anónimos ven perfiles sin dueño; autenticados ven el suyo
CREATE POLICY "select_profiles" ON profiles
  FOR SELECT TO anon, authenticated
  USING (
    supabase_user_id IS NULL
    OR auth.uid() = supabase_user_id
  );

-- ACTUALIZAR: permite actualizar cuando supabase_user_id es NULL
-- (necesario para que al loguearse se vincule el supabase_user_id)
CREATE POLICY "update_profiles" ON profiles
  FOR UPDATE TO anon, authenticated
  USING (
    supabase_user_id IS NULL
    OR auth.uid() = supabase_user_id
  );

-- Eliminar: solo autenticados pueden borrar su propio perfil
CREATE POLICY "delete_profiles" ON profiles
  FOR DELETE TO authenticated
  USING (auth.uid() = supabase_user_id);

-- --- ANALYSIS HISTORY ---

CREATE POLICY "insert_history" ON analysis_history
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "select_history" ON analysis_history
  FOR SELECT TO anon, authenticated
  USING (
    supabase_user_id IS NULL
    OR auth.uid() = supabase_user_id
  );

CREATE POLICY "delete_history" ON analysis_history
  FOR DELETE TO authenticated
  USING (auth.uid() = supabase_user_id);
