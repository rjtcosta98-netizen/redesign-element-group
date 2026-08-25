import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import { FAMILIES, PLANS_LINK, familyOf, type Service } from '@/lib/servicos'

// A chave do serviço em lib/servicos.ts, ou 'plans' para a página de planos,
// que não pertence a nenhuma família.
type Key = string

type Card = { key: string; label: string; sub: string; href: string; rgb: string }

const HUB_CARD: Card = {
  key: 'hub',
  label: 'Todos os serviços',
  sub: 'O catálogo completo, numa página',
  href: '/servicos',
  rgb: '127 168 217',
}

const PLANS_CARD: Card = { ...PLANS_LINK, rgb: '215 176 116' }

const toCard = (s: Service, rgb: string): Card => ({ key: s.key, label: s.label, sub: s.sub, href: s.href, rgb })

// Escolhe até três destinos: primeiro os irmãos da mesma família (o passo mais
// natural para quem está a ler esta página), depois os planos, e por fim o hub.
// Antes, este componente tinha a sua própria lista de quatro serviços e mostrava
// sempre os outros três — o que deixa de funcionar assim que o catálogo cresce.
function related(current: Key): Card[] {
  const cards: Card[] = []

  if (current === 'plans') {
    // Na página de planos não há irmãos: mostra-se uma porta de cada família.
    for (const family of FAMILIES) {
      const first = family.services.find((s) => s.status === 'live')
      if (first) cards.push(toCard(first, family.rgb))
    }
    return [...cards.slice(0, 2), HUB_CARD]
  }

  const family = familyOf(current)
  if (family) {
    for (const s of family.services) {
      if (s.key !== current && s.status === 'live') cards.push(toCard(s, family.rgb))
    }
  }

  cards.push(PLANS_CARD, HUB_CARD)
  return cards.slice(0, 3)
}

// Liga cada página de serviço às restantes — reforça o internal linking e
// mantém o utilizador a explorar a oferta.
export default function RelatedServices({ current }: { current: Key }) {
  const others = related(current)

  return (
    <section className="bg-bg border-t border-white/10 py-20 px-6" aria-labelledby="outros-servicos">
      <div className="max-w-[1100px] mx-auto">
        <AnimateOnScroll>
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-3">Explora mais</p>
          <h2 id="outros-servicos" className="text-white">Outros serviços</h2>
        </AnimateOnScroll>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {others.map((s, i) => (
            <AnimateOnScroll key={s.href} delay={i * 0.08}>
              <Link
                href={s.href}
                style={{ ['--accent-rgb' as string]: s.rgb }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-card p-6 h-full
                           transition-colors duration-300 hover:border-[rgb(var(--accent-rgb)/0.5)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(120% 100% at 85% 0%, rgb(var(--accent-rgb) / 0.16), transparent 58%)' }}
                />
                <span className="relative flex items-center justify-between">
                  <span
                    className="block w-3 h-3 rounded-[3px] rotate-45 shadow-[0_0_12px_rgb(var(--accent-rgb)/0.7)]"
                    style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--accent) 55%, var(--accent-deep))' }}
                  />
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" className="text-muted transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="relative block mt-6 font-heading font-medium text-white text-[18px]">{s.label}</span>
                <span className="relative block text-[13px] text-muted mt-1">{s.sub}</span>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
