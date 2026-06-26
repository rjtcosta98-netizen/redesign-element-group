'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import type { Review } from '@/lib/reviews'

// Reviews vêm do Supabase (via server component). Fallback caso não haja env/dados.
const FALLBACK: Review[] = [
  {
    quote:
      'Desde o primeiro dia senti que falava com alguém que se importava mesmo com o meu negócio — e não com mais um cliente. Explicou tudo sem complicar e esteve sempre disponível.',
    name: 'Cliente Element Group',
    role: 'Negócio local · Portugal',
  },
]

function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean)
  return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase()
}

export default function Quotes({ reviews }: { reviews?: Review[] }) {
  const QUOTES = reviews && reviews.length ? reviews : FALLBACK
  const count = QUOTES.length
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = useCallback((d: number) => setI((p) => (p + d + count) % count), [count])

  // Gentle autoplay; pauses on hover and respects reduced motion.
  useEffect(() => {
    if (paused || count < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((p) => (p + 1) % count), 7000)
    return () => clearInterval(id)
  }, [paused, count])

  const q = QUOTES[i]

  return (
    <section className="bg-bg py-24 px-6" aria-labelledby="testemunhos">
      <div className="max-w-[860px] mx-auto">
        <AnimateOnScroll className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 mb-5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="text-accent" aria-hidden>
              <path d="M7 7h5v5c0 3-2 5-5 5v-2c1.7 0 3-1.3 3-3H7V7Zm9 0h5v5c0 3-2 5-5 5v-2c1.7 0 3-1.3 3-3h-3V7Z" />
            </svg>
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted">Testemunhos</span>
          </span>
          <h2 id="testemunhos" className="text-white">O que fica é a relação</h2>
          <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
            Para além de um site bonito, o que os clientes guardam é como foi trabalhar comigo.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div
            className="relative overflow-hidden rounded-[28px] border border-white/10
                       bg-gradient-to-br from-[#1a2233] via-[#121620] to-[#0d0e11] p-8 md:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Glow + oversized quote mark */}
            <div
              aria-hidden
              className="absolute -top-20 left-1/4 w-[420px] h-[420px] pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.18), transparent 60%)' }}
            />
            <span aria-hidden className="absolute top-5 left-7 font-heading text-[90px] leading-none text-accent/20 select-none">“</span>

            <div className="relative min-h-[210px] md:min-h-[190px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.44, 0, 0.56, 1] }}
                >
                  <p className="text-white text-lg md:text-2xl font-heading font-medium leading-snug tracking-[-0.01em]">
                    {q.quote}
                  </p>
                  <footer className="mt-7 flex items-center gap-3">
                    {q.avatar ? (
                      <Image src={q.avatar} alt={q.name} width={44} height={44} className="w-11 h-11 rounded-full object-cover border border-white/15" unoptimized />
                    ) : (
                      <span className="grid place-items-center w-11 h-11 rounded-full bg-gradient-to-br from-accent to-[#4f7fb8] text-white font-heading font-semibold text-sm">
                        {initials(q.name)}
                      </span>
                    )}
                    <div>
                      <p className="text-white text-sm font-medium leading-tight">{q.name}</p>
                      {q.role && <p className="text-[12px] text-muted">{q.role}</p>}
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Controls */}
        {count > 1 && (
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Testemunho anterior"
              className="grid place-items-center w-9 h-9 rounded-full border border-white/15 text-white/70
                         hover:text-white hover:border-white/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            <div className="flex items-center gap-2">
              {QUOTES.map((_: Review, d: number) => (
                <button
                  key={d}
                  onClick={() => setI(d)}
                  aria-label={`Ir para o testemunho ${d + 1}`}
                  aria-current={d === i}
                  className={`h-2 rounded-full transition-all duration-300 ${d === i ? 'w-6 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Testemunho seguinte"
              className="grid place-items-center w-9 h-9 rounded-full border border-white/15 text-white/70
                         hover:text-white hover:border-white/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
