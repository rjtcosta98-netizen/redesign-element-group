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
import JsonLd         from '@/components/JsonLd'
import { FAQS }       from '@/lib/faq-home'

export const metadata: Metadata = {
  title: 'Agência de Marketing Digital para PMEs — Element Group',
  description:
    'Agência de marketing digital em Portugal para PMEs: websites, lojas online, SEO e redes sociais. Resultados reais, preços transparentes. Seia, Serra da Estrela.',
  keywords: ['agência de marketing digital Portugal', 'criação de websites PME', 'SEO Portugal', 'gestão redes sociais PME', 'lojas online Portugal', 'Element Group'],
  alternates: { canonical: '/' },
}

export default async function Home() {
  const reviews = await getReviews()
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <main>
      <JsonLd data={faqSchema} />
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
