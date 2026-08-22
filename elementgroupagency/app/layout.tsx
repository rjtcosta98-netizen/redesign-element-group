import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter_Tight, Instrument_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import WhatsAppFab from '@/components/WhatsAppFab'
import MobileCtaBar from '@/components/ui/MobileCtaBar'
import ServiceSubNav from '@/components/servicos/ServiceSubNav'
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
// Descrição herdada por todas as páginas sem metadata própria — por isso as duas
// âncoras que o catálogo mandou remover ("um terço do preço" e "a partir de 297 €")
// estavam a ser servidas em todo o site, e não só na home.
const DEFAULT_DESC =
  'Websites à medida, lojas online, SEO e sistemas com IA para PMEs em Portugal. Sites que carregam em menos de 1 segundo e aparecem no Google — e no ChatGPT.'

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
    // O Google só aceita favicons quadrados em múltiplos de 48px e serve-se do
    // primeiro rel="icon" declarado. O favicon.ico é multi-tamanho e a primeira
    // entrada dele é 16x16, pelo que era rejeitado — daí o globo genérico na SERP.
    // Os PNG (96/192/512) vêm primeiro; o .ico fica só como fallback legado.
    icon: [
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/web-app-manifest-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/web-app-manifest-512x512.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: '48x48 32x32 16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
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
  // Nonce do CSP (definido no middleware) — sem ele o 'strict-dynamic' bloqueia
  // os scripts do gtag.
  const nonce = headers().get('x-nonce') ?? undefined
  return (
    <html lang="pt-PT" className={`${interTight.variable} ${instrumentSans.variable}`}>
      <body className="bg-bg text-white font-body antialiased">
        {/* Google tag (gtag.js) — GA4 com Consent Mode v2. Server-rendered para
            garantir que está no HTML e dispara o pageview. Consentimento arranca
            em 'denied'; o componente GoogleAnalytics atualiza no aceite. */}
        <script
          async
          nonce={nonce}
          src="https://www.googletagmanager.com/gtag/js?id=G-RNWM2MQTRT"
        />
        <script
          id="gtag-init"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                analytics_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
              gtag('config', 'G-RNWM2MQTRT');
            `,
          }}
        />
        <GoogleAnalytics />
        <JsonLd data={organizationGraph()} />
        <Nav />
        {children}
        <Footer />
        <WhatsAppFab />
        <MobileCtaBar />
        <ServiceSubNav />
        <CookieConsent />
      </body>
    </html>
  )
}
