'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Each service carries its own brand accent (same palette as the FeatureStack
// cards) so the mobile menu cards glow in their category colour.
const SERVICES = [
  { label: 'Websites & Lojas Online', short: 'Websites',     sub: 'Sites & lojas online',  href: '/servicos/web',            rgb: '127 168 217' },
  { label: 'SEO & Otimização',        short: 'SEO',          sub: 'Apareça no Google',     href: '/servicos/seo',            rgb: '111 179 154' },
  { label: 'Social Media',            short: 'Social Media', sub: 'Redes & campanhas',     href: '/servicos/social',         rgb: '169 138 212' },
  { label: 'Planos Mensais',          short: 'Planos',       sub: 'Parceria mensal',       href: '/servicos/planos-mensais', rgb: '215 176 116' },
]

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

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-bg/70 to-transparent backdrop-blur-[2px]">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2" aria-label="Element Group — início" onClick={close}>
          <Image src="/web-app-manifest-512x512.png" alt="" width={512} height={512} className="w-8 h-8" priority />
          <span className="font-heading text-[19px] font-semibold leading-none tracking-[-0.03em] text-white">
            Element<span className="font-normal text-white/55"> Group</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {/* Serviços dropdown */}
          <div className="relative group">
            <button className={`flex items-center gap-1 ${linkCls}`}>
              Serviços
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="mt-px opacity-70">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1
                            transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <div className="bg-bg-card border border-white/10 rounded-xl min-w-[220px] py-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                {SERVICES.map((s) => (
                  <Link key={s.href} href={s.href} className="block px-5 py-2.5 text-sm text-muted hover:text-white hover:bg-white/5 transition-colors">
                    {s.label}
                  </Link>
                ))}
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
          Pedir orçamento
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
            <span className="text-[11px] uppercase tracking-[0.22em] text-dark">Serviços</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>

          {/* service cards — each glows in its own brand accent */}
          <div className="grid grid-cols-2 gap-3">
            {SERVICES.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={close}
                style={{ ...enter(i), ['--accent-rgb' as string]: s.rgb }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f1216] p-4
                            transition-all duration-500 hover:border-[rgb(var(--accent-rgb)/0.5)]
                            ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                {/* accent wash */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(120% 100% at 85% 0%, rgb(var(--accent-rgb) / 0.20), transparent 58%)' }}
                />
                <span className="relative flex items-center justify-between">
                  {/* faceted node — same crystal language as the globe */}
                  <span
                    className="block w-3.5 h-3.5 rounded-[4px] rotate-45 shadow-[0_0_12px_rgb(var(--accent-rgb)/0.7)]"
                    style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--accent) 55%, var(--accent-deep))' }}
                  />
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-muted transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="relative block mt-6 font-heading font-medium text-white text-[17px] leading-tight">{s.short}</span>
                <span className="relative block text-[12px] text-muted mt-0.5">{s.sub}</span>
              </Link>
            ))}
          </div>

          {/* eyebrow — páginas */}
          <div className="flex items-center gap-3 mt-8 mb-1.5">
            <span className="text-[11px] uppercase tracking-[0.22em] text-dark">Páginas</span>
            <span className="flex-1 h-px bg-white/10" />
          </div>

          {/* compact page list */}
          <nav className="flex flex-col">
            {NAV_LINKS.map((row, i) => (
              <Link
                key={row.href}
                href={row.href}
                onClick={close}
                style={enter(SERVICES.length + i)}
                className={`group flex items-center gap-3 py-3.5 border-b border-white/[0.06] transition-all duration-500
                            ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              >
                {/* accent marker grows on press */}
                <span className="w-4 h-px bg-white/25 transition-all duration-300 group-hover:w-7 group-hover:bg-accent group-active:w-7 group-active:bg-accent" />
                <span className="font-heading text-white/90 text-[17px] transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1">
                  {row.label}
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
            style={{ transitionDelay: open ? `${110 + (SERVICES.length + NAV_LINKS.length) * 50}ms` : '0ms', transitionTimingFunction: EASE }}
          >
            <Link
              href="/contacto"
              onClick={close}
              className="flex w-full items-center justify-center rounded-pill bg-white text-black text-[15px] font-medium px-6 py-3.5
                         shadow-[0_18px_40px_-12px_rgba(255,255,255,0.18)] transition-transform duration-300 active:scale-[0.985]"
            >
              Pedir orçamento
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
