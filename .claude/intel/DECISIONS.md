# DECISIONS LOG

This is an append-only log of key architectural and strategic decisions.

---

## Decision #001: Technology Stack Selection
**Date:** Project Initialization
**Context:** Need to select stack for church media platform
**Options Considered:**
1. WordPress + Vimeo OTT (simpler, less custom)
2. Subsplash (managed platform)
3. Next.js + Sanity + Supabase + Cloudflare Stream (full custom)

**Decision:** Option 3 - Full custom build
**Rationale:**
- Maximum flexibility for GTY.org-style features
- Full ownership of content and platform
- Lower long-term costs than managed platforms
- Better developer experience for iteration

**Trade-offs:**
- Higher initial development effort
- Requires technical maintenance
- More complex content operations

---

## Decision #002: Video Hosting Strategy
**Date:** Project Initialization
**Context:** 400+ sermons on YouTube need hosting solution
**Options Considered:**
1. Keep YouTube embeds permanently
2. Migrate all to Cloudflare Stream immediately
3. Hybrid: YouTube embeds initially, gradual migration

**Decision:** Option 3 - Hybrid approach
**Rationale:**
- Fastest time to launch (YouTube embeds work immediately)
- Spreads migration cost over time
- Allows quality comparison before full commitment
- Preserves YouTube SEO/discovery during transition

**Implementation:**
- Phase 1: Import metadata, use YouTube embeds
- Phase 2: Migrate top 50 sermons to CF Stream
- Phase 3: Migrate remaining content gradually
- Phase 4: YouTube becomes secondary/archive

---

## Decision #003: CMS Selection - Sanity.io
**Date:** Project Initialization
**Context:** Need headless CMS for sermon content
**Options Considered:**
1. Contentful
2. Sanity.io
3. Strapi (self-hosted)
4. Payload CMS

**Decision:** Sanity.io
**Rationale:**
- Excellent real-time editing experience
- GROQ query language is powerful
- Free tier generous for this scale
- Custom input components (for scripture, video)
- Great TypeScript support

**Trade-offs:**
- GROQ learning curve
- Sanity-specific patterns

---

## Decision #004: Database - Supabase
**Date:** Project Initialization
**Context:** Need database for user data, watch history, etc.
**Options Considered:**
1. PlanetScale (MySQL)
2. Supabase (PostgreSQL)
3. Neon (PostgreSQL)
4. Firebase

**Decision:** Supabase
**Rationale:**
- Built-in auth (reduces complexity)
- Row Level Security for data protection
- PostgreSQL full-text search (avoid Algolia initially)
- Real-time subscriptions if needed later
- Generous free tier

**Trade-offs:**
- Another service to manage
- Supabase-specific auth patterns

---

## Decision #005: Search Strategy
**Date:** Project Initialization
**Context:** Need to search 400+ sermons by text, scripture, topic
**Options Considered:**
1. Algolia (dedicated search)
2. Elasticsearch (self-hosted)
3. Meilisearch (self-hosted or cloud)
4. PostgreSQL full-text search

**Decision:** PostgreSQL full-text search initially
**Rationale:**
- Already have Supabase/PostgreSQL
- 400 documents is small scale
- Can add Algolia later if needed
- Reduces cost and complexity

**Migration Path:**
If search performance becomes issue at >10,000 sermons or need advanced features, migrate to Algolia.

---

## Decision #006: Hosting Platform
**Date:** Project Initialization
**Updated:** Changed from Vercel to Railway
**Context:** Need hosting for Next.js application
**Options Considered:**
1. Vercel
2. Netlify
3. AWS Amplify
4. Railway

**Decision:** Railway
**Rationale:**
- Predictable, fixed pricing (church budget-friendly)
- No surprise bandwidth bills
- Docker support for full control
- GitHub integration with auto-deploy
- Familiar platform (already using for cloudcare-platform)
- Can add additional services later (workers, cron jobs)

**Trade-offs:**
- Requires `output: 'standalone'` in Next.js config
- Need external image optimization (Cloudflare Images)
- No edge functions (server regions only)
- More configuration than Vercel

**Mitigation:**
- Use Cloudflare for CDN/caching (handles edge performance)
- Use Cloudflare Images for image optimization ($5/mo)
- Railway's server regions sufficient for church audience

---

## Decision #007: Authentication Strategy
**Date:** Project Initialization
**Context:** Need auth for member features (favorites, notes, history)
**Options Considered:**
1. Clerk
2. Auth0
3. NextAuth.js
4. Supabase Auth

**Decision:** Supabase Auth
**Rationale:**
- Already using Supabase for database
- Reduces services to manage
- Direct integration with RLS
- Email + social providers supported
- Free tier sufficient

**Trade-offs:**
- Less polished than Clerk
- More manual UI work

---

## Decision #008: Payment Processing
**Date:** Project Initialization
**Context:** Need online giving functionality
**Options Considered:**
1. Stripe
2. Pushpay (church-specific)
3. Tithe.ly
4. Square

**Decision:** Stripe
**Rationale:**
- Industry standard, reliable
- Best developer experience
- Supports one-time and recurring
- Lower fees than church-specific platforms
- Extensive documentation

**Implementation:**
- Stripe Checkout for simplicity
- Webhooks for confirmation
- Store only Stripe IDs (no card data)

---

## Template for Future Decisions

```
## Decision #XXX: [Title]
**Date:** YYYY-MM-DD
**Context:** [Why this decision was needed]
**Options Considered:**
1. Option A
2. Option B
3. Option C

**Decision:** [Which option was chosen]
**Rationale:** [Why this option was best]
**Trade-offs:** [What we gave up]
**Migration Path:** [How to change if needed]
```
