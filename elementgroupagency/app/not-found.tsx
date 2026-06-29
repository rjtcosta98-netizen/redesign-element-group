import type { Metadata } from 'next'
import Link from 'next/link'
import GlowButton from '@/components/ui/GlowButton'

export const metadata: Metadata = {
  title: 'Página não encontrada — Element Group',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-bg min-h-screen flex items-center justify-center px-6">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.13), transparent 60%)' }}
      />
      <div className="relative text-center max-w-lg">
        <p className="font-heading text-[120px] md:text-[160px] font-medium text-white/[0.07] leading-none tabular-nums select-none">
          404
        </p>
        <div className="-mt-8 md:-mt-12">
          <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Página não encontrada</p>
          <h1 className="text-white text-3xl md:text-4xl font-heading font-medium tracking-[-0.02em] leading-tight">
            Esta página não existe (ou foi movida).
          </h1>
          <p className="mt-5 text-muted leading-relaxed">
            Verifica o endereço ou volta à página inicial. Se precisas de ajuda, fala connosco.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlowButton href="/">Voltar ao início</GlowButton>
            <Link
              href="/contacto"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Fala connosco →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
