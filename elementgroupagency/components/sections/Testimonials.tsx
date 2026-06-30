'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Review } from '@/lib/reviews'

// Fallback caso o Supabase não esteja disponível (dev sem env, etc.).
const FALLBACK: Review[] = [
  {
    quote: 'Desde o primeiro dia falei sempre com a mesma pessoa. Explicou tudo sem complicar e respondia em minutos — fez-me sentir que o meu negócio importava mesmo.',
    name: 'Cliente Element Group',
    role: 'Negócio local · Portugal',
  },
]

// Avatar: usa a foto (avatar) se existir; senão, círculo com iniciais.
function initials(name: string) {
  const p = name.trim().split(/\s+/).filter(Boolean)
  return ((p[0]?.[0] ?? '') + (p[1]?.[0] ?? '')).toUpperCase()
}
function Avatar({ r, className }: { r: Review; className: string }) {
  if (r.avatar) {
    return (
      <Image
        src={r.avatar}
        alt=""
        width={260}
        height={260}
        className={`${className} object-cover grayscale`}
        unoptimized
      />
    )
  }
  return (
    <span
      aria-hidden
      className={`${className} grid place-items-center bg-gradient-to-br from-accent/80 to-[#2f4f7a] text-white font-heading font-semibold`}
      style={{ fontSize: 44 }}
    >
      {initials(r.name)}
    </span>
  )
}

export default function Testimonials({ reviews }: { reviews?: Review[] }) {
  const list = reviews && reviews.length ? reviews : FALLBACK
  const [idx, setIdx] = useState(0)
  const t = list[idx]
  const peek = [1, 2, 3].map((o) => list[(idx + o) % list.length])

  return (
    <section className="bg-bg py-24 px-6 border-t border-white/10">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-white">O que dizem de trabalhar comigo</h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Para além do resultado, o que fica é a relação — próxima, honesta e sem dores de cabeça.
          </p>
        </div>

        <div className="flex items-center gap-8 overflow-hidden">
          {/* Active testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8 shrink-0 w-full lg:w-auto"
            >
              <Avatar r={t} className="w-[160px] h-[200px] md:w-[240px] md:h-[260px] rounded-2xl shrink-0" />
              <div className="max-w-sm">
                <p className="text-white font-heading font-medium">{t.name}</p>
                <p className="mt-4 text-muted text-sm leading-relaxed">“{t.quote}”</p>
                {t.role ? <p className="mt-6 text-white/80 text-sm">{t.role}</p> : null}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Peek of upcoming reviewers */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {peek.map((p, i) => (
              <Avatar key={`${p.name}-${i}`} r={p} className="w-[130px] h-[260px] rounded-2xl shrink-0 opacity-90" />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIdx(i => (i - 1 + list.length) % list.length)}
              className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-bg transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span className="sr-only">Testemunho anterior</span>
            </button>
            <button
              onClick={() => setIdx(i => (i + 1) % list.length)}
              className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-bg transition-colors"
            >
              <span aria-hidden="true">→</span>
              <span className="sr-only">Testemunho seguinte</span>
            </button>
          </div>
          <span className="text-muted text-sm">{idx + 1}/{list.length}</span>
        </div>
      </div>
    </section>
  )
}
