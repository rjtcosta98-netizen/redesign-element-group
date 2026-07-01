'use client'
import { useState, useId } from 'react'
import { motion } from 'framer-motion'

type Item = { q: string; a: string }

// Reusable accessible accordion (used across the service pages).
export default function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <div className="flex flex-col gap-3">
      {items.map((faq, i) => {
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
  )
}
