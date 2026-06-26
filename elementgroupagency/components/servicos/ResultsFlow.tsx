import Image from 'next/image'
import { type ReactNode } from 'react'

export type BeforeItem = { label: string; icon: ReactNode }
export type ResultItem = { metric: string; label: string }
type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  before: BeforeItem[]
  engineChips: string[]
  results: ResultItem[]
}

const ROWS = [16, 50, 84] // centros das 3 linhas (viewBox 0 0 100 100)

// Conector que vive SÓ na lacuna entre colunas (largura fixa) → nunca passa por cima dos cartões.
// "in" (antes → motor) = pontos cinza/apagados · "out" (motor → resultados) = sapphire vívido com glow.
function FlowGap({ dir }: { dir: 'in' | 'out' }) {
  const isOut = dir === 'out'
  const color = isOut ? 'var(--accent)' : '#5c6573'
  const base = isOut ? 'rgb(var(--accent-rgb) / 0.16)' : 'rgba(120,130,145,0.12)'
  return (
    <div
      className="hidden md:block self-stretch w-14 lg:w-20 shrink-0"
      aria-hidden
      style={isOut ? { filter: 'drop-shadow(0 0 3px rgb(var(--accent-rgb) / 0.85))' } : undefined}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" className="w-full h-full">
        {ROWS.map((r, i) => {
          const d = isOut ? `M0 50 C 45 50, 55 ${r}, 100 ${r}` : `M0 ${r} C 45 ${r}, 55 50, 100 50`
          return (
            <g key={i}>
              <path d={d} stroke={base} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              <path d={d} pathLength={100} stroke={color} strokeWidth={isOut ? 1.4 : 1} strokeOpacity={isOut ? 1 : 0.7} vectorEffect="non-scaling-stroke" className="flow-dots" style={{ animationDelay: `${(isOut ? 0.9 : 0) + i * 0.5}s` }} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Conector vertical para mobile: o mesmo fluxo de pontos, mas a descer entre as secções
// empilhadas → o efeito "antes → motor → resultados" fica visível no telemóvel.
function FlowGapVertical({ dir }: { dir: 'in' | 'out' }) {
  const isOut = dir === 'out'
  const color = isOut ? 'var(--accent)' : '#5c6573'
  const base = isOut ? 'rgb(var(--accent-rgb) / 0.16)' : 'rgba(120,130,145,0.12)'
  return (
    <div
      className="md:hidden flex justify-center h-11"
      aria-hidden
      style={isOut ? { filter: 'drop-shadow(0 0 3px rgb(var(--accent-rgb) / 0.85))' } : undefined}
    >
      <svg viewBox="0 0 20 100" preserveAspectRatio="none" fill="none" className="h-full w-5">
        <path d="M10 0 L10 100" stroke={base} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        <path d="M10 0 L10 100" pathLength={100} stroke={color} strokeWidth={isOut ? 1.6 : 1} strokeOpacity={isOut ? 1 : 0.7} vectorEffect="non-scaling-stroke" className="flow-dots" />
      </svg>
    </div>
  )
}

// Diagrama de transformação: estado inicial → motor Element Group → resultados reais.
// Animações 100% CSS (flow-dots) → componente de servidor, sem JS.
export default function ResultsFlow({ eyebrow, title, subtitle, before, engineChips, results }: Props) {
  return (
    <div className="max-w-[1080px] mx-auto px-6">
      <div className="text-center max-w-[640px] mx-auto mb-14">
        {eyebrow && <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">{eyebrow}</p>}
        <h2 id="resultados" className="text-white">{title}</h2>
        {subtitle && <p className="mt-5 text-muted leading-relaxed">{subtitle}</p>}
      </div>

      {/* títulos das colunas (desktop), alinhados com a estrutura flex abaixo */}
      <div className="hidden md:flex items-center mb-6">
        <p className="flex-1 text-center text-[11px] uppercase tracking-[0.2em] text-dark">Antes</p>
        <span className="w-14 lg:w-20 shrink-0" />
        <p className="w-[170px] lg:w-[210px] shrink-0 text-center text-[11px] uppercase tracking-[0.2em] text-accent">Element Group</p>
        <span className="w-14 lg:w-20 shrink-0" />
        <p className="flex-1 text-center text-[11px] uppercase tracking-[0.2em] text-dark">Resultados</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-0">
        {/* Antes */}
        <div className="md:flex-1 flex flex-col justify-center gap-4 lg:gap-7">
          {before.map((b) => (
            <div key={b.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-bg-card/70 p-4">
              <span className="grid place-items-center w-9 h-9 shrink-0 rounded-lg border border-white/10 bg-white/[0.04] text-muted">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{b.icon}</svg>
              </span>
              <span className="text-sm text-muted leading-snug">{b.label}</span>
            </div>
          ))}
        </div>

        <FlowGapVertical dir="in" />
        <FlowGap dir="in" />

        {/* Motor Element Group */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="relative grid place-items-center w-[170px] h-[170px] lg:w-[210px] lg:h-[210px]">
            <div aria-hidden className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.22), transparent 68%)', filter: 'blur(6px)' }} />
            <div aria-hidden className="absolute inset-0 rounded-full border border-accent/20" />
            <div aria-hidden className="absolute inset-[6%] rounded-full border border-accent/30" />
            <div className="relative z-10 flex flex-col items-center gap-2.5">
              <Image src="/apple-touch-icon.png" alt="Element Group" width={180} height={180} className="w-11 h-11 lg:w-14 lg:h-14 rounded-2xl" />
              <div className="grid gap-1.5">
                {engineChips.map((c) => (
                  <span key={c} className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-center text-[11px] font-medium text-white">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <FlowGap dir="out" />
        <FlowGapVertical dir="out" />

        {/* Resultados */}
        <div className="md:flex-1 flex flex-col justify-center gap-4 lg:gap-7">
          {results.map((r) => (
            <div key={r.label} className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-4 lg:p-5 text-center md:text-left">
              <div className="font-heading text-2xl lg:text-3xl font-medium text-white leading-none tabular-nums">{r.metric}</div>
              <p className="mt-1.5 text-[12px] text-accent">{r.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
