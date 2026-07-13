'use client'
import Script from 'next/script'
import { useEffect } from 'react'

// GA4 (Google tag) com Google Consent Mode v2 (RGPD/EEE).
// O gtag.js carrega SEMPRE — assim a tag é detetável e o Google pode fazer
// modelação — mas o consentimento arranca em 'denied': sem cookies analíticos
// nem dados pessoais até o utilizador aceitar. O CookieConsent guarda a escolha
// em localStorage e dispara 'eg-consent-changed'; aqui atualizamos o consent.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-RNWM2MQTRT'
const CONSENT_KEY = 'eg-cookie-consent'

// Estado de consentimento a aplicar ('granted' só se o utilizador aceitou).
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
    update()
    window.addEventListener('eg-consent-changed', update)
    return () => window.removeEventListener('eg-consent-changed', update)
  }, [])

  return (
    <>
      {/* Consent Mode: default 'denied' ANTES de carregar o gtag. */}
      <Script id="gtag-consent-default" strategy="beforeInteractive">
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
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
