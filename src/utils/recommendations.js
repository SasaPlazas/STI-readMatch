import { BOOKS, GROUPS, MEMBER_PREFS, MEMBERS } from '../data/sample';

/**
 * Calcula el score de un libro para un grupo específico.
 *
 * Factores:
 *  - Genre/tag overlap (50%): cuántos miembros tienen ese tag en sus preferencias
 *  - Complexity match (30%): qué tan bien encaja la complejidad del libro con el depth promedio del grupo
 *  - Diversity bonus (20%): libros que satisfacen a los miembros con menos overlap reciben un boost
 */
function scoreBookForGroup(book, memberIds) {
  const prefs = memberIds.map((id) => MEMBER_PREFS[id]).filter(Boolean);
  if (prefs.length === 0) return 0;

  // --- Tag overlap (0-50 puntos) ---
  const tagMatchCounts = book.tags.map((tag) =>
    prefs.filter((p) => p.tags.includes(tag)).length
  );
  const maxTagMatch = Math.max(...tagMatchCounts, 0);
  const tagScore = (maxTagMatch / prefs.length) * 50;

  // --- Complexity match (0-30 puntos) ---
  const complexityMap = { Low: 1, Medium: 2, High: 3 };
  const bookComplexity = complexityMap[book.complexity] ?? 2;
  const avgDepth = prefs.reduce((sum, p) => sum + (p.depth ?? 2), 0) / prefs.length;
  const normalizedDepth = Math.round((avgDepth / 4) * 3); // depth 1-4 → 1-3
  const complexityDiff = Math.abs(bookComplexity - normalizedDepth);
  const complexityScore = (1 - complexityDiff / 2) * 30;

  // --- Diversity bonus (0-20 puntos) ---
  // Boost libros que tocan tags de miembros "minoritarios" (los con menos overlap)
  const minorityBonus = prefs.some((p) =>
    book.tags.some((t) => p.tags.includes(t)) &&
    prefs.filter((q) => q.tags.some((t) => book.tags.includes(t))).length <= Math.ceil(prefs.length / 2)
  ) ? 20 : 0;

  return Math.round(tagScore + complexityScore + minorityBonus);
}

/**
 * Genera las top N recomendaciones semanales para un grupo.
 * Retorna array de { book, score, reasons } ordenado de mayor a menor score.
 */
export function getGroupRecommendations(groupId, topN = 3) {
  const group = GROUPS.find((g) => g.id === groupId);
  if (!group) return [];

  const memberIds = group.memberIds;
  const prefs = memberIds.map((id) => MEMBER_PREFS[id]).filter(Boolean);

  const scored = BOOKS.map((book) => {
    const score = scoreBookForGroup(book, memberIds);

    // Genera razones legibles
    const reasons = buildReasons(book, memberIds, prefs);

    return { book, score, reasons };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

/** Genera frases de explicación para por qué un libro fue recomendado */
function buildReasons(book, memberIds, prefs) {
  const reasons = [];

  // ¿Cuántos miembros tienen overlap de tags?
  const matchingMembers = MEMBERS.filter(
    (m) => memberIds.includes(m.id) && MEMBER_PREFS[m.id]?.tags.some((t) => book.tags.includes(t))
  );
  if (matchingMembers.length > 0) {
    const names = matchingMembers.slice(0, 2).map((m) => m.name).join(' & ');
    reasons.push(`Matches ${names}'s taste profile`);
  }

  // Diversidad
  const avgOpenness = prefs.reduce((s, p) => s + (p.openness ?? 60), 0) / prefs.length;
  if (avgOpenness > 60 && book.complexity === 'High') {
    reasons.push('High openness group — complex reads welcome');
  } else if (avgOpenness < 55 && book.complexity === 'Low') {
    reasons.push('Comfort pick for your reading style');
  }

  // Tag bonus
  if (book.tags.includes('essays')) reasons.push('Strong essay overlap across the group');
  if (book.tags.includes('dark')) reasons.push('Dark-curious members will love this');
  if (book.tags.includes('memoir')) reasons.push('Memoir fans in the group');

  return reasons.slice(0, 2);
}

/** Devuelve el texto principal de "Why this matches" para el grupo */
export function getMatchExplanation(groupId, bookId) {
  const recs = getGroupRecommendations(groupId, 6);
  const rec = recs.find((r) => r.book.id === bookId);
  if (!rec) return 'Recommended for your group this week.';
  return rec.reasons.join(' · ') || 'Strong overlap across the group.';
}
