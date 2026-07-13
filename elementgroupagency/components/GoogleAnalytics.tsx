'use client'
import { useEffect } from 'react'

// Atualizador de consentimento (Google Consent Mode v2).
// O snippet do gtag é server-rendered no layout (garante que está no HTML e
// dispara o pageview). Este componente só ouve a escolha de cookies e passa o
// consentimento a 'granted'/'denied' via gtag('consent','update').
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
    update()
    window.addEventListener('eg-consent-changed', update)
    return () => window.removeEventListener('eg-consent-changed', update)
  }, [])

  return null
}
