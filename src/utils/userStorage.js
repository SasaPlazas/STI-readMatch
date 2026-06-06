import { supabase } from "../lib/supabase";

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
  const { error } = await supabase.from('books').upsert(rows, { onConflict: 'ol_key' });
  if (error) throw error;
}

export async function createGroupWithMembers({ groupName, vibes, tgOn, friendUserIds }) {
  const { data: groupId, error } = await supabase.rpc('create_group_with_admin', {
    p_group_name: groupName || 'My Circle',
    p_vibe: vibes ?? [],
    p_telegram_chat_id: tgOn ? 'pending' : null,
  });
  if (error) throw error;
  if (friendUserIds?.length) {
    const { error: membErr } = await supabase.from('group_members').insert(
      friendUserIds.map((uid) => ({
        group_id: groupId,
        user_id: uid,
        role: 'member',
        influence_weight: 1.0,
      }))
    );
    if (membErr) throw membErr;
  }
  return groupId;
}

export async function joinGroupByLink(rawLink) {
  const match = rawLink.trim().match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  if (!match) throw new Error('Link inválido — pega el link completo');
  const groupId = match[1];
  const { data, error } = await supabase
    .from('recommendation_groups')
    .select('id, group_name')
    .eq('id', groupId)
    .eq('is_active', true)
    .single();
  if (error || !data) throw new Error('Grupo no encontrado o inactivo');
  const userId = await getAuthedUserId();
  const { error: joinErr } = await supabase.from('group_members').insert({
    group_id: groupId,
    user_id: userId,
    role: 'member',
    influence_weight: 1.0,
  });
  if (joinErr) throw joinErr;
  return { groupId, groupName: data.group_name };
}

export async function insertUserWeights(weights) {
  const userId = await getAuthedUserId();
  const rows = (weights ?? []).map((w) => ({ user_id: userId, ...w }));
  if (rows.length === 0) return;

  const { error } = await supabase.from("user_weights").insert(rows);
  if (error) throw error;
}
