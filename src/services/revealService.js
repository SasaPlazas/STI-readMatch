import { apiFetch } from '../lib/api';

export async function generateReveal(archetype, prefs) {
  const data = await apiFetch('/api/reveal', {
    method: 'POST',
    body: JSON.stringify({
      archetype,
      preferences: prefs,
    }),
  });

  return data?.reveal_text ?? '';
}

const ARCHETYPES = [
  {
    label: 'The Philosopher',
    rules: [
      (p) => p.narrative_styles?.some((s) => ['Philosophical', 'Psychological'].includes(s)),
      (p) => ['Literary', 'Essays', 'History'].filter((g) => p.favorite_genres?.includes(g)).length >= 2,
      (p) => ['deep', 'experimental'].includes(p.depth_preference),
      (p) => p.group_values?.some((v) => ['perspectives', 'deep'].includes(v)),
    ],
  },
  {
    label: 'The Explorer',
    rules: [
      (p) => (p.favorite_genres?.length ?? 0) >= 5,
      (p) => (p.narrative_styles?.length ?? 0) >= 3,
      (p) => (p.openness_score ?? 0) > 65,
      (p) => p.group_values?.includes('perspectives'),
    ],
  },
  {
    label: 'The Romantic',
    rules: [
      (p) => p.favorite_genres?.some((g) => ['Romance', 'Memoir'].includes(g)),
      (p) => p.narrative_styles?.some((s) => ['Emotional', 'Character-driven'].includes(s)),
      (p) => p.group_values?.includes('emo'),
      (p) => ['light', 'balanced'].includes(p.depth_preference),
    ],
  },
  {
    label: 'Dark Academic',
    rules: [
      (p) => p.narrative_styles?.includes('Dark Academia'),
      (p) => p.favorite_genres?.some((g) => ['Mystery', 'Horror', 'Literary'].includes(g)),
      (p) => ['deep', 'experimental'].includes(p.depth_preference),
      (p) => { const s = p.openness_score ?? 0; return s >= 30 && s <= 80; },
      (p) => p.group_values?.some((v) => ['deep', 'quality'].includes(v)),
    ],
  },
  {
    label: 'The Visionary',
    rules: [
      (p) => p.narrative_styles?.includes('Sci-Fi'),
      (p) => p.favorite_genres?.includes('Sci-Fi'),
      (p) => p.group_values?.some((v) => ['perspectives', 'deep'].includes(v)),
      (p) => (p.openness_score ?? 0) > 50,
    ],
  },
  {
    label: 'The Storyteller',
    rules: [
      (p) => p.narrative_styles?.includes('Fast Thrillers'),
      (p) => p.favorite_genres?.some((g) => ['Fantasy', 'Mystery'].includes(g)),
      (p) => ['light', 'balanced'].includes(p.depth_preference),
      (p) => p.group_values?.includes('fun'),
    ],
  },
  {
    label: 'The Cozy Reader',
    rules: [
      (p) => p.narrative_styles?.includes('Cozy Fantasy'),
      (p) => p.depth_preference === 'light',
      (p) => p.group_values?.some((v) => ['harmony', 'emo'].includes(v)),
      (p) => (p.openness_score ?? 0) < 60,
    ],
  },
  {
    label: 'The Chronicler',
    rules: [
      (p) => ['History', 'Memoir', 'Politics'].filter((g) => p.favorite_genres?.includes(g)).length >= 2,
      (p) => ['balanced', 'deep'].includes(p.depth_preference),
      (p) => p.group_values?.some((v) => ['perspectives', 'quality'].includes(v)),
    ],
  },
];

export function assignArchetype(prefs) {
  let best = null;
  let bestScore = -1;

  for (const arch of ARCHETYPES) {
    const passed = arch.rules.reduce((count, rule) => {
      try { return rule(prefs) ? count + 1 : count; } catch { return count; }
    }, 0);

    if (passed === arch.rules.length) return arch.label;

    const pct = passed / arch.rules.length;
    if (pct > bestScore) { bestScore = pct; best = arch; }
  }

  if (best) return best.label;
  return (prefs?.openness_score ?? 0) > 70 ? 'The Explorer' : 'The Philosopher';
}
