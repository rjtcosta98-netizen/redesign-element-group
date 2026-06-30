'use client'
import { useRef } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    turnstile: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id: string) => void
    }
  }
}

export default function Turnstile({
  onToken,
  onExpire,
}: {
  onToken: (token: string) => void
  onExpire?: () => void
}) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  function render() {
    if (!container.current || widgetId.current || !window.turnstile) return
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '',
      size: 'invisible',
      callback: (token: string) => onTokenRef.current(token),
      'expired-callback': () => {
        widgetId.current = null
        onExpire?.()
      },
    })
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={render}
      />
      <div ref={container} />
    </>
  )
}
