import Link from 'next/link'

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main>
      <section className="relative overflow-hidden bg-bg pt-36 pb-10 px-6">
        <div aria-hidden className="absolute top-10 left-1/2 -translate-x-1/2 w-[680px] h-[360px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.12), transparent 62%)' }} />
        <div className="relative max-w-[760px] mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors">
            <span aria-hidden>←</span> Início
          </Link>
          <h1 className="mt-6 text-white tracking-[-0.03em] leading-[1.06]">{title}</h1>
          <p className="mt-3 text-[12px] text-dark">Última atualização: {updated}</p>
        </div>
      </section>

      <div className="px-6 pb-24">
        <div className="max-w-[760px] mx-auto">{children}</div>
      </div>
    </main>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-white font-heading text-xl font-medium tracking-[-0.01em] mt-10 mb-3">{children}</h2>
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted text-sm leading-relaxed my-3">{children}</p>
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul role="list" className="my-3 flex flex-col gap-2">{children}</ul>
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-muted text-sm leading-relaxed">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
      <span>{children}</span>
    </li>
  )
}
