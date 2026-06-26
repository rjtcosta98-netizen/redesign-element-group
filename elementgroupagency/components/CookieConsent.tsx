'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const KEY = 'eg-cookie-consent'

// Banner de consentimento (RGPD). Cookies analíticos (Google Analytics) só devem
// carregar após 'accepted'. TODO: gatilho de carregamento do GA no choose('accepted').
export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true)
    } catch {
      /* localStorage indisponível — não mostra */
    }
  }, [])

  function choose(value: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(KEY, value)
    } catch {}
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed bottom-4 inset-x-4 z-[60] md:left-auto md:right-6 md:max-w-md" role="dialog" aria-label="Consentimento de cookies">
      <div className="rounded-2xl border border-white/10 bg-bg-card/95 backdrop-blur-md p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <p className="text-sm text-muted leading-relaxed">
          Usamos cookies essenciais e, com o teu consentimento, cookies analíticos (Google Analytics) para
          melhorar o site.{' '}
          <Link href="/politica-de-cookies" className="text-white underline underline-offset-4 hover:text-accent">Saber mais</Link>.
        </p>
        <div className="mt-4 flex gap-2">
          <button onClick={() => choose('accepted')} className="rounded-pill bg-white text-black text-sm font-medium px-5 py-2.5 hover:bg-white/90 transition-colors">
            Aceitar
          </button>
          <button onClick={() => choose('rejected')} className="rounded-pill border border-white/20 text-white text-sm px-5 py-2.5 hover:bg-white/10 transition-colors">
            Rejeitar
          </button>
        </div>
      </div>
    </div>
  )
}
