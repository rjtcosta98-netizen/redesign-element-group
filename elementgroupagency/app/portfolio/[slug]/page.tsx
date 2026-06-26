import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import PainPoints from '@/components/servicos/PainPoints'
import DeviceShowcase from '@/components/portfolio/DeviceShowcase'
import ResultsFlow from '@/components/servicos/ResultsFlow'
import JsonLd from '@/components/JsonLd'
import { caseStudySchema, breadcrumbSchema } from '@/lib/seo'
import { PROJECTS, ACCENTS, getProject, ProjectCover } from '../projects'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return { title: 'Projeto não encontrado — Element Group' }
  const ogImage = p.showcase?.desktop ?? p.cover.src
  return {
    title: `${p.client} — ${p.category} | Element Group`,
    description: p.resultLine ?? p.summary,
    alternates: { canonical: `/portfolio/${p.slug}` },
    openGraph: {
      title: `${p.client} — ${p.category}`,
      description: p.resultLine ?? p.summary,
      url: `/portfolio/${p.slug}`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  }
}

const Check = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const resultLine = project.resultLine ?? project.summary
  const setor = project.snapshot?.industria ?? project.category
  const servicosLabel = project.servicesUsed?.map((s) => s.label).join(' · ') ?? project.category
  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 2)
  const schemaImage = project.showcase?.desktop ?? project.cover.src

  return (
    <main style={ACCENTS[project.accent]}>
      <JsonLd
        data={[
          caseStudySchema({
            slug: project.slug,
            client: project.client,
            category: project.category,
            description: resultLine,
            year: project.year,
            image: schemaImage,
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Portefólio', path: '/portfolio' },
            { name: project.client, path: `/portfolio/${project.slug}` },
          ]),
        ]}
      />
      {/* ── 1 · HERO DO CASO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-bg pt-32 pb-16 px-6">
        <div aria-hidden className="absolute top-0 right-0 w-[640px] h-[640px] pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 25%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }} />

        <div className="relative max-w-[1100px] mx-auto">
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors mb-10">
            <span aria-hidden>←</span> Portefólio
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Copy + métricas */}
            <AnimateOnScroll direction="left">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent/90 mb-4">{project.category} · {project.year}</p>
              <h1 className="text-white tracking-[-0.03em] leading-[1.06]">{resultLine}</h1>
              <p className="mt-5 text-muted leading-relaxed max-w-xl">{project.intro}</p>

              {/* Métricas-chave em destaque — 3 numa linha, cards com glow na borda */}
              <div className="mt-9 grid grid-cols-3 gap-2.5 sm:gap-4">
                {project.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.05] p-3 sm:p-5
                               shadow-[0_0_30px_-12px_rgb(var(--accent-rgb)/0.6)]"
                  >
                    <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent-rgb) / 0.6), transparent)' }} />
                    <div className="font-heading text-lg sm:text-2xl md:text-3xl font-medium text-white leading-none tabular-nums">{h.metric}</div>
                    <p className="mt-2 text-[10px] sm:text-[12px] text-muted leading-snug">{h.label}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Visual forte */}
            <AnimateOnScroll direction="right">
              <div className="relative h-[300px] sm:h-[380px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1a1d24] via-[#131417] to-[#0F0F0E]">
                <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-[460px] h-[460px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.18), transparent 65%)' }} />
                <ProjectCover project={project} priority />
              </div>
            </AnimateOnScroll>
          </div>

          {project.url && (
            <div className="mt-8 lg:mt-10">
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 min-h-[44px] text-sm text-accent hover:text-white transition-colors">
                {project.urlLabel ?? 'Ver site ao vivo'}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 17 7M9 7h8v8" /></svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── 2 · FICHA RÁPIDA (painel técnico com marcas de registo) ── */}
      <section className="bg-bg px-6 py-12">
        <div className="relative max-w-[1100px] mx-auto overflow-hidden rounded-[24px] border border-white/10
                        bg-gradient-to-br from-[#14171d] via-[#101216] to-[#0c0d11]
                        shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgb(255_255_255/0.05)]">
          {/* glow suave no canto superior-esquerdo */}
          <div aria-hidden className="absolute -top-16 -left-16 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }} />
          {/* marcas de registo nos cantos */}
          <span aria-hidden className="absolute top-3 left-3 w-4 h-4 border-l border-t border-white/25" />
          <span aria-hidden className="absolute top-3 right-3 w-4 h-4 border-r border-t border-white/25" />
          <span aria-hidden className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-white/25" />
          <span aria-hidden className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/25" />
          {/* ponto de acento na aresta esquerda */}
          <span aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent-rgb)/0.9)]" />

          <dl className="relative grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-white/10 p-3 sm:p-5">
            {[
              { k: 'Cliente', v: project.client },
              { k: 'Setor', v: setor },
              { k: 'Serviços', v: servicosLabel },
              { k: 'Ano', v: project.year },
            ].map((row) => (
              <div key={row.k} className="px-4 sm:px-7 py-6">
                <dt className="text-[10px] uppercase tracking-[0.18em] text-dark mb-2">{row.k}</dt>
                <dd className="text-sm text-white/90 leading-snug">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 3 · O DESAFIO ────────────────────────────────────────── */}
      {project.challengePoints && project.challengePoints.length > 0 ? (
        <PainPoints
          eyebrow="O ponto de partida"
          title={project.challengeHeadline ?? 'O desafio'}
          intro={project.challenge}
          items={project.challengePoints}
        />
      ) : (
        <section className="bg-bg border-t border-white/10 py-20 px-6">
          <div className="max-w-[820px] mx-auto">
            <AnimateOnScroll>
              <p className="text-[11px] uppercase tracking-[0.2em] text-dark mb-4">O ponto de partida</p>
              <h2 className="text-white">O desafio</h2>
              <p className="mt-6 text-white/85 text-lg leading-relaxed">{project.challenge}</p>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* ── 4 · A ABORDAGEM ──────────────────────────────────────── */}
      <section className="bg-bg border-t border-white/10 py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <AnimateOnScroll className="max-w-[640px] mb-12">
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">A abordagem</p>
            <h2 className="text-white">O que fizemos</h2>
            <p className="mt-6 text-white/85 leading-relaxed">{project.solution}</p>
          </AnimateOnScroll>

          {/* Frentes de ataque — glow-cards de borda animada (ação → problema resolvido) */}
          {project.approach && project.approach.length > 0 && (
            <div className="grid md:grid-cols-3 gap-5">
              {project.approach.map((a, i) => (
                <AnimateOnScroll key={a.title} delay={i * 0.08}>
                  <div className="glow-card h-full">
                    <span aria-hidden className="glow-card__wave" />
                    <span aria-hidden className="glow-card__ring" />
                    <div className="glow-card__content h-full p-6">
                      <span className="font-heading text-sm tabular-nums text-accent">0{i + 1}</span>
                      <h3 className="mt-3 text-white font-heading text-lg font-medium tracking-[-0.01em]">{a.title}</h3>
                      <p className="mt-2.5 text-muted text-sm leading-relaxed">{a.desc}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          )}

          {/* Entregue neste projeto — detalhe completo (chips) */}
          <AnimateOnScroll className="mt-9">
            <p className="text-[11px] uppercase tracking-[0.2em] text-dark mb-4">Entregue neste projeto</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {project.scope.map((s) => (
                <li key={s} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-bg-card px-4 py-3 text-[13px] text-white/80">
                  <span className="text-accent shrink-0"><Check /></span>
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 5 · DESTAQUES VISUAIS (showcase desktop+mobile → galeria) ─ */}
      {(project.showcase || (project.gallery && project.gallery.length > 0)) && (
        <section className="relative overflow-hidden bg-bg border-t border-white/10 py-20 px-6">
          <div className="max-w-[1100px] mx-auto">
            <AnimateOnScroll className="mb-12">
              <p className="text-[11px] uppercase tracking-[0.2em] text-dark mb-3">Destaques visuais</p>
              <h2 className="text-white">Por dentro do projeto</h2>
            </AnimateOnScroll>

            {/* Mockups desktop + telemóvel */}
            {project.showcase && (
              <AnimateOnScroll className="mb-14">
                <DeviceShowcase
                  desktop={project.showcase.desktop}
                  mobile={project.showcase.mobile}
                  alt={`Website ${project.client}`}
                  url={project.urlLabel}
                />
              </AnimateOnScroll>
            )}

            {/* Galeria */}
            {project.gallery && project.gallery.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
              {project.gallery.map((g, i) => (
                <AnimateOnScroll key={g.src} delay={(i % 2) * 0.1}>
                  <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
                    {g.frame === 'plain' ? (
                      /* moldura branded — assets de marca, sem cromo de browser */
                      <div className="relative w-full aspect-[16/10]">
                        <span aria-hidden className="absolute top-2.5 left-2.5 z-10 w-3.5 h-3.5 border-l border-t border-white/25" />
                        <span aria-hidden className="absolute top-2.5 right-2.5 z-10 w-3.5 h-3.5 border-r border-t border-white/25" />
                        <span aria-hidden className="absolute bottom-2.5 left-2.5 z-10 w-3.5 h-3.5 border-l border-b border-white/25" />
                        <span aria-hidden className="absolute bottom-2.5 right-2.5 z-10 w-3.5 h-3.5 border-r border-b border-white/25" />
                        <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 90vw, 480px" className="object-contain object-center p-6" />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/10 bg-white/[0.03]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                        </div>
                        <div className="relative w-full aspect-[16/10]">
                          <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 90vw, 480px" className="object-cover object-top" />
                        </div>
                      </>
                    )}
                    <figcaption className="px-4 py-3 text-[12px] text-muted">{g.alt}</figcaption>
                  </figure>
                </AnimateOnScroll>
              ))}
            </div>
            )}
          </div>
        </section>
      )}

      {/* ── 6 · O QUE MUDOU (secção-chave) ───────────────────────── */}
      <section className="relative overflow-hidden bg-bg border-t border-white/10 py-20">
        <div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-0 w-[760px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgb(var(--accent-rgb) / 0.12), transparent 65%)' }} />

        {project.before && project.before.length > 0 && project.engineChips ? (
          /* Fluxo antes → Element Group → depois (transformação visualizada) */
          <ResultsFlow
            eyebrow="Resultados"
            title="O que mudou"
            subtitle={project.snapshot?.resultado ? `${project.snapshot.resultado}.` : undefined}
            before={project.before}
            engineChips={project.engineChips}
            results={project.highlights}
          />
        ) : (
          /* Fallback: cards de métrica */
          <div className="relative max-w-[1000px] mx-auto px-6">
            <AnimateOnScroll className="text-center mb-12 max-w-[640px] mx-auto">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Resultados</p>
              <h2 className="text-white">O que mudou</h2>
              {project.snapshot?.resultado && (
                <p className="mt-5 text-muted leading-relaxed">{project.snapshot.resultado}.</p>
              )}
            </AnimateOnScroll>
            <div className="grid sm:grid-cols-3 gap-5">
              {project.highlights.map((h, i) => (
                <AnimateOnScroll key={h.label} delay={i * 0.08}>
                  <div className="relative overflow-hidden rounded-[22px] border border-accent/25 bg-accent/[0.06] p-7 text-center h-full">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent-rgb) / 0.55), transparent)' }} />
                    <div className="font-heading text-4xl md:text-5xl font-medium text-white leading-none tabular-nums">{h.metric}</div>
                    <p className="mt-3 text-[13px] text-accent leading-snug">{h.label}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── 7 · TESTEMUNHO(S) ────────────────────────────────────── */}
      {(project.quote || (project.quotes && project.quotes.length > 0)) && (
        <section className="bg-bg border-t border-white/10 py-20 px-6">
          {project.quotes && project.quotes.length > 0 ? (
            /* Vários testemunhos — grelha de cards */
            <div className="max-w-[1100px] mx-auto">
              <AnimateOnScroll className="mb-10 text-center max-w-[640px] mx-auto">
                <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-3">Testemunhos</p>
                <h2 className="text-white">O que dizem sobre o projeto</h2>
              </AnimateOnScroll>
              <div className="grid md:grid-cols-3 gap-5">
                {project.quotes.map((q, i) => (
                  <AnimateOnScroll key={q.author} delay={i * 0.08}>
                    <figure className="relative h-full flex flex-col overflow-hidden rounded-[22px] border border-white/10
                                       bg-gradient-to-br from-[#16191f] to-[#0d0e12] p-6
                                       shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgb(255_255_255/0.05)]">
                      <span aria-hidden className="block font-heading text-4xl leading-none text-accent/55">“</span>
                      <blockquote className="-mt-1 flex-1 text-white/90 text-sm leading-relaxed">{q.text}</blockquote>
                      <figcaption className="mt-6 flex items-center gap-3">
                        {q.avatar ? (
                          <Image src={q.avatar} alt={q.author} width={40} height={40} className="w-10 h-10 shrink-0 rounded-full object-cover border border-white/15" />
                        ) : (
                          <span aria-hidden className="grid place-items-center w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-accent/80 to-[#2f4f7a] text-white font-heading font-semibold text-[13px]">
                            {q.author.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
                          </span>
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="block text-white font-medium text-[13px] leading-tight">{q.author}</span>
                          <span className="block text-muted text-[12px] leading-tight">{q.role}</span>
                        </span>
                        {q.url && (
                          <a href={q.url} target="_blank" rel="noopener noreferrer" aria-label="Ver avaliação no Google" className="shrink-0 grid place-items-center w-9 h-9 rounded-full text-accent hover:text-white transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 11v2.9h4.1c-.18 1.07-1.27 3.14-4.1 3.14A4.54 4.54 0 0 1 12 7.5c1.28 0 2.14.55 2.63 1.02l1.9-1.83A6.9 6.9 0 0 0 12 4.6a7.4 7.4 0 1 0 0 14.8c4.27 0 7.1-3 7.1-7.23 0-.49-.05-.86-.12-1.23L12 11Z" /></svg>
                          </a>
                        )}
                      </figcaption>
                    </figure>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          ) : project.quote ? (
            /* Testemunho único — card grande */
            <figure className="relative max-w-[820px] mx-auto overflow-hidden rounded-[24px] border border-white/10
                               bg-gradient-to-br from-[#16191f] to-[#0d0e12] p-8 md:p-10
                               shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9),inset_0_1px_0_rgb(255_255_255/0.05)]">
              {/* glow de acento no canto superior-esquerdo */}
              <div aria-hidden className="absolute -top-14 -left-14 w-52 h-52 pointer-events-none" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.18), transparent 65%)' }} />
              {/* aspa */}
              <span aria-hidden className="relative block font-heading text-5xl leading-none text-accent/55">“</span>

              <blockquote className="relative -mt-2 text-white font-heading font-medium text-lg md:text-xl leading-relaxed tracking-[-0.01em]">
                {project.quote.text}
              </blockquote>

              <figcaption className="relative mt-8 flex items-center gap-3.5">
                {/* avatar: foto real se existir, senão iniciais */}
                {project.quote.avatar ? (
                  <Image src={project.quote.avatar} alt={project.quote.author} width={44} height={44} className="w-11 h-11 shrink-0 rounded-full object-cover border border-white/15" />
                ) : (
                  <span aria-hidden className="grid place-items-center w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-accent/80 to-[#2f4f7a] text-white font-heading font-semibold text-sm shadow-[0_8px_20px_-6px_rgb(var(--accent-rgb)/0.7)]">
                    {project.quote.author.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block text-white font-medium text-sm leading-tight">{project.quote.author}</span>
                  <span className="block text-muted text-[13px] leading-tight">{project.quote.role}</span>
                </span>
                {project.quote.url && (
                  <a href={project.quote.url} target="_blank" rel="noopener noreferrer" aria-label="Ver avaliação no Google" className="ml-auto shrink-0 inline-flex items-center gap-1.5 min-h-[44px] text-[12px] text-accent hover:text-white transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 11v2.9h4.1c-.18 1.07-1.27 3.14-4.1 3.14A4.54 4.54 0 0 1 12 7.5c1.28 0 2.14.55 2.63 1.02l1.9-1.83A6.9 6.9 0 0 0 12 4.6a7.4 7.4 0 1 0 0 14.8c4.27 0 7.1-3 7.1-7.23 0-.49-.05-.86-.12-1.23L12 11Z" /></svg>
                    <span className="hidden sm:inline">Ver no Google</span>
                  </a>
                )}
              </figcaption>
            </figure>
          ) : null}

          {/* CTA no pico de convicção — apanha quem já decidiu */}
          <div className="mt-10 flex justify-center">
            <GlowButton href="/contacto">Quero resultados assim para o meu negócio</GlowButton>
          </div>
        </section>
      )}

      {/* ── 8 · SERVIÇOS USADOS (cross-link) ─────────────────────── */}
      {project.servicesUsed && project.servicesUsed.length > 0 && (
        <section className="bg-bg border-t border-white/10 py-16 px-6">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-[11px] uppercase tracking-[0.2em] text-dark mb-5 text-center">Serviços usados neste projeto</p>
            <div className="flex flex-wrap justify-center gap-3">
              {project.servicesUsed.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group inline-flex items-center gap-2 rounded-pill border border-white/10 bg-bg-card px-5 py-3 min-h-[44px] text-sm text-white/90 hover:border-accent/50 hover:text-white transition-colors"
                >
                  {s.label}
                  <span className="text-accent transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9 · CTA FINAL ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-24 px-6">
        <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[760px] h-[420px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 100%, rgb(var(--accent-rgb) / 0.20), transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">O próximo passo</p>
            <h2 className="text-white">Tens um desafio parecido? Vamos falar.</h2>
            <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
              Conta-me o que precisas — respondo pessoalmente em menos de 2 horas, sem compromisso.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <GlowButton href="/contacto">Pedir orçamento grátis</GlowButton>
              <Link href="mailto:info@elementgroup.pt" className="text-sm text-white/70 hover:text-white transition-colors">
                ou escreve-me para <span className="text-white/90 underline underline-offset-4">info@elementgroup.pt</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 10 · CASOS RELACIONADOS ──────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-bg border-t border-white/10 py-20 px-6">
          <div className="max-w-[1100px] mx-auto">
            <p className="text-[11px] uppercase tracking-[0.2em] text-dark mb-8">Mais casos</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  style={ACCENTS[p.accent]}
                  className="group flex items-center justify-between gap-6 rounded-[24px] border border-white/10 bg-bg-card p-7
                             transition-colors duration-300 hover:border-accent/50
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-accent/90 mb-1.5">{p.category}</p>
                    <h3 className="text-white font-heading text-xl font-medium tracking-[-0.01em]">{p.client}</h3>
                    <p className="mt-2 text-muted text-sm leading-relaxed max-w-xs">{p.summary}</p>
                  </div>
                  <span className="shrink-0 grid place-items-center w-11 h-11 rounded-full border border-accent/30 bg-accent/10 text-accent transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
