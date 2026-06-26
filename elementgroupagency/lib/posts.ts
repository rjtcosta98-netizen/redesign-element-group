// Placeholder blog data — pronto para trocar por um fetch ao Supabase/CMS.
// TODO: const { data: POSTS } = await supabase.from('posts').select('*').order('date', { ascending: false })

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string // ISO (YYYY-MM-DD)
  readingMinutes: number
  service?: { label: string; href: string } // CTA contextual
  body: Block[]
}

export const CATEGORIES = ['Todos', 'SEO', 'Websites', 'Social Media', 'Negócio'] as const

export const POSTS: Post[] = [
  {
    slug: 'seo-local-top-3-google-maps',
    title: 'SEO local: como chegar ao Top 3 do Google Maps',
    excerpt: 'Quem procura “perto de mim” decide em segundos. Eis como pôr o teu negócio à frente no mapa.',
    category: 'SEO',
    date: '2026-06-20',
    readingMinutes: 6,
    service: { label: 'Ver o serviço de SEO', href: '/servicos/seo' },
    body: [
      { type: 'p', text: 'Quando alguém pesquisa “canalizador perto de mim” ou “cabeleireiro em Viseu”, o Google mostra um mapa com três resultados em destaque. É ali — no chamado “local pack” — que se decide quem recebe a chamada. E raramente é quem está na quarta posição.' },
      { type: 'h2', text: 'Porque é que o Top 3 do Maps muda tudo' },
      { type: 'p', text: 'A maioria dos cliques em pesquisas locais fica nos três primeiros resultados. Aparecer ali não é vaidade — é a diferença entre o telefone tocar ou não. E, ao contrário dos anúncios, não pagas por cada clique.' },
      { type: 'h2', text: 'O que realmente pesa no ranking local' },
      { type: 'ul', items: [
        'Um Perfil de Empresa do Google completo e otimizado (categorias, horário, fotos, serviços).',
        'Avaliações recentes e respondidas — quantidade e consistência contam.',
        'Coerência do nome, morada e telefone (NAP) em todo o lado.',
        'Um site rápido e com SEO local nas páginas certas.',
      ] },
      { type: 'h2', text: 'Por onde começar hoje' },
      { type: 'p', text: 'Reclama e completa o teu Perfil de Empresa, pede avaliações a clientes satisfeitos e garante que a tua morada está igual no site, no Maps e nas redes. São passos pequenos com impacto grande — e a base de qualquer estratégia de SEO local.' },
    ],
  },
  {
    slug: 'velocidade-site-perder-clientes',
    title: 'A velocidade do teu site está a custar-te clientes',
    excerpt: 'Cada segundo a mais de carregamento afasta visitantes. Porque a performance é a base de tudo.',
    category: 'Websites',
    date: '2026-06-12',
    readingMinutes: 5,
    service: { label: 'Ver o serviço de Websites', href: '/servicos/web' },
    body: [
      { type: 'p', text: 'Tens três segundos. É mais ou menos o tempo que um visitante dá ao teu site antes de desistir. Se carrega devagar, a pessoa sai — e provavelmente vai parar à concorrência.' },
      { type: 'h2', text: 'Velocidade é dinheiro, não detalhe técnico' },
      { type: 'p', text: 'Sites lentos convertem menos e aparecem mais abaixo no Google (a velocidade é fator de ranking). Ou seja, um site lento perde clientes duas vezes: afasta quem chega e dificulta que mais gente chegue.' },
      { type: 'h2', text: 'O que costuma travar um site' },
      { type: 'ul', items: [
        'Imagens enormes, sem otimização nem formatos modernos (WebP).',
        'Excesso de plugins e código pesado a carregar em cada página.',
        'Alojamento barato e partilhado, lento nas horas de ponta.',
        'Falta de cache e de boas práticas de performance.',
      ] },
      { type: 'h2', text: 'A boa notícia' },
      { type: 'p', text: 'Performance trata-se à nascença. Os sites que faço arrancam com PageSpeed 95+ por defeito — imagens otimizadas, código limpo e alojamento à altura. Não é um extra: é a base.' },
    ],
  },
  {
    slug: 'redes-ativas-sem-perder-tempo',
    title: 'Como manter as redes ativas sem perder o dia nisso',
    excerpt: 'Presença consistente não exige horas por dia — exige sistema. Eis o meu.',
    category: 'Social Media',
    date: '2026-06-04',
    readingMinutes: 4,
    service: { label: 'Ver o serviço de Social Media', href: '/servicos/social' },
    body: [
      { type: 'p', text: 'O erro mais comum nas redes de um negócio não é publicar mal — é publicar a espaços. Três posts numa semana, depois um mês de silêncio. Quem te visita fica sem saber se ainda existes.' },
      { type: 'h2', text: 'Consistência ganha à perfeição' },
      { type: 'p', text: 'Mais vale um post simples todas as semanas do que um post perfeito de vez em quando. O algoritmo (e os teus clientes) premeiam quem aparece com regularidade.' },
      { type: 'h2', text: 'O sistema em três passos' },
      { type: 'ul', items: [
        'Planeia o mês de uma vez: um calendário com temas evita o bloqueio do “o que publico hoje?”.',
        'Cria em lote: faz vários posts de seguida em vez de um por dia.',
        'Agenda e esquece: deixa tudo programado e liberta a tua cabeça.',
      ] },
      { type: 'h2', text: 'Ou então delega' },
      { type: 'p', text: 'Se nem isto te apetece, é exatamente para isso que existe a gestão de redes: tu aprovas, eu trato do resto. As redes ativas, sem te roubarem o dia.' },
    ],
  },
  {
    slug: 'presenca-online-pme-por-onde-comecar',
    title: 'Presença online para PMEs: por onde começar (e por onde não)',
    excerpt: 'Site, SEO, redes, anúncios… A ordem certa poupa-te dinheiro e dores de cabeça.',
    category: 'Negócio',
    date: '2026-05-28',
    readingMinutes: 7,
    service: { label: 'Ver todos os serviços', href: '/#servicos' },
    body: [
      { type: 'p', text: 'Muitos negócios começam a sua presença online ao contrário: gastam em anúncios e redes antes de terem uma base sólida. É como pôr clientes à porta de uma loja que ainda não tem montra.' },
      { type: 'h2', text: 'A ordem que faz sentido' },
      { type: 'ul', items: [
        'Primeiro, o site: é a tua casa, onde tens controlo total e para onde tudo aponta.',
        'Depois, o SEO: faz com que te encontrem no Google de forma gratuita e duradoura.',
        'A seguir, as redes: mantêm-te presente e credível junto de quem já te conhece.',
        'Por fim, anúncios: aceleram, mas só compensam quando o resto já está a funcionar.',
      ] },
      { type: 'h2', text: 'Porque é que a ordem importa' },
      { type: 'p', text: 'Investir em tráfego (anúncios, redes) antes de ter um bom site é deitar dinheiro fora: trazes pessoas para um sítio que não converte. Constrói a base primeiro e cada euro seguinte rende muito mais.' },
      { type: 'h2', text: 'O essencial' },
      { type: 'p', text: 'Não precisas de fazer tudo ao mesmo tempo. Precisas de fazer pela ordem certa, ao teu ritmo. Se quiseres, ajudo-te a desenhar esse caminho — sem te empurrar o que não precisas.' },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function relatedPosts(slug: string, n = 3): Post[] {
  return POSTS.filter((p) => p.slug !== slug).slice(0, n)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
}
