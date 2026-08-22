'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import GlowButton from '@/components/ui/GlowButton'
import { GOOGLE_RATING } from '@/lib/seo'

// A few faint twinkling stars layered over the upper sky for a touch of life
// (deterministic positions → no SSR/hydration mismatch).
const STARS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 71 + 5) % 100,
  top: (i * 43 + 4) % 42,
  size: i % 7 === 0 ? 2 : 1,
  op: 0.2 + ((i * 13) % 4) / 10,
  delay: ((i * 9) % 40) / 10,
}))

// Prova acima da dobra. Antes eram quatro cartões decorativos — um deles um
// gráfico de tráfego genérico, outro a repetir a mesma avaliação do Google que
// já está no badge. Agora cada cartão é um resultado verificável de um cliente
// real, com ligação para o caso, e nenhum repete outro elemento do ecrã.
const PROOF = [
  {
    href: '/portfolio/matias-nature',
    client: 'Matias Nature',
    metric: '20% → 55%',
    label: 'ocupação média anual',
    pos: 'top-[14%] left-[2%] 2xl:left-[6%] w-[206px]',
    delay: 0.5,
  },
  {
    href: '/portfolio/apiarios-terras-da-pulga',
    client: 'Apiários Terras da Pulga',
    metric: '< 1 mês',
    label: 'a esgotar o stock de mel',
    pos: 'bottom-[12%] left-[3%] 2xl:left-[7%] w-[206px]',
    delay: 0.7,
  },
  {
    href: '/portfolio/100-montanhas',
    client: '100Montanhas',
    metric: '15 dias',
    label: 'do arranque ao site no ar',
    pos: 'top-[14%] right-[2%] 2xl:right-[6%] w-[206px]',
    delay: 0.6,
  },
  {
    href: '/portfolio/maria-mendes-massagens',
    client: 'Maria Mendes Massagens',
    metric: '#1',
    label: 'no Google da sua zona',
    pos: 'bottom-[12%] right-[3%] 2xl:right-[7%] w-[206px]',
    delay: 0.8,
  },
]

// A mesma prova, condensada, para os ecrãs onde os cartões flutuantes não cabem.
const PROOF_STRIP = [
  { metric: '20% → 55%', label: 'ocupação média · Matias Nature' },
  { metric: '98/100', label: 'PageSpeed · 100Montanhas' },
  { metric: '< 2h', label: 'resposta a cada pedido' },
]

const float = (delay: number) => ({
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, delay, ease: [0.44, 0, 0.56, 1] as const },
})

// projectCount chega por prop a partir de app/page.tsx (server): importar
// PROJECTS aqui arrastaria o portefólio inteiro para o bundle de cliente da home.
export default function Hero({ projectCount }: { projectCount: number }) {
  const [bgLoaded, setBgLoaded] = useState(false)

  return (
    <section className="relative w-full min-h-screen min-h-dvh overflow-hidden bg-[#08090b]">
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
      <div className="absolute inset-0 bg-[#08090b]/55 pointer-events-none" />

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
        style={{ background: 'radial-gradient(58% 44% at 50% 46%, rgba(8,9,11,0.72) 0%, rgba(8,9,11,0) 66%)' }}
      />
      {/* Bottom fade so the hero melts into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 min-h-screen min-h-dvh flex flex-col items-center justify-center text-center py-28">
        {/* Cartões de prova — resultados reais, cada um liga ao caso (xl+, onde há espaço) */}
        {PROOF.map((p) => (
          <motion.div key={p.href} {...float(p.delay)} className={`absolute hidden xl:block ${p.pos}`}>
            <Link
              href={p.href}
              className="group block rounded-2xl border border-white/10 bg-bg-card/80 backdrop-blur-md p-4 text-left
                         shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-all duration-300
                         hover:border-accent/40 hover:-translate-y-0.5
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-dark">{p.client}</p>
              <p className="mt-2 font-heading text-[26px] font-medium leading-none text-white tabular-nums">{p.metric}</p>
              <p className="mt-1.5 text-[11px] text-muted leading-snug">{p.label}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] text-accent">
                Ver caso
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </span>
            </Link>
          </motion.div>
        ))}

        {/* Central content — kept narrow so it never sits under the cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
          className="relative flex flex-col items-center max-w-[760px]"
        >
          <p className="inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm">
            <span className="text-accent text-xs" aria-hidden>★</span>
            <span className="text-xs text-muted">
              {GOOGLE_RATING.display} no Google · {projectCount} projetos entregues
            </span>
          </p>

          <h1 className="mt-7 text-white font-semibold tracking-[-0.04em] leading-[1.04] text-balance">
            Sites que carregam num segundo, aparecem no Google e trazem clientes
          </h1>

          <p className="mt-6 text-white/80 text-base md:text-lg max-w-[620px] leading-relaxed text-pretty">
            Para PMEs em Portugal: <strong className="font-semibold text-white">websites, lojas online, reservas
            diretas, SEO e automação com IA</strong> — construídos à medida, com preço fixo fechado depois do
            diagnóstico.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
            <GlowButton href="/contacto" variant="solid">Pedir orçamento grátis</GlowButton>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              Ver trabalhos
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </Link>
          </div>

          {/* Risk-reduction microcopy junto ao CTA primário */}
          <p className="mt-4 text-[12px] text-muted">
            Resposta em &lt; 2h · sem compromisso · preço fixo à cabeça
          </p>

          {/* Prova condensada onde os cartões flutuantes não cabem (até xl) */}
          <dl className="xl:hidden mt-10 grid grid-cols-3 gap-x-4 gap-y-2 w-full max-w-lg border-t border-white/10 pt-6">
            {PROOF_STRIP.map((s) => (
              <div key={s.label}>
                <dt className="font-heading text-lg sm:text-xl font-medium text-white tabular-nums leading-none">{s.metric}</dt>
                <dd className="mt-1.5 text-[11px] text-muted leading-snug">{s.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
