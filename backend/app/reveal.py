from __future__ import annotations
from typing import Any
import httpx
from .config import settings

ARCHETYPES = [
    {
        "id": "el_filosofo",
        "label": "El Filósofo",
        "descripcion": "Lee para entender el mundo y a sí mismo. Prefiere libros densos, clásicos o de no ficción filosófica. En grupo aporta profundidad y perspectivas poco convencionales.",
    },
    {
        "id": "la_romantica",
        "label": "La Romántica",
        "descripcion": "Vive los libros desde el corazón. Le apasionan las historias de amor, los tropos emocionales y los finales que dejan huella. En grupo contagia el entusiasmo y la conexión emocional.",
    },
    {
        "id": "el_explorador",
        "label": "El Explorador",
        "descripcion": "Lee de todo, mezcla géneros sin prejuicios y tiene alta apertura a lo desconocido. En grupo es el que propone los títulos más inesperados y abre el debate.",
    },
    {
        "id": "el_academico_oscuro",
        "label": "El Académico Oscuro",
        "descripcion": "Le atrae lo perturbador, lo oscuro y lo moralmente complejo. Prefiere thrillers psicológicos, terror literario y narradores poco fiables. En grupo es el que va más a fondo.",
    },
    {
        "id": "el_visionario",
        "label": "El Visionario",
        "descripcion": "Piensa en grande. Le fascinan la ciencia ficción, las distopías y los libros que reimaginan el futuro o cuestionan la sociedad. En grupo plantea las preguntas más grandes.",
    },
    {
        "id": "el_aventurero",
        "label": "El Aventurero",
        "descripcion": "Lee para escapar y vivir otras vidas. Le encantan la fantasía épica, los viajes del héroe y los mundos construidos con detalle. En grupo arrastra al resto a mundos nuevos.",
    },
    {
        "id": "el_estratega",
        "label": "El Estratega",
        "descripcion": "Lee con propósito. Le interesan los negocios, la tecnología, la innovación y los libros que dan herramientas reales. En grupo es el que conecta las lecturas con la vida práctica.",
    },
    {
        "id": "el_cronista",
        "label": "El Cronista",
        "descripcion": "Le apasiona la historia, las memorias y entender cómo llegamos hasta aquí. Lee despacio y con atención. En grupo aporta contexto y memoria.",
    },
    {
        "id": "el_intrepido",
        "label": "El Intrépido",
        "descripcion": "Lee por adrenalina. Adora los thrillers de acción, las historias de supervivencia y los ritmos rápidos. En grupo propone lecturas que mantienen enganchado a todo el mundo.",
    },
    {
        "id": "el_sonador",
        "label": "El Soñador",
        "descripcion": "Lee con calma y calidez. Prefiere historias ligeras, manga, juveniles o fantásticas con corazón. En grupo es el que cuida el ambiente y hace que todos se sientan bienvenidos.",
    },
    {
        "id": "el_empatico",
        "label": "El Empático",
        "descripcion": "Lee para sentir y comprender a otros. Le atraen las historias de redención, las relaciones complejas y los personajes con mucho mundo interior. En grupo es el que más escucha.",
    },
    {
        "id": "el_inconformista",
        "label": "El Inconformista",
        "descripcion": "Busca lo raro, lo experimental y lo que desafía las convenciones. Alta apertura, baja tolerancia a lo predecible. En grupo es la voz crítica que eleva la conversación.",
    },
]

ARCHETYPE_LABELS = [a["label"] for a in ARCHETYPES]

ARCHETYPE_PAIRS = {
    "El Filósofo":         ["El Explorador", "El Académico Oscuro", "El Cronista"],
    "La Romántica":        ["El Empático", "El Soñador", "El Aventurero"],
    "El Explorador":       ["El Filósofo", "El Visionario", "El Cronista"],
    "El Académico Oscuro": ["El Filósofo", "El Cronista", "El Visionario"],
    "El Visionario":       ["El Explorador", "El Filósofo", "El Académico Oscuro"],
    "El Aventurero":       ["El Intrépido", "El Soñador", "El Explorador"],
    "El Estratega":        ["El Visionario", "El Cronista", "El Explorador"],
    "El Cronista":         ["El Filósofo", "El Académico Oscuro", "El Estratega"],
    "El Intrépido":        ["El Aventurero", "El Explorador", "El Académico Oscuro"],
    "El Soñador":          ["La Romántica", "El Aventurero", "El Empático"],
    "El Empático":         ["La Romántica", "El Soñador", "El Cronista"],
    "El Inconformista":    ["El Filósofo", "El Visionario", "El Académico Oscuro"],
}


def fallback_assign(preferences: dict[str, Any]) -> str:
    openness = preferences.get("openness_score") or 0
    depth = preferences.get("depth_preference") or "balanced"
    genres = preferences.get("favorite_genres") or []

    if depth == "experimental" or openness > 85:
        return "El Inconformista"
    if "Ciencia ficción" in genres or "Distopía" in genres:
        return "El Visionario"
    if "Romance" in genres or "Romantasy" in genres:
        return "La Romántica"
    if "Fantasía" in genres or "Juvenil" in genres:
        return "El Aventurero"
    if "Terror" in genres or "Thriller" in genres:
        return "El Académico Oscuro"
    if "Negocios" in genres or "Tecnología" in genres:
        return "El Estratega"
    if openness > 65:
        return "El Explorador"
    return "El Filósofo"


def fallback_reveal(archetype: str, preferences: dict[str, Any]) -> str:
    genres = ", ".join(preferences.get("favorite_genres") or ["lecturas variadas"])
    values = ", ".join(preferences.get("group_values") or ["conversación honesta"])
    return (
        f"Tu perfil lector encaja con {archetype}: exploras {genres} y aportas "
        f"profundidad desde valores como {values}."
    )


async def generate_reveal(preferences: dict[str, Any]) -> dict[str, str]:
    """
    Llama a la IA con el perfil completo y la lista de arquetipos.
    Devuelve {"archetype": str, "reveal_text": str}.
    Si la IA no está disponible, usa fallback.
    """
    if not settings.anthropic_api_key:
        archetype = fallback_assign(preferences)
        return {"archetype": archetype, "reveal_text": fallback_reveal(archetype, preferences)}

    archetypes_desc = "\n".join(
        f'- {a["label"]}: {a["descripcion"]}' for a in ARCHETYPES
    )

    top_books = ", ".join(
        book.get("title") or book.get("nombre_libro") or ""
        for book in (preferences.get("top_books") or [])
        if (book.get("title") or book.get("nombre_libro"))
    ) or "no especificados"

    prompt = f"""Eres un experto en perfiles lectores para una app de clubes de lectura llamada ReadMatch.

Tienes el perfil completo de un usuario:
- Géneros favoritos: {", ".join(preferences.get("favorite_genres") or ["variados"])}
- Tropos/estilos narrativos: {", ".join(preferences.get("narrative_styles") or ["variados"])}
- Profundidad de lectura: {preferences.get("depth_preference") or "balanced"}
- Apertura a lo nuevo: {preferences.get("openness_score") or 50}/100
- Valores en grupo: {", ".join(preferences.get("group_values") or ["variados"])}
- Idiomas en los que lee: {", ".join(preferences.get("preferred_languages") or ["Español"])}
- Preferencia de contenido: {(preferences.get("content_preferences") or ["all"])[0]}
- Libros favoritos: {top_books}
- Autores favoritos: {", ".join(preferences.get("favorite_authors") or ["variados"])}

Los arquetipos disponibles son:
{archetypes_desc}

TAREA:
1. Elige el arquetipo que mejor describe a este lector. Solo uno.
2. Escribe exactamente 2 oraciones en español, en segunda persona, cálidas y precisas,
   que le digan al usuario quién es como lector. No menciones el nombre del arquetipo
   en el texto, solo descríbelo. No uses listas ni títulos.

Responde ÚNICAMENTE en este formato JSON, sin texto adicional, sin backticks:
{{"archetype": "nombre exacto del arquetipo", "reveal_text": "las dos oraciones aquí"}}"""

    try:
        async with httpx.AsyncClient(timeout=25.0) as client:
            response = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "Content-Type": "application/json",
                    "x-api-key": settings.anthropic_api_key,
                    "anthropic-version": "2023-06-01",
                },
                json={
                    "model": settings.anthropic_model,
                    "max_tokens": 300,
                    "messages": [{"role": "user", "content": prompt}],
                },
            )

        if response.is_error:
            raise ValueError(f"API error {response.status_code}")

        payload = response.json()
        raw = payload.get("content", [{}])[0].get("text", "").strip()

        import json
        result = json.loads(raw)
        archetype = result.get("archetype", "").strip()
        reveal_text = result.get("reveal_text", "").strip()

        if archetype not in ARCHETYPE_LABELS:
            archetype = fallback_assign(preferences)

        if not reveal_text:
            reveal_text = fallback_reveal(archetype, preferences)

        return {"archetype": archetype, "reveal_text": reveal_text}

    except Exception:
        archetype = fallback_assign(preferences)
        return {"archetype": archetype, "reveal_text": fallback_reveal(archetype, preferences)}
