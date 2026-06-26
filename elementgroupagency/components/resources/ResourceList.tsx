'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Resource, ResType } from '@/lib/resources'

const SUGGEST = 'mailto:info@elementgroup.pt?subject=Sugest%C3%A3o%20de%20recurso'

const ICONS: Record<ResType, React.ReactNode> = {
  Guia: (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>),
  Checklist: (<><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>),
  Template: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>),
  Ferramenta: (<><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4 2.6-2.6Z" /></>),
}

// Acento subtil por tipo — ligado à lógica de cor por categoria dos serviços.
// Aplica-se só ao ícone + etiqueta do tipo (os badges livre/email ficam intactos).
const TYPE_COLOR: Record<ResType, { a: string; mid: string }> = {
  Checklist:  { a: '#7FA8D9', mid: '#4f7fb8' }, // sapphire — Websites
  Guia:       { a: '#6FB39A', mid: '#4f8f7a' }, // verde — SEO / conhecimento
  Template:   { a: '#A98AD4', mid: '#7d63ad' }, // lilás — criativo / social
  Ferramenta: { a: '#D7B074', mid: '#b08a4f' }, // champanhe — ferramenta / negócio
}

export default function ResourceList({ resources, types }: { resources: Resource[]; types: readonly string[] }) {
  const [type, setType] = useState('Todos')
  const filtered = type === 'Todos' ? resources : resources.filter((r) => r.type === type)

  return (
    <div>
      {/* Filtros — encostados à grelha para criar relação filtro → resultado */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            aria-pressed={type === t}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent
              ${type === t ? 'bg-accent text-black font-medium' : 'border border-white/15 text-muted hover:text-white hover:border-white/30'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((r, i) => {
          const c = TYPE_COLOR[r.type]
          const isAnchor = i === 0 // âncora subtil: guia o olho para o início da grelha
          return (
            <div
              key={r.slug}
              className="relative flex flex-col rounded-[20px] border border-white/10 bg-bg-card p-6 h-full overflow-hidden"
              style={isAnchor ? { boxShadow: `inset 0 0 0 1px ${c.a}38` } : undefined}
            >
              {isAnchor && (
                <span
                  aria-hidden
                  className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 70% 30%, ${c.a}24, transparent 62%)` }}
                />
              )}

              <div className="relative flex items-center justify-between mb-5">
                <span
                  className="grid place-items-center w-11 h-11 rounded-xl text-black"
                  style={{ backgroundImage: `linear-gradient(135deg, ${c.a}, ${c.mid})` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[r.type]}</svg>
                </span>
                {r.gated ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                    Brevemente
                  </span>
                ) : (
                  <span className="rounded-full border border-accent/25 bg-accent/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-accent">Acesso livre</span>
                )}
              </div>

              <span className="relative text-[11px] uppercase tracking-[0.14em]" style={{ color: c.a }}>{r.type}</span>
              <h3 className="relative mt-2 text-white font-heading text-lg font-medium leading-snug tracking-[-0.01em]">{r.title}</h3>
              <p className="relative mt-2 text-muted text-sm leading-relaxed flex-1">{r.description}</p>

              <div className="relative mt-6">
                {r.gated || !r.href ? (
                  <span className="inline-flex items-center gap-1.5 text-sm text-accent/80">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                    Brevemente
                  </span>
                ) : (
                  <Link href={r.href} className="group inline-flex items-center gap-1.5 text-sm text-white hover:text-accent transition-colors">
                    Abrir
                    <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </div>
          )
        })}

        {/* Cartão "biblioteca a crescer" — fecha a grelha e convida à interação */}
        <a
          href={SUGGEST}
          className="group relative flex flex-col justify-center rounded-[20px] border border-dashed border-white/15 bg-white/[0.02] p-6 h-full min-h-[210px]
                     transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <span aria-hidden className="grid place-items-center w-11 h-11 rounded-xl border border-white/15 bg-white/[0.03] text-accent mb-5 transition-colors group-hover:border-accent/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          </span>
          <span className="text-[11px] uppercase tracking-[0.14em] text-accent/90">A biblioteca está a crescer</span>
          <h3 className="mt-2 text-white font-heading text-lg font-medium leading-snug tracking-[-0.01em]">Falta-te um recurso?</h3>
          <p className="mt-2 text-muted text-sm leading-relaxed flex-1">Diz-me o que te seria útil — guia, checklist ou ferramenta — e é forte candidato a ser o próximo.</p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-white group-hover:text-accent transition-colors">
            Sugerir um recurso
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
          </span>
        </a>
      </div>
    </div>
  )
}
