'use client'

import Image from 'next/image'
import { useCallback, useId, useRef, useState } from 'react'

// ── Slider interativo Antes → Depois ────────────────────────────────────────
// Mobile-first: arrasta-se com o polegar. Acessível: <input type=range> real
// (teclado + leitores de ecrã). SEO-safe: ambas as imagens ficam no DOM com alt
// descritivo. Sem libs — pointer events + clip-path (GPU). Respeita reduced-motion
// (a única animação é a dica de arrastar no handle, desligada por CSS global).

type Pair = { before: string; after: string; beforeAlt: string; afterAlt: string }

function Reveal({
  pair,
  frame,
  sizes,
}: {
  pair: Pair
  frame: 'browser' | 'phone'
  sizes: string
}) {
  const [pos, setPos] = useState(50) // % revelado do "depois"
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const labelId = useId()

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, p)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  const isPhone = frame === 'phone'
  const radius = isPhone ? 'rounded-[2rem]' : 'rounded-[10px]'

  return (
    <div
      className={`relative select-none overflow-hidden bg-[#0e0f13] ${
        isPhone
          ? 'w-[230px] sm:w-[260px] rounded-[2.6rem] p-[6px] shadow-[0_36px_84px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)]'
          : 'w-full rounded-[14px] overflow-hidden border border-white/12 shadow-[0_44px_100px_-44px_rgba(0,0,0,0.9)]'
      }`}
    >
      {/* Cromo — browser (site) ou dynamic island (telemóvel) */}
      {frame === 'browser' ? (
        <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10 bg-white/[0.03]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]/85" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]/85" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]/85" />
          <div className="ml-3 flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 h-6 w-full max-w-[320px] rounded-full bg-white/[0.06] px-3">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dark shrink-0" aria-hidden>
                <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span className="text-[11px] text-dark truncate">mariamendesmassagens.pt</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 h-[18px] w-[30%] rounded-full bg-[#050507]" aria-hidden />
      )}

      {/* Palco do comparador */}
      <div
        ref={trackRef}
        className={`relative w-full cursor-ew-resize ${isPhone ? radius + ' overflow-hidden' : ''}`}
        style={{ aspectRatio: isPhone ? '9 / 19.5' : '16 / 10', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* DEPOIS — base (lado direito) */}
        <Image src={pair.after} alt={pair.afterAlt} fill sizes={sizes} className="object-cover object-top pointer-events-none" />

        {/* ANTES — sobreposto, revelado à esquerda por clip-path */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden>
          <Image src={pair.before} alt="" fill sizes={sizes} className="object-cover object-top pointer-events-none" />
          <span className="absolute inset-0 bg-black/10" />
        </div>

        {/* Etiquetas de canto */}
        <span className="absolute top-3 left-3 z-20 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm pointer-events-none">
          Antes
        </span>
        <span className="absolute top-3 right-3 z-20 rounded-full bg-accent/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm pointer-events-none">
          Depois
        </span>

        {/* Controlo acessível — teclado + leitores de ecrã. Vem ANTES da divisória
            no DOM para poder ser "peer" do handle (foco visível). pointer-events-none
            deixa o arrasto passar para o palco; teclado/foco continuam a funcionar. */}
        <label htmlFor={labelId} className="sr-only">
          Comparar antes e depois — arrasta para revelar o novo design
        </label>
        <input
          id={labelId}
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-valuetext={`${Math.round(pos)}% do novo design visível`}
          className="peer absolute inset-0 z-20 h-full w-full opacity-0 pointer-events-none"
        />

        {/* Linha divisória + handle */}
        <div className="absolute inset-y-0 z-20 w-px bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.5)] pointer-events-none" style={{ left: `${pos}%` }}>
          <span className="ba-handle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full border border-white/70 bg-black/55 text-white backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.5)] transition-shadow peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 18-6-6 6-6" transform="translate(-3 0)" /><path d="m9 6 6 6-6 6" transform="translate(3 0)" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function BeforeAfterReveal({ web, mobile }: { web?: Pair; mobile?: Pair }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[720px] max-w-full h-[440px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.14), transparent 62%)' }}
      />
      <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-14">
        {web && (
          <div className="w-full lg:max-w-[680px]">
            <Reveal pair={web} frame="browser" sizes="(max-width: 1024px) 92vw, 680px" />
          </div>
        )}
        {mobile && (
          <div className="shrink-0">
            <Reveal pair={mobile} frame="phone" sizes="(max-width: 640px) 230px, 260px" />
          </div>
        )}
      </div>
      <p className="mt-8 flex items-center justify-center gap-2 text-center text-[13px] text-muted">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden>
          <path d="M8 7 3 12l5 5" /><path d="m16 7 5 5-5 5" /><path d="M3 12h18" />
        </svg>
        Arrasta para comparar — mesmo conteúdo, nova experiência
      </p>
    </div>
  )
}
