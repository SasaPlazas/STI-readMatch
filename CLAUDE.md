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
# Install backend dependencies (Python venv is at backend/.venv/)
pip install -r backend/requirements.txt
```

There is no test runner or linter configured in this project.

## Architecture

**ReadMatch** is an Expo-managed React Native app (iOS, Android, Web) for book-group discovery and reading recommendations, backed by a FastAPI service and Supabase.

### Entry flow

```
index.js → App.js → AuthProvider + NavigationContainer + AppNavigator
```

`AppNavigator` (`src/navigation/AppNavigator.js`) branches based on platform and screen width:
- **Mobile / narrow web** (`width < 1024`): `RootNavigator`
- **Desktop web** (`Platform.OS === 'web' && width >= 1024`): `WebDesktopNavigator`

Both navigators render either **AuthStack** or **AppStack** based on `user?.completedOnboarding`.

- **AuthStack**: Splash → SignIn → CreateAccount → 5 onboarding screens (Identity, Behavior, Personality, Collab, Reveal)
- **AppStack**: Home, Book, Groups, Compatibility, Settings, etc. Desktop screens live in `src/screens/desktop/`.

### State management

`src/context/AuthContext.js` is the sole global state provider. It wraps Supabase auth — `session` is the raw Supabase session and `user` is derived from it (`{ id, email, name, completedOnboarding }`). All screens consume this via `useAuth()`.

The `completedOnboarding` flag is stored in Supabase `user_metadata` and controls which stack is shown. Both `completedOnboarding` and `completed_onboarding` are checked for backwards compatibility.

### Data layer

**Supabase** is the persistence layer. Key tables: `user_preferences`, `books`, `recommendation_groups`, `group_members`, `group_recommendations`, `user_weights`.

`src/utils/userStorage.js` is the primary Supabase client for reads/writes: upserts user preferences, creates groups (via the `create_group_with_admin` RPC), joins groups by link, and triggers backend recommendation recomputes. The `books` table uses `ol_key` (Open Library key) as the upsert conflict column.

`src/data/sample.js` still exists but only contains fallback/mock data for UI scaffolding.

### Author search

`OnbIdentityScreen` searches authors first from `user_preferences.favorite_authors` in Supabase. If fewer than 3 results match, it falls back to the **Open Library API** (`https://openlibrary.org/search/authors.json`). This is the only external API call made from the frontend other than the backend.

### Backend (FastAPI)

`backend/app/main.py` — FastAPI service deployed on Render at `https://sti-readmatch.onrender.com` (defined in `backend/render.yaml`).

- `POST /api/recommendations/recompute` — runs the scoring algorithm and persists results to `group_recommendations`
- `GET /api/groups/{group_id}/recommendations` — returns stored recommendations
- `POST /api/reveal` — assigns a reader archetype and generates an AI-written reveal text
- `POST /api/telegram/recommend`, `/explain`, `/connect` — Telegram bot endpoints

`backend/app/recommender.py` implements the group scoring algorithm using cosine similarity between user preference vectors and book vectors. The `metodo` parameter controls aggregation:
- `media_sigma` (default) — mean minus one standard deviation (penalizes polarization)
- `promedio` — simple average
- `min_miseria` — minimum individual score
- `max_placer` — maximum score, clamped to 0 if below 0.4

`backend/app/reveal.py` assigns reader archetypes (The Philosopher, The Explorer, Dark Academic, etc.) by rule matching, then calls the Anthropic API to generate personalized text. Falls back to a template string if `ANTHROPIC_API_KEY` is not set.

`src/lib/api.js` wraps all frontend→backend calls with a 30 s timeout and JSON error unwrapping. Use `apiFetch(path, options)` for any backend call. `src/utils/userStorage.js` calls `triggerGroupRecommendations()` after group creation/join.

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

### Design system

`src/theme/tokens.js` defines all colors, border radii, and spacing. Always use tokens rather than raw values. Key color names: `purple`, `violet`, `lime`, `coral`, `cream`, `ink`, `lavender`.

Reusable components in `src/components/`: `RMButton` (variants: primary/dark/ghost), `Avatar`, `BookCover`, `Ring` (circular score indicator), `Pill`, `Screen` (safe-area wrapper), `TopBar`.

### Route names

Defined as constants in `src/navigation/routes.js` — always use these constants rather than raw strings when calling `navigation.navigate()`.
