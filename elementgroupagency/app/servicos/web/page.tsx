import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PackageSelector from '@/components/servicos/PackageSelector'
import PainPoints from '@/components/servicos/PainPoints'
import IncludesGlobe from '@/components/servicos/IncludesGlobe'
import ProcessTimeline from '@/components/servicos/ProcessTimeline'
import ResultsFlow from '@/components/servicos/ResultsFlow'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema } from '@/lib/seo'
import RelatedServices from '@/components/servicos/RelatedServices'

const CTA = `/contacto?servico=${encodeURIComponent('Websites & Lojas Online')}`

export const metadata: Metadata = {
  title: 'Criação de Websites e Lojas Online — Element Group',
  description:
    'Sites institucionais e lojas online (e-commerce) à medida do teu negócio — ultra-rápidos (PageSpeed 95+), responsivos e otimizados para SEO e conversão. Do design ao alojamento, tratamos de tudo. A partir de 297€.',
  alternates: { canonical: '/servicos/web' },
}

export default function WebsitesPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Criação de Websites e Lojas Online',
            serviceType: 'Criação de websites e lojas online',
            description:
              'Criação de sites institucionais e lojas online (e-commerce) à medida para PMEs em Portugal — rápidos, responsivos e otimizados para SEO e conversão.',
            path: '/servicos/web',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Websites & Lojas Online', path: '/servicos/web' },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6">
        <div
          aria-hidden
          className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgba(127,168,217,0.16), transparent 60%)' }}
        />

        <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <AnimateOnScroll direction="left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">Categoria 01 · Websites &amp; Lojas Online</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              Criação de sites que transformam <span className="text-accent">visitantes em clientes</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-xl">
              Sites e lojas online à medida para PMEs em Portugal que querem ser levadas a sério —
              ultra-rápidos (PageSpeed 95+), bonitos e pensados para vender. Do design ao alojamento,
              trato de tudo.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <GlowButton href={CTA}>Quero o meu website</GlowButton>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors"
              >
                Ver portefólio
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Visual — browser mockup + PageSpeed badge */}
          <AnimateOnScroll direction="right">
            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-[#16191f] via-[#121317] to-[#0d0e11] p-6 md:p-8 min-h-[340px] flex items-center justify-center overflow-hidden">
              <div
                aria-hidden
                className="absolute -top-16 left-1/4 w-72 h-72 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.16), transparent 60%)' }}
              />
              {/* Browser window */}
              <div className="relative w-full max-w-sm rounded-xl border border-white/10 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.5)] overflow-hidden" aria-hidden>
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/10 bg-white/[0.03]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                  <div className="ml-2 flex-1 h-5 rounded-full bg-white/[0.06] flex items-center px-2.5 text-[10px] text-dark">
                    elementgroup.pt
                  </div>
                </div>
                <div className="p-4 space-y-2.5">
                  <div className="h-2.5 w-2/3 rounded bg-white/20" />
                  <div className="h-2 w-2/5 rounded bg-white/10" />
                  <div className="mt-3 h-20 rounded-lg border border-accent/25 bg-gradient-to-br from-accent/25 to-[#4f7fb8]/5" />
                  <div className="flex gap-2 pt-1">
                    <div className="h-10 flex-1 rounded-md bg-white/[0.05]" />
                    <div className="h-10 flex-1 rounded-md bg-white/[0.05]" />
                    <div className="h-10 flex-1 rounded-md bg-white/[0.05]" />
                  </div>
                </div>
              </div>
              {/* PageSpeed badge */}
              <div className="absolute bottom-6 right-6 rounded-xl border border-white/10 bg-bg-card/90 backdrop-blur p-3 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
                <p className="text-[10px] text-muted">PageSpeed</p>
                <div className="flex items-end gap-1.5">
                  <span className="text-3xl font-heading font-medium text-white leading-none">98</span>
                  <span className="text-[10px] text-accent mb-0.5">/ 100</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* O problema / dor — make the reader recognise themselves */}
      <PainPoints
        title={<>O teu site pode estar a <span className="pain-word">afastar clientes</span> — sem dares por isso.</>}
        intro="A maioria das PMEs não perde clientes por falta de qualidade, mas porque online não mostra o valor que tem. Reconheces-te nalgum destes?"
        items={[
          { pain: 'Tens um negócio de confiança, mas o site não passa essa imagem — ou nem tens site.', cost: 'Quem te procura escolhe quem parece mais profissional.' },
          { pain: 'É lento ou parece mal no telemóvel, e as pessoas saem antes de ver o que ofereces.', cost: 'Cada segundo a carregar é um cliente que desiste.' },
          { pain: 'Quando procuram o teu serviço no Google, aparecem os concorrentes — não tu.', cost: 'O cliente já era teu — e foi parar à concorrência.' },
          { pain: 'Já pediste orçamento a uma agência e o preço (e a distância) assustaram-te.', cost: 'E o site que te traz clientes continua por fazer.' },
        ]}
      />

      {/* O que está incluído — feature → benefit */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui">
        <IncludesGlobe
          items={INCLUDES}
          eyebrow="O que está incluído"
          title="Tudo o que a criação do teu website inclui"
          subtitle="Sem extras escondidos. Cada website nasce completo, rápido e pronto para vender."
        />
      </section>

      {/* Para quem é (e para quem não é) — qualify */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="paraquem">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">É para ti?</p>
            <h2 id="paraquem" className="text-white">Feito para quem quer crescer — não para todos</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Prefiro ser honesto à cabeça: este serviço encaixa nuns negócios e noutros não.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-5">
            <AnimateOnScroll direction="left">
              <div className="glow-card h-full">
                <span aria-hidden className="glow-card__wave" />
                <span aria-hidden className="glow-card__ring" />
                <div className="glow-card__content h-full p-7">
                <p className="flex items-center gap-2 text-sm font-medium text-white mb-5">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-gradient-to-br from-accent to-[#4f7fb8] text-black" aria-hidden>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                  </span>
                  É para ti se…
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Tens uma PME ou negócio local e queres uma presença online profissional.',
                    'Queres um site que traga clientes — não só “estar online”.',
                    'Valorizas falar diretamente com quem faz, sem intermediários.',
                    'Queres preço justo e fixo, sem surpresas.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                      <span className="text-accent mt-0.5" aria-hidden>✓</span>{t}
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div className="h-full rounded-[22px] border border-white/10 bg-bg-card p-7">
                <p className="flex items-center gap-2 text-sm font-medium text-white/80 mb-5">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-white/[0.06] text-white/40" aria-hidden>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </span>
                  Não é para ti se…
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Procuras só o mais barato, custe o que custar à qualidade.',
                    'És uma grande marca/multinacional com equipas internas enormes.',
                    'És um restaurante — sinceramente, não é a minha área.',
                    'Não queres envolver-te nem dar feedback ao longo do projeto.',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-muted/80 leading-relaxed">
                      <span className="text-white/30 mt-0.5" aria-hidden>✗</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Como funciona / processo */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="processo">
        <ProcessTimeline
          steps={STEPS}
          eyebrow="Como funciona"
          title="Do primeiro “olá” ao site no ar"
          subtitle="Um processo simples e sem incerteza — sabes sempre o que vem a seguir."
        />
      </section>

      {/* Resultados — transformação: antes → Element Group → resultados reais */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="resultados">
        <ResultsFlow
          eyebrow="Resultados"
          title="O que podes esperar"
          subtitle="O que fica garantido em cada site que entrego — sem inflar nada."
          before={[
            { label: 'Site lento e desatualizado', icon: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>) },
            { label: 'Mau aspeto no telemóvel', icon: (<><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>) },
            { label: 'Poucos pedidos de contacto', icon: (<><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9Z" /></>) },
          ]}
          engineChips={['Design', 'Velocidade', 'Conversão']}
          results={[
            { metric: '95+', label: 'PageSpeed médio' },
            { metric: '100%', label: 'Responsivo · telemóvel, tablet e PC' },
            { metric: 'Incluído', label: 'SEO técnico + domínio e alojamento' },
          ]}
        />
      </section>

      {/* Preço / investimento — tabela real */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="preco">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Investimento</p>
            <h2 id="preco" className="text-white">Preços claros, sem surpresas</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Preço fixo à cabeça. Escolhe o ponto de partida — afinamos ao teu projeto na proposta.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES} packages={PRICES} ctaHref={CTA} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ específico do serviço */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="faq">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
        <div className="max-w-[820px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">FAQ</p>
            <h2 id="faq" className="text-white">Perguntas frequentes sobre websites</h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <FaqAccordion items={WEB_FAQS} />
          </AnimateOnScroll>
        </div>
      </section>

      <RelatedServices current="web" />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta">
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[760px] h-[420px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 100%, rgba(127,168,217,0.20), transparent 70%)' }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">O próximo passo</p>
            <h2 id="cta" className="text-white">Pronto para um website que trabalha por ti?</h2>
            <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
              Conta-me o que precisas — respondo pessoalmente em menos de 2 horas, sem compromisso.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <GlowButton href={CTA}>Quero o meu website</GlowButton>
              <Link href="mailto:info@elementgroup.pt" className="text-sm text-white/70 hover:text-white transition-colors">
                ou escreve-me para <span className="text-white/90 underline underline-offset-4">info@elementgroup.pt</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}

// Processo do projeto, do primeiro contacto à entrega. (metric = facto real, sem inventar números)
const STEPS = [
  { card: 'Conversa', tagline: 'Falamos do teu negócio e objetivos — sem compromisso.',
    title: 'Conversa & briefing', desc: 'Falamos sobre o teu negócio, objetivos e o que precisas. Sem compromisso.',
    metric: '< 2h', metricLabel: 'tempo de resposta', icon: (<><path d="M21 11.5a8 8 0 0 1-11.5 7.2L4 20l1.3-5.4A8 8 0 1 1 21 11.5Z" /></>) },
  { card: 'Proposta', tagline: 'Um plano claro: páginas, prazos e preço fixo.',
    title: 'Proposta & plano', desc: 'Recebes um plano claro: páginas, prazos e preço fixo. Só avançamos depois de aprovares.',
    metric: 'Preço fixo', metricLabel: 'à cabeça, sem surpresas', icon: (<><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4" /><path d="M9 13h6M9 17h4" /></>) },
  { card: 'Design', tagline: 'Desenho à medida e mostro-te antes de avançar.',
    title: 'Design à medida', desc: 'Crio o design do teu site e mostro-te. Ajustamos até estares mesmo feliz.',
    metric: '0', metricLabel: 'templates — tudo à medida', icon: (<><path d="m15 5 4 4" /><path d="M3 21v-3L14 7l3 3L6 21H3Z" /></>) },
  { card: 'Construção', tagline: 'Rápido, responsivo e otimizado para SEO.',
    title: 'Desenvolvimento', desc: 'Construo o site rápido, responsivo e otimizado para SEO, com o conteúdo no sítio.',
    metric: '95+', metricLabel: 'PageSpeed garantido', icon: (<><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" /></>) },
  { card: 'Lançamento', tagline: 'Online, testado e com apoio contínuo.',
    title: 'Lançamento & apoio', desc: 'Pomos online e testado. Domínio e alojamento tratados — e fico disponível para o que precisares.',
    metric: 'Incluído', metricLabel: 'domínio + alojamento', icon: (<><path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14.5 4.5C17 2 21 2 21 2s0 4-2.5 6.5L12 15l-3-3 5.5-7.5Z" /><circle cx="15" cy="9" r="1" /></>) },
]

// Preços reais (one-off). Loja online sob consulta.
const PRICES = [
  { name: 'Landing Page',         desc: 'Página única focada em converter visitantes — copy, CTA e formulário/WhatsApp.', price: '297€',         type: 'Pagamento único',
    features: ['1 página pensada para converter', 'Copy + CTA + formulário/WhatsApp', 'Design à medida e responsivo', 'PageSpeed 95+ e SEO base'] },
  { name: 'Website Essencial',    desc: 'Site de 3 a 5 páginas, design à medida, responsivo e otimizado.',                price: '790€',         type: 'Pagamento único', highlight: true,
    features: ['3 a 5 páginas à medida', 'Design exclusivo, sem templates', 'SEO técnico incluído', 'Domínio + alojamento tratados'] },
  { name: 'Website Profissional', desc: 'Até 8 páginas, com mais personalização e secções avançadas.',                   price: '1.290€',       type: 'Pagamento único',
    features: ['Até 8 páginas à medida', 'Secções avançadas e personalização', 'SEO técnico + conteúdo otimizado', 'Domínio + alojamento tratados'] },
  { name: 'Redesign de Site',     desc: 'Reformulação de um site existente — visual, conteúdo e performance.',            price: 'desde 590€',   type: 'Pagamento único',
    features: ['Reformulação visual completa', 'Mais velocidade (PageSpeed 95+)', 'Estrutura e conteúdo otimizados', 'Migração sem perder o SEO'] },
  { name: 'Loja Online',          desc: 'E-commerce completo, à medida do teu negócio.',                                 price: 'desde 1.500€', type: 'Sob consulta',
    features: ['E-commerce à medida', 'Carrinho + checkout simples', 'Gestão de produtos e stock', 'Sem comissões de marketplace'] },
]

// Objeções específicas deste serviço.
const WEB_FAQS = [
  { q: 'Quanto tempo demora a ter o site pronto?', a: 'Depende da dimensão: um site institucional fica normalmente pronto mais depressa do que uma loja online. Indico um prazo concreto na proposta — e cumpro-o.' },
  { q: 'O site fica meu?', a: 'Sim. O site e o domínio são teus, no teu nome, sem ficares preso a mim.' },
  { q: 'E a manutenção e o alojamento?', a: 'Trato do domínio e do alojamento por ti e deixo o site a funcionar. Para evoluções contínuas (alterações, SEO, conteúdo) há planos mensais — mas sem obrigação.' },
  { q: 'Tenho de escrever os textos?', a: 'Não precisas. Ajudo-te com os textos e o conteúdo, escritos para SEO e para converter — só validas.' },
  { q: 'Já tenho um site. Aproveitas ou fazes de novo?', a: 'Depende do que tens. Posso fazer um redesign (a partir de 590€) ou criar um novo de raiz — digo-te com honestidade o que faz mais sentido para os teus objetivos e orçamento.' },
  { q: 'Como começo?', a: 'Pedes um orçamento no formulário (2 minutos). Respondo em menos de 2 horas, sem compromisso.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: WEB_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

// Feature → benefit. Só inclusões reais do serviço.
const INCLUDES = [
  { title: 'Design à medida',          desc: 'Nada de templates. Um site feito de raiz, com a identidade do teu negócio.',          icon: (<><path d="m15 5 4 4" /><path d="M3 21v-3L14 7l3 3L6 21H3Z" /></>) },
  { title: 'Ultra-rápido',             desc: 'PageSpeed 95+. Sites lentos perdem clientes; o teu carrega num instante.',          icon: (<><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" /></>) },
  { title: '100% responsivo',          desc: 'Perfeito no telemóvel, tablet e computador — onde os teus clientes estão.',          icon: (<><rect x="2" y="4" width="14" height="11" rx="2" /><rect x="17" y="8" width="5" height="12" rx="1.5" /></>) },
  { title: 'SEO técnico incluído',     desc: 'Nasce pronto para o Google: estrutura, velocidade e tags no sítio certo.',          icon: (<><path d="M3 17l6-6 4 4 7-7" /><path d="M16 7h5v5" /></>) },
  { title: 'Loja online (e-commerce)', desc: 'Vende 24/7, com carrinho e checkout simples — sem comissões de marketplace.',        icon: (<><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.5h11L21 7H6.5" /></>) },
  { title: 'Domínio + alojamento',     desc: 'Trato de tudo: domínio, alojamento e manutenção. Não mexes em nada técnico.',       icon: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></>) },
]
