# HelloGarden - Product Requirements Document

> **Status**: FINALIZED (core decisions locked)
> **Last Updated**: 2026-06-13

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
- Powered by Claude API
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
- Google Maps Geocoding: ZIP to coordinates/zone mapping
- Claude API: AI garden chatbot
- Stripe: SeedBox payments
- USPS/shipping API: shipment tracking (TBD)

### Infrastructure
- Expo Push Notifications
- Sentry for error tracking
- EAS Build for iOS/Android builds

---

## 8. Design System

### Colors
- **Primary**: Sage green (#7C9A6E or similar)
- **Background**: Warm cream/off-white (#FDF8F0 or similar)
- **Accent**: Earthy brown (#8B6F47 or similar)
- **Text**: Dark charcoal (#2D2D2D)
- **Error/Alert**: Warm red (#D64545)
- **Success**: Fresh green (#4CAF50)
- **Dark mode**: Dark backgrounds with same accent palette

### Typography
- Clean, readable sans-serif
- Large touch targets for accessibility
- WCAG AA contrast ratios

### Design Principles
1. Professional but warm — not childish, not sterile
2. Photo-forward — beautiful plant imagery as hero content
3. Accessible — works for 18 year olds and 65 year olds
4. Information-dense but not cluttered — progressive disclosure
5. Micro-interactions and plant growth animations for delight

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
