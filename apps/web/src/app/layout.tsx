import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: {
    default: 'Maranatha Bible Church',
    template: '%s | Maranatha Bible Church',
  },
  description: 'Proclaiming God\'s Unchanging Word in an Increasingly Unstable World',
  keywords: ['church', 'bible', 'chicago', 'sermons', 'worship'],
  authors: [{ name: 'Maranatha Bible Church' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://maranathabiblechurch.net',
    siteName: 'Maranatha Bible Church',
    title: 'Maranatha Bible Church',
    description: 'Proclaiming God\'s Unchanging Word in an Increasingly Unstable World',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maranatha Bible Church',
    description: 'Proclaiming God\'s Unchanging Word in an Increasingly Unstable World',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
