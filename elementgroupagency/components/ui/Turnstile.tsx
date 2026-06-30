'use client'
import { useRef, useImperativeHandle, forwardRef } from 'react'
import Script from 'next/script'

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
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

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
