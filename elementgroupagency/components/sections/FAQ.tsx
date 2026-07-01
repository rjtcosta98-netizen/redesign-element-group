'use client'
import { useState, useId } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import { FAQS } from '@/lib/faq-home'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section className="bg-bg py-24 px-6 border-t border-white/10" aria-labelledby="faq">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          {/* Support card — sticky wrapper kept separate from AnimateOnScroll:
              an active transform on the sticky element itself breaks position:sticky */}
          <div className="md:sticky md:top-28">
          <AnimateOnScroll direction="left">
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-bg-card p-8
                            bg-[radial-gradient(circle_at_50%_0%,rgba(127,168,217,0.16),rgba(14,14,14,0)_60%)]">
              {/* faint grid texture */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '34px 34px',
                }}
              />

              <div className="relative">
                {/* Glowing brand tile */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1c2738] to-[#0f1318]
                                border border-white/10 flex items-center justify-center
                                shadow-[0_0_50px_rgba(127,168,217,0.4)]">
                  <Image src="/web-app-manifest-512x512.png" alt="Element Group" width={36} height={36} className="w-9 h-9" />
                </div>

                <p className="mt-7 text-[11px] uppercase tracking-[0.22em] text-dark">FAQ</p>
                <h2 id="faq" className="mt-2 text-white">Ainda com dúvidas?</h2>
                <p className="mt-4 text-muted text-sm leading-relaxed max-w-xs">
                  Fala connosco sem compromisso. Respondemos em menos de 2 horas com tudo o que precisas de saber.
                </p>

                <div className="mt-7">
                  <GlowButton href="/contacto">Pedir orçamento grátis</GlowButton>
                </div>

                <div className="mt-7 flex items-center gap-2 text-xs text-muted">
                  <span className="text-accent" aria-hidden>★</span>
                  5,0 no Google · resposta em &lt; 2h
                </div>
              </div>
            </div>
          </AnimateOnScroll>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-colors duration-300
                    ${isOpen ? 'border-accent/30 bg-bg-card' : 'border-white/10 bg-bg-card/40 hover:border-white/20'}`}
                >
                  <h3>
                    <button
                      id={`${uid}-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${uid}-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4
                                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded-2xl"
                    >
                      <span className={`font-heading text-base md:text-lg transition-colors ${isOpen ? 'text-white' : 'text-white/85'}`}>
                        {faq.q}
                      </span>
                      {/* + that morphs into − */}
                      <span className="relative w-4 h-4 shrink-0 text-accent" aria-hidden>
                        <span className="absolute top-1/2 left-0 w-4 h-0.5 -translate-y-1/2 rounded-full bg-current" />
                        <span className={`absolute left-1/2 top-0 w-0.5 h-4 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
                      </span>
                    </button>
                  </h3>

                  <motion.div
                    id={`${uid}-a-${i}`}
                    role="region"
                    aria-labelledby={`${uid}-q-${i}`}
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-muted text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
