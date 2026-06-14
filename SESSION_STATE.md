# HelloGarden — Session State
> **Purpose**: Exact snapshot of where we left off. Read this at the start of every new session to pick up instantly.
> **Last Updated**: 2026-06-14 (End of Session 3)

---

## WHERE WE LEFT OFF

**Phase 1 coding is NEXT.** All pre-coding work is complete. No mockups — the architecture doc is the spec, coded screens are the visual reference.

Tell Claude: *"Let's start Phase 1 — initialize the Expo project and set everything up."*

---

## CURRENT STATUS

### What's Done
- [x] Product decisions finalized (PROD_DOC.md)
- [x] GitHub repo: https://github.com/saahildugar/HelloGarden
- [x] Supabase project: okpspirezabgmevjegmg (us-east-1, saahildugar account)
- [x] PowerSync connected to Supabase (`powersync` publication created)
- [x] All API keys in env.local (100% complete except deferred keys)
- [x] Market research: research/market-research.md
- [x] SeedBox cost analysis: research/seedbox-cost-analysis.md
- [x] UI/UX competitor research: research/ux-research.md
- [x] Full UI architecture: 27 screens, all product decisions, 4-tab nav (PROD_DOC.md Section 8)
- [x] Mockups: SKIPPED — Canva AI not precise enough. Architecture doc is the spec.

### Phase 1 COMPLETE
- [x] Expo project initialized — Expo SDK 56, React 19, RN 0.85.3
- [x] All packages installed (Supabase, WatermelonDB, PowerSync, Zustand, Stripe, Sentry, Gemini, all Expo packages)
- [x] Folder structure: /app /components /hooks /stores /lib /types /constants /db /assets
- [x] app.config.ts — bundle ID com.hellogarden.app, all plugins, env loading via dotenv
- [x] Design system: constants/Colors.ts, Typography.ts, Spacing.ts + hooks/useTheme.ts
- [x] Expo Router shell: root _layout, index redirect, 4-tab layout (Home/Garden/Explore/SeedBox)
- [x] lib/supabase.ts + lib/env.ts wired to env.local
- [x] types/database.ts — full TypeScript types for all 14 tables
- [x] Supabase schema: 14 tables, all indexes, all RLS policies, auto-profile trigger
- [x] TypeScript: zero errors
- [ ] PowerSync sync rules not configured (Phase 3)
- [ ] WatermelonDB schema not created yet (Phase 3)

---

## NEXT STEPS IN ORDER

### ~~Step 1 — Phase 1: Project Foundation~~ COMPLETE

### Step 2 — Phase 2: Auth & Onboarding ← NEXT

1. **Initialize Expo project**: `npx create-expo-app@latest HelloGarden --template blank-typescript` with bundle ID `com.hellogarden.app`
2. **Install all packages**:
   - Supabase: `@supabase/supabase-js`
   - Expo Router: `expo-router`
   - WatermelonDB: `@nozbe/watermelondb`
   - PowerSync: `@powersync/react-native`
   - Zustand: `zustand`
   - Stripe: `@stripe/stripe-react-native`
   - Sentry: `@sentry/react-native`
   - Gemini: `@google/generative-ai`
   - Expo packages: `expo-camera`, `expo-notifications`, `expo-image-picker`, `expo-constants`, `expo-location`, `expo-secure-store`, `expo-font`
3. **Folder structure**:
   ```
   /app          — Expo Router file-based routes
   /components   — reusable UI components
   /hooks        — custom React hooks
   /stores       — Zustand state stores
   /lib          — API clients (supabase, kindwise, openweather, gemini)
   /types        — TypeScript interfaces
   /assets       — fonts, images, icons
   /constants    — design tokens (colors, spacing, typography)
   /db           — WatermelonDB schema + models
   ```
4. **Wire env.local**: via `expo-constants` + `app.config.ts`
5. **Design system file**: colors, typography, spacing, dark/light theme tokens (from architecture decisions)
6. **Supabase schema**: all tables + foreign keys + indexes + RLS policies

### Step 2 — Phase 2: Auth & Onboarding
7. Auth screens: sign up, sign in, Google OAuth, Apple OAuth, anonymous guest
8. Auth state (Zustand + Supabase session)
9. Onboarding (3 screens): Welcome → Setup (ZIP/experience/garden type) → Create First Garden
10. Persist: ZIP → phzmapi.org → USDA zone, save to user profile

### Step 3 — Phase 3: Core App (P0)
11. Home dashboard: today's tasks, weather widget (OpenWeather), garden health card, streak counter
12. Plant tracking: add plant, view, edit, delete, log care
13. Multiple gardens: create/name/switch
14. Plant encyclopedia: seed 500+ plants from open-source data, search UI
15. Care reminders: compute next-care dates, home screen task list, critical push notifications
16. Offline layer: WatermelonDB schema, PowerSync sync rules

### Step 4 — Phase 4: P1 Features
17. Visual garden planner (drag-and-drop, companion warnings)
18. Plant ID camera (Kindwise API)
19. Disease/pest diagnosis camera (Kindwise health endpoint)
20. Weather integration (OpenWeather, frost alerts, rain-skip logic)
21. Photo journal (growth timeline, plant growth animations)
22. Seasonal planting calendar (phzmapi.org zones)

### Step 5 — Phase 5: Monetization
23. SeedBox subscription flow (Stripe)
24. Seed selection UI (pick 5 of 9-10)
25. Supabase Edge Function: Stripe webhook handler
26. Add STRIPE_WEBHOOK_SECRET to env.local after Edge Function deployed
27. Order history screen
28. Shipment tracking (EasyPost or Shippo — choose then add key)
29. Gift subscription flow

### Step 6 — Phase 6: AI + Polish
30. AI chatbot (Gemini API, usage limits free vs. subscriber)
31. Family/shared gardens (invite link, anonymous auth)
32. Sentry instrumentation
33. Accessibility audit (WCAG AA)
34. Dark mode audit across all screens

### Step 7 — Phase 7: Launch Prep
35. EAS Build (eas.json for iOS + Android)
36. App Store assets (screenshots, descriptions, preview video)
37. TestFlight + Google Play internal testing
> User must do: Apple Developer Account ($99/yr), Google Play Console ($25), logo assets

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

## KEY DECISIONS QUICK REFERENCE

### Navigation
- 4 bottom tabs: Home / Garden / Explore / SeedBox
- Profile + Settings: avatar in Home header
- FAB (+): Add Plant inside Garden Detail

### Design tokens (LOCKED)
- Sage green `#7C9A6E` — primary actions
- Warm cream `#FDF8F0` — backgrounds
- Earthy brown `#8B6F47` — secondary accents
- Charcoal `#2D2D2D` — text
- Warm red `#D64545` — alerts only
- Typography: DM Sans / Inter / Plus Jakarta Sans

### Architecture (27 screens — see PROD_DOC.md Section 8)
- Onboarding: 3 screens (Welcome / Setup / Create First Garden)
- SeedBox pitch: post-first-plant card only (never in onboarding)
- Plant detail: 3 tabs (Care / Journal / Info)
- Garden planner: sub-screen of Garden Detail
- Encyclopedia: inside Explore tab
- Streak: daily care streak on home screen

### Tech
- Bundle ID: com.hellogarden.app
- Package manager: npm
- Testing: Android Studio emulator (Medium Phone API 36)
- Stripe: sandbox/test mode during dev
- Conflict resolution: last-write-wins

---

## TOOLS STILL TO SET UP
- **GitHub MCP**: Add via claude.ai integrations page (not yet done)
- **Supabase CLI**: `npm install -g supabase` — do at Phase 1 start
- **Stripe CLI**: Install at Phase 5
- **EAS CLI**: `npm install -g eas-cli` — do at Phase 7

## THINGS DEFERRED
- `STRIPE_WEBHOOK_SECRET`: After Phase 5 Edge Function deployed
- Shipment tracking provider: EasyPost or Shippo — decide in Phase 5
- Apple Developer Account + Google Play Console: Phase 7
- hellogarden.com domain: buy near launch
- Logo: user generates — not blocking code
