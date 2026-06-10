# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start Expo dev server (prompts for platform choice)
npm start

# Target a specific platform directly
npm run android
npm run ios
npm run web
```

```bash
# Run the FastAPI backend locally
uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
```

```bash
# Activate the Python venv (backend/.venv/) and install dependencies
# Windows:
backend\.venv\Scripts\activate
# macOS/Linux:
source backend/.venv/bin/activate

pip install -r backend/requirements.txt
```

There is no test runner or linter configured in this project.

## Architecture

**ReadMatch** is an Expo-managed React Native app (iOS, Android, Web) for book-group discovery and reading recommendations, backed by a FastAPI service and Supabase.

### Entry flow

```
index.js → App.js → AuthProvider + NavigationContainer + AppNavigator
```

`AppNavigator` (`src/navigation/AppNavigator.js`) is a thin wrapper for `RootNavigator` (`src/navigation/RootNavigator.js`), which renders either **AuthStack** or **AppStack** based on `user?.completedOnboarding`.

- **AuthStack**: Splash → SignIn → CreateAccount → 5 onboarding screens (Identity, Behavior, Personality, Collab, Reveal)
- **AppStack**: Home, Book, Explain, Personality, CreateGroup, JoinGroup, GroupDetail, GroupPreview, Invite, GroupSettings, Sync

Three screen files (`VoteScreen.js`, `NotificationsScreen.js`, `CompatibilityScreen.js`) exist in `src/screens/` but are **not registered** in `routes.js` or any navigator — they are works-in-progress, not yet reachable.

The root-level `screens/` directory (`.jsx` files like `01-splash.jsx`, `02a-onb-identity.jsx`) contains **design prototypes only** — not the running app code. All active screens are under `src/screens/`.

### State management

`src/context/AuthContext.js` is the sole global state provider. It wraps Supabase auth — `session` is the raw Supabase session and `user` is derived from it (`{ id, email, name, completedOnboarding }`). All screens consume this via `useAuth()`.

The `completedOnboarding` flag is stored in Supabase `user_metadata` and controls which stack is shown. Both `completedOnboarding` and `completed_onboarding` are checked for backwards compatibility.

### Data layer

**Supabase** is the persistence layer. Key tables: `user_preferences`, `books`, `recommendation_groups`, `group_members`, `group_recommendations`, `user_weights`.

`src/utils/userStorage.js` is the primary Supabase client for reads/writes: upserts user preferences, creates groups (via the `create_group_with_admin` RPC), joins groups by link, and triggers backend recommendation recomputes. The `books` table uses `ol_key` (Open Library key) as the upsert conflict column. Groups have a `join_code` column (requires migration: `ALTER TABLE recommendation_groups ADD COLUMN IF NOT EXISTS join_code text UNIQUE`).

`GroupDetailScreen` uses the `search_users` RPC to search for users to invite, with a fallback to a direct `user_preferences` ilike query if the RPC is unavailable. `GroupDetailScreen` also subscribes to real-time Supabase inserts on `group_recommendations` to auto-refresh when a recompute completes.

`src/data/sample.js` still exists but only contains fallback/mock data for UI scaffolding.

Key `user_preferences` columns (populated during onboarding): `favorite_genres[]`, `narrative_styles[]`, `group_values[]`, `depth_preference`, `openness_score`, `favorite_authors[]`, `preferred_languages[]`, `preferred_complexity[]`, `content_preferences[]`. These map directly to the onboarding screen inputs and feed the backend scoring vectors.

### Author search

`OnbIdentityScreen` searches authors first from `user_preferences.favorite_authors` in Supabase. If fewer than 3 results match, it falls back to the **Open Library API** (`https://openlibrary.org/search/authors.json`). This is the only external API call made from the frontend other than the backend.

### Backend (FastAPI)

`backend/app/main.py` — FastAPI service deployed on Render at `https://sti-readmatch-production.up.railway.app`. Deployment configs: `backend/render.yaml` (Render), `backend/railway.toml` + `backend/nixpacks.toml` (Railway alternative).

Key backend modules:
- `backend/app/models.py` — Pydantic request/response models (`RecommendationRequest`, `RevealRequest`, `TelegramRecommendRequest`, `TelegramExplainRequest`, `HealthResponse`)
- `backend/app/supabase_service.py` — `SupabaseRepository` class; all Supabase reads/writes from the backend go through this class
- `backend/app/recommender.py` — group scoring algorithm (cosine similarity)
- `backend/app/reveal.py` — archetype assignment and AI text generation
- `backend/app/config.py` — `Settings` dataclass loaded from environment via `dotenv`

API endpoints:
- `GET /health/supabase` — checks Supabase connectivity and table access
- `POST /api/recommendations/recompute` — runs the scoring algorithm and persists results to `group_recommendations`
- `GET /api/groups/{group_id}/recommendations` — returns stored recommendations
- `POST /api/reveal` — assigns a reader archetype and generates an AI-written reveal text
- `POST /api/telegram/recommend`, `/explain`, `/connect` — Telegram bot endpoints

`backend/app/recommender.py` implements the group scoring algorithm using cosine similarity between user preference vectors and book vectors. The `metodo` parameter controls aggregation:
- `media_sigma` (default) — mean minus one standard deviation (penalizes polarization)
- `promedio` — simple average
- `min_miseria` — minimum individual score
- `max_placer` — maximum score, clamped to 0 if below 0.4

`backend/app/reveal.py` assigns reader archetypes by rule matching, then calls the Anthropic API to generate personalized text. Falls back to a template string if `ANTHROPIC_API_KEY` is not set. The 12 archetypes (in Spanish) are: El Filósofo, La Romántica, El Explorador, El Académico Oscuro, El Visionario, El Aventurero, El Estratega, El Cronista, El Intrépido, El Soñador, El Empático, El Inconformista. `ARCHETYPE_PAIRS` defines complementary pairings for group diversity display.

`src/lib/supabase.js` initializes the Supabase client (with AsyncStorage and platform detection for React Native). Import the client from here rather than constructing a new one.

`src/lib/api.js` wraps all frontend→backend calls with a 30 s timeout and JSON error unwrapping. Use `apiFetch(path, options)` for any backend call. `src/utils/userStorage.js` calls `triggerGroupRecommendations()` after group creation/join.

### Dual algorithm implementations

There are two parallel implementations of the recommendation algorithm:

- **`src/utils/recommendations.js`** — frontend-only reference implementation that operates on `sample.js` mock data. Not connected to the backend or Supabase. Used only for UI scaffolding and offline development.
- **`backend/app/recommender.py`** — the production algorithm that runs server-side and persists results to `group_recommendations` in Supabase.

Similarly, archetype assignment logic exists in both `src/services/revealService.js` (`assignArchetype`) and `backend/app/reveal.py` (`assign_archetype`). The frontend copy is used for local preview; the backend version produces the persisted reveal result.

### Environment variables

**Frontend** (`.env` / `app.config.js` extra):
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_API_URL` — overrides the default backend URL
- `EXPO_PUBLIC_USE_LOCAL_API=true` — allows pointing at `localhost`

**Backend** (`backend/.env`):
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY` (optional — for AI-generated reveal text)
- `ANTHROPIC_MODEL` — defaults to `claude-haiku-4-5`
- `CORS_ORIGINS` — comma-separated list; defaults to Render URL + common local ports

`src/config/secrets.js` is gitignored and must never be committed — it holds local dev secrets only.

### Design system

`src/theme/tokens.js` defines all colors, border radii, and spacing. Always use tokens rather than raw values. Key color names: `purple`, `violet`, `lime`, `coral`, `cream`, `ink`, `lavender`.

Reusable components in `src/components/`: `RMButton` (variants: primary/dark/ghost), `Avatar`, `BookCover`, `Ring` (circular score indicator), `Pill`, `Screen` (safe-area wrapper), `TopBar`, `NotificationsBell`.

### Route names

Defined as constants in `src/navigation/routes.js` — always use these constants rather than raw strings when calling `navigation.navigate()`.
