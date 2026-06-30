import type { Metadata } from 'next'
import { Inter_Tight, Instrument_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import WhatsAppFab from '@/components/WhatsAppFab'
import JsonLd from '@/components/JsonLd'
import { SITE, organizationGraph } from '@/lib/seo'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
})
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-instrument',
})

const DEFAULT_TITLE = 'Element Group — Websites & Marketing Digital para PMEs'
const DEFAULT_DESC =
  'Websites à medida, lojas online, SEO e marketing para PMEs em Portugal. Ultra-rápidos (PageSpeed 95+) e por um terço do preço de uma agência. A partir de 297€.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESC,
  applicationName: SITE.name,
  authors: [{ name: 'Ricardo Jorge', url: `${SITE.url}/sobre` }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: true, email: true, address: true },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/web-app-manifest-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/web-app-manifest-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    siteName: SITE.name,
    url: SITE.url,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [{ url: '/og/01-home.png', width: 1200, height: 630, alt: 'Element Group — Websites & Marketing Digital para PMEs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ['/og/01-home.png'],
  },
  alternates: { languages: { 'pt-PT': 'https://elementgroup.pt', 'x-default': 'https://elementgroup.pt' } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${interTight.variable} ${instrumentSans.variable}`}>
      <body className="bg-bg text-white font-body antialiased">
        <JsonLd data={organizationGraph()} />
        <Nav />
        {children}
        <Footer />
        <WhatsAppFab />
        <CookieConsent />
      </body>
    </html>
  )
}
