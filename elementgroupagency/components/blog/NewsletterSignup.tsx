'use client'
import { useState, type ReactNode } from 'react'
import Turnstile from '@/components/ui/Turnstile'

type Variant = 'blog' | 'resources'

// Copy por contexto: o blog promete "artigos", a página de recursos promete
// "recursos" (guias, checklists, templates) — alinhado com o que a pessoa veio buscar.
const COPY: Record<Variant, { title: ReactNode; desc: string; success: string; source: string }> = {
  blog: {
    title: <>Gostas destes <span className="text-accent">temas</span>?</>,
    desc: 'Recebe os próximos artigos no teu email. Sem spam — só conteúdo útil para o teu negócio.',
    success: 'Obrigado! Ficaste na lista — vais receber os próximos artigos. ✦',
    source: 'newsletter',
  },
  resources: {
    title: <>Queres os próximos <span className="text-accent">recursos</span>?</>,
    desc: 'Recebe novos guias, checklists e templates no teu email assim que saem. Sem spam — só conteúdo útil.',
    success: 'Obrigado! Ficaste na lista — recebes os próximos recursos assim que saem. ✦',
    source: 'recursos-newsletter',
  },
}

export default function NewsletterSignup({ variant = 'blog' }: { variant?: Variant }) {
  const copy = COPY[variant]
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [cfToken, setCfToken] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: copy.source, consent: true, cfToken }),
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
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1a2233] via-[#121620] to-[#0d0e11] p-8 md:p-12 text-center">
      <div aria-hidden className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[420px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.18), transparent 60%)' }} />
      {/* segundo glow, mais quente em baixo, para a faixa deixar de parecer monocromática */}
      <div aria-hidden className="absolute -bottom-24 right-0 w-[360px] h-[360px] pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 70%, rgb(var(--accent-rgb) / 0.12), transparent 60%)' }} />

      <div className="relative max-w-md mx-auto">
        <h2 className="text-white font-heading text-2xl md:text-3xl font-medium tracking-[-0.02em]">{copy.title}</h2>
        <p className="mt-3 text-muted text-sm leading-relaxed">{copy.desc}</p>

        {status === 'done' ? (
          <p className="mt-7 text-accent text-sm">{copy.success}</p>
        ) : (
          <form onSubmit={submit} className="mt-7 flex flex-col gap-3">
            <Turnstile onToken={setCfToken} onExpire={() => setCfToken('')} />
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="nl-email" className="sr-only">Email</label>
              <input
                id="nl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O teu email"
                className="flex-1 rounded-pill bg-white/[0.06] border border-white/10 px-5 py-3 text-sm text-white placeholder-dark outline-none focus-visible:border-accent transition-colors"
              />
              <button type="submit" disabled={status === 'loading'} className="rounded-pill bg-white text-black text-sm font-medium px-6 py-3 hover:bg-white/90 transition-colors disabled:opacity-60">
                {status === 'loading' ? 'A enviar…' : 'Subscrever'}
              </button>
            </div>
            <label className="flex items-start gap-2.5 text-left text-[12px] text-muted leading-relaxed cursor-pointer">
              {/* Checkbox à medida: não-marcado discreto (borda subtil); marcado no acento da marca */}
              <input type="checkbox" required className="peer sr-only" />
              <span
                aria-hidden
                className="mt-px grid place-items-center w-4 h-4 shrink-0 rounded-[5px] border border-white/25 bg-white/[0.04] text-transparent transition-colors
                           peer-checked:border-accent peer-checked:bg-accent peer-checked:text-black
                           peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
              </span>
              <span>
                Aceito receber a newsletter e a{' '}
                <a href="/politica-de-privacidade" className="text-white underline underline-offset-4 hover:text-accent">Política de Privacidade</a>.
              </span>
            </label>
            {status === 'error' && <p className="text-left text-[12px] text-[#ff9a9a]">{error}</p>}
          </form>
        )}
      </div>
    </div>
  )
}
