'use client'
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import Script from 'next/script'

// Cloudflare's script injects the challenge iframe itself, without a title —
// watch for it and label it for screen readers as soon as it lands.
function labelIframes(root: HTMLElement) {
  root.querySelectorAll('iframe:not([title])').forEach((el) => {
    el.setAttribute('title', 'Verificação de segurança Cloudflare Turnstile')
  })
}

function watchForIframeTitle(root: HTMLElement) {
  labelIframes(root)
  const observer = new MutationObserver(() => labelIframes(root))
  observer.observe(root, { childList: true, subtree: true })
  return observer
}

declare global {
  interface Window {
    turnstile: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id: string) => void
      execute: (id: string) => void
    }
  }
}

export interface TurnstileHandle {
  execute: () => boolean // returns false if widget not ready yet
}

const Turnstile = forwardRef<TurnstileHandle, {
  onToken: (token: string) => void
  onExpire?: () => void
  onError?: () => void
}>(function Turnstile({ onToken, onExpire, onError }, ref) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const titleObserver = useRef<MutationObserver | null>(null)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  useEffect(() => () => titleObserver.current?.disconnect(), [])

  useImperativeHandle(ref, () => ({
    execute: () => {
      if (!widgetId.current || !window.turnstile) return false
      window.turnstile.execute(widgetId.current)
      return true
    },
  }))

  function render() {
    if (!container.current || widgetId.current || !window.turnstile) return
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
      size: 'invisible',
      execution: 'execute',
      callback: (token: string) => onTokenRef.current(token),
      'expired-callback': () => {
        onExpire?.()
        if (widgetId.current && window.turnstile) {
          window.turnstile.reset(widgetId.current)
        }
      },
      'error-callback': () => {
        onExpire?.()
        onError?.()
        widgetId.current = null
        setTimeout(render, 2000)
      },
    })
    titleObserver.current?.disconnect()
    titleObserver.current = watchForIframeTitle(container.current)
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={render}
      />
      <div ref={container} />
    </>
  )
})

export default Turnstile
