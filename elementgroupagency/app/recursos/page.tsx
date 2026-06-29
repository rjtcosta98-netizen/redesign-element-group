import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import NewsletterSignup from '@/components/blog/NewsletterSignup'
import ResourceList from '@/components/resources/ResourceList'
import { RESOURCES, RES_TYPES } from '@/lib/resources'


// Transição recurso → serviço: cada chip na sua cor (mesmo sistema cromático do site).
const SERVICE_LINKS: { label: string; href: string; color: string; rgb: string }[] = [
  { label: 'Websites & Lojas Online', href: '/servicos/web',       color: '#7FA8D9', rgb: '127 168 217' },
  { label: 'SEO & Otimização',        href: '/servicos/seo',            color: '#6FB39A', rgb: '111 179 154' },
  { label: 'Social Media',            href: '/servicos/social',   color: '#A98AD4', rgb: '169 138 212' },
  { label: 'Planos Mensais',          href: '/servicos/planos-mensais', color: '#D7B074', rgb: '215 176 116' },
]

export const metadata: Metadata = {
  alternates: { canonical: '/recursos' },
  title: 'Recursos gratuitos — Element Group',
  description:
    'Biblioteca de guias, checklists, templates e ferramentas gratuitas para tirares mais do teu site, SEO e redes sociais. Para PMEs em Portugal.',
  keywords: ['recursos gratuitos marketing digital', 'guias SEO Portugal', 'checklists website PME', 'templates gratuitos', 'Element Group recursos'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Recursos gratuitos — Element Group',
    description: 'Guias, checklists, templates e ferramentas gratuitas para melhorares o teu site, SEO e redes sociais.',
    url: '/recursos',
    locale: 'pt_PT',
    siteName: 'Element Group',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Recursos Gratuitos Element Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursos gratuitos — Element Group',
    description: 'Guias, checklists e ferramentas gratuitas para o teu site, SEO e redes sociais.',
    images: ['/opengraph-image'],
  },
}

export default function RecursosPage() {
  const [featured, ...rest] = RESOURCES

  return (
    <main>
      {/* 1 · Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-12 px-6">
        <div aria-hidden className="absolute top-10 left-1/2 -translate-x-1/2 w-[680px] h-[480px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.15), transparent 62%)' }} />
        <div className="relative max-w-[760px] mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Recursos</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Recursos gratuitos para a tua <span className="text-accent">presença online</span>
            </h1>
            <p className="mt-5 text-muted leading-relaxed">
              Guias, checklists, templates e ferramentas — práticos e sem custo — para tirares
              mais do teu site, SEO e redes sociais. A biblioteca está a crescer.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2 · Recurso em destaque (gated + captura de email) */}
      <section className="bg-bg px-6 pb-16">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[24px] border border-accent/30 bg-gradient-to-br from-[#1c2738] via-[#161c26] to-[#0f1318] p-8 md:p-12">
              <div aria-hidden className="absolute -top-20 left-1/4 w-[420px] h-[420px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.22), transparent 60%)' }} />
              <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent font-medium">Em destaque</span>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-accent/90">{featured.type}</span>
                  </div>
                  <h2 className="text-white font-heading text-2xl md:text-[30px] font-medium leading-tight tracking-[-0.02em]">{featured.title}</h2>
                  <p className="mt-3 text-muted leading-relaxed">{featured.description}</p>
                  <div className="mt-7">
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] px-4 py-2 text-sm font-medium text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                      Brevemente
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] text-dark">Estamos a preparar este recurso — disponível em breve.</p>
                </div>

                {/* Teaser real da checklist: itens nítidos + zona bloqueada atrás do email */}
                {featured.preview && (() => {
                  const shown = featured.preview.slice(0, 5)        // 4–5 pontos reais visíveis
                  const teased = featured.preview.slice(5, 8)       // espreitam, desfocados
                  const locked = Math.max(0, (featured.previewTotal ?? featured.preview.length) - shown.length)
                  return (
                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0f13]/85 backdrop-blur-sm shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
                      {/* cabeçalho tipo dossiê */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-muted">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                          Amostra da checklist
                        </span>
                        <span className="text-[11px] tabular-nums text-dark">5 / {featured.previewTotal ?? featured.preview.length}</span>
                      </div>

                      <ul className="px-5 pt-5 space-y-3.5">
                        {shown.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[13.5px] text-white/90 leading-snug">
                            <span className="grid place-items-center w-5 h-5 shrink-0 mt-px rounded-md bg-gradient-to-br from-accent to-[var(--accent-mid)] text-black">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      {/* zona bloqueada — pontos reais a espreitar, desfocados, com selo */}
                      <div className="relative mt-3.5 px-5 pb-5">
                        <ul aria-hidden className="space-y-3.5 blur-[4px] opacity-55 select-none pointer-events-none">
                          {teased.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-[13.5px] text-white/80 leading-snug">
                              <span className="grid place-items-center w-5 h-5 shrink-0 mt-px rounded-md bg-white/15">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><path d="M5 12l5 5 9-10" /></svg>
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[#0d0f13]/10 via-[#0d0f13]/70 to-[#0d0f13]" />
                        <div className="absolute inset-x-0 bottom-4 flex justify-center">
                          <span className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/12 px-4 py-1.5 text-[12px] font-medium text-accent shadow-[0_0_24px_-6px_rgb(var(--accent-rgb)_/_0.6)]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                            +{locked} pontos · brevemente
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 5 · Legenda gated vs livre */}
      <section className="bg-bg px-6 pb-10">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] text-dark">
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full border border-accent/25 bg-accent/[0.08] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent">Acesso livre</span>
            abre na hora, sem email
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              Brevemente
            </span>
            disponível em breve
          </span>
        </div>
      </section>

      {/* 3 + 4 · Filtros + grelha */}
      <section className="bg-bg px-6 pb-24 pt-8 border-t border-white/10">
        <div className="max-w-[1100px] mx-auto">
          <ResourceList resources={rest} types={RES_TYPES} />
        </div>
      </section>

      {/* 5.5 · Transição recurso → serviço (capta intenção de compra, não email) */}
      <section className="bg-bg px-6 py-20 border-t border-white/10" aria-labelledby="feito-por-ti">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#161a22] via-[#121419] to-[#0d0e11] p-8 md:p-12">
              <div aria-hidden className="absolute -top-24 -right-16 w-[460px] h-[460px] pointer-events-none" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(127,168,217,0.14), transparent 62%)' }} />

              <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
                {/* Copy + CTA */}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-4">Do gratuito ao feito-por-ti</p>
                  <h2 id="feito-por-ti" className="text-white font-heading text-3xl md:text-[34px] font-medium leading-tight tracking-[-0.02em]">
                    Já tens o guia. Queres o <span className="text-accent">resultado</span>?
                  </h2>
                  <p className="mt-5 text-muted leading-relaxed max-w-md">
                    Os recursos levam-te longe — mas o teu tempo rende mais a tratar do teu negócio.
                    Quando quiseres pôr tudo isto a funcionar sem o trabalho todo, trato eu: do site ao SEO às redes.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                    <GlowButton href="/contacto">Pedir orçamento grátis</GlowButton>
                    <span className="text-[12px] text-dark">Resposta em &lt; 2h · diagnóstico gratuito</span>
                  </div>
                </div>

                {/* Serviços — cada um na sua cor */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      style={{ '--accent': s.color, '--accent-rgb': s.rgb } as CSSProperties}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5
                                 transition-colors hover:border-accent/45 hover:bg-accent/[0.05]
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span aria-hidden className="w-2.5 h-2.5 shrink-0 rounded-full" style={{ background: s.color, boxShadow: `0 0 10px ${s.color}` }} />
                        <span className="text-sm text-white/90 group-hover:text-white transition-colors truncate">{s.label}</span>
                      </span>
                      <span aria-hidden className="text-dark group-hover:text-accent transition-all group-hover:translate-x-0.5">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 6 · Newsletter */}
      <section className="bg-bg px-6 pb-28">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll>
            <NewsletterSignup variant="resources" />
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
