# HelloGarden — Session State
> **Purpose**: Exact snapshot of where we left off. Read this at the start of every new session to pick up instantly.
> **Last Updated**: 2026-06-14 (End of Session 2)

---

## WHERE WE LEFT OFF

**Before coding begins, we are doing UI mockups first using the Canva MCP (Option B). This happens BEFORE Phase 1.**

Tell Claude: *"Let's do the UI mockups using the Canva MCP before we start coding."*

---

## NEXT SESSION PLAN: UI MOCKUPS FIRST (PRE-PHASE 1)

### Why we're doing this
Competitors like Planta, Greg, and Blossom have polished, professional UIs that are a major part of why users choose them. HelloGarden needs to match or beat that quality. Designing visually first — before writing a single line of code — means we can see exactly what the app will look like, react to it, refine it, and then build to a clear, approved target. This prevents costly redesigns mid-code and ensures every screen is intentional.

### The plan (Option B)
Claude will use the **Canva MCP** (already connected) to generate actual visual mockups of every key screen. These are real, reviewable designs — not just text descriptions. You review each one, give feedback, and Claude iterates until you're happy. Once approved, Claude documents the finalized designs into PROD_DOC.md as the official UI spec, and THEN Phase 1 coding begins with a crystal-clear visual target for every screen.

### Screens to mockup (in this order)
1. **Onboarding flow** (4 screens): Welcome/splash, ZIP + experience + garden type setup, first garden creation, SeedBox intro pitch
2. **Home dashboard**: Today's care task list, weather widget, garden overview cards, SeedBox status banner
3. **Plant detail screen**: Plant photo, care schedule, last-watered status, log care button, photo journal tab
4. **Garden view**: All plants in a garden, grid/list toggle, add plant button
5. **Plant encyclopedia**: Search/browse UI, plant card, full plant detail with care instructions
6. **Visual garden planner**: Drag-and-drop grid, companion planting warning overlays
7. **Plant ID camera**: Camera viewfinder, capture button, result screen (species + confidence + encyclopedia link)
8. **SeedBox screens**: Subscription pitch screen, seed selection (pick 5 of 9-10), active subscription management, order history
9. **Auth screens**: Sign up, sign in, social login buttons
10. **AI chatbot**: Chat UI, message bubbles, suggested prompts
11. **Settings + profile**: User profile, notification preferences, data export, subscription management

### What Claude will do for each mockup
- Generate a high-fidelity visual mockup using the Canva MCP
- Apply the HelloGarden design system: sage green (#7C9A6E), warm cream (#FDF8F0), earthy brown (#8B6F47), dark charcoal text (#2D2D2D)
- Show both light and dark mode variants for key screens
- Include real placeholder content (not "Lorem ipsum" — actual plant names, real care instructions, realistic data)
- Annotate key interactions and states (empty state, loading state, error state)

### After mockups are approved
Claude updates PROD_DOC.md Section 8 (Design System) with the full, screen-by-screen UI spec, then proceeds to Phase 1 coding with the approved designs as the blueprint.

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

## DISCUSS NEXT SESSION

### Tools & Add-ons to Set Up
Discussed at end of Session 2 — decide and act on these next session:

- **GitHub MCP** (most valuable, do first): Official GitHub MCP connector. Lets Claude create/manage GitHub Issues, PRs, and milestones directly. Plan is to use it to track each of the 7 phases as a GitHub project board — Claude can open and close issues as steps are completed. Available on claude.ai integrations page. Highly recommended before coding starts.
- **Figma MCP**: Higher-fidelity design alternative to Canva if needed. Requires a Figma account. Lower priority since Canva MCP is already connected and being used for mockups.
- **Supabase CLI** (install locally): `npm install -g supabase`. Lets us run DB migrations locally, manage Edge Functions, and auto-generate TypeScript types from the schema. Very useful starting Phase 1.
- **Stripe CLI** (install locally): For testing webhooks during Phase 5 without needing a public URL. Install from stripe.com/docs/stripe-cli. Not needed until Phase 5.
- **EAS CLI** (install locally): `npm install -g eas-cli`. For building and submitting the app. Not needed until Phase 7.
- **`/simplify` Claude skill**: Already available — use it after Claude writes chunks of code to review for quality, redundancy, and efficiency. Make a habit of it.

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
