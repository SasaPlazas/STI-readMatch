-- Ejecutar en Supabase Dashboard → SQL Editor antes del deploy
ALTER TABLE user_preferences
  ADD COLUMN IF NOT EXISTS preferred_languages  text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS content_preferences  text[]  DEFAULT '{}';
