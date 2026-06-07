// src/utils/recommendations.js
// Sistema de recomendación grupal con similitud coseno + 4 métodos de agregación
// Basado en el notebook "Sistemas de Recomendación" — Módulos 1, 2, 4

import { BOOKS, GROUPS, MEMBER_PREFS, MEMBERS } from '../data/sample';

// ─── Módulo 1: Similitud del coseno ───────────────────────────────────────────
function cosineSim(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((s, a) => s + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((s, b) => s + b * b, 0));
  if (normA === 0 || normB === 0) return 0;
  return dot / (normA * normB);
}

// ─── Convierte perfil de usuario a vector numérico ────────────────────────────
// El vector tiene una dimensión por cada tag/género posible
const ALL_TAGS = [
  'literary', 'sci-fi', 'fantasy', 'mystery', 'romance', 'memoir',
  'essays', 'history', 'horror', 'poetry', 'climate', 'politics',
  'dark', 'thriller', 'nonfiction', 'slice-of-life',
];

function prefToVector(prefs) {
  // 1 si el usuario tiene ese tag, 0 si no
  // + el valor de depth (1-4) normalizado como última dimensión
  const tagVec = ALL_TAGS.map(tag => prefs.tags?.includes(tag) ? 1 : 0);
  const depthNorm = (prefs.depth ?? 2) / 4;
  const opennessNorm = (prefs.openness ?? 60) / 100;
  return [...tagVec, depthNorm, opennessNorm];
}

function bookToVector(book) {
  // Vector del libro basado en sus tags
  const tagVec = ALL_TAGS.map(tag => book.tags?.includes(tag) ? 1 : 0);
  const complexityMap = { Low: 0.25, Medium: 0.5, High: 1.0 };
  const complexity = complexityMap[book.complexity] ?? 0.5;
  return [...tagVec, complexity, 0.5]; // openness neutral
}

// ─── Módulo 2: Score individual usuario→libro ─────────────────────────────────
function scoreUserBook(userId, book) {
  const prefs = MEMBER_PREFS[userId];
  if (!prefs) return 0;
  const userVec = prefToVector(prefs);
  const bookVec = bookToVector(book);
  return cosineSim(userVec, bookVec);
}

// ─── Módulo 4B: 4 métodos de agregación grupal ────────────────────────────────

// Método 1 — Promedio (democrático, aplana preferencias)
function agregarPromedio(scores) {
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

// Método 2 — Mínima miseria (protege al menos satisfecho)
function agregarMinMiseria(scores) {
  return Math.min(...scores);
}

// Método 3 — Máximo placer (solo si hay consenso alto)
function agregarMaxPlacer(scores, umbral = 0.4) {
  const max = Math.max(...scores);
  // Si nadie supera el umbral, descarta el libro
  return max >= umbral ? max : 0;
}

// Método 4 — Media con baja desviación estándar (busca acuerdo, no magnitud)
function agregarMediaBajaSigma(scores) {
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((s, x) => s + (x - mean) ** 2, 0) / scores.length;
  const sigma = Math.sqrt(variance);
  // Penaliza libros que dividen al grupo
  return mean * (1 - sigma);
}

// ─── Función principal: recomendaciones para un grupo ─────────────────────────
export function getGroupRecommendations(groupId, topN = 3, metodo = 'media_sigma') {
  const group = GROUPS.find(g => g.id === groupId);
  if (!group) return [];

  const memberIds = group.memberIds;

  const scored = BOOKS.map(book => {
    // Score individual de cada miembro para este libro
    const scores = memberIds.map(id => scoreUserBook(id, book));

    // Agrega según el método elegido
    let groupScore;
    switch (metodo) {
      case 'promedio':     groupScore = agregarPromedio(scores);          break;
      case 'min_miseria':  groupScore = agregarMinMiseria(scores);        break;
      case 'max_placer':   groupScore = agregarMaxPlacer(scores);         break;
      case 'media_sigma':
      default:             groupScore = agregarMediaBajaSigma(scores);    break;
    }

    const reasons = buildReasons(book, memberIds, scores);
    return { book, score: groupScore, scores, reasons };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map((item, index) => ({ ...item, rank: index + 1 }));
}

// ─── Genera frases de explicación ─────────────────────────────────────────────
function buildReasons(book, memberIds, scores) {
  const reasons = [];

  // Qué miembros más lo favorecen
  const topScorer = memberIds[scores.indexOf(Math.max(...scores))];
  const member = MEMBERS.find(m => m.id === topScorer);
  if (member) reasons.push(`Fuerte match con el perfil de ${member.name}`);

  // Detecta si hay polarización
  const max = Math.max(...scores);
  const min = Math.min(...scores);
  if (max - min > 0.4) {
    reasons.push('Divide opiniones — diversidad alta');
  } else {
    reasons.push('Consenso sólido en el grupo');
  }

  if (book.tags?.includes('essays')) reasons.push('Overlap de ensayos en el grupo');
  if (book.tags?.includes('dark'))   reasons.push('Gusto por lo oscuro compartido');

  return reasons.slice(0, 2);
}

// ─── Mantiene compatibilidad con GroupDetailScreen ────────────────────────────
export function getMatchExplanation(groupId, bookId) {
  const recs = getGroupRecommendations(groupId, 6);
  const rec = recs.find(r => r.book.id === bookId);
  if (!rec) return 'Recomendado para tu grupo esta semana.';
  return rec.reasons.join(' · ') || 'Overlap sólido en el grupo.';
}