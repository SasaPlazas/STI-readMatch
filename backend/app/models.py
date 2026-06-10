from __future__ import annotations

from typing import Any, Optional

from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    group_id: str
    metodo: str = "media_sigma"
    top_n: int = 3


class RevealRequest(BaseModel):
    archetype: Optional[str] = None
    preferences: dict[str, Any] = Field(default_factory=dict)


class TelegramRecommendRequest(BaseModel):
    group_id: str
    metodo: str = "media_sigma"
    chat_id: Optional[str] = None


class TelegramExplainRequest(BaseModel):
    group_id: str
    book_id: str


class HealthResponse(BaseModel):
    status: str
    service: str

