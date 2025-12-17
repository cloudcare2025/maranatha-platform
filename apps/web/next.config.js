/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Railway Docker deployment
  output: 'standalone',

  images: {
    // Use Cloudflare Images for optimization
    loader: 'custom',
    loaderFile: './src/lib/cloudflare-image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
      },
      {
        protocol: 'https',
        hostname: '*.cloudflarestream.com',
      },
    ],
  },

  // Reduce bundle size
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://maranathabiblechurch.net',
  },
}

module.exports = nextConfig
