import Image from 'next/image'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export default function Streamline() {
  return (
    <section className="bg-bg py-24 px-6 border-t border-white/10">
      <div className="max-w-[1100px] mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="text-white">Streamline Financial Zero Hassle.</h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            We respond quickly, tackle what matters, and are dedicated to your success.
          </p>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 — Send & Receive */}
          <AnimateOnScroll>
            <article className="h-full rounded-[24px] border border-white/10 bg-bg-card overflow-hidden">
              <div className="relative h-[220px] bg-gradient-to-br from-[#1c1a18] to-[#0F0F0E] flex items-center justify-center gap-6 px-8">
                {/* Sent / Receive tiles */}
                {[
                  { label: 'Sent Money', up: true },
                  { label: 'Receive Money', up: false },
                ].map((t, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-[#4f7fb8] flex items-center justify-center text-black">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                           className={t.up ? '' : 'rotate-180'}>
                        <path d="M12 19V5M12 5l-6 6M12 5l6 6" stroke="currentColor" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-sm font-medium">$118,94</p>
                      <p className="text-dark text-[11px]">{t.label}</p>
                    </div>
                  </div>
                ))}
                {/* dashed connector */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 border-t border-dashed border-white/25" />
              </div>
              <div className="p-7">
                <h4 className="text-white">Send &amp; Receive Payments Seamlessly</h4>
                <p className="mt-2 text-muted text-sm">Set auto-transfer rules and send free USD wires.</p>
              </div>
            </article>
          </AnimateOnScroll>

          {/* Card 2 — Organize */}
          <AnimateOnScroll delay={0.15}>
            <article className="h-full rounded-[24px] border border-white/10 bg-bg-card overflow-hidden">
              <div className="relative h-[220px] bg-gradient-to-br from-[#1c1a18] to-[#0F0F0E] flex items-center justify-center overflow-hidden">
                {/* orange arc */}
                <div className="absolute w-56 h-56 rounded-full border border-accent/40"
                     style={{ boxShadow: '0 0 60px rgba(127,168,217,0.25)' }} />
                <div className="absolute w-72 h-72 rounded-full border border-accent/15" />
                {/* card chip */}
                <div className="relative w-28 h-20 rounded-xl bg-gradient-to-br from-[#2a2723] to-[#15140f] border border-white/10 flex flex-col justify-between p-3 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
                  <div className="w-6 h-4 rounded-sm bg-accent/70" />
                  <p className="text-[9px] text-dark tracking-wider">PAYMENT CARD</p>
                </div>
              </div>
              <div className="p-7">
                <h4 className="text-white">Organize Your Payment</h4>
                <p className="mt-2 text-muted text-sm">Immediately group your transactions to make it easy.</p>
              </div>
            </article>
          </AnimateOnScroll>

          {/* Card 3 — wide, credit cards */}
          <AnimateOnScroll delay={0.3} className="md:col-span-2">
            <article className="rounded-[24px] border border-white/10 bg-bg-card overflow-hidden">
              <div className="relative h-[260px] md:h-[320px]">
                <Image
                  src="https://framerusercontent.com/images/9TvEKC4BxzN2S2pToHh3FZPYlQ.webp"
                  alt=""
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
                {/* keep the cards visible, only fade the very bottom toward the text */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card/80 via-transparent to-transparent" />
              </div>
              <div className="p-7">
                <h4 className="text-white">Unlock Cards Earlier with Low Deposit Minimums</h4>
                <p className="mt-2 text-muted text-sm">Unlock credit cards earlier with industry-low deposit minimums.</p>
              </div>
            </article>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
