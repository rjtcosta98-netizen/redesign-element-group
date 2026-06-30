import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import ReachBars from '@/components/ui/ReachBars'

type Kind = 'web' | 'seo' | 'social' | 'plans'

// Acento por categoria — mesmo sistema das páginas de serviço. Aplicado no <article>
// de cada cartão sticky; tudo dentro (eyebrow, glow, visual) re-tematiza por herança.
// O cabeçalho da secção e o hero ficam no sapphire da marca (fora destes cartões).
const ACCENTS = {
  web:    { '--accent-rgb': '127 168 217', '--accent': '#7FA8D9', '--accent-deep': '#2f4f7a', '--accent-mid': '#4f7fb8', '--accent-light': '#bcd6f0' },
  seo:    { '--accent-rgb': '111 179 154', '--accent': '#6FB39A', '--accent-deep': '#2f6b58', '--accent-mid': '#4f8f7a', '--accent-light': '#bfe6d8' },
  social: { '--accent-rgb': '169 138 212', '--accent': '#A98AD4', '--accent-deep': '#543f7d', '--accent-mid': '#7d63ad', '--accent-light': '#ddccf0' },
  plans:  { '--accent-rgb': '215 176 116', '--accent': '#D7B074', '--accent-deep': '#7a5a2e', '--accent-mid': '#b08a4f', '--accent-light': '#f0ddbf' },
} as Record<Kind, CSSProperties>

type Service = {
  eyebrow: string
  title: string
  body: string
  href: string
  kind: Kind
}

// SEO-optimized PT-PT copy. Every claim here is real (PageSpeed 95+, 3,2× tráfego,
// Top 3 Google Maps, inclusões dos planos mensais) — nada inventado.
const SERVICES: Service[] = [
  {
    eyebrow: 'Categoria 01 · Websites & Lojas Online',
    title: 'Criação de Websites e Lojas Online à medida',
    body: 'Sites institucionais e lojas online (e-commerce) desenhados à medida do teu negócio — ultra-rápidos (PageSpeed 95+), responsivos e pensados para converter visitas em clientes. Do design ao alojamento, tratamos de tudo.',
    href: '/servicos/web',
    kind: 'web',
  },
  {
    eyebrow: 'Categoria 02 · Visibilidade & SEO',
    title: 'SEO e Otimização para apareceres no Google',
    body: 'Colocamos o teu negócio à frente de quem procura: SEO técnico, SEO local (Top 3 no Google Maps) e conteúdo otimizado para as pesquisas certas. Em média, os nossos projetos de SEO geram 3,2× mais tráfego orgânico.',
    href: '/servicos/seo',
    kind: 'seo',
  },
  {
    eyebrow: 'Categoria 03 · Social Media',
    title: 'Gestão de Redes Sociais e Campanhas que vendem',
    body: 'Gerimos as tuas redes sociais com conteúdo e design profissional e campanhas pagas (Meta e Google Ads) que atraem os clientes certos — não só seguidores. Presença consistente, todos os dias, sem te tirar tempo.',
    href: '/servicos/social',
    kind: 'social',
  },
  {
    eyebrow: 'Categoria 04 · Planos Mensais',
    title: 'Planos Mensais para o teu negócio crescer todos os meses',
    body: 'Uma parceria contínua, sem surpresas: manutenção técnica e backups, SEO mensal, gestão de redes sociais e relatórios de resultados — tudo num plano recorrente. O teu marketing digital sempre a trabalhar por ti.',
    href: '/servicos/planos-mensais',
    kind: 'plans',
  },
]

/* ── Branded CSS/SVG mockups (decorative) ──────────────────────────────
   Custom visuals in our steel-blue palette — no off-brand stock photos. */
function ServiceVisual({ kind }: { kind: Kind }) {
  const panel =
    'relative h-[240px] md:h-[340px] w-full rounded-2xl border border-white/10 ' +
    'bg-[radial-gradient(120%_120%_at_70%_0%,rgb(var(--accent-rgb)_/_0.10),transparent_55%)] ' +
    'bg-[#0c0d10] overflow-hidden'

  if (kind === 'web') {
    return (
      <div className={panel} aria-hidden>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {/* Browser window */}
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/10 bg-white/[0.03]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
              <div className="ml-2 flex-1 h-5 rounded-full bg-white/[0.06] flex items-center px-2.5 text-[10px] text-dark">
                apiariosterrasdapulga.pt
              </div>
            </div>
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/Projetos/apiariospulga.jpg"
                alt="Website Apiários Terras da Pulga, criado pela Element Group"
                fill
                sizes="(max-width: 768px) 90vw, 360px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
        {/* PageSpeed badge */}
        <div className="absolute bottom-5 right-4 rounded-xl border border-white/10 bg-bg-card/90 backdrop-blur p-3 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
          <p className="text-[10px] text-muted">PageSpeed</p>
          <div className="flex items-end gap-1.5">
            <span className="text-2xl font-heading font-medium text-white leading-none">98</span>
            <span className="text-[10px] text-accent mb-0.5">/ 100</span>
          </div>
        </div>
      </div>
    )
  }

  if (kind === 'seo') {
    return (
      <div className={panel} aria-hidden>
        <div className="absolute inset-0 p-5 md:p-6 flex flex-col items-center justify-center gap-2.5">
          {/* SERP real — look autêntico do Google (fundo branco) */}
          <div className="w-full max-w-[340px] rounded-xl bg-white shadow-[0_20px_44px_rgba(0,0,0,0.45)] p-4">
            {/* Google + barra de pesquisa */}
            <div className="flex items-center gap-2 mb-3.5">
              <span className="font-heading text-[15px] font-medium leading-none tracking-tight select-none">
                <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
              </span>
              <div className="flex-1 flex items-center gap-2 h-7 rounded-full border border-[#dfe1e5] px-3">
                <span className="text-[11.5px] text-[#3c4043] truncate">massagens são romão</span>
                <svg className="ml-auto shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="#4285F4" strokeWidth="2" />
                  <path d="m20 20-3-3" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Resultado #1 — REAL */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[9px] font-semibold shrink-0">M</span>
                <span className="leading-tight min-w-0">
                  <span className="block text-[11px] text-[#202124] truncate">Maria Mendes Massagens</span>
                  <span className="block text-[10px] text-[#5f6368] truncate">mariamendesmassagens.pt</span>
                </span>
              </div>
              <p className="text-[15px] leading-snug text-[#1a0dab] line-clamp-2">Maria Mendes — Massagens de Relaxamento · São Romão</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-[#4d5156] line-clamp-2">Massagens de relaxamento em Seia. Reserve o seu momento de bem-estar — corporais, faciais, aromaterapia e mais.</p>
            </div>

            {/* Resultado #2 — esbatido (sem inventar concorrentes) */}
            <div className="mt-3.5 opacity-70">
              <div className="h-1.5 w-20 rounded bg-[#dadce0] mb-1.5" />
              <div className="h-2.5 w-3/5 rounded bg-[#aac0e8] mb-1.5" />
              <div className="h-1.5 w-full rounded bg-[#e8eaed]" />
            </div>
          </div>

          <span className="text-[10px] text-dark">↑ Resultado real no Google</span>
        </div>
      </div>
    )
  }

  if (kind === 'social') {
    return (
      <div className={panel} aria-hidden>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {/* Social post card — post real da Element Group */}
          <div className="w-full max-w-[230px] rounded-xl border border-white/10 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center gap-2 p-2.5">
              <span className="grid place-items-center w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 overflow-hidden">
                <Image src="/web-app-manifest-512x512.png" alt="" width={18} height={18} className="w-[18px] h-[18px]" />
              </span>
              <div className="flex-1 leading-tight">
                <p className="text-[11px] text-white font-medium">elementgroup.pt</p>
                <p className="text-[9px] text-dark">Patrocinado</p>
              </div>
              <span className="text-dark text-lg leading-none">···</span>
            </div>
            <div className="relative h-36 md:h-44 border-y border-white/5">
              <Image
                src="/Projetos/post.jpg"
                alt="Publicação da Element Group nas redes sociais"
                fill
                sizes="230px"
                className="object-cover object-top"
              />
            </div>
            <div className="flex items-center gap-4 p-2.5 text-white/70">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-5.4A8 8 0 1 1 21 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 12l16-7-7 16-2.2-6.8L4 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
        {/* Reach trend chip — barras animadas no scroll */}
        <div className="absolute bottom-5 right-4 rounded-xl border border-white/10 bg-bg-card/90 backdrop-blur p-3 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
          <p className="text-[10px] text-muted mb-1.5">Alcance</p>
          <ReachBars />
        </div>
      </div>
    )
  }

  // plans
  const items = [
    'Manutenção técnica & backups',
    'SEO técnico mensal + Analytics',
    'Gestão de redes sociais',
    'Relatório de resultados mensal',
  ]
  return (
    <div className={panel} aria-hidden>
      <div className="absolute inset-0 p-6 flex flex-col justify-center">
        <div className="rounded-xl border border-white/10 bg-[#101216] p-4 shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-white font-medium">Plano mensal</p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] text-accent font-medium">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path d="M21 12a9 9 0 1 1-2.6-6.3M21 4v4h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Recorrente
            </span>
          </div>
          <ul className="space-y-2.5">
            {items.map((it) => (
              <li key={it} className="flex items-center gap-2.5">
                <span className="w-5 h-5 shrink-0 rounded-full bg-gradient-to-br from-accent to-[var(--accent-mid)] flex items-center justify-center text-black text-[11px]">✓</span>
                <span className="text-[12px] text-muted">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function FeatureStack({ showIntro = true }: { showIntro?: boolean }) {
  return (
    <section id="servicos" className="bg-bg px-6 pb-24 pt-24" aria-labelledby="servicos-titulo">
      <div className="max-w-[1100px] mx-auto">
        {showIntro && (
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Os nossos serviços</p>
            <h2 id="servicos-titulo" className="text-white">Websites, SEO e redes sociais — tudo o que a tua presença online precisa</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Websites, SEO, redes sociais e planos mensais — um só parceiro digital
              para a tua PME crescer e vender mais online.
            </p>
          </AnimateOnScroll>
        )}

        {/* Sticky stacking cards — one per service */}
        <div className="relative">
          {SERVICES.map((s, i) => (
            <div
              key={s.kind}
              className="sticky pb-8"
              style={{ top: `${100 + i * 26}px` }}
            >
              <article
                style={ACCENTS[s.kind]}
                className="relative overflow-hidden rounded-[28px] border border-white/10
                                  bg-gradient-to-br from-[#1a1d24] via-[#131417] to-[#0F0F0E]
                                  shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
                {/* Steel-blue light streak in the top-left corner */}
                <div
                  className="absolute -top-16 -left-16 w-80 h-80 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgb(var(--accent-rgb) / 0.16), rgb(var(--accent-rgb) / 0) 60%)',
                  }}
                />

                <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                  {/* Text */}
                  <div className="max-w-md">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-accent/90 mb-4">{s.eyebrow}</p>
                    <h3 className="text-white">{s.title}</h3>
                    <p className="mt-4 text-muted text-sm leading-relaxed">{s.body}</p>
                    <Link
                      href={s.href}
                      aria-label={`Saber mais sobre ${s.title}`}
                      className="group mt-7 inline-flex items-center gap-1.5 rounded-pill bg-white text-black
                                 text-sm font-medium px-5 py-2.5 transition-all hover:bg-white/90"
                    >
                      Saber mais
                      <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                    </Link>
                  </div>

                  {/* Branded visual */}
                  <ServiceVisual kind={s.kind} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
