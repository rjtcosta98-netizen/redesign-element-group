import Image from 'next/image'

// Mostra o trabalho numa janela de browser (macOS) + telemóvel ao lado.
// Mesma linguagem da capa do portefólio (semáforo + barra de URL), à escala grande —
// "mostra, não contes". O phone só aparece se houver screenshot mobile real.
type Props = {
  desktop: string
  mobile?: string
  alt: string
  url?: string
}

export default function DeviceShowcase({ desktop, mobile, alt, url }: Props) {
  return (
    <div className="relative">
      {/* glow de acento por trás */}
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[440px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.14), transparent 62%)' }}
      />

      <div className="relative flex flex-col items-center lg:flex-row lg:items-end lg:justify-center gap-10 lg:gap-0">
        {/* Desktop — janela de browser (macOS) */}
        <div className="w-full lg:max-w-[680px] rounded-[14px] overflow-hidden border border-white/12 bg-[#101216] shadow-[0_44px_100px_-44px_rgba(0,0,0,0.9)]">
          {/* barra do browser */}
          <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10 bg-white/[0.03]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]/85" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]/85" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]/85" />
            {/* barra de endereço com cadeado + domínio real */}
            <div className="ml-3 flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 h-6 w-full max-w-[340px] rounded-full bg-white/[0.06] px-3">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dark shrink-0" aria-hidden>
                  <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span className="text-[11px] text-dark truncate">{url ?? 'preview'}</span>
              </div>
            </div>
          </div>
          {/* screenshot */}
          <div className="relative w-full aspect-[16/10]">
            <Image src={desktop} alt={alt} fill sizes="(max-width: 1024px) 92vw, 680px" className="object-cover object-top" />
          </div>
        </div>

        {/* Telemóvel — moldura de phone (overlap subtil no desktop) */}
        {mobile && (
          <div className="relative shrink-0 w-[150px] sm:w-[168px] lg:-ml-12 lg:mb-4 rounded-[2.2rem] border-[6px] border-[#0a0b0e] bg-[#0a0b0e] shadow-[0_36px_70px_-22px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* dynamic island */}
            <span aria-hidden className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-14 h-4 rounded-full bg-[#0a0b0e]" />
            <div className="relative w-full aspect-[9/19.5] rounded-[1.7rem] overflow-hidden">
              <Image src={mobile} alt={`${alt} — versão mobile`} fill sizes="168px" className="object-cover object-top" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
