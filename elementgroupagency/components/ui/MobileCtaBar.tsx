'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { COMPANY } from '@/lib/company'

// Barra de conversão fixa em mobile. Em telemóvel o CTA do hero desaparece ao
// fim de um ecrã e não volta a haver nenhum durante milhares de píxeis de
// scroll — esta barra mantém a ação primária sempre a uma distância de polegar.
// Aparece só depois do primeiro ecrã (não compete com o CTA do hero) e nunca
// na página de contacto, onde o formulário já é a ação.
export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname?.startsWith('/contacto')) return null

  return (
    <div
      aria-hidden={!visible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2
                  bg-gradient-to-t from-bg via-bg/95 to-transparent
                  transition-all duration-300 motion-reduce:transition-none
                  ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
    >
      <div className="flex items-center gap-2">
        <Link
          href="/contacto"
          className="flex-1 inline-flex items-center justify-center rounded-pill bg-white text-black
                     text-[15px] font-medium py-3.5 shadow-[0_16px_36px_-14px_rgba(255,255,255,0.35)]
                     transition-transform duration-200 active:scale-[0.98]"
        >
          Pedir orçamento grátis
        </Link>
        <a
          href={COMPANY.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar connosco no WhatsApp"
          className="grid place-items-center w-[52px] h-[52px] shrink-0 rounded-full
                     border border-white/10 bg-bg-card/95 backdrop-blur-md
                     transition-transform duration-200 active:scale-95"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.747-.969a9.86 9.86 0 0 0 .73-.738zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.017-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
