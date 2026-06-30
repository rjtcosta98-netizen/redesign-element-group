import type { Metadata } from 'next'
import { LegalShell, H2, P, UL, LI } from '@/components/legal/LegalShell'
import { COMPANY } from '@/lib/company'

export const metadata: Metadata = {
  alternates: { canonical: '/subprocessadores' },
  title: 'Subprocessadores de Dados — Element Group',
  description: 'Lista dos subcontratantes (subprocessadores) que tratam dados pessoais em nome da Element Group, em conformidade com o art. 28.º do RGPD.',
  openGraph: { url: '/subprocessadores' },
}

export default function SubprocessadoresPage() {
  return (
    <LegalShell title="Subprocessadores de Dados" updated="junho de 2026">
      <P>
        Nos termos do artigo 28.º do Regulamento Geral sobre a Proteção de Dados (RGPD — Regulamento
        (UE) 2016/679), a {COMPANY.tradeName} divulga a lista dos subcontratantes (subprocessadores)
        que tratam dados pessoais em seu nome. Todos os subprocessadores oferecem garantias suficientes
        de conformidade com o RGPD e estão vinculados por acordos de tratamento de dados (DPA).
      </P>

      <H2>1. Infraestrutura e alojamento</H2>
      <UL>
        <LI>
          <strong className="text-white/90">Cloudflare, Inc.</strong> — CDN, proxy de segurança e
          alojamento de páginas (Cloudflare Pages). Dados processados: registos de acesso, endereços IP.
          Sede: EUA — transferência ao abrigo das Cláusulas Contratuais-Tipo da Comissão Europeia.{' '}
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">Política de privacidade</a>.
        </LI>
        <LI>
          <strong className="text-white/90">Vercel, Inc.</strong> — alojamento de projetos de
          desenvolvimento de clientes. Dados processados: registos de acesso, endereços IP.
          Sede: EUA — transferência ao abrigo das Cláusulas Contratuais-Tipo.{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">Política de privacidade</a>.
        </LI>
      </UL>

      <H2>2. Base de dados e backend</H2>
      <UL>
        <LI>
          <strong className="text-white/90">Supabase, Inc.</strong> — alojamento da base de dados
          de contactos e leads (formulário de contacto e newsletter). Dados processados: nome, email,
          mensagem, endereço IP, data de submissão.
          Sede: EUA — servidores na UE (região eu-central-1, Frankfurt) disponíveis; transferência
          ao abrigo das Cláusulas Contratuais-Tipo.{' '}
          <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">Política de privacidade</a>.
        </LI>
      </UL>

      <H2>3. Análise e desempenho</H2>
      <UL>
        <LI>
          <strong className="text-white/90">Google LLC (Google Analytics)</strong> — análise
          estatística de visitas ao site, mediante consentimento. Dados processados: páginas
          visitadas, tipo de dispositivo, localização aproximada, duração da sessão (anonimizados).
          Sede: EUA — transferência ao abrigo das Cláusulas Contratuais-Tipo e do EU-US Data
          Privacy Framework.{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">Política de privacidade</a>.
        </LI>
      </UL>

      <H2>4. Formulários e ferramentas de captação</H2>
      <UL>
        <LI>
          <strong className="text-white/90">Tally So, Inc. (Tally)</strong> — formulários de pedido
          de orçamento e questionários de onboarding de clientes. Dados processados: nome, email,
          informações do projeto submetidas pelo utilizador.
          Sede: Bélgica (UE) — tratamento dentro do EEE.{' '}
          <a href="https://tally.so/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">Política de privacidade</a>.
        </LI>
        <LI>
          <strong className="text-white/90">Cloudflare Turnstile</strong> — verificação anti-bot
          nos formulários do site. Dados processados: sinais de comportamento do browser (sem
          identificação pessoal). Operado pela Cloudflare, Inc. (ver ponto 1).
        </LI>
      </UL>

      <H2>5. Agendamento</H2>
      <UL>
        <LI>
          <strong className="text-white/90">Calendly, LLC</strong> — agendamento de reuniões e
          chamadas de diagnóstico com potenciais clientes. Dados processados: nome, email, fuso
          horário, notas da reunião.
          Sede: EUA — transferência ao abrigo das Cláusulas Contratuais-Tipo.{' '}
          <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 hover:text-accent">Política de privacidade</a>.
        </LI>
      </UL>

      <H2>6. Transferências internacionais</H2>
      <P>
        Quando subprocessadores estão estabelecidos fora do Espaço Económico Europeu (EEE) — nomeadamente
        nos EUA — a {COMPANY.tradeName} assegura que as transferências de dados se realizam ao abrigo de
        mecanismos legais adequados, como as Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia
        (art. 46.º, n.º 2, al. c) do RGPD) ou o EU-US Data Privacy Framework.
      </P>

      <H2>7. Atualizações</H2>
      <P>
        Esta lista é atualizada sempre que um novo subprocessador é adicionado ou um existente é removido.
        A data da última revisão encontra-se no topo desta página. Para qualquer questão, contacta-nos
        para{' '}
        <a href={`mailto:${COMPANY.email}`} className="text-white underline underline-offset-4 hover:text-accent">
          {COMPANY.email}
        </a>.
      </P>
    </LegalShell>
  )
}
