import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ─── Similitud del coseno (Módulo 1 del notebook) ─────────────────────────────
function cosineSim(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const normA = Math.sqrt(vecA.reduce((s, a) => s + a * a, 0))
  const normB = Math.sqrt(vecB.reduce((s, b) => s + b * b, 0))
  if (normA === 0 || normB === 0) return 0
  return dot / (normA * normB)
}

// ─── Tags posibles (dimensiones del vector) ───────────────────────────────────
const ALL_TAGS = [
  'literary', 'sci-fi', 'fantasy', 'mystery', 'romance', 'memoir',
  'essays', 'history', 'horror', 'poetry', 'climate', 'politics',
  'dark', 'thriller', 'nonfiction', 'slice-of-life',
]

function prefsToVector(prefs: any): number[] {
  const tags = prefs.favorite_genres ?? prefs.tags ?? []
  const tagVec = ALL_TAGS.map(tag =>
    tags.some((t: string) => t.toLowerCase().includes(tag)) ? 1 : 0
  )
  const depth = (prefs.depth_preference === 'deep' ? 1.0
    : prefs.depth_preference === 'balanced' ? 0.5
    : prefs.depth_preference === 'experimental' ? 0.9
    : 0.25)
  const openness = (prefs.openness_score ?? 60) / 100
  return [...tagVec, depth, openness]
}

function bookToVector(book: any): number[] {
  const genre = (book.genero ?? book.genre ?? '').toLowerCase()
  const tagVec = ALL_TAGS.map(tag => genre.includes(tag) ? 1 : 0)
  const complexityMap: Record<string, number> = { low: 0.25, medium: 0.5, high: 1.0 }
  const complexity = complexityMap[(book.complexity ?? 'medium').toLowerCase()] ?? 0.5
  return [...tagVec, complexity, 0.5]
}

// ─── 4 métodos de agregación (Módulo 4 del notebook) ─────────────────────────
function agregarPromedio(scores: number[]): number {
  return scores.reduce((a, b) => a + b, 0) / scores.length
}

function agregarMinMiseria(scores: number[]): number {
  return Math.min(...scores)
}

function agregarMaxPlacer(scores: number[], umbral = 0.4): number {
  const max = Math.max(...scores)
  return max >= umbral ? max : 0
}

function agregarMediaSigma(scores: number[]): number {
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length
  const variance = scores.reduce((s, x) => s + (x - mean) ** 2, 0) / scores.length
  const sigma = Math.sqrt(variance)
  return mean * (1 - sigma)
}

function agregar(scores: number[], metodo: string): number {
  switch (metodo) {
    case 'promedio':    return agregarPromedio(scores)
    case 'min_miseria': return agregarMinMiseria(scores)
    case 'max_placer':  return agregarMaxPlacer(scores)
    case 'media_sigma':
    default:            return agregarMediaSigma(scores)
  }
}

// ─── Handler principal ────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { group_id, metodo = 'media_sigma' } = await req.json()
    if (!group_id) throw new Error('group_id requerido')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // 1. Obtener miembros del grupo con sus preferencias
    const { data: members, error: membErr } = await supabase
      .from('group_members')
      .select('user_id, user_preferences(favorite_genres, depth_preference, openness_score)')
      .eq('group_id', group_id)

    if (membErr) throw membErr
    if (!members?.length) throw new Error('El grupo no tiene miembros')

    // 2. Obtener todos los libros
    const { data: books, error: bookErr } = await supabase
      .from('books')
      .select('id, nombre_libro, autor, genero, complexity')
      .limit(50)

    if (bookErr) throw bookErr
    if (!books?.length) throw new Error('No hay libros en la base de datos')

    // 3. Calcular score grupal para cada libro
    const scored = books.map(book => {
      const bookVec = bookToVector(book)

      const scores = members.map((m: any) => {
        const prefs = m.user_preferences ?? {}
        const userVec = prefsToVector(prefs)
        return cosineSim(userVec, bookVec)
      })

      const groupScore = agregar(scores, metodo)

      const maxScore = Math.max(...scores)
      const minScore = Math.min(...scores)
      const polarization = maxScore - minScore

      return {
        book_id: book.id,
        final_score: groupScore,
        explanation: {
          metodo,
          scores_individuales: scores,
          polarizacion: polarization,
          why_recommended: polarization < 0.3
            ? 'Consenso sólido en el grupo'
            : 'Divide opiniones — alta diversidad',
        }
      }
    })

    // 4. Ordenar y tomar top 3
    const top3 = scored
      .sort((a, b) => b.final_score - a.final_score)
      .slice(0, 3)
      .map((r, i) => ({
        group_id,
        book_id: r.book_id,
        rank: i + 1,
        final_score: r.final_score,
        explanation: r.explanation,
        generated_at: new Date().toISOString(),
      }))

    // 5. Guardar en Supabase (borra las anteriores primero)
    await supabase
      .from('group_recommendations')
      .delete()
      .eq('group_id', group_id)

    const { error: insertErr } = await supabase
      .from('group_recommendations')
      .insert(top3)

    if (insertErr) throw insertErr

    return new Response(
      JSON.stringify({ ok: true, recommendations: top3 }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})