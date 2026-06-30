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

const CTA = `/contacto?servico=${encodeURIComponent('Social Media')}`

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Gestão de Redes Sociais e Conteúdo — Element Group',
  description:
    'Gestão de redes sociais para empresas: posts com design, copy e vídeos verticais (Reels/TikTok/Shorts). Presença consistente, sem te roubar tempo.',
  keywords: ['gestão redes sociais Portugal', 'conteúdo Instagram PME', 'Reels TikTok negócio', 'marketing redes sociais', 'agência social media Portugal', 'Element Group redes sociais'],
  alternates: { canonical: '/servicos/social' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Gestão de Redes Sociais e Conteúdo — Element Group',
    description: 'Gestão de redes sociais para empresas: posts com design, copy e vídeos verticais. Presença consistente, sem te roubar tempo.',
    url: '/servicos/social',
    locale: 'pt_PT',
    siteName: 'Element Group',
    images: [{ url: '/og/04-social-media.png', width: 1200, height: 630, alt: 'Redes Sociais — Element Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestão de Redes Sociais e Conteúdo — Element Group',
    description: 'Gestão de redes sociais para empresas: posts com design, copy e vídeos verticais.',
    images: ['/og/04-social-media.png'],
  },
}

// Acento da categoria Social Media: lilás (criatividade / comunidade / energia).
const ACCENT_SOCIAL = {
  '--accent-rgb': '169 138 212',
  '--accent': '#A98AD4',
  '--accent-deep': '#543f7d',
  '--accent-mid': '#7d63ad',
  '--accent-light': '#ddccf0',
} as CSSProperties

export default function SocialMediaPage() {
  return (
    <main style={ACCENT_SOCIAL}>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Gestão de Redes Sociais e Conteúdo',
            serviceType: 'Gestão de redes sociais e criação de conteúdo',
            description:
              'Gestão de redes sociais e criação de conteúdo para empresas em Portugal: posts com design, copy e vídeos verticais (Reels, TikTok, Shorts).',
            path: '/servicos/social',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Social Media', path: '/servicos/social' },
          ]),
        ]}
      />
      {/* 1 · Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6">
        <div aria-hidden className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }} />

        <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateOnScroll direction="left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">Categoria 03 · Social Media &amp; Conteúdo</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Gestão de redes sociais em Portugal que <span className="text-accent">te poupa tempo</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-xl">
              Gestão de redes e conteúdo para empresas em Portugal que querem estar presentes e profissionais —
              sem passar o dia a criar posts. Um complemento ao que faz o teu negócio crescer.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <GlowButton href={CTA}>Quero as minhas redes ativas</GlowButton>
              <Link href="/portfolio" className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors">
                Ver portefólio
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Visual — social post mockup */}
          <AnimateOnScroll direction="right">
            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-[#16191f] via-[#121317] to-[#0d0e11] p-6 md:p-8 min-h-[340px] flex items-center justify-center overflow-hidden">
              <div aria-hidden className="absolute -top-16 left-1/4 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }} />
              <div className="relative w-full max-w-[260px] rounded-xl border border-white/10 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.5)] overflow-hidden" aria-hidden>
                <div className="flex items-center gap-2 p-3">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-[var(--accent-mid)]" />
                  <div className="flex-1">
                    <div className="h-2 w-20 rounded bg-white/25 mb-1" />
                    <div className="h-1.5 w-12 rounded bg-white/10" />
                  </div>
                  <span className="text-dark text-lg leading-none">···</span>
                </div>
                <div className="h-32 bg-gradient-to-br from-accent/25 via-[var(--accent-mid)]/10 to-transparent border-y border-white/5" />
                <div className="flex items-center gap-4 p-3 text-white/70">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-5.4A8 8 0 1 1 21 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12l16-7-7 16-2.2-6.8L4 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 rounded-xl border border-white/10 bg-bg-card/90 backdrop-blur p-3 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
                <p className="text-[10px] text-muted mb-1.5">Alcance</p>
                <div className="flex items-end gap-1 h-9">
                  {[35, 50, 42, 68, 84, 100].map((h, i) => (
                    <span key={i} className="w-1.5 rounded-sm bg-gradient-to-t from-accent/40 to-accent" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2 · Problema / dor */}
      <PainPoints
        title={<>Redes paradas passam a <span className="pain-word">imagem errada</span>.</>}
        intro="Hoje, quando alguém te conhece, vai espreitar as tuas redes. O que encontra lá fala por ti — para o bem ou para o mal."
        items={[
          { pain: 'Há semanas (ou meses) sem publicar — e quem te procura pensa que já fechaste.', cost: 'Perfil parado lê-se como negócio parado.' },
          { pain: 'Sabes que devias publicar, mas nunca tens tempo nem vontade.', cost: 'E adiar vira meses sem presença nenhuma.' },
          { pain: 'Os posts que fazes não têm linha nem design — parecem amadores ao lado da concorrência.', cost: 'Pareces menor do que realmente és.' },
          { pain: 'Tentaste Reels, mas editar vídeo leva horas e acabas por desistir.', cost: 'E é o formato que mais alcança hoje a passar-te ao lado.' },
        ]}
      />

      {/* 3 · O que inclui */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui">
        <IncludesGlobe
          items={INCLUDES}
          eyebrow="O que está incluído"
          title="Gestão de redes sociais e conteúdo, do plano à publicação"
          subtitle="Tu aprovas, eu trato do resto. Presença consistente, com a tua identidade — sem te ocupar a agenda."
        />
      </section>

      {/* 4 · Para quem é (e não é) */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="paraquem">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">É para ti?</p>
            <h2 id="paraquem" className="text-white">Um complemento — não uma fórmula mágica</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Sou honesto: as redes ajudam a manter-te presente e credível, mas o motor do crescimento
              é o teu site e o SEO. Vê se isto encaixa em ti.
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
                    'Queres estar presente e profissional nas redes, sem perder tempo.',
                    'Já tens (ou vais ter) site e SEO e queres complementar com presença social.',
                    'Valorizas consistência e qualidade em vez de publicar à pressão.',
                    'Queres conteúdo que represente bem a tua marca.',
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
                    'Achas que só as redes sociais vão fazer o teu negócio crescer.',
                    'Queres viralizar da noite para o dia — não prometo milagres.',
                    'Não tens disponibilidade para aprovar conteúdo de vez em quando.',
                    'Procuras só o pacote mais barato, sem te importares com a qualidade.',
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
          title="Redes ativas, do plano à publicação"
          subtitle="Um processo simples em que o teu único trabalho é aprovar."
        />
      </section>

      {/* 6 · Resultados / o que muda */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="resultados">
        <ResultsFlow
          eyebrow="O que muda"
          title="Presença que trabalha por ti"
          subtitle="Sem promessas de viral. O que entrego é constância, imagem profissional e o teu tempo livre."
          before={[
            { label: 'Redes paradas há meses', icon: (<><circle cx="12" cy="12" r="9" /><path d="M10 9v6M14 9v6" /></>) },
            { label: 'Sem tempo para publicar', icon: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>) },
            { label: 'Posts sem linha nem design', icon: (<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></>) },
          ]}
          engineChips={['Conteúdo', 'Design', 'Vídeo']}
          results={[
            { metric: 'Sempre', label: 'Ativo e consistente' },
            { metric: '~0h', label: 'do teu tempo · tu aprovas' },
            { metric: '100%', label: 'à imagem da tua marca' },
          ]}
        />
      </section>

      {/* 7 · Preço — tabela real */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="preco">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Investimento</p>
            <h2 id="preco" className="text-white">Preços claros, sem surpresas</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Avença mensal para presença contínua, ou packs pontuais quando precisares de um empurrão.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES} packages={PRICES} ctaHref={CTA} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 8 · FAQ */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="faq">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
        <div className="max-w-[820px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">FAQ</p>
            <h2 id="faq" className="text-white">Perguntas frequentes sobre redes sociais</h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <FaqAccordion items={SOCIAL_FAQS} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 9 · CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta">
        <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[760px] h-[420px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 100%, rgb(var(--accent-rgb) / 0.20), transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">O próximo passo</p>
            <h2 id="cta" className="text-white">Pronto para redes que te representam — sem o trabalho?</h2>
            <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
              Conta-me onde queres estar. Trato do resto. Respondo pessoalmente em menos de 2 horas,
              sem compromisso.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <GlowButton href={CTA}>Quero as minhas redes ativas</GlowButton>
              <span className="text-sm text-white/70">
                ou escreve-me para{' '}
                <Link href="mailto:info@elementgroup.pt" className="text-white/90 underline underline-offset-4 hover:text-white transition-colors">info@elementgroup.pt</Link>
              </span>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      <RelatedServices current="social" />
    </main>
  )
}

// Componentes do serviço (feature → benefício).
const INCLUDES = [
  { title: 'Gestão de redes',          desc: 'Trato das tuas redes com conteúdo planeado e publicado — presença sem te ocupar.',           icon: (<><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-5.4A8 8 0 1 1 21 11.5Z" /></>) },
  { title: 'Conteúdo & design',        desc: 'Posts com design profissional e copy que para o scroll — com a tua identidade.',           icon: (<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></>) },
  { title: 'Vídeo vertical',           desc: 'Reels, TikToks e Shorts com legendas, hook e CTA — o formato que mais alcança hoje.',       icon: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="m10 9 5 3-5 3V9Z" /></>) },
  { title: 'Calendário de conteúdo',   desc: 'Um plano mensal claro: sabes o que sai e quando. Nada de improviso.',                       icon: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>) },
  { title: 'Copy que gera ação',       desc: 'Legendas pensadas para interação e para levar à ação — não só para somar likes.',          icon: (<><path d="M4 4h16v12H7l-3 3V4Z" /></>) },
  { title: 'Sem te roubar tempo',      desc: 'Tu aprovas, eu trato do resto. As redes ativas sem ocupar a tua agenda.',                  icon: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>) },
]

// Processo de Social Media. (metric = facto real, sem inventar números)
const STEPS = [
  { card: 'Conversa', tagline: 'Percebo o teu negócio, tom e canais.',
    title: 'Conversa & objetivos', desc: 'Percebo o teu negócio, o teu tom e onde queres estar (Instagram, Facebook, TikTok).',
    metric: 'Grátis', metricLabel: 'conversa inicial', icon: (<><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-5.4A8 8 0 1 1 21 11.5Z" /></>) },
  { card: 'Calendário', tagline: 'Linha de conteúdo e calendário mensal.',
    title: 'Estratégia & calendário', desc: 'Defino a linha de conteúdo e um calendário mensal. Tu aprovas antes de avançar.',
    metric: 'Mensal', metricLabel: 'calendário aprovado por ti', icon: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>) },
  { card: 'Criação', tagline: 'Posts, design e vídeo vertical à tua medida.',
    title: 'Criação', desc: 'Crio posts, design e vídeos verticais com a tua identidade.',
    metric: 'Vídeo', metricLabel: 'vertical (Reels/TikTok)', icon: (<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></>) },
  { card: 'Aprovação', tagline: 'Vês tudo antes de sair.',
    title: 'Aprovação', desc: 'Vês tudo antes de sair e ajustamos o que quiseres — sem surpresas.',
    metric: '0', metricLabel: 'surpresas — aprovas tudo', icon: (<><path d="M20 6 9 17l-5-5" /></>) },
  { card: 'Publicação', tagline: 'Publico/agendo e mostro o que resultou.',
    title: 'Publicação & relatório', desc: 'Publico ou agendo e mostro-te, com simplicidade, o que funcionou melhor.',
    metric: 'Mensal', metricLabel: 'relatório simples', icon: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>) },
]

// Preços reais (recorrente / avulso / one-off).
const PRICES = [
  { name: 'Gestão de Social Media', desc: 'Criação e gestão de conteúdo com escopo definido (volume controlado).', price: '197€', type: 'por mês · recorrente', highlight: true,
    features: ['Conteúdo planeado e publicado', 'Design + copy com a tua identidade', 'Calendário mensal de conteúdo', 'Relatório simples todos os meses'] },
  { name: 'Pack de Posts',          desc: 'Conjunto de posts com design e copy, para venda rápida e pontual.',     price: '190€', type: 'por pack · avulso',
    features: ['Conjunto de posts profissionais', 'Design + copy incluídos', 'Prontos a publicar', 'Sem avença mensal'] },
  { name: 'Pack Vídeo Vertical',    desc: '6 vídeos verticais (Reels/TikTok/Shorts) com legendas e hook + CTA.',    price: '397€', type: 'pagamento único',
    features: ['6 vídeos verticais (Reels/TikTok)', 'Legendas, hook e CTA', 'O formato que mais alcança', 'Pagamento único, sem avença'] },
]

// Objeções específicas de redes sociais.
const SOCIAL_FAQS = [
  { q: 'Em que redes trabalham?', a: 'Instagram, Facebook e TikTok — conforme onde estão os teus clientes. Foco onde faz sentido para o teu negócio, em vez de estar em todas ao mesmo tempo.' },
  { q: 'Tenho de aparecer ou gravar vídeos?', a: 'Não é obrigatório. Trabalho com o que tiveres (fotos, vídeos do dia a dia) e crio conteúdo à volta disso. Para Reels, oriento-te se quiseres gravar tu mesmo.' },
  { q: 'Quantos posts por mês?', a: 'Depende do plano — definimos um volume controlado à cabeça, para garantir qualidade e não saturar nem o teu feed nem o teu tempo.' },
  { q: 'As redes vão fazer o meu negócio explodir?', a: 'Sinceramente, não sozinhas. As redes são um complemento — o motor do crescimento é o teu site e o SEO. O que fazem é manter-te presente, credível e na memória de quem te segue.' },
  { q: 'Posso pedir só um pack pontual?', a: 'Sim. Tens o Pack de Posts (avulso) e o Pack Vídeo Vertical (pagamento único), sem teres de assinar uma avença mensal.' },
  { q: 'Como começo?', a: 'Pedes um orçamento no formulário (2 minutos). Respondo em menos de 2 horas, sem compromisso.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SOCIAL_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
