# ReadMatch FastAPI Backend

## Proposito

Este backend implementa la capa Python del proyecto ReadMatch sin reemplazar a Supabase.

- `Supabase` conserva auth, tablas y persistencia.
- `FastAPI` ejecuta el recomendador y expone endpoints reutilizables por portal y Telegram.

## Instalacion

1. Instala Python 3.12+
2. Crea un entorno virtual
3. Instala dependencias

```bash
pip install -r backend/requirements.txt
```

## Variables de entorno

Copia `backend/.env.example` y completa:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY` opcional

## Arranque local

```bash
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

## Endpoints

- `GET /health`
- `POST /api/recommendations/recompute`
- `GET /api/groups/{group_id}/recommendations`
- `POST /api/reveal`
- `POST /api/telegram/recommend`
- `POST /api/telegram/explain`
- `POST /api/telegram/connect`
