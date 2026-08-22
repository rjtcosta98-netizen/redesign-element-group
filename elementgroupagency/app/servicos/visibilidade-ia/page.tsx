import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PackageSelector from '@/components/servicos/PackageSelector'
import PainPoints from '@/components/servicos/PainPoints'
import IncludesGlobe from '@/components/servicos/IncludesGlobe'
import ProcessTimeline from '@/components/servicos/ProcessTimeline'
import AiCitationBaseline from '@/components/servicos/AiCitationBaseline'
import RelatedServices from '@/components/servicos/RelatedServices'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'

const CTA = `/contacto?servico=${encodeURIComponent('Visibilidade em IA (GEO)')}`

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Visibilidade em IA (GEO) — aparecer no ChatGPT e no Perplexity — Element Group',
  description:
    'Cada vez mais gente pergunta ao ChatGPT em vez de pesquisar no Google. Trabalho para o teu negócio ser citado nessas respostas — com medição antes e depois.',
  keywords: ['GEO', 'AEO', 'aparecer no ChatGPT', 'otimização para motores de IA', 'citações em IA', 'AI Overviews Google', 'SEO para inteligência artificial Portugal'],
  alternates: { canonical: '/servicos/visibilidade-ia' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Visibilidade em IA (GEO) — Element Group',
    description: 'Ser citado pelo ChatGPT, Perplexity e AI Overviews. Com linha de base medida antes de qualquer alteração.',
    url: '/servicos/visibilidade-ia',
    locale: 'pt_PT',
    siteName: 'Element Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visibilidade em IA (GEO) — Element Group',
    description: 'Ser citado pelo ChatGPT, Perplexity e AI Overviews. Com medição antes e depois.',
  },
}

export default function VisibilidadeIaPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Visibilidade em IA (GEO/AEO)',
            serviceType: 'Otimização para motores de resposta e generativos',
            description:
              'Trabalho técnico e editorial para um negócio ser citado por ChatGPT, Perplexity, Gemini e AI Overviews: acesso de crawlers, dados estruturados, conteúdo em formato de resposta e medição de citações.',
            path: '/servicos/visibilidade-ia',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Serviços', path: '/servicos' },
            { name: 'Visibilidade em IA', path: '/servicos/visibilidade-ia' },
          ]),
          faqSchema('visibilidade-ia', FAQS),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6" style={{ ['--accent-rgb' as string]: '111 179 154' }}>
        <div
          aria-hidden
          className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(111,179,154,0.16), transparent 60%)' }}
        />
        <div className="relative max-w-[880px] mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">SEO &amp; Visibilidade em IA</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Quando alguém pergunta ao ChatGPT quem faz isto na tua zona, <span className="text-accent">o teu nome tem de aparecer</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-2xl mx-auto">
              As pessoas deixaram de percorrer dez resultados azuis. Perguntam, leem uma resposta e
              decidem. Quem é citado nessa resposta ganha o cliente — e quem não é, desaparece sem
              sequer saber que existiu uma pesquisa.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href={CTA}>Quero ser citado</GlowButton>
              <Link href="/servicos/seo" className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors">
                Ver também o SEO clássico
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Os números que o vendem */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="porque-agora" style={{ ['--accent-rgb' as string]: '111 179 154' }}>
        <div className="max-w-[1000px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Porquê agora</p>
            <h2 id="porque-agora" className="text-white">A pesquisa mudou mais em dois anos do que em dez</h2>
          </AnimateOnScroll>

          <div className="grid sm:grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <AnimateOnScroll key={s.label} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-bg-card p-6 text-center">
                  <p className="font-heading text-accent text-[38px] leading-none font-medium tabular-nums">{s.metric}</p>
                  <p className="mt-3 text-[13px] text-white/85 leading-snug">{s.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <p className="mt-8 text-center text-[12px] text-dark leading-relaxed max-w-2xl mx-auto">
              Estes números vêm de estudos de mercado de 2025 e 2026 e mudam depressa. Uso-os para
              explicar a direção da mudança, não como garantia de resultado — e digo-te a fonte se quiseres verificar.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <PainPoints
        title={<>O teu negócio pode estar <span className="pain-word">invisível</span> para metade da pesquisa moderna.</>}
        intro="O GEO não substitui o SEO — resolve um problema diferente, que o SEO clássico não vê. Reconheces-te nalgum destes?"
        items={[
          { pain: 'Perguntas ao ChatGPT quem faz o teu serviço na tua zona e ele nomeia concorrentes, não te nomeia a ti.', cost: 'Clientes que nunca chegam a saber que existes.' },
          { pain: 'O teu site bloqueia, sem tu saberes, os robôs que alimentam estas respostas.', cost: 'Nem sequer estás na corrida.' },
          { pain: 'Os teus conteúdos estão escritos em prosa longa, sem respostas diretas e extraíveis.', cost: 'Há informação, mas nada que uma IA consiga citar.' },
          { pain: 'O nome, a morada e o contacto do negócio aparecem diferentes em cada sítio.', cost: 'A IA não tem confiança suficiente para te recomendar.' },
        ]}
      />

      <AiCitationBaseline />

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui-desktop inclui-mobile" style={{ ['--accent-rgb' as string]: '111 179 154' }}>
        <IncludesGlobe
          eyebrow="O que inclui"
          title="Trabalho técnico, não truques"
          subtitle="Nada disto é um atalho. É tornar o teu negócio legível, verificável e citável por sistemas que leem milhões de páginas."
          items={INCLUDES}
        />
      </section>

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="processo-desktop processo-mobile" style={{ ['--accent-rgb' as string]: '111 179 154' }}>
        <ProcessTimeline
          eyebrow="Como funciona"
          title="Medir, corrigir, escrever, medir outra vez"
          subtitle="A primeira e a última etapa são a mesma medição. É isso que torna o resultado verificável."
          steps={STEPS}
        />
      </section>

      {/* O limite rígido */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="limite" style={{ ['--accent-rgb' as string]: '111 179 154' }}>
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <div className="rounded-[24px] border border-white/10 bg-bg-card p-7 sm:p-9">
              <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">O que não te posso prometer</p>
              <h2 id="limite" className="text-white font-heading text-2xl font-medium tracking-[-0.01em]">
                Ninguém consegue garantir uma citação
              </h2>
              <p className="mt-5 text-muted leading-relaxed">
                Quem te garantir que ficas no ChatGPT está a mentir ou não percebe do assunto. Estes
                sistemas não têm posições estáveis, mudam de modelo sem aviso e escolhem fontes por
                critérios que ninguém controla de fora.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                O que se vende aqui é processo e medição: removem-se os bloqueios técnicos, estrutura-se
                a informação, escreve-se em formato de resposta e mede-se a evolução com uma linha de
                base registada. Se ao fim de um ciclo não houver evolução, vês isso nos dados — não numa
                apresentação minha.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Preço */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="preco" style={{ ['--accent-rgb' as string]: '111 179 154' }}>
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Investimento</p>
            <h2 id="preco" className="text-white">Diagnóstico e implementação</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              O valor depende do tamanho do site e do estado em que está. Fecha-se depois do diagnóstico.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES_SHORT} packages={PRICES} ctaHref={CTA} />
          </AnimateOnScroll>
          <p className="mt-8 text-center text-[11px] text-dark">
            A medição contínua de citações faz parte do plano Crescimento (349 €/mês). Em avulso, é o módulo de 199-349 €/mês.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="faq" style={{ ['--accent-rgb' as string]: '111 179 154' }}>
        <div className="max-w-[820px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">FAQ</p>
            <h2 id="faq" className="text-white">Perguntas frequentes</h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <FaqAccordion items={FAQS} />
          </AnimateOnScroll>
        </div>
      </section>

      <RelatedServices current="geo" />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta" style={{ ['--accent-rgb' as string]: '111 179 154' }}>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(111,179,154,0.14), transparent 70%)' }}
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <AnimateOnScroll>
            <h2 id="cta" className="text-white">Queres saber se és citado hoje?</h2>
            <p className="mt-5 text-muted leading-relaxed">
              Numa chamada de 30 minutos escolhemos cinco perguntas que os teus clientes fazem, e vemos
              juntos quem é citado. É a fotografia de partida — e às vezes é desconfortável.
            </p>
            <div className="mt-10 flex justify-center">
              <GlowButton href={CTA}>Marcar chamada gratuita</GlowButton>
            </div>
            <p className="mt-6 text-xs text-muted">Resposta em menos de 2 horas · Falas comigo, não com um comercial</p>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}

const STATS = [
  { metric: '48%', label: 'das pesquisas no Google já mostram uma resposta gerada por IA no topo' },
  { metric: '−61%', label: 'de quebra nos cliques orgânicos quando essa resposta aparece' },
  { metric: '+35%', label: 'mais cliques para as marcas que são citadas dentro da resposta' },
]

const INCLUDES = [
  { title: 'Acesso dos crawlers de IA', desc: 'Verificar e desbloquear ClaudeBot, GPTBot, PerplexityBot e companhia. Muitos sites bloqueiam-nos sem saber.',
    icon: (<><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20Z" /></>) },
  { title: 'llms.txt e dados estruturados', desc: 'Declarar o que o negócio é, faz e cobre, num formato que as máquinas leem sem ambiguidade.',
    icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></>) },
  { title: 'Conteúdo em formato de resposta', desc: 'Perguntas reais com respostas curtas, diretas e extraíveis — o formato que as IAs citam.',
    icon: (<><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" /></>) },
  { title: 'Consistência de entidade', desc: 'Nome, morada, contacto e descrição iguais no site, no Google Business e nos diretórios.',
    icon: (<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>) },
  { title: 'Linha de base documentada', desc: 'Medir as citações antes de mexer em nada, para a evolução ser verificável e não alegada.',
    icon: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>) },
  { title: 'Medição e ajuste', desc: 'Repetir a medição, ver o que mudou e corrigir o que não funcionou. Sem isto, é adivinhação.',
    icon: (<><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></>) },
]

const INCLUDES_SHORT = INCLUDES.slice(0, 4)

const STEPS = [
  { card: 'Linha de base', tagline: 'Onde estás hoje, medido.',
    title: 'Medir antes de mexer', desc: 'Escolhemos as perguntas que os teus clientes fazem e registamos quem é citado hoje. É a fotografia de partida.',
    metric: '5', metricLabel: 'perguntas registadas', icon: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>) },
  { card: 'Desbloqueio', tagline: 'Deixar os robôs entrar.',
    title: 'Acesso técnico', desc: 'Verificar se os crawlers de IA estão a ser bloqueados pela firewall ou pelo robots.txt, e corrigir. É o passo que a maioria salta.',
    metric: '20+', metricLabel: 'agentes verificados', icon: (<><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0" /></>) },
  { card: 'Estrutura', tagline: 'Dizer às máquinas o que és.',
    title: 'Dados estruturados e llms.txt', desc: 'Declarar a entidade, os serviços, a área servida e as perguntas frequentes num formato legível por máquina.',
    metric: 'JSON-LD', metricLabel: 'esquema completo', icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></>) },
  { card: 'Conteúdo', tagline: 'Escrever para ser citado.',
    title: 'Respostas extraíveis', desc: 'Reescrever e criar conteúdo em formato de pergunta e resposta, com factos verificáveis e linguagem sem rodeios.',
    metric: 'Direto', metricLabel: 'sem prosa decorativa', icon: (<><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>) },
  { card: 'Nova medição', tagline: 'Comparar com o ponto de partida.',
    title: 'Medir outra vez', desc: 'Repetir exatamente as mesmas perguntas e comparar. O que melhorou fica claro; o que não melhorou também.',
    metric: 'Mesmas 5', metricLabel: 'perguntas, comparadas', icon: (<><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></>) },
]

const PRICES = [
  { name: 'Visibilidade em IA (GEO)', desc: 'Diagnóstico, correções técnicas, conteúdo em formato de resposta e medição.', price: '690-1.200 €', type: 'Pagamento único', highlight: true, tag: 'Diferenciador',
    features: ['Linha de base de citações documentada', 'Desbloqueio e verificação de crawlers de IA', 'llms.txt e dados estruturados completos', 'Conteúdo reescrito em formato de resposta', 'Consistência de entidade em diretórios', 'Nova medição comparável no fim'] },
]

const FAQS = [
  { q: 'O que é GEO, em português simples?', a: 'GEO significa otimização para motores generativos. É o trabalho de fazer com que o teu negócio seja citado nas respostas do ChatGPT, do Perplexity, do Gemini e nos resumos de IA do Google — do mesmo modo que o SEO faz com que apareças na lista de resultados. Também lhe chamam AEO, otimização para motores de resposta.' },
  { q: 'Isto substitui o SEO?', a: 'Não. Resolve um problema diferente e os dois reforçam-se. O SEO trabalha a lista de resultados azuis, que continua a existir e a trazer tráfego; o GEO trabalha a resposta gerada que aparece por cima dela. Boa parte do trabalho técnico serve os dois, e por isso costumo propô-los juntos.' },
  { q: 'Consegues garantir que apareço no ChatGPT?', a: 'Não, e desconfia de quem garantir. Estes sistemas mudam de modelo sem aviso e escolhem fontes por critérios que ninguém controla de fora. O que garanto é o processo e a medição: linha de base registada antes, trabalho técnico e editorial, e nova medição comparável no fim.' },
  { q: 'Como sei se está a resultar?', a: 'Pela mesma medição, repetida. Registamos no início quem é citado em cinco perguntas reais do teu setor, e repetimos exatamente essas perguntas depois. A comparação é direta e não depende da minha interpretação.' },
  { q: 'Quanto tempo demora a ver diferença?', a: 'Depende de quanto tempo os sistemas demoram a reindexar o teu site e de quão consolidada está a tua presença. Alguns sinais mudam em semanas, outros levam meses. Prefiro dizer isto do que prometer um prazo que não controlo.' },
  { q: 'Vocês aplicam isto ao vosso próprio site?', a: 'Sim, e mostramos a nossa linha de base nesta página, incluindo quando era má. O nosso site declara mais de vinte crawlers de IA no robots.txt, tem JSON-LD completo, llms.txt e conteúdo em formato de resposta. Houve dois meses em que a firewall bloqueava esses robôs sem darmos por isso — que é exatamente o erro que este serviço procura primeiro.' },
]
