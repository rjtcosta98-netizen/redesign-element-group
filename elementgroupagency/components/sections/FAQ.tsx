'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'


// Objection-busting, SEO-aware PT-PT FAQ. Só factos reais:
// desde 297€, preço fixo, PageSpeed 95+, domínio/alojamento incluídos,
// PMEs em todo o Portugal, planos mensais, resposta <2h.
const FAQS = [
  {
    q: 'Quanto custa um website?',
    a: 'Os nossos websites começam em 297€, com preço fixo definido à cabeça — sem custos escondidos. O valor final depende do que precisas (site institucional, loja online, número de páginas) e dizemos-te tudo na proposta gratuita, antes de avançares.',
  },
  {
    q: 'Quanto tempo demora a ter o meu site pronto?',
    a: 'Depende da dimensão do projeto: um site institucional fica normalmente pronto mais depressa do que uma loja online completa. Depois de conversarmos, indicamos um prazo concreto na proposta — e cumprimo-lo.',
  },
  {
    q: 'Preciso de perceber de tecnologia ou tratar do domínio e alojamento?',
    a: 'Não. Tratamos de tudo por ti — design, desenvolvimento, domínio e alojamento. Só precisas de nos dizer o que queres para o teu negócio; a parte técnica é connosco.',
  },
  {
    q: 'Já tenho um site. Conseguem melhorá-lo?',
    a: 'Sim. Podemos redesenhar, acelerar (PageSpeed 95+) e otimizar para SEO o teu site atual, ou criar um novo de raiz — o que fizer mais sentido para os teus objetivos e orçamento.',
  },
  {
    q: 'Trabalham com o meu setor e com a minha zona?',
    a: 'Trabalhamos com PMEs de praticamente qualquer setor, em todo o Portugal — presencialmente ou à distância. Especializamo-nos em pequenos e médios negócios, não em grandes multinacionais.',
  },
  {
    q: 'O que acontece depois do site estar online?',
    a: 'Não desaparecemos. Temos planos mensais de manutenção, SEO e gestão de redes para o teu negócio continuar a crescer — mas sem obrigação: o site é teu e continuas connosco só se quiseres.',
  },
]

// Structured data (FAQPage) — ajuda o Google a mostrar as respostas em destaque.
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-bg py-24 px-6 border-t border-white/10" aria-labelledby="faq">
      {/* SEO: FAQ rich-result schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          {/* Support card — sticky, converts the "still unsure" reader */}
          <AnimateOnScroll className="md:sticky md:top-28" direction="left">
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
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
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

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.44, 0, 0.56, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-muted text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
