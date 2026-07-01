import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'


type V = 'yes' | 'partial' | 'no'
type Row = { v: V; text: string }
type Column = {
  name: string
  tag: string
  highlight?: boolean
  rows: Row[]
}

// Comparação honesta e equilibrada (cada concorrente ganha nalgum ponto).
// Element = o melhor dos dois mundos. Só factos reais: preço fixo desde 297€,
// resposta <2h, contacto direto, equipa completa (web/SEO/social), planos mensais.
const COLUMNS: Column[] = [
  {
    name: 'Agência tradicional',
    tag: 'Boa, mas cara e lenta',
    rows: [
      { v: 'no', text: 'Cara, sempre por orçamento' },
      { v: 'no', text: 'Processos longos e lentos' },
      { v: 'no', text: 'Gestor de conta entre ti e o trabalho' },
      { v: 'yes', text: 'Equipa completa' },
      { v: 'yes', text: 'Suporte — mas a peso de ouro' },
    ],
  },
  {
    name: 'Element Group',
    tag: 'O equilíbrio ideal',
    highlight: true,
    rows: [
      { v: 'yes', text: 'Preço fixo e justo, desde 297€' },
      { v: 'yes', text: 'Resposta em menos de 2h' },
      { v: 'yes', text: 'Falas diretamente com quem faz' },
      { v: 'yes', text: 'Equipa completa: web, SEO e social' },
      { v: 'yes', text: 'Planos mensais de suporte' },
    ],
  },
  {
    name: 'Freelancer',
    tag: 'Ágil, mas limitado',
    rows: [
      { v: 'partial', text: 'Barato, mas preço variável' },
      { v: 'partial', text: 'Rápido… se estiver disponível' },
      { v: 'yes', text: 'Contacto direto e próximo' },
      { v: 'no', text: 'Domina só uma área' },
      { v: 'no', text: 'Sem continuidade garantida' },
    ],
  },
]

function Verdict({ v, highlight }: { v: V; highlight?: boolean }) {
  if (v === 'yes') {
    return (
      <span
        className={`mt-0.5 grid place-items-center w-5 h-5 shrink-0 rounded-full
                    ${highlight ? 'bg-gradient-to-br from-accent to-[#4f7fb8] text-black' : 'bg-white/10 text-white/70'}`}
        aria-label="Sim"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M5 12l5 5 9-10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  if (v === 'no') {
    return (
      <span className="mt-0.5 grid place-items-center w-5 h-5 shrink-0 rounded-full bg-white/[0.04] text-white/30" aria-label="Não">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </span>
    )
  }
  return (
    <span className="mt-0.5 grid place-items-center w-5 h-5 shrink-0 rounded-full bg-white/[0.04] text-white/40" aria-label="Parcial">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export default function WhyUs() {
  return (
    <section className="bg-bg px-6 py-24 border-t border-white/10" aria-labelledby="porque-nos">
      <div className="max-w-[1100px] mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Porquê a Element Group</p>
          <h2 id="porque-nos" className="text-white">Qualidade de agência, agilidade de freelancer</h2>
          <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
            As agências são caras e lentas. Os freelancers nem sempre dão conta de tudo.
            Juntámos o melhor dos dois — a pensar nas PMEs em Portugal.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-5 md:items-center">
          {COLUMNS.map((col, i) => (
            <AnimateOnScroll key={col.name} delay={i * 0.12}>
              <div
                className={`relative h-full flex flex-col overflow-hidden rounded-[24px] border p-7 transition-transform
                  ${col.highlight
                    ? 'border-accent/40 bg-gradient-to-br from-[#1c2738] via-[#161c26] to-[#0f1318] md:-translate-y-4 md:scale-[1.04] shadow-[0_30px_70px_-20px_rgba(127,168,217,0.45)] z-10'
                    : 'border-white/10 bg-bg-card md:opacity-80'}`}
              >
                {/* Light streak on the featured column */}
                {col.highlight && (
                  <div
                    className="absolute -top-16 -right-10 w-72 h-72 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 70% 30%, rgba(170,200,235,0.32), transparent 60%)' }}
                  />
                )}

                <div className="relative">
                  {col.highlight && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-accent font-medium mb-4">
                      ★ Recomendado
                    </span>
                  )}
                  <h3 className={`font-heading text-xl font-medium tracking-[-0.01em] ${col.highlight ? 'text-white' : 'text-white/80'}`}>
                    {col.name}
                  </h3>
                  <p className="mt-1 text-sm text-dark">{col.tag}</p>
                </div>

                <ul role="list" className="relative mt-7 flex flex-col gap-3.5 flex-1">
                  {col.rows.map((r, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Verdict v={r.v} highlight={col.highlight} />
                      <span className={col.highlight ? 'text-muted' : 'text-muted/80'}>{r.text}</span>
                    </li>
                  ))}
                </ul>

                {col.highlight && (
                  <div className="relative mt-8">
                    <GlowButton href="/contacto" className="w-full justify-center">Pedir orçamento grátis</GlowButton>
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="mt-12 text-center">
          <p className="text-muted text-sm max-w-lg mx-auto">
            O melhor dos dois mundos: <span className="text-white">qualidade de agência</span> e{' '}
            <span className="text-white">agilidade de freelancer</span> — sem o preço alto nem a espera.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
