import type { Metadata } from 'next'
import { LegalShell, H2, P, UL, LI } from '@/components/legal/LegalShell'
import { COMPANY } from '@/lib/company'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  alternates: { canonical: '/politica-de-cookies' },
  title: 'Política de Cookies — Element Group',
  description: 'Que cookies o site da Element Group utiliza, para quê, e como podes geri-las.',
  openGraph: { url: '/politica-de-cookies' },
}

export default function CookiesPage() {
  return (
    <LegalShell title="Política de Cookies" updated="junho de 2026">
      <P>
        Esta Política de Cookies explica o que são cookies, quais utilizamos no site da {COMPANY.tradeName}
        e como podes controlá-las.
      </P>

      <H2>1. O que são cookies</H2>
      <P>
        Cookies são pequenos ficheiros de texto guardados no teu dispositivo quando visitas um site. Servem
        para o site funcionar corretamente, recordar preferências e recolher informação estatística.
      </P>

      <H2>2. Cookies que utilizamos</H2>
      <P>
        <strong className="text-white/90">Cookies essenciais</strong> — necessários ao funcionamento do site
        e à tua escolha de consentimento. Não exigem consentimento prévio.
      </P>
      <P>
        <strong className="text-white/90">Cookies analíticos (Google Analytics)</strong> — ajudam-nos a
        perceber como o site é utilizado, para o melhorarmos. <strong className="text-white/90">Só são
        ativados depois de dares o teu consentimento</strong> no banner de cookies.
      </P>
      <UL>
        <LI><strong className="text-white/90">_ga</strong> — distingue utilizadores (Google Analytics). Duração: até 2 anos.</LI>
        <LI><strong className="text-white/90">_ga_*</strong> — mantém o estado da sessão (Google Analytics). Duração: até 2 anos.</LI>
        <LI><strong className="text-white/90">eg-cookie-consent</strong> — guarda a tua escolha de consentimento. Duração: 6 meses (essencial).</LI>
      </UL>

      <H2>3. Gerir o teu consentimento</H2>
      <P>
        Na primeira visita, mostramos um banner onde podes <strong className="text-white/90">aceitar</strong> ou{' '}
        <strong className="text-white/90">rejeitar</strong> os cookies analíticos. Podes alterar a tua escolha a
        qualquer momento, limpando os cookies do site no teu navegador (a escolha será novamente pedida).
      </P>
      <P>
        Podes também bloquear ou eliminar cookies nas definições do teu navegador. Nota que desativar cookies
        essenciais pode afetar o funcionamento do site.
      </P>

      <H2>4. Cookies de terceiros</H2>
      <P>
        Além das cookies próprias, o site pode carregar conteúdos de terceiros — como mapas do Google Maps —
        que podem definir as suas próprias cookies, sujeitas às políticas de privacidade respetivas.
        Não controlamos nem somos responsáveis por essas cookies. Consulta a política de privacidade de
        cada fornecedor para mais informações sobre como utilizam os teus dados.
      </P>

      <H2>5. Como gerir cookies no teu navegador</H2>
      <P>
        Todos os navegadores modernos permitem bloquear ou eliminar cookies nas definições. Encontras
        instruções detalhadas nos centros de ajuda de cada navegador: Chrome, Firefox, Safari e Edge disponibilizam
        opções para limpar cookies individualmente ou para todos os sites. Desativar cookies essenciais pode
        afetar o correto funcionamento de algumas funcionalidades deste site.
      </P>

      <H2>6. Alterações a esta política</H2>
      <P>
        Reservamo-nos o direito de atualizar esta Política de Cookies sempre que necessário, por exemplo para
        refletir alterações nas leis aplicáveis ou nos serviços que utilizamos. A data de última atualização
        está sempre indicada no topo desta página. Recomendamos que a revises periodicamente.
      </P>

      <H2>7. Mais informações</H2>
      <P>
        Para saber como tratamos os dados recolhidos através de cookies analíticas, consulta a nossa{' '}
        <a href="/politica-de-privacidade" className="text-white underline underline-offset-4 hover:text-accent">Política de Privacidade</a>.
        Tens também o direito de apresentar reclamação à autoridade de controlo competente (CNPD — Comissão
        Nacional de Proteção de Dados, em Portugal).
      </P>
    </LegalShell>
  )
}
