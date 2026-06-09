from __future__ import annotations

from typing import Any

from supabase import Client, create_client

from .config import settings


def get_supabase_client() -> Client:
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise RuntimeError("SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY son obligatorios")
    return create_client(settings.supabase_url, settings.supabase_service_role_key)


class SupabaseRepository:
    def __init__(self, client: Client | None = None) -> None:
        self.client = client or get_supabase_client()

    def fetch_group_members(self, group_id: str) -> list[dict[str, Any]]:
        response = (
            self.client.table("group_members")
            .select("user_id, role, influence_weight, user_preferences(favorite_genres, depth_preference, openness_score)")
            .eq("group_id", group_id)
            .execute()
        )
        return response.data or []

    def fetch_books(self, limit: int = 50) -> list[dict[str, Any]]:
        response = (
            self.client.table("books")
            .select("id, nombre_libro, autor, genero, complexity")
            .limit(limit)
            .execute()
        )
        return response.data or []

    def replace_group_recommendations(self, group_id: str, rows: list[dict[str, Any]]) -> None:
        (
            self.client.table("group_recommendations")
            .delete()
            .eq("group_id", group_id)
            .execute()
        )
        if rows:
            self.client.table("group_recommendations").insert(rows).execute()

    def fetch_group_recommendations(self, group_id: str) -> list[dict[str, Any]]:
        response = (
            self.client.table("group_recommendations")
            .select("group_id, book_id, rank, final_score, explanation, generated_at, books(nombre_libro, autor, genero)")
            .eq("group_id", group_id)
            .order("rank")
            .execute()
        )
        return response.data or []

    def fetch_user_preferences(self, user_id: str) -> dict[str, Any]:
        response = (
            self.client.table("user_preferences")
            .select("*")
            .eq("user_id", user_id)
            .maybe_single()
            .execute()
        )
        return response.data or {}

    def update_group_telegram_chat(self, group_id: str, chat_id: str) -> None:
        (
            self.client.table("recommendation_groups")
            .update({"telegram_chat_id": chat_id})
            .eq("id", group_id)
            .execute()
        )
