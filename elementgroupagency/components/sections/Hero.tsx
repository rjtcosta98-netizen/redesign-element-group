'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import GlowButton from '@/components/ui/GlowButton'

// A few faint twinkling stars layered over the upper sky for a touch of life
// (deterministic positions → no SSR/hydration mismatch).
const STARS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 71 + 5) % 100,
  top: (i * 43 + 4) % 42,
  size: i % 7 === 0 ? 2 : 1,
  op: 0.2 + ((i * 13) % 4) / 10,
  delay: ((i * 9) % 40) / 10,
}))

const float = (delay: number) => ({
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, delay, ease: [0.44, 0, 0.56, 1] as const },
})

function CardShell({ className, children, delay }: { className: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      {...float(delay)}
      aria-hidden
      className={`absolute hidden xl:flex flex-col gap-2 rounded-2xl border border-white/10
                  bg-bg-card/80 backdrop-blur-md p-4 shadow-[0_20px_50px_rgba(0,0,0,0.55)] ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const [bgLoaded, setBgLoaded] = useState(false)

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#08090b]">
      {/* Photoreal Earth-from-space backdrop (curve, atmosphere, city lights, stars baked in).
          Faz fade-in suave quando carrega — evita o "salto" de preto para imagem. */}
      <Image
        src="/photorealistic-earth-planet.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        onLoad={() => setBgLoaded(true)}
        className={`object-cover transition-opacity duration-[1400ms] ease-out ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectPosition: 'center 5%' }}
      />

      {/* Global dark overlay — knocks the image back so the copy reads cleanly */}
      <div className="absolute inset-0 bg-[#08090b]/50 pointer-events-none" />

      {/* Extra twinkling stars in the upper sky */}
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white twinkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.op,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Top vignette for nav/headline legibility */}
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#08090b] via-[#08090b]/40 to-transparent pointer-events-none" />
      {/* Soft scrim behind the headline (keeps text readable over the bright atmosphere) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(58% 40% at 50% 46%, rgba(8,9,11,0.6) 0%, rgba(8,9,11,0) 64%)' }}
      />
      {/* Bottom fade so the hero melts into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 min-h-screen flex flex-col items-center justify-center text-center">
        {/* Floating proof cards (decorative — kept clear of the text column, xl+ only) */}
        <CardShell className="top-[15%] left-[2%] 2xl:left-[6%] w-[168px]" delay={0.5}>
          <p className="text-[11px] text-muted">PageSpeed</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-heading font-medium text-white leading-none">98</span>
            <span className="text-[11px] text-accent mb-1">/ 100</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-accent to-[#4f7fb8]" />
          </div>
          <p className="text-[10px] text-dark">Performance por defeito</p>
        </CardShell>

        <CardShell className="bottom-[13%] left-[3%] 2xl:left-[7%] w-[196px]" delay={0.7}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted">Tráfego orgânico</p>
            <span className="text-[11px] text-accent font-medium">↑ 3,2×</span>
          </div>
          <svg viewBox="0 0 160 56" className="w-full h-12" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trafGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7FA8D9" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#7FA8D9" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 48 L32 40 L64 42 L96 26 L128 20 L160 6" stroke="#7FA8D9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0 48 L32 40 L64 42 L96 26 L128 20 L160 6 L160 56 L0 56 Z" fill="url(#trafGrad)" />
          </svg>
        </CardShell>

        <CardShell className="top-[15%] right-[2%] 2xl:right-[6%] w-[186px]" delay={0.6}>
          <div className="flex items-center gap-1 text-accent text-sm tracking-widest">★★★★★</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-medium text-white leading-none">5,0</span>
            <span className="text-[11px] text-muted">no Google</span>
          </div>
          <p className="text-[10px] text-dark">7 avaliações verificadas</p>
        </CardShell>

        <CardShell className="bottom-[13%] right-[3%] 2xl:right-[7%] w-[206px]" delay={0.8}>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-[#4f7fb8] flex items-center justify-center text-black text-xs">✓</span>
            <p className="text-sm text-white font-medium">Projeto entregue</p>
          </div>
          <p className="text-[11px] text-muted">SEO técnico incluído · Top 3 Google Maps</p>
        </CardShell>

        {/* Central content — kept narrow so it never sits under the cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
          className="relative flex flex-col items-center max-w-2xl"
        >
          <p className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
            <span className="text-accent text-xs" aria-hidden>★</span>
            <span className="text-xs text-muted">5,0 no Google · 7+ projetos entregues desde 2026</span>
          </p>

          <h1 className="mt-7 text-white font-semibold tracking-[-0.04em] leading-[1.04]">
            Websites e marketing digital que fazem o teu negócio crescer
          </h1>

          <p className="mt-6 text-white/80 text-base md:text-lg max-w-xl leading-relaxed">
            Criamos <strong className="font-bold text-white/90">websites à medida, lojas online, SEO e marketing
            digital para PMEs em Portugal</strong> — ultra-rápidos (PageSpeed 95+) e por um terço do preço
            de uma agência. A partir de 297€. De Seia para todo o país.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <GlowButton href="/contacto">Pedir orçamento grátis</GlowButton>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
            >
              Ver trabalhos
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </Link>
          </div>

          {/* Risk-reduction microcopy junto ao CTA primário */}
          <p className="mt-4 text-[12px] text-muted">
            Resposta em &lt; 2h · sem compromisso · preço fixo à cabeça
          </p>
        </motion.div>
      </div>
    </section>
  )
}
