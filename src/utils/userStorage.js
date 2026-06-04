import { supabase } from "../lib/supabase";

export async function getAuthedUserId() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  const id = data?.session?.user?.id;
  if (!id) throw new Error("No hay un usuario autenticado");
  return id;
}

export async function upsertUserPreferences(values) {
  const userId = await getAuthedUserId();
  const payload = { user_id: userId, ...values };

  const { data: existing, error: existingError } = await supabase
    .from("user_preferences")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (existingError) throw existingError;

  if (existing?.user_id) {
    const { error } = await supabase
      .from("user_preferences")
      .update(values)
      .eq("user_id", userId);
    if (error) throw error;
    return;
  }

  const { error } = await supabase.from("user_preferences").insert(payload);
  if (error) throw error;
}

export async function insertUserWeights(weights) {
  const userId = await getAuthedUserId();
  const rows = (weights ?? []).map((w) => ({ user_id: userId, ...w }));
  if (rows.length === 0) return;

  const { error } = await supabase.from("user_weights").insert(rows);
  if (error) throw error;
}
