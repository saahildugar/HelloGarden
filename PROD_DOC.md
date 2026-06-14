# HelloGarden - Product Requirements Document

> **Status**: FINALIZED (core decisions locked)
> **Last Updated**: 2026-06-14

---

## 1. Product Vision

**HelloGarden** is a free mobile app for beginner and intermediate gardeners that makes plant care simple, beautiful, and accessible. The app tracks plants, provides smart care reminders, identifies plants via camera, and offers a rich plant encyclopedia — all for free.

The revenue driver is **SeedBox**: a monthly subscription delivering 5 curated seed packets + fertilizer directly to users' doors, personalized to their location, garden, and preferences.

**Tagline**: "Your garden starts here."

**Core differentiators**:
1. Free app with no ads, no paywalls — avoids the #1 competitor complaint
2. SeedBox integrates physical seed delivery with digital garden planning (no competitor does this)
3. Visual garden planner with companion planting warnings (only 2-3 apps offer this)
4. Offline-first architecture (gardeners are often outdoors without WiFi)

---

## 2. Target Audience

- **Who**: All adult gardeners (18-65+), beginners and intermediate
- **Garden types**: Indoor, outdoor, balcony, raised bed, herbs, vegetables, flowers — user chooses
- **Environments**: Urban, suburban, rural — no restrictions
- **Geography**: App available globally. SeedBox US-only.
- **Family use**: Shared gardens with multiple members via invite links

**Market opportunity**: Only 1 in 5 gardeners currently use apps. 70%+ of 18-35 year olds are interested in gardening. The market is massively underpenetrated.

---

## 3. Business Model & Pricing

### Revenue: SeedBox Subscription Only
| Item | Price |
|------|-------|
| SeedBox monthly subscription | $14.99/month |
| Shipping (separate) | $3.99/order |
| First box | FREE (user pays $3.99 shipping) |

### Unit Economics
| Metric | Value |
|--------|-------|
| COGS per box (fully loaded) | $8.59 |
| Gross margin per box | $6.40 (42.7%) |
| Break-even on free box | 1 paid month |
| Break-even with $20 CAC | 3-4 months |

### Free vs. SeedBox Subscriber Perks
| Feature | Free Users | SeedBox Subscribers |
|---------|-----------|-------------------|
| Plant tracking & gardens | Unlimited | Unlimited |
| Care reminders | Full | Full |
| Plant encyclopedia | Full | Full |
| Weather integration | Full | Full |
| Garden planner | Full | Full |
| Seasonal calendar | Full | Full |
| Offline features | Full | Full |
| Plant ID (camera) | 5/month | Unlimited |
| Disease diagnosis | 5/month | Unlimited |
| AI garden chatbot | Limited | Unlimited |
| SeedBox delivery | -- | Monthly curated seeds |

### Policies
- **Cancel anytime** — no commitment periods
- **Gift subscriptions** supported
- **Germination guarantee**: If <50% of varieties germinate with proper care per in-app instructions, replacement seeds in next box. No cash refunds.
- **No ads** anywhere in the app, ever

---

## 4. SeedBox Feature (Detailed)

### Selection Flow
1. Algorithm generates 9-10 seed options based on user's USDA zone, season, existing garden, companion planting compatibility, and onboarding preferences
2. User reviews options and selects their 5
3. Order confirmed, box shipped within 3-5 business days
4. In-app tracking shows shipment status

### Box Contents
- 5 seed packets (~15-20 seeds each, heirloom, non-GMO)
- 1 fertilizer sample packet
- Info card with planting instructions + QR code linking to in-app guides

### Fulfillment
- **Phase 1**: White-label, self-pack (founder handles)
- **Phase 2**: Partner with seed company (e.g., Bentley Seeds) based on demand
- **Supplier**: Bentley Seeds wholesale ($0.50-0.85/packet at 250-500 unit minimums)
- **Packaging**: #0 poly bubble mailer + HelloGarden branded sticker
- **Shipping**: USPS First-Class Large Envelope (~$1.90 at 2oz)
- **Winter strategy**: Indoor-growing seeds for cold climates (never skip months)

### SeedBox Onboarding (Additional Questions)
- Garden size (approximate sq ft or container count)
- Sunlight conditions (full sun, partial shade, full shade)
- Gardening goals (food, flowers, herbs, aesthetics, pollinator-friendly)
- Any allergies or dietary preferences (for edible plants)
- Plants they already have (to avoid duplicates and leverage companions)

---

## 5. Core Features (MVP Launch)

### 5.1 Plant Tracking & Garden Management
- Add plants manually or via Plant ID camera
- Multiple gardens per user ("Backyard", "Kitchen Windowsill", "Balcony", etc.)
- Track each plant: species, date planted, location, photos, notes
- Log care activities (watered, fertilized, pruned, repotted)
- Family/shared gardens: invite via share link, equal edit access, no account required for guests

### 5.2 Smart Care Reminders
- Personalized watering schedule based on plant type, weather, and season
- Fertilizing reminders on plant-specific schedules
- Pruning and repotting reminders
- **Home screen**: Shows ALL daily care tasks (proactive, even non-urgent)
- **Push notifications**: ONLY for critical alerts ("Your tomatoes haven't been watered in 5 days and it's 95F — water today or they may die")
- Fully customizable notification preferences

### 5.3 Plant Identification (AI Camera)
- Point camera at any plant to identify species
- Uses Plant.id API (98% accuracy, 400K+ species)
- Returns: species name, care requirements, link to encyclopedia entry
- **Free users**: 5 identifications per month
- **SeedBox subscribers**: Unlimited

### 5.4 Disease & Pest Diagnosis
- Photo-based AI diagnosis of plant diseases and pests
- Returns: diagnosis, severity, treatment recommendations
- Same API as Plant ID (Plant.id includes health assessment)
- Same free/subscriber limits as Plant ID

### 5.5 Plant Encyclopedia
- ~500-1,000 plants at launch (most common vegetables, herbs, flowers, houseplants)
- **Detailed** care instructions per plant:
  - Watering frequency and method
  - Sunlight requirements (hours, type)
  - Soil preferences
  - Fertilizer schedule and type
  - Common pests and diseases + treatments
  - Companion plants (good neighbors) and antagonists (bad neighbors)
  - USDA hardiness zones
  - Days to germination, days to harvest (if edible)
  - Seasonal planting windows by zone
- Data sources: Open-source plant DB (1,972 plants, CC BY 4.0) + curated/AI-supplemented content
- Real photos for each plant

### 5.6 Visual Garden Planner
- Drag-and-drop garden layout editor
- Define garden beds, containers, rows
- Place plants in layout
- **Companion planting warnings**: Visual alert when antagonist plants are placed near each other
- **Companion planting suggestions**: Highlight beneficial pairings
- Data from open-source companion planting datasets

### 5.7 Weather Integration
- Current conditions and forecast for user's location
- Weather-aware care adjustments ("Rain expected tomorrow — skip watering")
- Frost alerts ("Frost warning tonight — cover your tomatoes")
- Free for all users (OpenWeather API, 1000 calls/day free tier)

### 5.8 SeedBox Management
- Subscribe/manage SeedBox subscription in-app (Stripe integration)
- Browse 9-10 curated monthly options, select 5
- View order history
- Track shipments in-app
- Gift subscription purchase flow
- Cancel/pause anytime

### 5.9 Seasonal Planting Calendar
- Personalized "plant this now" recommendations based on USDA zone
- Monthly view: what to plant, what to harvest, what to prepare
- Integrates with SeedBox to show when received seeds should be planted

### 5.10 AI Garden Assistant
- Conversational chatbot for garden questions
- "Why are my tomato leaves turning yellow?"
- "What should I plant next to my peppers?"
- "When should I start seeds indoors in zone 7?"
- Powered by Google Gemini API (free tier via Google AI Studio)
- **Free users**: Limited queries/month
- **SeedBox subscribers**: Unlimited

### 5.11 Photo Journal & Growth Tracking
- Take photos of plants over time
- Timeline view showing growth progression
- Plant growth animations in the UI
- Attach notes to each photo entry

### 5.12 Offline Support
**Works offline**:
- Plant tracking and care logging
- Care reminders (pre-cached schedule)
- Garden view and planner
- Plant encyclopedia (pre-cached)
- Photo journal (stored locally, synced later)
- Manual plant entry

**Requires internet**:
- SeedBox ordering and management
- Weather updates
- Plant ID and disease diagnosis (API calls)
- AI chatbot
- Data sync across devices
- Shipment tracking

---

## 6. Onboarding Flow

### Step 1: Welcome (1 screen)
- App name, tagline, hero illustration
- "Get Started" button

### Step 2: Quick Setup (2-3 screens)
- ZIP code (for zone, weather, SeedBox availability)
- Experience level (beginner / intermediate / experienced)
- Garden type (indoor / outdoor / balcony / raised bed / multiple — multi-select)

### Step 3: First Garden Creation
- User creates their first garden space after onboarding
- Guided flow: name it, pick type, add first plant (manual or camera ID)

### Step 4: SeedBox Introduction
- Shown after user adds their first plant (natural conversion moment)
- Brief pitch: "Get curated seeds delivered monthly, picked for YOUR garden"
- "Try your first box FREE" CTA
- Can dismiss and revisit later

### SeedBox-Specific Onboarding (when subscribing)
- Garden size
- Sunlight conditions
- Goals (food, flowers, herbs, aesthetics)
- Dietary preferences/allergies
- Current plants (to avoid duplicates)

---

## 7. Technical Architecture

### Frontend
- React Native + Expo (managed workflow)
- Expo Router (file-based routing)
- TypeScript throughout
- Zustand for state management

### Backend
- Supabase: Auth, PostgreSQL, Edge Functions, Storage, Realtime
- Supabase Auth: email/password, Google, Apple, anonymous (for guest garden access)

### Offline Layer
- WatermelonDB (local SQLite database)
- PowerSync (managed sync layer between WatermelonDB and Supabase)
- Last-write-wins conflict resolution

### External APIs
- Plant.id: plant identification + disease diagnosis
- OpenWeather: weather data
- phzmapi.org: ZIP to USDA hardiness zone (free, no key — Google Maps dropped)
- Google Gemini API: AI garden chatbot (free tier via Google AI Studio)
- Stripe: SeedBox payments
- USPS/shipping API: shipment tracking (TBD)

### Infrastructure
- Expo Push Notifications
- Sentry for error tracking
- EAS Build for iOS/Android builds

---

## 8. Design System

### Colors
- **Primary**: Sage green (#7C9A6E) — used for primary actions and success states, NOT as a background
- **Background**: Warm cream (#FDF8F0) — all primary backgrounds
- **Accent**: Earthy brown (#8B6F47) — secondary accents, borders, dividers
- **Text**: Dark charcoal (#2D2D2D) — body text
- **Error/Alert**: Warm red (#D64545) — overdue tasks, critical alerts only
- **Success**: Fresh green (#4CAF50) — healthy status, completed tasks
- **Dark mode**: Dark backgrounds with same accent palette. System-default + user override in settings.

### Typography
- **Font**: DM Sans, Inter, or Plus Jakarta Sans (decision final at mockup phase)
- Large body text (accessible to 65+ users)
- Strong heading hierarchy — not everything bold
- No all-caps except for labels and tags
- Large touch targets (minimum 44pt), WCAG AA contrast

### Design Principles
1. Professional but warm — not childish, not sterile
2. Photo-forward — beautiful real plant imagery as hero content
3. Accessible — works for 18 year olds and 65 year olds
4. Progressive disclosure — lead with the most important info, collapse advanced details
5. Micro-interactions and plant growth animations for delight
6. Task-first always — home screen answers "what do I do today?" in 2 seconds
7. Airy overall spacing; dense where action is needed (task lists, care schedules)
8. Line icons for nav (filled = active state). Rounded, organic icon style — no sharp geometric.

### Layout Patterns
- **Home**: Dashboard header (weather + streak + garden summary) + task list below
- **Garden/Plant views**: Photo-forward card grid (2 columns)
- **Task lists**: Compact, scannable list with visual urgency hierarchy
- **Encyclopedia**: Search-first with category chips below
- **Cards**: Information-dense with clear action surface — no oversized empty padding

### Navigation Model (FINAL)
- **Bottom tab bar — 4 tabs**: Home / Garden / Explore / SeedBox
- Settings and Profile: accessible from avatar in Home header
- FAB (Floating Action Button): "+" Add Plant, visible inside Garden Detail
- No drawer navigation, no hamburger menu

### UI Architecture (FINAL — 27 screens)

#### Navigation Structure
```
Bottom Tab Bar (4 tabs)
├── Home          — dashboard, today's tasks, weather, streak
├── Garden        — all gardens → plant grid → plant detail → planner
├── Explore       — encyclopedia, plant ID, AI chatbot, seasonal calendar
└── SeedBox       — subscription pitch or subscriber dashboard
```

#### Screen Index
1. Splash / Loading
2. Onboarding — Welcome
3. Onboarding — Setup (ZIP / experience / garden type)
4. Onboarding — Create First Garden
5. SeedBox Intro Card (dismissible, shown post-first-plant)
6. Home Dashboard
7. Garden Tab (all gardens)
8. Garden Detail (plant grid inside a garden)
9. Add Plant Flow
10. Plant Detail — Care tab (default)
11. Plant Detail — Journal tab
12. Plant Detail — Info tab
13. Log Care (bottom sheet)
14. Plant ID Camera
15. ID Result Screen
16. Explore Hub
17. Encyclopedia Browse / Search
18. Encyclopedia Plant Detail
19. Seasonal Planting Calendar
20. AI Garden Chatbot
21. SeedBox — Non-subscriber pitch
22. SeedBox — Subscriber dashboard
23. SeedBox Seed Selection (pick 5 of 9-10)
24. Auth — Sign In
25. Auth — Sign Up
26. Settings + Profile
27. Notification Preferences
28. Garden Planner (sub-screen of Garden Detail)
29. Shared Garden / Invite Flow

#### Key UI Decisions
- **Streak mechanic**: Daily care streak displayed on Home (leaf icon + N day streak). Creates loss-aversion loop. No competitor uses this.
- **Empty state**: Illustrated warm empty garden state on first launch — "Your garden is empty" + "Add a Plant" (primary) + "Browse Encyclopedia" (secondary)
- **Plant card**: Photo + name + care status ("Water in 2 days") + quick-log checkmark button
- **Plant detail**: 3 tabs (Care / Journal / Info). Quick action bar (Water / Fertilize / More) sticky at top.
- **SeedBox tab**: Changes appearance for subscribers (ribbon on icon, management UI vs. pitch UI)
- **Garden planner**: Sub-screen inside Garden Detail (Planner tab), not in main nav
- **Encyclopedia**: Inside Explore tab — not a standalone nav entry
- **SeedBox placement**: Never in onboarding. Pitch card appears after first plant added (dismissible, 7-day cooldown).

---

## 9. Data Model (High Level)

### Core Entities
- **User**: auth, profile, preferences, zone, experience level
- **Garden**: name, type, location, shared members
- **Plant**: species, garden_id, date_planted, status, care schedule
- **CareLog**: plant_id, type (water/fertilize/prune), timestamp, notes
- **PlantPhoto**: plant_id, image_url, timestamp, notes
- **PlantSpecies**: encyclopedia data (name, care info, companions, zones)
- **CompanionPlanting**: species pairs, relationship (companion/antagonist)
- **SeedBoxSubscription**: user_id, status, stripe_id, shipping_address
- **SeedBoxOrder**: subscription_id, month, selected_seeds, tracking_number, status
- **SeedOption**: monthly curated options, species, availability

---

## 10. MVP Scope & Priorities

### P0 — Must Have for Launch
- User auth (email + social)
- Onboarding flow
- Plant tracking (add, view, log care)
- Multiple gardens
- Care reminders (home screen tasks + critical push notifications)
- Plant encyclopedia (500+ plants, detailed)
- SeedBox subscription flow (Stripe)
- Offline support (core features)
- Dark mode

### P1 — Should Have for Launch
- Plant ID (camera)
- Disease diagnosis
- Visual garden planner + companion warnings
- Weather integration
- Seasonal planting calendar
- Photo journal
- SeedBox seed selection (9-10 options, pick 5)
- Family/shared gardens

### P2 — Nice to Have for Launch
- AI chatbot
- In-app shipment tracking
- Gift subscriptions
- Data export

### P3 — Post-Launch
- Community features
- Smart device integration (ESP32 sensors)
- Additional plant database expansion
- Multi-language support
- Android-specific optimizations

---

## 11. Competitive Positioning

| Feature | HelloGarden | Planta | Greg | From Seed to Spoon |
|---------|-------------|--------|------|-------------------|
| Price | FREE | $7.99/mo | $6.99/mo | Free (ads) |
| Ads | None | None | None | Yes |
| Seed delivery | Yes ($14.99/mo) | No | No | No |
| Companion planting in layout | Yes | No | No | Yes |
| Offline support | Full | Limited | Limited | Limited |
| Plant ID | Yes (limited free) | Yes (paywalled) | Yes | Yes |
| Family gardens | Yes | No | No | No |

---

## 12. Success Metrics

- **Downloads**: Total app installs
- **DAU/MAU**: Daily/monthly active users
- **SeedBox conversion rate**: % of app users who subscribe
- **SeedBox retention**: Average subscription length (target: 6+ months)
- **SeedBox MRR**: Monthly recurring revenue from subscriptions
- **Churn rate**: Monthly SeedBox cancellation rate (target: <10%)
- **NPS**: Net Promoter Score (target: 50+)
- **App Store rating**: Target 4.5+ stars

---

## 13. Implementation Roadmap

> **Current status**: Pre-coding setup complete. Starting Phase 1 next session.
> See SESSION_STATE.md for exact pick-up point each session.

### Phase 1 — Project Foundation
*All done by Claude. No user action required.*
1. Initialize Expo project (`npx create-expo-app`) — TypeScript template, Expo Router, bundle ID `com.hellogarden.app`
2. Install all packages: Supabase JS, WatermelonDB, PowerSync, Zustand, Stripe React Native SDK, `@sentry/react-native`, `@google/generative-ai`, all Expo packages (camera, notifications, location, image-picker, constants)
3. Set up folder structure: `/app` (Expo Router routes), `/components`, `/hooks`, `/stores` (Zustand), `/lib` (API clients), `/types`, `/assets`, `/constants`
4. Wire env.local into app via `expo-constants` + `app.config.ts`
5. Set up design system: colors, typography, spacing, theme, dark mode (light/dark token system)
6. Create Supabase database schema — all tables, foreign keys, indexes, Row Level Security policies

### Phase 2 — Auth & Onboarding
*All done by Claude.*
7. Auth screens: sign up (email), sign in (email), Google OAuth, Apple OAuth, anonymous guest access
8. Auth state management (Zustand + Supabase session)
9. Onboarding flow (4 screens): Welcome → ZIP/experience/garden-type → First garden creation → SeedBox intro pitch
10. Persist onboarding data: save ZIP, zone (via phzmapi.org), experience level, garden type to Supabase user profile

### Phase 3 — Core App (P0 Features)
*All done by Claude.*
11. Home dashboard: today's care task list, weather widget (OpenWeather), garden overview cards, SeedBox status banner
12. Plant tracking: add plant (manual + from encyclopedia), view plant detail, edit, delete, log care (water/fertilize/prune/repot)
13. Multiple gardens: create/name/type, switch between gardens, garden overview screen
14. Plant encyclopedia: seed Supabase with 500+ plants from open-source data, search UI, plant detail page with full care info
15. Care reminders: compute next-care dates per plant, home screen task list, critical-only push notifications via Expo
16. Offline layer: WatermelonDB schema mirroring Supabase, PowerSync sync rules, Zustand offline-aware stores

### Phase 4 — P1 Features
*All done by Claude.*
17. Visual garden planner: drag-and-drop grid layout, define beds/containers, place plants, companion planting warning overlay
18. Plant ID camera: Expo Camera integration, Kindwise API call, result screen with species + link to encyclopedia
19. Disease/pest diagnosis camera: same camera flow, Kindwise health assessment endpoint, diagnosis + treatment UI
20. Weather integration: OpenWeather current + 5-day forecast, frost alerts, weather-aware care adjustments on home screen
21. Photo journal: camera capture or photo library pick, timeline view per plant, growth progression display, plant growth animations
22. Seasonal planting calendar: USDA zone from phzmapi.org, monthly "plant now" grid, integrate with SeedBox received seeds

### Phase 5 — Monetization (P0 + P1)
*Claude builds code. User configures Stripe dashboard.*
23. SeedBox subscription flow: Stripe React Native SDK, subscribe button, billing screen, cancel/pause flow
24. SeedBox seed selection UI: browse 9-10 curated monthly options, pick 5, confirm order
25. Supabase Edge Function: Stripe webhook handler for subscription events (created, updated, canceled, payment_failed)
26. Add STRIPE_WEBHOOK_SECRET to env.local after Edge Function deployed
27. Order history screen
28. Shipment tracking: integrate chosen provider (EasyPost or Shippo), in-app tracking status screen
29. Gift subscription purchase flow

### Phase 6 — AI, Sharing & Polish (P2)
*All done by Claude.*
30. AI garden chatbot: Gemini API integration, chat UI, free vs. subscriber usage limits (track monthly query count)
31. Family/shared gardens: generate invite link (shareable URL), recipient opens app → anonymous Supabase auth → joined as garden member with equal edit access
32. Sentry instrumentation: error boundaries on all screens, performance tracing, user context
33. Accessibility audit: WCAG AA, minimum 44pt touch targets, screen reader labels, contrast check
34. Dark mode: audit and finalize all screens for both light/dark

### Phase 7 — Launch Prep
*Mix of Claude and user actions.*
35. EAS Build configuration: `eas.json` for iOS + Android, internal/preview/production profiles
36. App Store assets: icon, screenshots (iPhone + Android), preview video, description, keywords
37. TestFlight setup: internal testing build distributed via TestFlight
38. Google Play internal testing track
39. Final QA: end-to-end flows on real devices
> **User must do**: Apple Developer Account ($99/yr), Google Play Console ($25), logo/branding assets, App Store copy review
