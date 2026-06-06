import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { archetype, preferences } = await req.json()

    const apiKey = Deno.env.get('readmatch-api-key')
    if (!apiKey) throw new Error('readmatch-api-key secret not configured')

    const topBooks = preferences.top_books
      ?.map((b: { title?: string; nombre_libro?: string }) => b.title ?? b.nombre_libro)
      .filter(Boolean)
      .join(', ') ?? 'not specified'

    const prompt = `Eres un experto en perfiles lectores.
El usuario es un lector con perfil: ${archetype}

Sus datos:
- Géneros favoritos: ${preferences.favorite_genres?.join(', ') ?? 'variados'}
- Estilos narrativos: ${preferences.narrative_styles?.join(', ') ?? 'variados'}
- Profundidad: ${preferences.depth_preference ?? 'balanced'}
- Apertura a nuevos géneros: ${preferences.openness_score ?? 50}/100
- Valores al leer en grupo: ${preferences.group_values?.join(', ') ?? 'variados'}
- Libros favoritos: ${topBooks}

Escribe EXACTAMENTE 2 oraciones en español, en segunda persona, cálidas y precisas, que describan su personalidad como lector y cómo aporta a un grupo de lectura. Solo las 2 oraciones, sin títulos ni explicaciones adicionales.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 150,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const errBody = await response.text()
      throw new Error(`Claude API error ${response.status}: ${errBody}`)
    }

    const data = await response.json()
    const revealText = data.content?.[0]?.text ?? ''

    return new Response(
      JSON.stringify({ revealText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
