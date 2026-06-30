import type { Metadata } from 'next'
import ParceriasContent from './ParceriasContent'

export const metadata: Metadata = {
  alternates: { canonical: '/parcerias' },
  title: 'Programa de Parceiros — Ganha 10% | Element Group',
  description:
    'Recomenda a Element Group e ganha 10% por cada projeto fechado. Programa simples, transparente e sem limites para profissionais com rede de PMEs.',
  keywords: ['programa parceiros agência digital', 'ganhar comissão referência', 'parceiro marketing digital Portugal', 'Element Group parceiros'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Programa de Parceiros — Ganha 10% | Element Group',
    description: 'Recomenda a Element Group e ganha 10% por cada projeto fechado. Simples, transparente e sem limites.',
    url: '/parcerias',
    locale: 'pt_PT',
    siteName: 'Element Group',
    images: [{ url: '/og/10-parcerias.png', width: 1200, height: 630, alt: 'Programa de Parceiros Element Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programa de Parceiros — Ganha 10% | Element Group',
    description: 'Recomenda a Element Group e ganha 10% por cada projeto fechado.',
    images: ['/og/10-parcerias.png'],
  },
}

export default function ParceriasPage() {
  return <ParceriasContent />
}
