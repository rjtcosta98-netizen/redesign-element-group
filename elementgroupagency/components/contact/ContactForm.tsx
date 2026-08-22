'use client'
import { useState } from 'react'
import Turnstile from '@/components/ui/Turnstile'
import { useTurnstileGate } from '@/components/ui/useTurnstileGate'

const SERVICES = ['Websites & Lojas Online', 'SEO & Otimização', 'Social Media', 'Planos Mensais', 'Outro / ainda não sei']

const inputCls =
  'w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder-dark outline-none focus-visible:border-accent transition-colors'

export default function ContactForm({ initialService = '' }: { initialService?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')
  // Pré-seleção vinda da página de serviço (?servico=…); só aceita valores válidos.
  const preselected = SERVICES.includes(initialService) ? initialService : ''

  // O desafio Turnstile só corre quando alguém o pede, e o token chega depois,
  // por callback — ver components/ui/useTurnstileGate.ts. Este formulário
  // nunca o pedia, e por isso levava 403 em todos os envios.
  const gate = useTurnstileGate(async (dados: Record<string, FormDataEntryValue>, token: string) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dados, cfToken: token }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(json.error || 'Algo correu mal. Tenta de novo.')
        setStatus('error')
        return
      }
      setStatus('ok')
    } catch {
      setError('Sem ligação. Tenta de novo ou escreve-me por email.')
      setStatus('error')
    }
  })

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const r = gate.submeter(Object.fromEntries(new FormData(e.currentTarget)))
    if (r === 'nao-pronto') {
      setError('Verificação de segurança ainda a carregar. Aguarda um momento e tenta de novo.')
      setStatus('error')
      return
    }
    setStatus('loading')
  }

  if (status === 'ok') {
    return (
      <div className="rounded-[20px] border border-accent/30 bg-accent/[0.05] p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-accent to-[#4f7fb8] grid place-items-center text-black mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
        </div>
        <h3 className="text-white font-heading text-xl font-medium tracking-[-0.01em]">Recebi a tua mensagem. Obrigado!</h3>
        <p className="mt-2 text-muted text-sm">Respondo-te pessoalmente em menos de 2 horas.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-white/70 hover:text-white underline underline-offset-4">
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <Turnstile
        ref={gate.ref}
        onToken={gate.receberToken}
        onExpire={gate.limparToken}
        onError={() => {
          // O widget morreu com um envio à espera: não deixar o botão preso em
          // "A enviar…" para sempre.
          if (gate.cancelarPendente()) {
            setError('Verificação de segurança falhou. Recarrega a página e tenta de novo.')
            setStatus('error')
          }
        }}
      />
      {/* Honeypot anti-spam (escondido a humanos) */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden opacity-0">
        <label htmlFor="company">Empresa</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-[11px] uppercase tracking-[0.16em] text-dark mb-2">Nome</label>
        <input id="name" name="name" required className={inputCls} placeholder="O teu nome" />
      </div>

      <div>
        <label htmlFor="email" className="block text-[11px] uppercase tracking-[0.16em] text-dark mb-2">Email</label>
        <input id="email" name="email" type="email" required className={inputCls} placeholder="o.teu@email.pt" />
      </div>

      <div>
        <label htmlFor="service" className="block text-[11px] uppercase tracking-[0.16em] text-dark mb-2">
          Interesse <span className="text-dark/60 normal-case tracking-normal">(opcional)</span>
        </label>
        <select id="service" name="service" defaultValue={preselected} className={`${inputCls} appearance-none cursor-pointer`}>
          <option value="" className="bg-bg-card">Seleciona…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s} className="bg-bg-card">{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-[11px] uppercase tracking-[0.16em] text-dark mb-2">Mensagem</label>
        <textarea id="message" name="message" required rows={4} className={`${inputCls} resize-none`} placeholder="Conta-me o que precisas…" />
      </div>

      <label className="group flex items-start gap-3 text-[12px] text-muted leading-relaxed cursor-pointer">
        {/* Checkbox desenhada: a nativa era um quadrado branco do sistema no meio
            de um formulário escuro — o único elemento não desenhado da página. */}
        <span className="relative mt-px shrink-0">
          <input type="checkbox" name="consent" required className="peer sr-only" />
          <span
            aria-hidden
            className="grid place-items-center w-[18px] h-[18px] rounded-md border border-white/20 bg-white/[0.04]
                       transition-all duration-200 group-hover:border-white/35
                       peer-checked:border-accent peer-checked:bg-accent peer-checked:[&_svg]:opacity-100
                       peer-focus-visible:ring-2 peer-focus-visible:ring-accent/60 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-card"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="opacity-0 transition-opacity duration-150">
              <path d="M2.5 6.2 4.8 8.5 9.5 3.8" stroke="#0E0E0E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        <span>
          Li e aceito a <a href="/politica-de-privacidade" className="text-white underline underline-offset-4 hover:text-accent">Política de Privacidade</a> e
          autorizo o tratamento dos meus dados para resposta a este contacto.
        </span>
      </label>

      {status === 'error' && <p className="text-sm text-[#ff9a9a]">{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 rounded-pill bg-white text-black text-sm font-medium px-6 py-3 hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'A enviar…' : 'Pedir orçamento grátis'}
      </button>

      <p className="text-[11px] text-dark">Respondo em menos de 2 horas. Sem spam, sem compromisso.</p>
    </form>
  )
}
