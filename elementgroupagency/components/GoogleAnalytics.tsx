'use client'
import Script from 'next/script'
import { useEffect } from 'react'

// GA4 (Google tag) com Google Consent Mode v2 (RGPD/EEE).
// O gtag.js carrega SEMPRE — a tag é detetável e dispara pageview (cookieless
// enquanto o consentimento estiver 'denied'). O consentimento arranca em
// 'denied' (sem cookies/dados pessoais) e passa a 'granted' quando o utilizador
// aceita no CookieConsent (evento 'eg-consent-changed').
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-RNWM2MQTRT'
const CONSENT_KEY = 'eg-cookie-consent'

const consentPayload = (granted: boolean) => ({
  ad_storage: granted ? 'granted' : 'denied',
  analytics_storage: granted ? 'granted' : 'denied',
  ad_user_data: granted ? 'granted' : 'denied',
  ad_personalization: granted ? 'granted' : 'denied',
})

export default function GoogleAnalytics() {
  useEffect(() => {
    function update() {
      let granted = false
      try {
        granted = localStorage.getItem(CONSENT_KEY) === 'accepted'
      } catch {
        /* localStorage indisponível — mantém denied */
      }
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }
      if (typeof w.gtag === 'function') {
        w.gtag('consent', 'update', consentPayload(granted))
      }
    }
    // Aplica já o estado guardado (se o utilizador já aceitou noutra visita).
    update()
    window.addEventListener('eg-consent-changed', update)
    return () => window.removeEventListener('eg-consent-changed', update)
  }, [])

  return (
    <>
      {/* Init único: consent default 'denied' + js + config, ANTES da lib.
          A lib lê o dataLayer ao carregar e dispara o pageview. */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
