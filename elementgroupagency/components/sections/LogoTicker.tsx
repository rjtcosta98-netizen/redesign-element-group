import { getClients, type Client } from '@/lib/clients'
import ClientLogo from './ClientLogo'

// Fallback (nomes reais) enquanto a tabela `clients` no Supabase estiver vazia.
// Quando adicionares clientes (name + logo) à BD, estes são substituídos.
const FALLBACK: Client[] = [
  { name: 'Matias Nature', logo: '' },
  { name: 'Apiários Terras da Pulga', logo: '' },
  { name: 'Maria Mendes Massagens', logo: '' },
  { name: 'AD São Romão', logo: '' },
  { name: 'Estrela Detail & Wash', logo: '' },
  { name: 'Football Nation Store', logo: '' },
  { name: 'Bella Essência', logo: '' },
]

export default async function LogoTicker() {
  const fromDb = await getClients()
  const CLIENTS = fromDb.length ? fromDb : FALLBACK

  // Duplicado para o marquee fazer loop contínuo (CSS translateX -50%).
  const TRACK = [...CLIENTS, ...CLIENTS]

  return (
    <section className="relative bg-bg py-14 overflow-hidden border-b border-white/5">
      <p className="text-center text-[11px] uppercase tracking-[0.22em] text-dark mb-9">
        Negócios que confiaram em nós
      </p>

      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-28 md:w-40 z-10 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 md:w-40 z-10 bg-gradient-to-l from-bg to-transparent pointer-events-none" />

        <ul className="flex w-max items-center animate-ticker hover:[animation-play-state:paused] motion-reduce:animate-none">
          {TRACK.map((c, i) => (
            <li key={i} className="flex items-center justify-center px-8 md:px-12 shrink-0">
              <ClientLogo name={c.name} logo={c.logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
