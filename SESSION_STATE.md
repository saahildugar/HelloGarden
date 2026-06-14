# HelloGarden — Session State
> **Purpose**: Exact snapshot of where we left off. Read this at the start of every new session to pick up instantly.
> **Last Updated**: 2026-06-14 (End of Session 2)

---

## WHERE WE LEFT OFF

**We finished all pre-coding setup. The very next thing to do is initialize the Expo project (Phase 1, Step 1).**

Tell Claude: *"Let's start Phase 1 — initialize the Expo project."*

---

## CURRENT STATUS

### What's Done
- [x] Product decisions finalized (see PROD_DOC.md)
- [x] GitHub repo created: https://github.com/saahildugar/HelloGarden
- [x] Supabase project created on saahildugar account (project: okpspirezabgmevjegmg, us-east-1)
- [x] PowerSync connected to Supabase (`powersync` publication created in DB)
- [x] All API keys obtained and saved in env.local
- [x] CLAUDE.md and PROD_DOC.md fully updated
- [x] Research files in place (research/market-research.md, research/seedbox-cost-analysis.md)

### What's NOT Done Yet (everything below is code)
- [ ] Expo project not initialized (no package.json, no app.json yet)
- [ ] No screens, no components, no code at all
- [ ] Supabase database schema not created yet (no tables)
- [ ] PowerSync sync rules not configured yet

---

## env.local STATUS (as of end of Session 2)

| Variable | Status |
|----------|--------|
| `SUPABASE_URL` | ✅ Filled |
| `SUPABASE_ANON_KEY` | ✅ Filled (modern sb_publishable_ format) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Filled |
| `STRIPE_PUBLISHABLE_KEY` | ✅ Filled (sandbox/test: pk_test_...) |
| `STRIPE_SECRET_KEY` | ✅ Filled (sandbox/test: sk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | 🔁 Deferred — needs Supabase Edge Function first |
| `EXPO_TOKEN` | ✅ Filled |
| `PLANT_ID_API_KEY` | ✅ Filled (Kindwise) |
| `OPENWEATHER_API_KEY` | ✅ Filled |
| `GEMINI_API_KEY` | ✅ Filled (Google AI Studio, free tier) |
| `POWERSYNC_URL` | ✅ Filled |
| `SENTRY_DSN` | ✅ Filled |

---

## IMPLEMENTATION ROADMAP

### Phase 1 — Project Foundation ← NEXT UP
1. Initialize Expo project (`npx create-expo-app`) with TypeScript, Expo Router, bundle ID `com.hellogarden.app`
2. Install all packages: Supabase, WatermelonDB, PowerSync, Zustand, Stripe SDK, Sentry, Gemini SDK, all Expo packages
3. Set up folder structure: `/app` (routes), `/components`, `/hooks`, `/stores`, `/lib`, `/types`, `/assets`
4. Wire env.local into app via `expo-constants`
5. Set up design system file: colors, typography, spacing, dark mode theme
6. Create Supabase database schema (all tables + RLS policies)

### Phase 2 — Auth & Onboarding
7. Auth screens: sign up, sign in, Google SSO, Apple SSO, anonymous guest access
8. Onboarding flow: welcome → ZIP/experience/garden type → first garden → SeedBox intro pitch

### Phase 3 — Core App
9. Home dashboard: today's care tasks, weather widget, garden overview
10. Plant tracking: add/view/edit plants, multiple gardens, care logging
11. Plant encyclopedia: 500+ plants seeded into Supabase, search/browse UI
12. Care reminders: scheduling logic, home screen task list, critical push notifications
13. Offline layer: WatermelonDB schema, PowerSync sync rules configuration

### Phase 4 — Features
14. Visual garden planner: drag-and-drop layout, companion planting warnings
15. Plant ID + disease diagnosis: camera integration, Kindwise API calls
16. Weather integration: OpenWeather, frost alerts, rain-skip-watering logic
17. Photo journal: growth timeline, plant growth animations
18. Seasonal planting calendar: USDA zone-based via phzmapi.org

### Phase 5 — Monetization
19. SeedBox subscription flow: Stripe integration, seed selection UI (pick 5 of 9-10)
20. Supabase Edge Function: Stripe webhook handler (then add STRIPE_WEBHOOK_SECRET to env.local)
21. Shipment tracking: TBD provider (EasyPost or Shippo — add to env.local when chosen)
> **User action needed**: Set up Stripe products/prices in dashboard, configure webhook endpoint

### Phase 6 — AI & Polish
22. AI garden chatbot: Gemini API integration, free/subscriber usage limits
23. Family/shared gardens: invite link generation, anonymous guest access flow
24. Sentry instrumentation: error boundaries, performance tracking
25. Accessibility audit: WCAG AA compliance
26. Dark mode: finalize across all screens

### Phase 7 — Launch Prep
27. EAS Build setup: eas.json configuration for iOS and Android
28. App Store / Play Store assets: screenshots, descriptions, preview videos
29. TestFlight setup: internal testing on iPhone (when MacBook arrives)
> **User action needed**: Apple Developer Account ($99/yr), Google Play Console ($25 one-time)

---

## THINGS DEFERRED (don't forget)
- **STRIPE_WEBHOOK_SECRET**: Add after Phase 5 Edge Function deployment. URL: `https://okpspirezabgmevjegmg.supabase.co/functions/v1/stripe-webhook`
- **Shipment tracking API**: EasyPost or Shippo — TBD. Choose in Phase 5.
- **Apple Developer Account** + **Google Play Console**: Needed in Phase 7, not before.
- **hellogarden.com domain**: Purchase when nearing launch.
- **Logo**: TBD, user will create — not blocking any code.

---

## KEY DECISIONS MADE (quick reference)
- **Bundle ID**: com.hellogarden.app
- **Package manager**: npm
- **Testing**: Android Studio emulator (Medium Phone API 36) now; Expo Go on iPhone when MacBook arrives
- **Stripe**: Sandbox/test mode during development
- **AI chatbot**: Google Gemini API (switched from Anthropic — no CC required)
- **Zone lookup**: phzmapi.org free API, no key (Google Maps dropped)
- **Plant ID**: Kindwise API (Plant.id rebranded) — kindwise.com/plant-id
- **Conflict resolution**: Last-write-wins (simple)
- **Notifications**: ONLY critical push alerts; all tasks shown on home screen
- **Guest access**: Supabase anonymous auth for garden invitees
