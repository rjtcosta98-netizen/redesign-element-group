import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PackageSelector from '@/components/servicos/PackageSelector'
import PainPoints from '@/components/servicos/PainPoints'
import IncludesGlobe from '@/components/servicos/IncludesGlobe'
import ProcessTimeline from '@/components/servicos/ProcessTimeline'
import CorporateBlock from '@/components/servicos/CorporateBlock'
import RelatedServices from '@/components/servicos/RelatedServices'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'

const CTA = `/contacto?servico=${encodeURIComponent('Software à Medida')}`

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Software e Painéis à Medida — Element Group',
  description:
    'Área de cliente, painel de gestão, aplicação web operacional. Base de dados, autenticação e manutenção — o que a IA generativa não replica.',
  keywords: ['software à medida Portugal', 'aplicação web empresa', 'painel de gestão personalizado', 'área de cliente', 'desenvolvimento web à medida', 'integração de ferramentas internas'],
  alternates: { canonical: '/servicos/software' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Software e Painéis à Medida — Element Group',
    description: 'Área de cliente, painel de gestão, aplicação web operacional. Construído para durar e ser mantido.',
    url: '/servicos/software',
    locale: 'pt_PT',
    siteName: 'Element Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software e Painéis à Medida — Element Group',
    description: 'Área de cliente, painel de gestão, aplicação web operacional.',
  },
}

export default function SoftwarePage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Software e Painéis à Medida',
            serviceType: 'Desenvolvimento de software e aplicações web à medida',
            description:
              'Desenvolvimento de áreas de cliente, painéis de gestão e aplicações web operacionais, com base de dados, autenticação, regras de acesso e manutenção continuada.',
            path: '/servicos/software',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Serviços', path: '/servicos' },
            { name: 'Software à Medida', path: '/servicos/software' },
          ]),
          faqSchema('software', FAQS),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6">
        <div
          aria-hidden
          className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(127,168,217,0.16), transparent 60%)' }}
        />
        <div className="relative max-w-[880px] mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">Web &amp; Software</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Quando a folha de Excel <span className="text-accent">já não chega</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-2xl mx-auto">
              Chega um ponto em que o negócio está a ser gerido por ficheiros partilhados, mensagens e
              memória de quem lá trabalha há mais tempo. É aí que uma aplicação feita à medida deixa de
              ser um luxo e passa a ser mais barata do que o caos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href={CTA}>Falar sobre o meu caso</GlowButton>
              <Link href="/portfolio/adsr-cup-app" className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors">
                Ver uma aplicação entregue
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <PainPoints
        title={<>O negócio cresceu e as ferramentas <span className="pain-word">ficaram para trás</span>.</>}
        intro="Não é falta de organização — é que folhas de cálculo não foram feitas para isto. Reconheces-te nalgum destes?"
        items={[
          { pain: 'A informação está espalhada por folhas de cálculo, mensagens e a cabeça de duas pessoas.', cost: 'Se essas pessoas faltam, o trabalho para.' },
          { pain: 'Ninguém sabe qual é a versão certa do ficheiro.', cost: 'Decisões tomadas sobre dados errados.' },
          { pain: 'Há trabalho que existe só para copiar dados de um sítio para outro.', cost: 'Horas pagas a mover informação, não a produzir.' },
          { pain: 'As ferramentas que compraste não falam umas com as outras.', cost: 'Pagas várias subscrições e continuas a fazer à mão.' },
        ]}
      />

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui-desktop inclui-mobile">
        <IncludesGlobe
          eyebrow="O que se constrói"
          title="Aplicações que aguentam uso real"
          subtitle="A diferença entre um protótipo e software é o que acontece no segundo ano: dados que crescem, pessoas que mudam, regras que se alteram."
          items={INCLUDES}
        />
      </section>

      {/* Porque não é substituível por IA generativa */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="porque-nao-ia">
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Porque é que isto continua a exigir alguém</p>
            <h2 id="porque-nao-ia" className="text-white">Gerar um ecrã é fácil. Manter um sistema é outra coisa.</h2>
            <div className="mt-7 space-y-5 text-muted leading-relaxed">
              <p>
                Hoje qualquer pessoa consegue gerar uma interface bonita em minutos. O que continua
                difícil — e é onde os projetos falham — é tudo o que está por baixo: modelar os dados
                para o negócio real, decidir quem pode ver e alterar o quê, tratar os estados
                intermédios, garantir que dois utilizadores em simultâneo não se atropelam, e manter
                isso a funcionar quando as regras mudarem daqui a um ano.
              </p>
              <p>
                Uso ferramentas de IA todos os dias no meu trabalho, e são a razão de conseguir entregar
                sozinho o que antes exigia uma equipa. Mas o que te entrego não é o que a ferramenta
                escreveu — é o que foi pensado, testado e assumido por alguém que responde por isso.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="processo-desktop processo-mobile">
        <ProcessTimeline
          eyebrow="Como funciona"
          title="Por fases, com aprovação em cada uma"
          subtitle="Nunca desapareço três meses para reaparecer com uma surpresa. Vês o sistema a crescer e podes corrigir o rumo cedo."
          steps={STEPS}
        />
      </section>

      {/* Provas */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="provas">
        <div className="max-w-[1000px] mx-auto">
          <AnimateOnScroll className="mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Já entregue</p>
            <h2 id="provas" className="text-white">Duas aplicações em uso</h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-4">
            {CASES.map((c, i) => (
              <AnimateOnScroll key={c.href} delay={i * 0.08}>
                <Link
                  href={c.href}
                  className="group flex flex-col h-full rounded-2xl border border-white/10 bg-bg-card p-7 transition-colors hover:border-accent/40"
                >
                  <h3 className="text-white font-heading text-lg font-medium tracking-[-0.01em]">{c.title}</h3>
                  <p className="mt-3 text-[13px] text-muted leading-relaxed">{c.desc}</p>
                  <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] text-white/85 group-hover:text-accent transition-colors">
                    Ver o caso
                    <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                  </span>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Regras de aceitação — publicá-las filtra o cliente errado antes da chamada */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="regras">
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <div className="rounded-[24px] border border-white/10 bg-bg-card p-7 sm:p-9">
              <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Como aceito estes projetos</p>
              <h2 id="regras" className="text-white font-heading text-2xl font-medium tracking-[-0.01em]">
                Duas regras que digo antes de falarmos de preço
              </h2>

              <div className="mt-7 space-y-6">
                <div>
                  <h3 className="text-white font-heading text-[16px] font-medium">Um projeto de cada vez</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Um sistema deste tipo ocupa seis a oito semanas de trabalho concentrado. Aceitar dois
                    em simultâneo significaria atrasar os dois e fazer pior os dois. Se estiver ocupado,
                    digo-te quando fico livre — ou digo-te que não é comigo.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-heading text-[16px] font-medium">40% adiantado, sem exceção</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    Reservo semanas de agenda e recuso outro trabalho para as ocupar. O adiantamento é o
                    que torna esse compromisso simétrico — protege-te a ti de eu desaparecer, e a mim de
                    ficar com o trimestre vazio.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Preço */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="preco">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Investimento</p>
            <h2 id="preco" className="text-white">O intervalo é largo porque os projetos são diferentes</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Uma área de cliente simples e um sistema operacional com várias funções não são o mesmo
              trabalho. O valor fecha-se depois de mapearmos o âmbito, e a partir daí não muda.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES_SHORT} packages={PRICES} ctaHref={CTA} />
          </AnimateOnScroll>
          <p className="mt-8 text-center text-[11px] text-dark">
            Software precisa de manutenção. Fecha sempre com plano Sistema (649 €/mês) ou com o módulo de manutenção (249-449 €/mês).
          </p>
        </div>
      </section>

      <CorporateBlock
        rules={[
          'Um projeto de cada vez — se estiver ocupado, digo-te quando fico livre.',
          '40% adiantado à adjudicação, com o restante faseado pelas entregas.',
          'Âmbito escrito e aprovado antes de escrever a primeira linha de código.',
          'Código e dados são teus, com acesso ao repositório desde o primeiro dia.',
        ]}
      />

      {/* FAQ */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="faq">
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

      <RelatedServices current="software" />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(127,168,217,0.14), transparent 70%)' }}
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <AnimateOnScroll>
            <h2 id="cta" className="text-white">Descreve-me o processo que te dá mais trabalho</h2>
            <p className="mt-5 text-muted leading-relaxed">
              Numa chamada de 30 minutos percebo se isto se resolve com software à medida, com uma
              automação simples, ou apenas arrumando o que já tens. As três respostas acontecem — e a
              última é gratuita.
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

const CASES = [
  { title: 'AD São Romão — resultados ao vivo', href: '/portfolio/adsr-cup-app',
    desc: 'Aplicação web de resultados em direto para um torneio: jogos, equipas, classificações e atualização em tempo real durante a competição.' },
  { title: '100 Montanhas — painel de gestão', href: '/portfolio/100-montanhas',
    desc: 'Painel de administração com agenda em base de dados, gestão de reservas e pagamentos, regras de acesso e provas ponta-a-ponta.' },
]

const INCLUDES = [
  { title: 'Base de dados modelada', desc: 'A estrutura pensada para o teu negócio real, não um molde genérico com campos a mais.',
    icon: (<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" /><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" /></>) },
  { title: 'Autenticação e permissões', desc: 'Cada pessoa vê e altera apenas o que lhe compete, com as regras aplicadas na base de dados.',
    icon: (<><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>) },
  { title: 'Painel para quem gere', desc: 'Interface feita para o dia a dia de quem usa, não para impressionar numa demonstração.',
    icon: (<><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>) },
  { title: 'Integrações', desc: 'Ligação às ferramentas que já usas, para a informação deixar de ser copiada à mão.',
    icon: (<><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.8 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>) },
  { title: 'Estados e histórico', desc: 'Saber em que ponto está cada coisa e o que aconteceu antes. É o que folhas de cálculo nunca dão.',
    icon: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>) },
  { title: 'Manutenção continuada', desc: 'Correções, evolução e suporte. Software sem manutenção degrada-se até deixar de ser usado.',
    icon: (<><path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 1 5.4-5.4l-2.5 2.5-1.4-1.4Z" /></>) },
]

const INCLUDES_SHORT = INCLUDES.slice(0, 4)

const STEPS = [
  { card: 'Âmbito', tagline: 'Escrito antes de começar.',
    title: 'Mapear e escrever o âmbito', desc: 'Que processos entram, que dados existem, quem usa e o que fica de fora. O que fica de fora é tão importante como o resto.',
    metric: 'Escrito', metricLabel: 'aprovado antes de codificar', icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /></>) },
  { card: 'Dados', tagline: 'A fundação que sustenta o resto.',
    title: 'Modelo de dados e acessos', desc: 'A estrutura e as regras de quem vê o quê. É a parte invisível que determina se o sistema aguenta o segundo ano.',
    metric: 'Base', metricLabel: 'antes de qualquer ecrã', icon: (<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" /></>) },
  { card: 'Fases', tagline: 'Entregas a sério, não demonstrações.',
    title: 'Construção por fases', desc: 'Cada fase entrega algo utilizável e é aprovada por ti antes da seguinte. Corriges o rumo cedo, não no fim.',
    metric: '6-8', metricLabel: 'semanas típicas', icon: (<><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" /></>) },
  { card: 'Testes', tagline: 'Com dados reais, não fictícios.',
    title: 'Testes com o teu caso', desc: 'Testamos com informação verdadeira e com quem vai usar. É aí que aparecem as regras que ninguém se lembrou de dizer.',
    metric: 'Real', metricLabel: 'dados e utilizadores', icon: (<><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>) },
  { card: 'Manutenção', tagline: 'O sistema continua vivo.',
    title: 'Arranque e manutenção', desc: 'Formação de quem usa, acompanhamento nas primeiras semanas e um plano de manutenção — porque as regras mudam.',
    metric: 'Contínua', metricLabel: 'correções e evolução', icon: (<><path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 1 5.4-5.4l-2.5 2.5-1.4-1.4Z" /></>) },
]

const PRICES = [
  { name: 'Software à Medida', desc: 'Área de cliente, painel de gestão ou aplicação web operacional.', price: '4.000-12.000 €', type: 'Pagamento faseado', highlight: true,
    features: ['Âmbito escrito e aprovado à cabeça', 'Base de dados modelada para o teu negócio', 'Autenticação e regras de acesso', 'Painel de gestão para uso diário', 'Integrações com as ferramentas que já usas', 'Testes com dados e utilizadores reais', 'Código e dados são teus'] },
]

const FAQS = [
  { q: 'Quanto custa uma aplicação à medida?', a: 'Entre 4.000 € e 12.000 €, sem IVA, conforme o âmbito. Uma área de cliente simples fica na base do intervalo; um sistema operacional com várias funções e integrações fica no topo. O mercado português vai bem acima disto para projetos maiores — este é o escalão realista para o que entrego sozinho, com qualidade.' },
  { q: 'Quanto tempo demora?', a: 'Tipicamente seis a oito semanas de trabalho concentrado, equivalentes a 60 a 120 horas. Trabalho num projeto destes de cada vez, precisamente para o prazo ser real. Se estiver com outro em curso, digo-te quando fico livre em vez de aceitar e atrasar.' },
  { q: 'Porque é que pedem 40% adiantado?', a: 'Porque reservo semanas inteiras de agenda e recuso outro trabalho para as ocupar. O adiantamento torna o compromisso simétrico: garante-te que o tempo está reservado para ti, e garante-me que não fico com um trimestre vazio se o projeto for cancelado a meio.' },
  { q: 'O código fica meu?', a: 'Sim. O código e os dados são teus, e tens acesso ao repositório desde o primeiro dia — não só no fim. Se um dia quiseres continuar com outra pessoa, levas tudo contigo. Não construo dependências artificiais.' },
  { q: 'E se eu precisar de mudar coisas depois?', a: 'É o normal, e é para isso que existe manutenção. Correções, evolução e suporte fazem parte do plano Sistema (649 € por mês) ou do módulo de manutenção de software (249-449 € por mês), conforme leves plano ou não. Software sem manutenção degrada-se até deixar de ser usado.' },
  { q: 'Trabalham com empresas fora da região?', a: 'Sim, e uma parte do trabalho já é assim. O processo é o mesmo: âmbito escrito, um interlocutor único, entregas por fases com aprovação, reuniões por videochamada e faturação regularizada. A distância não muda nada de essencial num projeto de software.' },
]
