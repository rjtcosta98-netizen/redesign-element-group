'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

// ── Carrossel do novo design (só setas, sem scroll) ─────────────────────────
// Navegação exclusiva por botões prev/next + setas do teclado + pontos.
// NÃO há scroll/swipe: a pista move-se por transform (translateX), clip com
// overflow-hidden. Larguras EXPLÍCITAS e consistentes:
//   track  = N × 100% da moldura
//   slide  = 100/N % do track  (= exatamente a largura da moldura)
//   move   = active × (100/N)% do track (= active × largura da moldura)
// Cada slide preenche a moldura de ponta a ponta — a mesma imagem entra como
// fundo ampliado e desfocado, com a versão nítida (object-contain) por cima;
// assim nunca se vê "espaço vazio" à volta, mesmo misturando ecrãs landscape
// (web) e portrait (mobile).
// SEO/A11y: todas as imagens ficam no DOM com alt descritivo.

type Item = { src: string; alt: string }

export default function NewDesignCarousel({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0)
  const count = items.length
  const manyDots = count > 10 // muitas imagens → barra de progresso em vez de 20 pontos

  const go = useCallback(
    (i: number) => setActive(Math.max(0, Math.min(count - 1, i))),
    [count],
  )

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1) }
  }

  return (
    <div
      className="relative mx-auto max-w-[1040px]"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Galeria do novo design"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* Moldura: clip + pista deslizante. aspect-ratio no desktop, altura fixa no telemóvel */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-white/10 bg-[#0c0d11] max-[640px]:aspect-auto max-[640px]:h-[70vh] max-[640px]:min-h-[420px]">
        <div
          className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{
            width: `${count * 100}%`,
            transform: `translateX(-${active * (100 / count)}%)`,
          }}
        >
          {items.map((it, i) => (
            <div
              key={it.src}
              className="relative h-full shrink-0 overflow-hidden"
              style={{ width: `${100 / count}%` }}
              role="group"
              aria-roledescription="slide"
              aria-hidden={i !== active}
              aria-label={`${i + 1} de ${count}: ${it.alt}`}
            >
              {/* Fundo: a própria imagem, ampliada e desfocada — preenche o vazio */}
              <Image
                src={it.src}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1100px) 92vw, 1040px"
                className="scale-110 object-cover opacity-35 blur-2xl"
              />
              <span aria-hidden className="absolute inset-0 bg-[#0c0d11]/45" />
              {/* Glow de acento no topo */}
              <span aria-hidden className="pointer-events-none absolute -top-10 left-1/2 h-40 w-[70%] -translate-x-1/2" style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.12), transparent 65%)' }} />
              {/* Imagem nítida */}
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(max-width: 1100px) 92vw, 1040px"
                priority={i === 0}
                className="object-contain p-4 sm:p-8"
              />
            </div>
          ))}
        </div>

        {/* Botões prev/next — únicos meios de avançar (mobile + desktop) */}
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label="Imagem anterior"
          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:border-accent/50 hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === count - 1}
          aria-label="Imagem seguinte"
          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition hover:border-accent/50 hover:bg-black/70 disabled:pointer-events-none disabled:opacity-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 6 6 6-6 6" /></svg>
        </button>

        {/* Contador */}
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white/80 backdrop-blur-md">
          {active + 1}/{count}
        </div>
      </div>

      {/* Legenda do slide ativo */}
      <p className="mt-4 text-center text-[13px] text-muted">{items[active]?.alt}</p>

      {/* Navegação: barra de progresso (muitas imagens) ou pontos (poucas) */}
      {manyDots ? (
        <div className="mx-auto mt-5 flex max-w-[420px] items-center gap-3">
          <span className="text-[11px] font-medium tabular-nums text-white/50">{active + 1}</span>
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-500 ease-out motion-reduce:transition-none"
              style={{ width: `${((active + 1) / count) * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-medium tabular-nums text-white/50">{count}</span>
          <span className="sr-only" aria-live="polite">{`Imagem ${active + 1} de ${count}`}</span>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir para a imagem ${i + 1}`}
              aria-current={active === i}
              className={`h-2 rounded-full transition-all ${active === i ? 'w-6 bg-accent' : 'w-2 bg-white/25 hover:bg-white/40'}`}
            />
          ))}
          <span className="sr-only" aria-live="polite">{`Imagem ${active + 1} de ${count}`}</span>
        </div>
      )}
    </div>
  )
}
