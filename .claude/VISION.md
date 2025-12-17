# MARANATHA BIBLE CHURCH DIGITAL PLATFORM

## Mission Statement
Build a world-class digital ministry platform for Maranatha Bible Church that serves as the primary home for sermon content, community connection, and spiritual resources - fully independent of third-party platforms.

## Platform Philosophy
**"Proclaiming God's Unchanging Word in an Increasingly Unstable World"**

This platform exists to:
1. Make every sermon from Maranatha Bible Church accessible, searchable, and discoverable
2. Provide a distraction-free, ad-free viewing experience for members and seekers
3. Own our content destiny - no dependence on YouTube's policies or algorithms
4. Enable deep Bible study through scripture-based navigation
5. Build lasting digital infrastructure that serves the church for decades

## Target Users

### Primary: Church Members
- Access sermons from any device, anywhere
- Resume watching from where they left off
- Save favorites and take timestamped notes
- Receive notifications for new content

### Secondary: Seekers & Visitors
- Discover the church through sermon content
- Learn about beliefs before visiting
- Find service times and location easily
- Submit prayer requests

### Tertiary: Arabic-Speaking Community
- Access Arabic ministry content
- Language-appropriate interface options

## Competitive Reference: GTY.org
We are inspired by Grace to You's platform:
- Comprehensive sermon archive with multiple browse paths
- Scripture-based navigation (browse by Bible book)
- Series organization
- Speaker profiles
- Daily devotionals
- Clean, focused design

**Key Difference:** GTY.org is backed by a global ministry with millions in resources. We build for sustainability at church scale.

## Technical North Star

```
┌─────────────────────────────────────────────────────┐
│                 STACK DECISIONS                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  FRONTEND:     Next.js 14 (App Router)              │
│  WHY:          SSR/SSG for SEO, React ecosystem,    │
│                great DX, standalone Docker output   │
│                                                      │
│  CMS:          Sanity.io                            │
│  WHY:          Real-time, flexible schemas,         │
│                excellent editing UX, GROQ queries   │
│                                                      │
│  DATABASE:     Supabase (PostgreSQL)                │
│  WHY:          Auth included, RLS for security,     │
│                real-time subscriptions, free tier   │
│                                                      │
│  VIDEO:        Cloudflare Stream                    │
│  WHY:          No YouTube branding, $1/1000 views,  │
│                HLS/DASH delivery, analytics         │
│                                                      │
│  HOSTING:      Railway                              │
│  WHY:          Predictable pricing, Docker support, │
│                GitHub integration, auto-deploy      │
│                                                      │
│  CDN/DNS:      Cloudflare                           │
│  WHY:          DDoS protection, caching, SSL,       │
│                Images API for optimization          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Success Metrics

### Launch Criteria (MVP)
- [ ] 100% of existing sermons indexed in Sanity
- [ ] Sermon archive browsable by date, series, speaker, scripture
- [ ] Video player works (YouTube embeds initially OK)
- [ ] Mobile responsive
- [ ] Page load < 3 seconds
- [ ] Give page functional

### 90-Day Post-Launch
- [ ] 50+ sermons migrated to Cloudflare Stream
- [ ] User accounts functional
- [ ] Watch history and favorites working
- [ ] Full-text search including descriptions
- [ ] Podcast feed live on Apple/Spotify

### 6-Month Goals
- [ ] 100% of sermons on Cloudflare Stream (YouTube independence)
- [ ] AI transcripts for all sermons
- [ ] Transcript search functional
- [ ] Mobile app (if usage justifies)

## Non-Goals (Explicitly Out of Scope)
- E-commerce / bookstore (not needed)
- Online courses with certificates (too complex)
- Social features / comments (moderation burden)
- Multi-site / multi-church (this is for MBC only)
- Live chat during services (use YouTube for this)

## Content Types

### Sermon (Primary)
- Video (Cloudflare Stream)
- Audio (for podcast)
- Transcript (AI-generated)
- Scripture references
- Series association
- Speaker
- Topics/tags
- Date
- Study guide (optional PDF)

### Series
- Title, description, image
- Scripture focus (e.g., "Romans")
- Date range
- Associated sermons

### Speaker
- Name, photo, bio
- Role (Pastor, Elder, Guest)
- Associated sermons

### Blog Post
- Author
- Categories
- Featured image
- Rich text body

### Devotional
- Daily readings
- Scripture passage
- Brief reflection

### Event
- Title, description
- Date/time
- Location
- Registration link (if needed)

### Page (Static)
- About, Beliefs, Leadership, Visit, Contact

## Architecture Principles

1. **Content-First**: Sanity holds all content; frontend is statically generated where possible
2. **Progressive Enhancement**: Works without JS, enhanced with JS
3. **Mobile-First**: Design for phones, scale up to desktop
4. **Performance Budget**: <100KB JS bundle (excluding video player)
5. **Accessibility**: WCAG 2.1 AA compliance
6. **SEO-Optimized**: Schema.org markup for sermons, proper meta tags
7. **Offline-Ready**: PWA capabilities for sermon audio

## URL Structure

```
/                           # Homepage
/sermons                    # Sermon archive
/sermons/[slug]             # Individual sermon
/sermons/series/[slug]      # Series page
/sermons/speaker/[slug]     # Speaker's sermons
/sermons/book/[book]        # Sermons by Bible book
/sermons/topic/[topic]      # Sermons by topic
/watch                      # Live stream hub
/watch/live                 # Active live stream
/listen                     # Podcast/audio section
/read                       # Blog & devotionals
/read/blog                  # Blog listing
/read/blog/[slug]           # Blog post
/read/devotionals           # Daily devotionals
/about                      # About overview
/about/beliefs              # Statement of faith
/about/leadership           # Staff & elders
/about/history              # Church history
/about/visit                # Plan your visit
/connect                    # Get connected
/connect/events             # Events calendar
/connect/groups             # Small groups
/connect/prayer             # Prayer requests
/give                       # Online giving
/account                    # User dashboard
/account/favorites          # Saved sermons
/account/history            # Watch history
/account/notes              # Sermon notes
```

## Brand Guidelines

### Colors (TBD - extract from current site)
- Primary: Deep blue or burgundy (church colors)
- Secondary: Gold or cream accent
- Background: White/off-white
- Text: Near-black

### Typography
- Headings: Serif (classic, biblical feel)
- Body: Clean sans-serif (Lato, Inter, or similar)

### Imagery
- Hero images from church life
- Series artwork
- Speaker headshots
- Avoid generic stock photos

## Security Considerations
- All user data in Supabase with RLS
- No PII in Sanity (public CMS)
- Stripe handles all payment data
- Rate limiting on forms
- CAPTCHA on public forms
- CSP headers configured

## Maintenance Model
- Pastor/staff can add sermons via Sanity Studio
- No code changes needed for content updates
- Automatic deployments on content publish
- Weekly analytics review
- Monthly security updates
