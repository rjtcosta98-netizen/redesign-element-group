// ─── Catálogo de serviços ────────────────────────────────────────────────────
// Fonte única do catálogo, partilhada pela navegação, pelo hub /servicos e pelo
// bloco de serviços relacionados. Existe por uma razão concreta: antes desta
// versão, os serviços estavam declarados em Nav.tsx e em RelatedServices.tsx com
// listas paralelas, e os preços viviam espalhados por oito ficheiros — foi assim
// que "790 €" passou a significar duas coisas diferentes em duas páginas.
//
// Base: catálogo de serviços e preços de 2026-08-12.
//
// REGRA: todos os valores são SEM IVA e são intervalos, não valores fechados.
// O preço fixa-se depois do diagnóstico (regra R2 do catálogo) — o que se publica
// é a ordem de grandeza, para o cliente se situar antes da primeira conversa.

/** Serviços cuja página ainda não existe aparecem no hub sem ligação, nunca como 404. */
export type ServiceStatus = 'live' | 'planned'

export type Service = {
  key: string
  label: string
  /** Uma linha, na linguagem do cliente — não o nome interno do serviço. */
  sub: string
  href: string
  /** Intervalo do catálogo, sem IVA. Ausente nos serviços sem preço publicado. */
  price?: string
  status: ServiceStatus
}

export type ServiceFamily = {
  key: string
  label: string
  /** A pergunta que o cliente traz quando chega a esta família. */
  question: string
  rgb: string
  services: Service[]
}

export const FAMILIES: ServiceFamily[] = [
  {
    key: 'web',
    label: 'Web & Software',
    question: 'Preciso de uma coisa construída.',
    rgb: '127 168 217',
    services: [
      { key: 'web', label: 'Websites & Lojas Online', sub: 'Sites e lojas que convertem', href: '/servicos/web', price: '2.500-7.500 €', status: 'live' },
      { key: 'reservas', label: 'Reservas & Pagamentos', sub: 'Deixa de pagar comissão em cada reserva', href: '/servicos/reservas-pagamentos', price: '2.500-4.500 €', status: 'live' },
      { key: 'software', label: 'Software à Medida', sub: 'Quando a folha de Excel já não chega', href: '/servicos/software', price: '4.000-12.000 €', status: 'live' },
    ],
  },
  {
    key: 'visibilidade',
    label: 'SEO & Visibilidade em IA',
    question: 'Ninguém me encontra.',
    rgb: '111 179 154',
    services: [
      { key: 'seo', label: 'SEO & Otimização', sub: 'Aparecer no Google', href: '/servicos/seo', price: '890-1.200 €', status: 'live' },
      { key: 'geo', label: 'Visibilidade em IA (GEO)', sub: 'Ser citado pelo ChatGPT e pelo Perplexity', href: '/servicos/visibilidade-ia', price: '690-1.200 €', status: 'live' },
    ],
  },
  {
    key: 'ia',
    label: 'IA & Automação',
    question: 'Gasto tempo em coisas repetidas.',
    rgb: '169 138 212',
    services: [
      { key: 'diagnostico', label: 'Diagnóstico Digital & IA', sub: 'Saber o que automatizar primeiro', href: '/servicos/diagnostico-ia', price: '490-890 €', status: 'live' },
      { key: 'assistente', label: 'Assistente de IA', sub: 'Responde e qualifica, no site e no WhatsApp', href: '/servicos/assistente-ia', price: '1.200-2.500 €', status: 'live' },
    ],
  },
  {
    key: 'marca',
    label: 'Marca & Conteúdo',
    question: 'Pareço amador.',
    rgb: '215 176 116',
    services: [
      { key: 'design', label: 'Marca & Design', sub: 'Uma marca que não parece feita à pressa', href: '/servicos/design', price: '490-2.500 €', status: 'live' },
      { key: 'social', label: 'Conteúdo & Marketing', sub: 'Conteúdo que serve o resultado', href: '/servicos/social', status: 'live' },
    ],
  },
]

/** Os planos ficam fora das famílias: é o recorrente que sustenta tudo o resto (regra R4). */
export const PLANS_LINK = {
  key: 'plans',
  label: 'Planos Mensais',
  sub: 'A parceria que faz o negócio crescer',
  href: '/servicos/planos-mensais',
  price: 'desde 149 €/mês',
  status: 'live' as ServiceStatus,
}

export const ALL_SERVICES: Service[] = FAMILIES.flatMap((f) => f.services)

/** Só o que tem página. Usado pela navegação e pelo sitemap — nunca gera 404. */
export const LIVE_SERVICES: Service[] = ALL_SERVICES.filter((s) => s.status === 'live')

/** A família a que um serviço pertence, para mostrar primeiro os seus irmãos. */
export function familyOf(serviceKey: string): ServiceFamily | undefined {
  return FAMILIES.find((f) => f.services.some((s) => s.key === serviceKey))
}
