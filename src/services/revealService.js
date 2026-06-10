import { apiFetch } from '../lib/api';

export async function generateReveal(preferences) {
  const result = await apiFetch('/api/reveal', {
    method: 'POST',
    body: JSON.stringify({ preferences }),
  });
  return {
    archetype: result.archetype ?? 'El Explorador',
    reveal_text: result.reveal_text ?? '',
    pairs: result.pairs ?? [],
  };
}
