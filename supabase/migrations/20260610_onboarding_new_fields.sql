ALTER TABLE user_preferences
  ADD COLUMN IF NOT EXISTS preferred_languages   text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS preferred_complexity  text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS content_preferences   text[]  DEFAULT '{}';

-- Ejecutar en Supabase Dashboard → SQL Editor antes de hacer deploy.
