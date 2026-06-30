'use client'
import { useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export type ProcessStep = {
  card: string        // nome curto no cartão (ex.: "Conversa")
  tagline: string     // subtítulo do cartão
  title: string       // título na timeline (ex.: "Conversa & briefing")
  desc: string        // descrição na timeline
  metric: string      // destaque real (ex.: "< 2h", "95+", "0")
  metricLabel: string // legenda do destaque
  icon: ReactNode
}
type HeaderProps = { eyebrow?: string; title: string; subtitle?: string }

const H_C = 74        // pitch de um passo colapsado (px)
const VIEWPORT = 440  // altura da janela da timeline (px)
const FOCUS_Y = 150   // onde fica o topo do passo ativo (≈ a meio do cartão)

function SectionHeader({ eyebrow, title, subtitle, className = '' }: HeaderProps & { className?: string }) {
  return (
    <div className={`text-center max-w-[640px] mx-auto px-6 ${className}`}>
      {eyebrow && <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">{eyebrow}</p>}
      <h2 id="processo" className="text-white">{title}</h2>
      {subtitle && <p className="mt-5 text-muted leading-relaxed">{subtitle}</p>}
    </div>
  )
}

function CardFace({ step, index, total }: { step: ProcessStep; index: number; total: number }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
      <span className="absolute top-4 right-4 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] tracking-[0.12em] text-muted tabular-nums">
        0{index + 1} / 0{total}
      </span>
      <span className="relative grid place-items-center w-16 h-16 rounded-full border border-accent/30 bg-accent/10 text-accent mb-6">
        <span aria-hidden className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 26px rgb(var(--accent-rgb) / 0.55)' }} />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="relative">{step.icon}</svg>
      </span>
      <h3 className="text-white font-heading text-3xl font-medium tracking-[-0.01em]">{step.card}</h3>
      <p className="mt-3 text-muted text-sm leading-relaxed max-w-[230px]">{step.tagline}</p>
    </div>
  )
}

/* Baralho: arestas luminosas atrás + cartão ativo que troca (peel) */
function Deck({ steps, active }: { steps: ProcessStep[]; active: number }) {
  const total = steps.length
  return (
    <div className="relative w-full max-w-[330px] mx-auto" style={{ height: 420, perspective: 1100 }}>
      {[3, 2, 1].map((k) => (
        <div
          key={k}
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 h-[3px] rounded-full"
          style={{
            bottom: -7 - k * 8,
            width: `${90 - k * 9}%`,
            opacity: 0.3 + (3 - k) * 0.22,
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
            boxShadow: '0 0 12px rgb(var(--accent-rgb) / 0.8)',
          }}
        />
      ))}

      <AnimatePresence mode="popLayout">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 44, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -44, rotateX: -10 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="absolute inset-0 rounded-[26px] border border-accent/25 overflow-hidden bg-gradient-to-b from-[#101b25] via-[#0c141c] to-[#0a0e13] shadow-[0_44px_90px_-40px_rgba(0,0,0,0.95)]"
        >
          <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 pointer-events-none" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.18), transparent 65%)' }} />
          <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[82%] h-[2px] rounded-full" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', boxShadow: '0 0 12px rgb(var(--accent-rgb) / 0.9)' }} />
          <CardFace step={steps[active]} index={active} total={total} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* Passo na lista em foco: opacidade pela distância ao ativo + acordeão no ativo */
function FocusStep({ step, index, active }: { step: ProcessStep; index: number; active: number }) {
  const isActive = index === active
  const d = Math.abs(index - active)
  const opacity = d === 0 ? 1 : d === 1 ? 0.42 : d === 2 ? 0.16 : 0.06

  return (
    <motion.li
      className="relative pl-12"
      style={{ minHeight: H_C }}
      animate={{ opacity }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <span
        aria-hidden
        className={`absolute left-[7px] top-1.5 w-[18px] h-[18px] rounded-full border transition-all duration-300 ${
          isActive ? 'border-accent bg-accent shadow-[0_0_14px_rgb(var(--accent-rgb)_/_0.9)]' : 'border-white/30 bg-bg'
        }`}
      />
      <p className={`text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${isActive ? 'text-accent' : 'text-dark'}`}>Passo {index + 1}</p>
      <h3 className={`font-heading text-2xl font-medium tracking-[-0.01em] transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}>{step.title}</h3>

      <motion.div
        initial={false}
        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div className="pt-3 pb-1">
          <p className="text-muted text-sm leading-relaxed max-w-md">{step.desc}</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="font-heading text-2xl font-medium text-accent leading-none">{step.metric}</span>
            <span className="text-[12px] text-muted">{step.metricLabel}</span>
          </p>
        </div>
      </motion.div>
    </motion.li>
  )
}

/* ── Desktop: secção fixada — baralho (esq.) + lista em foco que desliza (dir.) ── */
function PinnedProcess({ steps, header }: { steps: ProcessStep[]; header: HeaderProps }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const total = steps.length
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))))))

  return (
    <div ref={ref} style={{ height: `${total * 46 + 30}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <SectionHeader {...header} className="mb-8 xl:mb-10" />

        <div className="max-w-[1080px] mx-auto w-full px-6 grid grid-cols-2 gap-12 items-center">
          <Deck steps={steps} active={active} />

          {/* Lista em foco: o passo ativo fica a meio; os seguintes entram em fade com o scroll */}
          <div className="relative overflow-hidden" style={{ height: VIEWPORT }}>
            <motion.ol
              className="absolute left-0 right-0 top-0"
              animate={{ y: FOCUS_Y - active * H_C }}
              transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-white/12" />
              {steps.map((s, i) => (
                <FocusStep key={s.title} step={s} index={i} active={active} />
              ))}
            </motion.ol>

            {/* máscaras de fade topo/fundo */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Mobile / reduced-motion: timeline vertical, tudo visível, entra no scroll ── */
function StackedProcess({ steps, header }: { steps: ProcessStep[]; header: HeaderProps }) {
  return (
    <div className="px-6">
      <SectionHeader {...header} className="mb-12" />
      <div className="relative max-w-md mx-auto">
        <div aria-hidden className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/40 via-white/10 to-accent/40" />
        <ol className="flex flex-col gap-8">
          {steps.map((s, i) => (
            <li key={s.title}>
              <AnimateOnScroll delay={(i % 2) * 0.06} className="relative pl-12">
                <span aria-hidden className="absolute left-[6px] top-1 grid place-items-center w-5 h-5 rounded-full border border-accent/50 bg-bg">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </span>
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent">Passo {i + 1}</p>
                <h3 className="text-white font-heading text-xl font-medium tracking-[-0.01em]">{s.title}</h3>
                <p className="mt-1.5 text-muted text-sm leading-relaxed">{s.desc}</p>
                <p className="mt-2.5 flex items-baseline gap-2">
                  <span className="font-heading text-xl font-medium text-accent leading-none">{s.metric}</span>
                  <span className="text-[12px] text-muted">{s.metricLabel}</span>
                </p>
              </AnimateOnScroll>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default function ProcessTimeline({ steps, eyebrow, title, subtitle }: { steps: ProcessStep[] } & HeaderProps) {
  const reduce = useReducedMotion()
  const header = { eyebrow, title, subtitle }
  if (reduce) return <StackedProcess steps={steps} header={header} />

  return (
    <>
      <div className="hidden lg:block">
        <PinnedProcess steps={steps} header={header} />
      </div>
      <div className="lg:hidden">
        <StackedProcess steps={steps} header={header} />
      </div>
    </>
  )
}
