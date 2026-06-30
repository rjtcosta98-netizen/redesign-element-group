import type { Metadata } from 'next'
import { Caveat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import CountUp from '@/components/ui/CountUp'
import Quotes from '@/components/sections/Quotes'
import ValuesStack from '@/components/about/ValuesStack'
import { getReviews } from '@/lib/reviews'
import JsonLd from '@/components/JsonLd'
import { SITE, breadcrumbSchema } from '@/lib/seo'

// Reviews são cacheadas 1h no servidor — página regenera no máximo de hora a hora.
export const revalidate = 3600

// Caveat (assinatura manuscrita) só é usada nesta página — carregada aqui em vez
// de globalmente, para sair do payload de fontes de todas as outras páginas.
const caveat = Caveat({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-signature', display: 'optional' })


export const metadata: Metadata = {
  alternates: { canonical: '/sobre' },
  title: 'Sobre nós — Element Group | Ricardo Jorge',
  description:
    'Ricardo Jorge e a Element Group: websites, lojas online, SEO e marketing digital para PMEs em Portugal. Atenção pessoal, sem intermediários, resultados reais.',
  keywords: ['Element Group', 'Ricardo Jorge', 'agência digital Seia', 'marketing digital PME Portugal', 'quem somos', 'estúdio digital Portugal'],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Sobre nós — Element Group | Ricardo Jorge',
    description: 'Ricardo Jorge e a Element Group: websites, lojas online, SEO e marketing para PMEs em Portugal. Atenção pessoal, resultados reais.',
    url: '/sobre',
    locale: 'pt_PT',
    siteName: 'Element Group',
    images: [{ url: '/og/06-sobre.png', width: 1200, height: 630, alt: 'Element Group — Ricardo Jorge' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre nós — Element Group | Ricardo Jorge',
    description: 'Websites, lojas online, SEO e marketing para PMEs em Portugal. Atenção pessoal, resultados reais.',
    images: ['/og/06-sobre.png'],
  },
}

export default async function About() {
  const reviews = await getReviews()

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/sobre#author`,
    name: 'Ricardo Jorge',
    jobTitle: 'Fundador',
    url: `${SITE.url}/sobre`,
    worksFor: { '@id': `${SITE.url}/#business` },
    sameAs: [
      'https://www.instagram.com/elementgrouppt',
      'https://www.facebook.com/elementgroupdigital/',
    ],
  }

  return (
    <main className={caveat.variable}>
      <JsonLd data={[personSchema, breadcrumbSchema([{ name: 'Início', path: '/' }, { name: 'Sobre', path: '/sobre' }])]} />
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6">
        {/* Soft steel glow behind the portrait — subtle cosmic continuity with the home hero */}
        <div
          aria-hidden
          className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(127,168,217,0.16), transparent 60%)' }}
        />

        <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Story — founder voice, first person */}
          <AnimateOnScroll direction="left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">O porquê</p>

            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Nenhum bom negócio devia perder clientes por não ser <span className="text-accent">encontrado online</span>.
            </h1>

            <p className="mt-7 text-muted leading-relaxed max-w-xl">
              É nisto que acredito desde o primeiro site que fiz para um amigo. As grandes agências são caras
              e distantes — e as PMEs merecem melhor. Foi por isso que criei a Element Group: dar aos pequenos
              negócios em Portugal uma presença online de topo, sem o preço nem a distância de uma agência.
              Trabalho a partir de Seia, na Serra da Estrela (distrito da Guarda), com clientes em todo o país.
            </p>

            {/* Facts row */}
            <p className="mt-8 text-xs text-muted flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span>Desde 2026</span>
              <span className="text-dark" aria-hidden>·</span>
              <span>Estúdio em Seia, Portugal</span>
              <span className="text-dark" aria-hidden>·</span>
              <span><span className="text-accent" aria-hidden>★</span> 5,0 no Google</span>
            </p>

            <div className="mt-10 flex flex-col items-start sm:flex-row sm:items-center gap-4">
              <GlowButton href="/contacto">Pedir orçamento grátis</GlowButton>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors"
              >
                Ver trabalhos
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>

            {/* Handwritten signature — the human anchor */}
            <div className="mt-12 flex items-center gap-4">
              <span
                className="text-white text-3xl sm:text-4xl leading-none"
                style={{ fontFamily: 'var(--font-signature)' }}
              >
                Ricardo Jorge
              </span>
              <span className="h-8 w-px bg-white/15" aria-hidden />
              <span className="text-xs text-dark leading-tight">
                Fundador<br />Element Group
              </span>
            </div>
          </AnimateOnScroll>

          {/* Portrait */}
          <AnimateOnScroll direction="right">
            <div className="relative max-w-[440px] mx-auto lg:ml-auto">
              <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10
                              shadow-[0_40px_90px_-30px_rgba(127,168,217,0.45)]">
                <Image
                  src="/ricardo-portrait.jpg"
                  alt="Ricardo Jorge, fundador da Element Group, no escritório"
                  fill
                  sizes="(max-width: 1024px) 90vw, 440px"
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Floating proof card — the solo-studio advantage */}
              <div className="absolute -left-3 sm:-left-6 bottom-8 hidden sm:flex flex-col gap-1
                              rounded-2xl border border-white/10 bg-bg-card/85 backdrop-blur-md p-4
                              shadow-[0_20px_50px_rgba(0,0,0,0.55)] max-w-[220px]">
                <div className="flex items-center gap-2">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-accent to-[#4f7fb8] text-black">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <p className="text-sm text-white font-medium">Sem intermediários</p>
                </div>
                <p className="text-[11px] text-muted">Falas sempre com quem faz o teu projeto.</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* A minha história — premium framed panel: narrative left, photo + floating cards right */}
      <section className="relative overflow-hidden bg-bg py-24 px-6" aria-labelledby="historia">
        <div aria-hidden className="glow-drift absolute -left-40 top-1/3 -translate-y-1/2 w-[620px] h-[620px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(127,168,217,0.11), transparent 60%)' }} />
        <div className="relative max-w-[1100px] mx-auto">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-[32px] border border-white/10
                            bg-gradient-to-br from-[#16191f] via-[#121317] to-[#0d0e11]
                            shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]
                            grid md:grid-cols-2 items-stretch">
              {/* Soft light blooming from the top — clipped to the panel */}
              <div
                aria-hidden
                className="absolute -top-24 left-1/4 w-[440px] h-[440px] pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.20), transparent 60%)' }}
              />

              {/* Story */}
              <div className="relative p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 mb-6">
                  <Image src="/web-app-manifest-512x512.png" alt="" width={16} height={16} className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted">A minha história</span>
                </span>

                <h2 id="historia" className="text-white font-heading text-3xl md:text-[34px] font-medium tracking-[-0.02em] leading-tight">
                  Como (e porquê) começou
                </h2>

                <div className="mt-6 space-y-4 text-muted text-sm leading-relaxed">
                  <p>
                    Via sempre o mesmo: negócios bons — daqueles de confiança — escondidos atrás de um site
                    fraco, ou sem presença nenhuma online. E as agências que podiam ajudar eram caras e
                    distantes de mais para um pequeno negócio.
                  </p>
                  <p>
                    Comecei a fazer sites para amigos, quase como quem ajuda ao fim de semana. Mas os
                    resultados apareciam — mais visitas, mais contactos, mais clientes. Aquilo que para mim
                    era natural estava a mudar negócios reais.
                  </p>
                  <p>
                    Em 2026 deixei de o fazer como favor e passei a fazê-lo a sério. Nasceu a Element Group —
                    para que qualquer PME em Portugal possa ter uma presença online de que se orgulha.
                  </p>
                </div>

                {/* Pull-quote — the emotional core */}
                <blockquote className="mt-8 border-l-2 border-accent/60 pl-5">
                  <p className="font-heading text-lg md:text-xl text-white leading-snug tracking-[-0.01em]">
                    “Um bom negócio nunca devia parecer pequeno online.”
                  </p>
                  <footer
                    className="mt-2 text-2xl text-white/90"
                    style={{ fontFamily: 'var(--font-signature)' }}
                  >
                    Ricardo Jorge
                  </footer>
                </blockquote>
              </div>

              {/* Photo + floating story cards */}
              <div className="relative min-h-[420px] md:min-h-0">
                <Image
                  src="/ricardo-full.jpg"
                  alt="Ricardo Jorge no escritório da Element Group"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  priority
                  className="object-cover object-center"
                />
                {/* Blend the photo's left edge into the panel */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none
                             bg-gradient-to-r from-[#121317] via-[#121317]/30 to-transparent md:via-[#121317]/45"
                />
                {/* Bottom fade for legibility */}
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0e11]/70 to-transparent pointer-events-none" />

                {/* Floating: the first step — em mobile vai para o canto inferior
                    direito para não tapar a cara (a foto corta mais estreita); no
                    desktop fica no canto superior direito. */}
                <div className="absolute bottom-6 right-4 md:bottom-auto md:top-6 md:right-6 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-bg-card/85 backdrop-blur-md px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                  <span className="grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-accent to-[#4f7fb8] text-black text-xs font-heading font-semibold">26</span>
                  <div>
                    <p className="text-white text-sm font-medium leading-none">2026</p>
                    <p className="text-[11px] text-muted mt-1">O primeiro passo</p>
                  </div>
                </div>

                {/* Floating: social proof */}
                <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-bg-card/85 backdrop-blur-md px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
                  <div className="flex items-center gap-1 text-accent text-xs tracking-widest" aria-hidden>★★★★★</div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-white font-heading text-lg font-medium leading-none">5,0</span>
                    <span className="text-[11px] text-muted">no Google</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* O que defendo — deck-stack 3D (título pinado junto dos cards) */}
      <section className="bg-bg px-6" aria-labelledby="valores">
        <ValuesStack />
      </section>

      {/* Como trabalho — animated connected flow: my method made visual */}
      <section className="relative overflow-hidden bg-bg py-24 px-6" aria-labelledby="metodo">
        <div aria-hidden className="glow-drift absolute right-[-8rem] bottom-0 w-[560px] h-[560px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(127,168,217,0.09), transparent 60%)' }} />
        <div className="relative max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Como trabalho</p>
            <h2 id="metodo" className="text-white">Trabalho como gostava que trabalhassem comigo</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Sem jargão, sem desaparecer e sem surpresas. Um método próximo e claro, em que
              cada passo te deixa a sentir o mesmo: que estás em boas mãos.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            {/* Desktop diagram — central node fans out to the deliverables */}
            <div
              className="hidden md:block relative mx-auto max-w-[760px] aspect-[10/7] rounded-2xl border border-white/10 bg-[#0b0c0f] overflow-hidden"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '22px 22px' }}
            >
              <svg viewBox="0 0 100 70" className="absolute inset-0 w-full h-full" aria-hidden>
                {FLOW.map((n, i) => (
                  <path key={`b${i}`} d={`M23,35 C 41,35 42,${n.y} 60,${n.y}`} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="0.6" />
                ))}
                {FLOW.map((n, i) => (
                  <path
                    key={`p${i}`}
                    d={`M23,35 C 41,35 42,${n.y} 60,${n.y}`}
                    fill="none"
                    stroke="#7FA8D9"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    pathLength={100}
                    className="flow-line"
                    style={{ animationDelay: `${i * 0.55}s` }}
                  />
                ))}
              </svg>

              {/* Central node */}
              <div className="absolute left-[3%] top-1/2 -translate-y-1/2 w-[150px] z-10">
                <div className="rounded-xl border border-accent/40 bg-gradient-to-br from-[#1c2738] to-[#0f1318] p-3 shadow-[0_0_44px_-8px_rgba(127,168,217,0.55)]">
                  <div className="flex items-center gap-2">
                    <Image src="/web-app-manifest-512x512.png" alt="" width={22} height={22} className="w-5 h-5" />
                    <p className="text-white text-sm font-medium leading-none">O meu método</p>
                  </div>
                  <p className="mt-1.5 text-[11px] text-muted">como trabalho contigo</p>
                </div>
              </div>

              {/* Deliverable nodes */}
              {FLOW.map((n, i) => (
                <div key={i} style={{ top: `${(n.y / 70) * 100}%` }} className="absolute left-[60%] -translate-y-1/2 w-[34%] z-10">
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-bg-card px-3 py-2.5">
                    <span className="grid place-items-center w-7 h-7 shrink-0 rounded-lg bg-white/[0.06] text-accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-white text-[13px] font-medium leading-tight truncate">{n.title}</p>
                      <p className="text-[10px] text-accent/90 truncate">{n.sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile stacked — single flowing vertical line */}
            <div className="md:hidden relative pl-7">
              <div className="absolute left-[9px] top-3 bottom-3 w-px bg-white/12 overflow-hidden">
                <div className="flow-line-vert absolute -left-1 -right-1 h-12 bg-gradient-to-b from-transparent via-accent to-transparent" />
              </div>
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-bg" aria-hidden />
                  <div className="rounded-xl border border-accent/40 bg-gradient-to-br from-[#1c2738] to-[#0f1318] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Image src="/web-app-manifest-512x512.png" alt="" width={20} height={20} className="w-5 h-5" />
                      <p className="text-white text-sm font-medium">O meu método</p>
                    </div>
                    <p className="mt-1 text-[11px] text-muted">como trabalho contigo</p>
                  </div>
                </div>
                {FLOW.map((n, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/70 ring-4 ring-bg" aria-hidden />
                    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-bg-card px-4 py-3">
                      <span className="grid place-items-center w-7 h-7 shrink-0 rounded-lg bg-white/[0.06] text-accent">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
                      </span>
                      <div>
                        <p className="text-white text-sm font-medium leading-tight">{n.title}</p>
                        <p className="text-[11px] text-accent/90">{n.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Em números — animated stats that give the story concrete weight */}
      <section className="relative overflow-hidden bg-bg py-24 px-6" aria-labelledby="numeros">
        <div aria-hidden className="glow-drift-2 absolute right-[-10rem] top-0 w-[620px] h-[620px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(127,168,217,0.10), transparent 60%)' }} />
        <div className="relative max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Em números</p>
            <h2 id="numeros" className="text-white">Pequeno estúdio. Resultados a sério.</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Os números reais por trás da história — sem inflar nada.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <div key={i} className="glow-card p-6 md:p-8 text-center" style={{ animationDelay: `${-i * 1.6}s` }}>
                  <span className="glow-card__glow" aria-hidden />
                  <span className="glow-card__ring" aria-hidden />
                  <div className="glow-card__content">
                    <div className="font-heading text-4xl md:text-5xl font-medium text-white tracking-[-0.02em] tabular-nums">
                      <CountUp value={s.value} from={s.from} decimals={s.decimals} grouping={s.grouping ?? true} />
                      {s.suffix && <span className="text-accent">{s.suffix}</span>}
                    </div>
                    <p className="mt-3 text-sm text-white font-medium">{s.label}</p>
                    <p className="mt-1 text-[12px] text-dark">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <Quotes reviews={reviews} />

      {/* Closing invitation — personal, conversational (matches the page's human tone) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] py-28 px-6" aria-labelledby="conversar">
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[760px] h-[420px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 100%, rgba(127,168,217,0.20), transparent 70%)' }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">O próximo passo</p>
            <h2 id="conversar" className="text-white">Vamos conversar sobre o teu negócio?</h2>
            <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
              Conta-me o que tens em mente — sem compromisso e sem pressão. Respondo-te
              pessoalmente, normalmente em menos de 2 horas.
            </p>

            <div className="mt-10 flex flex-col items-center gap-5">
              <GlowButton href="/contacto">Vamos conversar</GlowButton>
              <span className="text-sm text-white/70">
                ou escreve-me para{' '}
                <Link href="mailto:info@elementgroup.pt" className="text-white/90 underline underline-offset-4 hover:text-white transition-colors">info@elementgroup.pt</Link>
              </span>
            </div>

            {/* Personal sign-off — Ricardo's face bookends the page */}
            <div className="mt-14 flex items-center justify-center gap-3">
              <Image
                src="/ricardo-portrait.jpg"
                alt="Ricardo Jorge"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover object-top border border-white/10"
              />
              <div className="text-left">
                <span className="block text-2xl text-white/90 leading-none" style={{ fontFamily: 'var(--font-signature)' }}>
                  Ricardo Jorge
                </span>
                <span className="block text-[11px] text-dark mt-1">Fundador · Element Group</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}

// My method — each principle fans out from the central node, tagged with the feeling it creates.
// (y = vertical position in the 0–70 viewBox.)
const FLOW = [
  { title: 'Entendo primeiro', sub: 'em boas mãos', y: 11, icon: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></>) },
  { title: 'Mostro e ajusto',  sub: 'sempre a par',  y: 27, icon: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>) },
  { title: 'Trato de tudo',    sub: 'sem stress',     y: 43, icon: (<><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /></>) },
  { title: 'Foco no que vende', sub: 'resultado',     y: 59, icon: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.7" /></>) },
]

// Real stats — concrete weight for the story (animated count-up).
const STATS = [
  { value: 7,    suffix: '+', label: 'Projetos entregues',     sub: 'desde 2026' },
  { value: 5.0,  decimals: 1, suffix: '★', label: 'Avaliação no Google', sub: '9 avaliações' },
  { value: 2026, from: 2010, grouping: false, label: 'Ano de fundação',  sub: 'o primeiro dia' },
  { value: 3.2,  decimals: 1, suffix: '×', label: 'Mais tráfego orgânico', sub: 'média dos projetos SEO' },
]

// (Os valores passaram para components/about/ValuesStack.tsx — sticky-stack animado.)
