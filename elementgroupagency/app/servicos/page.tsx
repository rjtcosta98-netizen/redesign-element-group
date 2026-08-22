import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import JsonLd from '@/components/JsonLd'
import { breadcrumbSchema, SITE } from '@/lib/seo'
import CorporateBlock from '@/components/servicos/CorporateBlock'
import { FAMILIES, PLANS_LINK } from '@/lib/servicos'

export const dynamic = 'force-static'

const CTA = '/contacto'

export const metadata: Metadata = {
  title: 'Serviços — Element Group',
  description:
    'Estratégia, presença online, automação e IA num sistema simples e orientado a resultados. Websites, SEO, visibilidade em motores de IA, software à medida e planos mensais.',
  keywords: ['agência digital Portugal', 'serviços marketing digital PME', 'criação de websites', 'SEO Portugal', 'automação IA empresas', 'Element Group serviços'],
  alternates: { canonical: '/servicos' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Serviços — Element Group',
    description: 'Estratégia, presença online, automação e IA num sistema simples e orientado a resultados.',
    url: '/servicos',
    locale: 'pt_PT',
    siteName: 'Element Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serviços — Element Group',
    description: 'Estratégia, presença online, automação e IA num sistema simples e orientado a resultados.',
  },
}

// O percurso, não a lista. É o que separa "vendo serviços" de "vendo uma
// transformação" — e é a única secção do hub que explica porque é que os
// serviços fazem sentido juntos.
const JOURNEY = [
  { n: '01', title: 'Diagnóstico', desc: 'Meia jornada a olhar para o negócio. No fim sabes o que corrigir, por que ordem, e o que automatizar primeiro.' },
  { n: '02', title: 'Construção', desc: 'O site, a loja ou o software que faltava. Desenhado à medida, sem templates, e pensado para o cliente conseguir comprar ou marcar.' },
  { n: '03', title: 'Visibilidade', desc: 'Aparecer onde as pessoas procuram — no Google, e cada vez mais dentro das respostas do ChatGPT e do Perplexity.' },
  { n: '04', title: 'Plano mensal', desc: 'O que impede tudo isto de parar seis meses depois. É aqui que os resultados se acumulam em vez de se repetirem.' },
]

export default function ServicosHubPage() {
  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Serviços', path: '/servicos' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${SITE.url}/servicos#page`,
            url: `${SITE.url}/servicos`,
            name: 'Serviços — Element Group',
            description:
              'Estratégia, presença online, automação e IA num sistema simples e orientado a resultados.',
            isPartOf: { '@id': `${SITE.url}/#website` },
            about: FAMILIES.flatMap((f) =>
              f.services.map((s) => ({ '@type': 'Service', name: s.label, url: `${SITE.url}${s.href}` })),
            ),
          },
        ]}
      />

      {/* Hero — posicionamento, não lista de serviços */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[680px] h-[680px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(127,168,217,0.14), transparent 62%)' }}
        />
        <div className="relative max-w-[880px] mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">Serviços</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Não vendo serviços soltos. Construo o <span className="text-accent">sistema</span> que faz o negócio crescer.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-2xl mx-auto">
              Estratégia, presença online, automação e IA — num sistema simples e orientado a resultados.
              Cada peça faz sentido sozinha, mas é quando trabalham juntas que o negócio muda de patamar.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href={CTA}>Marcar chamada gratuita</GlowButton>
              <Link
                href="#familias"
                className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors"
              >
                Ver todos os serviços
                <span className="transition-transform group-hover:translate-y-0.5" aria-hidden>↓</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* O percurso */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="percurso">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Como encaixa</p>
            <h2 id="percurso" className="text-white">Quatro passos, pela ordem que funciona</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Não tens de fazer os quatro, nem todos ao mesmo tempo. Mas esta é a ordem em que cada
              um torna o seguinte mais barato e mais eficaz.
            </p>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOURNEY.map((step, i) => (
              <AnimateOnScroll key={step.n} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-bg-card p-6">
                  <span className="font-heading text-accent text-sm tabular-nums">{step.n}</span>
                  <h3 className="mt-3 text-white font-heading text-lg font-medium tracking-[-0.01em]">{step.title}</h3>
                  <p className="mt-2.5 text-[13px] text-muted leading-relaxed">{step.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* As quatro famílias */}
      <section id="familias" className="bg-bg border-t border-white/10 py-24 px-6 scroll-mt-24" aria-labelledby="familias-h">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">O catálogo</p>
            <h2 id="familias-h" className="text-white">Quatro famílias, quatro perguntas</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Cada família responde a uma frase que já ouvi muitas vezes na primeira chamada.
              Valores sem IVA, e sempre um intervalo — o número exato fecha-se depois do diagnóstico.
            </p>
          </AnimateOnScroll>

          <div className="grid lg:grid-cols-2 gap-4">
            {FAMILIES.map((family, i) => (
              <AnimateOnScroll key={family.key} delay={i * 0.06}>
                <div
                  style={{ ['--accent-rgb' as string]: family.rgb }}
                  className="relative h-full overflow-hidden rounded-[26px] border border-white/10 bg-bg-card p-7 sm:p-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(120% 90% at 85% 0%, rgb(var(--accent-rgb) / 0.13), transparent 58%)' }}
                  />
                  <div className="relative">
                    <h3 className="text-white font-heading text-xl font-medium tracking-[-0.01em]">{family.label}</h3>
                    <p className="mt-2 text-[13px] text-accent/90 italic">“{family.question}”</p>

                    <ul role="list" className="mt-7 space-y-3">
                      {family.services.map((s) => {
                        const row = (
                          <>
                            <span className="min-w-0">
                              <span className="block text-white text-[15px] font-medium leading-tight">
                                {s.label}
                                {s.status === 'planned' && (
                                  <span className="ml-2 align-middle rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] text-dark">
                                    Brevemente
                                  </span>
                                )}
                              </span>
                              <span className="mt-0.5 block text-[12px] text-muted leading-snug">{s.sub}</span>
                            </span>
                            {s.price && (
                              <span className="shrink-0 text-[12px] text-white/70 tabular-nums">{s.price}</span>
                            )}
                          </>
                        )

                        return (
                          <li key={s.key}>
                            {s.status === 'live' ? (
                              <Link
                                href={s.href}
                                className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4
                                           transition-colors hover:border-[rgb(var(--accent-rgb)/0.5)] hover:bg-white/[0.04]"
                              >
                                {row}
                              </Link>
                            ) : (
                              // Sem página ainda: mostra-se o serviço, mas não se liga para um 404.
                              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.015] p-4">
                                {row}
                              </div>
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Planos — o recorrente que sustenta tudo o resto */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="planos-h">
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[28px] border border-accent/25 bg-gradient-to-br from-[#171b22] via-[#111318] to-[#0c0d10] p-8 sm:p-10">
              <span
                aria-hidden
                className="absolute -top-24 -right-16 w-72 h-72 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 60% 40%, rgb(var(--accent-rgb) / 0.18), transparent 65%)' }}
              />
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-4">Depois do projeto</p>
                <h2 id="planos-h" className="text-white">O que impede tudo isto de parar daqui a seis meses</h2>
                <p className="mt-5 text-muted leading-relaxed max-w-xl">
                  Um site entregue e esquecido perde posições, acumula falhas e deixa de trazer clientes.
                  Os planos mensais são o que transforma um projeto num resultado que se acumula —
                  monitorização, SEO contínuo, citações em motores de IA e conteúdo, a partir de 149 € por mês.
                </p>
                <div className="mt-8">
                  <GlowButton href={PLANS_LINK.href}>Ver os planos mensais</GlowButton>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <CorporateBlock />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(127,168,217,0.14), transparent 70%)' }}
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <AnimateOnScroll>
            <h2 id="cta" className="text-white">Não sabes por onde começar?</h2>
            <p className="mt-5 text-muted leading-relaxed">
              É a pergunta mais comum, e a resposta honesta é que depende do teu negócio. Uma chamada de
              30 minutos chega para eu perceber o que faz sentido primeiro — e para tu perceberes se
              queres trabalhar comigo. Sem compromisso e sem apresentação comercial.
            </p>
            <div className="mt-10 flex justify-center">
              <GlowButton href={CTA}>Marcar chamada gratuita</GlowButton>
            </div>
            <p className="mt-6 text-xs text-muted">Resposta em menos de 2 horas · Falas comigo, não com um comercial</p>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
