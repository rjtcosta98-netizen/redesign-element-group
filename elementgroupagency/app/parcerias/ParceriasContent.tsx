'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'

// ─── Emerald accent — "ganho / crescimento" ──────────────────────────────
const EMERALD = {
  '--accent-rgb': '52 211 153',
  '--accent': '#34d399',
  '--accent-deep': '#065f46',
  '--accent-mid': '#059669',
  '--accent-light': '#6ee7b7',
} as React.CSSProperties

// ─── Animated counter ────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v: number) => setVal(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {val.toLocaleString('pt-PT')}
      {suffix}
    </span>
  )
}

// ─── Earn counter — triggers on active state (not viewport) ──────────────
function EarnCounter({ to, active }: { to: number; active: boolean }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!active) { setVal(0); return }
    const ctrl = animate(0, to, {
      duration: 1.4,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (v: number) => setVal(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [active, to])

  return <>{val.toLocaleString('pt-PT')}€</>
}

// ─── Earn filmstrip data ──────────────────────────────────────────────────
const EARN_SCENARIOS = [
  { service: 'Landing Page', desc: 'Uma página única, focada em converter visitas em contactos.', price: 490, earn: 49, badge: null as string | null },
  { service: 'Website Profissional', desc: 'Site institucional completo, à medida e otimizado para o Google.', price: 790, earn: 79, badge: 'Mais comum' as string | null },
  { service: 'Loja Online', desc: 'E-commerce pronto a vender 24/7, sem comissões de marketplace.', price: 2500, earn: 250, badge: null as string | null },
]

// ─── Earn filmstrip component ─────────────────────────────────────────────
function EarnFilmstrip() {
  const [active, setActive] = useState(1)

  return (
    <>
      {/* Desktop — expandable filmstrip panels */}
      <div
        className="hidden md:flex h-[460px] gap-[2px] rounded-[20px] overflow-hidden"
        style={{ background: '#080808' }}
      >
        {EARN_SCENARIOS.map((s, i) => {
          const isActive = i === active
          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flexGrow: isActive ? 4 : 1,
                flexShrink: 1,
                flexBasis: 0,
                minWidth: 0,
                transition: 'flex-grow 0.52s cubic-bezier(0.44, 0, 0.56, 1)',
                background: isActive
                  ? 'linear-gradient(160deg, #0d1f18 0%, #091610 55%, #0F0F0E 100%)'
                  : '#131313',
              }}
            >
              {/* Numeral de fundo — textura editorial que sangra para fora (só ativo) */}
              <span
                aria-hidden
                className="absolute -bottom-12 -right-5 font-heading font-medium pointer-events-none select-none"
                style={{
                  fontSize: '260px',
                  color: 'rgba(52,211,153,0.05)',
                  letterSpacing: '-0.06em',
                  lineHeight: 1,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.4s 0.1s',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Active border */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: '1px solid rgba(52,211,153,0.18)',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.3s',
                }}
              />

              {/* Panel content */}
              <div className="relative h-full flex flex-col p-7">
                {/* Topo — índice + serviço + descrição + badge */}
                <div className="flex items-start justify-between gap-3 min-w-0">
                  <div className="min-w-0">
                    <p
                      className="font-heading font-medium tabular-nums tracking-[0.18em] text-[11px] mb-2.5"
                      style={{
                        color: isActive ? 'rgba(52,211,153,0.6)' : 'rgba(255,255,255,0.22)',
                        transition: 'color 0.3s',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}<span style={{ opacity: 0.4 }}> / 0{EARN_SCENARIOS.length}</span>
                    </p>
                    <p
                      className="font-heading font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{
                        fontSize: isActive ? '19px' : '13px',
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.32)',
                        transition: 'color 0.3s, font-size 0.3s',
                      }}
                    >
                      {s.service}
                    </p>
                    {isActive && (
                      <p
                        className="mt-2 text-xs leading-relaxed max-w-[34ch]"
                        style={{ color: 'rgba(172,172,185,0.7)', opacity: isActive ? 1 : 0, transition: 'opacity 0.3s 0.15s' }}
                      >
                        {s.desc}
                      </p>
                    )}
                  </div>
                  {s.badge && (
                    <span
                      className="text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full font-semibold text-black flex-shrink-0"
                      style={{
                        background: '#34d399',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.25s 0.25s',
                      }}
                    >
                      {s.badge}
                    </span>
                  )}
                </div>

                {/* Base — ativo (denso) ou colapsado (mínimo) */}
                {isActive ? (
                  <div
                    className="mt-auto"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 0.3s 0.18s, transform 0.3s 0.18s',
                    }}
                  >
                    {/* Hero — quanto ganhas */}
                    <p className="text-[10px] uppercase tracking-[0.18em] text-dark mb-2">Tu ganhas por indicação</p>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <div
                        className="font-heading font-medium tabular-nums leading-none"
                        style={{ fontSize: '64px', color: '#34d399', letterSpacing: '-0.04em' }}
                      >
                        <EarnCounter to={s.earn} active={isActive} />
                      </div>
                      <span className="font-heading text-sm" style={{ color: 'rgba(52,211,153,0.5)' }}>10% do projeto</span>
                    </div>

                    {/* Equação — projeto × comissão = ganho */}
                    <div
                      className="mt-5 flex items-center gap-2.5 rounded-xl px-4 py-3"
                      style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.14)' }}
                    >
                      <span className="text-sm tabular-nums" style={{ color: 'rgba(255,255,255,0.72)' }}>{s.price.toLocaleString('pt-PT')}€</span>
                      <span className="text-[11px]" style={{ color: 'rgba(172,172,185,0.5)' }}>projeto</span>
                      <span className="text-sm" style={{ color: 'rgba(52,211,153,0.55)' }}>×</span>
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.72)' }}>10%</span>
                      <span className="ml-auto text-sm font-heading font-medium tabular-nums" style={{ color: '#34d399' }}>= {s.earn}€</span>
                    </div>

                    {/* Escala — sem limite de indicações (a âncora) */}
                    <div className="mt-5">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-dark mb-2.5">Sem limite — imagina o teu mês</p>
                      <div className="flex gap-2">
                        {[3, 5, 10].map((n) => (
                          <div
                            key={n}
                            className="flex-1 rounded-lg px-2 py-2.5 text-center"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                          >
                            <p className="text-[10px]" style={{ color: 'rgba(172,172,185,0.55)' }}>{n} indicações</p>
                            <p className="font-heading font-medium tabular-nums mt-0.5" style={{ fontSize: '16px', color: '#34d399' }}>
                              {(s.earn * n).toLocaleString('pt-PT')}€
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto">
                    <p className="text-[9px] uppercase tracking-[0.14em] mb-1" style={{ color: 'rgba(255,255,255,0.18)' }}>
                      Ganhas
                    </p>
                    <p
                      className="font-heading font-medium whitespace-nowrap"
                      style={{ fontSize: '20px', color: 'rgba(52,211,153,0.45)', letterSpacing: '-0.02em' }}
                    >
                      {s.earn}€
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="hidden md:flex justify-center items-center gap-1 mt-6">
        {EARN_SCENARIOS.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ver cenário ${i + 1}: ${s.service}`}
            aria-pressed={i === active}
            style={{
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span
              style={{
                display: 'block',
                height: '3px',
                width: i === active ? '24px' : '8px',
                borderRadius: '9999px',
                background: i === active ? '#34d399' : 'rgba(255,255,255,0.18)',
                transition: 'width 0.3s, background 0.3s',
              }}
            />
          </button>
        ))}
      </div>

      {/* Mobile — vertical stack */}
      <div className="flex flex-col gap-3 md:hidden">
        {EARN_SCENARIOS.map((s, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-[18px] border p-6"
            style={{
              borderColor: i === 1 ? 'rgba(52,211,153,0.28)' : 'rgba(255,255,255,0.1)',
              background: i === 1
                ? 'linear-gradient(135deg, #0d1f18, #0F0F0E)'
                : '#141414',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-heading font-medium text-white text-[15px]">{s.service}</p>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: 'rgba(172,172,185,0.7)' }}>{s.desc}</p>
              </div>
              {s.badge && (
                <span className="text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full font-semibold text-black flex-shrink-0" style={{ background: '#34d399' }}>
                  {s.badge}
                </span>
              )}
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-dark mb-1">Tu ganhas</p>
                <p
                  className="font-heading font-medium leading-none tabular-nums"
                  style={{ fontSize: '44px', color: '#34d399', letterSpacing: '-0.04em' }}
                >
                  {s.earn}€
                </p>
              </div>
              <div className="text-right pb-1">
                <p className="text-xs tabular-nums" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.price.toLocaleString('pt-PT')}€ projeto</p>
                <p className="text-[11px]" style={{ color: 'rgba(52,211,153,0.6)' }}>10% comissão</p>
              </div>
            </div>

            {/* Escala — sem limite */}
            <div className="mt-5 flex gap-2">
              {[3, 5, 10].map((n) => (
                <div
                  key={n}
                  className="flex-1 rounded-lg px-2 py-2 text-center"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <p className="text-[10px]" style={{ color: 'rgba(172,172,185,0.55)' }}>{n} indic.</p>
                  <p className="font-heading font-medium tabular-nums" style={{ fontSize: '14px', color: '#34d399' }}>
                    {(s.earn * n).toLocaleString('pt-PT')}€
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── FAQ accordion ───────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Como e quando recebo a comissão?',
    a: 'Após o projeto ser aceite e o primeiro pagamento processado, transferimos 10% do valor líquido para o teu IBAN em 10 dias úteis.',
  },
  {
    q: 'O que conta como cliente válido?',
    a: 'Qualquer empresa ou profissional que contrate os nossos serviços por indicação direta tua — confirmada por email ou formulário de adesão.',
  },
  {
    q: 'Há limite de comissões por mês?',
    a: 'Não. Podes referenciar quantos clientes quiseres. Cada projeto aprovado gera uma comissão independente.',
  },
  {
    q: 'Preciso de emitir fatura?',
    a: 'Sim. Para transferências acima de 10€ pedimos recibo verde ou fatura pró-forma. Ajudamos no processo se necessário.',
  },
  {
    q: 'E se o cliente cancelar o projeto?',
    a: 'A comissão é paga após o período de garantia de 14 dias. Cancelamentos antes desse prazo não geram comissão.',
  },
]

function Accordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div>
      {FAQS.map((item, i) => (
        <div
          key={i}
          className="border-b"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-6 py-5 text-left"
          >
            <span
              className="text-sm font-medium leading-snug transition-colors duration-200"
              style={{ color: open === i ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.72)' }}
            >
              {item.q}
            </span>
            <span
              className="flex-shrink-0 text-xl leading-none font-light transition-colors duration-200"
              style={{ color: open === i ? '#34d399' : 'rgba(255,255,255,0.3)' }}
            >
              {open === i ? '−' : '+'}
            </span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.44, 0, 0.56, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted leading-relaxed pb-5 max-w-[560px]">{item.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

// ─── Profile cards — "Para quem é" ──────────────────────────────────────
function ProfileCards() {
  const [hovered, setHovered] = useState<number | null>(null)

  const profiles = [
    {
      title: 'Designer Freelancer',
      desc: 'Tens clientes que precisam de web. Rentabiliza essa rede sem tirar tempo ao teu trabalho.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Contabilista / Consultor',
      desc: 'Os teus clientes abrem empresas. Nós damos-lhes presença digital — tu ganhas por isso.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3 9h14M7 3v4M13 3v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Agência Criativa',
      desc: 'Subcontrata web ou amplia a oferta sem aumentar equipa. Comissão sobre cada projeto.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L2 7.5l8 5 8-5L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M2 13.5l8 5 8-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Formador / Mentor',
      desc: 'A tua audiência precisa de ferramentas digitais. Liga-nos e ganha por cada referência.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {profiles.map((p, i) => {
        const on = hovered === i
        return (
          <AnimateOnScroll key={i} delay={i * 0.08}>
            <div
              className="rounded-[20px] p-6 h-full cursor-default"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: on ? 'rgba(52,211,153,0.07)' : '#121212',
                border: '1px solid',
                borderColor: on ? 'rgba(52,211,153,0.32)' : 'rgba(255,255,255,0.07)',
                boxShadow: on ? '0 0 32px rgba(52,211,153,0.09)' : 'none',
                transition: 'background 0.28s, border-color 0.28s, box-shadow 0.28s',
              }}
            >
              {/* Expanding accent bar */}
              <div
                className="rounded-full mb-6"
                style={{
                  height: '2px',
                  width: on ? '48px' : '28px',
                  background: on ? '#34d399' : 'rgba(52,211,153,0.28)',
                  transition: 'width 0.32s cubic-bezier(0.44,0,0.56,1), background 0.28s',
                }}
              />

              {/* Icon with glow */}
              <div
                className="size-10 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: on ? 'rgba(52,211,153,0.14)' : 'rgba(52,211,153,0.07)',
                  border: '1px solid',
                  borderColor: on ? 'rgba(52,211,153,0.45)' : 'rgba(52,211,153,0.15)',
                  color: '#34d399',
                  boxShadow: on ? '0 0 18px rgba(52,211,153,0.22)' : 'none',
                  transition: 'background 0.28s, border-color 0.28s, box-shadow 0.28s',
                }}
              >
                {p.icon}
              </div>

              <h3
                className="text-sm font-heading font-medium mb-2"
                style={{
                  color: on ? '#fff' : 'rgba(255,255,255,0.82)',
                  transition: 'color 0.28s',
                }}
              >
                {p.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
            </div>
          </AnimateOnScroll>
        )
      })}
    </div>
  )
}

// ─── Mirror quote rows — "Para quem é" ──────────────────────────────────

// ─── Multi-step partner sign-up form ─────────────────────────────────────
const PARTNER_ROLES = [
  { id: 'designer',   label: 'Designer / Criativo' },
  { id: 'consultor',  label: 'Consultor / Contabilista' },
  { id: 'agencia',    label: 'Agência Criativa' },
  { id: 'formador',   label: 'Formador / Mentor' },
  { id: 'comercial',  label: 'Comercial / Vendas' },
  { id: 'outro',      label: 'Outra área' },
]

const PARTNER_CHANNELS = [
  'Clientes actuais',
  'Redes sociais',
  'Email / LinkedIn',
  'Networking presencial',
  'Comunidade online',
  'Outro',
]

const STEP_LABELS = ['Sobre ti', 'Perfil', 'Como angarias', 'Confirmar']

function PartnerMultiStepForm() {
  const TOTAL = 4
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    name: '', email: '', phone: '',
    role: '',
    channels: [] as string[],
    otherChannel: '',
    terms: false,
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  function canAdvance() {
    if (step === 0) return data.name.trim() !== '' && /\S+@\S+\.\S+/.test(data.email)
    if (step === 1) return data.role !== ''
    if (step === 2) return data.channels.length > 0
    if (step === 3) return data.terms
    return false
  }

  function toggleChannel(ch: string) {
    setData(d => ({
      ...d,
      channels: d.channels.includes(ch)
        ? d.channels.filter(x => x !== ch)
        : [...d.channels, ch],
    }))
  }

  async function doSubmit() {
    setStatus('sending')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: `Tel: ${data.phone || 'não fornecido'}. Perfil: ${
            PARTNER_ROLES.find(r => r.id === data.role)?.label
          }. Canais: ${[...data.channels, data.channels.includes('Outro') ? data.otherChannel : '']
            .filter(Boolean).join(', ')}.`,
          service: 'Parceiro / Afiliado',
          source: 'parcerias',
          consent: data.terms,
        }),
      })
      setStatus(r.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  const chipBtn = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      className="rounded-full border px-4 py-2 text-sm transition-all duration-200 min-h-[44px] inline-flex items-center"
      style={{
        borderColor: active ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.1)',
        background: active ? 'rgba(52,211,153,0.1)' : 'transparent',
        color: active ? '#34d399' : 'rgba(255,255,255,0.5)',
      }}
    >
      {label}
    </button>
  )

  return (
    <div
      className="rounded-[24px] overflow-hidden border"
      style={{
        borderColor: 'rgba(52,211,153,0.14)',
        background: 'linear-gradient(180deg, rgba(52,211,153,0.03) 0%, #111111 40%)',
      }}
    >
      {/* Progress segments */}
      <div className="flex gap-[3px] px-7 pt-7">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '3px',
              borderRadius: '9999px',
              background: i <= step ? '#34d399' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.35s ease',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="px-7 pt-6 pb-0">
        <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'rgba(52,211,153,0.55)' }}>
          Passo {step + 1} de {TOTAL} — {STEP_LABELS[step]}
        </p>
        <h3
          className="font-heading font-medium text-white leading-snug"
          style={{ fontSize: 'clamp(18px, 2.5vw, 22px)' }}
        >
          {step === 0 && 'Quem és tu?'}
          {step === 1 && 'Como te defines?'}
          {step === 2 && 'Como chegas aos clientes?'}
          {step === 3 && 'Confirma os teus dados.'}
        </h3>
      </div>

      <div className="px-7 pt-6 pb-7">
        {/* ── Step 0: personal info ── */}
        <div style={{ display: step === 0 ? 'block' : 'none' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor="partner-name" className="block text-xs text-muted mb-1.5">Nome *</label>
              <input
                id="partner-name"
                type="text"
                value={data.name}
                onChange={e => setData(d => ({ ...d, name: e.target.value }))}
                placeholder="O teu nome"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="partner-email" className="block text-xs text-muted mb-1.5">Email *</label>
              <input
                id="partner-email"
                type="email"
                value={data.email}
                onChange={e => setData(d => ({ ...d, email: e.target.value }))}
                placeholder="nome@empresa.pt"
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label htmlFor="partner-tel" className="block text-xs text-muted mb-1.5">
              Telefone <span className="text-white/25">(opcional)</span>
            </label>
            <input
              id="partner-tel"
              type="tel"
              value={data.phone}
              onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
              placeholder="+351 9xx xxx xxx"
              className={inputCls}
            />
          </div>
        </div>

        {/* ── Step 1: role cards ── */}
        <div style={{ display: step === 1 ? 'block' : 'none' }}>
          <div className="grid grid-cols-2 gap-2">
            {PARTNER_ROLES.map(r => {
              const selected = data.role === r.id
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setData(d => ({ ...d, role: r.id }))}
                  className="rounded-xl border p-4 text-left transition-all duration-200"
                  style={{
                    borderColor: selected ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.08)',
                    background: selected ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: selected ? '#34d399' : 'rgba(255,255,255,0.6)' }}
                  >
                    {r.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Step 2: channel chips ── */}
        <div style={{ display: step === 2 ? 'block' : 'none' }}>
          <div className="flex flex-wrap gap-2">
            {PARTNER_CHANNELS.map(ch =>
              chipBtn(ch, data.channels.includes(ch), () => toggleChannel(ch))
            )}
          </div>
          {data.channels.includes('Outro') && (
            <div className="mt-3">
              <label htmlFor="partner-other-channel" className="sr-only">Descreve o canal</label>
              <input
                id="partner-other-channel"
                type="text"
                value={data.otherChannel}
                onChange={e => setData(d => ({ ...d, otherChannel: e.target.value }))}
                placeholder="Descreve brevemente…"
                className={inputCls}
              />
            </div>
          )}
        </div>

        {/* ── Step 3: summary + terms ── */}
        <div style={{ display: step === 3 && status !== 'ok' ? 'block' : 'none' }}>
          <div className="mb-5">
            {[
              { label: 'Nome',    value: data.name },
              { label: 'Email',   value: data.email },
              { label: 'Telefone', value: data.phone || '—' },
              { label: 'Perfil',  value: PARTNER_ROLES.find(r => r.id === data.role)?.label || '—' },
              {
                label: 'Canais',
                value: [...data.channels, data.channels.includes('Outro') ? data.otherChannel : '']
                  .filter(Boolean).join(', ') || '—',
              },
            ].map(row => (
              <div
                key={row.label}
                className="flex justify-between items-start gap-4 py-2.5 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <span className="text-xs flex-shrink-0" style={{ color: 'rgba(172,172,185,0.45)' }}>
                  {row.label}
                </span>
                <span className="text-xs text-right" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <label className="flex items-start gap-3 cursor-pointer mb-5 select-none">
            <div
              className="flex-shrink-0 mt-0.5 size-4 rounded border flex items-center justify-center transition-all duration-200"
              style={{
                borderColor: data.terms ? '#34d399' : 'rgba(255,255,255,0.2)',
                background: data.terms ? 'rgba(52,211,153,0.15)' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setData(d => ({ ...d, terms: !d.terms }))}
            >
              {data.terms && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path
                    d="M1 3.5L3.5 6L8 1"
                    stroke="#34d399"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-xs text-muted leading-relaxed">
              Aceito os termos do Programa de Parceiros e autorizo o contacto da Element Group para confirmação da minha adesão.
            </span>
          </label>

          {status === 'err' && (
            <p className="text-xs text-red-400 mb-4">
              Algo correu mal. Tenta novamente.
            </p>
          )}
        </div>

        {/* ── Success state ── */}
        {status === 'ok' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8"
          >
            <div
              className="size-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                background: 'rgba(52,211,153,0.1)',
                border: '1px solid rgba(52,211,153,0.25)',
                color: '#34d399',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10.5l4.5 4.5 8-9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-base font-heading font-medium text-white mb-2">Pedido recebido!</h3>
            <p className="text-sm text-muted leading-relaxed max-w-[280px] mx-auto">
              Entraremos em contacto em breve para confirmar a tua adesão ao programa.
            </p>
          </motion.div>
        )}

        {/* ── Navigation ── */}
        {status !== 'ok' && (
          <div className={`flex gap-2 mt-6 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                disabled={status === 'sending'}
                className="px-5 py-2.5 rounded-xl text-sm transition-all duration-200 min-h-[44px]"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                ← Voltar
              </button>
            )}
            {step < TOTAL - 1 ? (
              <button
                type="button"
                onClick={() => { if (canAdvance()) setStep(s => s + 1) }}
                disabled={!canAdvance()}
                className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 min-h-[44px]"
                style={{
                  background: canAdvance() ? '#34d399' : 'rgba(52,211,153,0.2)',
                  color: canAdvance() ? '#000' : 'rgba(52,211,153,0.4)',
                }}
              >
                Continuar →
              </button>
            ) : (
              <button
                type="button"
                onClick={doSubmit}
                disabled={!canAdvance() || status === 'sending'}
                className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 min-h-[44px]"
                style={{ background: '#34d399', color: '#000' }}
              >
                {status === 'sending' ? 'A enviar…' : 'Confirmar adesão'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────
const TECH_PARTNERS: { name: string; src: string; invert?: boolean }[] = [
  { name: 'Claude', src: '/logos/claude.svg' },
  { name: 'Supabase', src: '/logos/supabase.svg' },
  { name: 'VS Code', src: '/logos/vscode.svg' },
  { name: 'Cloudflare', src: '/logos/cloudflare.svg' },
  { name: 'Stripe', src: '/logos/stripe.svg' },
  { name: 'Next.js', src: '/logos/nextjs.svg', invert: true },
  { name: 'React', src: '/logos/react.svg' },
]

const inputCls =
  'w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-accent/40 transition-colors'

// ─── Main component ───────────────────────────────────────────────────────
export default function ParceriasContent() {
  return (
    <main className="min-h-screen bg-bg">

      {/* ══════════════════════════════════════════════════════════════
          PROGRAMA DE AFILIADOS — zona esmeralda, energética
      ═════════════════════════════════════════════════════════════ */}
      <div style={EMERALD}>

        {/* ── 1. HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-bg pt-24 sm:pt-36 pb-16 sm:pb-28 px-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 55% 60% at 72% 45%, rgba(52,211,153,0.10), transparent 70%)',
            }}
          />

          <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <AnimateOnScroll direction="left">
              <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">
                Programa de Parceiros
              </p>
              <h1 className="text-h1 font-heading font-medium text-white mb-5 leading-[1.05]">
                Recomendas.<br />
                <span className="text-accent">Ganhas 10%.</span><br />
                Sempre.
              </h1>
              <p className="text-muted text-base mb-9 max-w-[400px] leading-relaxed">
                Cada cliente que nos trazes vale comissão real — sem limite, sem prazo, sem complicações.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <GlowButton href="#aderir">Tornar-me parceiro</GlowButton>
                <a
                  href="#como-funciona"
                  className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors py-2.5"
                >
                  Como funciona
                  <svg
                    className="transition-transform group-hover:translate-x-0.5"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 7h8M8 4l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </AnimateOnScroll>

            {/* Right: reward card */}
            <AnimateOnScroll direction="right">
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[320px]">
                  {/* Halo */}
                  <div
                    aria-hidden
                    className="absolute -inset-10 rounded-full pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.16), transparent 65%)',
                    }}
                  />

                  {/* Card */}
                  <div
                    className="relative rounded-[28px] border p-7 shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
                    style={{
                      borderColor: 'rgba(52,211,153,0.22)',
                      background: 'linear-gradient(135deg, #0d1f18 0%, #091610 55%, #0F0F0E 100%)',
                    }}
                  >
                    {/* Live pulse */}
                    <div className="flex items-center gap-2 mb-8">
                      <span className="relative flex size-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-70" />
                        <span className="relative inline-flex rounded-full size-2 bg-accent" />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-accent/75">
                        Comissão confirmada
                      </span>
                    </div>

                    {/* Big amount */}
                    <div
                      className="text-[68px] font-heading font-medium leading-none tabular-nums mb-1"
                      style={{ color: '#34d399' }}
                    >
                      <Counter to={150} suffix="€" />
                    </div>
                    <p className="text-xs mb-7" style={{ color: 'rgba(172,172,185,0.6)' }}>
                      comissão · Projeto Website 1.500€
                    </p>

                    {/* Rule */}
                    <div
                      className="w-full h-px mb-6"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(52,211,153,0.3), rgba(52,211,153,0.05), transparent)',
                      }}
                    />

                    {/* Detail rows */}
                    <div className="space-y-2.5">
                      {(
                        [
                          ['Parceiro', 'Ricardo J.', false],
                          ['Taxa de comissão', '10%', true],
                          ['Estado', 'Pago ✓', true],
                        ] as [string, string, boolean][]
                      ).map(([label, value, accent]) => (
                        <div key={label} className="flex justify-between">
                          <span className="text-xs text-muted">{label}</span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: accent ? '#34d399' : 'rgba(255,255,255,0.6)' }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating + badge */}
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                    className="absolute -top-2 -right-2 size-9 rounded-full flex items-center justify-center text-sm font-bold text-black"
                    style={{ background: '#34d399', boxShadow: '0 0 20px rgba(52,211,153,0.5)' }}
                  >
                    +
                  </motion.div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── 2. HOW IT WORKS — editorial strip ───────────────────── */}
        <section id="como-funciona" className="bg-bg border-t border-white/10 scroll-mt-24">
          <div className="max-w-[1100px] mx-auto px-6">

            <AnimateOnScroll>
              <div className="pt-24 pb-14 text-center">
                <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-3">O processo</p>
                <h2 className="text-h2 font-heading font-medium text-white">
                  Três passos. Zero fricção.
                </h2>
              </div>
            </AnimateOnScroll>

            {[
              {
                num: '01',
                title: 'Recomendas',
                desc: 'Apresentas um contacto à Element Group. Um email, uma mensagem, um nome — nós fazemos o resto da conversa.',
                last: false,
              },
              {
                num: '02',
                title: 'Fechamos',
                desc: 'Apresentamos a proposta, acompanhamos o cliente e entregamos o projeto. Tu não precisas de estar envolvido.',
                last: false,
              },
              {
                num: '03',
                title: 'Ganhas',
                desc: 'Depois da entrega e pagamento, recebes 10% do valor do projeto diretamente no teu IBAN.',
                last: true,
              },
            ].map((step, i) => (
              <AnimateOnScroll key={i} delay={i * 0.12}>
                <div
                  className={`flex items-center gap-6 sm:gap-10 py-10 ${
                    i < 2 ? 'border-b border-white/[0.07]' : 'pb-24'
                  }`}
                >
                  {/* Ghost number */}
                  <div className="w-[44px] sm:w-[80px] flex-shrink-0 flex justify-end">
                    <span
                      className="font-heading font-medium leading-none select-none"
                      style={{
                        fontSize: 'clamp(56px, 7vw, 88px)',
                        color: 'rgba(255,255,255,0.045)',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  {/* Accent dot */}
                  <div
                    className="flex-shrink-0 rounded-full"
                    style={{
                      width: '5px',
                      height: '5px',
                      background: step.last ? '#34d399' : 'rgba(52,211,153,0.38)',
                      boxShadow: step.last ? '0 0 8px rgba(52,211,153,0.6)' : 'none',
                    }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-heading font-medium text-white mb-2 leading-[1.15]"
                      style={{ fontSize: 'clamp(22px, 3vw, 32px)', letterSpacing: '-0.02em' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed max-w-[520px]">{step.desc}</p>
                  </div>

                  {/* Payoff — step 03 only */}
                  {step.last && (
                    <div
                      className="flex-shrink-0 font-heading font-medium leading-none tabular-nums hidden sm:block"
                      style={{
                        fontSize: 'clamp(48px, 6vw, 72px)',
                        color: '#34d399',
                        letterSpacing: '-0.04em',
                      }}
                    >
                      <Counter to={10} suffix="%" />
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            ))}

          </div>
        </section>

        {/* ── 3. EARN SCENARIOS — filmstrip ───────────────────────── */}
        <section className="bg-bg border-t border-white/10 py-24 px-6">
          <div className="max-w-[1100px] mx-auto">
            <AnimateOnScroll>
              <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-3 text-center">
                Quanto podes ganhar
              </p>
              <h2 className="text-h2 font-heading font-medium text-white text-center mb-4">
                O teu ganho, a números reais.
              </h2>
              <p className="text-muted text-sm text-center mb-12 max-w-[480px] mx-auto">
                A comissão é sempre 10% do valor do projeto, paga após a entrega.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <EarnFilmstrip />
            </AnimateOnScroll>
          </div>
        </section>

        {/* ── 4. FOR WHOM — profile cards with emerald hover ───── */}
        <section className="bg-bg border-t border-white/10 py-24 px-6">
          <div className="max-w-[1100px] mx-auto">
            <AnimateOnScroll>
              <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-3 text-center">
                Para quem é
              </p>
              <h2 className="text-h2 font-heading font-medium text-white text-center mb-16">
                Reconheces-te aqui?
              </h2>
            </AnimateOnScroll>

            <ProfileCards />
          </div>
        </section>

        {/* ── 5. TERMS — two-col FAQ ──────────────────────────── */}
        <section className="bg-bg border-t border-white/10 py-24 px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">

              {/* Left sticky card */}
              <AnimateOnScroll direction="left">
                <div
                  className="rounded-[22px] p-7 lg:sticky lg:top-28"
                  style={{
                    background: '#161616',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {/* E icon */}
                  <div
                    className="size-10 rounded-xl flex items-center justify-center mb-7"
                    style={{
                      background: '#1e1e1e',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span className="font-heading font-semibold text-white text-sm tracking-tight">E</span>
                  </div>

                  <p
                    className="text-[10px] uppercase tracking-[0.2em] mb-4"
                    style={{ color: 'rgba(52,211,153,0.6)' }}
                  >
                    FAQ
                  </p>
                  <h2
                    className="font-heading font-medium text-white leading-[1.05] mb-4"
                    style={{ fontSize: 'clamp(26px, 3vw, 36px)', letterSpacing: '-0.025em' }}
                  >
                    Ainda com<br />dúvidas?
                  </h2>
                  <p className="text-sm text-muted leading-relaxed mb-7">
                    Fala connosco sem compromisso. Respondemos em menos de 2 horas com tudo o que precisas de saber.
                  </p>

                  <a
                    href="#aderir"
                    className="inline-flex items-center min-h-[44px] px-5 py-2.5 rounded-xl text-sm font-medium text-black transition-opacity hover:opacity-90"
                    style={{ background: '#34d399' }}
                  >
                    Tornar-me parceiro
                  </a>

                  <p
                    className="text-[11px] mt-5"
                    style={{ color: 'rgba(255,255,255,0.22)' }}
                  >
                    5.0 no Google · resposta em &lt; 2h
                  </p>
                </div>
              </AnimateOnScroll>

              {/* Right: accordion */}
              <AnimateOnScroll delay={0.1}>
                <div
                  className="border-t pt-0"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                >
                  <Accordion />
                </div>
              </AnimateOnScroll>

            </div>
          </div>
        </section>

        {/* ── 6. SIGN-UP FORM — multi-step ───────────────────────── */}
        <section id="aderir" className="bg-bg border-t border-white/10 py-24 px-6 scroll-mt-24">
          <div className="max-w-[540px] mx-auto">
            <AnimateOnScroll>
              <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4 text-center">
                Aderir ao programa
              </p>
              <h2 className="text-h2 font-heading font-medium text-white mb-4 text-center">
                Começa a ganhar<br />hoje.
              </h2>
              <p className="text-muted text-sm text-center mb-10 leading-relaxed">
                Três passos rápidos. Entramos em contacto em 24h para confirmar os detalhes.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <PartnerMultiStepForm />
            </AnimateOnScroll>
          </div>
        </section>
      </div>
      {/* END affiliates / emerald zone */}

      {/* ══════════════════════════════════════════════════════════════
          SEPARADOR VISUAL — muda de registo
      ═════════════════════════════════════════════════════════════ */}
      <div className="bg-bg py-12 px-6" aria-hidden>
        <div className="max-w-[1100px] mx-auto flex items-center gap-6">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="size-7 rounded-full flex items-center justify-center"
              style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <rect x="1" y="1" width="3.5" height="3.5" rx="0.8" fill="rgba(255,255,255,0.2)" />
                <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.8" fill="rgba(255,255,255,0.2)" />
                <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.8" fill="rgba(255,255,255,0.2)" />
                <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.8" fill="rgba(255,255,255,0.2)" />
              </svg>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-dark">
              Parceiros institucionais
            </span>
          </div>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          PARCEIROS TECNOLÓGICOS — neutro, institucional
      ═════════════════════════════════════════════════════════════ */}
      <section className="bg-bg pt-4 pb-28 px-6">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll>
            <h2 className="text-h2 font-heading font-medium text-white text-center mb-3">
              Trabalhamos com
            </h2>
            <p className="text-muted text-sm text-center mb-16 max-w-[420px] mx-auto">
              As plataformas e ferramentas que sustentam os projetos que construímos para os teus clientes.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {TECH_PARTNERS.map((p, i) => (
              <AnimateOnScroll key={p.name} delay={i * 0.05}>
                <div
                  className="group rounded-2xl border bg-bg-card hover:bg-white/[0.03] hover:border-white/[0.18] transition-all duration-300 cursor-default"
                  style={{ borderColor: 'rgba(255,255,255,0.07)', aspectRatio: '3/2' }}
                >
                  <div className="h-full flex flex-col items-center justify-center gap-2.5 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.name}
                      height={28}
                      width={80}
                      className="h-7 w-auto max-w-[60%] object-contain transition-transform duration-300 group-hover:scale-105"
                      style={p.invert ? { filter: 'invert(1)' } : undefined}
                      loading="lazy"
                    />
                    <span className="text-[10px] font-heading font-medium tracking-wide text-center leading-tight text-white/35 group-hover:text-white/70 transition-colors duration-300">
                      {p.name}
                    </span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-t border-white/10 py-28 px-6"
        style={{ background: 'linear-gradient(to bottom, #0E0E0E, #08090b)' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(127,168,217,0.10), transparent 70%)',
          }}
        />
        <div className="relative max-w-[600px] mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">Próximo passo</p>
            <h2 className="text-h2 font-heading font-medium text-white mb-4">
              Tem um cliente em mente?
            </h2>
            <p className="text-muted text-base mb-9 leading-relaxed">
              Faz a apresentação. Nós tratamos do resto — e tu recebes 10%.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <GlowButton href="#aderir">Tornar-me parceiro</GlowButton>
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors py-2.5"
              >
                Falar connosco
                <svg
                  className="transition-transform group-hover:translate-x-0.5"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M3 7h8M8 4l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
