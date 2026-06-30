import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import JsonLd from '@/components/JsonLd'
import { SITE, breadcrumbSchema } from '@/lib/seo'
import { PROJECTS, ACCENTS, ProjectCover } from './projects'


export const metadata: Metadata = {
  alternates: { canonical: '/portfolio' },
  title: 'Portefólio — Trabalhos reais | Element Group',
  description:
    'Websites, lojas online e projetos de SEO entregues pela Element Group a PMEs em Portugal. Vê cada caso em detalhe: o que foi feito e os resultados reais.',
  keywords: [
    'portefólio agência digital',
    'casos de estudo website',
    'exemplos de websites PME Portugal',
    'lojas online criadas',
    'SEO resultados reais',
    'Element Group trabalhos',
    'projetos web Portugal',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Portefólio — Trabalhos reais | Element Group',
    description: 'Websites, lojas online e projetos de SEO entregues pela Element Group a PMEs em Portugal. Resultados reais, casos detalhados.',
    url: '/portfolio',
    type: 'website',
    locale: 'pt_PT',
    siteName: 'Element Group',
    images: [{ url: '/og/07-portfolio.png', width: 1200, height: 630, alt: 'Portefólio Element Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portefólio — Trabalhos reais | Element Group',
    description: 'Websites, lojas online e SEO para PMEs em Portugal. Casos reais com resultados.',
    images: ['/og/07-portfolio.png'],
  },
}

const STATS = [
  { v: '5,0★', l: 'Avaliação no Google', s: '9 avaliações' },
  { v: '95+', l: 'PageSpeed médio', s: 'nos sites entregues' },
  { v: '3,2×', l: 'Tráfego médio (SEO)', s: 'média dos projetos' },
  { v: '< 2h', l: 'Tempo de resposta', s: 'em dias úteis' },
]

export default function PortfolioPage() {
  const [featured, ...rest] = PROJECTS

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE.url}/portfolio#collection`,
    name: 'Portefólio — Element Group',
    description: 'Casos de estudo reais de websites, lojas online e SEO entregues pela Element Group a PMEs em Portugal.',
    url: `${SITE.url}/portfolio`,
    isPartOf: { '@id': `${SITE.url}/#website` },
    inLanguage: 'pt-PT',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: `${SITE.url}/portfolio/${p.slug}`,
        name: `${p.client} — ${p.category}`,
      })),
    },
  }

  return (
    <main>
      <JsonLd
        data={[
          collectionSchema,
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Portefólio', path: '/portfolio' },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-16 px-6">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[640px] h-[640px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(127,168,217,0.14), transparent 60%)' }}
        />
        <div className="relative max-w-[1100px] mx-auto">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">Portefólio</p>
            <h1 className="text-white max-w-3xl tracking-[-0.03em] leading-[1.04]">
              Portefólio: trabalho real, <span className="text-accent">resultados reais</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-xl">
              Cada projeto que entrego a PMEs em Portugal — websites, lojas online e SEO.
              Clica num caso para veres o que foi feito, ao detalhe.
            </p>
          </AnimateOnScroll>

          {/* Faixa de provas reais — cards "glassy" elevados (factos agregados, nada inventado) */}
          <AnimateOnScroll delay={0.1}>
            <ul className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((s, i) => (
                <li key={s.l} className="glow-card p-6 md:p-7 text-center" style={{ animationDelay: `${-i * 1.6}s` }}>
                  <span className="glow-card__glow" aria-hidden />
                  <span className="glow-card__ring" aria-hidden />
                  <div className="glow-card__content">
                    <p className="font-heading text-3xl md:text-4xl font-medium text-white leading-none tabular-nums">{s.v}</p>
                    <div className="mt-3">
                      <span className="block text-sm text-white font-medium">{s.l}</span>
                      <span className="block mt-1 text-[12px] text-dark">{s.s}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Projetos */}
      <section className="bg-bg px-6 pb-24" aria-label="Lista de projetos">
        <div className="max-w-[1100px] mx-auto">
          {/* Caso em destaque */}
          <AnimateOnScroll>
            <Link
              href={`/portfolio/${featured.slug}`}
              style={ACCENTS[featured.accent]}
              className="group relative grid md:grid-cols-2 overflow-hidden rounded-[28px] border border-white/10 bg-bg-card
                         transition-colors duration-300 hover:border-accent/50
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span className="absolute top-5 left-6 z-10 font-heading text-xs tabular-nums text-white/40">01</span>
              <div className="relative h-[280px] md:h-auto md:min-h-[420px] overflow-hidden bg-gradient-to-br from-[#1a1d24] via-[#131417] to-[#0F0F0E]">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
                  <ProjectCover project={featured} priority variant="card" />
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent/90 mb-4">Em destaque · {featured.category} · {featured.year}</p>
                <h2 className="text-white font-heading text-2xl md:text-[30px] font-medium tracking-[-0.01em] leading-tight">{featured.client}</h2>
                <p className="mt-4 text-muted text-sm leading-relaxed max-w-md">{featured.intro}</p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {featured.highlights.map((h) => (
                    <span key={h.label} className="inline-flex items-baseline gap-1.5 rounded-full border border-accent/25 bg-accent/[0.06] px-3 py-1.5">
                      <span className="font-heading text-sm font-medium text-white tabular-nums">{h.metric}</span>
                      <span className="text-[11px] text-accent">{h.label}</span>
                    </span>
                  ))}
                </div>

                <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  Ver caso completo
                  <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </AnimateOnScroll>

          {/* Restantes projetos + cartão de conversão */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {rest.map((p, i) => (
              <AnimateOnScroll key={p.slug} delay={0.1 + i * 0.1}>
                <Link
                  href={`/portfolio/${p.slug}`}
                  style={ACCENTS[p.accent]}
                  className="group relative flex flex-col h-full overflow-hidden rounded-[24px] border border-white/10 bg-bg-card
                             transition-colors duration-300 hover:border-accent/50
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <span className="absolute top-4 left-5 z-10 font-heading text-xs tabular-nums text-white/40">0{i + 2}</span>
                  <div className="relative h-[240px] overflow-hidden bg-gradient-to-br from-[#1a1d24] via-[#131417] to-[#0F0F0E]">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                      <ProjectCover project={p} variant="card" />
                    </div>
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: 'radial-gradient(120% 80% at 50% 115%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }}
                    />
                  </div>
                  <div className="p-7">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-accent/90 mb-3">{p.category} · {p.year}</p>
                    <h3 className="text-white font-heading text-xl font-medium tracking-[-0.01em]">{p.client}</h3>
                    <p className="mt-2.5 text-muted text-sm leading-relaxed">{p.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-white/90">
                      Ver caso
                      <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}

            {/* Cartão de conversão — o próximo projeto */}
            <AnimateOnScroll delay={0.1 + rest.length * 0.1}>
              <div className="relative flex h-full min-h-[260px] flex-col justify-center overflow-hidden rounded-[24px] border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
                <div
                  aria-hidden
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 100%, rgba(127,168,217,0.16), transparent 70%)' }}
                />
                <div className="relative">
                  <h3 className="text-white font-heading text-xl font-medium tracking-[-0.01em]">O teu negócio é o próximo</h3>
                  <p className="mt-2.5 text-muted text-sm leading-relaxed max-w-xs mx-auto">
                    Conta-me o que precisas. Orçamento e diagnóstico gratuitos, resposta em menos de 2 horas.
                  </p>
                  <div className="mt-7 flex justify-center">
                    <GlowButton href="/contacto">Pedir orçamento grátis</GlowButton>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <p className="mt-10 text-center text-[11px] text-dark max-w-md mx-auto">
            Métricas reais dos projetos Element Group (PageSpeed, posição no Google e ranking local). Sem números inflacionados.
          </p>
        </div>
      </section>
    </main>
  )
}
