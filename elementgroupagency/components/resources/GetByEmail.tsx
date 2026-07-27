'use client'
import { useState } from 'react'
import Turnstile from '@/components/ui/Turnstile'
import { useTurnstileGate } from '@/components/ui/useTurnstileGate'

// Captura de email para um recurso gated → grava em `subscribers` (com consentimento).
export default function GetByEmail({ cta = 'Obter por email', source = 'resource' }: { cta?: string; source?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  // Sem isto o token nunca era pedido e o pedido do recurso levava 403 — ver
  // components/ui/useTurnstileGate.ts.
  const gate = useTurnstileGate(async (_dados: null, token: string) => {
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, consent: true, cfToken: token }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(json.error || 'Algo correu mal. Tenta de novo.')
        setStatus('error')
        return
      }
      setStatus('done')
    } catch {
      setError('Sem ligação. Tenta de novo.')
      setStatus('error')
    }
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setError('')
    if (gate.submeter(null) === 'nao-pronto') {
      setError('Verificação de segurança ainda a carregar. Tenta outra vez daqui a um momento.')
      setStatus('error')
      return
    }
    setStatus('loading')
  }

  if (status === 'done') {
    return <p className="text-accent text-sm">Obrigado! Envio-te o recurso para o email. ✦</p>
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 max-w-sm">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="res-email" className="sr-only">Email</label>
        <input
          id="res-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="O teu email"
          className="flex-1 rounded-pill bg-white/[0.06] border border-white/10 px-5 py-3 text-sm text-white placeholder-dark outline-none focus-visible:border-accent transition-colors"
        />
        <button type="submit" disabled={status === 'loading'} className="rounded-pill bg-white text-black text-sm font-medium px-6 py-3 hover:bg-white/90 transition-colors whitespace-nowrap disabled:opacity-60">
          {status === 'loading' ? 'A enviar…' : cta}
        </button>
      </div>
      <label className="flex items-start gap-2.5 text-[12px] text-muted leading-relaxed">
        <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-[#7FA8D9] cursor-pointer" />
        <span>
          Aceito receber este recurso e a{' '}
          <a href="/politica-de-privacidade" className="text-white underline underline-offset-4 hover:text-accent">Política de Privacidade</a>.
        </span>
      </label>
      {status === 'error' && <p className="text-[12px] text-[#ff9a9a]">{error}</p>}
      <Turnstile
        ref={gate.ref}
        onToken={gate.receberToken}
        onExpire={gate.limparToken}
        onError={() => {
          if (gate.cancelarPendente()) {
            setError('Verificação de segurança falhou. Recarrega a página.')
            setStatus('error')
          }
        }}
      />
    </form>
  )
}
