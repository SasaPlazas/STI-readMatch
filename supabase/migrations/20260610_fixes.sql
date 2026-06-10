-- Ejecutar en Supabase Dashboard → SQL Editor antes del deploy

-- 1) Permite que usuarios autenticados lean user_preferences de otros
-- (necesario para mostrar miembros del grupo)
DROP POLICY IF EXISTS "members_can_read_prefs" ON public.user_preferences;
CREATE POLICY "members_can_read_prefs"
ON public.user_preferences
FOR SELECT
TO authenticated
USING (true);

-- 2) Función de búsqueda de usuarios
CREATE OR REPLACE FUNCTION search_users(query text)
RETURNS TABLE (
  user_id  uuid,
  username text,
  email    text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    au.id                                                AS user_id,
    COALESCE(up.username, split_part(au.email, '@', 1)) AS username,
    au.email                                             AS email
  FROM auth.users au
  LEFT JOIN public.user_preferences up ON up.user_id = au.id
  WHERE
    up.username ILIKE '%' || query || '%'
    OR au.email ILIKE '%' || query || '%'
    OR split_part(au.email, '@', 1) ILIKE '%' || query || '%'
  LIMIT 15;
$$;

GRANT EXECUTE ON FUNCTION search_users(text) TO authenticated;

-- 3) Permite que usuarios autenticados lean group_members
DROP POLICY IF EXISTS "members_can_read_group_members" ON public.group_members;
CREATE POLICY "members_can_read_group_members"
ON public.group_members
FOR SELECT
TO authenticated
USING (true);

-- 4) Permite insertar miembros en un grupo a cualquier usuario autenticado
DROP POLICY IF EXISTS "members_can_insert_group_members" ON public.group_members;
CREATE POLICY "members_can_insert_group_members"
ON public.group_members
FOR INSERT
TO authenticated
WITH CHECK (true);
