import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

type Step = {
  n: string
  title: string
  body: string
  chip: string
}

// Anxiety-reducing, SEO-aware PT-PT copy. Real facts only:
// resposta <2h, orçamento grátis, preço fixo, planos mensais / suporte contínuo.
const STEPS: Step[] = [
  {
    n: '01',
    title: 'Pedes o orçamento grátis',
    body: 'Preenches um formulário rápido (2 minutos). Respondemos em menos de 2 horas com os próximos passos — sem compromisso e sem pressão.',
    chip: 'Resposta em < 2h',
  },
  {
    n: '02',
    title: 'Conversamos e planeamos',
    body: 'Ouvimos o teu objetivo e propomos um plano claro: o que vais ter, prazos e preço fixo à cabeça. Só avançamos depois de aprovares.',
    chip: 'Preço fixo, sem surpresas',
  },
  {
    n: '03',
    title: 'Criamos o teu projeto',
    body: 'Desenhamos e desenvolvemos o teu website, loja online ou campanha, com atualizações ao longo do caminho. Vês o progresso e dás feedback.',
    chip: 'Acompanhas tudo',
  },
  {
    n: '04',
    title: 'Lançamos e acompanhamos',
    body: 'Pomos tudo online, testado e otimizado. E continuamos contigo — com suporte e planos mensais — para o teu negócio crescer mês após mês.',
    chip: 'Suporte contínuo',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-bg px-6 py-24" aria-labelledby="como-funciona">
      <div className="max-w-[1100px] mx-auto">
        <AnimateOnScroll className="text-center mb-16 md:mb-20">
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Como funciona</p>
          <h2 id="como-funciona" className="text-white">Trabalhar connosco é simples</h2>
          <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
            Do primeiro contacto ao lançamento, sabes sempre o que vem a seguir.
            Um processo claro, comunicação direta e preço fixo — sem surpresas pelo caminho.
          </p>
        </AnimateOnScroll>

        <div className="relative">
          {/* Connecting rail — horizontal on desktop, vertical on mobile (decorative) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px
                       bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0"
          />
          <div
            aria-hidden
            className="md:hidden absolute top-7 bottom-7 left-1/2 -translate-x-1/2 w-px
                       bg-gradient-to-b from-accent/0 via-accent/30 to-accent/0"
          />

          <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {STEPS.map((s, i) => (
              <li key={s.n}>
                {/* Staggered reveal → the path appears to "draw" step by step */}
                <AnimateOnScroll delay={i * 0.12} className="flex flex-col items-center text-center">
                  {/* Glowing numbered node — the memorable anchor */}
                  <div className="relative z-10 mb-7 grid place-items-center w-14 h-14 rounded-full
                                  border border-accent/40 bg-bg-card
                                  shadow-[0_0_0_6px_rgba(14,14,14,1),0_0_30px_-4px_rgba(127,168,217,0.55)]">
                    <span className="font-heading text-lg font-medium text-accent leading-none">{s.n}</span>
                  </div>

                  <h3 className="text-white font-heading text-xl font-medium tracking-[-0.01em] leading-snug px-2">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-muted text-sm leading-relaxed max-w-[15rem]">{s.body}</p>

                  <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/10
                                   bg-white/[0.04] px-3 py-1 text-[11px] text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
                    {s.chip}
                  </span>
                </AnimateOnScroll>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
