import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PackageSelector from '@/components/servicos/PackageSelector'
import PainPoints from '@/components/servicos/PainPoints'
import ProcessTimeline from '@/components/servicos/ProcessTimeline'
import RelatedServices from '@/components/servicos/RelatedServices'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'

const CTA = `/contacto?servico=${encodeURIComponent('Marca & Design')}`

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Marca e Design — logótipo e identidade visual — Element Group',
  description:
    'Logótipo, identidade completa e aplicação a site e redes. Uma marca coerente, entregue com manual de uso e ficheiros que são teus.',
  keywords: ['criação de logótipo', 'identidade visual empresa', 'design de marca Portugal', 'manual de marca', 'branding PME', 'designer gráfico Seia'],
  alternates: { canonical: '/servicos/design' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Marca e Design — Element Group',
    description: 'Logótipo, identidade completa e aplicação a site e redes. Ficheiros e direitos são teus.',
    url: '/servicos/design',
    locale: 'pt_PT',
    siteName: 'Element Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marca e Design — Element Group',
    description: 'Logótipo, identidade completa e aplicação a site e redes.',
  },
}

export default function DesignPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Marca e Design',
            serviceType: 'Design de identidade visual e branding',
            description:
              'Criação de logótipo, identidade visual completa e aplicação da marca a website e redes sociais, com manual de uso e ficheiros originais entregues ao cliente.',
            path: '/servicos/design',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Serviços', path: '/servicos' },
            { name: 'Marca & Design', path: '/servicos/design' },
          ]),
          faqSchema('design', FAQS),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6" style={{ ['--accent-rgb' as string]: '215 176 116' }}>
        <div
          aria-hidden
          className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(215,176,116,0.16), transparent 60%)' }}
        />
        <div className="relative max-w-[880px] mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">Marca &amp; Conteúdo</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Uma marca que <span className="text-accent">não parece feita à pressa</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-2xl mx-auto">
              O teu trabalho pode ser excelente e, mesmo assim, parecer amador em cima de uma mesa ao
              lado da concorrência. A identidade não é decoração — é o que faz alguém confiar em ti
              antes de te conhecer.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href={CTA}>Quero uma marca a sério</GlowButton>
              <Link href="/portfolio/estrela-detail-wash" className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors">
                Ver um caso
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <PainPoints
        title={<>Uma marca inconsistente <span className="pain-word">custa-te credibilidade</span> todos os dias.</>}
        intro="Não em faturas — em pedidos que não chegam e em preços que não consegues praticar. Reconheces-te nalgum destes?"
        items={[
          { pain: 'O logótipo foi feito à pressa, há anos, e nunca mais foi tocado.', cost: 'Pareces mais pequeno e mais barato do que és.' },
          { pain: 'Cada post, cartão e documento usa uma cor e um tipo de letra diferentes.', cost: 'Ninguém te reconhece de relance.' },
          { pain: 'Só tens o logótipo em JPG, com fundo branco, e ninguém sabe onde está o original.', cost: 'Todas as aplicações novas ficam remendadas.' },
          { pain: 'Ao lado da concorrência, o teu material parece de outra década.', cost: 'Perdes o cliente antes da conversa sobre preço.' },
        ]}
      />

      {/* Pacotes */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="preco" style={{ ['--accent-rgb' as string]: '215 176 116' }}>
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Investimento</p>
            <h2 id="preco" className="text-white">Três níveis, conforme o que precisas de cobrir</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              A diferença entre eles não é a quantidade de ficheiros — é quanto do teu negócio fica
              coberto por regras claras, para não voltares a decidir cor e tipo de letra a cada peça.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES} packages={PRICES} ctaHref={CTA} />
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="processo-desktop processo-mobile" style={{ ['--accent-rgb' as string]: '215 176 116' }}>
        <ProcessTimeline
          eyebrow="Como funciona"
          title="Sem dezenas de propostas ao calhas"
          subtitle="Prefiro poucas direções bem fundamentadas do que vinte hipóteses à sorte para escolheres a que menos desagrada."
          steps={STEPS}
        />
      </section>

      {/* Caso */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="caso" style={{ ['--accent-rgb' as string]: '215 176 116' }}>
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Um caso</p>
            <h2 id="caso" className="text-white">Estrela Detail Wash</h2>
            <p className="mt-5 text-muted leading-relaxed">
              Identidade completa para um negócio de lavagem e detalhe automóvel: marca, paleta,
              aplicação e material de comunicação. É o exemplo do que este serviço entrega quando a
              marca é construída de raiz em vez de remendada.
            </p>
            <div className="mt-8">
              <Link href="/portfolio/estrela-detail-wash" className="group inline-flex items-center gap-1.5 text-sm text-white hover:text-accent transition-colors">
                Ver o caso completo
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Honestidade sobre a IA generativa — a ressalva do catálogo, dita ao cliente */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="ia-honestidade" style={{ ['--accent-rgb' as string]: '215 176 116' }}>
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <div className="rounded-[24px] border border-white/10 bg-bg-card p-7 sm:p-9">
              <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Uma conversa honesta</p>
              <h2 id="ia-honestidade" className="text-white font-heading text-2xl font-medium tracking-[-0.01em]">
                “Não consigo gerar isto com IA por 20 €?”
              </h2>
              <p className="mt-5 text-muted leading-relaxed">
                Um símbolo bonito, consegues. E se só precisas disso para arrancar amanhã, diz-me e
                poupas dinheiro — prefiro dizer-te isso do que vender-te o que não precisas.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                O que a geração automática não te dá é a parte que dá resultado: coerência ao longo do
                tempo, regras de uso que qualquer pessoa consegue seguir, ficheiros originais editáveis,
                e uma marca que continua a funcionar quando for aplicada ao site, à montra e à fatura.
                É a diferença entre ter uma imagem e ter uma identidade.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Na prática, este serviço faz mais sentido quando a marca vai ser aplicada a alguma
                coisa — normalmente um site. É por isso que o pacote completo é o que recomendo, e é
                por isso que quase toda a gente que entra por aqui acaba a falar de website.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="faq" style={{ ['--accent-rgb' as string]: '215 176 116' }}>
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

      <RelatedServices current="design" />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta" style={{ ['--accent-rgb' as string]: '215 176 116' }}>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(215,176,116,0.14), transparent 70%)' }}
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <AnimateOnScroll>
            <h2 id="cta" className="text-white">Mostra-me o que tens hoje</h2>
            <p className="mt-5 text-muted leading-relaxed">
              Numa chamada de 30 minutos vejo o que já existe e digo-te com franqueza se precisas de
              marca nova, de arrumar a que tens, ou de nenhuma das duas coisas para já.
            </p>
            <div className="mt-10 flex justify-center">
              <GlowButton href={CTA}>Pedir orçamento grátis</GlowButton>
            </div>
            <p className="mt-6 text-xs text-muted">Resposta em menos de 2 horas · Falas comigo, não com um comercial</p>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}

const INCLUDES = [
  { title: 'Ficheiros originais', desc: 'Vetores editáveis e todas as versões exportadas. São teus, sem depender de mim para os usar.',
    icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></>) },
  { title: 'Direitos de uso', desc: 'A marca é da tua empresa, para qualquer aplicação, sem limite de tempo nem royalties.',
    icon: (<><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></>) },
  { title: 'Regras de aplicação', desc: 'O que se pode e não se pode fazer com a marca, escrito para quem não é designer.',
    icon: (<><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>) },
  { title: 'Versões para todo o lado', desc: 'Fundo claro e escuro, horizontal e vertical, símbolo isolado, tamanhos pequenos.',
    icon: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>) },
]

const PRICES = [
  { name: 'Logótipo', desc: 'O essencial para arrancar com uma marca própria e coerente.', price: '490-790 €', type: 'Pagamento único',
    features: ['Logótipo em versões principais', 'Ficheiros vetoriais originais', 'Versões para fundo claro e escuro', 'Regras básicas de uso'] },
  { name: 'Identidade Completa', desc: 'A marca e o sistema à volta dela — cores, letras e regras.', price: '900-1.800 €', type: 'Pagamento único',
    features: ['Tudo o do Logótipo', 'Paleta de cores definida', 'Tipografia e hierarquia', 'Manual de marca', 'Aplicações-base (cartão, documento, assinatura)'] },
  { name: 'Identidade + Aplicação', desc: 'A identidade já aplicada ao site e às redes, pronta a usar.', price: '1.500-2.500 €', type: 'Pagamento único', highlight: true, tag: 'Recomendado',
    features: ['Tudo o da Identidade Completa', 'Aplicação ao website', 'Modelos para redes sociais', 'Capas e destaques de perfil', 'Coerência garantida entre site e redes'] },
]

const STEPS = [
  { card: 'Conversa', tagline: 'Perceber o negócio antes de desenhar.',
    title: 'Conversa e contexto', desc: 'Quem és, para quem trabalhas, o que te distingue e o que não queres parecer. Sem isto, o desenho é decoração.',
    metric: '30 min', metricLabel: 'chamada gratuita', icon: (<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></>) },
  { card: 'Direções', tagline: 'Poucas hipóteses, bem fundamentadas.',
    title: 'Duas ou três direções', desc: 'Cada uma com o raciocínio por trás. Discutimos o porquê, não só o gosto — é isso que evita rondas infinitas.',
    metric: '2-3', metricLabel: 'direções, não vinte', icon: (<><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="14.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" /><circle cx="8.5" cy="19.5" r="2.5" /></>) },
  { card: 'Refinamento', tagline: 'Aprofundar a direção escolhida.',
    title: 'Refinar até estar certo', desc: 'Escolhida a direção, afina-se: proporções, versões, comportamento em tamanhos pequenos e em fundo escuro.',
    metric: '2 rondas', metricLabel: 'de ajuste incluídas', icon: (<><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>) },
  { card: 'Sistema', tagline: 'Regras para quem não é designer.',
    title: 'Cores, letras e regras', desc: 'A paleta, a tipografia e o manual de uso — para a marca continuar coerente quando não for eu a aplicá-la.',
    metric: 'Manual', metricLabel: 'legível por qualquer pessoa', icon: (<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>) },
  { card: 'Entrega', tagline: 'Tudo em tuas mãos.',
    title: 'Ficheiros e direitos', desc: 'Recebes os originais editáveis e todas as exportações. A marca é da tua empresa, sem dependeres de mim.',
    metric: '100%', metricLabel: 'teus, sem royalties', icon: (<><path d="M21 8v13H3V8" /><path d="M1 3h22v5H1zM10 12h4" /></>) },
]

const FAQS = [
  { q: 'Quanto custa um logótipo?', a: 'Entre 490 € e 790 € para o logótipo isolado. A identidade completa, com paleta, tipografia e manual de marca, fica entre 900 € e 1.800 €; a identidade já aplicada a site e redes entre 1.500 € e 2.500 €. Valores sem IVA, com o valor exato fechado depois de percebermos o âmbito.' },
  { q: 'Os ficheiros e os direitos ficam meus?', a: 'Sim, sem exceção. Recebes os ficheiros vetoriais originais, editáveis, e todas as versões exportadas. A marca é propriedade da tua empresa, para qualquer aplicação, sem limite de tempo e sem royalties. Não fico com nada que te obrigue a voltar a mim.' },
  { q: 'Quantas alterações posso pedir?', a: 'Apresento duas ou três direções fundamentadas e, escolhida uma, incluo duas rondas de ajuste. Na prática chega quase sempre, porque a conversa inicial elimina à cabeça o que não faz sentido. Se for preciso mais, digo-te o custo antes de fazer, nunca depois.' },
  { q: 'Não consigo gerar um logótipo com IA?', a: 'Um símbolo bonito, sim. O que não obténs assim é a coerência ao longo do tempo, as regras de uso que qualquer pessoa da tua equipa consegue seguir, os ficheiros originais editáveis e uma marca que continua a funcionar aplicada ao site, à montra e à fatura. Se só precisas de um símbolo para arrancar amanhã, digo-te que não precisas de mim.' },
  { q: 'Já tenho logótipo. Podem só arrumar o resto?', a: 'Sim, e às vezes é o que recomendo. Mantém-se o logótipo, define-se a paleta, a tipografia e as regras em falta, e aplica-se com coerência. Fica normalmente no escalão da identidade completa, dependendo do estado do que já existe.' },
  { q: 'Fazem também o site com a marca nova?', a: 'Sim, e é onde a identidade rende mais. O pacote de identidade com aplicação já cobre a aplicação a site e redes; o site em si é orçamentado à parte, na página de websites.' },
]
