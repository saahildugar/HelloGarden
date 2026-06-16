# HelloGarden — Session State
> **Purpose**: Exact snapshot of where we left off. Read this at the start of every new session to pick up instantly.
> **Last Updated**: 2026-06-15 (Session 7)

---

## WHERE WE LEFT OFF

**Phase 3 Step 11 (Home Dashboard) FULLY COMPLETE — all bugs fixed, all buttons wired, tab icons added. App bundled and running on emulator (port 8094). Needs user visual verification, then commit + push, then continue to Step 12 (Plant Tracking).**

Tell Claude: *"Let's verify the home dashboard fixes work, commit, and start Phase 3 Step 12 — plant tracking."*

---

## CURRENT STATUS

### Phase 2 — Auth & Onboarding (COMPLETE, committed)

**What's done:**
- [x] Auth store (Zustand) — `stores/authStore.ts`
- [x] Onboarding store — `stores/onboardingStore.ts`
- [x] Sign In screen — email/password, Google OAuth, Apple OAuth (iOS only), forgot password
- [x] Sign Up screen — full name, email, password, confirm, validation, Google/Apple OAuth
- [x] Welcome screen — branding, tagline, feature bullets, "Get Started" + "Sign In" link
- [x] Setup screen — ZIP with auto zone detection (phzmapi.org), experience level chips, garden type multi-select
- [x] Create Garden screen — emoji picker, garden name, live preview, saves to Supabase
- [x] Navigation guard — redirects based on onboarding + auth state
- [x] Zone lookup — `lib/zones.ts` (phzmapi.org)
- [x] UI components — Button, Input, ProgressDots
- [x] DM Sans fonts loaded in root layout

**Bug fixes (all committed):**
- [x] NavigationGuard: allow auth screens during onboarding (`!inAuth` check)
- [x] NavigationGuard: redirect to onboarding/setup after email sign-in
- [x] NavigationGuard: don't redirect back to setup when progressing through onboarding (`!inOnboarding` check)
- [x] create-garden.tsx: don't overwrite email session with anonymous
- [x] sign-in.tsx: honest password reset message

**Bug fixes (Session 7 — NOT YET COMMITTED):**
- [x] create-garden.tsx: call `fetchProfile()` after saving ZIP/zone to Supabase — fixes weather widget showing "Add your ZIP code" even after user entered ZIP during onboarding

### Phase 3 Step 11 — Home Dashboard (COMPLETE, needs commit)

**What's done (Session 6):**
- [x] `lib/weather.ts` — OpenWeather API client, icon mapping, rain/frost detection
- [x] `stores/homeStore.ts` — Zustand store: gardens, tasks, streak, seedbox, fetchDashboard(), completeTask()
- [x] `hooks/useWeather.ts` — Weather fetch with 30-min cache
- [x] `hooks/useHomeDashboard.ts` — Aggregator hook for all dashboard data
- [x] `components/home/DashboardHeader.tsx` — Time-of-day greeting + user name + avatar
- [x] `components/home/WeatherWidget.tsx` — Temp, icon, description, rain/frost messages, loading/error states
- [x] `components/home/StreakBadge.tsx` — Leaf icon + day count pill
- [x] `components/home/GardenCard.tsx` — Emoji + name + plant count
- [x] `components/home/GardenCards.tsx` — Horizontal FlatList of garden cards
- [x] `components/home/TaskItem.tsx` — Plant name + care icon + urgency color + checkmark
- [x] `components/home/TaskSection.tsx` — Task list section with header + empty state
- [x] `components/home/SeedBoxBanner.tsx` — Subscriber status or pitch banner
- [x] `components/home/EmptyGardenState.tsx` — Empty state for zero plants
- [x] `app/(tabs)/index.tsx` — Full dashboard with pull-to-refresh, loading/error states

**Bug fixes & polish (Session 7 — NOT YET COMMITTED):**
- [x] **Profile refetch after onboarding** — `create-garden.tsx` now calls `fetchProfile()` after Supabase profile update, so weather widget sees ZIP on first dashboard load
- [x] **Tab bar icons** — `app/(tabs)/_layout.tsx` replaced placeholder dots with proper Ionicons (home/leaf/compass/cube, outline/filled states)
- [x] **EmptyGardenState button** — `components/home/EmptyGardenState.tsx` now accepts `onAddPlant`/`onCreateGarden` callbacks, button navigates to Garden tab
- [x] **GardenCard navigation** — `components/home/GardenCards.tsx` now passes `onPress` to each GardenCard, navigates to Garden tab
- [x] **SeedBoxBanner navigation** — All three banner variants (active/paused/non-subscriber) now tappable, navigate to SeedBox tab
- [x] **DashboardHeader avatar** — Shows user's initial letter when available, disabled state when no handler (Settings screen not built yet)
- [x] **index.tsx orchestrator** — Added `useRouter`, passes navigation callbacks to EmptyGardenState, GardenCards, SeedBoxBanner

### What's NOT Done Yet
- [ ] Phase 3 Step 12: Plant tracking (add plant, plant detail, care logging)
- [ ] Phase 3 Step 13: Multiple gardens (CRUD, switching)
- [ ] Phase 3 Step 14: Plant encyclopedia (seed 500+ plants, search UI)
- [ ] Phase 3 Step 15: Care reminders (scheduling engine, push notifications)
- [ ] Phase 3 Step 16: Offline layer (WatermelonDB + PowerSync)
- [ ] Phase 4: Features (planner, Plant ID, weather, photo journal, calendar)
- [ ] Phase 5: Monetization (SeedBox + Stripe)
- [ ] Phase 6: AI + Polish
- [ ] Phase 7: Launch Prep

---

## NEXT STEPS — PHASE 3 STEP 12: PLANT TRACKING

### What to build:
1. **Add Plant flow** — manual entry (name, species from encyclopedia, garden selection) + from Plant ID camera (Phase 4)
2. **Plant Detail screen** — 3 tabs: Care (schedule + quick actions) / Journal (photo timeline) / Info (species details)
3. **Care logging** — bottom sheet: water, fertilize, prune, repot, other. Creates care_log entry + updates care_schedule
4. **Edit/delete plant** — settings/actions within plant detail

### Suggested build order:
1. Add Plant screen + Supabase insert
2. Plant Detail with 3 tabs (Care/Journal/Info)
3. Log Care bottom sheet
4. Care schedule auto-creation from plant_species defaults
5. Wire into Garden tab (plant grid)

### Also needed (adjacent to Step 12):
- **Garden tab screen** (`app/(tabs)/garden.tsx`) — currently a placeholder. Needs to show list of user's gardens, each with its plant grid. This is the navigation target from the Home dashboard's garden cards and "Add Your First Plant" button.

---

## HOW TO RUN THE APP

See CLAUDE.md "How to Run the App (Android Emulator)" section for full steps.

Quick version:
```bash
export PATH="$PATH:/c/Users/Test/AppData/Local/Android/Sdk/platform-tools"
cmd /c "taskkill /F /IM node.exe /T"
adb reverse tcp:8094 tcp:8094
CI=1 npx expo start --dev-client -c --port 8094  # run in background with CI=1
adb shell pm clear com.hellogarden.app  # reset to first-run if needed
adb shell am force-stop com.hellogarden.app
adb shell am start -a android.intent.action.VIEW -d "exp+hellogarden://expo-development-client/?url=http%3A%2F%2F10.0.2.2%3A8094" com.hellogarden.app
```

Note: Port may need to change if stuck in TIME_WAIT. Update `adb reverse` and deep link URL to match. Last used port: **8094**.

---

## IMPORTANT TECHNICAL NOTES

### Home Dashboard Architecture
- Weather: `lib/weather.ts` -> `hooks/useWeather.ts` -> `WeatherWidget.tsx` (30-min cache, ZIP from profile)
- Dashboard data: `stores/homeStore.ts` -> `hooks/useHomeDashboard.ts` -> `app/(tabs)/index.tsx`
- Streak: AsyncStorage key `hg_streak_v1`, maintained locally, not synced
- Task urgency: overdue (red) > today (amber) > upcoming (green), sorted by date
- Task completion: optimistic removal + Supabase insert care_log + update care_schedule next_due_date
- **Profile refetch**: `create-garden.tsx` calls `fetchProfile()` after saving onboarding data to Supabase. This is critical — without it, the weather hook sees `zip_code: null` and shows "Add your ZIP code" instead of real weather.
- **Navigation callbacks**: All interactive dashboard elements (garden cards, empty state CTA, SeedBox banner) navigate to their respective tabs via `useRouter().push()`
- **Tab icons**: Ionicons — home, leaf, compass, cube (outline when inactive, filled when active)

### NavigationGuard flow (fully fixed)
- No onboarding + not in onboarding/auth -> redirect to `/onboarding/welcome`
- Has session + onboarding not complete + not in onboarding -> redirect to `/onboarding/setup`
- Has session + onboarding complete + not in tabs -> redirect to `/(tabs)`
- Onboarding complete + no session + not in auth/tabs -> redirect to `/(tabs)`

### Test account
- Email: saahilsciencebowl@gmail.com
- Password: 123456
- Created via Supabase admin API, email pre-confirmed

---

## env.local STATUS

| Variable | Status |
|---|---|
| `SUPABASE_URL` | Filled |
| `SUPABASE_ANON_KEY` | Filled |
| `SUPABASE_SERVICE_ROLE_KEY` | Filled |
| `STRIPE_PUBLISHABLE_KEY` | Filled (sandbox) |
| `STRIPE_SECRET_KEY` | Filled (sandbox) |
| `STRIPE_WEBHOOK_SECRET` | Deferred — Phase 5 |
| `EXPO_TOKEN` | Filled |
| `PLANT_ID_API_KEY` | Filled |
| `OPENWEATHER_API_KEY` | Filled |
| `GEMINI_API_KEY` | Filled |
| `POWERSYNC_URL` | Filled |
| `SENTRY_DSN` | Filled |

---

## THINGS DEFERRED
- `STRIPE_WEBHOOK_SECRET`: After Phase 5 Edge Function deployed
- Shipment tracking provider: EasyPost or Shippo — decide in Phase 5
- Apple Developer Account ($99/yr) + Google Play Console ($25): Phase 7
- hellogarden.com domain: buy near launch
- Logo: user generates — not blocking code
- PowerSync sync rules: configure in Phase 3 Step 16
- WatermelonDB schema: build in Phase 3 Step 16
- "Connect your account" flow: Settings screen — lets anonymous users link email to their account
- DashboardHeader avatar `onAvatarPress`: Wire when Settings screen is built
- Garden detail screen navigation: Currently garden cards and "Add Your First Plant" navigate to Garden tab. When garden detail and plant-add screens exist (Steps 12-13), update to deep-link into specific garden/plant flows.
