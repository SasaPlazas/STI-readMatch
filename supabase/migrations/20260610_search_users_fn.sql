CREATE OR REPLACE FUNCTION search_users(query text)
RETURNS TABLE (
  user_id   uuid,
  username  text,
  email     text
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT
    au.id           AS user_id,
    up.username     AS username,
    au.email        AS email
  FROM auth.users au
  LEFT JOIN user_preferences up ON up.user_id = au.id
  WHERE
    au.email ILIKE '%' || query || '%'
    OR up.username ILIKE '%' || query || '%'
  LIMIT 15;
$$;

GRANT EXECUTE ON FUNCTION search_users(text) TO anon, authenticated;

-- INSTRUCCIÓN: Ejecutar este archivo en Supabase Dashboard → SQL Editor
-- antes de hacer deploy de esta rama.
