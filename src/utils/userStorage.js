// SQL migration needed in Supabase dashboard:
// ALTER TABLE recommendation_groups ADD COLUMN IF NOT EXISTS join_code text UNIQUE;

import { supabase } from "../lib/supabase";
import { apiFetch } from "../lib/api";

export async function getAuthedUserId() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  const id = data?.session?.user?.id;
  if (!id) throw new Error("No authenticated user found");
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

export async function upsertBooks(books) {
  if (!books?.length) return;
  const rows = books.map((b) => ({
    ol_key: b.ol_key,
    nombre_libro: b.title,
    autor: b.author,
    genero: b.genre ?? null,
    descripcion: b.description ?? null,
  }));
  const { error } = await supabase
    .from("books")
    .upsert(rows, { onConflict: "ol_key" });
  if (error) throw error;
}

export async function createGroupWithMembers({
  groupName,
  vibes,
  tgOn,
  friendUserIds,
}) {
  const joinCode = 'RM-' + Math.random().toString(36).slice(2, 6).toUpperCase();

  const { data: groupId, error } = await supabase.rpc(
    "create_group_with_admin",
    {
      p_group_name: groupName || "My Circle",
      p_vibe: vibes ?? [],
      p_telegram_chat_id: tgOn ? "pending" : null,
    },
  );
  if (error) throw error;

  await supabase.from("recommendation_groups").update({ join_code: joinCode }).eq("id", groupId);
  if (friendUserIds?.length) {
    const { error: membErr } = await supabase.from("group_members").insert(
      friendUserIds.map((uid) => ({
        group_id: groupId,
        user_id: uid,
        role: "member",
        influence_weight: 1.0,
      })),
    );
    if (membErr) throw membErr;
  }
  let recommendationsTriggered = false;
  let recommendationsError = null;
  try {
    await triggerGroupRecommendations(groupId);
    recommendationsTriggered = true;
  } catch (e) {
    recommendationsError = e?.message ?? 'FastAPI unavailable';
  }
  return { groupId, joinCode, recommendationsTriggered, recommendationsError };
}

export async function joinGroupByCode(code) {
  const trimmed = code.trim().toUpperCase();
  const { data, error } = await supabase
    .from("recommendation_groups")
    .select("id, group_name")
    .eq("join_code", trimmed)
    .eq("is_active", true)
    .maybeSingle();
  if (error || !data) throw new Error("Código inválido o grupo no encontrado");
  const userId = await getAuthedUserId();
  const { error: joinErr } = await supabase.from("group_members").insert({
    group_id: data.id,
    user_id: userId,
    role: "member",
    influence_weight: 1.0,
  });
  if (joinErr) {
    if (joinErr.code === "23505") throw new Error("Ya eres miembro de este grupo");
    throw joinErr;
  }
  try { await triggerGroupRecommendations(data.id); } catch {}
  return { groupId: data.id, groupName: data.group_name };
}

export async function insertUserWeights(weights) {
  const userId = await getAuthedUserId();
  const rows = (weights ?? []).map((w) => ({ user_id: userId, ...w }));
  if (rows.length === 0) return;

  const { error } = await supabase.from("user_weights").insert(rows);
  if (error) throw error;
}

export async function triggerGroupRecommendations(
  groupId,
  metodo = "media_sigma",
) {
  return apiFetch("/api/recommendations/recompute", {
    method: "POST",
    body: JSON.stringify({
      group_id: groupId,
      metodo,
    }),
    timeoutMs: 45000,
  });
}
