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

There is no test runner or linter configured in this project.

## Architecture

**ReadMatch** is an Expo-managed React Native app (iOS, Android, Web) for book-group discovery and reading recommendations. All data is currently mocked in-memory — there is no backend or persistence layer yet.

### Entry flow

```
index.js → App.js → AuthProvider + NavigationContainer + RootNavigator
```

`RootNavigator` (`src/navigation/RootNavigator.js`) renders one of two stacks based on `user?.completedOnboarding`:
- **AuthStack** (unauthenticated): Splash → SignIn → CreateAccount → 5 onboarding screens (Identity, Behavior, Personality, Collab, Reveal)
- **AppStack** (authenticated): Home, Book, Groups, Compatibility, Settings, etc.

### State management

`src/context/AuthContext.js` is the sole global state provider. It holds `{ email, name, completedOnboarding }` and exposes `signIn()`, `signUp()`, `completeOnboarding()`, `signOut()`. All screens consume this via `useAuth()`.

### Data layer

All data lives in `src/data/sample.js`: books (with genre/complexity/gradient metadata), members, reading groups, and discoverable groups.

`src/utils/recommendations.js` implements the recommendation scoring algorithm:
- **50%** tag overlap (genre matching across member preferences)
- **30%** complexity match (book complexity vs. member depth preferences)
- **20%** diversity bonus (boosts books appealing to minority taste profiles)

### Design system

`src/theme/tokens.js` defines all colors, border radii, and spacing. Always use tokens rather than raw values. Key color names: `purple`, `violet`, `lime`, `coral`, `cream`, `ink`, `lavender`.

Reusable components in `src/components/`: `RMButton` (variants: primary/dark/ghost), `Avatar`, `BookCover`, `Ring` (circular score indicator), `Pill`, `Screen` (safe-area wrapper), `TopBar`.

### Route names

Defined as constants in `src/navigation/routes.js` — always use these constants rather than raw strings when calling `navigation.navigate()`.
