from __future__ import annotations

import math
from statistics import mean
from typing import Any


ALL_TAGS = [
    "literary",
    "sci-fi",
    "fantasy",
    "mystery",
    "romance",
    "memoir",
    "essays",
    "history",
    "horror",
    "poetry",
    "climate",
    "politics",
    "dark",
    "thriller",
    "nonfiction",
    "slice-of-life",
]

ALL_STYLES = [
    "dark academia",
    "cozy fantasy",
    "psychological",
    "emotional narratives",
    "philosophical",
    "fast thrillers",
    "sci-fi worlds",
    "character-driven",
]

ALL_GROUP_VALUES = ["fun", "perspectives", "harmony", "emo", "quality", "deep"]


def normalize_tag(value: str) -> str:
    return value.strip().lower()


def cosine_similarity(vec_a: list[float], vec_b: list[float]) -> float:
    dot = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = math.sqrt(sum(a * a for a in vec_a))
    norm_b = math.sqrt(sum(b * b for b in vec_b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


def preferences_to_vector(preferences: dict[str, Any]) -> list[float]:
    signals: set[str] = set()

    for g in (preferences.get("favorite_genres") or []):
        signals.add(normalize_tag(str(g)))

    for s in (preferences.get("narrative_styles") or []):
        signals.add(normalize_tag(str(s)))

    for v in (preferences.get("group_values") or []):
        signals.add(normalize_tag(str(v)))

    for a in (preferences.get("favorite_authors") or []):
        signals.add(normalize_tag(str(a)))

    tag_vec = [
        1.0 if any(tag in signal or signal in tag for signal in signals) else 0.0
        for tag in ALL_TAGS
    ]

    depth_preference = str(preferences.get("depth_preference") or "balanced").lower().strip()
    depth = {
        "light": 0.25,
        "balanced": 0.5,
        "deep": 1.0,
        "experimental": 0.9,
    }.get(depth_preference, 0.5)

    openness = float(preferences.get("openness_score") or 60) / 100.0
    openness = max(0.0, min(1.0, openness))

    return [*tag_vec, depth, openness]


def book_to_vector(book: dict[str, Any]) -> list[float]:
    signals: set[str] = set()

    raw_genre = book.get("genero") or ""
    if raw_genre:
        signals.add(normalize_tag(str(raw_genre)))

    raw_trope = book.get("trope") or ""
    if raw_trope:
        signals.add(normalize_tag(str(raw_trope)))

    raw_tags = book.get("tags") or []
    if isinstance(raw_tags, str):
        raw_tags = [t.strip() for t in raw_tags.replace("{", "").replace("}", "").split(",") if t.strip()]
    for t in raw_tags:
        signals.add(normalize_tag(str(t)))

    tag_vec = [
        1.0 if any(tag in signal or signal in tag for signal in signals) else 0.0
        for tag in ALL_TAGS
    ]

    raw_complexity = str(book.get("complejidad_narrativa") or "medium").lower().strip()
    complexity = {"low": 0.25, "medium": 0.5, "high": 1.0}.get(raw_complexity, 0.5)

    popularity = float(book.get("popularity_score") or 0.1)
    popularity = max(0.0, min(1.0, popularity))

    content_vec = book.get("content_vector")
    if isinstance(content_vec, dict):
        prebuilt = content_vec.get("vector")
        if isinstance(prebuilt, list) and len(prebuilt) == len(ALL_TAGS) + 2:
            return [float(v) for v in prebuilt]

    return [*tag_vec, complexity, popularity]


def aggregate_scores(scores: list[float], metodo: str) -> float:
    if not scores:
        return 0.0

    if metodo == "promedio":
        return sum(scores) / len(scores)
    if metodo == "min_miseria":
        return min(scores)
    if metodo == "max_placer":
        high = max(scores)
        return high if high >= 0.4 else 0.0

    score_mean = mean(scores)
    variance = sum((item - score_mean) ** 2 for item in scores) / len(scores)
    sigma = math.sqrt(variance)
    return score_mean * (1 - sigma)


def build_per_member_scores(members: list[dict[str, Any]], scores: list[float]) -> list[dict[str, Any]]:
    return [
        {
            "user_id": member.get("user_id"),
            "role": member.get("role"),
            "score": round(score, 6),
        }
        for member, score in zip(members, scores)
    ]


def compute_member_coverage(scores: list[float], threshold: float = 0.4) -> float:
    if not scores:
        return 0.0
    covered = sum(1 for score in scores if score >= threshold)
    return covered / len(scores)


def build_stats(members: list[dict[str, Any]], scores: list[float], final_score: float) -> dict[str, Any]:
    if not scores:
        return {
            "content_score": 0.0,
            "collaborative_score": 0.0,
            "popularity_score": 0.5,
            "fairness_score": 0.0,
            "member_coverage": 0.0,
            "per_member_scores": [],
        }

    score_mean = mean(scores)
    polarization = max(scores) - min(scores)
    fairness_score = max(0.0, 1.0 - polarization)
    member_coverage = compute_member_coverage(scores)

    return {
        "content_score": score_mean,
        # This is the group-level score after aggregating member preferences.
        "collaborative_score": final_score,
        # Neutral baseline until popularity signals (votes/clicks) exist.
        "popularity_score": 0.5,
        "fairness_score": fairness_score,
        "member_coverage": member_coverage,
        "per_member_scores": build_per_member_scores(members, scores),
    }


def build_explanation(scores: list[float], metodo: str) -> dict[str, Any]:
    if not scores:
        return {
            "metodo": metodo,
            "scores_individuales": [],
            "polarizacion": 0.0,
            "why_recommended": "Aun no hay suficientes perfiles para justificar una recomendacion.",
        }

    max_score = max(scores)
    min_score = min(scores)
    polarization = max_score - min_score

    return {
        "metodo": metodo,
        "scores_individuales": scores,
        "polarizacion": polarization,
        "why_recommended": (
            "Consenso solido en el grupo"
            if polarization < 0.3
            else "Divide opiniones pero amplifica la diversidad del grupo"
        ),
    }


def score_group_books(
    members: list[dict[str, Any]],
    books: list[dict[str, Any]],
    group_id: str,
    metodo: str,
    top_n: int,
) -> list[dict[str, Any]]:
    scored: list[dict[str, Any]] = []

    for book in books:
        book_vec = book_to_vector(book)
        member_scores: list[float] = []

        for member in members:
            preferences = member.get("user_preferences") or {}
            user_vec = preferences_to_vector(preferences)
            member_scores.append(cosine_similarity(user_vec, book_vec))

        final_score = aggregate_scores(member_scores, metodo)
        stats = build_stats(members, member_scores, final_score)
        explanation = build_explanation(member_scores, metodo)

        scored.append(
            {
                "group_id": group_id,
                "book_id": book["id"],
                "rank": 0,
                "final_score": final_score,
                **stats,
                "explanation": explanation,
            }
        )

    ranked = sorted(scored, key=lambda item: item["final_score"], reverse=True)[:top_n]

    for index, item in enumerate(ranked, start=1):
        item["rank"] = index

    return ranked
