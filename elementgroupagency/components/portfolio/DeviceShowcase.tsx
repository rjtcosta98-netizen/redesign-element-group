import Image from 'next/image'

type Props = {
  desktop?: string
  mobile?: string
  alt: string
  url?: string
}

// iPhone 17 Pro Max frame — titanium rim, Action Button, Camera Control, Dynamic Island, reflexo vidro
function IPhoneFrame({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="relative w-[240px] sm:w-[270px] mx-auto" style={{ aspectRatio: '9/19.5' }}>
      {/* rim titanium — gradiente multi-stop que simula aço brushed apanhar luz */}
      <div
        className="absolute inset-0 rounded-[3.2rem]"
        style={{
          background: 'linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(180,182,192,0.07) 20%, rgba(255,255,255,0.04) 50%, rgba(195,197,207,0.06) 78%, rgba(255,255,255,0.21) 100%)',
          boxShadow: '0 44px 96px rgba(0,0,0,0.94), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.10)',
        }}
      />
      {/* corpo do telemóvel — 2px inset do rim */}
      <div className="absolute rounded-[3rem] bg-[#0e0f13]" style={{ inset: '2px' }}>
        {/* Dynamic Island — pill com camera + sensor IR */}
        <div
          className="absolute top-[1.8%] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center rounded-full"
          style={{ width: '28%', height: '2.7%', background: '#050507', gap: '12%' }}
        >
          <div style={{ width: '14%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(20,22,32,0.9)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }} />
          <div style={{ width: '8%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(12,14,20,0.8)' }} />
        </div>
        {/* ecrã com profundidade */}
        <div className="absolute overflow-hidden rounded-[2.8rem]" style={{ inset: '4px' }}>
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
          {/* reflexo de vidro diagonal */}
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(148deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 28%, transparent 50%)' }} />
        </div>
      </div>
      {/* Action Button — esquerda, topo (iPhone 16/17 Pro) */}
      <div className="absolute left-0 top-[11%]" style={{ translate: '-2px', width: '3.5px', height: '5%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.19))', borderRadius: '3px 0 0 3px' }} />
      {/* Volume Up */}
      <div className="absolute left-0 top-[19%]" style={{ translate: '-2px', width: '3.5px', height: '8.5%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.15))', borderRadius: '3px 0 0 3px' }} />
      {/* Volume Down */}
      <div className="absolute left-0 top-[29.5%]" style={{ translate: '-2px', width: '3.5px', height: '8.5%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.15))', borderRadius: '3px 0 0 3px' }} />
      {/* Power / Side button — direita */}
      <div className="absolute right-0 top-[20%]" style={{ translate: '2px', width: '3.5px', height: '11%', background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.19))', borderRadius: '0 3px 3px 0' }} />
      {/* Camera Control — direita, abaixo do power (iPhone 16/17) */}
      <div className="absolute right-0 top-[37%]" style={{ translate: '2px', width: '3.5px', height: '7%', background: 'linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.13))', borderRadius: '0 3px 3px 0' }} />
      {/* accent glow por baixo */}
      <div className="absolute inset-0 rounded-[3.2rem] pointer-events-none" style={{ boxShadow: '0 26px 72px -30px rgb(var(--accent-rgb) / 0.52)' }} />
    </div>
  )
}

export default function DeviceShowcase({ desktop, mobile, alt, url }: Props) {
  // ── Mobile-only (apps mobile-first sem layout desktop) ───────────────────
  if (!desktop && mobile) {
    return (
      <div className="relative flex justify-center py-6">
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] max-w-full h-[460px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgb(var(--accent-rgb) / 0.16), transparent 60%)' }}
        />
        <IPhoneFrame src={mobile} alt={alt} sizes="(max-width: 640px) 240px, 270px" />
      </div>
    )
  }

  // ── Desktop + mobile (sites e lojas) ────────────────────────────────────
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[440px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 30%, rgb(var(--accent-rgb) / 0.14), transparent 62%)' }}
      />

      <div className="relative flex flex-col items-center lg:flex-row lg:items-end lg:justify-center gap-10 lg:gap-0">
        {/* Desktop — janela de browser (macOS) */}
        {desktop && (
          <div className="w-full lg:max-w-[680px] rounded-[14px] overflow-hidden border border-white/12 bg-[#101216] shadow-[0_44px_100px_-44px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10 bg-white/[0.03]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]/85" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]/85" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]/85" />
              <div className="ml-3 flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 h-6 w-full max-w-[340px] rounded-full bg-white/[0.06] px-3">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dark shrink-0" aria-hidden>
                    <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                  <span className="text-[11px] text-dark truncate">{url ?? 'preview'}</span>
                </div>
              </div>
            </div>
            <div className="relative w-full aspect-[16/10]">
              <Image src={desktop} alt={alt} fill sizes="(max-width: 1024px) 92vw, 680px" className="object-cover object-top" />
            </div>
          </div>
        )}

        {/* Telemóvel — iPhone 17 Pro Max frame (overlap subtil no desktop) */}
        {mobile && (
          <div className={desktop ? 'relative shrink-0 lg:-ml-12 lg:mb-4' : ''}>
            <div className={desktop ? 'w-[150px] sm:w-[168px]' : 'w-[240px] sm:w-[270px]'} style={{ aspectRatio: '9/19.5' }}>
              <IPhoneFrame src={mobile} alt={`${alt} — versão mobile`} sizes={desktop ? '168px' : '(max-width: 640px) 240px, 270px'} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
