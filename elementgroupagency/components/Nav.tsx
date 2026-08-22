'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FAMILIES, PLANS_LINK } from '@/lib/servicos'

// O catálogo vem de lib/servicos.ts. Antes desta versão estava declarado aqui e
// outra vez em RelatedServices.tsx, em listas paralelas que divergiam.
// Só entram no menu os serviços com página publicada — os restantes aparecem
// no hub /servicos como "brevemente", sem ligação, para não gerar 404.
const MENU_FAMILIES = FAMILIES.map((f) => ({
  ...f,
  services: f.services.filter((s) => s.status === 'live'),
})).filter((f) => f.services.length > 0)

const NAV_LINKS = [
  { label: 'Sobre',      href: '/sobre' },
  { label: 'Portefólio', href: '/portfolio' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Recursos',   href: '/recursos' },
  { label: 'Parcerias',  href: '/parcerias' },
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/elementgrouppt', path: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.95-11.4a1.58 1.58 0 1 0 1.57 1.57 1.58 1.58 0 0 0-1.57-1.57Z' },
  { label: 'Facebook',  href: 'https://www.facebook.com/elementgroupdigital/', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z' },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@elementgroup.pt', path: 'M16.6 5.82a4.78 4.78 0 0 1-1.04-.65 4.7 4.7 0 0 1-1.7-3.17h-3.02v12.97a2.66 2.66 0 0 1-2.66 2.55 2.66 2.66 0 0 1-1.2-5.03 2.66 2.66 0 0 1 1.95-.18v-3.05a5.71 5.71 0 0 0-4.9 1.55 5.71 5.71 0 0 0 3.96 9.78 5.71 5.71 0 0 0 5.86-5.71V8.9a7.68 7.68 0 0 0 4.5 1.44V7.32a4.6 4.6 0 0 1-1.71-.5Z' },
]

const linkCls =
  'text-sm text-white/90 transition-colors duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] hover:text-white'

const EASE = 'cubic-bezier(0.44,0,0.56,1)'

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Lock scroll + close on Escape while the overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  // Stagger helper — incremental entrance delay while the overlay opens
  const enter = (i: number) => ({
    transitionDelay: open ? `${110 + i * 50}ms` : '0ms',
    transitionTimingFunction: EASE,
  })

  // Índice linear para o stagger do overlay, que atravessa famílias e serviços.
  let row = 0

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-bg/70 to-transparent backdrop-blur-[2px]">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2" aria-label="Element Group — início" onClick={close}>
          <Image src="/web-app-manifest-512x512.png" alt="Element Group" width={32} height={32} className="w-8 h-8" priority />
          <span className="font-heading text-[19px] font-semibold leading-none tracking-[-0.03em] text-white">
            Element<span className="font-normal text-white/55"> Group</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {/* Serviços — mega-menu por famílias */}
          <div className="relative group">
            <Link href="/servicos" className={`flex items-center gap-1 ${linkCls}`}>
              Serviços
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="mt-px opacity-70">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1
                            transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                            group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0">
              <div className="bg-bg-card border border-white/10 rounded-2xl w-[min(90vw,720px)] p-5 shadow-[0_28px_60px_rgba(0,0,0,0.6)]">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-6">
                  {MENU_FAMILIES.map((family) => (
                    <div key={family.key} style={{ ['--accent-rgb' as string]: family.rgb }}>
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-dark mb-3">
                        <span className="w-1.5 h-1.5 rounded-[2px] rotate-45 bg-accent shrink-0" aria-hidden />
                        {family.label}
                      </p>
                      <ul role="list" className="space-y-1">
                        {family.services.map((s) => (
                          <li key={s.key}>
                            <Link
                              href={s.href}
                              className="block rounded-lg px-2.5 py-2 -mx-2.5 transition-colors hover:bg-white/[0.05]"
                            >
                              <span className="block text-[13px] text-white leading-tight">{s.label}</span>
                              <span className="mt-0.5 block text-[11px] text-muted leading-snug">{s.sub}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <Link href="/servicos" className="group/all inline-flex items-center gap-1.5 text-[12px] text-muted hover:text-white transition-colors">
                    Ver todos os serviços
                    <span className="transition-transform group-hover/all:translate-x-0.5" aria-hidden>→</span>
                  </Link>
                  <Link
                    href={PLANS_LINK.href}
                    className="inline-flex items-center gap-2 rounded-pill border border-accent/30 bg-accent/10 px-4 py-2 transition-colors hover:bg-accent/15"
                  >
                    <span className="text-[12px] font-medium text-white">{PLANS_LINK.label}</span>
                    <span className="text-[11px] text-muted tabular-nums">{PLANS_LINK.price}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/sobre" className={linkCls}>Sobre</Link>
          <Link href="/portfolio" className={linkCls}>Portefólio</Link>
          <Link href="/blog" className={linkCls}>Blog</Link>
          <Link href="/recursos" className={linkCls}>Recursos</Link>
          <Link href="/parcerias" className={linkCls}>Parcerias</Link>
        </nav>

        {/* CTA — white pill */}
        <Link
          href="/contacto"
          className="hidden md:inline-flex items-center justify-center rounded-pill bg-white text-black
                     text-sm font-medium px-6 py-2.5 transition-all duration-300 hover:bg-white/90"
        >
          Marcar chamada
        </Link>

        {/* Mobile hamburger → morphs into an X */}
        <button
          className="md:hidden relative z-50 w-9 h-9 -mr-1 grid place-items-center text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <span className="relative block w-5 h-[10px]">
            <span
              className="absolute left-0 top-0 block w-5 h-px bg-white transition-all duration-[400ms]"
              style={{ transitionTimingFunction: EASE, transform: open ? 'translateY(5px) rotate(45deg)' : 'none' }}
            />
            <span
              className="absolute left-0 bottom-0 block w-5 h-px bg-white transition-all duration-[400ms]"
              style={{ transitionTimingFunction: EASE, transform: open ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
            />
          </span>
        </button>
      </div>
      </header>

      {/* ── Mobile overlay — full-screen editorial index ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-[opacity,visibility] duration-500 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ transitionTimingFunction: EASE }}
        aria-hidden={!open}
        {...(!open ? ({ inert: '' } as Record<string, string>) : {})}
      >
        {/* dark base */}
        <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" onClick={close} />
        {/* steel-blue ambiance */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 85% -5%, rgb(var(--accent-rgb) / 0.16), transparent 55%), radial-gradient(130% 90% at 0% 110%, rgb(var(--accent-rgb) / 0.10), transparent 55%)',
          }}
        />

        {/* content */}
        <div className="relative h-full overflow-y-auto px-6 pt-24 pb-10 flex flex-col">
          {/* eyebrow — hairline + accent dot, echoes the footer lockup */}
          <div className="flex items-center gap-3 mb-5">
            <span className="grid place-items-center w-3.5 h-3.5 rounded-full border border-accent/60 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
            <Link href="/servicos" onClick={close} className="text-[11px] uppercase tracking-[0.22em] text-dark hover:text-white transition-colors">
              Serviços
            </Link>
            <span className="flex-1 h-px bg-white/10" />
          </div>

          {/* serviços agrupados por família — escala para todo o catálogo */}
          <div className="space-y-6">
            {MENU_FAMILIES.map((family) => (
              <div key={family.key} style={{ ['--accent-rgb' as string]: family.rgb }}>
                <p className="flex items-center gap-2.5 mb-2 text-[10px] uppercase tracking-[0.18em] text-dark">
                  <span className="w-1.5 h-1.5 rounded-[2px] rotate-45 bg-accent shrink-0" aria-hidden />
                  {family.label}
                </p>
                <div className="flex flex-col">
                  {family.services.map((s) => {
                    const style = enter(row++)
                    return (
                      <Link
                        key={s.key}
                        href={s.href}
                        onClick={close}
                        style={style}
                        className={`group flex items-center gap-3 py-3 border-b border-white/[0.06] transition-all duration-500
                                    ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                      >
                        <span className="w-4 h-px bg-white/25 transition-all duration-300 group-hover:w-7 group-hover:bg-accent group-active:w-7 group-active:bg-accent" />
                        <span className="min-w-0">
                          <span className="block font-heading text-white/90 text-[16px] leading-tight transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1">
                            {s.label}
                          </span>
                          <span className="block text-[12px] text-muted mt-0.5">{s.sub}</span>
                        </span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-auto shrink-0 text-dark transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5">
                          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* planos — destacado, é o recorrente que sustenta o resto */}
          <Link
            href={PLANS_LINK.href}
            onClick={close}
            style={enter(row++)}
            className={`mt-6 flex items-center justify-between gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4
                        transition-all duration-500 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <span>
              <span className="block font-heading text-white text-[16px] leading-tight">{PLANS_LINK.label}</span>
              <span className="block text-[12px] text-muted mt-0.5">{PLANS_LINK.sub}</span>
            </span>
            <span className="shrink-0 text-[12px] text-white/80 tabular-nums">{PLANS_LINK.price}</span>
          </Link>

          {/* eyebrow — páginas */}
          <div className="flex items-center gap-3 mt-8 mb-1.5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-dark">Páginas</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>

          {/* compact page list */}
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                style={enter(row++)}
                className={`group flex items-center gap-3 py-3.5 border-b border-white/[0.06] transition-all duration-500
                            ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                {/* accent marker grows on press */}
                <span className="w-4 h-px bg-white/25 transition-all duration-300 group-hover:w-7 group-hover:bg-accent group-active:w-7 group-active:bg-accent" />
                <span className="font-heading text-white/90 text-[17px] transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1">
                  {link.label}
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="ml-auto text-dark transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* footer of overlay — CTA + contact + socials */}
          <div
            className={`mt-auto pt-8 transition-all duration-500 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: open ? `${110 + row * 50}ms` : '0ms', transitionTimingFunction: EASE }}
          >
            <Link
              href="/contacto"
              onClick={close}
              className="flex w-full items-center justify-center rounded-pill bg-white text-black text-[15px] font-medium px-6 py-3.5
                         shadow-[0_18px_40px_-12px_rgba(255,255,255,0.18)] transition-transform duration-300 active:scale-[0.985]"
            >
              Marcar chamada gratuita
            </Link>

            <div className="mt-6 flex items-center justify-between">
              <a href="mailto:info@elementgroup.pt" className="text-sm text-muted hover:text-white transition-colors">
                info@elementgroup.pt
              </a>
              <div className="flex items-center gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid place-items-center w-9 h-9 rounded-full border border-white/10 text-muted
                               hover:text-white hover:border-accent/50 transition-colors"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
