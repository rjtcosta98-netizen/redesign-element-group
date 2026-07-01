/** @type {import('next').NextConfig} */

// Content-Security-Policy is set per-request by middleware.ts (nonce-based
// script-src) rather than here, since a static header can't carry a nonce.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
]

// Headers are resolved once at build time, so this timestamp is fixed per
// deploy — exactly what Last-Modified should represent for statically
// rendered pages (OpenNext's Cloudflare "dummy" incrementalCache never
// populates Next's own Last-Modified, so every response was missing a
// freshness validator entirely).
const revalidationHeaders = [
  { key: 'Last-Modified', value: new Date().toUTCString() },
]

const htmlCacheHeaders = [
  { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
]

const staticCacheHeaders = [
  { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
]

// Public folder assets have no content hash — cache 7 days, stale 30 days.
const publicAssetCacheHeaders = [
  { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=2592000' },
]

const nextConfig = {
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/(.*)', headers: revalidationHeaders },
      // HTML pages: Cloudflare caches 1h, browsers revalidate every visit,
      // stale content served for up to 24h while revalidating in background.
      { source: '/((?!api/).*)', headers: htmlCacheHeaders },
      // Next.js static assets are content-hashed — safe to cache forever.
      { source: '/_next/static/(.*)', headers: staticCacheHeaders },
      // Public folder images/fonts — no hash, so a shorter but real max-age.
      // This rule comes last so it overrides the max-age=0 from htmlCacheHeaders.
      {
        source: '/(.*\\.(?:jpg|jpeg|png|gif|webp|avif|svg|ico|woff2?))',
        headers: publicAssetCacheHeaders,
      },
    ]
  },
  async redirects() {
    return [
      { source: '/servicos', destination: '/servicos/web', permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'dynamic-media-cdn.tripadvisor.com' },
    ],
  },
}

export default nextConfig
