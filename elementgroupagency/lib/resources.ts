// Placeholder resources — pronto para trocar por um fetch ao Supabase.
// TODO: const { data } = await supabase.from('resources').select('*')
// 'gated' = exige email; recursos livres ('gated:false') ligam a conteúdo real (ex.: artigos do blog).

export type ResType = 'Guia' | 'Checklist' | 'Template' | 'Ferramenta'

export type Resource = {
  slug: string
  title: string
  description: string
  type: ResType
  theme: string
  gated: boolean
  href?: string // recursos livres apontam para conteúdo real (blog, etc.)
  preview?: string[]     // amostra real do conteúdo (teaser do recurso em destaque)
  previewTotal?: number  // total de pontos do recurso (ex.: 20) — alimenta o "+N com email"
}

export const RES_TYPES = ['Todos', 'Guia', 'Checklist', 'Template', 'Ferramenta'] as const

export const RESOURCES: Resource[] = [
  {
    slug: 'checklist-site-converte',
    title: 'Checklist: 20 pontos para um site que converte',
    description: 'O que validar antes (e depois) de pôr o teu site no ar — de velocidade a chamadas à ação.',
    type: 'Checklist',
    theme: 'Websites',
    gated: true,
    previewTotal: 20,
    preview: [
      'Proposta de valor clara nos primeiros 3 segundos',
      'Botão de ação (CTA) visível logo, sem fazer scroll',
      'Tudo perfeito no telemóvel — onde estão os teus clientes',
      'Carrega em menos de 2,5s (PageSpeed 90+)',
      'Provas sociais à vista: avaliações e casos reais',
      'Telefone / WhatsApp clicável em qualquer página',
      'Formulário curto — só os campos mesmo essenciais',
      'Texto focado em benefícios, não em características',
    ],
  },
  {
    slug: 'guia-seo-local',
    title: 'Como aparecer no Top 3 do Google Maps',
    description: 'O guia prático de SEO local para PMEs — o que pesa no ranking e por onde começar.',
    type: 'Guia',
    theme: 'SEO',
    gated: false,
    href: '/blog/seo-local-top-3-google-maps',
  },
  {
    slug: 'template-calendario-conteudo',
    title: 'Template: calendário de conteúdo mensal',
    description: 'Planeia um mês inteiro de posts em minutos, sem o bloqueio do “o que publico hoje?”.',
    type: 'Template',
    theme: 'Social Media',
    gated: true,
  },
  {
    slug: 'guia-velocidade-site',
    title: 'Porque a velocidade do site te faz perder clientes',
    description: 'O que trava um site, porque o Google penaliza, e como resolver à nascença.',
    type: 'Guia',
    theme: 'Websites',
    gated: false,
    href: '/blog/velocidade-site-perder-clientes',
  },
  {
    slug: 'checklist-lancamento',
    title: 'Checklist: lançar um website sem esquecer nada',
    description: 'Domínio, SEO, analytics, backups — tudo no sítio antes do “go-live”.',
    type: 'Checklist',
    theme: 'Websites',
    gated: true,
  },
  {
    slug: 'ferramenta-orcamento',
    title: 'Calculadora de orçamento de website',
    description: 'Estima o investimento do teu projeto em 2 minutos, sem compromisso.',
    type: 'Ferramenta',
    theme: 'Negócio',
    gated: true,
  },
]
