'use client'
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

// Logótipo nas cores originais + nome, sempre visíveis. Sem filtros nem hover.
// Se o logo faltar/falhar, fica só o nome — nunca parte.
export default function ClientLogo({ name, logo }: { name: string; logo?: string }) {
  const [failed, setFailed] = useState(false)
  const hasLogo = !!logo && !failed

  return (
    <span className="inline-flex items-center gap-3 select-none">
      {hasLogo && (
        <img
          src={logo}
          alt={name}
          onError={() => setFailed(true)}
          className="h-8 md:h-10 w-auto object-contain"
          loading="lazy"
          draggable={false}
        />
      )}
      <span className="font-heading font-medium text-[15px] md:text-base tracking-[-0.01em] whitespace-nowrap text-white/70">
        {name}
      </span>
    </span>
  )
}
