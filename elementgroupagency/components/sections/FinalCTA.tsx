import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'

// Faint deterministic stars (no Math.random → no hydration mismatch),
// echoing the cosmic hero so the page opens and closes in space.
const STARS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 71 + 7) % 100,
  top: (i * 37 + 5) % 55,
  size: i % 6 === 0 ? 2 : 1,
  op: 0.18 + ((i * 13) % 4) / 10,
  delay: ((i * 9) % 40) / 10,
}))

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] pt-28 pb-32 md:pb-44">
      {/* Twinkling stars in the upper sky */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
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

      {/* Planet horizon rising from the bottom — steel-blue rim glow (bookend of the hero) */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[-1040px] w-[1400px] h-[1400px] rounded-full bg-[#08090b]"
        style={{ boxShadow: '0 -34px 110px -8px rgba(127,168,217,0.45)' }}
      />
      {/* Soft glow blooming above the horizon */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[820px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 100%, rgba(127,168,217,0.22), transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
        <AnimateOnScroll>
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">Vamos a isto</p>
          <h2 className="text-white">Pronto para pôr o teu negócio a crescer online?</h2>
          <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
            Pede o teu orçamento grátis hoje. Respondemos em menos de 2 horas, com um plano
            claro e preço fixo — sem compromisso.
          </p>

          <div className="mt-10 flex flex-col items-center gap-5">
            <GlowButton href="/contacto">Pedir orçamento grátis</GlowButton>
            <span className="text-sm text-white/70">
              Preferes email?{' '}
              <Link href="mailto:info@elementgroup.pt" className="text-white/90 underline underline-offset-4 hover:text-white transition-colors">
                info@elementgroup.pt
              </Link>
            </span>
          </div>

          <p className="mt-12 text-xs text-muted flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
            <span><span className="text-accent" aria-hidden>★</span> 5,0 no Google</span>
            <span className="text-dark" aria-hidden>·</span>
            <span>a partir de 297€</span>
            <span className="text-dark" aria-hidden>·</span>
            <span>sem mensalidades obrigatórias</span>
            <span className="text-dark" aria-hidden>·</span>
            <span>resposta em &lt; 2h</span>
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
