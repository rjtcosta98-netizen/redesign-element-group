import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PackageSelector from '@/components/servicos/PackageSelector'
import PainPoints from '@/components/servicos/PainPoints'
import IncludesGlobe from '@/components/servicos/IncludesGlobe'
import ProcessTimeline from '@/components/servicos/ProcessTimeline'
import ResultsFlow from '@/components/servicos/ResultsFlow'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema } from '@/lib/seo'
import RelatedServices from '@/components/servicos/RelatedServices'

const CTA = `/contacto?servico=${encodeURIComponent('Planos Mensais')}`

export const metadata: Metadata = {
  title: 'Manutenção de Sites e Planos Mensais — Element Group',
  description:
    'Planos mensais para empresas: manutenção, backups, SEO contínuo, conteúdo e relatórios mensais. Site sempre seguro e a crescer — sem fidelização. Desde 97€/mês.',
  keywords: ['manutenção website mensal', 'plano digital PME', 'SEO mensal Portugal', 'suporte website', 'manutenção loja online', 'Element Group planos'],
  alternates: { canonical: '/servicos/planos-mensais' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Manutenção de Sites e Planos Mensais — Element Group',
    description: 'Planos mensais para empresas: manutenção, backups, SEO contínuo e relatórios. Site sempre seguro — sem fidelização. Desde 97€/mês.',
    url: '/servicos/planos-mensais',
    locale: 'pt_PT',
    siteName: 'Element Group',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Planos Mensais — Element Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manutenção de Sites e Planos Mensais — Element Group',
    description: 'Planos mensais para empresas: manutenção, backups, SEO contínuo e relatórios.',
    images: ['/opengraph-image'],
  },
}

// Acento da categoria Planos Mensais: champanhe (continuidade / parceria / valor premium).
const ACCENT_PLANOS = {
  '--accent-rgb': '215 176 116',
  '--accent': '#D7B074',
  '--accent-deep': '#7a5a2e',
  '--accent-mid': '#b08a4f',
  '--accent-light': '#f0ddbf',
} as CSSProperties

export default function PlanosMensaisPage() {
  return (
    <main style={ACCENT_PLANOS}>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Planos Mensais de Manutenção e Marketing Digital',
            serviceType: 'Manutenção de sites e marketing digital mensal',
            description:
              'Planos mensais para empresas em Portugal: manutenção de sites, backups, SEO contínuo, conteúdo e relatórios. Sem fidelização, desde 97€/mês.',
            path: '/servicos/planos-mensais',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Planos Mensais', path: '/servicos/planos-mensais' },
          ]),
        ]}
      />
      {/* 1 · Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6">
        <div aria-hidden className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }} />

        <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateOnScroll direction="left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">Categoria 04 · Planos Mensais</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Manutenção digital em Portugal, <span className="text-accent">mês após mês</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-xl">
              Planos mensais de manutenção, SEO e conteúdo para empresas que não querem um site parado no
              tempo — querem um parceiro digital sempre a trabalhar por elas. Site protegido, presença
              a crescer, zero preocupações técnicas.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <GlowButton href={CTA}>Quero um parceiro contínuo</GlowButton>
              <Link href="#preco" className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors">
                Ver planos
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Visual — recurring plan card */}
          <AnimateOnScroll direction="right">
            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-[#16191f] via-[#121317] to-[#0d0e11] p-6 md:p-8 min-h-[340px] flex items-center justify-center overflow-hidden">
              <div aria-hidden className="absolute -top-16 left-1/4 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }} />
              <div className="relative w-full max-w-sm rounded-xl border border-white/10 bg-[#101216] p-5 shadow-[0_24px_50px_rgba(0,0,0,0.5)]" aria-hidden>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-white font-medium">Plano mensal</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] text-accent font-medium">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 1 1-2.6-6.3M21 4v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Recorrente
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {['Manutenção & backups', 'SEO técnico mensal', 'Conteúdo & posts', 'Relatório de resultados'].map((it) => (
                    <li key={it} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-gradient-to-br from-accent to-[var(--accent-mid)] flex items-center justify-center text-black text-[11px]">✓</span>
                      <span className="text-[12px] text-muted">{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2 · Problema / dor */}
      <PainPoints
        title={<>Um site não é <span className="pain-word">&ldquo;feito e esquecido&rdquo;</span>.</>}
        intro="Um site precisa de cuidado contínuo — segurança, atualizações e presença no Google. Deixado por sua conta, envelhece, abranda e cai nas pesquisas."
        items={[
          { pain: 'Lançaste o site há meses e desde aí… nada. Está a ficar desatualizado e a cair no Google.', cost: 'O que custou a subir cai sozinho.' },
          { pain: 'Tens receio que algo parta (ou seja pirateado) e não saberes a quem ligar.', cost: 'E descobres só quando já estás offline.' },
          { pain: 'Sabes que devias fazer SEO e conteúdo todos os meses, mas não tens tempo nem equipa.', cost: 'Enquanto paras, a concorrência continua.' },
          { pain: 'Cada pequena alteração vira uma novela — ninguém responde, ninguém resolve.', cost: 'E desistes de pedir — o site fica congelado no tempo.' },
        ]}
      />

      {/* 3 · O que inclui */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui">
        <IncludesGlobe
          items={INCLUDES}
          eyebrow="O que está incluído"
          title="Manutenção de sites, SEO e conteúdo — todos os meses"
          subtitle="Manutenção, crescimento e tranquilidade num só plano. Tu tocas no teu negócio; eu trato do digital."
        />
      </section>

      {/* 4 · Para quem é (e não é) */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="paraquem">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">É para ti?</p>
            <h2 id="paraquem" className="text-white">Para quem pensa a longo prazo</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Os planos mensais compensam a quem quer crescer com consistência — não a quem quer só apagar fogos.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-5">
            <AnimateOnScroll direction="left">
              <div className="glow-card h-full">
                <span aria-hidden className="glow-card__wave" />
                <span aria-hidden className="glow-card__ring" />
                <div className="glow-card__content h-full p-7">
                <p className="flex items-center gap-2 text-sm font-medium text-white mb-5">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-gradient-to-br from-accent to-[var(--accent-mid)] text-black" aria-hidden>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                  </span>
                  É para ti se…
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Já tens um site e queres mantê-lo seguro, atualizado e a crescer.',
                    'Não tens tempo nem equipa para tratar do digital todos os meses.',
                    'Preferes uma mensalidade previsível a sustos pontuais.',
                    'Queres um parceiro de longo prazo, não um fornecedor de uma só vez.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                      <span className="text-accent mt-0.5" aria-hidden>✓</span>{t}
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div className="h-full rounded-[22px] border border-white/10 bg-bg-card p-7">
                <p className="flex items-center gap-2 text-sm font-medium text-white/80 mb-5">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-white/[0.06] text-white/40" aria-hidden>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </span>
                  Não é para ti se…
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Só queres o site feito e não te importas que fique parado no tempo.',
                    'Preferes resolver tudo à última hora, quando algo parte.',
                    'Não valorizas SEO nem conteúdo de forma contínua.',
                    'Procuras um compromisso de zero acompanhamento.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-muted/80 leading-relaxed">
                      <span className="text-white/30 mt-0.5" aria-hidden>✗</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 5 · Como funciona */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="processo">
        <ProcessTimeline
          steps={STEPS}
          eyebrow="Como funciona"
          title="Simples de começar, fácil de manter"
          subtitle="Escolhes o plano e esqueces o assunto — eu trato do digital, mês após mês."
        />
      </section>

      {/* 6 · Resultados / o que muda */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="resultados">
        <ResultsFlow
          eyebrow="O que muda"
          title="Tranquilidade que se nota"
          subtitle="Sem promessas vazias. O que ganhas é um site cuidado e a tua cabeça livre."
          before={[
            { label: 'Site parado e ao abandono', icon: (<><circle cx="12" cy="12" r="9" /><path d="M10 9v6M14 9v6" /></>) },
            { label: 'Risco de falhas, sem apoio', icon: (<><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>) },
            { label: 'A cair no Google', icon: (<><path d="M3 7l6 6 4-4 7 7" /><path d="M21 16v4h-4" /></>) },
          ]}
          engineChips={['Manutenção', 'SEO', 'Conteúdo']}
          results={[
            { metric: '24/7', label: 'Monitorização do site' },
            { metric: '< 2h', label: 'Resposta prioritária' },
            { metric: 'Mensal', label: 'SEO, conteúdo e relatório' },
          ]}
        />
      </section>

      {/* 7 · Preço — planos em camadas (cartões) */}
      <section id="preco" className="bg-bg border-t border-white/10 py-24 px-6 scroll-mt-24" aria-labelledby="precoh">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Planos</p>
            <h2 id="precoh" className="text-white">Escolhe o teu plano mensal</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Sem fidelização. Começa onde fizer sentido e sobe à medida que cresces.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES} packages={PLANS} ctaHref={CTA} ctaLabel="Começar agora" />
          </AnimateOnScroll>

          <p className="mt-8 text-center text-[11px] text-dark">Cada plano inclui tudo o que está no anterior. Podes mudar de plano a qualquer momento.</p>
        </div>
      </section>

      {/* 8 · FAQ */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="faq">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
        <div className="max-w-[820px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">FAQ</p>
            <h2 id="faq" className="text-white">Perguntas frequentes sobre os planos</h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <FaqAccordion items={PLAN_FAQS} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 9 · CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta">
        <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[760px] h-[420px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 100%, rgb(var(--accent-rgb) / 0.20), transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">O próximo passo</p>
            <h2 id="cta" className="text-white">Pronto para deixar de te preocupar com o digital?</h2>
            <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
              Escolhe um plano e fica descansado — trato do resto, todos os meses, sem fidelização.
              Respondo pessoalmente em menos de 2 horas.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <GlowButton href={CTA}>Quero um parceiro contínuo</GlowButton>
              <Link href="mailto:info@elementgroup.pt" className="text-sm text-white/70 hover:text-white transition-colors">
                ou escreve-me para <span className="text-white/90 underline underline-offset-4">info@elementgroup.pt</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      <RelatedServices current="plans" />
    </main>
  )
}

// O que um plano mensal cobre (feature → benefício).
const INCLUDES = [
  { title: 'Manutenção & backups',     desc: 'O teu site atualizado, seguro e com cópias de segurança. Dormes descansado.',            icon: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></>) },
  { title: 'Monitorização 24/7',       desc: 'Vigio se o site está no ar a toda a hora — se algo falhar, ajo antes de notares.',        icon: (<><path d="M3 12h4l3 8 4-16 3 8h4" /></>) },
  { title: 'SEO contínuo',             desc: 'Ajustes e otimização mensais para continuares a subir no Google — não a cair.',           icon: (<><path d="M3 17l6-6 4 4 7-7" /><path d="M16 7h5v5" /></>) },
  { title: 'Conteúdo & posts',         desc: 'Conteúdo regular para o site e redes (conforme o plano) — presença sempre fresca.',       icon: (<><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h5" /></>) },
  { title: 'Relatórios mensais',       desc: 'Um resumo simples todos os meses: o que foi feito e como estás a evoluir.',               icon: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>) },
  { title: 'Suporte prioritário',      desc: 'Falas comigo diretamente e as tuas alterações têm prioridade. Sem filas.',                icon: (<><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-5.4A8 8 0 1 1 21 11.5Z" /></>) },
]

// Processo dos planos mensais. (metric = facto real, sem inventar números)
const STEPS = [
  { card: 'Plano', tagline: 'Escolhemos juntos o plano certo para a tua fase.',
    title: 'Escolhes o plano', desc: 'Vês os planos e escolhemos juntos o que faz sentido para a fase do teu negócio.',
    metric: 'Mês a mês', metricLabel: 'sem fidelização', icon: (<><path d="M8 6h13M8 12h13M8 18h13" /><path d="M3 6h.01M3 12h.01M3 18h.01" /></>) },
  { card: 'Arranque', tagline: 'Defino prioridades: segurança, SEO, conteúdo.',
    title: 'Arranque & prioridades', desc: 'Defino o que tratar primeiro: segurança, SEO, conteúdo. Pomos a casa em ordem.',
    metric: 'Setup', metricLabel: 'casa em ordem', icon: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></>) },
  { card: 'Mensal', tagline: 'Manutenção e ações todos os meses, sem pedires.',
    title: 'Trabalho mensal', desc: 'Todos os meses faço a manutenção e as ações do teu plano — sem teres de pedir.',
    metric: 'Mensal', metricLabel: 'manutenção + SEO + conteúdo', icon: (<><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></>) },
  { card: 'Relatório', tagline: 'Resumo do que foi feito e dos resultados.',
    title: 'Relatório', desc: 'Recebes um resumo do que foi feito e dos resultados. Tudo transparente.',
    metric: '100%', metricLabel: 'transparente', icon: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>) },
  { card: 'Evolução', tagline: 'Ajustamos o plano à medida que cresces.',
    title: 'Evoluímos', desc: 'À medida que cresces, ajustamos o plano contigo. Subes (ou desces) quando quiseres.',
    metric: 'Flexível', metricLabel: 'sobes ou desces quando quiseres', icon: (<><path d="M3 17l6-6 4 4 7-7" /><path d="M16 7h5v5" /></>) },
]

// Planos em camadas (preços reais, recorrentes). “Tudo do anterior +”.
const PLANS = [
  {
    name: 'Manutenção',
    tag: 'Essencial',
    desc: 'Site seguro, atualizado e sempre no ar — sem te preocupares.',
    price: '97€',
    type: 'por mês · sem fidelização',
    features: ['Manutenção técnica & atualizações', 'Backups regulares', 'Monitorização de uptime', 'Relatório Google mensal'],
  },
  {
    name: 'Crescimento',
    tag: 'Recomendado',
    desc: 'Manutenção + SEO e conteúdo para continuares a subir.',
    price: '197€',
    type: 'por mês · sem fidelização',
    highlight: true,
    features: ['Tudo do Essencial', 'SEO técnico mensal', 'Analytics & acompanhamento', 'Alguns posts de conteúdo'],
  },
  {
    name: 'Performance',
    tag: 'Completo',
    desc: 'Tudo a crescer: mais social, email marketing e prioridade.',
    price: '297€',
    type: 'por mês · sem fidelização',
    features: ['Tudo do Crescimento', 'Mais conteúdo social', 'Campanha de email marketing', 'Suporte prioritário'],
  },
]

// Objeções específicas dos planos mensais.
const PLAN_FAQS = [
  { q: 'Tenho de assinar por quanto tempo? Posso cancelar?', a: 'Sem fidelização. É mês a mês — continuas comigo enquanto fizer sentido para ti, e cancelas quando quiseres.' },
  { q: 'Posso mudar de plano?', a: 'Sim, a qualquer momento. Subimos ou descemos de plano conforme a fase e as necessidades do teu negócio.' },
  { q: 'Preciso de ter um site feito por ti?', a: 'Não obrigatoriamente. Posso assumir a manutenção de um site existente — faço primeiro uma avaliação para garantir que está em condições.' },
  { q: 'As alterações ao site estão incluídas?', a: 'Pequenas alterações e atualizações regulares estão incluídas. Mudanças grandes (novas secções, funcionalidades) levam orçamento à parte, sempre transparente e aprovado por ti.' },
  { q: 'Qual a diferença entre os planos?', a: 'Sobem em camadas: Essencial = manutenção e segurança; Crescimento = + SEO e conteúdo; Performance = + social e email marketing. Cada plano inclui tudo o que está no anterior.' },
  { q: 'Como começo?', a: 'Escolhes um plano ou pedes-me ajuda a escolher no formulário. Respondo em menos de 2 horas, sem compromisso.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PLAN_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
