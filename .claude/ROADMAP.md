# MARANATHA PLATFORM - BUILD ROADMAP

## Current Status: PHASE 1 - Foundation

---

## PHASE 1: FOUNDATION [ACTIVE]

### 1.1 Project Initialization
- [ ] Create Turborepo monorepo structure
- [ ] Initialize Next.js 14 app with App Router
- [ ] Configure TypeScript with strict mode
- [ ] Set up Tailwind CSS with custom theme
- [ ] Install and configure shadcn/ui components
- [ ] Set up ESLint and Prettier
- [ ] Configure path aliases

### 1.2 Sanity CMS Setup
- [ ] Create Sanity project
- [ ] Initialize Sanity Studio in monorepo
- [ ] Create sermon schema
- [ ] Create series schema
- [ ] Create speaker schema
- [ ] Create scripture reference schema
- [ ] Create topic schema
- [ ] Create page schema (for static pages)
- [ ] Create site settings schema
- [ ] Configure Sanity client in Next.js
- [ ] Set up image URL builder

### 1.3 Supabase Setup
- [ ] Create Supabase project
- [ ] Design and create database schema
- [ ] Set up Row Level Security policies
- [ ] Configure auth providers (email, Google optional)
- [ ] Create Supabase client utilities
- [ ] Set up middleware for auth

### 1.4 Cloudflare Stream Setup
- [ ] Create Cloudflare account/Stream subscription
- [ ] Generate API tokens
- [ ] Create upload utilities
- [ ] Create player component wrapper
- [ ] Test video playback

### 1.5 Design System
- [ ] Define color palette based on church branding
- [ ] Configure typography scale
- [ ] Create spacing system
- [ ] Build header component
- [ ] Build footer component
- [ ] Build navigation (desktop)
- [ ] Build mobile navigation
- [ ] Create button variants
- [ ] Create card component
- [ ] Create form input components

---

## PHASE 2: CORE PAGES

### 2.1 Homepage
- [ ] Hero section with featured sermon
- [ ] Live stream indicator (when live)
- [ ] Recent sermons grid (3-6)
- [ ] Featured series section
- [ ] Quick links (Give, Events, Contact)
- [ ] Service times and location
- [ ] Newsletter signup

### 2.2 Sermon Archive
- [ ] Grid/list view toggle
- [ ] Pagination or infinite scroll
- [ ] Filter by series
- [ ] Filter by speaker
- [ ] Filter by date range
- [ ] Sort options (newest, oldest)
- [ ] Empty state handling

### 2.3 Individual Sermon Page
- [ ] Video player (full-width)
- [ ] Sermon title and date
- [ ] Speaker info with link
- [ ] Series info with link
- [ ] Scripture references
- [ ] Description/summary
- [ ] Related sermons
- [ ] Share buttons
- [ ] Download audio button
- [ ] Add to favorites (if logged in)

### 2.4 Series Pages
- [ ] Series listing page
- [ ] Individual series page
- [ ] Series image/artwork
- [ ] Episode list (chronological)
- [ ] Series description
- [ ] Primary scripture

### 2.5 Speaker Pages
- [ ] Speaker listing page
- [ ] Individual speaker page
- [ ] Speaker photo and bio
- [ ] All sermons by speaker

### 2.6 Scripture Navigation
- [ ] Bible book listing (OT/NT)
- [ ] Sermons by book page
- [ ] Chapter-level filtering (if data permits)

---

## PHASE 3: VIDEO INFRASTRUCTURE

### 3.1 YouTube Migration Script
- [ ] YouTube Data API integration
- [ ] Fetch all videos from channel
- [ ] Extract metadata (title, date, description)
- [ ] Parse scripture references from text
- [ ] Create Sanity documents with YouTube IDs
- [ ] Generate slug from title
- [ ] Map to series (manual or AI-assisted)
- [ ] Run initial migration

### 3.2 Hybrid Video Player
- [ ] Cloudflare Stream player component
- [ ] YouTube embed component
- [ ] Unified player wrapper (auto-selects source)
- [ ] Playback progress tracking
- [ ] Resume from last position
- [ ] Keyboard shortcuts

### 3.3 Cloudflare Upload Pipeline
- [ ] Admin upload interface in Sanity
- [ ] Direct upload from Studio
- [ ] Automatic thumbnail generation
- [ ] Duration extraction
- [ ] Upload progress indicator
- [ ] Error handling

### 3.4 Watch History
- [ ] Track progress on play
- [ ] Save progress on pause/close
- [ ] "Continue Watching" section
- [ ] Mark as complete at 90%+
- [ ] Sync across devices

---

## PHASE 4: USER FEATURES

### 4.1 Authentication
- [ ] Login page
- [ ] Registration page
- [ ] Forgot password flow
- [ ] Email verification
- [ ] Auth callback handling
- [ ] Protected route middleware
- [ ] Auth state management

### 4.2 User Profile
- [ ] Profile settings page
- [ ] Update name/email
- [ ] Change password
- [ ] Notification preferences
- [ ] Delete account

### 4.3 Favorites
- [ ] Add/remove from sermon page
- [ ] Favorites listing page
- [ ] Quick access from account

### 4.4 Sermon Notes
- [ ] Note editor on sermon page
- [ ] Timestamp linking
- [ ] Notes listing page
- [ ] Export notes (text/PDF)

---

## PHASE 5: SEARCH & DISCOVERY

### 5.1 Basic Search
- [ ] Search input in header
- [ ] Search results page
- [ ] Postgres full-text search function
- [ ] Highlight matching terms
- [ ] Filter results by type

### 5.2 Sanity → Supabase Sync
- [ ] Webhook for Sanity changes
- [ ] Update search index on publish
- [ ] Delete from index on unpublish

### 5.3 Advanced Filtering
- [ ] Topic-based browsing
- [ ] Combined filters (speaker + series)
- [ ] Date range picker
- [ ] Clear all filters

### 5.4 Search Index Enhancement
- [ ] Add transcripts to index
- [ ] Weight title/speaker higher
- [ ] Fuzzy matching
- [ ] "Did you mean?" suggestions

---

## PHASE 6: ADDITIONAL SECTIONS

### 6.1 About Section
- [ ] About overview page
- [ ] Beliefs/doctrine page
- [ ] Leadership page (staff grid)
- [ ] History page
- [ ] Visit/location page with map

### 6.2 Connect Section
- [ ] Events calendar page
- [ ] Individual event pages
- [ ] Small groups info
- [ ] Contact form
- [ ] Prayer request form

### 6.3 Give Page
- [ ] Stripe integration
- [ ] One-time giving
- [ ] Recurring giving setup
- [ ] Fund selection (General, Building, Missions)
- [ ] Giving history (for logged-in users)
- [ ] Tax receipt emails

### 6.4 Blog/Devotionals
- [ ] Blog listing page
- [ ] Blog post page
- [ ] Author attribution
- [ ] Categories/tags
- [ ] Devotional section
- [ ] Daily devotional display

### 6.5 Live Stream
- [ ] Live stream page
- [ ] YouTube Live embed
- [ ] "We're Live" indicator
- [ ] Schedule display
- [ ] Countdown to next service

---

## PHASE 7: PODCAST & DISTRIBUTION

### 7.1 Podcast Feed
- [ ] RSS feed generation endpoint
- [ ] iTunes-compatible metadata
- [ ] Episode enclosures (audio files)
- [ ] Submit to Apple Podcasts
- [ ] Submit to Spotify
- [ ] Podcast links on site

### 7.2 Social Sharing
- [ ] Open Graph meta tags
- [ ] Twitter cards
- [ ] Share buttons (native share API)
- [ ] Sermon clip generator (future)

---

## PHASE 8: POLISH & OPTIMIZATION

### 8.1 Performance
- [ ] Image optimization (next/image)
- [ ] Lazy loading for off-screen content
- [ ] Code splitting analysis
- [ ] Bundle size optimization
- [ ] Caching strategy review
- [ ] Core Web Vitals audit

### 8.2 SEO
- [ ] Sitemap generation
- [ ] robots.txt configuration
- [ ] Schema.org markup (VideoObject, Church)
- [ ] Meta descriptions for all pages
- [ ] Canonical URLs
- [ ] Structured data testing

### 8.3 Accessibility
- [ ] Keyboard navigation audit
- [ ] Screen reader testing
- [ ] Color contrast check
- [ ] Alt text for images
- [ ] Form label associations
- [ ] Focus indicators

### 8.4 Mobile Polish
- [ ] Touch target sizes
- [ ] Swipe gestures (optional)
- [ ] Mobile video UX
- [ ] Bottom navigation (optional)
- [ ] PWA manifest
- [ ] App icon

---

## PHASE 9: LAUNCH & MONITORING

### 9.1 Pre-Launch
- [ ] Content review with church staff
- [ ] Final design review
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Load testing
- [ ] Security audit
- [ ] Backup strategy verification

### 9.2 Launch
- [ ] Domain DNS migration
- [ ] SSL verification
- [ ] Production environment variables
- [ ] Monitoring setup (Vercel Analytics)
- [ ] Error tracking (Sentry)
- [ ] Go live!

### 9.3 Post-Launch
- [ ] Monitor error rates
- [ ] Track Core Web Vitals
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Document admin procedures
- [ ] Train church staff on Sanity

---

## FUTURE ENHANCEMENTS (Post-Launch)

### Content Enhancements
- [ ] AI-generated transcripts (OpenAI Whisper)
- [ ] Study guides per sermon
- [ ] Discussion questions
- [ ] ESV Bible API integration
- [ ] Inline scripture display

### User Features
- [ ] Reading plans
- [ ] Sermon playlists
- [ ] Note sharing (optional)
- [ ] Email notifications for new sermons

### Technical Improvements
- [ ] Algolia search (if Postgres insufficient)
- [ ] React Native mobile app
- [ ] Offline sermon downloads
- [ ] Multi-language support (Arabic)
- [ ] Admin analytics dashboard

---

## BLOCKED / NEEDS DECISION

- [ ] **Domain**: Is maranathabible.church available/desired?
- [ ] **Branding**: Need logo, colors, fonts from church
- [ ] **Content**: Who will write About/Beliefs pages?
- [ ] **Audio**: Do we have separate audio files or extract from video?
- [ ] **YouTube channel ID**: Need exact channel URL for migration script
