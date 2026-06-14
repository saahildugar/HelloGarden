# HelloGarden — Session State
> **Purpose**: Exact snapshot of where we left off. Read this at the start of every new session to pick up instantly.
> **Last Updated**: 2026-06-14 (End of Session 3 — Phase 1 complete)

---

## WHERE WE LEFT OFF

**Phase 1 is COMPLETE. Phase 2 — Auth & Onboarding is NEXT.**

Tell Claude: *"Let's start Phase 2 — Auth and Onboarding."*

---

## CURRENT STATUS

### Pre-Coding (All Done)
- [x] Product decisions finalized (PROD_DOC.md)
- [x] GitHub repo: https://github.com/saahildugar/HelloGarden
- [x] Supabase project: okpspirezabgmevjegmg (us-east-1, saahildugar account)
- [x] PowerSync connected to Supabase (`powersync` publication created)
- [x] All API keys in env.local (see table below)
- [x] Market research, SeedBox cost analysis, UI/UX research (research/)
- [x] Full UI architecture: 27 screens, all product decisions, 4-tab nav (PROD_DOC.md Section 8)
- [x] Mockups: SKIPPED — architecture doc is the spec, coded screens are the visual reference

### Phase 1 — Project Foundation (COMPLETE)
- [x] Expo SDK 56 / React 19.2.3 / React Native 0.85.3 initialized
- [x] All packages installed:
  - Supabase JS, WatermelonDB, PowerSync, Zustand
  - Stripe React Native, Sentry, Gemini AI
  - expo-router, expo-camera, expo-notifications, expo-image-picker
  - expo-location, expo-secure-store, expo-font, expo-constants
  - expo-splash-screen, expo-dev-client, expo-linking
  - react-native-reanimated, react-native-gesture-handler, react-native-screens, react-native-safe-area-context
- [x] Folder structure: /app /components /hooks /stores /lib /types /constants /db /assets
- [x] app.config.ts — bundle ID com.hellogarden.app, all plugins, dotenv loads env.local
- [x] babel.config.js — includes reanimated plugin
- [x] metro.config.js — .mjs support for WatermelonDB
- [x] Design system files:
  - constants/Colors.ts — full color palette + Theme (light/dark)
  - constants/Typography.ts — all text styles
  - constants/Spacing.ts — spacing, border radius, shadows, MIN_TOUCH_TARGET
  - hooks/useTheme.ts — system-aware theme hook
- [x] Expo Router shell:
  - app/_layout.tsx — root layout, splash screen, StatusBar
  - app/index.tsx — redirects to /(tabs)
  - app/(tabs)/_layout.tsx — 4-tab layout (Home / Garden / Explore / SeedBox)
  - app/(tabs)/index.tsx — Home placeholder
  - app/(tabs)/garden.tsx — Garden placeholder
  - app/(tabs)/explore.tsx — Explore placeholder
  - app/(tabs)/seedbox.tsx — SeedBox placeholder
- [x] lib/env.ts — type-safe access to all env vars
- [x] lib/supabase.ts — Supabase client with SecureStore session persistence
- [x] types/database.ts — full TypeScript types for all 14 Supabase tables
- [x] Supabase schema: 14 tables, all indexes, all RLS policies, auto-profile trigger on signup
- [x] TypeScript: zero errors
- [x] Committed to GitHub (commit: f0f94f9)

### What's NOT Done Yet
- [ ] Phase 2: Auth screens + onboarding flow — NEXT
- [ ] Phase 3: Core app (home dashboard, plant tracking, encyclopedia, care reminders, offline layer)
- [ ] Phase 4: Features (planner, Plant ID, weather, photo journal, calendar)
- [ ] Phase 5: Monetization (SeedBox + Stripe)
- [ ] Phase 6: AI + Polish
- [ ] Phase 7: Launch Prep

---

## NEXT STEPS — PHASE 2: AUTH & ONBOARDING

### What to build:
1. **Auth store (Zustand)** — `stores/authStore.ts`
   - Session state, user profile, loading/error states
   - Subscribe to `supabase.auth.onAuthStateChange`

2. **Auth screens** — `app/(auth)/`
   - `_layout.tsx` — auth stack layout
   - `sign-in.tsx` — email + password + Google + Apple buttons
   - `sign-up.tsx` — email + password + confirm + social buttons
   - Supabase Auth calls wired to authStore

3. **Onboarding screens** — `app/onboarding/`
   - `_layout.tsx` — onboarding stack (no gestures back)
   - `welcome.tsx` — Screen 1: logo, tagline, "Get Started", "Sign In" link
   - `setup.tsx` — Screen 2: ZIP input + zone detection (phzmapi.org) + experience chips + garden type chips
   - `create-garden.tsx` — Screen 3: garden name input + emoji picker + type display + "Create Garden"

4. **Navigation guard** — update `app/_layout.tsx`
   - Check auth state on mount
   - No session + no onboarding → redirect to `/onboarding/welcome`
   - No session + onboarding complete → redirect to `/(auth)/sign-in`
   - Session exists → redirect to `/(tabs)`

5. **API utility** — `lib/zones.ts`
   - `getZoneFromZip(zip: string)` — calls phzmapi.org, returns USDA zone string
   - Called during onboarding setup screen after ZIP entry

6. **Profile persistence** — save onboarding data to Supabase `profiles` table on completion

### Design notes for Phase 2:
- All screens use `SafeAreaView` with `theme.background` fill
- Input fields: white fill, `BorderRadius.lg` (14px), subtle border (`theme.border`)
- Chips: pill shape (`BorderRadius.full`), selected = sagePrimary fill + white text
- Primary button: full width, sagePrimary fill, white semibold text, `BorderRadius.lg`
- Progress dots: small filled/hollow circles, centered
- Permission pre-prompts: show benefit copy BEFORE system dialog (Planta pattern — increases opt-in)

---

## IMPORTANT TECHNICAL NOTES

### Running the app
- **DO NOT use `npx expo start` + Expo Go** — WatermelonDB and PowerSync require native modules
- **Use `npx expo run:android`** to build and run on the Android emulator (Medium Phone API 36)
- First run will take longer (native build). Subsequent runs are faster.
- Ensure Android Studio emulator is running before executing the command

### Package manager
- **npm** (not yarn, not bun)
- Use `--legacy-peer-deps` if adding new packages that have React 19 peer dep issues

### Key file locations
- Design tokens: `constants/Colors.ts`, `constants/Typography.ts`, `constants/Spacing.ts`
- Theme hook: `hooks/useTheme.ts`
- Supabase client: `lib/supabase.ts`
- Env vars: `lib/env.ts` (reads from `env.local` via dotenv in app.config.ts)
- DB types: `types/database.ts`

---

## env.local STATUS

| Variable | Status |
|---|---|
| `SUPABASE_URL` | Filled |
| `SUPABASE_ANON_KEY` | Filled (sb_publishable_ format) |
| `SUPABASE_SERVICE_ROLE_KEY` | Filled |
| `STRIPE_PUBLISHABLE_KEY` | Filled (sandbox pk_test_...) |
| `STRIPE_SECRET_KEY` | Filled (sandbox sk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | Deferred — after Phase 5 Edge Function |
| `EXPO_TOKEN` | Filled |
| `PLANT_ID_API_KEY` | Filled (Kindwise) |
| `OPENWEATHER_API_KEY` | Filled |
| `GEMINI_API_KEY` | Filled (Google AI Studio free tier) |
| `POWERSYNC_URL` | Filled |
| `SENTRY_DSN` | Filled |

---

## SUPABASE SCHEMA (14 tables — all live)

| Table | RLS | Purpose |
|---|---|---|
| `profiles` | ✅ | User profile, zone, experience, garden types |
| `gardens` | ✅ | User's named gardens |
| `garden_members` | ✅ | Shared garden access |
| `plant_species` | ✅ (public read) | Encyclopedia data |
| `companion_planting` | ✅ (public read) | Companion/antagonist pairs |
| `plants` | ✅ | User's actual plants |
| `care_logs` | ✅ | Watering/fertilizing logs |
| `plant_photos` | ✅ | Growth journal photos |
| `care_schedules` | ✅ | Next-due-date per plant per care type |
| `seedbox_subscriptions` | ✅ | Stripe subscription records |
| `seedbox_orders` | ✅ | Monthly box orders |
| `seed_options` | ✅ (public read) | Monthly curated seed catalog |
| `seedbox_order_seeds` | ✅ | Seeds selected per order |
| `plant_id_usage` | ✅ | Free tier usage tracking |

Auto-trigger: new auth user → auto-creates `profiles` row.

---

## KEY DECISIONS QUICK REFERENCE

### Architecture (27 screens — PROD_DOC.md Section 8)
- 4 bottom tabs: Home / Garden / Explore / SeedBox
- Onboarding: 3 screens (Welcome / Setup / Create First Garden)
- SeedBox pitch: post-first-plant card only (never in onboarding)
- Plant detail: 3 tabs (Care / Journal / Info)
- Garden planner: sub-screen of Garden Detail (Planner tab)
- Encyclopedia: inside Explore tab
- Streak: daily care streak on home screen

### Design tokens
- Sage green `#7C9A6E` — primary actions
- Warm cream `#FDF8F0` — backgrounds
- Earthy brown `#8B6F47` — secondary accents
- Charcoal `#2D2D2D` — text
- Warm red `#D64545` — alerts only
- Typography: DM Sans target (system font fallback until expo-font loads)

### Tech
- Bundle ID: com.hellogarden.app
- Package manager: npm
- Testing: `npx expo run:android` on Android Studio emulator (Medium Phone API 36)
- Stripe: sandbox/test mode during dev
- Conflict resolution: last-write-wins

---

## TOOLS STILL TO SET UP
- **GitHub MCP**: Add via claude.ai integrations page (not yet done — not blocking)
- **Stripe CLI**: Install at Phase 5
- **EAS CLI**: `npm install -g eas-cli` — Phase 7 only

## THINGS DEFERRED
- `STRIPE_WEBHOOK_SECRET`: After Phase 5 Edge Function deployed
- Shipment tracking provider: EasyPost or Shippo — decide in Phase 5
- Apple Developer Account ($99/yr) + Google Play Console ($25): Phase 7
- hellogarden.com domain: buy near launch
- Logo: user generates — not blocking code
- PowerSync sync rules: configure in Phase 3
- WatermelonDB schema: build in Phase 3
