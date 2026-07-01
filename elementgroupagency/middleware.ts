import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Per-request nonce for CSP script-src — lets us drop 'unsafe-inline' for
// scripts (the main XSS-relevant directive) while 'strict-dynamic' keeps
// Next.js's own runtime-injected chunks trusted without per-chunk nonces.
// style-src keeps 'unsafe-inline': inline style="" attributes (used all over
// the UI) aren't covered by CSP nonces, only by 'unsafe-inline'/'unsafe-hashes'.
export function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID().replace(/-/g, '')

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com",
    "frame-src https://www.openstreetmap.org https://challenges.cloudflare.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', csp)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
  return response
}

export const config = {
  matcher: [
    // Run on everything except static assets and image optimization requests.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
