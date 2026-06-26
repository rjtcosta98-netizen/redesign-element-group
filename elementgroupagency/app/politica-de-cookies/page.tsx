import type { Metadata } from 'next'
import { LegalShell, H2, P, UL, LI } from '@/components/legal/LegalShell'
import { COMPANY } from '@/lib/company'

export const metadata: Metadata = {
  alternates: { canonical: '/politica-de-cookies' },
  title: 'Política de Cookies — Element Group',
  description: 'Que cookies o site da Element Group utiliza, para quê, e como podes geri-las.',
  robots: { index: true, follow: false },
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

      <H2>4. Mais informações</H2>
      <P>
        Para saber como tratamos os dados recolhidos, consulta a nossa{' '}
        <a href="/politica-de-privacidade" className="text-white underline underline-offset-4 hover:text-accent">Política de Privacidade</a>.
      </P>
    </LegalShell>
  )
}
