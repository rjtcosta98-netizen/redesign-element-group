import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import SpotlightCard from '@/components/ui/SpotlightCard'
import { PROJECTS, ACCENTS, ProjectCover } from '@/app/portfolio/projects'

// Secção de portefólio da homepage — alimentada pela fonte única de verdade
// (app/portfolio/projects.tsx). Mostra o caso em destaque + uma seleção,
// com link para o portefólio completo. Cada card abre o respetivo case study.
export default function Portfolio() {
  const [featured, ...rest] = PROJECTS
  // Teaser: destaque + 2. Eram 4, e a home repetia meio portefólio antes de
  // chegar ao próximo argumento — o catálogo completo vive em /portfolio.
  const cards = rest.slice(0, 2)

  return (
    <section className="bg-bg px-6 py-24 border-t border-white/10" aria-labelledby="portfolio">
      <div className="max-w-[1100px] mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Portefólio</p>
          <h2 id="portfolio" className="text-white">Trabalhos que falam por nós</h2>
          <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
            Websites, lojas online e projetos de SEO que entregam resultados reais —
            mais velocidade, mais tráfego e mais clientes para PMEs em Portugal.
          </p>
        </AnimateOnScroll>

        {/* Caso em destaque */}
        <AnimateOnScroll>
          <Link
            href={`/portfolio/${featured.slug}`}
            style={ACCENTS[featured.accent]}
            className="group relative grid md:grid-cols-2 overflow-hidden rounded-[24px] border border-white/10 bg-bg-card
                       transition-colors duration-300 hover:border-accent/50
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <div className="relative h-[260px] md:h-auto md:min-h-[360px] overflow-hidden bg-gradient-to-br from-[#1a1d24] via-[#131417] to-[#0F0F0E]">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]">
                <ProjectCover project={featured} variant="card" />
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.18em] text-accent/90 mb-4">Em destaque · {featured.category}</p>
              <h3 className="text-white font-heading text-2xl md:text-[28px] font-medium tracking-[-0.01em] leading-tight">
                {featured.client}
              </h3>
              <p className="mt-4 text-muted text-sm leading-relaxed max-w-md">{featured.intro}</p>

              {/* A primeira métrica em tamanho de manchete: o resultado é o
                  argumento de venda, e em corpo 14 cinzento ninguém o lia. */}
              <div className="mt-7">
                <p className="font-heading text-white text-[40px] leading-none font-medium tabular-nums tracking-[-0.02em]">
                  {featured.highlights[0].metric}
                </p>
                <p className="mt-2 text-[13px] text-accent">{featured.highlights[0].label}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {featured.highlights.slice(1).map((h) => (
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

        {/* Restantes casos */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {cards.map((p, i) => (
            <AnimateOnScroll key={p.slug} delay={0.1 + i * 0.1}>
              <SpotlightCard className="h-full rounded-[24px]" style={ACCENTS[p.accent]}>
              <Link
                href={`/portfolio/${p.slug}`}
                className="group relative flex flex-col h-full overflow-hidden rounded-[24px] border border-white/10 bg-bg-card
                           transition-colors duration-300 hover:border-accent/50
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <div className="relative h-[200px] overflow-hidden bg-gradient-to-br from-[#1a1d24] via-[#131417] to-[#0F0F0E]">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                    <ProjectCover project={p} variant="card" />
                  </div>
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'radial-gradient(120% 80% at 50% 115%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent/90 mb-3">{p.category}</p>
                  <h3 className="text-white font-heading text-xl font-medium tracking-[-0.01em] leading-snug">{p.client}</h3>
                  <p className="mt-2.5 text-muted text-sm leading-relaxed">{p.summary}</p>

                  {/* Resultado em número, alinhado no fundo de todos os cartões
                      para formarem uma linha limpa mesmo com resumos de tamanhos diferentes. */}
                  <div className="mt-auto pt-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-heading text-[28px] leading-none font-medium text-white tabular-nums tracking-[-0.02em]">
                        {p.highlights[0].metric}
                      </p>
                      <p className="mt-1.5 text-[11px] text-muted leading-snug max-w-[190px]">{p.highlights[0].label}</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 text-[12px] text-accent opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      Ver caso
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
              </SpotlightCard>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Ver portefólio completo + conversão */}
        <AnimateOnScroll className="mt-12 flex flex-col items-center gap-5 text-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-1.5 rounded-pill bg-white text-black
                       text-sm font-medium px-6 py-3 transition-all hover:bg-white/90"
          >
            Ver todo o portefólio
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
          </Link>
          <p className="text-[11px] text-dark max-w-md">
            Casos reais Element Group — métricas verificáveis (PageSpeed, tráfego orgânico e ranking no Google).
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
