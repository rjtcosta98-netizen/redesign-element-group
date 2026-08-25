'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ALL_SERVICES, PLANS_LINK } from '@/lib/servicos'

// Barra de secções das páginas de serviço.
//
// Cada página de serviço tem entre 10.000 e 13.000 píxeis, e o preço — que é a
// primeira pergunta de quem chega — vive a 8.300 px do topo, sem nenhuma forma
// de lá saltar. Também não havia caminho de volta ao catálogo: quem entrasse
// por pesquisa numa destas páginas só tinha o menu.
//
// Fica montada depois de {children} no layout: em dev, um client component
// entre <Nav /> e {children} rebenta a hidratação do Next 14. Como é fixed, a
// ordem no DOM não muda nada do que se vê.
//
// A barra monta-se sozinha a partir do DOM: lê as <section> da página, traduz o
// id para um rótulo curto e ignora o que não reconhece. Não é preciso tocar em
// nenhuma das dez páginas para as cobrir, nem manter uma lista paralela — o
// problema que a lib/servicos.ts já resolveu para o catálogo.

/** id da secção (primeiro token do aria-labelledby) → rótulo curto na barra. */
const LABELS: Record<string, string> = {
  problema: 'O problema',
  contexto: 'Contexto',
  promessa: 'A promessa',
  inclui: 'O que inclui',
  paraquem: 'Para quem',
  processo: 'Processo',
  resultados: 'Resultados',
  provas: 'Provas',
  prova: 'Provas',
  caso: 'Caso real',
  calculadora: 'Calculadora',
  comparacao: 'Comparação',
  geo: 'GEO',
  limites: 'Limites',
  limite: 'Limites',
  regras: 'Regras',
  preco: 'Preços',
  precoh: 'Preços',
  faq: 'Perguntas',
}

type Item = { id: string; label: string; top: number }

export default function ServiceSubNav() {
  const pathname = usePathname()
  const [items, setItems] = useState<Item[]>([])
  const [active, setActive] = useState<string>('')
  const [visible, setVisible] = useState(false)
  const itemsRef = useRef<Item[]>([])

  const isServicePage = Boolean(pathname) && pathname !== '/servicos' && pathname!.startsWith('/servicos/')

  // O serviço a que esta página corresponde — dá o nome e o preço na barra.
  const service =
    ALL_SERVICES.find((s) => s.href === pathname) ??
    (pathname === PLANS_LINK.href ? PLANS_LINK : undefined)

  const measure = useCallback(() => {
    const found: Item[] = []
    document.querySelectorAll<HTMLElement>('main section').forEach((sec) => {
      const raw = sec.id || sec.getAttribute('aria-labelledby')?.split(' ')[0] || ''
      const key = raw.replace(/-(desktop|mobile)$/, '')
      const label = LABELS[key]
      if (!label || found.some((f) => f.label === label)) return
      // A âncora precisa de id próprio e de folga para o header fixo + esta barra.
      if (!sec.id) sec.id = `sec-${key}`
      sec.style.scrollMarginTop = '150px'
      found.push({ id: sec.id, label, top: sec.getBoundingClientRect().top + window.scrollY })
    })
    // Teto de sete âncoras: a de reservas tem nove secções reconhecidas e a barra
    // passava a precisar de scroll horizontal em portátil. Preços e Perguntas
    // ficam sempre — são as duas que as pessoas procuram —; o resto entra por
    // ordem de página até encher.
    const MAX = 7
    let final = found
    if (found.length > MAX) {
      const must = found.filter((f) => f.label === 'Preços' || f.label === 'Perguntas')
      const rest = found.filter((f) => !must.includes(f)).slice(0, MAX - must.length)
      final = [...rest, ...must].sort((a, b) => a.top - b.top)
    }

    itemsRef.current = final
    setItems(final)
  }, [])

  useEffect(() => {
    if (!isServicePage) {
      setItems([])
      setVisible(false)
      return
    }

    // As secções entram com animação de scroll; medir tarde evita apanhar
    // posições de elementos ainda por revelar.
    const t = window.setTimeout(measure, 300)
    window.addEventListener('resize', measure)

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        setVisible(y > 520)
        const marker = y + 180
        let current = ''
        for (const it of itemsRef.current) {
          if (it.top <= marker) current = it.id
        }
        setActive(current)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isServicePage, pathname, measure])

  // Uma barra com uma âncora só não é navegação, é ruído.
  if (!isServicePage || items.length < 2) return null

  return (
    <div
      className={`fixed top-20 inset-x-0 z-40 border-b border-white/[0.07] bg-bg/90 backdrop-blur-xl
                  transition-all duration-300 motion-reduce:transition-none
                  ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-12 flex items-center gap-3 sm:gap-5">
        {/* Volta ao catálogo — quem entra por pesquisa não tinha caminho de regresso. */}
        <Link
          href="/servicos"
          className="group hidden lg:inline-flex items-center gap-1.5 shrink-0 text-[12px] text-dark transition-colors hover:text-white"
        >
          <span className="transition-transform group-hover:-translate-x-0.5" aria-hidden>←</span>
          Serviços
        </Link>
        {service && (
          <span className="hidden lg:block shrink-0 text-[12px] text-white/80 border-l border-white/10 pl-5">
            {service.label}
          </span>
        )}

        <nav aria-label="Secções desta página" className="flex-1 min-w-0">
          <ul role="list" className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {items.map((it) => (
              <li key={it.id} className="shrink-0">
                <a
                  href={`#${it.id}`}
                  aria-current={active === it.id ? 'true' : undefined}
                  className={`block rounded-pill px-3 py-1.5 text-[12px] transition-colors ${
                    active === it.id ? 'bg-white/[0.08] text-white' : 'text-muted hover:text-white'
                  }`}
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {service?.price && (
          <span className="hidden md:block shrink-0 text-[12px] text-muted tabular-nums">{service.price}</span>
        )}
        {/* Em telemóvel o CTA vive na barra inferior fixa; aqui só ocuparia
            espaço às âncoras, que é o que falta nesse tamanho. */}
        <Link
          href="/contacto"
          className="shrink-0 hidden sm:inline-flex items-center rounded-pill bg-white px-4 py-1.5 text-[12px] font-medium text-black
                     transition-all hover:bg-white/90 hover:-translate-y-px"
        >
          Pedir orçamento
        </Link>
      </div>
    </div>
  )
}
