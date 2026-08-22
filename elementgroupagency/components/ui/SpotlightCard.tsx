'use client'
import { useRef, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

// Cartão com borda que acende debaixo do cursor. Escreve --mx/--my no próprio
// elemento em pointermove; o desenho vive em globals.css (.spotlight), por isso
// não há re-render de React a cada movimento do rato — só duas custom properties.
export default function SpotlightCard({ children, className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} style={style} className={`spotlight ${className}`}>
      {children}
    </div>
  )
}
