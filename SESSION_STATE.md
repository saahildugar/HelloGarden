# HelloGarden — Session State
> **Purpose**: Exact snapshot of where we left off. Read this at the start of every new session to pick up instantly.
> **Last Updated**: 2026-06-14 (End of Session 3)

---

## WHERE WE LEFT OFF

**Phase 3 — Mockups is NEXT.** Architecture and research are fully complete. No code yet.

Tell Claude: *"Let's start Phase 3 mockups using the Canva MCP."*

---

## CURRENT STATUS

### What's Done
- [x] Product decisions finalized (see PROD_DOC.md)
- [x] GitHub repo created: https://github.com/saahildugar/HelloGarden
- [x] Supabase project created on saahildugar account (project: okpspirezabgmevjegmg, us-east-1)
- [x] PowerSync connected to Supabase (`powersync` publication created in DB)
- [x] All API keys obtained and saved in env.local
- [x] Research files in place: research/market-research.md, research/seedbox-cost-analysis.md, research/ux-research.md
- [x] Phase 1 UI/UX research complete (Planta, PictureThis, Gardenize, Plant Parent)
- [x] Phase 2 UI architecture complete — 27 screens defined, all product decisions made
- [x] PROD_DOC.md Section 8 fully updated (design system + screen index + key decisions)
- [x] CLAUDE.md updated with Session 3 notes
- [x] Canva MCP confirmed connected to 1051549@lwsd.org (Canva Premium)

### What's NOT Done Yet
- [ ] Phase 3 — Mockups (Canva MCP, screen by screen) — NEXT
- [ ] Expo project not initialized (no package.json, no app.json yet)
- [ ] No screens, no components, no code at all
- [ ] Supabase database schema not created yet (no tables)
- [ ] PowerSync sync rules not configured yet
- [ ] GitHub MCP not yet connected (user needs to add via claude.ai integrations page)

---

## NEXT STEPS IN ORDER

### IMMEDIATE — Phase 3: Mockups (Canva MCP)
Generate visual mockups for all key screens using Canva MCP. User reviews each, Claude iterates. Once approved, designs get locked into PROD_DOC.md as the official visual spec.

**Mockup order (do in this sequence):**
1. Onboarding flow (3 screens: Welcome → Setup → Create First Garden)
2. Home Dashboard (light + dark mode)
3. Garden Tab + Garden Detail (plant grid)
4. Plant Detail (all 3 tabs: Care / Journal / Info)
5. Explore Hub + Encyclopedia browse + Plant Encyclopedia Detail
6. Plant ID Camera + ID Result screen
7. SeedBox — non-subscriber pitch + subscriber dashboard + Seed Selection
8. Auth screens (Sign In + Sign Up)
9. AI Chatbot screen
10. Settings + Profile
11. Garden Planner
12. Empty states (0 plants, 0 gardens)

**Design language for all mockups:**
- Sage green #7C9A6E (primary actions), warm cream #FDF8F0 (backgrounds), earthy brown #8B6F47 (accents), charcoal #2D2D2D (text), warm red #D64545 (alerts)
- Line icons (inactive), filled icons (active)
- Rounded organic shapes
- Real placeholder content (no Lorem Ipsum)
- Show both light AND dark mode for: Home Dashboard, Plant Detail, Explore Hub

### AFTER MOCKUPS APPROVED — Phase 1: Project Foundation
1. Initialize Expo project (`npx create-expo-app`) — TypeScript, Expo Router, bundle ID `com.hellogarden.app`
2. Install all packages
3. Set up folder structure
4. Wire env.local via expo-constants + app.config.ts
5. Set up design system file (tokens from approved mockups)
6. Create Supabase database schema (all tables + RLS)

### THEN — Phases 2-7 (see PROD_DOC.md Section 13 for full roadmap)

---

## env.local STATUS

| Variable | Status |
|----------|--------|
| `SUPABASE_URL` | Filled |
| `SUPABASE_ANON_KEY` | Filled (modern sb_publishable_ format) |
| `SUPABASE_SERVICE_ROLE_KEY` | Filled |
| `STRIPE_PUBLISHABLE_KEY` | Filled (sandbox: pk_test_...) |
| `STRIPE_SECRET_KEY` | Filled (sandbox: sk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | Deferred — needs Supabase Edge Function first (Phase 5) |
| `EXPO_TOKEN` | Filled |
| `PLANT_ID_API_KEY` | Filled (Kindwise) |
| `OPENWEATHER_API_KEY` | Filled |
| `GEMINI_API_KEY` | Filled (Google AI Studio, free tier) |
| `POWERSYNC_URL` | Filled |
| `SENTRY_DSN` | Filled |

---

## KEY DECISIONS QUICK REFERENCE

### Navigation
- 4 bottom tabs: Home / Garden / Explore / SeedBox
- Profile + Settings behind avatar in Home header
- FAB (+) for Add Plant inside Garden Detail

### Screen Count
- 27 screens total (see PROD_DOC.md Section 8 for full list)

### Product
- **Bundle ID**: com.hellogarden.app
- **Package manager**: npm
- **Testing**: Android Studio emulator (Medium Phone API 36) now; Expo Go on iPhone when MacBook arrives
- **Stripe**: Sandbox/test mode during development
- **AI chatbot**: Google Gemini API
- **Zone lookup**: phzmapi.org (free, no key)
- **Plant ID**: Kindwise API
- **Conflict resolution**: Last-write-wins
- **Notifications**: ONLY critical push alerts; all tasks shown on home screen
- **Guest access**: Supabase anonymous auth for garden invitees
- **Streak mechanic**: Yes — daily care streak on home (no competitor does this)
- **SeedBox pitch**: Post-first-plant only (NEVER in onboarding)

### Design
- Sage green #7C9A6E / Cream #FDF8F0 / Brown #8B6F47 / Charcoal #2D2D2D / Red #D64545
- Typography: DM Sans / Inter / Plus Jakarta Sans (final at mockup phase)
- Plant detail: 3 tabs (Care / Journal / Info)
- Garden planner: sub-screen inside Garden Detail
- Encyclopedia: inside Explore tab

---

## TOOLS TO STILL SET UP
- **GitHub MCP**: User adds via claude.ai integrations page (not yet done). Lets Claude manage GitHub Issues/milestones.
- **Supabase CLI**: `npm install -g supabase` — needed for Phase 1 coding (migrations, type gen). Do before coding starts.
- **Stripe CLI**: Install from stripe.com/docs/stripe-cli — for local webhook testing. Do in Phase 5.
- **EAS CLI**: `npm install -g eas-cli` — for building/submitting. Do in Phase 7.

---

## THINGS DEFERRED (don't forget)
- **STRIPE_WEBHOOK_SECRET**: Add after Phase 5 Edge Function deployment
- **Shipment tracking API**: EasyPost or Shippo — TBD, choose in Phase 5
- **Apple Developer Account** ($99/yr) + **Google Play Console** ($25): Phase 7 only
- **hellogarden.com domain**: Purchase when nearing launch
- **Logo**: User will generate — not blocking any code
