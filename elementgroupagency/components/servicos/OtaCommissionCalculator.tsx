'use client'
import { useState } from 'react'
import GlowButton from '@/components/ui/GlowButton'

// A calculadora existe porque este serviço não se vende com adjetivos — vende-se
// com uma conta que o dono do negócio faz de cabeça e confirma no extrato dele.
//
// Os pressupostos estão todos à vista de propósito. Uma calculadora que esconde
// como chega ao número é uma peça de marketing; uma que os mostra é um argumento.

/** Piso do intervalo de A3 (2.500-4.500 €). Usar o piso mantém a conta conservadora. */
const SETUP_FLOOR = 2500

/** Quota de reservas que se assume recuperar para canal direto. Deliberadamente prudente. */
const RECOVERY = 0.3

const eur = (n: number) => `${Math.round(n).toLocaleString('pt-PT')} €`

export default function OtaCommissionCalculator({ ctaHref }: { ctaHref: string }) {
  const [revenue, setRevenue] = useState(2000)
  const [rate, setRate] = useState(25)

  const monthlyCommission = revenue * (rate / 100)
  const yearlyCommission = monthlyCommission * 12
  const monthlySaving = monthlyCommission * RECOVERY
  const yearlySaving = monthlySaving * 12
  const payback = monthlySaving > 0 ? SETUP_FLOOR / monthlySaving : Infinity

  return (
    <div className="rounded-[26px] border border-white/10 bg-bg-card p-6 sm:p-8">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-12">
        {/* Entradas */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-dark mb-6">Os teus números</p>

          <label className="block">
            <span className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-white/85">Reservas por mês via plataformas</span>
              <span className="font-heading text-white text-lg tabular-nums">{eur(revenue)}</span>
            </span>
            <input
              type="range"
              min={250}
              max={20000}
              step={250}
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="mt-3 w-full accent-[rgb(var(--accent-rgb))] cursor-pointer"
              aria-label="Receita mensal via plataformas, em euros"
            />
          </label>

          <label className="block mt-8">
            <span className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-white/85">Comissão que pagas</span>
              <span className="font-heading text-white text-lg tabular-nums">{rate}%</span>
            </span>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-3 w-full accent-[rgb(var(--accent-rgb))] cursor-pointer"
              aria-label="Percentagem de comissão cobrada pela plataforma"
            />
            <span className="mt-3 block text-[11px] text-dark leading-relaxed">
              Booking cobra 10-20%, com média de 15%. GetYourGuide e Viator cobram 20-30%, sendo 25% o
              valor mais reportado — e o custo real fica 3 a 5 pontos acima do contratado, depois de
              taxas e promoções obrigatórias. Empresas de gestão de alojamento local em Portugal ficam
              nos 15-25% da receita.
            </span>
          </label>
        </div>

        {/* Resultados */}
        <div className="lg:border-l lg:border-white/10 lg:pl-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-dark mb-6">O que isso custa</p>

          <div>
            <p className="text-[13px] text-muted">Comissão que pagas por ano</p>
            <p className="mt-1 font-heading text-[38px] sm:text-[44px] leading-none font-medium text-white tabular-nums">
              {eur(yearlyCommission)}
            </p>
            <p className="mt-1.5 text-[12px] text-dark tabular-nums">{eur(monthlyCommission)} por mês</p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-[13px] text-muted">
              Se recuperares {Math.round(RECOVERY * 100)}% dessas reservas para canal direto
            </p>
            <p className="mt-1 font-heading text-[30px] leading-none font-medium text-accent tabular-nums">
              {eur(yearlySaving)}<span className="text-base text-muted font-normal"> por ano</span>
            </p>
            <p className="mt-2.5 text-[13px] text-white/80">
              {Number.isFinite(payback) && payback <= 60 ? (
                <>
                  O sistema paga-se em <strong className="text-white font-medium">{Math.ceil(payback)} meses</strong>,
                  a contar com o investimento no piso de {eur(SETUP_FLOOR)}.
                </>
              ) : (
                <>Com este volume, o sistema demora a pagar-se. Digo-te isso na chamada, em vez de te vender uma coisa que não compensa.</>
              )}
            </p>
          </div>

          <div className="mt-8">
            <GlowButton href={ctaHref} className="w-full sm:w-auto">Ver se compensa no meu caso</GlowButton>
          </div>
        </div>
      </div>

      <p className="mt-8 pt-6 border-t border-white/10 text-[11px] text-dark leading-relaxed">
        Esta conta assume que recuperas {Math.round(RECOVERY * 100)}% das reservas para canal direto — não
        todas, porque não é realista. As plataformas continuam a ser um canal de descoberta útil; o que
        muda é deixares de pagar comissão sobre o cliente que já te conhece e que só quer voltar a marcar.
        O retorno confirma-se no teu extrato, não numa promessa minha.
      </p>
    </div>
  )
}
