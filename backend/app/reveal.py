from __future__ import annotations

from typing import Any

import httpx

from .config import settings


ARCHETYPES = [
    {
        "label": "The Philosopher",
        "rules": [
            lambda p: any(style in (p.get("narrative_styles") or []) for style in ["Philosophical", "Psychological"]),
            lambda p: len([g for g in ["Literary", "Essays", "History"] if g in (p.get("favorite_genres") or [])]) >= 2,
            lambda p: p.get("depth_preference") in ["deep", "experimental"],
        ],
    },
    {
        "label": "The Explorer",
        "rules": [
            lambda p: len(p.get("favorite_genres") or []) >= 5,
            lambda p: len(p.get("narrative_styles") or []) >= 3,
            lambda p: (p.get("openness_score") or 0) > 65,
        ],
    },
    {
        "label": "Dark Academic",
        "rules": [
            lambda p: "Dark Academia" in (p.get("narrative_styles") or []),
            lambda p: any(item in (p.get("favorite_genres") or []) for item in ["Mystery", "Horror", "Literary"]),
            lambda p: p.get("depth_preference") in ["deep", "experimental"],
        ],
    },
    {
        "label": "The Romantic",
        "rules": [
            lambda p: any(g in (p.get("favorite_genres") or []) for g in ["Romance", "Memoir"]),
            lambda p: any(s in (p.get("narrative_styles") or []) for s in ["Emotional", "Character-driven"]),
            lambda p: "emo" in (p.get("group_values") or []),
            lambda p: p.get("depth_preference") in ["light", "balanced"],
        ],
    },
    {
        "label": "The Visionary",
        "rules": [
            lambda p: "Sci-Fi" in (p.get("narrative_styles") or []),
            lambda p: "Sci-Fi" in (p.get("favorite_genres") or []),
            lambda p: any(v in (p.get("group_values") or []) for v in ["perspectives", "deep"]),
            lambda p: (p.get("openness_score") or 0) > 50,
        ],
    },
    {
        "label": "The Storyteller",
        "rules": [
            lambda p: "Fast Thrillers" in (p.get("narrative_styles") or []),
            lambda p: any(g in (p.get("favorite_genres") or []) for g in ["Fantasy", "Mystery"]),
            lambda p: p.get("depth_preference") in ["light", "balanced"],
            lambda p: "fun" in (p.get("group_values") or []),
        ],
    },
    {
        "label": "The Cozy Reader",
        "rules": [
            lambda p: "Cozy Fantasy" in (p.get("narrative_styles") or []),
            lambda p: p.get("depth_preference") == "light",
            lambda p: any(v in (p.get("group_values") or []) for v in ["harmony", "emo"]),
            lambda p: (p.get("openness_score") or 0) < 60,
        ],
    },
    {
        "label": "The Chronicler",
        "rules": [
            lambda p: len([g for g in ["History", "Memoir", "Politics"] if g in (p.get("favorite_genres") or [])]) >= 2,
            lambda p: p.get("depth_preference") in ["balanced", "deep"],
            lambda p: any(v in (p.get("group_values") or []) for v in ["perspectives", "quality"]),
        ],
    },
]


def assign_archetype(preferences: dict[str, Any]) -> str:
    best_label = "The Explorer" if (preferences.get("openness_score") or 0) > 70 else "The Philosopher"
    best_score = -1.0

    for archetype in ARCHETYPES:
        passed = sum(1 for rule in archetype["rules"] if rule(preferences))
        if passed == len(archetype["rules"]):
            return archetype["label"]

        score = passed / len(archetype["rules"])
        if score > best_score:
            best_score = score
            best_label = archetype["label"]

    return best_label


def fallback_reveal(archetype: str, preferences: dict[str, Any]) -> str:
    genres = ", ".join(preferences.get("favorite_genres") or ["lecturas variadas"])
    group_values = ", ".join(preferences.get("group_values") or ["conversacion honesta"])
    return (
        f"Tu perfil lector se acerca a {archetype}: exploras {genres} y aportas profundidad a cada conversacion. "
        f"En grupo sueles fortalecer el intercambio de ideas desde valores como {group_values}."
    )


async def generate_reveal_text(archetype: str, preferences: dict[str, Any]) -> str:
    if not settings.anthropic_api_key:
        return fallback_reveal(archetype, preferences)

    top_books = ", ".join(
        book.get("title") or book.get("nombre_libro") or ""
        for book in (preferences.get("top_books") or [])
        if (book.get("title") or book.get("nombre_libro"))
    ) or "no especificados"

    prompt = f"""Eres un experto en perfiles lectores.
El usuario tiene el arquetipo {archetype}.
Genera EXACTAMENTE 2 oraciones en espanol, en segunda persona, calidas y precisas.
Usa estos datos:
- generos: {", ".join(preferences.get("favorite_genres") or ["variados"])}
- estilos: {", ".join(preferences.get("narrative_styles") or ["variados"])}
- profundidad: {preferences.get("depth_preference", "balanced")}
- apertura: {preferences.get("openness_score", 50)}/100
- valores grupales: {", ".join(preferences.get("group_values") or ["variados"])}
- libros favoritos: {top_books}
No agregues titulos ni listas."""

    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            "https://api.anthropic.com/v1/messages",
            headers={
                "Content-Type": "application/json",
                "x-api-key": settings.anthropic_api_key,
                "anthropic-version": "2023-06-01",
            },
            json={
                "model": settings.anthropic_model,
                "max_tokens": 150,
                "messages": [{"role": "user", "content": prompt}],
            },
        )

    if response.is_error:
        return fallback_reveal(archetype, preferences)

    payload = response.json()
    return payload.get("content", [{}])[0].get("text") or fallback_reveal(archetype, preferences)
