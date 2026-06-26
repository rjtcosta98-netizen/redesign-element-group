import type { Metadata } from 'next'
import ParceriasContent from './ParceriasContent'

export const metadata: Metadata = {
  alternates: { canonical: '/parcerias' },
  title: 'Programa de Parceiros — Ganha 10% | Element Group',
  description:
    'Recomenda a Element Group e ganha 10% do valor de cada projeto que fechar. Programa de parceiros simples, transparente e sem limites para profissionais com rede de PMEs.',
}

export default function ParceriasPage() {
  return <ParceriasContent />
}
