'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const BARS = [35, 50, 42, 68, 84, 100]

// Barras de "Alcance" que crescem ao entrar no ecrã. Respeita prefers-reduced-motion.
export default function ReachBars() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  return (
    <div ref={ref} className="flex items-end gap-1 h-9">
      {BARS.map((h, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-sm bg-gradient-to-t from-accent/40 to-accent"
          initial={reduce ? false : { height: '14%' }}
          animate={inView || reduce ? { height: `${h}%` } : { height: '14%' }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, delay: i * 0.08, ease: [0.44, 0, 0.56, 1] }}
        />
      ))}
    </div>
  )
}
