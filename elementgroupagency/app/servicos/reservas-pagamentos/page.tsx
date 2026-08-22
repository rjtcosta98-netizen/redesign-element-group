import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import GlowButton from '@/components/ui/GlowButton'
import FaqAccordion from '@/components/ui/FaqAccordion'
import PackageSelector from '@/components/servicos/PackageSelector'
import PainPoints from '@/components/servicos/PainPoints'
import IncludesGlobe from '@/components/servicos/IncludesGlobe'
import ProcessTimeline from '@/components/servicos/ProcessTimeline'
import OtaCommissionCalculator from '@/components/servicos/OtaCommissionCalculator'
import RelatedServices from '@/components/servicos/RelatedServices'
import JsonLd from '@/components/JsonLd'
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/seo'

const CTA = `/contacto?servico=${encodeURIComponent('Reservas & Pagamentos')}`

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Motor de Reservas e Pagamentos para o teu site — Element Group',
  description:
    'Deixa de pagar 10-25% de comissão em cada reserva. Motor de marcações, checkout Stripe e painel de gestão instalados no site que já tens.',
  keywords: ['motor de reservas website', 'sistema de marcações online', 'checkout Stripe Portugal', 'reservas diretas sem comissão', 'alternativa Booking.com', 'software de reservas PME'],
  alternates: { canonical: '/servicos/reservas-pagamentos' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Motor de Reservas e Pagamentos — Element Group',
    description: 'Deixa de pagar comissão em cada reserva. Marcações, pagamentos e painel no site que já tens.',
    url: '/servicos/reservas-pagamentos',
    locale: 'pt_PT',
    siteName: 'Element Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motor de Reservas e Pagamentos — Element Group',
    description: 'Deixa de pagar comissão em cada reserva. Marcações, pagamentos e painel no site que já tens.',
  },
}

export default function ReservasPagamentosPage() {
  return (
    <main>
      <JsonLd
        data={[
          serviceSchema({
            name: 'Motor de Reservas e Pagamentos',
            serviceType: 'Desenvolvimento de sistema de reservas e pagamentos online',
            description:
              'Instalação de motor de marcações com agenda em base de dados, checkout Stripe e painel de gestão sobre um website existente, para negócios reduzirem comissões de plataformas.',
            path: '/servicos/reservas-pagamentos',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'Serviços', path: '/servicos' },
            { name: 'Reservas & Pagamentos', path: '/servicos/reservas-pagamentos' },
          ]),
          faqSchema('reservas-pagamentos', FAQS),
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
              Deixa de pagar <span className="text-accent">25% de comissão</span> em cada reserva.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-2xl mx-auto">
              Um motor de marcações e pagamentos instalado no site que já tens. O cliente marca e paga
              diretamente contigo — e a comissão que ias entregar à plataforma fica no teu bolso.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton href={CTA}>Quero receber reservas diretas</GlowButton>
              <Link href="/portfolio/100-montanhas" className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors">
                Ver um caso a funcionar
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* A aritmética — é isto que vende a página, por isso vem antes de tudo o resto */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="calculadora">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Faz a conta</p>
            <h2 id="calculadora" className="text-white">Quanto é que as plataformas te levam por ano?</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Mexe nos teus números. Não é uma projeção de marketing — é uma divisão que podes confirmar
              no teu extrato antes sequer de falares comigo.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <OtaCommissionCalculator ctaHref={CTA} />
          </AnimateOnScroll>
        </div>
      </section>

      <PainPoints
        title={<>Estás a pagar duas vezes pelo <span className="pain-word">mesmo cliente</span>.</>}
        intro="A comissão sobre um cliente novo é um custo de aquisição. A comissão sobre um cliente que já te conhece é só desperdício. Reconheces-te nalgum destes?"
        items={[
          { pain: 'O cliente que já te visitou volta a marcar pela plataforma, porque é o único sítio onde sabe fazê-lo.', cost: 'Pagas comissão sobre alguém que já era teu.' },
          { pain: 'As marcações chegam por telefone, mensagem e email, e alguém tem de as passar a limpo para uma agenda.', cost: 'Horas por semana e o risco de marcações duplicadas.' },
          { pain: 'Não há sinal nem pagamento antecipado, e há sempre quem não apareça.', cost: 'Lugares vazios que já não se vendem.' },
          { pain: 'Não sabes ao certo quanto pagaste de comissão no ano passado.', cost: 'Um custo grande que nunca é discutido porque nunca é somado.' },
        ]}
      />

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui-desktop inclui-mobile">
        <IncludesGlobe
          eyebrow="O que fica a funcionar"
          title="Software, não um formulário de contacto"
          subtitle="Um formulário envia um email. Isto gere disponibilidade, cobra e confirma — sozinho, enquanto dormes."
          items={INCLUDES}
        />
      </section>

      {/* Para quem é — horizontal por setor, e a página deve dizê-lo */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="paraquem">
        <div className="max-w-[900px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Para quem é</p>
            <h2 id="paraquem" className="text-white">Qualquer negócio com marcação ou pagamento antecipado</h2>
            <p className="mt-5 text-muted leading-relaxed">
              O motor é o mesmo; muda a linguagem e as regras de disponibilidade. Se recebes marcações,
              isto aplica-se a ti.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="flex flex-wrap justify-center gap-2.5">
              {SECTORS.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-white/85">
                  {s}
                </span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="processo-desktop processo-mobile">
        <ProcessTimeline
          eyebrow="Como funciona"
          title="Do primeiro esboço ao primeiro pagamento recebido"
          subtitle="Sem desligar o site que já tens. O motor entra por cima, testado antes de ficar visível."
          steps={STEPS}
        />
      </section>

      {/* Prova */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="prova">
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">A prova</p>
            <h2 id="prova" className="text-white">Isto já está em produção</h2>
            <p className="mt-5 text-muted leading-relaxed">
              A 100 Montanhas tem exatamente este sistema a funcionar: checkout Stripe com edge functions,
              regras de acesso à base de dados provadas, agenda com estados, painel de gestão e oito provas
              ponta-a-ponta antes de ir para o ar. Não é uma demonstração — é um negócio a receber reservas.
            </p>
            <div className="mt-8">
              <Link href="/portfolio/100-montanhas" className="group inline-flex items-center gap-1.5 text-sm text-white hover:text-accent transition-colors">
                Ver o caso completo
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Limites — dizer isto é sinal de competência, não fraqueza */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="limites">
        <div className="max-w-[880px] mx-auto">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">O que tens de saber antes</p>
            <h2 id="limites" className="text-white">Duas coisas que digo sempre à cabeça</h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
                <h3 className="text-white font-heading text-[17px] font-medium">Pagamentos são responsabilidade a sério</h3>
                <p className="mt-2.5 text-sm text-muted leading-relaxed">
                  Quando um checkout falha, não é um incómodo — é uma venda perdida naquele minuto. Por
                  isso o suporte tem um horário definido e um prazo de resposta escrito, em vez de uma
                  promessa vaga de disponibilidade permanente que eu não conseguiria cumprir sozinho.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
                <h3 className="text-white font-heading text-[17px] font-medium">Sem tráfego, o motor fica vazio</h3>
                <p className="mt-2.5 text-sm text-muted leading-relaxed">
                  Um sistema de reservas não gera procura: converte a procura que já existe. Se ninguém
                  chega ao teu site, as reservas continuam a vir da plataforma. Por isso isto vende-se
                  sempre com trabalho de <Link href="/servicos/seo" className="text-white underline decoration-white/25 underline-offset-2 hover:decoration-accent">SEO</Link> e de{' '}
                  <Link href="/servicos/visibilidade-ia" className="text-white underline decoration-white/25 underline-offset-2 hover:decoration-accent">visibilidade em IA</Link> —
                  e se me pedires só o motor, digo-te isto antes de aceitar.
                </p>
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
            <h2 id="preco" className="text-white">Um custo único, contra uma comissão para sempre</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              O valor exato depende das regras de disponibilidade e das integrações que precisares.
              Fecha-se depois do diagnóstico e a partir daí não muda.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES_SHORT} packages={PRICES} ctaHref={CTA} />
          </AnimateOnScroll>
          <p className="mt-8 text-center text-[11px] text-dark">
            Proponho sempre um plano mensal no fecho: o motor precisa de operação e suporte, e isso não se improvisa.
          </p>
        </div>
      </section>

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

      <RelatedServices current="reservas" />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta">
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-80 pointer-events-none"
          style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(127,168,217,0.14), transparent 70%)' }}
        />
        <div className="relative max-w-[720px] mx-auto text-center">
          <AnimateOnScroll>
            <h2 id="cta" className="text-white">Quanto pagaste de comissão no ano passado?</h2>
            <p className="mt-5 text-muted leading-relaxed">
              Se não souberes de cabeça, vale a pena somar. Numa chamada de 30 minutos vemos os teus
              números e digo-te com honestidade se este sistema compensa — ou se, no teu volume, ainda não.
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

const SECTORS = [
  'Alojamento local', 'Turismo e atividades', 'Clínicas', 'Estética e bem-estar',
  'Ginásios e estúdios', 'Formação', 'Restauração com reserva', 'Aluguer de equipamento',
]

const INCLUDES = [
  { title: 'Agenda em base de dados', desc: 'Disponibilidade real, com regras de horário, duração e capacidade. Sem folhas de cálculo.',
    icon: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>) },
  { title: 'Checkout Stripe', desc: 'Sinal ou pagamento integral, com cartão e métodos locais. O dinheiro entra na tua conta.',
    icon: (<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>) },
  { title: 'Painel de gestão', desc: 'Vês, alteras e cancelas marcações. Feito para quem gere o negócio, não para programadores.',
    icon: (<><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>) },
  { title: 'Confirmações automáticas', desc: 'O cliente recebe confirmação e lembrete. Tu recebes a notificação. Ninguém tem de escrever nada.',
    icon: (<><path d="M4 4h16v12H5.2L4 17.5V4Z" /><path d="m8 9 2.5 2.5L16 6" /></>) },
  { title: 'Regras de acesso', desc: 'Cada utilizador vê apenas o que lhe compete, com as regras aplicadas na própria base de dados.',
    icon: (<><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>) },
  { title: 'Provas ponta-a-ponta', desc: 'O fluxo de pagamento é testado do início ao fim antes de ficar visível para clientes.',
    icon: (<><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>) },
]

// Versão curta para a coluna esquerda do seletor de preço.
const INCLUDES_SHORT = INCLUDES.slice(0, 4)

const STEPS = [
  { card: 'Números', tagline: 'Vemos se compensa antes de avançar.',
    title: 'A conta primeiro', desc: 'Vemos quanto pagas de comissão e quanto podes recuperar. Se a conta não fechar, digo-te — e não avançamos.',
    metric: '30 min', metricLabel: 'chamada gratuita', icon: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>) },
  { card: 'Regras', tagline: 'Como funciona a tua disponibilidade.',
    title: 'Mapear as regras', desc: 'Horários, durações, capacidade, épocas, sinal ou pagamento total. É aqui que se evita um sistema que não serve o teu negócio.',
    metric: '1 sessão', metricLabel: 'a definir regras', icon: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>) },
  { card: 'Construção', tagline: 'O motor entra por cima do site atual.',
    title: 'Instalação sem parar nada', desc: 'O site continua no ar enquanto o motor é construído e testado em paralelo, num ambiente separado.',
    metric: '0', metricLabel: 'tempo de site em baixo', icon: (<><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" /></>) },
  { card: 'Provas', tagline: 'Pagamentos testados a sério.',
    title: 'Provas ponta-a-ponta', desc: 'Reserva, pagamento, confirmação, cancelamento e reembolso — testados antes de qualquer cliente tocar no sistema.',
    metric: '8', metricLabel: 'provas na 100 Montanhas', icon: (<><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>) },
  { card: 'Arranque', tagline: 'Ficas a saber usar o painel.',
    title: 'Formação e arranque', desc: 'Mostro-te o painel, deixo-te mexer, e fico disponível nas primeiras semanas — que são as que interessam.',
    metric: 'Contigo', metricLabel: 'nas primeiras semanas', icon: (<><path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14.5 4.5C17 2 21 2 21 2s0 4-2.5 6.5L12 15l-3-3 5.5-7.5Z" /><circle cx="15" cy="9" r="1" /></>) },
]

const PRICES = [
  { name: 'Motor de Reservas e Pagamentos', desc: 'Instalado sobre o site que já tens, com agenda, checkout e painel.', price: '2.500-4.500 €', type: 'Pagamento único', highlight: true,
    features: ['Agenda em base de dados com regras reais', 'Checkout Stripe — sinal ou pagamento integral', 'Painel de gestão para ti e para a equipa', 'Confirmações e lembretes automáticos', 'Regras de acesso aplicadas na base de dados', 'Provas ponta-a-ponta antes do arranque'] },
]

const FAQS = [
  { q: 'Tenho de mudar de site?', a: 'Não. O motor instala-se sobre o site que já tens — é precisamente para isso que este serviço existe. Se o site atual estiver muito lento ou desatualizado, digo-te, mas não é obrigatório refazê-lo para teres reservas diretas.' },
  { q: 'Vou deixar de usar o Booking e as outras plataformas?', a: 'Provavelmente não, e não é esse o objetivo. As plataformas continuam a ser um bom canal para te descobrirem. O que muda é o cliente que já te conhece passar a marcar diretamente contigo, sem comissão pelo meio. A conta da calculadora acima assume que recuperas 30% das reservas, não todas.' },
  { q: 'Quanto tempo demora a ter isto a funcionar?', a: 'No primeiro cliente de um setor conta com 25 a 40 horas de trabalho; a partir do terceiro desce para 8 a 15, porque reutilizo as funções de pagamento, o esquema de dados e as regras de acesso. Indico um prazo concreto na proposta, depois de mapear as tuas regras de disponibilidade.' },
  { q: 'E se o pagamento falhar a um cliente?', a: 'Falhas de checkout são urgentes e trato-as como tal, dentro de um horário de suporte definido por escrito. Prefiro comprometer-me com um prazo que cumpro do que prometer disponibilidade permanente que, trabalhando sozinho, não conseguiria garantir.' },
  { q: 'O dinheiro passa por ti?', a: 'Não. O checkout é Stripe e a conta é tua — o dinheiro vai diretamente para ti, e as taxas de processamento são as do Stripe, não minhas. Eu construo e opero o sistema; não fico entre ti e o teu cliente.' },
  { q: 'Quanto custa manter isto a funcionar?', a: 'A operação e o suporte do motor fazem parte do plano Sistema (649 € por mês). Se não quiseres plano, existe o módulo avulso de operação do motor, entre 149 € e 249 € por mês. Valores sem IVA.' },
]
