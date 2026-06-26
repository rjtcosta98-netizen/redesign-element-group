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
  // Home: keyword principal "agência de marketing digital" no title.
  title: 'Agência de Marketing Digital para PMEs — Element Group',
  description:
    'Agência de marketing digital em Portugal: criação de websites e lojas online, SEO, redes sociais e planos mensais para PMEs. Ultra-rápidos (PageSpeed 95+), a partir de 297€. 5,0 ★ no Google.',
  alternates: { canonical: '/' },
}

export default async function Home() {
  const reviews = await getReviews()
  return (
    <main>
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
