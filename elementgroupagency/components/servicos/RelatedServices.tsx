import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

type Key = 'web' | 'seo' | 'social' | 'plans'

const ALL: Record<Key, { label: string; sub: string; href: string; rgb: string }> = {
  web:    { label: 'Websites & Lojas Online', sub: 'Sites e lojas que convertem',     href: '/servicos/web',            rgb: '127 168 217' },
  seo:    { label: 'SEO & Otimização',        sub: 'Aparecer no Google',              href: '/servicos/seo',            rgb: '111 179 154' },
  social: { label: 'Gestão de Redes Sociais', sub: 'Conteúdo e campanhas',            href: '/servicos/social',         rgb: '169 138 212' },
  plans:  { label: 'Planos Mensais',          sub: 'Manutenção e crescimento',        href: '/servicos/planos-mensais', rgb: '215 176 116' },
}

const ORDER: Key[] = ['web', 'seo', 'social', 'plans']

// Liga cada página de serviço às restantes — reforça o internal linking e
// mantém o utilizador a explorar a oferta.
export default function RelatedServices({ current }: { current: Key }) {
  const others = ORDER.filter((k) => k !== current).map((k) => ALL[k])

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
