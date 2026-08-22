import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

// O antídoto contra "a IA faz tudo". Em vez de prometer inteligência, mostra um
// processo concreto: o que acontece hoje, passo a passo, e o que passa a acontecer.
// Se um serviço de IA não conseguir preencher estas duas colunas com passos
// verificáveis, não está pronto para ser vendido.

export type FlowStep = { label: string; detail?: string }

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  beforeTitle?: string
  afterTitle?: string
  before: FlowStep[]
  after: FlowStep[]
  /** Uma frase honesta sobre o que continua a ser humano. */
  footnote?: string
}

function Column({
  title,
  steps,
  tone,
}: {
  title: string
  steps: FlowStep[]
  tone: 'before' | 'after'
}) {
  const isAfter = tone === 'after'

  return (
    <div
      className={`rounded-[22px] border p-6 sm:p-7 h-full ${
        isAfter ? 'border-accent/25 bg-accent/[0.04]' : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <p className={`text-[11px] uppercase tracking-[0.18em] mb-6 ${isAfter ? 'text-accent/90' : 'text-dark'}`}>
        {title}
      </p>

      <ol role="list" className="space-y-4">
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-3.5">
            <span
              className={`grid place-items-center w-6 h-6 shrink-0 rounded-full text-[11px] font-medium tabular-nums ${
                isAfter ? 'bg-accent/15 text-accent' : 'bg-white/[0.06] text-muted'
              }`}
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className={`block text-[14px] leading-snug ${isAfter ? 'text-white' : 'text-white/70'}`}>
                {step.label}
              </span>
              {step.detail && <span className="mt-1 block text-[12px] text-muted leading-snug">{step.detail}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function ProcessBeforeAfter({
  eyebrow = 'Antes e depois',
  title,
  subtitle,
  beforeTitle = 'Como acontece hoje',
  afterTitle = 'Como passa a acontecer',
  before,
  after,
  footnote,
}: Props) {
  return (
    <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="antes-depois">
      <div className="max-w-[1100px] mx-auto">
        <AnimateOnScroll className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">{eyebrow}</p>
          <h2 id="antes-depois" className="text-white">{title}</h2>
          {subtitle && <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">{subtitle}</p>}
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-4">
          <AnimateOnScroll direction="left">
            <Column title={beforeTitle} steps={before} tone="before" />
          </AnimateOnScroll>
          <AnimateOnScroll direction="right">
            <Column title={afterTitle} steps={after} tone="after" />
          </AnimateOnScroll>
        </div>

        {footnote && (
          <AnimateOnScroll>
            <p className="mt-8 text-center text-[12px] text-dark max-w-2xl mx-auto leading-relaxed">{footnote}</p>
          </AnimateOnScroll>
        )}
      </div>
    </section>
  )
}
