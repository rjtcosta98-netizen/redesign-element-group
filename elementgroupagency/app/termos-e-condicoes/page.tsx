import type { Metadata } from 'next'
import { LegalShell, H2, P } from '@/components/legal/LegalShell'
import { COMPANY, LEGAL_LINKS } from '@/lib/company'

export const metadata: Metadata = {
  alternates: { canonical: '/termos-e-condicoes' },
  title: 'Termos e Condições — Element Group',
  description: 'Termos e condições de utilização do site e de prestação de serviços da Element Group.',
  robots: { index: false, follow: false },
}

export default function TermosPage() {
  return (
    <LegalShell title="Termos e Condições" updated="junho de 2026">
      <H2>1. Identificação</H2>
      <P>
        O presente site e os serviços nele apresentados são prestados por {COMPANY.legalName}
        ({COMPANY.status}), que opera sob a marca {COMPANY.tradeName}.
        <br />NIF: {COMPANY.nif}
        <br />Morada: {COMPANY.address}, {COMPANY.postalCity}
        <br />Email: {COMPANY.email}
        <br />Telefone: {COMPANY.phone} ({COMPANY.phoneCost})
      </P>

      <H2>2. Objeto</H2>
      <P>
        A {COMPANY.tradeName} presta serviços de criação de websites e lojas online, SEO, gestão de redes
        sociais, conteúdo e planos mensais de manutenção e marketing digital, destinados sobretudo a pequenas
        e médias empresas.
      </P>

      <H2>3. Orçamentos e preços</H2>
      <P>
        Os preços apresentados no site são indicativos e servem de ponto de partida. Cada projeto é objeto de
        uma proposta/orçamento específico, com o preço fixo acordado antes do início dos trabalhos. Salvo
        indicação em contrário, aos valores acresce IVA à taxa legal em vigor, quando aplicável.
      </P>

      <H2>4. Contratação e pagamentos</H2>
      <P>
        A prestação de serviços inicia-se após a aprovação da proposta pelo cliente. As condições de pagamento
        (valores, faseamento e prazos) são definidas em cada proposta. Os planos mensais são serviços
        recorrentes, sem fidelização, podendo ser cancelados nos termos acordados.
      </P>

      <H2>5. Propriedade intelectual</H2>
      <P>
        Os conteúdos do site (textos, imagens, marca e elementos gráficos) são propriedade da {COMPANY.tradeName}
        ou usados sob licença, não podendo ser reproduzidos sem autorização. Após pagamento integral, o cliente
        passa a ser titular do website e do respetivo domínio, nos termos definidos na proposta.
      </P>

      <H2>6. Responsabilidade</H2>
      <P>
        Esforçamo-nos por garantir a exatidão e disponibilidade do site, mas não podemos garantir a ausência
        total de erros ou interrupções. A {COMPANY.tradeName} não se responsabiliza por danos resultantes do
        uso indevido do site ou de fatores externos fora do seu controlo.
      </P>

      <H2>7. Proteção de dados</H2>
      <P>
        O tratamento de dados pessoais rege-se pela nossa{' '}
        <a href="/politica-de-privacidade" className="text-white underline underline-offset-4 hover:text-accent">Política de Privacidade</a>.
      </P>

      <H2>8. Livro de Reclamações</H2>
      <P>
        Nos termos da lei, está disponível o Livro de Reclamações eletrónico em{' '}
        <a href={LEGAL_LINKS.livroReclamacoes} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">livroreclamacoes.pt</a>.
      </P>

      <H2>9. Resolução alternativa de litígios (RAL)</H2>
      <P>
        Em caso de litígio de consumo, o consumidor pode recorrer a uma entidade de resolução alternativa de
        litígios. Entidade de competência residual: <strong className="text-white/90">CNIACC — Centro Nacional
        de Informação e Arbitragem de Conflitos de Consumo</strong> ({' '}
        <a href={LEGAL_LINKS.cniacc} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">cniacc.pt</a>).
        Está também disponível a Plataforma Europeia de Resolução de Litígios em Linha:{' '}
        <a href={LEGAL_LINKS.odr} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">ec.europa.eu/consumers/odr</a>.
        Mais informações em <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">consumidor.gov.pt</a>.
      </P>

      <H2>10. Lei aplicável e foro</H2>
      <P>
        Os presentes Termos regem-se pela lei portuguesa. Para a resolução de qualquer litígio é competente o
        foro da comarca da sede do prestador, sem prejuízo das regras imperativas de defesa do consumidor.
      </P>
    </LegalShell>
  )
}
