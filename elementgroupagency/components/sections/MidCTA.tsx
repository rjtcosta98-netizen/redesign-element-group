import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'

// Ponto de conversão a meio da página. A home tinha CTA no hero e no fim, e
// entre um e outro passavam-se milhares de píxeis de prova sem forma de agir —
// e é logo a seguir aos resultados dos clientes que a intenção é maior.
const REASSURANCE = [
  'Resposta em menos de 2 horas',
  'Preço fixo fechado depois do diagnóstico',
  'Falas comigo, não com um comercial',
]

export default function MidCTA() {
  return (
    <section className="relative overflow-hidden bg-bg border-t border-white/10 py-20 px-6">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(60% 100% at 50% 0%, rgba(127,168,217,0.10), transparent 70%)' }}
      />
      <div className="relative max-w-[880px] mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="text-white text-balance">Queres resultados destes no teu negócio?</h2>
          <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
            Diz-me o que precisas e recebes um plano com preço à cabeça. Se ainda não sabes por onde
            começar, começamos pelo diagnóstico — e sais com a ordem de trabalhos, faças-a connosco ou não.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-5">
            <GlowButton href="/contacto" variant="solid">Pedir orçamento grátis</GlowButton>
            <Link
              href="/servicos/diagnostico-ia"
              className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              Ver o diagnóstico
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </Link>
          </div>

          {/* Prova junto ao ponto de decisão: a avaliação média do Google é
              abstrata, uma frase de um cliente com nome não é. Citação real do
              Perfil de Empresa (ver app/portfolio/projects.tsx). */}
          <figure className="mt-10 mx-auto max-w-xl border-t border-white/10 pt-8">
            <blockquote className="text-[15px] text-white/85 leading-relaxed italic text-pretty">
              “Desde o início que sabíamos que seria a melhor opção e não estamos enganados!
              Continuaremos, pois confiança, rigor e dedicação é aquilo que nos faz ficar.”
            </blockquote>
            <figcaption className="mt-3 text-[12px] text-dark">
              Sérgio Santos · CEO, 100Montanhas
            </figcaption>
          </figure>

          <ul role="list" className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {REASSURANCE.map((r) => (
              <li key={r} className="inline-flex items-center gap-2 text-[12px] text-muted">
                <span className="w-1 h-1 rounded-full bg-accent shrink-0" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
