'use client'
import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import GlowButton from '@/components/ui/GlowButton'

export type ServicePackage = {
  name: string
  desc: string
  price: string
  type: string
  features: string[]
  highlight?: boolean
  tag?: string
}

export type ServiceInclude = {
  title: string
  desc: string
  icon: ReactNode
}

type Props = {
  includes: ServiceInclude[]
  packages: ServicePackage[]
  ctaHref: string
  ctaLabel?: string
  includesTitle?: string
}

const Check = ({ className = '' }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

// Seletor de pacotes: grelha de inclusões (esquerda) + cartão do pacote ativo (direita).
// Mesmo componente reutilizado nas 4 páginas de serviço. Honesto: prova social = dados reais.
export default function PackageSelector({
  includes,
  packages,
  ctaHref,
  ctaLabel = 'Pedir orçamento grátis',
  includesTitle = 'Incluído em todos os pacotes',
}: Props) {
  const reduce = useReducedMotion()
  const hi = packages.findIndex((p) => p.highlight)
  const [active, setActive] = useState(hi === -1 ? 0 : hi)
  const pkg = packages[active]

  return (
    <div className="rounded-[30px] border border-white/10 bg-[#0c0d10] p-3 sm:p-4 md:p-5">
      <div className="grid lg:grid-cols-[1fr_minmax(0,440px)] gap-3 sm:gap-4">
        {/* ── Esquerda: incluído em todos os pacotes ── */}
        <div className="rounded-[22px] bg-bg-card/40 p-6 sm:p-8 flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.2em] text-dark mb-7">{includesTitle}</p>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-7">
            {includes.map((c) => (
              <div key={c.title} className="flex gap-3.5">
                <span className="grid place-items-center w-9 h-9 shrink-0 rounded-lg border border-white/10 bg-white/[0.04] text-accent">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                </span>
                <div className="min-w-0">
                  <h3 className="text-white font-heading text-[15px] font-medium leading-tight">{c.title}</h3>
                  <p className="mt-1 text-muted text-[13px] leading-snug">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* prova social real */}
          <div className="mt-auto pt-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
              <span className="flex gap-0.5 text-accent" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.9 6.3L22 9.3l-5 4.6 1.3 6.8L12 17.5 5.7 20.7 7 13.9l-5-4.6 7.1-1z" />
                  </svg>
                ))}
              </span>
              <span className="text-[12px] text-white/80">
                <span className="text-white font-medium">5,0</span> no Google · 7 avaliações
              </span>
            </div>
          </div>
        </div>

        {/* ── Direita: cartão do pacote selecionado ── */}
        <div className="relative rounded-[22px] border border-white/10 bg-gradient-to-b from-[#191d24] via-[#121419] to-[#0c0d10] p-6 sm:p-7 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 -right-16 w-60 h-60 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 60% 40%, rgb(var(--accent-rgb) / 0.16), transparent 65%)' }}
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-3 mb-6 min-h-[28px]">
              {pkg.tag ? (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-accent font-medium">{pkg.tag}</span>
              ) : pkg.highlight ? (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-accent font-medium">Mais escolhido</span>
              ) : (
                <span />
              )}
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-muted">{pkg.type}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.44, 0, 0.56, 1] }}
              >
                <h3 className="text-white font-heading text-2xl font-medium tracking-[-0.01em]">{pkg.name}</h3>
                <p className="mt-2 text-muted text-sm leading-relaxed min-h-[40px]">{pkg.desc}</p>

                <div className="mt-5">
                  <span className="text-white font-heading text-[40px] leading-none font-medium tracking-[-0.02em]">{pkg.price}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
                      <span className="grid place-items-center w-5 h-5 shrink-0 mt-px rounded-full bg-accent/15 text-accent">
                        <Check />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            {/* seletor de pacotes */}
            <div className="mt-7">
              <p className="text-[11px] uppercase tracking-[0.16em] text-dark mb-3">Escolhe o pacote</p>
              <div className="flex flex-wrap gap-2">
                {packages.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={`rounded-full border px-3.5 py-2 sm:py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
                      i === active
                        ? 'border-accent/50 bg-accent/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-muted hover:text-white hover:border-white/25'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <GlowButton href={ctaHref} className="w-full">{ctaLabel}</GlowButton>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-muted">
              <Check className="text-accent" />
              Orçamento e diagnóstico gratuitos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
