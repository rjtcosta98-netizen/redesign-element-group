import type { Metadata } from 'next'
import { getReviews } from '@/lib/reviews'
import Hero           from '@/components/sections/Hero'
import LogoTicker     from '@/components/sections/LogoTicker'
import FeatureStack   from '@/components/sections/FeatureStack'
import HowItWorks     from '@/components/sections/HowItWorks'
import Portfolio      from '@/components/sections/Portfolio'
import WhyUs          from '@/components/sections/WhyUs'
import Testimonials   from '@/components/sections/Testimonials'
import FAQ            from '@/components/sections/FAQ'
import FinalCTA       from '@/components/sections/FinalCTA'

export const metadata: Metadata = {
  title: 'Agência de Marketing Digital para PMEs — Element Group',
  description:
    'Agência de marketing digital em Portugal para PMEs: websites, lojas online, SEO e redes sociais. Resultados reais, preços transparentes. Seia, Serra da Estrela.',
  keywords: ['agência de marketing digital Portugal', 'criação de websites PME', 'SEO Portugal', 'gestão redes sociais PME', 'lojas online Portugal', 'Element Group'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    images: [{ url: '/og/01-home.png', width: 1200, height: 630, alt: 'Element Group — Websites & Marketing Digital para PMEs' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/01-home.png'],
  },
}

// Avisa o browser para pré-carregar a imagem LCP antes do JS hidratar
// (o Hero é 'use client', por isso o preload não é emitido automaticamente).
export const revalidate = 3600

export default async function Home() {
  const reviews = await getReviews()
  return (
    <main>
      {/* Preload explícito: o Hero é 'use client', o Next.js não emite
          <link rel="preload"> server-side automaticamente para imagens de Client Components. */}
      <link rel="preload" as="image" href="/photorealistic-earth-planet.jpg" fetchPriority="high" />
      <Hero />
      <LogoTicker />
      <FeatureStack />
      <HowItWorks />
      <Portfolio />
      <WhyUs />
      <Testimonials reviews={reviews} />
      <FAQ />
      <FinalCTA />
    </main>
  )
}
