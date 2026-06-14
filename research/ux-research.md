# HelloGarden — UI/UX Competitor Research
> Completed: Session 3 (2026-06-14)
> Purpose: Extract actionable design decisions from competitor apps before mockups or code.

---

## COMPETITOR BREAKDOWNS

---

### PLANTA

**Onboarding (step-by-step):**
1. Welcome/splash
2. 21-step quiz — experience level, current plants, preferences. Feels fast despite length.
3. Permission pre-prompts — benefit-first copy ("We use your location for your zone") BEFORE system dialog. High opt-in.
4. Paywall #1 — "SAVE 70%" annual plan. Dismissible.
5. Paywall #2 — "One Week Free Trial" secondary offer.
6. Sign-up — Apple, Google, or email. Can explore without signing up.
7. Add first plant — many required fields (location, light, pot size, material, last watered). High friction.

**Home screen:**
- Top: weather widget + "You have X tasks today" task count
- Primary: "Today's tasks" list — plant + action per row
- Secondary: "Upcoming" section (future care at a glance)
- Bottom: historical care data per plant
- Bottom nav: Home / Calendar / Plant Library / Account

**Garden/collection representation:**
- Flat plant list — no grouping by room or location
- Users repeatedly request "areas/rooms" grouping — unmet need across all competitors

**Plant detail screen:**
- Photo + name → care schedule → personalized step-by-step guide → care history → "Dr. Planta" diagnosis tab → settings
- Problem: too many sections, too many colors, no progressive disclosure. Cognitive overload.

**Reminder/notification UX:**
- Push often vague ("Your plant is waiting") — bad. Specific ones ("Water your ZZ Plant") praised.
- In-app: "Today's tasks" list. Mark done with one tap. Swipe to snooze.
- Smart: app adjusts schedule if user waters early + confirms soil condition.
- Adaptive: learns from behavior — app feels intelligent.

**Retention mechanics:**
- Daily task loop (open → complete tasks → return)
- Adaptive scheduling (investment loop — app "knows" your behavior)
- Care history log (shows user their commitment over time)
- No streaks, no gamification, no social

**Monetization:**
- Two paywalls in onboarding. Core reminders stay free.
- Premium ($35.99/yr): unlimited plant ID, light meter, Dr. Planta diagnosis, full care guides

**What works well:**
- Permission pre-prompts with benefit copy (increases opt-in significantly)
- Task-first home screen
- Adaptive reminders that learn from behavior
- Care history as proof of emotional investment
- Specific push notification copy when done right

**What feels weak:**
- Vague push notifications ("Your plant is waiting")
- Plant detail info overload, no progressive disclosure
- High friction adding plants (too many required fields)
- No garden/room grouping (flat list only)
- "Add plant" CTA on wrong side (left, not right)

**Copy:** Permission pre-prompts, task-first home, adaptive reminders, specific notification copy
**Avoid:** Info overload on detail screens, vague notifications, flat plant list

---

### PICTURETHIS

**Onboarding:**
1. Splash + tracking permission prompt
2. Feature walkthrough overlay
3. 7-day free trial paywall — appears very early, before full app access
4. Camera immediately available

**Home screen:**
- Large camera button dominates center
- Bottom tabs: My Garden / Feed / Community / Profile
- Minimal — information loads after plant scan
- Subscription popup on every app open (hated — hard-to-find gray dismiss button)

**Garden/collection representation:**
- "My Garden" tab: simple list of saved plants
- After ID → tap "Save to My Garden"
- No grouping, no spatial layout, no organization

**Plant detail/ID result:**
- Species + confidence % prominently shown
- Common names, care tips, Q&A, pest info in one scroll
- Results in seconds — speed is a key differentiator

**Reminder UX:**
- Watering, fertilizing, misting, repotting reminders
- Secondary feature — ID is primary. Less customizable.

**Retention mechanics:**
- Social sharing for credits, ad watching for credits
- Community Q&A feed
- No streaks, no gamification

**Monetization:**
- Freemium + credit system
- 7-day trial at onboarding entry
- Subscription popup on every open (aggressive, universally disliked)
- Even premium users hit secondary paywalls (Plant Advisor gated separately)

**What works well:**
- Dominant camera CTA (proven acquisition hook)
- Confidence % on ID results (builds trust)
- Fast ID results
- Clean, uncluttered home
- Community Q&A and feed

**What feels weak:**
- ~42% real-world accuracy vs. claimed 83%+
- Subscription popup on every open
- Multi-layer paywall (extractive)
- Care reminders weak and secondary
- No garden visualization

**Copy:** Camera-first design, confidence % on results, quick save-to-garden
**Avoid:** Recurring subscription popup, multi-layer paywall, vague credit limits

---

### GARDENIZE

**Onboarding:**
1. Setup wizard — builds garden structure first (beds, containers, rooms)
2. Creates planting sites, adds plants, links activities
3. Structured but time-intensive — completion rate likely lower

**Home screen:**
- Smart calendar (all upcoming tasks)
- Plant library overview
- Recent activity log
- Praised as "most visually appealing" but also "time-intensive to use"

**Garden/plant representation:**
- Plants organized into planting sites (beds, containers, rooms)
- Rich filtering/sorting (type, location, condition)
- No spatial visualization — still list/category-based
- 45,000+ plant species in database

**Photo journal:**
- Multi-photo timeline per plant (growth stages chronologically)
- Notes per photo entry
- Desktop + mobile sync
- Strong engagement and emotional attachment driver

**Multi-user:**
- Public community sharing + follow gardeners
- Private family collaboration model unclear/weak

**Reminders:**
- Single + recurring per plant
- Smart calendar view for all upcoming tasks
- Suggests optimal timing

**Monetization:**
- Gardenize Plus with 2-week free trial
- Least aggressive paywall of the four apps
- Moved previously-free features (calendar) to Plus → major backlash, trust damage

**What works well:**
- Setup wizard creates good garden data structure early
- Multi-photo growth timeline per plant
- Smart calendar for all upcoming tasks
- Beautiful warm visual design ("unbleached" aesthetic)
- 45K plant database

**What feels weak:**
- No spatial garden visualization
- Setup too time-intensive (high onboarding drop-off risk)
- Moving free features to paid tier = trust damage
- Family/private collaboration unclear
- No plant ID camera

**Copy:** Multi-photo growth timeline, smart task calendar, warm visual aesthetic, garden structure setup
**Avoid:** Moving free features behind paywall, unclear family sharing, no spatial layout

---

### PLANT PARENT

**Onboarding:**
1. Quiz
2. Abrupt handoff — drops into setup screen, no clear next action
3. Paywall at END of onboarding (most aggressive of all four)
4. Defaults to annual framed as ~$2.50/mo

**Home screen:**
- Daily task list: complete / snooze / "do all" batch action
- Clean but utilitarian — no personality, no contextual info

**Garden/collection:**
- Flat plant collection (no garden grouping)
- Location changes auto-adjust watering schedule (smart feature)

**Plant detail:**
- Tabbed (Care / Diagnosis / Tools / Growth / Notes)
- Still overwhelming — tabs don't solve the info overload problem

**Reminder UX:**
- Plant calendar, recurring per care type
- No weather-awareness or smart delay noted

**Monetization:**
- End-of-onboarding paywall — core features gated (highest friction of all four)
- Premium: plant ID, smart reminders, diagnosis, weather tips, garden management

**What works well:**
- Batch "do all" task button
- Per-task snooze
- Location-aware care adjustments
- Fast plant ID
- 4.7 stars despite weaknesses

**What feels weak:**
- Abrupt onboarding handoff (no clear first action)
- Info overload even with tabs
- Generic, drab home screen (no personality)
- Paywall blocks core features (most aggressive)
- AI misidentification issues (granite identified as "healthy inch plant")

**Copy:** Batch task action, per-task snooze, location-aware care
**Avoid:** End-of-onboarding paywall, abrupt handoff, drab home screen

---

## PATTERN EXTRACTION

### Winning patterns across all four apps

| Pattern | Where seen | Why it works |
|---|---|---|
| Task-first home screen | Planta, Plant Parent | Answers "what do I do today?" in 2 seconds |
| Weather widget on home | Universal | Expected, builds contextual trust |
| Bottom tab navigation 4-5 tabs | All | Thumb zone, flat structure, familiar |
| Permission pre-prompts with benefit copy | Planta | Explains WHY before asking — increases opt-in |
| Quick save-to-garden after ID | PictureThis | Reduces friction from discovery to ownership |
| Smart calendar for all tasks | Gardenize | One place, reduces cognitive load |
| Multi-photo growth timeline | Gardenize | Emotional attachment, engagement driver |
| Adaptive reminders | Planta | App that learns = app users trust |

### "AI Slop" / Low-quality patterns — specific UI causes

1. Subscription popup on every app open (PictureThis) — destroys trust
2. Uniform 16px border radius on everything — feels template-built
3. Plant detail screens with 8+ ungrouped sections — cognitive overload
4. Hero image home screen with no task information — pretty but wrong for a care app
5. Vague push notifications ("Something needs attention") — makes app feel dumb
6. Oversized cards with lots of padding and no clear action — wasted screen space
7. All tasks weighted equally in lists — urgency not communicated
8. Blue-purple gradient accents — generic tech feel, wrong for plants
9. Missing states: no empty state, loading state, or error state designed — feels broken
10. Full-bleed green backgrounds — overwhelming, not warm

---

## UX PSYCHOLOGY

### Why users return daily
- Social responsibility psychology: a living thing depends on you (strongest driver in plant apps)
- Daily task loop: open → see tasks → complete → dopamine → return tomorrow
- Streaks create loss aversion — no competitor uses this (open opportunity)
- Variable rewards: ID result, plant milestone, new encyclopedia discovery

### What causes churn in first 3 days (D7 is critical — 77% of apps lose users here)
1. Abrupt onboarding handoff with no clear first action
2. Poor first ID result damages trust immediately
3. Irrelevant or spammy reminders out of the gate
4. No perceived value in session 1
5. Information overload on first plant detail screen

### What builds trust
- Honest confidence % on ID (don't overclaim accuracy)
- Transparent data sources ("care data from USDA hardiness zones")
- Real user plant photos (not stock photos)
- Germination guarantee visible and prominent (HelloGarden already has this)
- No dark patterns anywhere
- Consistent, calm, warm visual language

### Clarity of "what should I do today?"
The most important question users bring to the home screen every time they open the app. Must be answered within 2 seconds. Everything else is secondary.

### Notification strategy that works
- Progressive urgency: gentle → urgent → critical based on overdue duration
- Weather-aware: "Rain today — skip watering"
- Smart timing: send when user typically opens app, not fixed times
- Home screen is the primary task hub, not push notifications
- Critical push alerts only (plant at risk of dying)

---

## DESIGN SYSTEM SIGNALS

| Element | Direction |
|---|---|
| Layout style | Cards for garden/plant views. Compact list for tasks. Search-first for encyclopedia. |
| Spacing | Airy overall (cream + whitespace = premium). Dense where action needed (task lists). |
| Typography | DM Sans, Inter, or Plus Jakarta Sans. Large body text. Strong heading hierarchy. No all-caps except labels. |
| Color usage | Sage green as accent/action, NOT background. Cream for backgrounds. Brown for borders/secondary. Red for alerts only. |
| Icons | Line icons (nav tabs), filled icons (active state). Rounded, organic — not sharp geometric. |
| Card design | Information-dense with clear action surface. Not oversized with empty padding. |

---

## DESIGN DECISIONS — ALL RESOLVED IN PHASE 2

1. **Navigation model**: 4 bottom tabs (Home / Garden / Explore / SeedBox)
2. **Home screen**: Dashboard header + task list below
3. **Streak mechanic**: Yes — daily care streak (all competitors skip this)
4. **Garden representation**: Garden cards → tap → plant grid
5. **Plant card**: Photo + name + care status + quick-log button
6. **Onboarding**: 3 screens (Welcome / Setup / Create First Garden)
7. **First garden creation**: Screen 3 of onboarding
8. **SeedBox placement**: 4th tab, always visible
9. **Plant detail tabs**: 3 tabs — Care / Journal / Info
10. **Encyclopedia**: Inside Explore tab (not standalone nav)
11. **Garden planner**: Sub-screen inside Garden Detail
12. **Dark mode**: System-default + user override in settings
13. **Empty state**: Illustrated warm empty garden + "Add a Plant" (primary) + "Browse Encyclopedia" (secondary)
