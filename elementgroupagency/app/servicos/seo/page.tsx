import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
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

const CTA = `/contacto?servico=${encodeURIComponent('SEO & Otimização')}`

export const metadata: Metadata = {
  title: 'Serviços de SEO e Otimização Google — Element Group',
  description:
    'SEO para PMEs em Portugal: SEO técnico, SEO local (Top 3 no Google Maps) e conteúdo otimizado para apareceres quando procuram o teu serviço. Em média, 3,2× mais tráfego orgânico. Diagnóstico gratuito.',
  alternates: { canonical: '/servicos/seo' },
}

// Acento da categoria SEO: verde-eucalipto (crescimento / tráfego a subir).
const ACCENT_SEO = {
  '--accent-rgb': '111 179 154',
  '--accent': '#6FB39A',
  '--accent-deep': '#2f6b58',
  '--accent-mid': '#4f8f7a',
  '--accent-light': '#bfe6d8',
} as CSSProperties

export default function SeoPage() {
  return (
    <main style={ACCENT_SEO}>
      <JsonLd
        data={[
          serviceSchema({
            name: 'SEO e Otimização para o Google',
            serviceType: 'Otimização para motores de busca (SEO)',
            description:
              'Serviços de SEO para PMEs em Portugal: SEO técnico, SEO local (Top 3 no Google Maps) e conteúdo otimizado para aparecer no Google.',
            path: '/servicos/seo',
          }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: 'SEO & Otimização', path: '/servicos/seo' },
          ]),
        ]}
      />
      {/* 1 · Hero */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6">
        <div
          aria-hidden
          className="absolute top-10 right-0 w-[640px] h-[640px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 30%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }}
        />

        <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateOnScroll direction="left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent/90 mb-5">Categoria 02 · Visibilidade &amp; SEO</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">
              SEO que transforma pesquisas no Google <span className="text-accent">em clientes</span>.
            </h1>
            <p className="mt-7 text-muted leading-relaxed max-w-xl">
              Otimização para motores de busca para PMEs em Portugal que querem ser encontradas —
              SEO técnico, SEO local (Top 3 no Google Maps) e conteúdo que posiciona. Em média,
              os meus projetos geram 3,2× mais tráfego orgânico.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <GlowButton href={CTA}>Quero aparecer no Google</GlowButton>
              <Link href="/portfolio" className="group inline-flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors">
                Ver portefólio
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Visual — Google search mockup */}
          <AnimateOnScroll direction="right">
            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-[#16191f] via-[#121317] to-[#0d0e11] p-6 md:p-8 min-h-[340px] flex items-center justify-center overflow-hidden">
              <div aria-hidden className="absolute -top-16 left-1/4 w-72 h-72 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }} />
              <div className="relative w-full max-w-sm flex flex-col gap-2.5" aria-hidden>
                <div className="flex items-center gap-2 h-9 rounded-full bg-white/[0.06] border border-white/10 px-3.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="text-dark"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  <div className="h-2 w-1/2 rounded bg-white/20" />
                </div>
                <div className="rounded-lg border border-accent/30 bg-accent/[0.06] p-3 shadow-[0_0_30px_-8px_rgb(var(--accent-rgb)_/_0.5)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-medium text-black bg-accent rounded px-1.5 py-0.5">#1</span>
                    <div className="h-2 w-20 rounded bg-[var(--accent)]/70" />
                  </div>
                  <div className="h-2.5 w-3/4 rounded bg-white/30 mb-1.5" />
                  <div className="h-1.5 w-full rounded bg-white/10" />
                </div>
                {[0, 1].map((r) => (
                  <div key={r} className="px-3 opacity-50">
                    <div className="h-2 w-16 rounded bg-white/15 mb-1.5" />
                    <div className="h-2 w-2/3 rounded bg-white/10" />
                  </div>
                ))}
              </div>
              <div className="absolute top-6 right-6 flex items-center gap-1.5 rounded-full border border-white/10 bg-bg-card/90 backdrop-blur px-3 py-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-accent"><path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="12" cy="10" r="2.2" fill="currentColor" /></svg>
                <span className="text-[11px] text-white font-medium">Top 3 · Google Maps</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 2 · Problema / dor */}
      <PainPoints
        title={<>Se não apareces no Google, é <span className="pain-word">como se não existisses</span>.</>}
        intro="Todos os dias há pessoas a procurar exatamente o que ofereces. A questão é simples: encontram-te a ti, ou ao teu concorrente?"
        items={[
          { pain: 'Pesquisas o teu serviço no Google e quem aparece é a concorrência — não tu.', cost: 'Quem procura hoje, compra hoje — a outro.' },
          { pain: 'Tens um bom site, mas quase só te encontra quem já te conhece.', cost: 'O melhor site do mundo não vende se ninguém o vê.' },
          { pain: 'Pagas anúncios para teres visitas, mas mal paras, o telefone deixa de tocar.', cost: 'Paras de pagar, paras de existir.' },
          { pain: 'No Google Maps apareces lá em baixo — e quem procura perto escolhe outro.', cost: 'O cliente estava à porta — e entrou na concorrência.' },
        ]}
      />

      {/* 3 · O que inclui */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="inclui">
        <IncludesGlobe
          items={INCLUDES}
          eyebrow="O que está incluído"
          title="SEO completo — técnico, local e de conteúdo"
          subtitle="Não há truques nem atalhos. Há trabalho sério, nas três frentes que fazem subir no Google."
        />
      </section>

      {/* 4 · Para quem é (e não é) */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="paraquem">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">É para ti?</p>
            <h2 id="paraquem" className="text-white">SEO compensa — mas não para toda a gente</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              Prefiro ser honesto à cabeça: o SEO dá frutos a quem tem paciência e visão a médio prazo.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-5">
            <AnimateOnScroll direction="left">
              <div className="glow-card h-full">
                <span aria-hidden className="glow-card__wave" />
                <span aria-hidden className="glow-card__ring" />
                <div className="glow-card__content h-full p-7">
                <p className="flex items-center gap-2 text-sm font-medium text-white mb-5">
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-gradient-to-br from-accent to-[var(--accent-mid)] text-black" aria-hidden>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-10" /></svg>
                  </span>
                  É para ti se…
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Tens um site (ou vais ter) e queres que ele traga clientes do Google.',
                    'Tens um negócio local e queres aparecer no Maps de quem procura perto.',
                    'Queres deixar de depender só de anúncios pagos.',
                    'Pensas a médio prazo — sabes que o melhor investimento compõe.',
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
                    'Queres o primeiro lugar “para amanhã” — quem promete isso está a mentir.',
                    'Não tens (nem queres) um site minimamente decente para otimizar.',
                    'Só procuras resultados imediatos de curtíssimo prazo (aí, anúncios fazem mais sentido).',
                    'És uma grande marca com equipa de SEO interna.',
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

      {/* 5 · Como funciona */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="processo">
        <ProcessTimeline
          steps={STEPS}
          eyebrow="Como funciona"
          title="Do diagnóstico ao topo do Google"
          subtitle="SEO não é magia — é método. Sabes sempre em que pé estás e para onde vamos."
        />
      </section>

      {/* 6 · Resultados / caso prático */}
      <section className="bg-bg border-t border-white/10 py-24" aria-labelledby="resultados">
        <ResultsFlow
          eyebrow="Resultados"
          title="O que podes esperar"
          subtitle="Resultados médios dos meus projetos de SEO — sem inflar nada."
          before={[
            { label: 'Sem tráfego vindo do Google', icon: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path d="M3 3l18 18" /></>) },
            { label: 'Atrás da concorrência', icon: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /></>) },
            { label: 'Longe do Top do Maps', icon: (<><path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>) },
          ]}
          engineChips={['Auditoria', 'Otimização', 'Conteúdo']}
          results={[
            { metric: '3,2×', label: 'Mais tráfego orgânico' },
            { metric: 'Top 3', label: 'no Google Maps (SEO local)' },
            { metric: '1ª página', label: 'nas pesquisas que interessam' },
          ]}
        />
      </section>

      {/* 7 · Preço / investimento — tabela real */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="preco">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Investimento</p>
            <h2 id="preco" className="text-white">Preços claros, sem surpresas</h2>
            <p className="mt-5 text-muted max-w-xl mx-auto leading-relaxed">
              O SEO é um investimento que compõe: o trabalho de hoje continua a trazer clientes amanhã.
              Preço fixo à cabeça — escolhe o ponto de partida.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <PackageSelector includes={INCLUDES} packages={PRICES} ctaHref={CTA} ctaLabel="Pedir diagnóstico grátis" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 8 · FAQ específico */}
      <section className="bg-bg border-t border-white/10 py-24 px-6" aria-labelledby="faq">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
        <div className="max-w-[820px] mx-auto">
          <AnimateOnScroll className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">FAQ</p>
            <h2 id="faq" className="text-white">Perguntas frequentes sobre SEO</h2>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <FaqAccordion items={SEO_FAQS} />
          </AnimateOnScroll>
        </div>
      </section>

      {/* 9 · CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg to-[#08090b] border-t border-white/10 py-28 px-6" aria-labelledby="cta">
        <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[760px] h-[420px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 100%, rgb(var(--accent-rgb) / 0.20), transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-5">O próximo passo</p>
            <h2 id="cta" className="text-white">Pronto para apareceres quando procuram por ti?</h2>
            <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
              Pede um diagnóstico SEO gratuito — digo-te onde estás e o que muda. Respondo
              pessoalmente em menos de 2 horas, sem compromisso.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <GlowButton href={CTA}>Quero aparecer no Google</GlowButton>
              <Link href="mailto:info@elementgroup.pt" className="text-sm text-white/70 hover:text-white transition-colors">
                ou escreve-me para <span className="text-white/90 underline underline-offset-4">info@elementgroup.pt</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
      <RelatedServices current="seo" />
    </main>
  )
}

// Componentes do serviço de SEO (feature → benefício).
const INCLUDES = [
  { title: 'Auditoria SEO',            desc: 'Análise completa do teu site e da concorrência para saber o que travar e o que melhorar.',          icon: (<><path d="M3 17l6-6 4 4 7-7" /><path d="M16 7h5v5" /></>) },
  { title: 'SEO técnico',              desc: 'Velocidade, estrutura e código limpos — para o Google gostar do teu site e mostrá-lo.',           icon: (<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 2.6 7" /></>) },
  { title: 'SEO local (Google Maps)',  desc: 'Otimizo o teu perfil de empresa para apareceres no Top 3 do Maps de quem procura perto.',         icon: (<><path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>) },
  { title: 'Pesquisa de palavras-chave', desc: 'Descubro exatamente o que os teus clientes pesquisam — e otimizo para esses termos.',           icon: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></>) },
  { title: 'Conteúdo otimizado',       desc: 'Textos e páginas escritos para posicionar no Google e converter quem chega ao site.',             icon: (<><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h5" /></>) },
  { title: 'Relatórios mensais',       desc: 'Vês o progresso todos os meses: posições, tráfego e contactos gerados. Zero achismos.',           icon: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>) },
]

// Processo de SEO. (metric = facto real, sem inventar números)
const STEPS = [
  { card: 'Auditoria', tagline: 'Analiso site, concorrência e o que procuram.',
    title: 'Auditoria & objetivos', desc: 'Analiso o teu site, a concorrência e o que os teus clientes procuram. Definimos metas claras.',
    metric: 'Grátis', metricLabel: 'diagnóstico inicial', icon: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></>) },
  { card: 'Estratégia', tagline: 'Plano de termos, páginas e prazos.',
    title: 'Estratégia & palavras-chave', desc: 'Recebes um plano: que termos atacar, que páginas criar ou otimizar e que prazos esperar.',
    metric: 'Plano', metricLabel: 'termos + páginas + prazos', icon: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>) },
  { card: 'Técnico', tagline: 'Site e perfil no Google Maps otimizados.',
    title: 'Otimização técnica & local', desc: 'Trato da parte técnica do site e do teu perfil no Google Maps (SEO local).',
    metric: 'Top 3', metricLabel: 'objetivo no Google Maps', icon: (<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 2.6 7" /></>) },
  { card: 'Conteúdo', tagline: 'Conteúdo que posiciona e converte.',
    title: 'Conteúdo & posicionamento', desc: 'Criamos e otimizamos conteúdo para subires nas pesquisas que trazem clientes.',
    metric: '3,2×', metricLabel: 'tráfego médio (projetos SEO)', icon: (<><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h5" /></>) },
  { card: 'Relatórios', tagline: 'Monitorizo e ajusto todos os meses.',
    title: 'Acompanhamento & relatórios', desc: 'Monitorizo posições e tráfego e ajusto todos os meses. Vês sempre o progresso.',
    metric: 'Mensal', metricLabel: 'relatórios transparentes', icon: (<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>) },
]

// Preços reais (one-off / projeto / add-on).
const PRICES = [
  { name: 'Setup Google + Perfis', desc: 'Google Business Profile + Instagram/Facebook criados e otimizados.',  price: '297€',       type: 'Pagamento único', highlight: true,
    features: ['Google Business Profile otimizado', 'Instagram + Facebook configurados', 'Categorias, fotos e contactos', 'Base pronta para SEO local'] },
  { name: 'Setup SEO Técnico',     desc: 'Auditoria, correções on-page e indexação para arrancar bem no Google.', price: '390€',       type: 'Pagamento único',
    features: ['Auditoria SEO completa', 'Correções on-page', 'Indexação no Google', 'Estrutura e velocidade otimizadas'] },
  { name: 'Copywriting',           desc: 'Textos de venda para páginas, campanhas ou perfis.',                    price: 'desde 190€', type: 'Por projeto',
    features: ['Textos de venda à medida', 'Otimizados para SEO', 'Para páginas, campanhas ou perfis', 'Na linguagem do teu cliente'] },
  { name: 'SEO para IAs (GEO)',    desc: 'Otimização para apareceres no Google AI, ChatGPT e Perplexity.',        price: '290€',       type: 'Add-on', tag: 'Diferenciador',
    features: ['Otimização para o Google AI', 'Apareces no ChatGPT e Perplexity', 'Conteúdo pronto para IAs', 'Vantagem face à concorrência'] },
]

// Objeções específicas de SEO.
const SEO_FAQS = [
  { q: 'Em quanto tempo vejo resultados?', a: 'O SEO não é instantâneo: os primeiros sinais costumam aparecer em 2 a 3 meses e compõem a partir daí. Quem promete o 1.º lugar em dias, está a enganar-te.' },
  { q: 'Garantes o primeiro lugar no Google?', a: 'Não — e desconfia de quem garante. Ninguém controla o Google. O que garanto é trabalho sério, transparente e medível, com relatórios mensais.' },
  { q: 'Funciona para o meu setor e zona?', a: 'O SEO local funciona muito bem para negócios que servem uma zona. Em setores muito competitivos ajusto a estratégia e digo-te, à cabeça, o que é realista.' },
  { q: 'Preciso de ter um site?', a: 'Sim — o SEO trabalha sobre o teu site. Se não tiveres um bom site, trato disso primeiro ou em conjunto.' },
  { q: 'E se eu parar o SEO?', a: 'Ao contrário dos anúncios, os resultados não desaparecem de um dia para o outro. Mas o SEO precisa de manutenção para se manter e continuar a crescer.' },
  { q: 'Como começo?', a: 'Pedes um diagnóstico gratuito. Analiso a tua situação e respondo em menos de 2 horas, sem compromisso.' },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SEO_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
