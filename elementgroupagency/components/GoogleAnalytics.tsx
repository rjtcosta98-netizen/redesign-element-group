'use client'
import Script from 'next/script'
import { useEffect, useState } from 'react'

// GA4 (Google tag). Só carrega após consentimento analítico (RGPD).
// O gatilho vem do CookieConsent: 'accepted' guarda em localStorage e dispara
// o evento 'eg-consent-changed'. Enquanto não houver consentimento, nada carrega.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-RNWM2MQTRT'
const CONSENT_KEY = 'eg-cookie-consent'

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    function check() {
      try {
        if (localStorage.getItem(CONSENT_KEY) === 'accepted') setEnabled(true)
      } catch {
        /* localStorage indisponível — não carrega */
      }
    }
    check()
    window.addEventListener('eg-consent-changed', check)
    return () => window.removeEventListener('eg-consent-changed', check)
  }, [])

  if (!enabled) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
