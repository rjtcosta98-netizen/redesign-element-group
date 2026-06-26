'use client'
import { useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export type GlobeItem = { title: string; desc: string; icon: ReactNode }
type HeaderProps = { eyebrow?: string; title: string; subtitle?: string }

const LATS = [-0.8, -0.4, 0.4, 0.8] // sem o equador: esse é a linha-guia + os conectores
const MERIDIANS = 6
const rad = (deg: number) => (deg * Math.PI) / 180

function SectionHeader({ eyebrow, title, subtitle, className = '' }: HeaderProps & { className?: string }) {
  return (
    <div className={`text-center max-w-[640px] mx-auto px-6 ${className}`}>
      {eyebrow && <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">{eyebrow}</p>}
      <h2 id="inclui" className="text-white">{title}</h2>
      {subtitle && <p className="mt-5 text-muted leading-relaxed">{subtitle}</p>}
    </div>
  )
}

/* Segmento reto que une o nó `index` ao nó `index+1`, desenhado com o scroll.
   Posicionado no MESMO referencial dos nós (rotateY · translateZ) → liga os cristais. */
function Connector({ index, total, R, anglePer, progress }: { index: number; total: number; R: number; anglePer: number; progress: MotionValue<number> }) {
  const a = index / (total - 1)
  const b = (index + 1) / (total - 1)
  const scaleX = useTransform(progress, [a, b], [0, 1], { clamp: true })
  const Rmid = R * Math.cos(rad(anglePer / 2)) // raio até ao ponto médio da corda
  const L = 2 * R * Math.sin(rad(anglePer / 2)) // comprimento da corda entre nós

  return (
    <div className="absolute left-1/2 top-1/2" style={{ transform: `rotateY(${(index + 0.5) * anglePer}deg) translateZ(${Rmid}px)` }}>
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-1/2 block rounded-full"
        style={{
          width: L,
          height: 3,
          marginLeft: -L / 2,
          marginTop: -1.5,
          transformOrigin: 'left center',
          scaleX,
          background: 'linear-gradient(90deg, var(--accent-deep), var(--accent) 55%, var(--accent-light))',
          boxShadow: '0 0 9px rgb(var(--accent-rgb) / 0.9)',
        }}
      />
    </div>
  )
}

/* ── Globo wireframe 3D (CSS, tema sapphire) + conectores que unem os pontos ── */
function Globe({
  items,
  size,
  rotateY,
  progress,
  idle = false,
  active = 0,
}: {
  items: GlobeItem[]
  size: number
  rotateY?: MotionValue<number>
  progress?: MotionValue<number>
  idle?: boolean
  active?: number
}) {
  const R = size / 2
  const anglePer = 360 / items.length

  const rings = (
    <>
      {Array.from({ length: MERIDIANS }).map((_, i) => (
        <div key={`m${i}`} className="globe-ring" style={{ transform: `rotateY(${(i * 180) / MERIDIANS}deg)` }} />
      ))}
      {LATS.map((f, i) => (
        <div key={`l${i}`} className="globe-ring" style={{ transform: `translateY(${f * 50}%) rotateX(90deg) scale(${Math.sqrt(1 - f * f)})` }} />
      ))}

      {/* equador: linha-guia ténue (no plano dos nós) */}
      <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: 'rotateX(90deg)' }}>
        <circle cx="50" cy="50" r="50" stroke="rgb(var(--accent-rgb) / 0.14)" strokeWidth="0.5" />
      </svg>

      {/* conectores reto-a-reto, desenhados com o scroll */}
      {progress && items.slice(0, -1).map((_, i) => (
        <Connector key={`c${i}`} index={i} total={items.length} R={R} anglePer={anglePer} progress={progress} />
      ))}

      {items.map((_, i) => {
        const isA = i === active
        const s = isA ? 24 : 13
        return (
          <div key={`n${i}`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%, -50%) rotateY(${i * anglePer}deg) translateZ(${R}px)` }}>
            <div className="relative transition-all duration-300" style={{ width: s, height: s }}>
              <span aria-hidden className={`node-glow ${isA ? 'is-active' : ''}`} />
              <span className="crystal relative block" style={{ opacity: isA ? 1 : 0.7 }} />
            </div>
          </div>
        )
      })}
    </>
  )

  return (
    <div className="globe-scene relative" style={{ width: size, height: size }} aria-hidden>
      <div className="absolute inset-[-14%] rounded-full" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.18), transparent 65%)', filter: 'blur(10px)' }} />

      {rotateY ? (
        <motion.div className="absolute inset-0 globe-3d" style={{ transformStyle: 'preserve-3d', rotateY }}>{rings}</motion.div>
      ) : (
        <div className={`absolute inset-0 globe-3d ${idle ? 'globe-idle' : ''}`} style={{ transformStyle: 'preserve-3d' }}>{rings}</div>
      )}

      <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 38%, transparent 56%, rgb(var(--accent-rgb) / 0.30) 79%, transparent 92%)' }} />
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: 'inset 0 0 64px rgba(8,9,11,0.9), inset 0 0 20px rgb(var(--accent-rgb) / 0.22)' }} />
    </div>
  )
}

function IconBadge({ icon, className = '' }: { icon: ReactNode; className?: string }) {
  return (
    <span
      className={`relative grid place-items-center rounded-xl bg-gradient-to-br from-[var(--accent-light)] via-accent to-[var(--accent-mid)] text-black
                  ring-1 ring-white/25 shadow-[0_10px_26px_-8px_rgb(var(--accent-rgb)/0.85)] ${className}`}
    >
      {/* brilho glossy no topo */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative">{icon}</svg>
    </span>
  )
}

/* ── Desktop: secção fixada — cabeçalho + globo viajam juntos; scroll roda, liga e acende ── */
function PinnedGlobe({ items, header }: { items: GlobeItem[]; header: HeaderProps }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const total = items.length
  const anglePer = 360 / total
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -anglePer * (total - 1)])
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))))))

  return (
    <div ref={ref} style={{ height: `${total * 44 + 30}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <SectionHeader {...header} className="mb-8 xl:mb-12" />

        <div className="max-w-[1080px] mx-auto w-full px-6 grid grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Globe items={items} size={400} rotateY={rotateY} progress={scrollYProgress} active={active} />
          </div>

          <div className="relative h-[320px]">
            {items.map((it, i) => (
              <motion.article
                key={it.title}
                aria-hidden={i !== active}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 26, scale: i === active ? 1 : 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                style={{ pointerEvents: i === active ? 'auto' : 'none' }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="relative overflow-hidden rounded-[24px] border border-white/10 p-8
                                bg-gradient-to-br from-[#181c24] via-[#121419] to-[#0c0d11]
                                shadow-[0_40px_90px_-45px_rgba(0,0,0,0.95),inset_0_1px_0_rgb(255_255_255/0.07)]">
                  {/* hairline de acento no topo */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent-rgb) / 0.55), transparent)' }} />
                  {/* glows de canto */}
                  <div aria-hidden className="absolute -top-20 -right-14 w-60 h-60 pointer-events-none" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.22), transparent 65%)' }} />
                  <div aria-hidden className="absolute -bottom-24 -left-16 w-60 h-60 pointer-events-none" style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.10), transparent 65%)' }} />
                  <div className="relative">
                    <span className="font-heading text-sm tabular-nums">
                      <span className="text-accent">0{i + 1}</span><span className="text-dark"> — 0{total}</span>
                    </span>
                    <IconBadge icon={it.icon} className="w-12 h-12 mt-5" />
                    <h3 className="mt-5 text-white font-heading text-2xl font-medium tracking-[-0.01em]">{it.title}</h3>
                    <p className="mt-3 text-muted leading-relaxed">{it.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-accent' : 'w-1.5 bg-white/20'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Mobile / reduced-motion: globo compacto + lista ligada por uma linha luminosa ── */
function StackedGlobe({ items, header, idle = true }: { items: GlobeItem[]; header: HeaderProps; idle?: boolean }) {
  return (
    <div className="px-6">
      <SectionHeader {...header} className="mb-12" />
      <div className="flex justify-center mb-12">
        <Globe items={items} size={220} idle={idle} active={0} />
      </div>

      <ul className="relative flex flex-col gap-5 max-w-md mx-auto pl-7">
        <span aria-hidden className="absolute left-[10px] top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-accent/0 via-accent/55 to-accent/0" />
        {items.map((it, i) => (
          <AnimateOnScroll key={it.title} delay={(i % 2) * 0.06}>
            <li className="relative">
              <span aria-hidden className="absolute left-[-22px] top-5 w-3.5 h-3.5">
                <span className="node-glow" />
                <span className="crystal relative block" />
              </span>
              <div className="relative overflow-hidden flex gap-4 rounded-2xl border border-white/10 p-5
                              bg-gradient-to-br from-[#181c24] to-[#0c0d11]
                              shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent-rgb) / 0.4), transparent)' }} />
                <IconBadge icon={it.icon} className="w-11 h-11 shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-white font-heading text-lg font-medium tracking-[-0.01em]">{it.title}</h3>
                  <p className="mt-1.5 text-muted text-sm leading-relaxed">{it.desc}</p>
                </div>
              </div>
            </li>
          </AnimateOnScroll>
        ))}
      </ul>
    </div>
  )
}

export default function IncludesGlobe({ items, eyebrow, title, subtitle }: { items: GlobeItem[] } & HeaderProps) {
  const reduce = useReducedMotion()
  const header = { eyebrow, title, subtitle }
  if (reduce) return <StackedGlobe items={items} header={header} idle={false} />

  return (
    <>
      <div className="hidden lg:block">
        <PinnedGlobe items={items} header={header} />
      </div>
      <div className="lg:hidden">
        <StackedGlobe items={items} header={header} />
      </div>
    </>
  )
}
