import type { Metadata } from 'next'
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

const CTA = `/contacto?servico=${encodeURIComponent('Diagnóstico Digital & IA')}`

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Diagnóstico Digital e Prontidão para IA — Element Group',
  description:
    'Meia jornada a olhar para o teu negócio. No fim sabes o que corrigir, o que automatizar primeiro e quanto tempo isso te devolve. Abatido no projeto se avançares.',
  keywords: ['diagnóstico digital PME', 'auditoria digital empresa', 'prontidão para IA', 'política de uso de IA', 'automatização de processos PME', 'consultoria IA Portugal'],
  alternates: { canonical: '/servicos/diagnostico-ia' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Diagnóstico Digital e Prontidão para IA — Element Group',
    description: 'Meia jornada, um documento e um plano a 30, 60 e 90 dias. Abatido no projeto se avançares.',
    url: '/servicos/diagnostico-ia',
    locale: 'pt_PT',
    siteName: 'Element Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico Digital e Prontidão para IA — Element Group',
    description: 'Meia jornada, um documento e um plano a 30, 60 e 90 dias.',
  },
}

export default function DiagnosticoIaPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Diagnóstico Digital e Prontidão para IA',
            serviceType: 'Consultoria de diagnóstico digital e adoção de inteligência artificial',
            description:
              'Análise do website, SEO local, redes e jornada do cliente, inventário de ferramentas de IA em uso, mapa de tarefas automatizáveis, política interna de uso de IA e plano priorizado a 30, 60 e 90 dias.',
            path: '/servicos/diagnostico-ia',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Serviços', path: '/servicos' },
            { name: 'Diagnóstico Digital & IA', path: '/servicos/diagnostico-ia' },
          ]),
          faqSchema('diagnostico-ia', FAQS),
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
              Meia jornada a olhar para o teu negócio. No fim, sabes <span className="text-accent">o que automatizar primeiro</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-2xl mx-auto">
              Não é uma apresentação sobre inteligência artificial. É uma análise do que já tens, do
              tempo que se perde onde ninguém olha, e de um plano concreto por ordem de retorno — com
              um documento no fim que fica contigo, quer avancemos quer não.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href={CTA} variant="solid">Quero o diagnóstico</GlowButton>
            </div>
            <p className="mt-6 text-[12px] text-muted">
              490-890 € sem IVA · abatido na totalidade se avançares para projeto
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <PainPoints
        title={<>O problema quase nunca é falta de ferramentas. É <span className="pain-word">ninguém ter parado para olhar</span>.</>}
        intro="A maioria das empresas não precisa de mais software — precisa de saber onde está a perder tempo e dinheiro. Reconheces-te nalgum destes?"
        items={[
          { pain: 'Há tarefas que alguém faz todas as semanas, à mão, há anos, e nunca ninguém contou quanto tempo levam.', cost: 'Horas pagas a fazer o que uma máquina faria.' },
          { pain: 'Os colaboradores já usam ferramentas de IA por conta própria, sem regra nenhuma.', cost: 'Informação da empresa a sair sem controlo.' },
          { pain: 'Ouves falar de IA todos os dias e não fazes ideia do que se aplica ao teu caso.', cost: 'Paralisia — ou pior, comprar a solução errada.' },
          { pain: 'Já pediste propostas e cada fornecedor sugere uma coisa diferente.', cost: 'Decisões tomadas sem critério próprio.' },
        ]}
      />

      <ProcessBeforeAfter
        title="Um exemplo concreto, em vez de uma promessa"
        subtitle="É assim que se lê um processo antes e depois. Não é que a IA passe a fazer tudo — é que os passos mecânicos deixam de precisar de uma pessoa."
        before={[
          { label: 'Chega um pedido pelo formulário do site', detail: 'Vai para uma caixa de email, entre newsletters e faturas.' },
          { label: 'Alguém lê quando puder', detail: 'Às vezes horas depois, às vezes no dia seguinte.' },
          { label: 'Copia os dados para uma folha de cálculo', detail: 'Quando não se esquece.' },
          { label: 'Tenta perceber se é um pedido sério', detail: 'Sem critério escrito, cada pessoa decide de forma diferente.' },
          { label: 'Encaminha para quem trata do assunto', detail: 'Se souber quem é.' },
        ]}
        after={[
          { label: 'Chega um pedido pelo formulário do site', detail: 'O mesmo formulário, sem mudar nada para o cliente.' },
          { label: 'É analisado e classificado automaticamente', detail: 'Tipo de pedido, urgência e valor estimado.' },
          { label: 'Fica registado no sítio certo', detail: 'Com todos os campos preenchidos, sempre da mesma forma.' },
          { label: 'A pessoa certa é notificada', detail: 'Com o contexto já resumido, no canal que usa.' },
          { label: 'Quem decide vê tudo num painel', detail: 'E responde. A decisão continua a ser humana.' },
        ]}
        footnote="A parte que continua humana é de propósito: julgar, decidir e falar com o cliente. O que a automação tira do caminho é o copiar, o classificar e o não te esqueceres — que é onde se perde o tempo e onde se cometem os erros."
      />

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui-desktop inclui-mobile" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <IncludesGlobe
          eyebrow="O que levas"
          title="Um documento que serve mesmo que não trabalhes comigo"
          subtitle="Escrito para ficares a decidir melhor — inclusive se decidires resolver por dentro ou com outro fornecedor."
          items={INCLUDES}
        />
      </section>

      {/* Porque isto importa agora */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="contexto" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Contexto</p>
            <h2 id="contexto" className="text-white">Porque é que isto se tornou urgente</h2>
            <div className="mt-7 space-y-5 text-muted leading-relaxed">
              <p>
                Só cerca de 11,5% das empresas portuguesas usam inteligência artificial, e quase sempre
                de forma informal — sem política, sem registo, sem saber que dados saem da empresa. Ao
                mesmo tempo, os colaboradores já usam estas ferramentas por iniciativa própria, num
                fenómeno a que o MIT chama <em>shadow AI</em>: uso real, invisível para quem gere.
              </p>
              <p>
                Em paralelo, o Regulamento Europeu de IA entrou em aplicação por fases — o artigo 4.º,
                sobre literacia em IA, aplica-se desde fevereiro de 2025, e o grosso do regulamento desde
                agosto de 2026. Ter uma política escrita de uso aceitável deixou de ser um luxo de
                empresa grande.
              </p>
              <p>
                E há um dado que me parece o mais útil de todos: implementações feitas com apoio externo
                têm cerca do dobro da taxa de sucesso das feitas apenas por dentro. Não porque quem está
                dentro saiba menos, mas porque quem está dentro não tem tempo para parar e olhar.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-bg-card p-6">
              <p className="text-[13px] text-white/85 leading-relaxed">
                <strong className="font-medium text-white">Onde este serviço para.</strong> Ajudo-te a
                escrever uma política interna de uso e a mapear o que se pode automatizar. Não dou
                garantias de conformidade legal, não classifico o risco dos teus sistemas e não uso
                coimas como argumento de venda. Quando a conversa chegar ao terreno jurídico, digo-te
                que precisas de um jurista — porque precisas.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Preço */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="preco" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Investimento</p>
            <h2 id="preco" className="text-white">Pago — e devolvido se avançarmos</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Cobro o diagnóstico porque é trabalho a sério e porque uma análise gratuita acaba sempre
              por ser uma proposta comercial disfarçada. Se avançares para projeto, o valor é abatido
              na totalidade.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <PackageSelector
              includes={INCLUDES_SHORT}
              packages={PRICES}
              ctaHref={CTA}
              ctaLabel="Quero o diagnóstico"
              ctaFootnote="Chamada de 30 minutos antes, para ver se faz sentido"
            />
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

      <RelatedServices current="diagnostico" />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta" style={{ ['--accent-rgb' as string]: '169 138 212' }}>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(169,138,212,0.14), transparent 70%)' }}
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <AnimateOnScroll>
            <h2 id="cta" className="text-white">Começa por aqui, se não souberes por onde começar</h2>
            <p className="mt-5 text-muted leading-relaxed">
              É literalmente para isso que este serviço existe. Uma chamada de 30 minutos chega para eu
              perceber se o diagnóstico te serve — e para te dizer se não serve.
            </p>
            <div className="mt-10 flex justify-center">
              <GlowButton href={CTA} variant="solid">Pedir orçamento grátis</GlowButton>
            </div>
            <p className="mt-6 text-xs text-muted">Resposta em menos de 2 horas · Falas comigo, não com um comercial</p>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}

const INCLUDES = [
  { title: 'Análise do site e do SEO local', desc: 'O que está a travar o site, e como apareces no Google Maps e no Perfil de Empresa.',
    icon: (<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>) },
  { title: 'Revisão das redes e da jornada', desc: 'Como um cliente te encontra, o que vê e onde desiste antes de chegar ao contacto.',
    icon: (<><path d="M3 12h4l3 8 4-16 3 8h4" /></>) },
  { title: 'Inventário de ferramentas de IA', desc: 'O que já se usa na empresa, incluindo o que os colaboradores usam sem estar aprovado.',
    icon: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></>) },
  { title: 'Mapa de 3 a 5 tarefas automatizáveis', desc: 'Com estimativa das horas que cada uma devolve por mês. É a parte que paga o resto.',
    icon: (<><path d="M12 2v4M12 18v4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M2 12h4M18 12h4M4.9 19.1l2.9-2.9M16.2 7.8l2.9-2.9" /></>) },
  { title: 'Política interna de uso de IA', desc: 'Um documento curto e legível: o que se pode usar, com que dados, e o que nunca sai da empresa.',
    icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M9 15h6" /></>) },
  { title: 'Formação de 90 minutos', desc: 'Sessão com a equipa, com registo de participação — que é o que torna a política real.',
    icon: (<><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" /></>) },
]

const INCLUDES_SHORT = INCLUDES.slice(0, 4)

const PRICES = [
  { name: 'Diagnóstico Digital & Prontidão para IA', desc: 'Meia jornada contigo, documento final e plano priorizado a 30, 60 e 90 dias.', price: '490-890 €', type: 'Pagamento único', highlight: true, tag: 'Porta de entrada',
    priceNote: 'Sem IVA · abatido na totalidade se avançares para projeto',
    features: ['Análise do site, SEO local e redes', 'Análise da jornada do cliente', 'Inventário de ferramentas de IA em uso', 'Mapa de 3-5 tarefas automatizáveis, com horas', 'Política interna de uso aceitável de IA', 'Formação de 90 min com registo', 'Documento final e plano a 30/60/90 dias'] },
]

const FAQS = [
  { q: 'Porque é que o diagnóstico é pago?', a: 'Porque é trabalho a sério — seis a oito horas entre a sessão contigo, a análise e o documento — e porque uma análise gratuita acaba sempre por ser uma proposta comercial disfarçada. Sendo pago, posso dizer-te que não precisas de gastar dinheiro comigo. Se avançares para projeto, o valor é abatido na totalidade.' },
  { q: 'O que levo no fim, exatamente?', a: 'Um documento com a análise do site, do SEO local, das redes e da jornada do cliente; o inventário das ferramentas de IA já em uso; um mapa de três a cinco tarefas automatizáveis com estimativa de horas poupadas por mês; uma política interna de uso aceitável de IA; e um plano priorizado a 30, 60 e 90 dias. Mais a sessão de formação de 90 minutos com a equipa.' },
  { q: 'Sou obrigado a contratar-vos depois?', a: 'Não. O documento é teu e serve na mesma se decidires resolver por dentro ou com outro fornecedor. Escrevo-o com essa hipótese em mente — se ficasse dependente de eu executar, não seria um diagnóstico, seria um orçamento.' },
  { q: 'A minha empresa é pequena. Isto aplica-se?', a: 'Aplica-se sobretudo a empresas pequenas, porque são as que menos tempo têm para parar e olhar. O que muda com a dimensão é o número de processos analisados, não o método. Numa chamada de 30 minutos digo-te se faz sentido no teu caso.' },
  { q: 'Vocês tratam da conformidade legal com o Regulamento de IA?', a: 'Não, e é importante ser claro: ajudo a escrever uma política interna de uso aceitável e a organizar o que a empresa faz, mas não dou garantias de conformidade legal, não classifico o risco de sistemas e não uso coimas como argumento. Quando a conversa chega ao terreno jurídico, encaminho para um jurista.' },
  { q: 'E se eu não estiver interessado na parte de IA?', a: 'Também funciona. Boa parte do valor está no mapa de tarefas automatizáveis e nas horas que devolve, que se justifica por poupança de tempo sem precisar de falar de regulamentação nenhuma. Diz-me isso na chamada e ajustamos o âmbito.' },
]
