import type { Metadata } from 'next'
import { LegalShell, H2, P, UL, LI } from '@/components/legal/LegalShell'
import { COMPANY, LEGAL_LINKS } from '@/lib/company'

export const metadata: Metadata = {
  alternates: { canonical: '/politica-de-privacidade' },
  title: 'Política de Privacidade — Element Group',
  description: 'Como a Element Group trata e protege os teus dados pessoais, em conformidade com o RGPD.',
  openGraph: { url: '/politica-de-privacidade' },
}

export default function PrivacidadePage() {
  return (
    <LegalShell title="Política de Privacidade" updated="junho de 2026">
      <P>
        A presente Política de Privacidade explica como são recolhidos, utilizados e protegidos os teus
        dados pessoais quando utilizas o site da {COMPANY.tradeName}, em conformidade com o Regulamento
        Geral sobre a Proteção de Dados (RGPD — Regulamento (UE) 2016/679) e a legislação portuguesa aplicável.
      </P>

      <H2>1. Responsável pelo tratamento</H2>
      <P>
        {COMPANY.legalName} ({COMPANY.status}), que opera sob a marca {COMPANY.tradeName}.
        <br />NIF: {COMPANY.nif}
        <br />Morada: {COMPANY.address}, {COMPANY.postalCity}
        <br />Email: {COMPANY.email}
        <br />Telefone: {COMPANY.phone} ({COMPANY.phoneCost})
      </P>

      <H2>2. Que dados recolhemos</H2>
      <UL>
        <LI><strong className="text-white/90">Dados de contacto</strong> que nos envias através do formulário de contacto ou por email: nome, email e o conteúdo da mensagem.</LI>
        <LI><strong className="text-white/90">Subscrição da newsletter</strong> (se aplicável): o teu endereço de email.</LI>
        <LI><strong className="text-white/90">Dados de navegação</strong> recolhidos por cookies analíticos (Google Analytics): páginas visitadas, tipo de dispositivo, dados aproximados de localização e de utilização — sempre que dês o teu consentimento.</LI>
      </UL>

      <H2>3. Finalidades e fundamentos do tratamento</H2>
      <UL>
        <LI>Responder a pedidos de contacto e preparar orçamentos — diligências pré-contratuais (art. 6.º, n.º 1, al. b) do RGPD).</LI>
        <LI>Envio de comunicações e newsletter — com base no teu consentimento (art. 6.º, n.º 1, al. a)).</LI>
        <LI>Análise estatística e melhoria do site (Google Analytics) — com base no teu consentimento.</LI>
        <LI>Cumprimento de obrigações legais (ex.: contabilísticas e fiscais) — art. 6.º, n.º 1, al. c).</LI>
      </UL>

      <H2>4. Subcontratantes e partilha de dados</H2>
      <P>
        Para prestar os nossos serviços recorremos a fornecedores que podem tratar dados em nosso nome,
        com garantias de segurança adequadas:
      </P>
      <UL>
        <LI><strong className="text-white/90">Supabase</strong> — alojamento da base de dados de contactos (leads).</LI>
        <LI><strong className="text-white/90">Google (Analytics)</strong> — análise estatística do site.</LI>
        <LI><strong className="text-white/90">Tally</strong> — formulário de pedido de orçamento.</LI>
        <LI>Fornecedor de alojamento e de envio de email.</LI>
      </UL>
      <P>
        A lista completa de subprocessadores, com informação sobre localização e finalidade, está disponível
        na nossa <a href="/subprocessadores" className="text-white underline underline-offset-4 hover:text-accent">página de Subprocessadores de Dados</a>.
        Alguns destes fornecedores podem tratar dados fora do Espaço Económico Europeu, caso em que são
        aplicadas as salvaguardas previstas no RGPD (ex.: cláusulas contratuais-tipo da Comissão Europeia).
        Não vendemos nem cedemos os teus dados a terceiros para fins de marketing.
      </P>

      <H2>5. Durante quanto tempo conservamos os dados</H2>
      <P>
        Conservamos os teus dados apenas durante o tempo necessário às finalidades para que foram recolhidos:
        os pedidos de contacto enquanto durar a relação e pelos prazos legais aplicáveis; os dados de
        newsletter até retirares o consentimento. Findos esses prazos, os dados são eliminados ou anonimizados.
      </P>

      <H2>6. Os teus direitos</H2>
      <P>Nos termos do RGPD, tens direito a:</P>
      <UL>
        <LI>Aceder, retificar e atualizar os teus dados.</LI>
        <LI>Solicitar o apagamento (&ldquo;direito a ser esquecido&rdquo;) e a limitação do tratamento.</LI>
        <LI>Opor-te ao tratamento e exercer a portabilidade dos dados.</LI>
        <LI>Retirar o consentimento a qualquer momento, sem afetar a licitude do tratamento anterior.</LI>
      </UL>
      <P>
        Para exercer estes direitos, contacta-nos para <a href={`mailto:${COMPANY.email}`} className="text-white underline underline-offset-4 hover:text-accent">{COMPANY.email}</a>.
        Tens ainda o direito de apresentar reclamação à autoridade de controlo — a Comissão Nacional de
        Proteção de Dados (CNPD): <a href={LEGAL_LINKS.cnpd} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">cnpd.pt</a>.
      </P>

      <H2>7. Segurança</H2>
      <P>
        Adotamos medidas técnicas e organizativas adequadas para proteger os teus dados contra acesso,
        alteração, divulgação ou destruição não autorizados.
      </P>

      <H2>8. Cookies</H2>
      <P>
        O nosso site utiliza cookies. Para mais informações, consulta a nossa{' '}
        <a href="/politica-de-cookies" className="text-white underline underline-offset-4 hover:text-accent">Política de Cookies</a>.
      </P>

      <H2>9. Alterações</H2>
      <P>
        Esta política pode ser atualizada periodicamente. A data da última atualização encontra-se no topo
        desta página.
      </P>
    </LegalShell>
  )
}
