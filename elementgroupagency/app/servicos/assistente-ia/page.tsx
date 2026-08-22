import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PackageSelector from '@/components/servicos/PackageSelector'
import PainPoints from '@/components/servicos/PainPoints'
import IncludesGlobe from '@/components/servicos/IncludesGlobe'
import ProcessBeforeAfter from '@/components/servicos/ProcessBeforeAfter'
import RelatedServices from '@/components/servicos/RelatedServices'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'

const CTA = `/contacto?servico=${encodeURIComponent('Assistente de IA')}`

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Assistente de IA para o site e WhatsApp — Element Group',
  description:
    'Um assistente que responde às perguntas de sempre e qualifica pedidos, para falares só com quem interessa. Com revisão humana e limites definidos.',
  keywords: ['chatbot para empresas', 'assistente de IA website', 'chatbot WhatsApp negócio', 'qualificação automática de leads', 'atendimento automático PME', 'agente de IA Portugal'],
  alternates: { canonical: '/servicos/assistente-ia' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Assistente de IA para o site e WhatsApp — Element Group',
    description: 'Responde às perguntas de sempre e qualifica pedidos. Com revisão humana e limites definidos.',
    url: '/servicos/assistente-ia',
    locale: 'pt_PT',
    siteName: 'Element Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assistente de IA para o site e WhatsApp — Element Group',
    description: 'Responde às perguntas de sempre e qualifica pedidos, para falares só com quem interessa.',
  },
}

export default function AssistenteIaPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Assistente de IA para qualificação de contactos',
            serviceType: 'Implementação de assistente conversacional com inteligência artificial',
            description:
              'Assistente no website e no WhatsApp que responde a perguntas frequentes a partir dos conteúdos da empresa, qualifica pedidos, regista contactos e encaminha para a pessoa certa, com revisão humana das respostas.',
            path: '/servicos/assistente-ia',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Serviços', path: '/servicos' },
            { name: 'Assistente de IA', path: '/servicos/assistente-ia' },
          ]),
          faqSchema('assistente-ia', FAQS),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <div
          aria-hidden
          className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(169,138,212,0.16), transparent 60%)' }}
        />
        <div className="relative max-w-[880px] mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">IA &amp; Automação</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Um assistente que responde e qualifica, para tu <span className="text-accent">falares só com quem interessa</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-2xl mx-auto">
              As mesmas cinco perguntas, todos os dias, a horas em que não podes responder. Um assistente
              treinado nos teus conteúdos trata delas — e quando o pedido é a sério, chega-te já com o
              contexto reunido.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href={CTA} variant="solid">Quero ver se faz sentido</GlowButton>
            </div>
            <p className="mt-6 text-[12px] text-muted">1.200-2.500 € sem IVA · mais 99-199 €/mês de operação e revisão</p>
          </AnimateOnScroll>
        </div>
      </section>

      <PainPoints
        title={<>Estás a responder às <span className="pain-word">mesmas perguntas</span> desde que abriste.</>}
        intro="E o custo real não é o tempo — é o pedido bom que se perde porque chegou às onze da noite. Reconheces-te nalgum destes?"
        items={[
          { pain: 'Horários, preços, morada e disponibilidade: as mesmas perguntas, várias vezes por dia.', cost: 'Tempo que sai de onde havia trabalho a sério para fazer.' },
          { pain: 'As mensagens chegam fora de horas e ficam sem resposta até de manhã.', cost: 'Quem pergunta à noite já contactou outro antes das nove.' },
          { pain: 'Recebes muitos contactos, mas poucos são pedidos reais.', cost: 'Perdes tempo a filtrar em vez de vender.' },
          { pain: 'Cada pedido chega incompleto e obriga a três mensagens só para perceber o que a pessoa quer.', cost: 'Conversas que arrastam e às vezes morrem pelo caminho.' },
        ]}
      />

      <ProcessBeforeAfter
        title="O que muda, em concreto"
        subtitle="Não é a inteligência artificial a substituir-te. É deixares de fazer à mão a parte que não exige julgamento nenhum."
        before={[
          { label: 'Chega uma mensagem às 23h', detail: 'No site, no WhatsApp ou no Instagram.' },
          { label: 'Fica à espera até de manhã', detail: 'Quem perguntou já contactou outros três.' },
          { label: 'Respondes o horário e o preço', detail: 'Pela quinta vez naquela semana.' },
          { label: 'Fazes três perguntas de contexto', detail: 'Para perceber o que a pessoa quer mesmo.' },
          { label: 'Registas o contacto, se te lembrares', detail: 'Muitas vezes fica só na conversa.' },
        ]}
        after={[
          { label: 'Chega uma mensagem às 23h', detail: 'Nos mesmos canais, sem mudar nada para o cliente.' },
          { label: 'É respondida em segundos', detail: 'Com base nos teus conteúdos, não em invenção.' },
          { label: 'O assistente faz as perguntas de contexto', detail: 'As mesmas que farias, pela mesma ordem.' },
          { label: 'O contacto fica registado com o resumo', detail: 'Sempre, e sempre com os mesmos campos.' },
          { label: 'És notificado se o pedido for a sério', detail: 'E respondes tu, já a saber do que se trata.' },
        ]}
        footnote="Quando o assistente não sabe, diz que não sabe e passa para ti — em vez de inventar. É essa regra que separa uma ferramenta útil de uma que te estraga a reputação."
      />

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui-desktop inclui-mobile" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <IncludesGlobe
          eyebrow="O que inclui"
          title="Um assistente treinado no teu negócio"
          subtitle="Não é um robô genérico com o teu logótipo em cima. Responde a partir dos teus conteúdos, com as tuas regras e o teu tom."
          items={INCLUDES}
        />
      </section>

      {/* A tensão com a promessa do contacto — resolvida em voz alta */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="promessa" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <div className="rounded-[24px] border border-white/10 bg-bg-card p-7 sm:p-9">
              <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Uma contradição aparente</p>
              <h2 id="promessa" className="text-white font-heading text-2xl font-medium tracking-[-0.01em]">
                “Mas vocês dizem que falo sempre com uma pessoa.”
              </h2>
              <p className="mt-5 text-muted leading-relaxed">
                E é verdade — quando me contactas a mim, quem responde sou eu. Continuo a achar que uma
                agência que se esconde atrás de um robô não merece o teu dinheiro.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                A diferença é para que serve a automação. Construída para <em>fugir</em> ao cliente, é
                má — filtra quem quer falar contigo e frustra quem tem um problema. Construída para
                <em> devolver tempo</em> ao dono do negócio, é outra coisa: trata das perguntas que não
                exigem ninguém, e leva-te a ti o que exige.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Por isso todos os assistentes que construo têm sempre uma saída visível para falar com
                uma pessoa. Se um cliente teu quiser falar contigo, não vai ter de negociar com a máquina.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Limites */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="limites" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">O que tens de saber antes</p>
            <h2 id="limites" className="text-white">Três coisas que digo à cabeça</h2>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
                <h3 className="text-white font-heading text-[16px] font-medium">A mensalidade não é opcional</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Um assistente sem revisão degrada-se: os preços mudam, os serviços mudam, e aparecem
                  perguntas que ninguém previu. A operação mensal cobre a revisão das respostas reais, os
                  ajustes e o controlo de custos de utilização. Quem te vender isto como entrega única
                  está a vender-te um problema para daqui a seis meses.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
                <h3 className="text-white font-heading text-[16px] font-medium">Só responde ao que tu souberes explicar</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  O assistente aprende com os teus conteúdos. Se os preços, horários e condições não
                  estiverem escritos em lado nenhum, o primeiro trabalho é escrevê-los — e esse trabalho
                  costuma valer por si só, independentemente do assistente.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
                <h3 className="text-white font-heading text-[16px] font-medium">Existe financiamento, mas não trato dele</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Há linhas de apoio nacionais para projetos de adoção de IA em empresas, com taxas de
                  comparticipação relevantes. Digo-te que existem porque é informação útil, mas não faço
                  candidaturas nem garanto elegibilidade — isso é trabalho de quem faz consultoria de
                  financiamento, e devias falar com alguém dessa área.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Preço */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="preco" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Investimento</p>
            <h2 id="preco" className="text-white">Implementação, mais operação mensal</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              O valor de implementação depende dos canais e da quantidade de conteúdo a organizar.
              Fecha-se depois do diagnóstico.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES_SHORT} packages={PRICES} ctaHref={CTA} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="faq" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
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

      <RelatedServices current="assistente" />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(169,138,212,0.14), transparent 70%)' }}
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <AnimateOnScroll>
            <h2 id="cta" className="text-white">Quais são as cinco perguntas que te fazem sempre?</h2>
            <p className="mt-5 text-muted leading-relaxed">
              Se as souberes de cor, já temos metade do trabalho feito. Numa chamada de 30 minutos vemos
              quantas delas podem ser respondidas sem ti — e se compensa, ou se o teu volume ainda não justifica.
            </p>
            <div className="mt-10 flex justify-center">
              <GlowButton href={CTA} variant="solid">Pedir orçamento grátis</GlowButton>
            </div>
            <p className="mt-6 text-xs text-muted">
              Quem responde a este pedido sou eu, não um robô ·{' '}
              <Link href="/contacto" className="underline decoration-white/25 underline-offset-2 hover:decoration-accent">Ver como funciona</Link>
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}

const INCLUDES = [
  { title: 'Treinado nos teus conteúdos', desc: 'Responde a partir do que a tua empresa sabe — serviços, preços, condições — e não de conhecimento genérico.',
    icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></>) },
  { title: 'Site e WhatsApp', desc: 'Os dois canais onde as perguntas chegam de facto, com a mesma base de respostas.',
    icon: (<><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5a8.4 8.4 0 0 1-.9-3.9 8.5 8.5 0 0 1 8.5-8.5 8.4 8.4 0 0 1 8.5 8.4Z" /></>) },
  { title: 'Qualificação com as tuas regras', desc: 'Faz as perguntas de contexto que tu farias, pela ordem que faz sentido no teu negócio.',
    icon: (<><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>) },
  { title: 'Passa para humano', desc: 'Quando não sabe, ou quando o cliente pede, entrega a conversa a uma pessoa. Sem labirintos.',
    icon: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /></>) },
  { title: 'Registo e notificação', desc: 'Cada contacto fica registado com resumo, e recebes aviso quando o pedido merece a tua atenção.',
    icon: (<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>) },
  { title: 'Revisão mensal das respostas', desc: 'Leio o que o assistente respondeu de facto e corrijo o que saiu mal. É isto que impede a degradação.',
    icon: (<><path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" /></>) },
]

const INCLUDES_SHORT = INCLUDES.slice(0, 4)

const PRICES = [
  { name: 'Assistente de IA', desc: 'Implementação no site e no WhatsApp, com qualificação e registo de contactos.', price: '1.200-2.500 €', type: 'Implementação',
    priceNote: 'Sem IVA · mais 99-199 €/mês de operação e revisão',
    features: ['Assistente treinado nos teus conteúdos', 'Site e WhatsApp com a mesma base', 'Perguntas de qualificação à tua medida', 'Passagem para humano sempre visível', 'Registo de contactos e notificações', 'Painel com o histórico de conversas'], highlight: true },
]

const FAQS = [
  { q: 'Isto é um chatbot daqueles que não percebem nada?', a: 'Não é do tipo de menus fixos que obriga a escolher opções até desistires. Responde em linguagem natural a partir dos teus conteúdos e, quando não sabe, diz que não sabe e passa para uma pessoa em vez de inventar. Essa regra é o que separa uma ferramenta útil de uma que estraga a reputação.' },
  { q: 'Quanto custa?', a: 'A implementação fica entre 1.200 € e 2.500 €, conforme os canais e a quantidade de conteúdo a organizar, mais 99 € a 199 € por mês de operação e revisão. Valores sem IVA. A mensalidade não é opcional: sem revisão das respostas reais, um assistente degrada-se em poucos meses.' },
  { q: 'Porque é que a mensalidade é obrigatória?', a: 'Porque os preços mudam, os serviços mudam e aparecem perguntas que ninguém previu. A operação mensal cobre a leitura das conversas reais, a correção do que saiu mal, os ajustes e o controlo dos custos de utilização. Quem vender isto como entrega única está a vender um problema adiado.' },
  { q: 'O assistente vai afastar os meus clientes?', a: 'Não, se for bem construído. Todos os que faço têm uma saída visível para falar com uma pessoa, a qualquer momento. A automação serve para tratar do que não exige ninguém — horários, preços, disponibilidade — e para te levar já com contexto o que exige mesmo a tua atenção.' },
  { q: 'Preciso de ter tudo escrito antes?', a: 'Idealmente sim, e se não tiveres é o primeiro trabalho. O assistente só responde bem ao que a empresa sabe explicar. Escrever preços, condições e horários de forma clara costuma valer por si só, mesmo que o assistente não avançasse.' },
  { q: 'Há financiamento para isto?', a: 'Existem linhas de apoio nacionais para projetos de adoção de IA em empresas, com comparticipações relevantes. Digo-te que existem porque é informação útil, mas não trato de candidaturas nem garanto elegibilidade — para isso deves falar com quem faz consultoria de financiamento.' },
]
