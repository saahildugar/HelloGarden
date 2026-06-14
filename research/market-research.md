# HelloGarden Market Research Report
> Compiled: 2026-06-13

## 1. Top Competitors

### Tier 1
| App | Pricing | Key Strength | Key Weakness |
|-----|---------|-------------|--------------|
| **Planta** | $7.99/mo, $35.99/yr | Personalized watering, light meter, 92% plant ID | 78% negative reviews cite cost; overwatering issues |
| **Greg** | $6.99/mo, $29.99/yr, $49.99 lifetime | ML-based weather-aware scheduling, community | Android bugs, sneaky free trials |
| **Blossom** | $6.99/mo (prices increased to ~$79.99/yr) | Plant ID, care content | Drastic price hikes, unauthorized charges |
| **PictureThis** | $29.99-$39.99/yr | 400K+ species, 98% accuracy, 10M+ downloads | Pricey for casuals |

### Tier 2 (Niche/Specialty)
- **NatureID**: $29.99/yr, 95% accuracy desert/alpine, 1M+ species
- **Gardenize**: Journal, garden layouts, multi-user collab, some offline
- **From Seed to Spoon**: FREE, companion planting in layout (unique!), Growbot AI, 60+ vegetables
- **iNaturalist**: 100% free, citizen science, massive community
- **Garden Answers**: 20K+ plants, expert connection
- **Moon & Garden**: Lunar calendar-based gardening

## 2. Key Feature Analysis

### Must-Haves (by user demand)
1. Plant ID (AI) — 72.84% of users download for this
2. Care instructions — 58.20%
3. Watering reminders/scheduling — 80%+ of apps
4. Weather integration — ~45%
5. Disease/pest diagnosis — ~45%

### Innovative Features (rare, loved)
- Companion planting warnings in visual garden layout (From Seed to Spoon, Veggie Garden Planner)
- Goal-based care: "easy care" vs "maximum growth" (Greg)
- Microclimate analysis with phone barometer + NOAA (ClimateGardener)
- Health benefits mapping (which plants help which conditions)
- AR garden visualization
- Indoor seed starting mode

### Top Pain Points Across All Apps
1. Aggressive/deceptive subscription practices (#1 complaint)
2. Core features paywalled
3. Watering schedule inaccuracy
4. Poor Android experience
5. Limited offline functionality
6. Notification fatigue
7. Weak customer support

## 3. Seed Subscription Box Market

| Service | Price | Contents |
|---------|-------|----------|
| Urban Organic Gardener (Basic) | $9.99/mo | 3 seed packs + soil pods + guides |
| Seed Bank Box | ~$10-15/mo | 8-10 heirloom seed varieties |
| D&H Seed Harvest Co | $10/mo | 5 seed packets + freebie |
| San Diego Seed Co VIP | $150/yr | 3 rare/unreleased varieties/mo |
| Gardenuity | Premium | Full garden kits (plants + soil + tools) |

**Key insight**: No major app integrates seed subscription with digital garden planning. This is HelloGarden's white space.

## 4. Companion Planting Data Sources (Open Source)
- Open-source plant DB on GitHub: 1,972 varieties, CC BY 4.0 license
- OpenFarm (openfarmcc/OpenFarm): Free, open growing guides
- GenevieveMilliken/companion_plants: Network graph from Wikipedia
- heydenberk/gardening-data: JSON for edible plants
- Growstuff: Community-maintained DB

## 5. USDA Hardiness Zones
- 13 zones by avg annual minimum temp (10F ranges), a/b subzones
- Basic: zip code -> zone -> planting calendar
- Better: zone + local frost dates
- Best: zone + frost dates + growing degree days + day length + soil temp + microclimate

## 6. Offline-First Stack (React Native 2026)
- **Local DB**: WatermelonDB (SQLite under hood, native queries, handles 10K+ records)
- **Sync**: PowerSync (managed) or ElectricSQL (Postgres-based)
- **Conflict resolution**: CRDTs recommended (Yjs, Automerge)
- Stack is mature in 2026 — "no excuse for building otherwise"

## 7. Monetization
- 82% of non-gaming apps use subscriptions
- Subscriptions = 4% of apps but 45% of global revenue
- Gardening app sweet spot: $5-8/month or $30-40/year
- Recommended: Generous free tier + premium sub + SeedBox physical revenue
- Bundle app + seeds at $15-20/month for higher LTV

## 8. User Demographics
- **Millennials (25-40)**: 29% of gardening demographics, 65% growth in houseplants
- **Gen Z (18-25)**: 63.8% spent significantly more time gardening in 2025
- Average gardener age: 35-44
- Only 1 in 5 gardeners currently use apps (massive underpenetration)
- 70%+ of 18-35 year olds interested in gardening

## 9. UI/UX Trends
- Nature-inspired palettes (greens, earth tones, soft whites)
- Plant photography as hero content
- Simple onboarding (minimal friction)
- Visual drag-and-drop garden planners
- Dashboard home: today's tasks, weather, upcoming care
- Micro-interactions and smooth animations
- Dark mode standard

## 10. Strategic Takeaways
1. Market is underpenetrated — only 1 in 5 gardeners use apps
2. Subscription fatigue is real — transparent pricing is a differentiator
3. No one integrates seeds + software — HelloGarden's core opportunity
4. Companion planting in layout is rare and loved
5. Offline-first is table stakes for gardening (outdoor use)
6. Plant ID is the acquisition hook (72.84%)
7. The $5-8/month sweet spot is established by competitors
8. Bundling app + seed box at $15-20/month captures both revenue streams
