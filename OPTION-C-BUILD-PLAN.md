# MARANATHA BIBLE CHURCH PLATFORM - OPTION C BUILD PLAN

## Executive Summary

A fully custom, self-hosted media platform modeled after GTY.org, built for scale and complete platform independence. Video hosted on Cloudflare Stream (not YouTube), with Sanity CMS for content management, Supabase for data/auth, and Next.js for the frontend.

---

## ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MARANATHA PLATFORM STACK                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         FRONTEND (Next.js 14)                        │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │    │
│  │  │ Homepage │  │ Sermons  │  │  Watch   │  │  Give    │            │    │
│  │  │          │  │ Archive  │  │  Live    │  │          │            │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │    │
│  │  │  About   │  │ Connect  │  │ Account  │  │  Admin   │            │    │
│  │  │          │  │          │  │ Portal   │  │ (Studio) │            │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         API / DATA LAYER                             │    │
│  │                                                                      │    │
│  │  ┌────────────────┐    ┌────────────────┐    ┌────────────────┐     │    │
│  │  │   Sanity.io    │    │   Supabase     │    │  Cloudflare    │     │    │
│  │  │                │    │                │    │    Stream      │     │    │
│  │  │  - Sermons     │    │  - Auth        │    │                │     │    │
│  │  │  - Series      │    │  - Users       │    │  - Video Host  │     │    │
│  │  │  - Speakers    │    │  - Favorites   │    │  - HLS/DASH    │     │    │
│  │  │  - Pages       │    │  - History     │    │  - Analytics   │     │    │
│  │  │  - Blog        │    │  - Notes       │    │  - Transcoding │     │    │
│  │  │  - Events      │    │  - Analytics   │    │  - Thumbnails  │     │    │
│  │  └────────────────┘    └────────────────┘    └────────────────┘     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      EXTERNAL INTEGRATIONS                           │    │
│  │                                                                      │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │   Stripe     │  │  YouTube     │  │   ESV API    │               │    │
│  │  │   (Giving)   │  │  (Live Only) │  │   (Bible)    │               │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │  Resend      │  │  OpenAI      │  │  Algolia     │               │    │
│  │  │  (Email)     │  │  (Whisper)   │  │  (Search)*   │               │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         INFRASTRUCTURE                               │    │
│  │                                                                      │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │   Railway    │  │  Cloudflare  │  │   GitHub     │               │    │
│  │  │  (Hosting)   │  │  (CDN/DNS/   │  │  (Code/CI)   │               │    │
│  │  │              │  │   Images)    │  │              │               │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

* Algolia optional - Postgres full-text search for MVP
```

---

## DIRECTORY STRUCTURE

```
maranatha-platform/
├── .claude/                          # APEX Intelligence
│   ├── VISION.md                     # Platform vision
│   ├── ROADMAP.md                    # Build phases
│   ├── SYSTEM.md                     # Current state
│   ├── prompts/
│   │   ├── REAPER-PROMPT.md
│   │   ├── ARCHITECT-PROMPT.md
│   │   ├── DESIGNER-PROMPT.md
│   │   └── STRATEGIST-PROMPT.md
│   ├── state/
│   ├── intel/
│   └── handoff/
│
├── apps/
│   ├── web/                          # Next.js 14 Frontend
│   │   ├── src/
│   │   │   ├── app/                  # App Router pages
│   │   │   │   ├── (public)/         # Public routes
│   │   │   │   │   ├── page.tsx      # Homepage
│   │   │   │   │   ├── sermons/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── [slug]/page.tsx
│   │   │   │   │   │   ├── series/[slug]/page.tsx
│   │   │   │   │   │   ├── book/[book]/page.tsx
│   │   │   │   │   │   └── speaker/[slug]/page.tsx
│   │   │   │   │   ├── watch/
│   │   │   │   │   │   ├── page.tsx  # Live stream
│   │   │   │   │   │   └── live/page.tsx
│   │   │   │   │   ├── listen/
│   │   │   │   │   │   └── page.tsx  # Podcast/audio
│   │   │   │   │   ├── read/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── blog/
│   │   │   │   │   │   └── devotionals/
│   │   │   │   │   ├── about/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── leadership/page.tsx
│   │   │   │   │   │   ├── beliefs/page.tsx
│   │   │   │   │   │   └── visit/page.tsx
│   │   │   │   │   ├── connect/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── events/page.tsx
│   │   │   │   │   │   ├── groups/page.tsx
│   │   │   │   │   │   └── prayer/page.tsx
│   │   │   │   │   └── give/page.tsx
│   │   │   │   ├── (auth)/           # Auth routes
│   │   │   │   │   ├── login/page.tsx
│   │   │   │   │   ├── register/page.tsx
│   │   │   │   │   └── callback/page.tsx
│   │   │   │   ├── (account)/        # Protected routes
│   │   │   │   │   ├── account/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   ├── favorites/page.tsx
│   │   │   │   │   │   ├── history/page.tsx
│   │   │   │   │   │   └── notes/page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── api/              # API routes
│   │   │   │   │   ├── revalidate/route.ts
│   │   │   │   │   ├── podcast/route.ts
│   │   │   │   │   ├── search/route.ts
│   │   │   │   │   └── webhooks/
│   │   │   │   │       ├── sanity/route.ts
│   │   │   │   │       ├── stripe/route.ts
│   │   │   │   │       └── cloudflare/route.ts
│   │   │   │   ├── layout.tsx
│   │   │   │   └── globals.css
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── ui/               # Base UI (shadcn)
│   │   │   │   ├── layout/
│   │   │   │   │   ├── header.tsx
│   │   │   │   │   ├── footer.tsx
│   │   │   │   │   ├── nav.tsx
│   │   │   │   │   └── mobile-nav.tsx
│   │   │   │   ├── sermon/
│   │   │   │   │   ├── sermon-card.tsx
│   │   │   │   │   ├── sermon-grid.tsx
│   │   │   │   │   ├── sermon-player.tsx
│   │   │   │   │   ├── sermon-filters.tsx
│   │   │   │   │   └── scripture-nav.tsx
│   │   │   │   ├── video/
│   │   │   │   │   ├── cloudflare-player.tsx
│   │   │   │   │   ├── youtube-embed.tsx
│   │   │   │   │   └── live-indicator.tsx
│   │   │   │   ├── audio/
│   │   │   │   │   ├── audio-player.tsx
│   │   │   │   │   └── podcast-links.tsx
│   │   │   │   └── forms/
│   │   │   │       ├── prayer-form.tsx
│   │   │   │       ├── contact-form.tsx
│   │   │   │       └── newsletter-form.tsx
│   │   │   │
│   │   │   ├── lib/
│   │   │   │   ├── sanity/
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── queries.ts
│   │   │   │   │   └── image.ts
│   │   │   │   ├── supabase/
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── server.ts
│   │   │   │   │   └── middleware.ts
│   │   │   │   ├── cloudflare/
│   │   │   │   │   ├── stream.ts
│   │   │   │   │   └── upload.ts
│   │   │   │   ├── stripe/
│   │   │   │   │   └── client.ts
│   │   │   │   └── utils/
│   │   │   │       ├── bible.ts      # Scripture parsing
│   │   │   │       ├── date.ts
│   │   │   │       └── search.ts
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── use-sermon-player.ts
│   │   │   │   ├── use-favorites.ts
│   │   │   │   ├── use-watch-history.ts
│   │   │   │   └── use-live-status.ts
│   │   │   │
│   │   │   └── types/
│   │   │       ├── sermon.ts
│   │   │       ├── sanity.ts
│   │   │       └── database.ts
│   │   │
│   │   ├── public/
│   │   │   ├── fonts/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   │
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── studio/                       # Sanity Studio
│       ├── sanity.config.ts
│       ├── sanity.cli.ts
│       ├── schemas/
│       │   ├── index.ts
│       │   ├── sermon.ts
│       │   ├── series.ts
│       │   ├── speaker.ts
│       │   ├── scripture.ts
│       │   ├── topic.ts
│       │   ├── blog-post.ts
│       │   ├── devotional.ts
│       │   ├── event.ts
│       │   ├── page.ts
│       │   ├── staff.ts
│       │   └── settings.ts
│       ├── components/
│       │   ├── cloudflare-input.tsx
│       │   └── scripture-input.tsx
│       └── package.json
│
├── packages/
│   └── shared/                       # Shared utilities
│       ├── src/
│       │   ├── types/
│       │   ├── constants/
│       │   │   └── bible-books.ts
│       │   └── utils/
│       ├── tsconfig.json
│       └── package.json
│
├── scripts/
│   ├── migrate-youtube.ts            # YouTube → Cloudflare migration
│   ├── generate-podcast-feed.ts      # RSS feed generator
│   ├── transcribe-sermon.ts          # Whisper transcription
│   ├── seed-data.ts                  # Initial data seeding
│   └── backup-content.ts             # Content backup
│
├── supabase/
│   ├── migrations/
│   │   ├── 00001_initial_schema.sql
│   │   ├── 00002_user_profiles.sql
│   │   ├── 00003_watch_history.sql
│   │   ├── 00004_favorites.sql
│   │   ├── 00005_sermon_notes.sql
│   │   └── 00006_analytics.sql
│   ├── functions/
│   │   ├── track-view/index.ts
│   │   └── generate-feed/index.ts
│   └── seed.sql
│
├── docker-compose.yml                # Local dev environment
├── turbo.json                        # Turborepo config
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## DATABASE SCHEMA (Supabase/PostgreSQL)

```sql
-- ============================================================================
-- MARANATHA PLATFORM - SUPABASE SCHEMA
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For fuzzy text search

-- ============================================================================
-- USERS & PROFILES
-- ============================================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_member BOOLEAN DEFAULT FALSE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- WATCH HISTORY
-- ============================================================================

CREATE TABLE watch_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  sermon_id TEXT NOT NULL,  -- Sanity document ID
  progress_seconds INTEGER DEFAULT 0,
  duration_seconds INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  last_watched_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, sermon_id)
);

CREATE INDEX idx_watch_history_user ON watch_history(user_id);
CREATE INDEX idx_watch_history_sermon ON watch_history(sermon_id);

ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own watch history" ON watch_history
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- FAVORITES
-- ============================================================================

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  sermon_id TEXT NOT NULL,  -- Sanity document ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, sermon_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- SERMON NOTES
-- ============================================================================

CREATE TABLE sermon_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  sermon_id TEXT NOT NULL,  -- Sanity document ID
  content TEXT NOT NULL,
  timestamp_seconds INTEGER,  -- Optional: timestamp in video
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sermon_notes_user ON sermon_notes(user_id);
CREATE INDEX idx_sermon_notes_sermon ON sermon_notes(sermon_id);

ALTER TABLE sermon_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notes" ON sermon_notes
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- PRAYER REQUESTS
-- ============================================================================

CREATE TABLE prayer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  request TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  is_answered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_prayer_requests_public ON prayer_requests(is_public) WHERE is_public = TRUE;

-- Staff can view all, public requests visible to all
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Users can view own requests" ON prayer_requests
  FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);

-- ============================================================================
-- ANALYTICS (Aggregated, not PII)
-- ============================================================================

CREATE TABLE sermon_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sermon_id TEXT NOT NULL,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  unique_viewers INTEGER DEFAULT 0,
  total_watch_time_seconds BIGINT DEFAULT 0,
  avg_completion_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(sermon_id, date)
);

CREATE INDEX idx_analytics_sermon ON sermon_analytics(sermon_id);
CREATE INDEX idx_analytics_date ON sermon_analytics(date);

-- ============================================================================
-- DONATIONS (References to Stripe)
-- ============================================================================

CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT UNIQUE NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd',
  fund TEXT DEFAULT 'general',  -- general, building, missions, etc.
  is_recurring BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL,  -- succeeded, pending, failed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_donations_user ON donations(user_id);
CREATE INDEX idx_donations_date ON donations(created_at);

-- ============================================================================
-- FULL-TEXT SEARCH SUPPORT
-- ============================================================================

-- Create a materialized view for sermon search (populated via webhook)
CREATE TABLE sermon_search_index (
  sermon_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  speaker TEXT,
  series TEXT,
  scripture_refs TEXT[],
  topics TEXT[],
  transcript TEXT,
  search_vector TSVECTOR,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create GIN index for fast full-text search
CREATE INDEX idx_sermon_search_vector ON sermon_search_index USING GIN(search_vector);
CREATE INDEX idx_sermon_search_topics ON sermon_search_index USING GIN(topics);
CREATE INDEX idx_sermon_search_scripture ON sermon_search_index USING GIN(scripture_refs);

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_sermon_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.speaker, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.series, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.transcript, '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sermon_search_vector_trigger
  BEFORE INSERT OR UPDATE ON sermon_search_index
  FOR EACH ROW EXECUTE FUNCTION update_sermon_search_vector();

-- Search function
CREATE OR REPLACE FUNCTION search_sermons(
  query TEXT,
  filter_speaker TEXT DEFAULT NULL,
  filter_series TEXT DEFAULT NULL,
  filter_book TEXT DEFAULT NULL,
  result_limit INTEGER DEFAULT 20,
  result_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  sermon_id TEXT,
  title TEXT,
  description TEXT,
  speaker TEXT,
  series TEXT,
  scripture_refs TEXT[],
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.sermon_id,
    s.title,
    s.description,
    s.speaker,
    s.series,
    s.scripture_refs,
    ts_rank(s.search_vector, websearch_to_tsquery('english', query)) AS rank
  FROM sermon_search_index s
  WHERE
    s.search_vector @@ websearch_to_tsquery('english', query)
    AND (filter_speaker IS NULL OR s.speaker = filter_speaker)
    AND (filter_series IS NULL OR s.series = filter_series)
    AND (filter_book IS NULL OR filter_book = ANY(s.scripture_refs))
  ORDER BY rank DESC
  LIMIT result_limit
  OFFSET result_offset;
END;
$$ LANGUAGE plpgsql;
```

---

## SANITY CMS SCHEMAS

### sermon.ts
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sermon',
  title: 'Sermon',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Sermon Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{ type: 'speaker' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{ type: 'series' }],
    }),
    defineField({
      name: 'scripture',
      title: 'Scripture References',
      type: 'array',
      of: [{ type: 'scriptureReference' }],
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        {
          name: 'cloudflareId',
          title: 'Cloudflare Stream Video ID',
          type: 'string',
          description: 'The video ID from Cloudflare Stream',
        },
        {
          name: 'youtubeId',
          title: 'YouTube Video ID (Legacy)',
          type: 'string',
          description: 'For videos not yet migrated to Cloudflare',
        },
        {
          name: 'duration',
          title: 'Duration (seconds)',
          type: 'number',
        },
        {
          name: 'thumbnail',
          title: 'Custom Thumbnail',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'audio',
      title: 'Audio',
      type: 'object',
      fields: [
        {
          name: 'file',
          title: 'Audio File',
          type: 'file',
          options: { accept: 'audio/*' },
        },
        {
          name: 'externalUrl',
          title: 'External Audio URL',
          type: 'url',
        },
        {
          name: 'duration',
          title: 'Duration (seconds)',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'resources',
      title: 'Downloadable Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'file', type: 'file', title: 'File' },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Sermon',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      speaker: 'speaker.name',
      date: 'date',
      media: 'video.thumbnail',
    },
    prepare({ title, speaker, date, media }) {
      return {
        title,
        subtitle: `${speaker} • ${date}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
})
```

### series.ts
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'series',
  title: 'Sermon Series',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Series Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'primaryScripture',
      title: 'Primary Scripture Book',
      type: 'string',
      options: {
        list: [
          // Old Testament
          { title: 'Genesis', value: 'genesis' },
          { title: 'Exodus', value: 'exodus' },
          // ... all books
          { title: 'Revelation', value: 'revelation' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Series',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
```

### scriptureReference.ts
```typescript
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'scriptureReference',
  title: 'Scripture Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'book',
      title: 'Book',
      type: 'string',
      options: {
        list: [
          // Old Testament
          { title: 'Genesis', value: 'GEN' },
          { title: 'Exodus', value: 'EXO' },
          { title: 'Leviticus', value: 'LEV' },
          { title: 'Numbers', value: 'NUM' },
          { title: 'Deuteronomy', value: 'DEU' },
          { title: 'Joshua', value: 'JOS' },
          { title: 'Judges', value: 'JDG' },
          { title: 'Ruth', value: 'RUT' },
          { title: '1 Samuel', value: '1SA' },
          { title: '2 Samuel', value: '2SA' },
          { title: '1 Kings', value: '1KI' },
          { title: '2 Kings', value: '2KI' },
          { title: '1 Chronicles', value: '1CH' },
          { title: '2 Chronicles', value: '2CH' },
          { title: 'Ezra', value: 'EZR' },
          { title: 'Nehemiah', value: 'NEH' },
          { title: 'Esther', value: 'EST' },
          { title: 'Job', value: 'JOB' },
          { title: 'Psalms', value: 'PSA' },
          { title: 'Proverbs', value: 'PRO' },
          { title: 'Ecclesiastes', value: 'ECC' },
          { title: 'Song of Solomon', value: 'SNG' },
          { title: 'Isaiah', value: 'ISA' },
          { title: 'Jeremiah', value: 'JER' },
          { title: 'Lamentations', value: 'LAM' },
          { title: 'Ezekiel', value: 'EZK' },
          { title: 'Daniel', value: 'DAN' },
          { title: 'Hosea', value: 'HOS' },
          { title: 'Joel', value: 'JOL' },
          { title: 'Amos', value: 'AMO' },
          { title: 'Obadiah', value: 'OBA' },
          { title: 'Jonah', value: 'JON' },
          { title: 'Micah', value: 'MIC' },
          { title: 'Nahum', value: 'NAM' },
          { title: 'Habakkuk', value: 'HAB' },
          { title: 'Zephaniah', value: 'ZEP' },
          { title: 'Haggai', value: 'HAG' },
          { title: 'Zechariah', value: 'ZEC' },
          { title: 'Malachi', value: 'MAL' },
          // New Testament
          { title: 'Matthew', value: 'MAT' },
          { title: 'Mark', value: 'MRK' },
          { title: 'Luke', value: 'LUK' },
          { title: 'John', value: 'JHN' },
          { title: 'Acts', value: 'ACT' },
          { title: 'Romans', value: 'ROM' },
          { title: '1 Corinthians', value: '1CO' },
          { title: '2 Corinthians', value: '2CO' },
          { title: 'Galatians', value: 'GAL' },
          { title: 'Ephesians', value: 'EPH' },
          { title: 'Philippians', value: 'PHP' },
          { title: 'Colossians', value: 'COL' },
          { title: '1 Thessalonians', value: '1TH' },
          { title: '2 Thessalonians', value: '2TH' },
          { title: '1 Timothy', value: '1TI' },
          { title: '2 Timothy', value: '2TI' },
          { title: 'Titus', value: 'TIT' },
          { title: 'Philemon', value: 'PHM' },
          { title: 'Hebrews', value: 'HEB' },
          { title: 'James', value: 'JAS' },
          { title: '1 Peter', value: '1PE' },
          { title: '2 Peter', value: '2PE' },
          { title: '1 John', value: '1JN' },
          { title: '2 John', value: '2JN' },
          { title: '3 John', value: '3JN' },
          { title: 'Jude', value: 'JUD' },
          { title: 'Revelation', value: 'REV' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startChapter',
      title: 'Start Chapter',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'startVerse',
      title: 'Start Verse',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'endChapter',
      title: 'End Chapter',
      type: 'number',
    }),
    defineField({
      name: 'endVerse',
      title: 'End Verse',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      book: 'book',
      startChapter: 'startChapter',
      startVerse: 'startVerse',
      endChapter: 'endChapter',
      endVerse: 'endVerse',
    },
    prepare({ book, startChapter, startVerse, endChapter, endVerse }) {
      let ref = `${book} ${startChapter}`
      if (startVerse) ref += `:${startVerse}`
      if (endChapter && endChapter !== startChapter) {
        ref += `-${endChapter}`
        if (endVerse) ref += `:${endVerse}`
      } else if (endVerse && endVerse !== startVerse) {
        ref += `-${endVerse}`
      }
      return { title: ref }
    },
  },
})
```

---

## CLOUDFLARE STREAM INTEGRATION

### Video Upload & Management
```typescript
// lib/cloudflare/stream.ts
import { Readable } from 'stream'

const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!
const CF_API_TOKEN = process.env.CLOUDFLARE_STREAM_TOKEN!

interface CloudflareVideo {
  uid: string
  thumbnail: string
  playback: {
    hls: string
    dash: string
  }
  duration: number
  status: {
    state: 'pendingupload' | 'downloading' | 'queued' | 'inprogress' | 'ready' | 'error'
  }
  meta: Record<string, string>
}

// Get direct upload URL (for client-side uploads)
export async function getDirectUploadUrl(metadata: Record<string, string> = {}) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/stream/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maxDurationSeconds: 7200, // 2 hours max
        requireSignedURLs: false,
        allowedOrigins: [process.env.NEXT_PUBLIC_SITE_URL],
        meta: metadata,
      }),
    }
  )

  const data = await response.json()
  return {
    uploadUrl: data.result.uploadURL,
    videoId: data.result.uid,
  }
}

// Upload from URL (for YouTube migration)
export async function uploadFromUrl(
  videoUrl: string,
  metadata: Record<string, string> = {}
): Promise<string> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/stream/copy`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: videoUrl,
        meta: metadata,
        requireSignedURLs: false,
      }),
    }
  )

  const data = await response.json()
  return data.result.uid
}

// Get video details
export async function getVideo(videoId: string): Promise<CloudflareVideo> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/stream/${videoId}`,
    {
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
      },
    }
  )

  const data = await response.json()
  return data.result
}

// List all videos
export async function listVideos(options: {
  limit?: number
  after?: string
  status?: string
} = {}): Promise<CloudflareVideo[]> {
  const params = new URLSearchParams()
  if (options.limit) params.set('limit', options.limit.toString())
  if (options.after) params.set('after', options.after)
  if (options.status) params.set('status', options.status)

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/stream?${params}`,
    {
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
      },
    }
  )

  const data = await response.json()
  return data.result
}

// Delete video
export async function deleteVideo(videoId: string): Promise<void> {
  await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/stream/${videoId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
      },
    }
  )
}

// Generate signed URL (if using signed URLs)
export async function getSignedUrl(
  videoId: string,
  expiresIn: number = 3600
): Promise<string> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/stream/${videoId}/token`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + expiresIn,
      }),
    }
  )

  const data = await response.json()
  return data.result.token
}

// Get embed URL
export function getEmbedUrl(videoId: string): string {
  return `https://customer-${CF_ACCOUNT_ID}.cloudflarestream.com/${videoId}/iframe`
}

// Get HLS URL
export function getHlsUrl(videoId: string): string {
  return `https://customer-${CF_ACCOUNT_ID}.cloudflarestream.com/${videoId}/manifest/video.m3u8`
}

// Get thumbnail URL
export function getThumbnailUrl(
  videoId: string,
  options: { time?: string; width?: number; height?: number } = {}
): string {
  const params = new URLSearchParams()
  if (options.time) params.set('time', options.time)
  if (options.width) params.set('width', options.width.toString())
  if (options.height) params.set('height', options.height.toString())

  const query = params.toString()
  return `https://customer-${CF_ACCOUNT_ID}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg${query ? `?${query}` : ''}`
}
```

### Video Player Component
```typescript
// components/video/cloudflare-player.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Stream } from '@cloudflare/stream-react'

interface CloudflarePlayerProps {
  videoId: string
  poster?: string
  startTime?: number
  autoplay?: boolean
  onProgress?: (progress: { currentTime: number; duration: number }) => void
  onEnded?: () => void
  className?: string
}

export function CloudflarePlayer({
  videoId,
  poster,
  startTime = 0,
  autoplay = false,
  onProgress,
  onEnded,
  className,
}: CloudflarePlayerProps) {
  const streamRef = useRef<HTMLStreamElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stream = streamRef.current
    if (!stream || !isReady) return

    // Set start time
    if (startTime > 0) {
      stream.currentTime = startTime
    }

    // Progress tracking
    const handleTimeUpdate = () => {
      onProgress?.({
        currentTime: stream.currentTime,
        duration: stream.duration,
      })
    }

    // Completion tracking
    const handleEnded = () => {
      onEnded?.()
    }

    stream.addEventListener('timeupdate', handleTimeUpdate)
    stream.addEventListener('ended', handleEnded)

    return () => {
      stream.removeEventListener('timeupdate', handleTimeUpdate)
      stream.removeEventListener('ended', handleEnded)
    }
  }, [isReady, startTime, onProgress, onEnded])

  return (
    <div className={className}>
      <Stream
        ref={streamRef}
        src={videoId}
        poster={poster}
        autoplay={autoplay}
        controls
        responsive
        onLoadedMetaData={() => setIsReady(true)}
        className="w-full aspect-video rounded-lg"
      />
    </div>
  )
}
```

---

## YOUTUBE MIGRATION SCRIPT

```typescript
// scripts/migrate-youtube.ts
import { google } from 'googleapis'
import { createClient } from '@sanity/client'
import { getDirectUploadUrl, uploadFromUrl } from '../apps/web/src/lib/cloudflare/stream'

const youtube = google.youtube('v3')
const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2024-01-01',
})

interface YouTubeVideo {
  id: string
  title: string
  description: string
  publishedAt: string
  duration: string
  thumbnails: {
    high: { url: string }
  }
}

// Fetch all videos from YouTube channel
async function fetchYouTubeVideos(channelId: string): Promise<YouTubeVideo[]> {
  const videos: YouTubeVideo[] = []
  let pageToken: string | undefined

  do {
    const response = await youtube.search.list({
      key: process.env.YOUTUBE_API_KEY,
      channelId,
      part: ['snippet'],
      type: ['video'],
      maxResults: 50,
      pageToken,
    })

    const videoIds = response.data.items?.map((item) => item.id?.videoId).filter(Boolean) as string[]

    // Get video details (for duration)
    const detailsResponse = await youtube.videos.list({
      key: process.env.YOUTUBE_API_KEY,
      id: videoIds,
      part: ['snippet', 'contentDetails'],
    })

    for (const video of detailsResponse.data.items || []) {
      videos.push({
        id: video.id!,
        title: video.snippet?.title || '',
        description: video.snippet?.description || '',
        publishedAt: video.snippet?.publishedAt || '',
        duration: video.contentDetails?.duration || '',
        thumbnails: {
          high: { url: video.snippet?.thumbnails?.high?.url || '' },
        },
      })
    }

    pageToken = response.data.nextPageToken ?? undefined
  } while (pageToken)

  return videos
}

// Parse ISO 8601 duration to seconds
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)
  return hours * 3600 + minutes * 60 + seconds
}

// Extract scripture references from title/description (basic)
function extractScriptureRefs(text: string): string[] {
  const books = [
    'Genesis', 'Exodus', 'Leviticus', /* ... all books ... */ 'Revelation',
    'Gen', 'Ex', 'Lev', /* ... abbreviations ... */ 'Rev',
  ]
  const pattern = new RegExp(
    `(${books.join('|')})\\s*(\\d+)(?::(\\d+))?(?:-(\\d+)(?::(\\d+))?)?`,
    'gi'
  )
  const matches = text.match(pattern) || []
  return [...new Set(matches)]
}

// Main migration function
async function migrateVideos(options: {
  channelId: string
  skipCloudflareUpload?: boolean // Just create Sanity docs with YouTube IDs
  batchSize?: number
}) {
  const { channelId, skipCloudflareUpload = true, batchSize = 10 } = options

  console.log('Fetching YouTube videos...')
  const videos = await fetchYouTubeVideos(channelId)
  console.log(`Found ${videos.length} videos`)

  // Process in batches
  for (let i = 0; i < videos.length; i += batchSize) {
    const batch = videos.slice(i, i + batchSize)
    console.log(`Processing batch ${i / batchSize + 1}/${Math.ceil(videos.length / batchSize)}`)

    for (const video of batch) {
      try {
        // Check if already exists
        const existing = await sanity.fetch(
          `*[_type == "sermon" && video.youtubeId == $ytId][0]`,
          { ytId: video.id }
        )

        if (existing) {
          console.log(`Skipping ${video.title} - already exists`)
          continue
        }

        // Create Sanity document
        const sermonDoc = {
          _type: 'sermon',
          title: video.title,
          slug: {
            _type: 'slug',
            current: video.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .slice(0, 96),
          },
          date: video.publishedAt.split('T')[0],
          description: video.description,
          video: {
            youtubeId: video.id,
            duration: parseDuration(video.duration),
          },
          publishedAt: video.publishedAt,
        }

        // Optionally upload to Cloudflare Stream
        if (!skipCloudflareUpload) {
          console.log(`Uploading to Cloudflare: ${video.title}`)
          // Note: YouTube doesn't allow direct downloads, would need yt-dlp
          // For now, we keep YouTube IDs and migrate manually or via tool
        }

        await sanity.create(sermonDoc)
        console.log(`Created: ${video.title}`)

      } catch (error) {
        console.error(`Error processing ${video.title}:`, error)
      }
    }

    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  console.log('Migration complete!')
}

// Run migration
migrateVideos({
  channelId: 'UC_CHANNEL_ID_HERE', // @mbc.chicago channel ID
  skipCloudflareUpload: true, // Phase 1: just import metadata
})
```

---

## VIDEO MIGRATION STRATEGY

### Phase 1: Metadata Import (Week 1)
```
YouTube → Extract metadata → Create Sanity documents with YouTube embed IDs
- All 400+ videos indexed in Sanity
- Site launches with YouTube embeds
- Search works immediately
```

### Phase 2: Priority Content Migration (Weeks 2-4)
```
Identify top 50 most-viewed sermons → Download via yt-dlp → Upload to Cloudflare
- Premium viewing experience for popular content
- Hybrid player: Cloudflare if available, fallback to YouTube
```

### Phase 3: Full Migration (Ongoing)
```
Gradual migration of remaining content
- New sermons go directly to Cloudflare
- Old sermons migrated 10-20/week
- YouTube becomes secondary/archive
```

### Cost Projection
```
400 sermons × 1.5 hours avg = 600 hours of content = 36,000 minutes

Storage: ~2TB = $5/month (Cloudflare Stream includes storage)
Encoding: Included with Stream
Delivery: $1 per 1,000 minutes viewed

If 1,000 views/month × 30 min avg watch = 30,000 minutes = $30/month
If 5,000 views/month × 30 min avg watch = 150,000 minutes = $150/month
```

---

## APEX PROMPT FILES

### .claude/VISION.md
```markdown
# MARANATHA BIBLE CHURCH PLATFORM

## Mission
Build a world-class digital platform for Maranatha Bible Church that rivals GTY.org in functionality while maintaining simplicity and maintainability.

## Core Values
1. **Scripture-Centered**: Every feature serves Bible teaching ministry
2. **Platform Independence**: Own our content, not dependent on YouTube/Google
3. **Accessibility**: Works for all members regardless of technical ability
4. **Maintainability**: Non-developers can manage content

## Success Metrics
- 100% of sermons indexed and searchable
- <3 second page load times
- 99.9% uptime
- Zero reliance on YouTube for primary video hosting (within 6 months)

## Technical North Star
- Next.js 14 with App Router
- Sanity CMS for content
- Supabase for user data
- Cloudflare Stream for video
- Railway for hosting (predictable costs)
- Cloudflare for CDN/DNS/Images
```

### .claude/ROADMAP.md
```markdown
# BUILD ROADMAP

## Phase 1: Foundation [ACTIVE]
- [ ] Initialize monorepo with Turborepo
- [ ] Set up Next.js 14 app with TypeScript
- [ ] Configure Tailwind CSS with design system
- [ ] Set up Sanity Studio with schemas
- [ ] Configure Supabase project
- [ ] Set up Cloudflare Stream account

## Phase 2: Core Pages
- [ ] Homepage with hero, featured sermon, live indicator
- [ ] Sermon archive with grid/list views
- [ ] Individual sermon page with player
- [ ] Series listing and detail pages
- [ ] Speaker pages
- [ ] Scripture navigation (by Bible book)

## Phase 3: Video Infrastructure
- [ ] Cloudflare Stream integration
- [ ] Hybrid player (Cloudflare + YouTube fallback)
- [ ] YouTube metadata import script
- [ ] Watch history tracking
- [ ] Resume playback feature

## Phase 4: User Features
- [ ] Supabase auth integration
- [ ] User profiles
- [ ] Favorites/bookmarks
- [ ] Sermon notes
- [ ] Watch history

## Phase 5: Search & Discovery
- [ ] Full-text search with Postgres
- [ ] Topic-based browsing
- [ ] Series filtering
- [ ] Speaker filtering
- [ ] Date range filtering

## Phase 6: Additional Pages
- [ ] About section (beliefs, leadership, history)
- [ ] Connect section (events, groups, contact)
- [ ] Give page with Stripe
- [ ] Blog/devotionals
- [ ] Live stream page

## Phase 7: Polish & Launch
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Mobile testing
- [ ] Accessibility audit
- [ ] Analytics setup
- [ ] Launch!
```

---

## ENVIRONMENT VARIABLES

```bash
# .env.local (example)

# Site
NEXT_PUBLIC_SITE_URL=https://maranathabible.church
NEXT_PUBLIC_SITE_NAME="Maranatha Bible Church"

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cloudflare Stream
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_STREAM_TOKEN=xxx

# Cloudflare Images (for image optimization)
CLOUDFLARE_IMAGES_ACCOUNT_ID=xxx
CLOUDFLARE_IMAGES_TOKEN=xxx

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# YouTube (for migration)
YOUTUBE_API_KEY=AIza...

# OpenAI (for transcription)
OPENAI_API_KEY=sk-...

# Email (Resend)
RESEND_API_KEY=re_...

# ESV Bible API (optional)
ESV_API_KEY=...

# Railway (auto-injected in production)
# RAILWAY_ENVIRONMENT=production
# RAILWAY_GIT_COMMIT_SHA=abc123
# RAILWAY_PUBLIC_DOMAIN=maranatha-web.up.railway.app
```

---

## QUICK START COMMANDS

```bash
# Initialize project
pnpm create turbo@latest maranatha-platform --template with-tailwind

# Install dependencies
cd maranatha-platform
pnpm add next@14 react react-dom
pnpm add @sanity/client @sanity/image-url next-sanity
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs
pnpm add @cloudflare/stream-react
pnpm add @stripe/stripe-js stripe
pnpm add tailwindcss postcss autoprefixer
pnpm add -D typescript @types/react @types/node

# Initialize Sanity
pnpm create sanity@latest --project-name maranatha --dataset production

# Initialize Supabase
npx supabase init
npx supabase db push

# Run development
pnpm dev
```

---

## RAILWAY CONFIGURATION

### railway.toml
```toml
[build]
builder = "nixpacks"

[deploy]
healthcheckPath = "/api/health"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
numReplicas = 1

[service]
internalPort = 3000
```

### Dockerfile (Optional - for more control)
```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN corepack enable pnpm && pnpm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### next.config.js (Railway-optimized)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Required for Railway Docker deployment

  images: {
    // Use Cloudflare Images for optimization (Railway doesn't have built-in)
    loader: 'custom',
    loaderFile: './src/lib/cloudflare-image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net', // Cloudflare Images
      },
      {
        protocol: 'https',
        hostname: '*.cloudflarestream.com',
      },
    ],
  },

  // Reduce bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', '@sanity/ui'],
  },
}

module.exports = nextConfig
```

### Cloudflare Image Loader
```typescript
// src/lib/cloudflare-image-loader.ts
interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
}

export default function cloudflareImageLoader({
  src,
  width,
  quality = 75,
}: ImageLoaderProps): string {
  // If already a Cloudflare Images URL, add transformations
  if (src.includes('imagedelivery.net')) {
    return `${src}/w=${width},q=${quality}`
  }

  // For Sanity images, use their CDN with params
  if (src.includes('cdn.sanity.io')) {
    return `${src}?w=${width}&q=${quality}&auto=format`
  }

  // For other images, proxy through Cloudflare
  const params = new URLSearchParams({
    width: width.toString(),
    quality: quality.toString(),
    format: 'auto',
  })

  return `/api/image-proxy?${params}&url=${encodeURIComponent(src)}`
}
```

### Health Check Endpoint
```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.RAILWAY_GIT_COMMIT_SHA?.slice(0, 7) || 'local',
  })
}
```

---

## DEPLOYMENT CHECKLIST

- [ ] Railway project created
- [ ] GitHub repo connected to Railway
- [ ] Environment variables configured in Railway dashboard
- [ ] Custom domain added in Railway
- [ ] Cloudflare DNS configured (CNAME to Railway domain)
- [ ] Cloudflare proxy enabled (orange cloud)
- [ ] SSL mode set to "Full (strict)" in Cloudflare
- [ ] Sanity project deployed
- [ ] Supabase project in production mode
- [ ] Cloudflare Stream configured
- [ ] Cloudflare Images configured (for image optimization)
- [ ] Webhooks configured (Sanity → Railway, Stripe → API)
- [ ] Analytics configured (Plausible or Umami)
- [ ] Error tracking configured (Sentry)
- [ ] Railway auto-deploy on push enabled
- [ ] Backup strategy in place

---

## ESTIMATED COSTS (Monthly)

| Service | Starter | Growth | Scale |
|---------|---------|--------|-------|
| Railway | $5 | $10-15 | $20-30 |
| Cloudflare Images | $5 | $5 | $10 |
| Sanity | $0 | $15 | $99 |
| Supabase | $0 | $25 | $25 |
| Cloudflare Stream | - | $50-100 | $150-300 |
| Stripe | 2.9% + $0.30/txn | Same | Same |
| Domain | $15/year | Same | Same |
| **Total** | **~$60-110** | **~$120-175** | **~$320-470** |

### Railway Pricing Notes
- $5/mo base (Hobby plan) or usage-based (Pro)
- $0.000231/GB-hour for memory
- $0.000463/vCPU-hour for CPU
- Predictable: typical Next.js app runs $5-20/mo
- No surprise bandwidth bills (unlike Vercel)
```
