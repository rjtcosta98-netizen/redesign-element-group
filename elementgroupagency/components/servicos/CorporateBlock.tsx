import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

// A mensagem do site estava toda calibrada para micro-negócio local, e nada falava
// a um decisor remoto — apesar de já ter chegado um pedido corporativo real.
// Este bloco resolve isso sem inventar uma página /empresas que ainda não tem
// casos publicados para a sustentar.

type Props = {
  /** Parágrafo opcional específico do serviço, inserido antes das regras. */
  intro?: string
  /** Regras de aceitação a mostrar. Nos projetos de software são decisivas. */
  rules?: string[]
  ctaHref?: string
}

const DEFAULT_INTRO =
  'Uma parte do trabalho é para empresas fora da região, e algumas fora do país. O processo é o mesmo: âmbito escrito antes de começar, um interlocutor único, entregas por fases com aprovação em cada uma, e faturação com IVA e NIF regularizados. Reuniões por videochamada, documentação partilhada, e um prazo de resposta que não depende do fuso horário.'

export default function CorporateBlock({ intro = DEFAULT_INTRO, rules, ctaHref = '/contacto' }: Props) {
  return (
    <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="empresas-h">
      <div className="max-w-[880px] mx-auto">
        <AnimateOnScroll>
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Empresas e instituições</p>
          <h2 id="empresas-h" className="text-white">Trabalho com equipas que nunca me vão ver ao vivo</h2>
          <p className="mt-5 text-muted leading-relaxed">{intro}</p>

          {rules && rules.length > 0 && (
            <ul role="list" className="mt-7 space-y-3">
              {rules.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm text-white/85 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-[2px] rotate-45 bg-accent" aria-hidden />
                  {rule}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <Link href={ctaHref} className="group inline-flex items-center gap-1.5 text-sm text-white hover:text-accent transition-colors">
              Enviar um pedido de proposta
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
