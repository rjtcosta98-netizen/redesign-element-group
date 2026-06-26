import type { Metadata } from 'next'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import ContactForm from '@/components/contact/ContactForm'
import { COMPANY } from '@/lib/company'

export const metadata: Metadata = {
  alternates: { canonical: '/contacto' },
  title: 'Contacto — Element Group',
  description:
    'Vamos conversar sobre o teu projeto. Respondo em menos de 2 horas, sem compromisso. Element Group — Seia, Serra da Estrela, para PMEs em todo o Portugal.',
}

export default function Contact({ searchParams }: { searchParams: { servico?: string } }) {
  const initialService = typeof searchParams?.servico === 'string' ? searchParams.servico : ''
  return (
    <main>
      <section className="relative overflow-hidden bg-bg pt-36 pb-24 px-6">
        <div aria-hidden className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[460px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.15), transparent 62%)' }} />

        <div className="relative max-w-[1000px] mx-auto">
          {/* Hero curto */}
          <AnimateOnScroll className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Contacto</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">Pede o teu orçamento grátis</h1>
            <p className="mt-5 text-muted leading-relaxed max-w-xl mx-auto">
              Conta-me o que precisas — respondo pessoalmente em menos de 2 horas, sem compromisso.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
            {/* Formulário */}
            <AnimateOnScroll>
              <div className="rounded-[24px] border border-white/10 bg-bg-card p-7 md:p-8">
                {/* Prova social no momento da decisão */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-accent text-sm tracking-widest" aria-hidden>★★★★★</span>
                  <span className="text-white text-sm font-medium">5,0</span>
                  <span className="text-muted text-[13px]">· 9 avaliações no Google</span>
                </div>
                <ContactForm initialService={initialService} />
              </div>
            </AnimateOnScroll>

            {/* Métodos alternativos */}
            <AnimateOnScroll direction="right" className="flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-dark">Preferes outra forma?</p>

              <a href={`mailto:${COMPANY.email}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-card p-5 hover:border-white/25 transition-colors">
                <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-accent to-[#4f7fb8] text-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                </span>
                <span>
                  <span className="block text-white text-sm font-medium">Email</span>
                  <span className="block text-muted text-sm">{COMPANY.email}</span>
                </span>
              </a>

              <a href={`tel:${COMPANY.phoneTel}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-card p-5 hover:border-white/25 transition-colors">
                <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-accent to-[#4f7fb8] text-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
                </span>
                <span>
                  <span className="block text-white text-sm font-medium">Telefone</span>
                  <span className="block text-muted text-sm">{COMPANY.phone}</span>
                  <span className="block text-[11px] text-dark">{COMPANY.phoneCost}</span>
                </span>
              </a>

              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-card p-5 hover:border-white/25 transition-colors">
                <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-accent to-[#4f7fb8] text-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.25.7-1.44 1.34-2 1.4-.5.06-1.16.08-1.86-.12a10.3 10.3 0 0 1-1.7-.62 9.3 9.3 0 0 1-3.6-3.18c-.27-.36-.9-1.2-.9-2.3 0-1.08.57-1.6.77-1.83a.8.8 0 0 1 .58-.27h.42c.13 0 .31-.05.49.37l.6 1.46c.05.1.08.22.01.35l-.24.36c-.12.14-.25.31-.1.56.14.25.64 1.05 1.37 1.7.94.84 1.73 1.1 1.98 1.22.25.13.4.1.54-.06l.78-.9c.18-.23.33-.18.55-.1l1.43.68c.22.1.37.16.42.25.06.1.06.55-.19 1.25Z" /></svg>
                </span>
                <span>
                  <span className="block text-white text-sm font-medium">WhatsApp</span>
                  <span className="block text-muted text-sm">Resposta rápida por mensagem</span>
                </span>
              </a>

              <a href={COMPANY.calendly} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-card p-5 hover:border-white/25 transition-colors">
                <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-accent to-[#4f7fb8] text-black">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" /></svg>
                </span>
                <span>
                  <span className="block text-white text-sm font-medium">Marcar uma chamada</span>
                  <span className="block text-muted text-sm">Escolhe um horário no Calendly</span>
                </span>
              </a>

              {/* Expectativa + localização */}
              <div className="rounded-2xl border border-white/10 bg-bg-card p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-9 h-9 shrink-0 rounded-lg bg-white/[0.06] text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  </span>
                  <p className="text-sm text-muted"><span className="text-white">Resposta em menos de 2h.</span> Falas sempre comigo, o Ricardo.</p>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-9 h-9 shrink-0 rounded-lg bg-white/[0.06] text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  </span>
                  <p className="text-sm text-muted"><span className="text-white">Seia · Serra da Estrela.</span> Trabalho com PMEs em todo o Portugal, presencial ou à distância.</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </main>
  )
}
