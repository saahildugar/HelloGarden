# HelloGarden - Project Context

## Overview
HelloGarden is a mobile app (React Native / Expo) for beginner and intermediate gardeners. The app is FREE — no app subscription, no ads. Revenue comes from SeedBox, a monthly curated seed subscription ($14.99/month + $3.99 shipping, US only). The app is the gateway to convert users into SeedBox subscribers.

**Tagline**: "Your garden starts here."

Note: When you can make changes without the user making having to do it, please just make the changes. Don't ask the user to write code or rewrite stuff unless you're sure that's something that you can't do and the user has to do. THIS DOES NOT MEAN YOU SHOULDN'T ASK QUESTIONS. ASK A LOT OF QUESTIONS, AND ADD ANY RELEVANT INFORMATION YOU GET FROM THAT TO CLAUDE.md, QUESTIONS ARE HOW YOU GET VALUABLE CONTEXT. 
## Key Files to Keep Updated
- **CLAUDE.md** (this file): Master context for all sessions. UPDATE after every significant decision, architectural change, or new learning. ANY TIME SOMETHING IS PUSHED TO LATER, OR THERE IS SOMETHING THE USER SHOULD KNOW OR BE REMINDED OF LATER, ADD IT HERE. ANY TIME YOU GET NEW CONTEXT THAT MIGHT HELP YOU IN THE FUTURE, ADD IT HERE. AFTER EVERY PROMPT, CONSIDER IF THERE IS ANYTHING YOU SHOULD ADD TO CLAUDE.md. 
- **PROD_DOC.md**: Product requirements document. Update when features are finalized or changed.
- **env.local**: API keys and environment variables (in .gitignore, never committed).
- **research/**: Research notes — market-research.md, seedbox-cost-analysis.md

## Tech Stack
- **Frontend**: React Native + Expo (managed workflow)
- **Backend**: Supabase (Auth, Database, Edge Functions, Storage)
- **Database**: PostgreSQL (via Supabase)
- **Payments**: Stripe (SeedBox subscription only)
- **Local DB / Offline**: WatermelonDB (SQLite under hood) + PowerSync for sync
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand (lightweight, works well with offline-first)
- **Push Notifications**: Expo Push Notifications
- **Weather Data**: OpenWeather API (free in app for all users)
- **Location/Zones**: phzmapi.org (free, no key — ZIP → USDA hardiness zone). OpenWeather accepts ZIP directly for weather. Google Maps dropped — not needed.
- **Plant ID**: Plant.id API by Kindwise (free: 100/day, then $0.05-0.10 per ID) — API signup at https://www.kindwise.com/plant-id
- **AI Assistant**: Claude API (for garden chatbot)
- **Error Tracking**: Sentry

## Supabase Project
- **Organization**: saahildugar (org ID: gmamamauaqcpspeixiil)
- **Project ID**: okpspirezabgmevjegmg
- **Region**: us-east-1
- **URL**: https://okpspirezabgmevjegmg.supabase.co
- **Dashboard**: https://supabase.com/dashboard/project/okpspirezabgmevjegmg
- Note: Old project (tullpqawvjmjenwiguew) was under wrong account (Cascades Coding) — do not use.

## GitHub Repository
- **Repo**: https://github.com/saahildugar/HelloGarden
- **Owner**: saahildugar

## Development Environment
- **Testing (now)**: Android Studio emulator — Medium Phone API 36.0
- **Testing (soon)**: MacBook incoming — will use Expo Go on iPhone when available
- **Apple/Google dev accounts**: Deferred — not needed until app is ready to publish
- **EAS Build**: Deferred — not needed until publishing
- **Bundle ID**: com.hellogarden.app
- **Package manager**: npm
- **Stripe**: Using sandbox/test mode during development (sk_test_... / pk_test_...)
- **Domain**: hellogarden.com — NOT yet purchased

## Business Model (FINALIZED)
- **App is 100% FREE** — no app subscription, no ads, no paywalls
- Revenue comes entirely from **SeedBox** ($14.99/mo + $3.99 shipping)
- SeedBox subscribers get unlimited Plant ID; free users get 5/month
- COGS per box: ~$8.59 loaded. Gross margin: ~$6.40/box (42.7%)
- First box free (user pays $3.99 shipping only) — breaks even after 1 paid month
- Cancel anytime, no commitment
- Germination guarantee: if <50% of varieties germinate AND user followed in-app instructions, replacement seeds in next box (no cash refunds). Can also offer a month of bonus content/features as goodwill.

## Brand & Design (FINALIZED)
- **Name**: HelloGarden (final)
- **Tagline**: "Your garden starts here."
- **Personality**: Clean, professional, warm. Accessible to all ages including less tech-savvy
- **Colors**: Sage green + warm cream/off-white + earthy brown accents
- **Logo**: TBD (user will generate later, not blocking)
- **Dark mode**: Yes, from launch
- **Photos**: Real photos for plant database
- **Illustrations**: Subtle UI illustrations for empty states, onboarding
- **Animations**: Plant growth animations, subtle micro-interactions
- **Home screen**: Dashboard — today's care tasks (proactive), weather, garden overview, SeedBox status
- **Notifications**: ONLY for critical alerts (plant at risk of dying). Home screen shows ALL tasks including non-urgent.

## Target Audience (FINALIZED)
- All adult gardeners (18-65+), universal
- Beginners AND intermediate gardeners
- All garden types: user picks during onboarding (indoor, outdoor, balcony, raised bed, herbs, vegetables, flowers)
- All environments: urban, suburban, rural
- US-only for SeedBox; app available globally
- Family/shared gardens: equal access, invite via share link (no account required for invitees — guest/anonymous access)

## Core Features — MVP Launch
1. Plant tracking & garden management (multiple gardens per user)
2. Smart care reminders (watering, fertilizing, pruning)
3. Plant identification via camera (Plant.id API) — 5 free/month, unlimited for SeedBox
4. Disease/pest diagnosis via camera (Plant.id API)
5. Plant encyclopedia (~500-1000 plants at launch, detailed care instructions)
6. Visual garden planner with drag-and-drop + companion planting warnings
7. Weather integration (free for all users)
8. SeedBox subscription management + in-app shipment tracking
9. Seasonal planting calendar (personalized by USDA zone)
10. AI garden assistant chatbot (Claude API)
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

## SeedBox Details (FINALIZED)
- **Price**: $14.99/month + $3.99 shipping (separate)
- **First box**: FREE (user pays $3.99 shipping only)
- Monthly delivery, US only, cancel anytime
- **Seed selection**: User sees 9-10 curated options, picks their 5
- Seeds curated by: USDA zone, existing garden, companion planting, season, onboarding preferences
- Heirloom, non-GMO seeds, ~15-20 seeds per variety
- Contents: 5 seed packets + small fertilizer packet
- ONE tier at launch
- Gift subscriptions supported
- Packaging: bubble mailer envelope with HelloGarden sticker + info card
- Fulfillment: white-label, self-pack initially. Partner with seed company at scale.
- Winter: indoor-growing seeds for cold climates (never skip months)
- In-app shipment tracking
- **Germination guarantee**: If <50% of varieties germinate with proper care, replacement seeds in next box. No cash refunds.
- Wholesale supplier: Bentley Seeds ($0.50-0.85/packet at bulk)

## Onboarding (FINALIZED)
- Minimal friction — no account required to browse/use app
- Quick onboarding: ZIP code + experience level + garden type
- Account creation required only for SeedBox subscription
- SeedBox onboarding: additional questions (preferences, garden size, sunlight, goals)
- Garden setup happens AFTER onboarding
- SeedBox pitched after user adds their first plant (natural conversion moment)
- 3-4 illustrated walkthrough screens max

## Offline Architecture (FINALIZED)
- **Offline**: plant tracking, care reminders, garden view, care guides, journal, manual plant entry, encyclopedia, garden planner
- **Online only**: SeedBox ordering, weather updates, plant ID, AI chatbot, sync, disease diagnosis
- **Sync strategy**: last-write-wins (simple, adequate)

## Technical Decisions (FINALIZED)
- Auth: Email/password + Google + Apple Sign In (Supabase Auth)
- Guest/anonymous access for garden invitees (Supabase anonymous auth)
- Multiple gardens per user
- Notifications: conservative, customizable. Only push for critical plant alerts.
- Data export: yes
- Accessibility: WCAG AA
- English only at launch
- National US launch for SeedBox
- TypeScript throughout
- Functional components with hooks
- File-based routing (Expo Router)
- Ad-free, no dark patterns, transparent pricing

## Companion Planting
Plants that benefit each other when grown nearby (e.g., tomatoes + basil). Antagonist plants hurt each other (e.g., tomatoes + fennel). The visual garden planner warns users about bad pairings. Data sourced from open-source datasets (1,972+ plants, CC BY 4.0).

## Deferred / Come Back To
- **Stripe webhook secret**: Add after deploying Supabase Edge Function for payments. Webhook URL will be `https://okpspirezabgmevjegmg.supabase.co/functions/v1/stripe-webhook`. Register in Stripe Dashboard > Developers > Webhooks. Use Stripe CLI (`stripe listen`) for local testing.
- **SUPABASE_SERVICE_ROLE_KEY**: User needs to copy from Supabase Dashboard > Project Settings > API > service_role key.
- **Apple Developer Account** ($99/yr) + **Google Play Console** ($25): Needed before App Store/Play Store submission. Not needed for emulator testing.
- **EAS Build**: Configure when ready to build for real devices / publish.
- **hellogarden.com domain**: Purchase when ready to launch.
- **Shipment tracking API**: USPS or EasyPost/Shippo — TBD. Add to env.local when chosen.
- **Google Maps**: Dropped entirely. ZIP→zone via phzmapi.org (free, no key, no account). OpenWeather takes ZIP directly. No geocoding needed.

## Session Notes
- Session 1 (2026-06-13): Initial project setup. Created repo, Supabase project (existing), env.local. Market research completed (saved to research/). 74 questions + 13 follow-ups answered. All major decisions finalized. SeedBox pricing: $14.99/mo + $3.99 shipping. COGS: $8.59/box. Ready to begin PROD_DOC and code.
- Session 2 (2026-06-14): Migrated Supabase to correct account (saahildugar, org: gmamamauaqcpspeixiil, project: okpspirezabgmevjegmg). Fixed env.local: new Supabase URL/key (modern sb_publishable_ format), renamed AI_API_KEY → ANTHROPIC_API_KEY, added POWERSYNC_URL placeholder. Fixed Plant.id URL (rebranded to Kindwise: kindwise.com/plant-id). Stripe using sandbox. Testing on Android Studio emulator (Medium Phone API 36). Bundle ID: com.hellogarden.app. Package manager: npm.
