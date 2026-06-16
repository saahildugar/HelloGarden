# HelloGarden - Project Context

## Overview
HelloGarden is a mobile app (React Native / Expo) for beginner and intermediate gardeners. The app is FREE — no app subscription, no ads. Revenue comes from SeedBox, a monthly curated seed subscription ($14.99/month + $3.99 shipping, US only). The app is the gateway to convert users into SeedBox subscribers.

**Tagline**: "Your garden starts here."

Note: When you can make changes without the user having to do it, please just make the changes. Don't ask the user to write code or rewrite stuff unless you're sure that's something that you can't do and the user has to do. THIS DOES NOT MEAN YOU SHOULDN'T ASK QUESTIONS. ASK A LOT OF QUESTIONS, AND ADD ANY RELEVANT INFORMATION YOU GET FROM THAT TO CLAUDE.md. QUESTIONS ARE HOW YOU GET VALUABLE CONTEXT.

## Key Files to Keep Updated
- **CLAUDE.md** (this file): Master context for all sessions. UPDATE after every significant decision, architectural change, or new learning. ANY TIME SOMETHING IS PUSHED TO LATER, OR THERE IS SOMETHING THE USER SHOULD KNOW OR BE REMINDED OF LATER, ADD IT HERE. ANY TIME YOU GET NEW CONTEXT THAT MIGHT HELP YOU IN THE FUTURE, ADD IT HERE. AFTER EVERY PROMPT, CONSIDER IF THERE IS ANYTHING YOU SHOULD ADD TO CLAUDE.md.
- **SESSION_STATE.md**: Exact snapshot of where we left off. Update at end of every session. READ THIS at the start of each session to resume instantly.
- **PROD_DOC.md**: Product requirements document. Update when features are finalized or changed.
- **env.local**: API keys and environment variables (in .gitignore, never committed).
- **research/**: Research notes — market-research.md, seedbox-cost-analysis.md

---

## Tech Stack
- **Frontend**: React Native + Expo (managed workflow)
- **Backend**: Supabase (Auth, Database, Edge Functions, Storage, Realtime)
- **Database**: PostgreSQL (via Supabase)
- **Payments**: Stripe (SeedBox subscription only) — sandbox/test mode during dev
- **Local DB / Offline**: WatermelonDB (SQLite under hood) + PowerSync for sync
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand (lightweight, works well with offline-first)
- **Push Notifications**: Expo Push Notifications (no separate API key — uses EXPO_TOKEN)
- **Weather Data**: OpenWeather API (free tier, 1000 calls/day, accepts ZIP directly)
- **Location/Zones**: phzmapi.org (free, no key — ZIP → USDA hardiness zone). Google Maps dropped — not needed.
- **Plant ID**: Plant.id API by Kindwise (rebranded) — API signup at https://www.kindwise.com/plant-id. Free: 100/day, then $0.05-0.10/ID. Covers plant ID + disease/pest diagnosis.
- **AI Assistant**: Google Gemini API (free tier via Google AI Studio — no CC required). Switched from Anthropic. Key in env.local as GEMINI_API_KEY.
- **Error Tracking**: Sentry (React Native project: HelloGarden)

---

## Supabase Project
- **Organization**: saahildugar (org ID: gmamamauaqcpspeixiil)
- **Project ID**: okpspirezabgmevjegmg
- **Region**: us-east-1
- **URL**: https://okpspirezabgmevjegmg.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/okpspirezabgmevjegmg
- **Anon key format**: Modern `sb_publishable_...` key (not legacy JWT)
- **PowerSync publication**: `powersync` publication created for ALL TABLES (needed for logical replication)
- **Note**: Old project (tullpqawvjmjenwiguew) was under wrong account (Cascades Coding) — do not use.

## PowerSync
- **URL**: https://6a2e64d50ef84ed671a18b55.powersync.journeyapps.com
- **Dashboard**: https://app.powersync.com
- **Connected to**: Supabase project okpspirezabgmevjegmg
- **Sync rules**: Not yet configured (done in Phase 1 when building offline layer)

## GitHub Repository
- **Repo**: https://github.com/saahildugar/HelloGarden
- **Owner**: saahildugar
- **Branch**: master

---

## Development Environment
- **Testing (now)**: Android Studio emulator — Medium Phone API 36.0
- **Testing (soon)**: MacBook incoming — will use Expo Go on iPhone when available
- **Apple/Google dev accounts**: Deferred — not needed until Phase 7 (publishing)
- **EAS Build**: Deferred — not needed until Phase 7
- **Bundle ID**: com.hellogarden.app
- **Package manager**: npm
- **Stripe mode**: Sandbox/test during development (pk_test_... / sk_test_...)
- **Domain**: hellogarden.com — NOT yet purchased

## How to Run the App (Android Emulator)

**This is the exact sequence that works. Follow it step by step.**

### 1. Prerequisites
- Android Studio emulator must be running (Medium Phone API 36)
- Dev build of `com.hellogarden.app` must be installed on the emulator (check: `adb shell pm list packages | findstr hellogarden`)
- If no dev build exists, run `npx expo run:android` once to create it (takes several minutes)

### 2. Add adb to PATH (every bash session)
```bash
export PATH="$PATH:/c/Users/Test/AppData/Local/Android/Sdk/platform-tools"
```

### 3. Kill old node processes & set up port forwarding
```bash
cmd /c "taskkill /F /IM node.exe /T"
adb reverse tcp:8090 tcp:8090
```

### 4. Start Metro (use CI=1 for non-interactive mode)
```bash
cd "C:\Users\Test\Desktop\Saahil Dugar HS\School\Projects\HelloGarden"
CI=1 npx expo start --dev-client -c --port 8090
```
- Claude can run this as a background task with `run_in_background: true`
- `CI=1` is required — without it, Metro prompts for interactive input and exits
- `--non-interactive` flag is DEPRECATED, use `CI=1` instead

### 5. Launch app on emulator via deep link
```bash
adb shell am force-stop com.hellogarden.app
adb shell am start -a android.intent.action.VIEW -d "exp+hellogarden://expo-development-client/?url=http%3A%2F%2F10.0.2.2%3A8090" com.hellogarden.app
```

### 6. Reset to first-run state (clear onboarding + auth)
```bash
adb shell pm clear com.hellogarden.app
```
Then relaunch with the deep link from step 5.

### Common Issues
- **Port claimed**: If port 8090 is stuck in TIME_WAIT, pick a different port (8091, 8092...) and update `adb reverse` to match
- **`Cannot read properties of undefined (reading 'transformFile')`**: Run `npm install babel-preset-expo --legacy-peer-deps`
- **App opens but shows Expo dev launcher instead of the app**: The deep link URL port must match the Metro port
- Always use `--legacy-peer-deps` with `npm install`

---

## Business Model (FINALIZED)
- **App is 100% FREE** — no app subscription, no ads, no paywalls
- Revenue comes entirely from **SeedBox** ($14.99/mo + $3.99 shipping)
- SeedBox subscribers get unlimited Plant ID + disease diagnosis; free users get 5/month
- SeedBox subscribers get unlimited AI chatbot; free users get limited queries/month
- COGS per box: ~$8.59 loaded. Gross margin: ~$6.40/box (42.7%)
- First box free (user pays $3.99 shipping only) — breaks even after 1 paid month
- Cancel anytime, no commitment
- Germination guarantee: if <50% of varieties germinate AND user followed in-app instructions, replacement seeds in next box (no cash refunds). Can also offer a month of bonus content/features as goodwill.

---

## Brand & Design (FINALIZED)
- **Name**: HelloGarden (final)
- **Tagline**: "Your garden starts here."
- **Personality**: Clean, professional, warm. Accessible to all ages including less tech-savvy
- **Colors**:
  - Primary: Sage green (#7C9A6E or similar)
  - Background: Warm cream/off-white (#FDF8F0 or similar)
  - Accent: Earthy brown (#8B6F47 or similar)
  - Text: Dark charcoal (#2D2D2D)
  - Error/Alert: Warm red (#D64545)
  - Success: Fresh green (#4CAF50)
- **Logo**: TBD (user will generate later — not blocking any code)
- **Dark mode**: Yes, from launch. Dark backgrounds with same accent palette.
- **Photos**: Real photos for plant database
- **Illustrations**: Subtle UI illustrations for empty states, onboarding
- **Animations**: Plant growth animations, subtle micro-interactions
- **Home screen**: Dashboard — today's care tasks (proactive), weather widget, garden overview, SeedBox status
- **Notifications**: ONLY push for critical alerts (plant at risk of dying). Home screen shows ALL tasks including non-urgent.
- **Typography**: Clean, readable sans-serif. Large touch targets. WCAG AA contrast.

---

## Target Audience (FINALIZED)
- All adult gardeners (18-65+), universal
- Beginners AND intermediate gardeners
- All garden types: user picks during onboarding (indoor, outdoor, balcony, raised bed, herbs, vegetables, flowers — multi-select)
- All environments: urban, suburban, rural
- US-only for SeedBox; app available globally
- Family/shared gardens: equal access, invite via share link (no account required for invitees — guest/anonymous Supabase auth)

---

## Core Features — MVP Launch
1. Plant tracking & garden management (multiple gardens per user)
2. Smart care reminders (watering, fertilizing, pruning)
3. Plant identification via camera (Kindwise API) — 5 free/month, unlimited for SeedBox
4. Disease/pest diagnosis via camera (Kindwise API) — same limits as Plant ID
5. Plant encyclopedia (~500-1000 plants at launch, detailed care instructions)
6. Visual garden planner with drag-and-drop + companion planting warnings
7. Weather integration (free for all users via OpenWeather)
8. SeedBox subscription management + in-app shipment tracking
9. Seasonal planting calendar (personalized by USDA zone via phzmapi.org)
10. AI garden assistant chatbot (Google Gemini API)
11. Family/shared gardens (invite via link, equal access, no account needed for guests)
12. Offline-first architecture (WatermelonDB + PowerSync)
13. Photo journal / growth tracking with plant growth animations
14. Dark mode

## Features — NOT at Launch
- Community/social features (V2)
- AR visualization (maybe never)
- Gamification (low priority)
- Shopping list generation (no)
- Harvest tracking (no)
- Smart device integration (distant future — founder has ESP32 hardware experience)

---

## SeedBox Details (FINALIZED)
- **Price**: $14.99/month + $3.99 shipping (separate line items)
- **First box**: FREE (user pays $3.99 shipping only) — breaks even after 1 paid month
- Monthly delivery, US only, cancel anytime
- **Seed selection**: User sees 9-10 curated options, picks their 5
- Seeds curated by: USDA zone, existing garden, companion planting, season, onboarding preferences
- Heirloom, non-GMO seeds, ~15-20 seeds per variety
- Contents: 5 seed packets + small fertilizer packet + info card with QR to in-app guides
- ONE tier at launch
- Gift subscriptions supported
- Packaging: #0 poly bubble mailer + HelloGarden branded sticker
- Shipping: USPS First-Class Large Envelope (~$1.90 at 2oz)
- Fulfillment: white-label, self-pack initially. Partner with seed company at scale.
- Winter: indoor-growing seeds for cold climates (never skip months)
- In-app shipment tracking (TBD provider — EasyPost or Shippo)
- **Germination guarantee**: If <50% of varieties germinate with proper care per in-app instructions, replacement seeds in next box. No cash refunds.
- Wholesale supplier: Bentley Seeds ($0.50-0.85/packet at 250-500 unit minimums)

---

## Onboarding (FINALIZED)
- Minimal friction — no account required to browse/use app
- Quick onboarding: ZIP code + experience level + garden type (multi-select)
- Account creation required only for SeedBox subscription
- SeedBox onboarding: additional questions (preferences, garden size, sunlight, goals, allergies, current plants)
- Garden setup happens AFTER onboarding
- SeedBox pitched after user adds their first plant (natural conversion moment)
- 3-4 illustrated walkthrough screens max

---

## Offline Architecture (FINALIZED)
- **Works offline**: plant tracking, care reminders (pre-cached), garden view, planner, plant encyclopedia (pre-cached), photo journal (stored locally, synced later), manual plant entry
- **Requires internet**: SeedBox ordering, weather updates, plant ID, AI chatbot, sync across devices, disease diagnosis, shipment tracking
- **Sync strategy**: last-write-wins (simple, adequate for this use case)
- **Local DB**: WatermelonDB (SQLite, native queries, handles 10K+ records)
- **Sync layer**: PowerSync (managed) — connected to Supabase

---

## Technical Decisions (FINALIZED)
- Auth: Email/password + Google + Apple Sign In (Supabase Auth)
- Guest/anonymous access for garden invitees (Supabase anonymous auth)
- Multiple gardens per user
- Notifications: conservative, customizable. Only push for critical plant alerts.
- Data export: yes (post-MVP if needed)
- Accessibility: WCAG AA
- English only at launch
- National US launch for SeedBox
- TypeScript throughout
- Functional components with hooks only (no class components)
- File-based routing (Expo Router)
- Ad-free, no dark patterns, transparent pricing

---

## Data Model (High Level)
- **User**: auth, profile, preferences, USDA zone, experience level, zip code
- **Garden**: name, type, user_id, shared members, location
- **Plant**: species_id, garden_id, date_planted, status, care schedule override
- **CareLog**: plant_id, type (water/fertilize/prune/repot), timestamp, notes
- **PlantPhoto**: plant_id, image_url, timestamp, notes
- **PlantSpecies**: encyclopedia — name, care info, companions, antagonists, zones, germination days, harvest days
- **CompanionPlanting**: species_a, species_b, relationship (companion/antagonist)
- **SeedBoxSubscription**: user_id, status, stripe_subscription_id, stripe_customer_id, shipping_address
- **SeedBoxOrder**: subscription_id, month, selected_seed_ids, tracking_number, status, shipped_at
- **SeedOption**: monthly curated options, species_id, month, zone_availability

---

## Companion Planting
Plants that benefit each other when grown nearby (e.g., tomatoes + basil). Antagonist plants hurt each other (e.g., tomatoes + fennel). The visual garden planner warns users about bad pairings. Data sourced from open-source datasets (1,972+ plants, CC BY 4.0). Sources: OpenFarm, GenevieveMilliken/companion_plants, heydenberk/gardening-data.

---

## UI Design Plan (Session 3 — COMPLETE)

### Phase 1 — Research COMPLETE (Session 3)
Competitor research done on Planta, PictureThis, Gardenize, Plant Parent. Full findings in research/ux-research.md.

### Phase 2 — Architecture COMPLETE (Session 3)
All 13 product decisions made. Full 27-screen architecture defined. See PROD_DOC.md Section 8.

Key decisions:
- **Navigation**: 4 bottom tabs — Home / Garden / Explore / SeedBox
- **Home screen**: Dashboard header (weather + streak + garden card) + Today's tasks list
- **Streak mechanic**: Yes — daily care streak on home screen (no competitor does this)
- **Garden representation**: Garden cards → tap → plant grid
- **Onboarding**: 3 screens (Welcome / Setup / Create First Garden). SeedBox NOT in onboarding.
- **SeedBox pitch**: Dismissible card after first plant is added (natural conversion moment)
- **Plant detail**: 3 tabs (Care / Journal / Info) with quick action bar
- **Garden planner**: Sub-screen inside Garden Detail, not in main nav
- **Encyclopedia**: Inside Explore tab
- **Dark mode**: System-default + user override in Settings
- **Typography**: DM Sans / Inter / Plus Jakarta Sans (decision final in code)

### Phase 3 — Mockups SKIPPED (Session 3 decision)
Canva MCP was attempted but is an AI design generator, not a precision UI tool. It cannot reliably place specific buttons, labels, and form fields. Mockups were misleading rather than useful. Decision: skip mockups entirely. The Phase 2 architecture doc is the spec. Actual coded React Native screens will serve as the visual reference. This is faster and more accurate.

## Tools to Set Up (Session 3)
- **GitHub MCP**: Connect on claude.ai integrations — lets Claude manage GitHub Issues/milestones to track the 7 phases. Do this first.
- **Supabase CLI**: `npm install -g supabase` — for local migrations, Edge Functions, TypeScript type generation. Do before Phase 1 coding.
- **Stripe CLI**: Install from stripe.com/docs/stripe-cli — for local webhook testing. Do in Phase 5.
- **EAS CLI**: `npm install -g eas-cli` — for building/submitting app. Do in Phase 7.
- **`/simplify` skill**: Already available in Claude Code — run after writing code chunks to review quality.

## Deferred / Come Back To
- **STRIPE_WEBHOOK_SECRET**: Add after Phase 5 — deploy Supabase Edge Function first. Webhook URL: `https://okpspirezabgmevjegmg.supabase.co/functions/v1/stripe-webhook`. Register in Stripe Dashboard → Developers → Webhooks. Use Stripe CLI (`stripe listen`) for local testing.
- **Shipment tracking API**: EasyPost or Shippo — TBD. Choose and add to env.local in Phase 5. Add `SHIPMENT_TRACKING_API_KEY` placeholder when decided.
- **Apple Developer Account** ($99/yr) + **Google Play Console** ($25 one-time): Needed in Phase 7 before App Store/Play Store submission. Not needed for emulator testing.
- **EAS Build**: Configure `eas.json` in Phase 7.
- **hellogarden.com domain**: Purchase when nearing launch.
- **Logo**: User will generate — not blocking any code.
- **AI Chatbot (Gemini)**: P2 priority — GEMINI_API_KEY already in env.local. Implement in Phase 6.
- **"Connect your account" flow**: Add to Settings/Profile screen — lets anonymous users link an email/password to their existing account so data persists across devices. Use Supabase `updateUser()` to upgrade anonymous → email. Build when Settings screen is built.
- **PowerSync sync rules**: Configure in Phase 3 (offline layer step). Rules define which tables sync to which users.
- **Google Maps**: Dropped permanently. phzmapi.org handles zone lookup for free. OpenWeather takes ZIP directly. No geocoding needed anywhere.

---

## Session Notes
- **Session 1 (2026-06-13)**: Initial project setup. Created repo, first Supabase project (wrong account — later fixed), env.local skeleton. Market research completed (research/). 74 questions + 13 follow-ups answered. All major product decisions finalized. SeedBox pricing: $14.99/mo + $3.99 shipping. COGS: $8.59/box.
- **Session 2 (2026-06-14)**: Full pre-coding setup completed. Migrated Supabase to correct account (saahildugar). New Supabase project created fresh (okpspirezabgmevjegmg, us-east-1). PowerSync connected to Supabase — had to create `powersync` publication manually via SQL. All API keys obtained and filled in env.local. Dropped Google Maps (using phzmapi.org). Dropped Anthropic (using Google Gemini free tier). Plant.id URL fixed (rebranded to Kindwise). Stripe in sandbox mode. Testing on Android Studio emulator (Medium Phone API 36). Bundle ID: com.hellogarden.app. Package manager: npm. env.local 100% complete except deferred keys. SESSION_STATE.md created. Decided: UI mockups via Canva MCP BEFORE any code. Also discussed tools to set up (GitHub MCP, Supabase CLI, Stripe CLI, EAS CLI). Session 3 starts with UI mockups + tools setup.
- **Session 3 (2026-06-14)**: Confirmed Canva MCP connected to 1051549@lwsd.org. Completed Phase 1 UI/UX research (Planta, PictureThis, Gardenize, Plant Parent). Completed Phase 2 full UI architecture — 27 screens defined, all 13 product decisions made, 4-tab navigation locked. Attempted Phase 3 mockups via Canva MCP — abandoned. Canva AI generation is not a precision UI tool and produces inaccurate layouts. Decision: architecture doc is the spec, coded screens are the visual reference. Completed Phase 1 coding: Expo SDK 56 project initialized, all packages installed (Supabase, WatermelonDB, PowerSync, Zustand, Stripe, Sentry, Gemini, expo-router, all expo plugins), full folder structure, design system (Colors/Typography/Spacing/useTheme), Expo Router shell with 4-tab layout + placeholder screens, lib/env.ts + lib/supabase.ts + types/database.ts, Supabase schema (14 tables, 9 ENUMs, all RLS, auto-profile trigger) applied. TypeScript: zero errors. Committed at f0f94f9. Phase 2 (Auth + Onboarding) is next.
- **Session 4 (2026-06-14)**: Phase 2 COMPLETE and committed (c6c3e87). All auth + onboarding screens built and running on Android emulator. Key build issues resolved: (1) `babel-preset-expo` was missing from top-level node_modules (nested under expo/node_modules) after npm install cycles — fixed by installing it explicitly. THIS IS THE ROOT CAUSE OF ALL `Cannot read properties of undefined (reading 'transformFile')` METRO ERRORS. (2) `react-native-worklets/plugin` is the correct babel plugin for Reanimated 4.x. (3) `adb` is at `/c/Users/Test/AppData/Local/Android/Sdk/platform-tools/adb` — must add to PATH manually in bash: `export PATH="$PATH:/c/Users/Test/AppData/Local/Android/Sdk/platform-tools"`. (4) Port 8081 gets phantom-claimed by background Metro processes — use port 8082 as fallback and set `adb reverse tcp:8082 tcp:8082`. (5) Use `10.0.2.2` (NOT `10.0.0.139`) in deep links for emulator → host connection. Standard deep link: `adb shell am start -a android.intent.action.VIEW -d "exp+hellogarden://expo-development-client/?url=http%3A%2F%2F10.0.2.2%3A8082" com.hellogarden.app`. (6) `npx expo run:android` in background mode doesn't properly start Metro interactively — run `npx expo start --dev-client -c --port 8082` separately, THEN send deep link. Phase 3 (Home screen + plant tracking) is next.
- **Session 4 audit + completion (same day)**: Phase 2 audit found one gap — Apple OAuth was missing. Added `expo-apple-authentication`, implemented `handleAppleSignIn` in both auth screens using `AppleAuthentication.AppleAuthenticationButton` (App Store requirement — cannot use custom button). Button renders only on iOS (`isAvailableAsync()` returns false on Android emulator — correct). Added plugin to `app.config.ts`. Also resolved onboarding screen count: 3 screens total (not 4) — SeedBox pitch removed from onboarding entirely. SeedBox pitch now lives as a first-visit experience inside the SeedBox tab (implemented in Phase 5). PROD_DOC.md updated to reflect all of this. Phase 2 is now fully complete.
- **Session 5 (2026-06-15)**: Phase 2 re-audit with user testing on emulator. Found and fixed critical NavigationGuard bugs: (1) Auth screens were unreachable during onboarding — guard redirected back to Welcome whenever user navigated to `/(auth)/*` because it only allowed `inOnboarding`, not `inAuth`. Fixed by adding `!inAuth` check. (2) After email sign-in, user got stuck on sign-in screen — guard had no rule for `session && !isOnboardingComplete && inAuth`. Fixed by removing `!inAuth` from the session+onboarding redirect. (3) create-garden.tsx blindly called `signInAnonymously()` even if user already had an email session — fixed to check `session` first. (4) Password reset message was misleading ("We sent a link") when Supabase returns success even for non-existent emails — changed to "If an account exists..." wording. Also confirmed Metro CAN run as Claude background task using `CI=1` (old note was wrong). Dev workflow documented in CLAUDE.md. Created test Supabase user: saahilsciencebowl@gmail.com / 123456. Decision: "Connect your account" flow (anonymous → email upgrade) deferred to Settings screen. Phase 2 bugs fixed but NOT yet committed — needs user verification first. Phase 3 is next after commit.
- **Session 6 (2026-06-15)**: (1) Committed Phase 2 bug fixes + verified all Phase 2 code against SESSION_STATE.md checklist — 100% implemented. (2) Found and fixed ANOTHER NavigationGuard bug: `session && !isOnboardingComplete` was redirecting users back to `/onboarding/setup` when they tried to navigate from setup to create-garden screen. Fixed by adding `!inOnboarding` so guard doesn't interfere while user progresses through onboarding. (3) Started Phase 3 Step 11: Home Dashboard. Built full dashboard with: weather widget (OpenWeather API, rain/frost-aware messages), daily care streak (AsyncStorage-backed), garden overview cards (horizontal scroll), today's care tasks (urgency-colored: overdue=red, today=amber, upcoming=green, with checkmark completion), SeedBox status banner (subscriber/non-subscriber), empty/loading/error states for every section. New files: `lib/weather.ts`, `stores/homeStore.ts`, `hooks/useWeather.ts`, `hooks/useHomeDashboard.ts`, 9 components in `components/home/`. Replaced placeholder `app/(tabs)/index.tsx` with full dashboard. Successfully bundled and running on Android emulator.
- **Session 7 (2026-06-15)**: User-reported dashboard issues after testing: (1) Weather widget showed "Add your ZIP code" even though user entered ZIP during onboarding. Root cause: `create-garden.tsx` saved ZIP to Supabase profiles table but never called `fetchProfile()` to refresh the in-memory auth store. `onAuthStateChange` doesn't fire for DB changes, only auth state changes. Fixed by adding `await useAuthStore.getState().fetchProfile()` after the profile update. (2) "Create a Garden" / "Add Your First Plant" button did nothing — `EmptyGardenState.tsx` had `onPress={() => {}}`. Fixed by adding `onAddPlant`/`onCreateGarden` callback props, wired to `router.push('/(tabs)/garden')`. (3) Garden cards not tappable — `GardenCards.tsx` never passed `onPress` to `GardenCard`. Fixed by adding `onGardenPress` prop. (4) SeedBox banner not tappable — all 3 variants (active/paused/non-subscriber) now wrapped in Pressable with `onPress` navigating to SeedBox tab. (5) Tab bar icons were placeholder dots — replaced with Ionicons (home/leaf/compass/cube, outline+filled). (6) Dashboard header avatar was a dead Pressable — now shows user's initial letter when available, disabled when no handler. (7) "No care tasks" was NOT a bug — expected when no plants exist. Total: 7 files modified, ~70 lines changed, no new files. App bundled successfully on port 8094. NOT YET COMMITTED — awaiting user verification next session.
