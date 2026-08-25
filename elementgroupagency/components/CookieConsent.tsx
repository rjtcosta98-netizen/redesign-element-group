'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const KEY = 'eg-cookie-consent'

// Banner de consentimento (RGPD). Google Consent Mode v2: o gtag carrega
// sempre em 'denied' e o GoogleAnalytics ouve 'eg-consent-changed' (disparado
// em choose()) para atualizar o consentimento — só há cookies/dados após 'accepted'.
//
// O banner só aparece depois do primeiro scroll (ou de 12 s parado). Em mobile
// estava a tapar um quarto do primeiro ecrã, incluindo o CTA — e a primeira
// impressão do site passava a ser uma caixa legal. Nada se perde em conformidade:
// até haver 'accepted' não é escrito um único cookie analítico.
export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return
    } catch {
      return /* localStorage indisponível — não mostra */
    }

    const reveal = () => setShow(true)
    const onScroll = () => window.scrollY > 240 && reveal()

    window.addEventListener('scroll', onScroll, { passive: true })

    // O temporizador de recurso só corre em ecrã grande. Num telemóvel pequeno
    // (375×667) o hero inteiro cabe no ecrã e o banner aterrava exatamente em
    // cima do CTA primário — aí só o scroll o faz aparecer.
    const grande = window.matchMedia('(min-width: 768px)').matches
    const timer = grande ? window.setTimeout(reveal, 12000) : undefined
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  function choose(value: 'accepted' | 'rejected') {
    try {
      localStorage.setItem(KEY, value)
    } catch {}
    try {
      window.dispatchEvent(new Event('eg-consent-changed'))
    } catch {}
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      // bottom-20 em mobile: fica acima da barra de CTA fixa, nunca por cima dela.
      className="fixed bottom-20 inset-x-3 z-[60] md:bottom-5 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[min(92vw,560px)]
                 animate-fade-in-up motion-reduce:animate-none"
      role="dialog"
      aria-label="Consentimento de cookies"
    >
      <div className="rounded-2xl border border-white/10 bg-bg-card/95 backdrop-blur-md px-4 py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <p className="text-[12px] text-muted leading-relaxed">
          Cookies essenciais e, com o teu consentimento, analíticos (Google Analytics).{' '}
          <Link href="/politica-de-cookies" className="text-white underline underline-offset-4 hover:text-accent">Saber mais</Link>.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => choose('accepted')}
            className="rounded-pill bg-white text-black text-[13px] font-medium px-4 py-2 transition-colors hover:bg-white/90"
          >
            Aceitar
          </button>
          <button
            onClick={() => choose('rejected')}
            className="rounded-pill border border-white/15 text-muted text-[13px] px-4 py-2 transition-colors hover:bg-white/10 hover:text-white"
          >
            Rejeitar
          </button>
        </div>
      </div>
    </div>
  )
}
