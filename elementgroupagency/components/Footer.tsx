import Image from 'next/image'
import Link from 'next/link'
import { COMPANY, LEGAL_LINKS } from '@/lib/company'


const COLS = [
  {
    title: 'Empresa',
    links: [
      { label: 'Início',     href: '/' },
      { label: 'Sobre',      href: '/sobre' },
      { label: 'Portefólio', href: '/portfolio' },
      { label: 'Blog',       href: '/blog' },
      { label: 'Recursos',   href: '/recursos' },
      { label: 'Parcerias',  href: '/parcerias' },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Websites & Lojas Online', href: '/servicos/web' },
      { label: 'SEO & Otimização',        href: '/servicos/seo' },
      { label: 'Social Media',            href: '/servicos/social' },
      { label: 'Planos Mensais',          href: '/servicos/planos-mensais' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'Contacto',               href: '/contacto' },
      { label: 'Pedir orçamento grátis', href: '/contacto' },
      { label: 'info@elementgroup.pt',   href: 'mailto:info@elementgroup.pt' },
    ],
  },
]

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/elementgroupdigital/',
    path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/elementgrouppt',
    path: 'M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .4 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.4-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.95-11.4a1.58 1.58 0 1 0 1.57 1.57 1.58 1.58 0 0 0-1.57-1.57Z',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@elementgroup.pt',
    path: 'M16.6 5.82a4.78 4.78 0 0 1-1.04-.65 4.7 4.7 0 0 1-1.7-3.17h-3.02v12.97a2.66 2.66 0 0 1-2.66 2.55 2.66 2.66 0 0 1-1.2-5.03 2.66 2.66 0 0 1 1.95-.18v-3.05a5.71 5.71 0 0 0-4.9 1.55 5.71 5.71 0 0 0 3.96 9.78 5.71 5.71 0 0 0 5.86-5.71V8.9a7.68 7.68 0 0 0 4.5 1.44V7.32a4.6 4.6 0 0 1-1.71-.5Z',
  },
  {
    label: 'Google',
    href: 'https://share.google/wRWp5sI4YBerW7l9q',
    path: 'M12 11v2.9h4.1c-.18 1.07-1.27 3.14-4.1 3.14A4.54 4.54 0 0 1 12 7.5c1.28 0 2.14.55 2.63 1.02l1.9-1.83A6.9 6.9 0 0 0 12 4.6a7.4 7.4 0 1 0 0 14.8c4.27 0 7.1-3 7.1-7.23 0-.49-.05-.86-.12-1.23L12 11Z',
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#08090b] border-t border-white/10 pt-20 pb-10 px-6">
      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand block */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Element Group — início">
              <Image src="/web-app-manifest-512x512.png" alt="" width={32} height={32} className="w-8 h-8" />
              <span className="font-heading text-[19px] font-semibold leading-none tracking-[-0.03em] text-white">
                Element<span className="font-normal text-white/55"> Group</span>
              </span>
            </Link>

            <p className="mt-5 text-muted text-sm leading-relaxed max-w-xs">
              Websites, lojas online, SEO e marketing digital para PMEs em Portugal —
              à medida, ultra-rápidos e por um preço justo.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid place-items-center w-9 h-9 rounded-full border border-white/10 text-muted
                             hover:text-white hover:border-white/25 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-white text-sm font-medium mb-4">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      {...('external' in l && l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-muted text-sm hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar — legal */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-dark">
            <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="/politica-de-cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/termos-e-condicoes" className="hover:text-white transition-colors">Termos &amp; Condições</Link>
            <Link href="/resolucao-de-litigios" className="hover:text-white transition-colors">Resolução de Litígios</Link>
            <a href={LEGAL_LINKS.livroReclamacoes} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Livro de Reclamações</a>
          </div>
          <p className="text-[11px] text-dark md:text-right">© {new Date().getFullYear()} {COMPANY.tradeName} · {COMPANY.legalName} · NIF {COMPANY.nif} · {COMPANY.postalCity}</p>
        </div>
      </div>

      {/* Signature lockup — white logo centred on a fading hairline */}
      <div aria-hidden className="pointer-events-none relative z-0 mt-16 h-24 sm:h-28 select-none">
        {/* hairline crossing the vertical centre, fading at both ends */}
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
          style={{ background: 'linear-gradient(90deg, transparent, rgb(255 255 255 / 0.14) 16%, rgb(255 255 255 / 0.14) 84%, transparent)' }}
        />

        {/* white logo mark, centred on the line */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* soft halo so the mark lifts off the hairline */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.14), transparent 65%)' }}
          />
          <Image
            src="/web-app-manifest-512x512.png"
            alt=""
            width={96}
            height={96}
            className="relative w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] object-contain
                       [filter:brightness(0)_invert(1)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </footer>
  )
}
