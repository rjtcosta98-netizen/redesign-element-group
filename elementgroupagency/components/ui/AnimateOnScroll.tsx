'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number // segundos (mantém a API anterior do framer)
  direction?: 'up' | 'left' | 'right'
}

const HIDDEN: Record<NonNullable<Props['direction']>, string> = {
  up: 'translateY(30px)',
  left: 'translateX(-30px)',
  right: 'translateX(30px)',
}

// Reveal on scroll sem framer-motion — IntersectionObserver + transição CSS.
// Mesma animação de antes, mas sem ~45KB de JS no bundle inicial.
export default function AnimateOnScroll({ children, className = '', delay = 0, direction = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeita "reduzir movimento": mostra de imediato, sem transição.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -80px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : HIDDEN[direction],
        transition: `opacity 0.6s cubic-bezier(0.44,0,0.56,1) ${delay}s, transform 0.6s cubic-bezier(0.44,0,0.56,1) ${delay}s`,
        willChange: shown ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
