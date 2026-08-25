import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'

// Faixa de conversão a meio da página.
//
// Medido em agosto de 2026: cada página do site tinha exatamente um ponto de
// conversão, quase sempre depois dos 75% de scroll — e o blog não tinha
// nenhum. São ~30.000 píxeis de conteúdo com seis oportunidades de agir, todas
// no fim. Esta faixa entra no ponto de maior intenção de cada página: a seguir
// aos resultados de um caso, a seguir à lista de artigos, a seguir à explicação
// do programa de parceiros.
//
// Os valores por omissão são os da homepage; cada página passa o seu texto.

type Props = {
  eyebrow?: string
  title?: string
  body?: string
  primaryLabel?: string
  primaryHref?: string
  secondary?: { label: string; href: string } | null
  /** Citação real de cliente (Perfil de Empresa do Google) sob o CTA. */
  quote?: boolean
  reassurance?: string[]
}

const DEFAULT_REASSURANCE = [
  'Resposta em menos de 2 horas',
  'Preço fixo fechado depois do diagnóstico',
  'Falas comigo, não com um comercial',
]

export default function MidCTA({
  eyebrow,
  title = 'Queres resultados destes no teu negócio?',
  body = 'Diz-me o que precisas e recebes um plano com preço à cabeça. Se ainda não sabes por onde começar, começamos pelo diagnóstico — e sais com a ordem de trabalhos, faças-a connosco ou não.',
  primaryLabel = 'Pedir orçamento grátis',
  primaryHref = '/contacto',
  secondary = { label: 'Ver o diagnóstico', href: '/servicos/diagnostico-ia' },
  quote = true,
  reassurance = DEFAULT_REASSURANCE,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-bg border-t border-white/10 py-20 px-6">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgba(127,168,217,0.10), transparent 70%)' }}
      />
      <div className="relative max-w-[880px] mx-auto text-center">
        <AnimateOnScroll>
          {eyebrow && <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">{eyebrow}</p>}
          <h2 className="text-white text-balance">{title}</h2>
          <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">{body}</p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-5">
            <GlowButton href={primaryHref} variant="solid">{primaryLabel}</GlowButton>
            {secondary && (
              <Link
                href={secondary.href}
                className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
              >
                {secondary.label}
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            )}
          </div>

          {/* Prova junto ao ponto de decisão: a avaliação média do Google é
              abstrata, uma frase de um cliente com nome não é. Citação real do
              Perfil de Empresa (ver app/portfolio/projects.tsx). */}
          {quote && (
            <figure className="mt-10 mx-auto max-w-xl border-t border-white/10 pt-8">
              <blockquote className="text-[15px] text-white/85 leading-relaxed italic text-pretty">
                “Desde o início que sabíamos que seria a melhor opção e não estamos enganados!
                Continuaremos, pois confiança, rigor e dedicação é aquilo que nos faz ficar.”
              </blockquote>
              <figcaption className="mt-3 text-[12px] text-dark">
                Sérgio Santos · CEO, 100Montanhas
              </figcaption>
            </figure>
          )}

          {reassurance.length > 0 && (
            <ul role="list" className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {reassurance.map((r) => (
                <li key={r} className="inline-flex items-center gap-2 text-[12px] text-muted">
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden />
                  {r}
                </li>
              ))}
            </ul>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
