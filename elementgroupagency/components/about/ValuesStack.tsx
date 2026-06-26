'use client'
import { useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion'

type Value = { category: string; title: string; desc: string; keyword: string; proof: string; icon: ReactNode }

const VALUES: Value[] = [
  {
    category: 'Proximidade',
    title: 'Falas sempre comigo',
    desc: 'Sem gestores de conta nem intermediários. Quem responde, planeia e constrói o teu site sou eu — normalmente em menos de 2 horas.',
    keyword: 'menos de 2 horas',
    proof: 'Uma só pessoa, do briefing ao lançamento.',
    icon: (<path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />),
  },
  {
    category: 'Transparência',
    title: 'Preço fixo, dito à cabeça',
    desc: 'Sabes quanto vais pagar antes de começarmos e não muda a meio — sem extras escondidos, sem letra pequena.',
    keyword: 'sem letra pequena',
    proof: 'Orçamento fechado antes de começar.',
    icon: (<><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L3 13V3h10l7.59 7.59a2 2 0 0 1 0 2.82Z" /><circle cx="7.5" cy="7.5" r="1.5" /></>),
  },
  {
    category: 'Honestidade',
    title: 'Digo-te a verdade, mesmo que não dê jeito',
    desc: 'Se não precisas de uma loja online, digo-to. Prefiro perder uma venda a empurrar-te algo que não te serve.',
    keyword: 'perder uma venda',
    proof: 'Recomendo só o que precisas — nada a mais.',
    icon: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>),
  },
  {
    category: 'Resultado',
    title: 'Bonito é o mínimo; o objetivo é vender',
    desc: 'Cada site nasce rápido (PageSpeed 95+) e pensado para SEO e conversão. O design tem de trazer clientes.',
    keyword: 'trazer clientes',
    proof: 'Rápido (PageSpeed 95+), pensado para vender.',
    icon: (<><path d="m3 17 6-6 4 4 8-8" /><path d="M17 7h4v4" /></>),
  },
]

const cardClass =
  'rounded-[28px] border border-white/10 bg-gradient-to-br from-[#16191f] via-[#121317] to-[#0d0e11] ' +
  'shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] p-6 md:p-12 overflow-hidden flex flex-col'

function Header() {
  return (
    <div className="text-center mb-8 md:mb-10">
      <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">O que defendo</p>
      <h2 id="valores" className="text-white">Aquilo em que não cedo</h2>
    </div>
  )
}

function CardInner({ v, i, total }: { v: Value; i: number; total: number }) {
  const [before, after] = v.desc.split(v.keyword)
  return (
    <>
      {/* ── Camadas de fundo (chapa técnica / blueprint) ── */}
      {/* grelha de pontos */}
      <span aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '20px 20px', maskImage: 'radial-gradient(120% 100% at 80% 100%, #000, transparent 75%)' }} />
      {/* glow de acento */}
      <div aria-hidden className="absolute -top-16 -left-10 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(127,168,217,0.18), transparent 60%)' }} />
      {/* aresta superior luminosa */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(127,168,217,0.5), transparent)' }} />
      {/* numeral gigante contornado a sangrar do canto */}
      <span aria-hidden className="absolute -right-4 -bottom-12 font-heading font-medium select-none pointer-events-none leading-none" style={{ fontSize: '230px', letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '1.5px rgba(127,168,217,0.11)' }}>
        0{i + 1}
      </span>
      {/* marcas de registo nos cantos */}
      <span aria-hidden className="absolute top-4 left-4 w-3.5 h-3.5 border-l border-t border-white/20" />
      <span aria-hidden className="absolute top-4 right-4 w-3.5 h-3.5 border-r border-t border-white/20" />
      <span aria-hidden className="absolute bottom-4 left-4 w-3.5 h-3.5 border-l border-b border-white/20" />
      <span aria-hidden className="absolute bottom-4 right-4 w-3.5 h-3.5 border-r border-b border-white/20" />
      {/* lombada de acento + categoria vertical (desktop) */}
      <span aria-hidden className="hidden md:block absolute left-5 top-16 bottom-16 w-px" style={{ background: 'linear-gradient(180deg, transparent, rgba(127,168,217,0.45), transparent)' }} />
      <span className="hidden md:block absolute left-[11px] top-1/2 text-[9px] uppercase tracking-[0.32em] text-accent/70" style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}>
        {v.category}
      </span>

      {/* ── Conteúdo ── */}
      <div className="relative h-full flex flex-col">
        {/* Meta — índice + estado */}
        <div className="flex items-center justify-between">
          <span className="font-heading text-sm text-white tabular-nums">
            0{i + 1}<span className="text-dark"> / 0{total}</span>
          </span>
          <span className="md:hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-muted">{v.category}</span>
          <span className="hidden md:inline text-[9px] uppercase tracking-[0.24em] text-dark">Princípio</span>
        </div>

        {/* Régua de escala — detalhe de engenharia */}
        <div aria-hidden className="mt-3 flex items-end gap-[5px] h-3 opacity-60 overflow-hidden">
          {Array.from({ length: 30 }).map((_, k) => (
            <span key={k} className="w-px shrink-0 bg-white/20" style={{ height: k % 5 === 0 ? '12px' : '6px' }} />
          ))}
        </div>

        {/* Ícone — placa técnica com cantos de acento */}
        <div className="relative mt-6 md:mt-7">
          <span className="relative grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-xl border border-accent/30 bg-accent/[0.08] text-accent shadow-[0_0_34px_-8px_rgba(127,168,217,0.65)]">
            <span aria-hidden className="absolute -top-px -left-px w-2 h-2 border-l border-t border-accent/70" />
            <span aria-hidden className="absolute -bottom-px -right-px w-2 h-2 border-r border-b border-accent/70" />
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {v.icon}
            </svg>
          </span>
        </div>

        <div className="relative mt-auto pt-7">
          <h3 className="text-white font-heading text-2xl md:text-[38px] font-medium tracking-[-0.02em] leading-[1.06]">{v.title}</h3>
          <p className="mt-4 text-muted text-sm md:text-base leading-relaxed max-w-xl">
            {before}
            <span className="relative whitespace-nowrap text-white/90">
              {v.keyword}
              <span aria-hidden className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-accent" />
            </span>
            {after}
          </p>

          {/* Promessa — linha de especificação rotulada */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-[0.22em] text-accent/80 shrink-0">Promessa</span>
            <span aria-hidden className="flex-1 h-px bg-white/10" />
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="grid place-items-center w-5 h-5 shrink-0 rounded-full bg-accent/15 text-accent">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <p className="text-[13px] text-white/75 leading-snug">{v.proof}</p>
          </div>
        </div>
      </div>
    </>
  )
}

function DeckCard({ v, i, total, progress }: { v: Value; i: number; total: number; progress: MotionValue<number> }) {
  // stackPos: começa em i (deck empilhado) e desce até i-(total-1) (saiu por cima).
  const sp = useTransform(progress, [0, 1], [i, i - (total - 1)])
  const y = useTransform(sp, [-1, 0, 3], [-520, 0, 30])
  const scale = useTransform(sp, [-1, 0, 3], [0.96, 1, 0.87])
  const opacity = useTransform(sp, [-1, -0.4, 0, 3], [0, 0.45, 1, 0.55])
  const rotateX = useTransform(sp, [-1, 0, 3], [-26, 0, 0])
  const zIndex = useTransform(sp, (val) => 100 - Math.round(val * 10))

  return (
    <motion.article style={{ y, scale, opacity, rotateX, zIndex }} className={`absolute inset-0 ${cardClass}`}>
      <CardInner v={v} i={i} total={total} />
    </motion.article>
  )
}

export default function ValuesStack() {
  const container = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(VALUES.length - 1, Math.max(0, Math.round(v * (VALUES.length - 1)))))
  })

  // Reduced motion → header + lista vertical legível, sem 3D.
  if (reduce) {
    return (
      <div className="max-w-3xl mx-auto py-24">
        <Header />
        <div className="flex flex-col gap-5">
          {VALUES.map((v, i) => (
            <article key={i} className={`relative min-h-[360px] ${cardClass}`}>
              <CardInner v={v} i={i} total={VALUES.length} />
            </article>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={container} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden" style={{ perspective: 1200 }}>
        <Header />
        <div className="relative w-full max-w-3xl h-[420px] md:h-[460px]">
          {VALUES.map((v, i) => (
            <DeckCard key={i} v={v} i={i} total={VALUES.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* Dot navigation */}
        <div className="hidden lg:flex flex-col gap-3 absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 z-[120]">
          {VALUES.map((_, i) => (
            <span key={i} className={`rounded-full transition-all duration-300 ${i === active ? 'w-2.5 h-2.5 bg-white' : 'w-2 h-2 bg-white/25'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
