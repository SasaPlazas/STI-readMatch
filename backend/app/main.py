from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .models import (
    HealthResponse,
    RecommendationRequest,
    RevealRequest,
    TelegramExplainRequest,
    TelegramRecommendRequest,
)
from .recommender import score_group_books
from .reveal import assign_archetype, generate_reveal_text
from .supabase_service import SupabaseRepository


app = FastAPI(title=settings.app_name, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RuntimeError)
async def runtime_error_handler(request: Request, exc: RuntimeError) -> JSONResponse:
    return JSONResponse(status_code=500, content={"detail": str(exc)})



def get_repository() -> SupabaseRepository:


@app.get("/")
async def root() -> dict[str, Any]:
    return {
        "ok": True,
        "service": settings.app_name,
        "health": "/health",
        "docs": "/docs",
    }


@app.get("/health", response_model=HealthResponse)
async def healthcheck() -> HealthResponse:
    return HealthResponse(status="ok", service=settings.app_name)


@app.post("/api/recommendations/recompute")
async def recompute_recommendations(payload: RecommendationRequest) -> dict[str, Any]:
    repo = get_repository()
    members = repo.fetch_group_members(payload.group_id)
    books = repo.fetch_books(limit=50)

    if not members:
        raise HTTPException(status_code=404, detail="El grupo no tiene miembros o perfiles asociados.")
    if not books:
        raise HTTPException(status_code=404, detail="No hay libros cargados para generar recomendaciones.")

    recommendations = score_group_books(
        members=members,
        books=books,
        group_id=payload.group_id,
        metodo=payload.metodo,
        top_n=payload.top_n,
    )

    generated_at = datetime.now(timezone.utc).isoformat()
    persisted_rows = [{**item, "generated_at": generated_at} for item in recommendations]
    repo.replace_group_recommendations(payload.group_id, persisted_rows)

    stored = repo.fetch_group_recommendations(payload.group_id)
    return {
        "ok": True,
        "group_id": payload.group_id,
        "metodo": payload.metodo,
        "recommendations": stored or persisted_rows,
    }


@app.get("/api/groups/{group_id}/recommendations")
async def get_group_recommendations(group_id: str) -> dict[str, Any]:
    repo = get_repository()
    recommendations = repo.fetch_group_recommendations(group_id)
    return {
        "group_id": group_id,
        "recommendations": recommendations,
    }


@app.post("/api/reveal")
async def reveal_profile(payload: RevealRequest) -> dict[str, Any]:
    preferences = payload.preferences or {}
    archetype = payload.archetype or assign_archetype(preferences)
    reveal_text = await generate_reveal_text(archetype, preferences)
    return {
        "archetype": archetype,
        "reveal_text": reveal_text,
    }


@app.post("/api/telegram/recommend")
async def telegram_recommend(payload: TelegramRecommendRequest) -> dict[str, Any]:
    result = await recompute_recommendations(
        RecommendationRequest(
            group_id=payload.group_id,
            metodo=payload.metodo,
            top_n=3,
        )
    )
    recommendations = result.get("recommendations") or []
    if not recommendations:
        raise HTTPException(status_code=404, detail="No se pudieron generar recomendaciones para Telegram.")

    lines = ["Estas son las recomendaciones de ReadMatch para hoy:"]
    for rec in recommendations:
        book = rec.get("books") or {}
        title = book.get("nombre_libro", "Libro sin titulo")
        author = book.get("autor", "Autor desconocido")
        score = round(float(rec.get("final_score", 0)) * 100)
        reason = (rec.get("explanation") or {}).get("why_recommended", "Buen equilibrio grupal.")
        lines.append(f"#{rec.get('rank', '?')} {title} - {author} ({score}%)")
        lines.append(f"Motivo: {reason}")

    return {
        "group_id": payload.group_id,
        "chat_id": payload.chat_id,
        "message": "\n".join(lines),
        "recommendations": recommendations,
    }


@app.post("/api/telegram/explain")
async def telegram_explain(payload: TelegramExplainRequest) -> dict[str, Any]:
    repo = get_repository()
    recommendations = repo.fetch_group_recommendations(payload.group_id)
    match = next((item for item in recommendations if item.get("book_id") == payload.book_id), None)
    if not match:
        raise HTTPException(status_code=404, detail="No existe una explicacion para ese libro en el grupo.")

    explanation = match.get("explanation") or {}
    book = match.get("books") or {}
    title = book.get("nombre_libro", "Libro sin titulo")
    reason = explanation.get("why_recommended", "Buen ajuste grupal.")
    detail = explanation.get("scores_individuales", [])

    return {
        "group_id": payload.group_id,
        "book_id": payload.book_id,
        "message": f"{title}: {reason}. Scores individuales: {detail}",
        "recommendation": match,
    }


@app.post("/api/telegram/connect")
async def telegram_connect(payload: dict[str, str]) -> dict[str, Any]:
    group_id = payload.get("group_id")
    chat_id = payload.get("chat_id")
    if not group_id or not chat_id:
        raise HTTPException(status_code=400, detail="group_id y chat_id son obligatorios.")

    repo = get_repository()
    repo.update_group_telegram_chat(group_id, chat_id)
    return {
        "ok": True,
        "group_id": group_id,
        "chat_id": chat_id,
    }
