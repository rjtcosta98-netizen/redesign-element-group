'use client'
import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export type PainItem = { pain: string; cost: string }

type Props = {
  title: ReactNode
  intro: string
  items: PainItem[]
  eyebrow?: string
}

// Secção da dor: alarmes que acendem em sequência + a consequência (custo) de cada dor.
// Reutilizada nas 4 páginas de serviço. Tom âmbar/vermelho só nesta secção (loss aversion).
export default function PainPoints({ title, intro, items, eyebrow = 'Soa-te familiar?' }: Props) {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="problema">
      {/* glow quente — mesmo fundo, sensação de aviso (não o azul calmo) */}
      <div
        aria-hidden
        className="glow-drift absolute -right-24 top-10 w-[520px] h-[520px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgba(216,85,74,0.10), transparent 65%)' }}
      />

      <div className="relative max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        <AnimateOnScroll direction="left">
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-dark mb-5">
            <span aria-hidden className="relative grid place-items-center w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-[#d8554a] pain-bar" />
              <span className="w-2 h-2 rounded-full bg-[#d8554a]/80" />
            </span>
            {eyebrow}
          </p>
          <h2 id="problema" className="text-white">{title}</h2>
          <p className="mt-6 text-muted leading-relaxed max-w-md">{intro}</p>
        </AnimateOnScroll>

        <ul role="list" className="flex flex-col gap-3.5">
          {items.map((it, i) => (
            <motion.li
              key={it.pain}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 0.61, 0.36, 1] }}
              className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-bg-card/50 p-4 pl-5
                         transition-colors duration-300 hover:border-[#d8554a]/45 hover:bg-[#d8554a]/[0.04]"
            >
              {/* flash vermelho a "acender" quando entra no ecrã */}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none bg-[#d8554a]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 0.18, 0] }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1, delay: i * 0.12 + 0.15, ease: 'easeOut' }}
                />
              )}

              {/* barra de alerta lateral, pulso contínuo */}
              <span aria-hidden className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-[#d8554a] pain-bar" />

              <span className="relative grid place-items-center w-6 h-6 shrink-0 rounded-full border border-[#d8554a]/30 bg-[#d8554a]/10 text-[#e9a298] mt-0.5" aria-hidden>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9v4" /><path d="M12 17h.01" />
                  <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                </svg>
              </span>

              <div className="relative min-w-0">
                <p className="text-sm text-white/80 leading-relaxed">{it.pain}</p>
                <p className="mt-2 flex items-start gap-1.5 text-[13px] text-[#e9a298] leading-snug">
                  <svg className="shrink-0 mt-px" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 7v10h10" /><path d="m7 17 10-10" />
                  </svg>
                  <span>{it.cost}</span>
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
