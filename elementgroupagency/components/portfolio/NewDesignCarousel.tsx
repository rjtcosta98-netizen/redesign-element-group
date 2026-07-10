'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

// ── Carrossel horizontal do novo design ─────────────────────────────────────
// As imagens já trazem o seu próprio mockup (MacBook / telemóvel) — por isso são
// mostradas RAW (object-contain, sem cromo). Scroll-snap nativo (swipe no mobile),
// botões prev/next (mobile + desktop) + pontos. Acessível (setas do teclado, aria-roledescription).
// SEO-safe: as 4 imagens ficam no DOM com alt descritivo.

type Item = { src: string; alt: string }

export default function NewDesignCarousel({ items }: { items: Item[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    const idx = Math.max(0, Math.min(items.length - 1, i))
    const slide = track.children[idx] as HTMLElement | undefined
    if (!slide) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
  }, [items.length])

  // Mantém o índice ativo em sincronia com o scroll (swipe/arrasto).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        Array.from(track.children).forEach((c, i) => {
          const el = c as HTMLElement
          const mid = el.offsetLeft - track.offsetLeft + el.clientWidth / 2
          const d = Math.abs(mid - center)
          if (d < bestDist) { bestDist = d; best = i }
        })
        setActive(best)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => { track.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollToIndex(active + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollToIndex(active - 1) }
  }

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Galeria do novo design"
      onKeyDown={onKeyDown}
    >
      {/* Pista + setas (as setas centram em top-1/2 da pista) */}
      <div className="relative">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth rounded-[24px]"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((it, i) => (
            <div
              key={it.src}
              className="relative flex h-[46vh] min-h-[300px] max-h-[520px] w-full shrink-0 snap-center items-center justify-center rounded-[24px] border border-white/10 bg-gradient-to-br from-[#14171d] via-[#101216] to-[#0c0d11] p-4 sm:p-8"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${items.length}: ${it.alt}`}
            >
              <span aria-hidden className="absolute -top-10 left-1/2 -translate-x-1/2 w-[70%] h-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.12), transparent 65%)' }} />
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(max-width: 1100px) 92vw, 1040px"
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Botões prev/next — visíveis em mobile e desktop (swipe continua a funcionar) */}
        <button
          type="button"
          onClick={() => scrollToIndex(active - 1)}
          disabled={active === 0}
          aria-label="Imagem anterior"
          className="absolute left-2 top-1/2 grid -translate-y-1/2 place-items-center h-11 w-11 rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:border-accent/50 disabled:opacity-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => scrollToIndex(active + 1)}
          disabled={active === items.length - 1}
          aria-label="Imagem seguinte"
          className="absolute right-2 top-1/2 grid -translate-y-1/2 place-items-center h-11 w-11 rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:border-accent/50 disabled:opacity-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 6 6 6-6 6" /></svg>
        </button>
      </div>

      {/* Legenda do slide ativo */}
      <p className="mt-4 text-center text-[13px] text-muted">{items[active]?.alt}</p>

      {/* Pontos */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Ir para a imagem ${i + 1}`}
            aria-current={active === i}
            className={`h-2 rounded-full transition-all ${active === i ? 'w-6 bg-accent' : 'w-2 bg-white/25 hover:bg-white/40'}`}
          />
        ))}
        <span className="sr-only" aria-live="polite">{`Imagem ${active + 1} de ${items.length}`}</span>
      </div>
    </div>
  )
}
