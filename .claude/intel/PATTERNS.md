# PATTERNS - Established Conventions

## Overview
This document captures patterns that work well for this project. When implementing new features, follow these patterns for consistency.

---

## Data Fetching Patterns

### Server Components (Sanity)
```typescript
// Always use typed queries with proper error handling
import { sanityFetch } from '@/lib/sanity/client'
import { type Sermon } from '@/types/sermon'

// Query with params
export async function getSermons(options: GetSermonsOptions) {
  return sanityFetch<Sermon[]>({
    query: sermonsQuery,
    params: {
      limit: options.limit ?? 12,
      offset: options.offset ?? 0,
      ...options.filters,
    },
    tags: ['sermons'], // For revalidation
  })
}
```

### Client Components (Supabase)
```typescript
// Use React Query for client-side data
import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

export function useFavorites(userId: string) {
  const supabase = createClient()

  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('sermon_id')
        .eq('user_id', userId)

      if (error) throw error
      return data
    },
    enabled: !!userId,
  })
}
```

---

## Component Patterns

### Page Components
```typescript
// apps/web/src/app/[route]/page.tsx
import { Suspense } from 'react'
import { type Metadata } from 'next'

// Static metadata or generateMetadata for dynamic
export const metadata: Metadata = {
  title: 'Page Title | Maranatha Bible Church',
  description: 'Page description',
}

// Server component by default
export default async function Page() {
  const data = await fetchData()

  return (
    <main>
      <Suspense fallback={<LoadingSkeleton />}>
        <Content data={data} />
      </Suspense>
    </main>
  )
}
```

### UI Components
```typescript
// apps/web/src/components/[feature]/[component].tsx
import { cn } from '@/lib/utils'
import { type ComponentProps } from 'react'

interface ComponentNameProps extends ComponentProps<'div'> {
  variant?: 'default' | 'alt'
  // Additional props
}

export function ComponentName({
  variant = 'default',
  className,
  children,
  ...props
}: ComponentNameProps) {
  return (
    <div
      className={cn(
        // Base styles
        'base-classes',
        // Variant styles
        variant === 'alt' && 'alt-classes',
        // Allow override
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

---

## Styling Patterns

### Tailwind Organization
```typescript
// Order: layout → sizing → spacing → colors → typography → effects → states
className={cn(
  // Layout
  'flex flex-col',
  // Sizing
  'w-full max-w-md',
  // Spacing
  'p-4 gap-2',
  // Colors
  'bg-white dark:bg-gray-900',
  // Typography
  'text-sm font-medium',
  // Effects
  'shadow-sm rounded-lg',
  // States
  'hover:shadow-md transition-shadow'
)}
```

### Responsive Patterns
```typescript
// Mobile-first, progressive enhancement
<div className="
  grid grid-cols-1      // Mobile: 1 column
  sm:grid-cols-2        // Tablet: 2 columns
  lg:grid-cols-3        // Desktop: 3 columns
  gap-4 sm:gap-6        // Responsive gaps
">
```

---

## Error Handling Patterns

### API Routes
```typescript
export async function GET(request: NextRequest) {
  try {
    // Logic here
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Route error:', error)

    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Page Error Boundaries
```typescript
// apps/web/src/app/[route]/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <button onClick={reset} className="mt-4 btn-primary">
        Try again
      </button>
    </div>
  )
}
```

---

## File Organization Patterns

### Feature-Based Structure
```
components/
├── sermon/           # Sermon-related components
│   ├── index.ts      # Barrel export
│   ├── sermon-card.tsx
│   ├── sermon-grid.tsx
│   └── sermon-player.tsx
├── video/            # Video components
│   ├── index.ts
│   ├── cloudflare-player.tsx
│   └── youtube-embed.tsx
└── ui/               # Generic UI components
    ├── button.tsx
    ├── card.tsx
    └── ...
```

### Barrel Exports
```typescript
// components/sermon/index.ts
export { SermonCard } from './sermon-card'
export { SermonGrid } from './sermon-grid'
export { SermonPlayer } from './sermon-player'

// Usage
import { SermonCard, SermonGrid } from '@/components/sermon'
```

---

## Testing Patterns

### Component Testing
```typescript
// [component].test.tsx
import { render, screen } from '@testing-library/react'
import { SermonCard } from './sermon-card'

const mockSermon = {
  title: 'Test Sermon',
  slug: 'test-sermon',
  date: '2024-01-01',
  speaker: { name: 'Test Speaker' },
}

describe('SermonCard', () => {
  it('renders sermon title', () => {
    render(<SermonCard sermon={mockSermon} />)
    expect(screen.getByText('Test Sermon')).toBeInTheDocument()
  })
})
```

---

## Naming Conventions

### Files
- Components: `kebab-case.tsx` (sermon-card.tsx)
- Utilities: `kebab-case.ts` (format-date.ts)
- Types: `kebab-case.ts` (sermon.ts)
- Tests: `[name].test.tsx`

### Variables
- Components: PascalCase (SermonCard)
- Functions: camelCase (getSermons)
- Constants: SCREAMING_SNAKE_CASE (API_URL)
- Types/Interfaces: PascalCase (Sermon, SermonCardProps)

### Routes
- kebab-case: `/sermons/book/1-corinthians`
- Dynamic: `[slug]`, `[id]`
- Groups: `(public)`, `(auth)`, `(account)`

---

## Performance Patterns

### Image Optimization
```typescript
import Image from 'next/image'

// Always use next/image for optimization
<Image
  src={sermon.thumbnail}
  alt={sermon.title}
  width={640}
  height={360}
  className="object-cover"
  priority={isAboveFold}
/>
```

### Code Splitting
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <Skeleton />,
  ssr: false, // If client-only
})
```

---

## Anti-Patterns to Avoid

### Don't Do This
```typescript
// ❌ Using any
const data: any = await fetch()

// ❌ Inline styles
<div style={{ padding: '16px' }}>

// ❌ Missing error handling
const sermon = await getSermon(id)
return <div>{sermon.title}</div>

// ❌ Client components when server works
'use client'
export function StaticContent() { // No interactivity needed
  return <div>Static text</div>
}
```

### Do This Instead
```typescript
// ✅ Proper typing
const data: Sermon[] = await fetch()

// ✅ Tailwind classes
<div className="p-4">

// ✅ Error handling
const sermon = await getSermon(id)
if (!sermon) notFound()
return <div>{sermon.title}</div>

// ✅ Server component (default)
export function StaticContent() {
  return <div>Static text</div>
}
```
