import type { Metadata } from 'next'
import { LegalShell, H2, P } from '@/components/legal/LegalShell'
import { COMPANY, LEGAL_LINKS } from '@/lib/company'

export const metadata: Metadata = {
  alternates: { canonical: '/resolucao-de-litigios' },
  title: 'Resolução de Litígios — Element Group',
  description: 'Informação sobre resolução alternativa de litígios de consumo (RAL), Livro de Reclamações e plataforma europeia ODR da Element Group.',
  robots: { index: true, follow: false },
}

export default function ResolucaoLitigiosPage() {
  return (
    <LegalShell title="Resolução de Litígios" updated="junho de 2026">
      <H2>1. Livro de Reclamações</H2>
      <P>
        Nos termos da lei, está disponível o Livro de Reclamações eletrónico, onde pode apresentar qualquer
        reclamação relativa aos serviços prestados pela {COMPANY.tradeName} ({COMPANY.legalName}, NIF {COMPANY.nif}):{' '}
        <a href={LEGAL_LINKS.livroReclamacoes} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">livroreclamacoes.pt</a>.
      </P>

      <H2>2. Resolução alternativa de litígios (RAL)</H2>
      <P>
        Em caso de litígio de consumo, o consumidor pode recorrer a uma entidade de resolução alternativa de
        litígios. Entidade de competência residual: <strong className="text-white/90">CNIACC — Centro Nacional
        de Informação e Arbitragem de Conflitos de Consumo</strong> ({' '}
        <a href={LEGAL_LINKS.cniacc} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">cniacc.pt</a>).
      </P>

      <H2>3. Plataforma Europeia ODR</H2>
      <P>
        Está também disponível a Plataforma Europeia de Resolução de Litígios em Linha (ODR):{' '}
        <a href={LEGAL_LINKS.odr} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">ec.europa.eu/consumers/odr</a>.
        Mais informações sobre os seus direitos enquanto consumidor em{' '}
        <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">consumidor.gov.pt</a>.
      </P>

      <H2>4. Contacto direto</H2>
      <P>
        Antes de recorrer a estas vias, pode contactar-nos diretamente para que procuremos resolver a situação
        de forma rápida e amigável.
        <br />Email: {COMPANY.email}
        <br />Telefone: {COMPANY.phone} ({COMPANY.phoneCost})
      </P>
    </LegalShell>
  )
}
