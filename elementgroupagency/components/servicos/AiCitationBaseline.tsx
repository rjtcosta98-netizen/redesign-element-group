import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

// A linha de base é o entregável que separa este serviço de vender fumo: mede-se
// antes de mexer em nada, para que a evolução seja verificável em vez de alegada.
//
// As perguntas abaixo são as que foram realmente testadas no próprio site da
// Element Group. Não são exemplos inventados — e o resultado, à data do teste,
// era zero citações. Publicar isso é mais credível do que publicar um caso ideal.

type Query = { q: string; found: boolean }

const BASELINE: Query[] = [
  { q: 'melhor agência de marketing digital na Guarda', found: false },
  { q: 'agência sem fidelização Portugal', found: false },
  { q: 'quanto custa um site para pequena empresa em Portugal', found: false },
  { q: 'agência que usa IA para marketing Portugal', found: false },
  { q: 'como escolher agência de marketing digital', found: false },
]

export default function AiCitationBaseline() {
  const cited = BASELINE.filter((r) => r.found).length

  return (
    <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="linha-base">
      <div className="max-w-[900px] mx-auto">
        <AnimateOnScroll className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">O primeiro entregável</p>
          <h2 id="linha-base" className="text-white">Antes de mexer em nada, medimos onde estás</h2>
          <p className="mt-5 text-muted leading-relaxed">
            Escolhemos as perguntas que os teus clientes fazem de facto e registamos quem é citado hoje.
            É essa fotografia que torna a evolução verificável — e é ela que te permite despedir-me
            se não houver evolução nenhuma.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="rounded-[24px] border border-white/10 bg-bg-card overflow-hidden">
            <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-[13px] text-white/85">
                Exemplo real: a linha de base do <strong className="font-medium text-white">nosso próprio site</strong>
              </p>
              <p className="text-[12px] text-muted tabular-nums">
                {cited} de {BASELINE.length} perguntas com citação
              </p>
            </div>

            <ul role="list" className="divide-y divide-white/[0.06]">
              {BASELINE.map((row) => (
                <li key={row.q} className="flex items-center gap-4 px-6 sm:px-8 py-4">
                  <span
                    aria-hidden
                    className={`grid place-items-center w-6 h-6 shrink-0 rounded-full text-[11px] ${
                      row.found ? 'bg-accent/15 text-accent' : 'bg-white/[0.05] text-dark'
                    }`}
                  >
                    {row.found ? '✓' : '—'}
                  </span>
                  <span className="min-w-0 text-[14px] text-white/80 leading-snug">“{row.q}”</span>
                  <span className={`ml-auto shrink-0 text-[11px] ${row.found ? 'text-accent' : 'text-dark'}`}>
                    {row.found ? 'Citado' : 'Sem citação'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <p className="mt-7 text-[12px] text-dark leading-relaxed">
            Esta é a nossa própria linha de base, medida em agosto de 2026 — e é honestamente má. Mostro-a
            porque é o ponto de partida real de quase toda a gente, incluindo de quem vende este serviço.
            O trabalho começa por desbloquear os crawlers de IA, estruturar os dados e escrever conteúdo em
            formato de resposta. O que não se pode fazer é garantir posição: mede-se e ajusta-se, não se promete.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
