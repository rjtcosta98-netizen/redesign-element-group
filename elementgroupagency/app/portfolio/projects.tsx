import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

// ── Fonte única de verdade do portefólio ───────────────────────────────────
// Honestidade: apenas projetos e factos reais. As métricas são factos verificáveis
// (PageSpeed, posição no Google) — sem números por-cliente inventados.
// Para adicionar um projeto, basta acrescentar um objeto a PROJECTS.
// (Pronto para migrar para o Supabase: trocar PROJECTS por um fetch.)

export type ProjectKind = 'store' | 'web' | 'seo' | 'social'
export type AccentKey = 'sapphire' | 'green' | 'lilac' | 'gold'

export type Project = {
  slug: string
  client: string
  category: string
  kind: ProjectKind
  accent: AccentKey
  year: string
  url?: string
  urlLabel?: string
  summary: string                 // uma linha (cartões)
  intro: string                   // parágrafo (masthead do caso)
  challenge: string
  challengeHeadline?: string                                            // headline do "O desafio" (estilo PainPoints)
  challengePoints?: { pain: string; cost: string }[]                     // dores concretas do ponto de partida
  solution: string
  approach?: { title: string; desc: string }[]                          // frentes de ataque (glow-cards)
  scope: string[]
  highlights: { metric: string; label: string }[]
  before?: { label: string; icon: ReactNode }[]                          // estado "antes" (fluxo antes → Element Group → depois)
  engineChips?: string[]                                                  // o que a Element Group fez (chips do motor)
  resultLine?: string                                                    // frase-resultado (H1 do hero do caso)
  servicesUsed?: { label: string; href: string }[]                       // serviços usados (cross-link)
  snapshot?: { industria: string; desafio: string; resultado: string }   // caixa-resumo (ficha rápida)
  quote?: { text: string; author: string; role: string; url?: string; avatar?: string }   // citação real do cliente
  quotes?: { text: string; author: string; role: string; url?: string; avatar?: string }[] // vários testemunhos (grelha)
  googleCard?: { query: string; brandInitial: string; domain: string; title: string; desc: string; rank?: string }  // capa "resultado Google" (SEO), data-driven
  cover: { src?: string; alt: string; frame?: 'browser' | 'plain' | 'phone' }   // sem src e sem googleCard → capa branded (placeholder); frame 'plain' = sem cromo; frame 'phone' = moldura de telemóvel (apps mobile-first)
  showcase?: { desktop?: string; mobile?: string }   // mockups desktop + telemóvel ("Por dentro do projeto"); desktop omitido → só telemóvel (apps mobile-first)
  gallery?: { src: string; alt: string; frame?: 'browser' | 'plain' | 'phone' }[]   // frame 'plain' = moldura branded; frame 'phone' = iPhone mockup (mobile screenshots)
  seoKeywords?: string[]   // termos extra para meta keywords + schema — específicos ao nicho/caso (ex: "criar loja online Portugal")
}

// Acentos por categoria — o mesmo sistema das páginas de serviço.
export const ACCENTS: Record<AccentKey, CSSProperties> = {
  sapphire: { '--accent-rgb': '127 168 217', '--accent': '#7FA8D9', '--accent-deep': '#2f4f7a', '--accent-mid': '#4f7fb8', '--accent-light': '#bcd6f0' },
  green:    { '--accent-rgb': '111 179 154', '--accent': '#6FB39A', '--accent-deep': '#2f6b58', '--accent-mid': '#4f8f7a', '--accent-light': '#bfe6d8' },
  lilac:    { '--accent-rgb': '169 138 212', '--accent': '#A98AD4', '--accent-deep': '#543f7d', '--accent-mid': '#7d63ad', '--accent-light': '#ddccf0' },
  gold:     { '--accent-rgb': '215 176 116', '--accent': '#D7B074', '--accent-deep': '#7a5a2e', '--accent-mid': '#b08a4f', '--accent-light': '#f0ddbf' },
} as Record<AccentKey, CSSProperties>

export const PROJECTS: Project[] = [
  {
    slug: 'apiarios-terras-da-pulga',
    client: 'Apiários Terras da Pulga',
    category: 'Website & Loja Online',
    kind: 'store',
    accent: 'sapphire',
    year: '2026',
    url: 'https://apiariosterrasdapulga.pt',
    urlLabel: 'apiariosterrasdapulga.pt',
    summary: 'Loja online à medida que esgotou o stock de mel em menos de 1 mês.',
    intro:
      'Mel de qualidade e clientes fiéis — mas vendas presas à zona e sem qualquer loja online para crescer. Foi esse o ponto de partida.',
    challenge:
      'Tens um produto que as pessoas adoram, mas só quem está perto o conhece? Era a realidade da Apiários. O mel vendia-se bem na zona, mas sem loja online não havia forma de receber encomendas do resto do país — e cada cliente que podia vir de fora ficava por concretizar.',
    challengeHeadline: 'Um mel excelente — que só a sua zona conhecia.',
    challengePoints: [
      { pain: 'Vendia bem localmente, mas sem loja online não havia forma de receber encomendas do resto do país.', cost: 'Cada cliente de fora ficava por concretizar.' },
      { pain: 'A qualidade do mel não se via online — não existia montra digital à altura do produto.', cost: 'O produto valia mais do que parecia.' },
      { pain: 'Todo o crescimento dependia do passa-palavra na zona.', cost: 'O alcance do negócio parava nos limites locais.' },
    ],
    solution:
      'Criámos um website à medida com loja online integrada — catálogo, carrinho e checkout simples — ultra-rápido (PageSpeed 95+) e otimizado para o Google. Tratámos do domínio e do alojamento; ao cliente ficou apenas a gestão das encomendas. Do design ao lançamento, a loja ficou online em março de 2026.',
    approach: [
      { title: 'Loja online à medida', desc: 'Catálogo, carrinho e checkout simples — para vender 24/7 e sem comissões de marketplace. Resolveu a falta de uma forma de receber encomendas.' },
      { title: 'Velocidade & SEO técnico', desc: 'Site ultra-rápido (PageSpeed 95+) e otimizado para o Google — para ser encontrado em todo o país, não só na zona.' },
      { title: 'Domínio & alojamento tratados', desc: 'Tratámos de toda a parte técnica e do lançamento; ao cliente ficou apenas a gestão das encomendas.' },
    ],
    scope: [
      'Website institucional à medida',
      'Loja online (e-commerce)',
      'Catálogo, carrinho e checkout',
      'SEO técnico base',
      'Domínio + alojamento tratados',
      'Design 100% responsivo',
    ],
    highlights: [
      { metric: '< 1 mês', label: 'para esgotar todo o stock de mel' },
      { metric: 'Nacional', label: 'de só local a vender em todo o país' },
      { metric: '0%', label: 'comissões — a loja é 100% dele' },
    ],
    before: [
      { label: 'Sem loja online', icon: (<><path d="M3 3h18v5H3z" /><path d="M5 8v12h14V8" /><path d="m3 3 18 18" /></>) },
      { label: 'Só vendas locais', icon: (<><path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>) },
      { label: 'Zero presença online', icon: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path d="m3 3 18 18" /></>) },
    ],
    engineChips: ['Loja online', 'Velocidade', 'SEO'],
    resultLine: 'Como a Apiários Terras da Pulga esgotou o stock de mel em menos de 1 mês',
    servicesUsed: [
      { label: 'Criação de Websites & Lojas Online', href: '/servicos/web' },
      { label: 'SEO técnico', href: '/servicos/seo' },
    ],
    snapshot: {
      industria: 'Produção de mel · E-commerce',
      desafio: 'Vendia só localmente, sem loja online',
      resultado: 'Partindo de zero presença online, esgotou o stock de mel em menos de 1 mês e passou de vendas locais a clientes em todo o país',
    },
    quote: {
      text: 'Recomendo totalmente o trabalho realizado na criação do meu site. Destaco o profissionalismo, a rapidez na execução e a excelente capacidade de transformar ideias em processos claros, simples e eficazes. Todo o desenvolvimento foi conduzido com grande organização, comunicação eficiente e foco na solução — com elevada qualidade técnica e prazos cumpridos de forma impressionante. Uma escolha segura para quem procura eficiência, rigor e resultados.',
      author: 'Ricardo Jesus',
      role: 'CEO · Apiários Terras da Pulga',
      url: 'https://share.google/qB5D6JJPnBSaANZIb',
      avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/rj.jpg',
    },
    cover: { src: '/Projetos/apiariospulga.jpg', alt: 'Website Apiários Terras da Pulga, criado pela Element Group' },
    showcase: { desktop: '/Projetos/apiariospulga.jpg', mobile: '/Projetos/apiariosmobile.png' },
    gallery: [
      { src: '/Projetos/apiarios-loja.jpg', alt: 'Loja online Apiários Terras da Pulga — catálogo de produtos' },
    ],
  },
  {
    slug: 'maria-mendes-massagens',
    client: 'Maria Mendes Massagens',
    category: 'SEO Local & Landing Page',
    kind: 'seo',
    accent: 'green',
    year: '2026',
    url: 'https://mariamendesmassagens.pt',
    urlLabel: 'mariamendesmassagens.pt',
    summary: 'De invisível no Google a #1 da sua zona — com a agenda esgotada até setembro.',
    intro:
      'Um serviço de massagens de relaxamento em São Romão (Seia), sem site e invisível no Google. O ponto de partida: ser encontrada por quem procura na zona, no momento exato da decisão.',
    challenge:
      'Quem oferece um serviço local vive de aparecer no Google quando procuram perto. A Maria Mendes não tinha site nem ficha de negócio — era invisível. Cada pesquisa de «massagens em Seia» terminava na concorrência, mesmo com um serviço de excelência.',
    challengeHeadline: 'Um serviço de excelência — que ninguém encontrava no Google.',
    challengePoints: [
      { pain: 'Sem site e sem ficha no Google, era praticamente invisível para quem procurava massagens na zona.', cost: 'Cada pesquisa local terminava na concorrência.' },
      { pain: 'Todo o negócio dependia do passa-palavra e das redes sociais.', cost: 'Sem pesquisa, o crescimento tinha um teto.' },
      { pain: 'Quem procurava no momento de decidir simplesmente não a encontrava.', cost: 'Clientes prontos a marcar ficavam por captar.' },
    ],
    solution:
      'Construímos uma landing page rápida e focada em conversão e trabalhámos o SEO local de raiz: criámos e otimizámos a ficha Google Business, produzimos conteúdo orientado às pesquisas certas e garantimos um site ultra-rápido (PageSpeed 95+). O resultado é a posição de topo para as pesquisas que realmente trazem clientes. Online em abril de 2026.',
    approach: [
      { title: 'Landing page de conversão', desc: 'Uma página rápida e clara, pensada para transformar quem chega em marcação — serviços, confiança e contacto à mão. Resolveu a ausência total de presença online.' },
      { title: 'Ficha Google Business de raiz', desc: 'Criámos e otimizámos a ficha de negócio — para aparecer no Google Maps e nas pesquisas locais, exatamente onde os clientes procuram.' },
      { title: 'SEO local & conteúdo certo', desc: 'Conteúdo orientado às pesquisas reais da zona («massagens são romão», «massagens seia») — para chegar ao topo de quem decide perto.' },
    ],
    scope: [
      'Landing page à medida',
      'SEO local',
      'Ficha Google Business',
      'Conteúdo otimizado para pesquisa',
      'Site rápido (PageSpeed 95+)',
      'Design 100% responsivo',
    ],
    highlights: [
      { metric: '#1', label: 'no Google para «massagens são romão»' },
      { metric: 'Top 1', label: 'no Google Maps da zona' },
      { metric: 'Esgotada', label: 'agenda cheia até setembro de 2026' },
    ],
    before: [
      { label: 'Sem site', icon: (<><path d="M3 3h18v5H3z" /><path d="M5 8v12h14V8" /><path d="m3 3 18 18" /></>) },
      { label: 'Invisível no Google', icon: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path d="m3 3 18 18" /></>) },
      { label: 'Só passa-palavra', icon: (<><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" /></>) },
    ],
    engineChips: ['Landing page', 'Ficha Google', 'SEO local'],
    resultLine: 'Como a Maria Mendes Massagens passou de invisível no Google a #1 da sua zona',
    servicesUsed: [
      { label: 'SEO local & otimização Google', href: '/servicos/seo' },
      { label: 'Criação de Websites & Landing Pages', href: '/servicos/web' },
    ],
    snapshot: {
      industria: 'Massagens & bem-estar · Serviço local',
      desafio: 'Sem site e invisível no Google',
      resultado: 'Partindo de zero presença online, chegou a #1 no Google da sua zona, ao Top 1 do Google Maps e à agenda esgotada até setembro de 2026',
    },
    quote: {
      text: 'Desde a primeira abordagem até ao conceito que pretendia foi super rápido e o trabalho realizado com excelência e muito profissionalismo. Recomendo. Serviço premium. Obrigado!',
      author: 'Maria Mendes',
      role: 'Fundadora · Maria Mendes Massagens',
      url: 'https://share.google/yHF8iJo8yG6J85Ybv',
      avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/maria-mendes.png',
    },
    googleCard: {
      query: 'massagens são romão',
      brandInitial: 'M',
      domain: 'mariamendesmassagens.pt',
      title: 'Maria Mendes — Massagens de Relaxamento · São Romão',
      desc: 'Massagens de relaxamento em Seia. Reserve o seu momento de bem-estar — corporais, faciais, aromaterapia, pedras quentes e mais.',
      rank: '#1',
    },
    cover: { alt: 'Resultado nº 1 no Google para Maria Mendes Massagens' },
    showcase: { desktop: '/Projetos/mariamendes/mariamendespc.png', mobile: '/Projetos/mariamendes/mariamendesmob.png' },
  },
  {
    slug: 'matias-nature',
    client: 'Matias Nature',
    category: 'Website & SEO · Alojamento Local',
    kind: 'web',
    accent: 'green',
    year: '2025',
    summary: 'De 20% para 55% de ocupação média — e 40% de reservas diretas, sem comissões.',
    intro:
      'Três alojamentos na Serra da Estrela (Casa do Pastor, Casa do Forno e Raízes da Vinha), reféns das plataformas de reserva e perdidos entre milhares de anúncios. O objetivo: presença própria e reservas diretas.',
    challenge:
      'Dependência total dos canais de reserva, que cobram comissões pesadas e diluem a marca no meio de milhares de alojamentos. Sem site próprio nem visibilidade no Google, cada reserva custava margem — e nenhuma relação era com o hóspede.',
    challengeHeadline: 'Reservas dependentes de plataformas que comem a margem.',
    challengePoints: [
      { pain: 'Dependência total dos canais de reserva, que cobram comissões pesadas em cada noite.', cost: 'Cada reserva custava margem.' },
      { pain: 'Sem site próprio nem visibilidade no Google, os alojamentos perdiam-se entre milhares de anúncios.', cost: 'A marca não existia — só o anúncio.' },
      { pain: 'Zero reservas diretas — nenhuma relação era com o hóspede.', cost: 'Sem dados nem clientes recorrentes.' },
    ],
    solution:
      'Criámos um website próprio para os três alojamentos — página inicial, a história de cada casa, motor de reservas próprio e um blog 100% otimizado para quem procura alojamento na Serra da Estrela. Criámos e otimizámos o Google My Business de cada casa (Casa do Pastor, Casa do Forno e Raízes da Vinha). O objetivo: ser encontrado no Google e receber reservas diretas, sem comissões.',
    approach: [
      { title: 'Motor de reservas próprio', desc: 'Reservas diretas no site — sem comissões de plataformas. Resolveu a dependência total dos canais externos.' },
      { title: 'SEO & blog para a Serra da Estrela', desc: 'Conteúdo e blog otimizados para quem procura alojamento na zona — para aparecer no Google em vez de ficar perdido entre milhares de anúncios.' },
      { title: 'Google My Business por alojamento', desc: 'Ficha criada e otimizada para cada casa (Casa do Pastor, Casa do Forno, Raízes da Vinha) — visibilidade local no Maps e na pesquisa.' },
    ],
    scope: [
      'Website à medida (3 alojamentos)',
      'Motor de reservas próprio',
      'Blog otimizado (SEO)',
      'Google My Business (×3)',
      'SEO local Serra da Estrela',
      'Design 100% responsivo',
    ],
    highlights: [
      { metric: '20% → 55%', label: 'ocupação média anual por alojamento' },
      { metric: 'Top 3', label: 'no Google para «alojamentos Serra da Estrela»' },
      { metric: '40%', label: 'reservas diretas (eram 0%)' },
    ],
    before: [
      { label: 'Dependente de plataformas', icon: (<><path d="M9 17H7A5 5 0 0 1 7 7h2" /><path d="M15 7h2a5 5 0 0 1 0 10h-2" /><path d="M8 12h8" /></>) },
      { label: 'Invisível no Google', icon: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path d="m3 3 18 18" /></>) },
      { label: '0% reservas diretas', icon: (<><path d="m19 5-14 14" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></>) },
    ],
    engineChips: ['Motor de reservas', 'SEO', 'Google My Business'],
    resultLine: 'Como a Matias Nature passou de 20% para 55% de ocupação — com 40% de reservas diretas',
    servicesUsed: [
      { label: 'Criação de Websites', href: '/servicos/web' },
      { label: 'SEO local', href: '/servicos/seo' },
    ],
    snapshot: {
      industria: 'Alojamento local · Turismo',
      desafio: 'Dependente de plataformas, invisível no Google',
      resultado: 'Subiu a ocupação média de 20% para 55% por alojamento, chegou ao Top 3 do Google para «alojamentos Serra da Estrela» e passou a 40% de reservas diretas (eram 0%)',
    },
    cover: { src: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/c0/79/3c/piscina-partilhada.jpg?w=900&h=-1&s=1', alt: 'Matias Nature — piscina partilhada nos alojamentos da Serra da Estrela', frame: 'plain' },
  },
  {
    slug: 'football-nation-store',
    client: 'Football Nation Store',
    category: 'Loja Online · E-commerce',
    kind: 'store',
    accent: 'sapphire',
    year: '2026',
    url: 'https://footballnationstore.pt',
    urlLabel: 'footballnationstore.pt',
    summary: 'De vendas só por Instagram a uma loja online com encomendas, pagamentos e envios automáticos.',
    intro:
      'Uma loja de merchandising de futebol que vivia só do Instagram — sem loja online nem visibilidade no Google. O objetivo: vender 24/7 com tudo automatizado.',
    challenge:
      'Todas as vendas passavam por mensagens no Instagram: encomendas manuais, pagamentos combinados à mão e zero presença no Google. Cada venda dava trabalho — e muitos clientes ficavam pelo caminho.',
    challengeHeadline: 'Uma loja que só existia nas DMs do Instagram.',
    challengePoints: [
      { pain: 'Todas as encomendas eram tratadas à mão por mensagem no Instagram.', cost: 'Processo lento e propenso a erros.' },
      { pain: 'Sem loja online, não havia pagamentos nem envios automáticos.', cost: 'Cada venda exigia trabalho manual.' },
      { pain: 'Zero visibilidade no Google — só quem já seguia o Instagram comprava.', cost: 'O alcance parava nos seguidores.' },
    ],
    solution:
      'Criámos uma loja online completa com receção de encomendas, pagamentos e envios automatizados — para vender 24/7 sem trabalho manual. O site ficou otimizado para o Google, dando visibilidade que antes não existia. Online em abril de 2026.',
    approach: [
      { title: 'E-commerce automatizado', desc: 'Encomendas, pagamentos e envios tratados automaticamente — fim do processo manual por DM.' },
      { title: 'Visibilidade no Google', desc: 'Loja otimizada para pesquisa — para ser encontrada por quem procura merch, não só pelos seguidores do Instagram.' },
      { title: 'Montra à altura do produto', desc: 'Catálogo e checkout simples, design responsivo — uma loja credível que converte visitas em vendas.' },
    ],
    scope: [
      'Loja online (e-commerce)',
      'Receção de encomendas automática',
      'Pagamentos integrados',
      'Envios automatizados',
      'SEO técnico base',
      'Design 100% responsivo',
    ],
    highlights: [
      { metric: '24/7', label: 'vendas automáticas, sem trabalho manual' },
      { metric: 'Google', label: 'visibilidade nova na pesquisa' },
      { metric: '100%', label: 'encomendas e pagamentos automatizados' },
    ],
    before: [
      { label: 'Só vendas por Instagram', icon: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" /></>) },
      { label: 'Encomendas manuais', icon: (<><path d="M9 11V6a3 3 0 0 1 6 0v5" /><path d="M5 11h14l-1 9H6l-1-9Z" /></>) },
      { label: 'Invisível no Google', icon: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path d="m3 3 18 18" /></>) },
    ],
    engineChips: ['Loja online', 'Automação', 'SEO'],
    resultLine: 'Como a Football Nation Store passou de vender por DM a uma loja online automática',
    servicesUsed: [
      { label: 'Criação de Lojas Online', href: '/servicos/web' },
      { label: 'SEO técnico', href: '/servicos/seo' },
    ],
    snapshot: {
      industria: 'Merchandising de futebol · E-commerce',
      desafio: 'Vendia só por Instagram, sem loja nem Google',
      resultado: 'Passou de encomendas manuais por DM a uma loja online com pagamentos e envios automáticos, e ganhou visibilidade no Google que antes não tinha',
    },
    quote: {
      text: 'Excelente profissional, bastante atencioso, simpático e empenhado no trabalho, com grandes capacidades de oferecer o melhor aos clientes. Muito paciente e sempre atento ao nosso gosto — foi uma grande ajuda para o nosso negócio, sem dúvida. Muito obrigado!',
      author: 'Mariana Mendes',
      role: 'Football Nation Store',
      url: 'https://share.google/awtBuG1kQOQzGLqaF',
      avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/mariana-mendes.jpg',
    },
    cover: { src: '/Projetos/football/footballnationweb.png', alt: 'Loja online Football Nation Store — merchandising de futebol' },
    showcase: { desktop: '/Projetos/football/footballnationweb.png', mobile: '/Projetos/football/footballnationmob.png' },
  },
  {
    slug: 'ad-sao-romao',
    client: 'AD São Romão',
    category: 'Website Institucional · Clube',
    kind: 'web',
    accent: 'sapphire',
    year: '2025',
    url: 'https://adsaoromao.pt',
    urlLabel: 'adsaoromao.pt',
    summary: 'A presença digital completa do clube: jogadores, sócios, merch e patrocínios num só lugar.',
    intro:
      'A Associação Desportiva de São Romão vivia 100% dependente do Facebook. O objetivo: uma casa digital própria para dar a conhecer o clube, angariar jogadores e sócios, vender merch e atrair patrocínios.',
    challenge:
      'Toda a informação do clube estava dispersa no Facebook, em posts que se perdiam no feed. Sem casa própria, não havia forma estruturada de inscrever jogadores, angariar sócios, vender merch ou atrair patrocinadores.',
    challengeHeadline: 'Um clube com história — preso a posts no Facebook.',
    challengePoints: [
      { pain: 'Toda a informação vivia dispersa no Facebook, em posts que se perdiam no feed.', cost: 'Adeptos e sócios não encontravam o que procuravam.' },
      { pain: 'Sem site, não havia forma estruturada de inscrever jogadores nem angariar sócios.', cost: 'Crescimento do clube travado.' },
      { pain: 'Nenhum canal para vender merch ou atrair patrocinadores.', cost: 'Fontes de receita por explorar.' },
    ],
    solution:
      'Criámos a presença digital completa da AD São Romão: um website que dá a conhecer o clube, permite inscrições de jogadores para todos os escalões, angariação de sócios, venda de merchandising e angariação de fundos através de patrocínios digitais — com toda a informação sincronizada num só lugar, sem andar à procura no Facebook.',
    approach: [
      { title: 'Casa digital do clube', desc: 'Toda a informação sincronizada num só sítio — história, escalões, notícias e contactos. Fim da dispersão no Facebook.' },
      { title: 'Inscrições & sócios', desc: 'Inscrição de jogadores para todos os escalões e angariação de sócios — de forma estruturada e simples.' },
      { title: 'Merch & patrocínios', desc: 'Venda de merchandising e patrocínios digitais — novas fontes de receita para o clube.' },
    ],
    scope: [
      'Website institucional à medida',
      'Inscrições de jogadores (escalões)',
      'Angariação de sócios',
      'Loja de merchandising',
      'Patrocínios digitais',
      'Design 100% responsivo',
    ],
    highlights: [
      { metric: '1 só lugar', label: 'toda a informação sincronizada (era no Facebook)' },
      { metric: '+Jogadores', label: 'inscrições por escalão, online' },
      { metric: '+Receita', label: 'sócios, merch e patrocínios digitais' },
    ],
    before: [
      { label: 'Dependente do Facebook', icon: (<><path d="M14 8h-2a2 2 0 0 0-2 2v12" /><path d="M8 13h6" /></>) },
      { label: 'Informação dispersa', icon: (<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>) },
      { label: 'Sem inscrições nem merch', icon: (<><circle cx="12" cy="12" r="9" /><path d="m15 9-6 6M9 9l6 6" /></>) },
    ],
    engineChips: ['Website', 'Inscrições', 'Merch & patrocínios'],
    resultLine: 'Como a AD São Romão saiu do Facebook para uma casa digital completa',
    servicesUsed: [
      { label: 'Criação de Websites', href: '/servicos/web' },
    ],
    snapshot: {
      industria: 'Clube de futebol · Associação',
      desafio: 'Dependente do Facebook, informação dispersa',
      resultado: 'Passou a ter uma presença digital própria com inscrições de jogadores, angariação de sócios, venda de merch e patrocínios digitais, tudo sincronizado num só lugar',
    },
    quotes: [
      {
        text: 'Reitero em meu nome e em nome da ADSR um enorme agradecimento, bem como a recomendação da Element Group, na pessoa do Ricardo Costa, pela competência e profissionalismo demonstrados na conceção deste projeto.',
        author: 'Rafael Figueiredo',
        role: 'Presidente · AD São Romão',
        avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/presi.png',
      },
      {
        text: 'Excelente trabalho na elaboração e no design, com elevados padrões de qualidade e adequação às temáticas abordadas! Um exemplo de empenho e dedicação ao trabalho. Parabéns pelo excelente trabalho!',
        author: 'Duarte Marvanejo',
        role: 'Presidente da Mesa da Assembleia Geral · ADSR',
        url: 'https://share.google/YF65yMiAW6Jt0hZTr',
        avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/duarte.jpg',
      },
      {
        text: 'Trabalho TOP na criação do site da Associação Desportiva de São Romão.',
        author: 'Jason Silva',
        role: 'Presidente do Conselho Fiscal · ADSR',
        url: 'https://share.google/f93lCrBiiuzQRjT2d',
        avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/jason-silva.png',
      },
    ],
    cover: { src: '/Projetos/adsr/adsrweb.png', alt: 'Website da Associação Desportiva de São Romão' },
    showcase: { desktop: '/Projetos/adsr/adsrweb.png', mobile: '/Projetos/adsr/adsrmob.png' },
  },
  {
    slug: 'bella-essencia-perfumaria',
    client: 'Bella Essência Perfumaria',
    category: 'Website & Loja Online',
    kind: 'store',
    accent: 'gold',
    year: '2026',
    url: 'https://bellaessenciaperfumaria.pt',
    urlLabel: 'bellaessenciaperfumaria.pt',
    summary: 'De loja física sem presença online a uma perfumaria com catálogo e encomendas em todo o país.',
    intro:
      'Uma perfumaria com produtos de qualidade e clientes fiéis — mas sem qualquer presença digital. O ponto de partida: abrir a loja ao país inteiro, com uma montra online à altura da experiência em loja.',
    challenge:
      'Ter um espaço físico cuidado e produtos selecionados não chega quando o cliente procura no Google e não encontra nada. A Bella Essência não tinha site nem loja online — cada cliente que pesquisava por perfumes ficava num concorrente digital.',
    challengeHeadline: 'Uma perfumaria com alma — que não existia no mundo digital.',
    challengePoints: [
      { pain: 'Sem site e sem loja online, era invisível para quem pesquisava perfumes fora da loja física.', cost: 'Vendas limitadas aos clientes que apareciam presencialmente.' },
      { pain: 'O catálogo de produtos não estava acessível online — ninguém sabia o que a loja tinha.', cost: 'Oportunidades de venda perdidas a cada pesquisa.' },
      { pain: 'Sem canal digital, a comunicação de promoções e lançamentos dependia apenas do passa-palavra.', cost: 'O crescimento estava limitado à zona local.' },
    ],
    solution:
      'Criámos um website à medida com loja online integrada — catálogo de perfumes, carrinho e checkout simples — com um design premium que transmite a experiência da loja física. Site ultra-rápido (PageSpeed 95+) e otimizado para o Google, para ser encontrado por quem procura perfumes online.',
    approach: [
      { title: 'Loja online premium', desc: 'Catálogo, carrinho e checkout pensados para vender 24/7 — com uma experiência visual à altura dos produtos. Resolveu a falta total de canal de vendas digital.' },
      { title: 'Design à altura da marca', desc: 'Uma estética premium que transmite a atmosfera da perfumaria física — para que o cliente sinta a qualidade antes de chegar à loja.' },
      { title: 'SEO & velocidade', desc: 'Site ultra-rápido (PageSpeed 95+) e otimizado para o Google — para ser encontrado por quem procura perfumes, dentro e fora da zona.' },
    ],
    scope: [
      'Website institucional à medida',
      'Loja online (e-commerce)',
      'Catálogo, carrinho e checkout',
      'Design premium',
      'SEO técnico base',
      'Design 100% responsivo',
    ],
    highlights: [
      { metric: 'Nacional', label: 'de só loja física a encomendas em todo o país' },
      { metric: '24/7', label: 'loja aberta sem depender de horário físico' },
      { metric: '0%', label: 'comissões — a loja é 100% dela' },
    ],
    before: [
      { label: 'Sem loja online', icon: (<><path d="M3 3h18v5H3z" /><path d="M5 8v12h14V8" /><path d="m3 3 18 18" /></>) },
      { label: 'Invisível no Google', icon: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path d="m3 3 18 18" /></>) },
      { label: 'Só clientes presenciais', icon: (<><path d="M12 21s-7-6.3-7-11a7 7 0 1 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>) },
    ],
    engineChips: ['Loja online', 'Design premium', 'SEO'],
    resultLine: 'Como a Bella Essência Perfumaria abriu ao país inteiro com uma loja online à medida',
    servicesUsed: [
      { label: 'Criação de Websites & Lojas Online', href: '/servicos/web' },
      { label: 'SEO técnico', href: '/servicos/seo' },
    ],
    snapshot: {
      industria: 'Perfumaria · E-commerce',
      desafio: 'Sem presença online, só vendas em loja física',
      resultado: 'Passou de zero presença digital a uma loja online premium com encomendas em todo o país, disponível 24/7 e sem comissões de marketplace',
    },
    quote: {
      text: 'Element Group, foi quem criou o meu website, mais concretamente o menino Ricardo, uma pessoa fantástica, simpático e muito profissional, que eu recomendo os seus serviços vivamente. Ele é muito atento aos pormenores, empenhado nas suas atividades e com bom gosto. O meu website está magnífico com classe e elegância. O meu muito obrigada ao Ricardo pelo empenho e ajuda.',
      author: 'Ana Bela',
      role: 'Fundadora · Bella Essência Perfumaria',
      url: 'https://share.google/gtHHJby1ZmWw2IOKa',
      avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/ana-bela.jpg',
    },
    seoKeywords: [
      'criar loja online Portugal',
      'loja online artesanato Portugal',
      'e-commerce pequena empresa Portugal',
      'website perfumaria online',
      'loja online sem comissões',
      'loja online 24 horas',
      'agência web PME Portugal',
      'criação loja online Seia',
      'website artesanato gesso',
      'e-commerce decoração feita à mão',
    ],
    cover: { src: '/Projetos/bellaessencia/bella-hero.png', alt: 'Homepage da loja online Bella Essência Perfumaria — Gesso. Textura. Cuidado.' },
    showcase: { desktop: '/Projetos/bellaessencia/bella-hero.png', mobile: '/Projetos/bellaessencia/bella-mob-hero.png' },
    gallery: [
      { src: '/Projetos/bellaessencia/bella-loja.png',          alt: 'Loja online Bella Essência — 37 produtos artesanais com filtro por categoria e preço', frame: 'browser' as const },
      { src: '/Projetos/bellaessencia/bella-mob-loja.png',      alt: 'Experiência de compra no telemóvel — loja Bella Essência otimizada para mobile', frame: 'phone' as const },
      { src: '/Projetos/bellaessencia/bella-sobre.png',         alt: 'Página Sobre Nós — Feito à mão. Entregue com alma. com foto da fundadora', frame: 'browser' as const },
      { src: '/Projetos/bellaessencia/bella-mob-categorias.png', alt: 'Navegação por coleções no mobile — Essências, Gesso, Scrapbook e Boticário', frame: 'phone' as const },
    ],
  },
  {
    slug: 'adsr-cup-app',
    client: 'AD São Romão',
    category: 'App Web · Resultados ao Vivo',
    kind: 'web',
    accent: 'sapphire',
    year: '2025',
    url: 'https://adsr-cup-2026.vercel.app',
    urlLabel: 'adsr-cup-2026.vercel.app',
    summary: 'App de resultados ao vivo para a ADSR CUP — classificações, marcadores e jogos em tempo real.',
    intro:
      'A AD São Romão organiza a ADSR CUP, um torneio de futebol com vários escalões. Os resultados chegavam por WhatsApp e posts dispersos no Facebook — sem um lugar central, atualizado e acessível a todos em tempo real.',
    challenge:
      'Organizar um torneio é uma operação complexa: jogos em simultâneo, resultados a atualizar, classificações a recalcular e adeptos à espera de novidades. Sem uma plataforma própria, tudo passava por mensagens manuais e posts no Facebook que rapidamente se perdiam no feed.',
    challengeHeadline: 'Um torneio ao vivo — com resultados à velocidade do WhatsApp.',
    challengePoints: [
      { pain: 'Resultados partilhados manualmente por WhatsApp e posts no Facebook, sem centralização.', cost: 'Informação dispersa e difícil de acompanhar para adeptos e participantes.' },
      { pain: 'Classificações calculadas à mão — demoradas e sujeitas a erro.', cost: 'Atualização lenta e pouco credível para os participantes.' },
      { pain: 'Sem uma plataforma própria, a imagem do torneio ficava presa a plataformas de terceiros.', cost: 'O torneio não tinha identidade digital própria.' },
    ],
    solution:
      'Criámos uma web app de resultados ao vivo para a ADSR CUP: jogos, resultados, classificações por grupo, marcadores e fases do torneio — tudo atualizado em tempo real e acessível a qualquer pessoa, no telemóvel ou no computador, sem instalar nada.',
    approach: [
      { title: 'Resultados ao vivo', desc: 'Resultados de todos os jogos atualizados em tempo real — acessíveis a adeptos, jogadores e organização num só lugar.' },
      { title: 'Classificações & marcadores automáticos', desc: 'Tabelas de classificação por grupo, lista de marcadores e fases do torneio calculadas automaticamente — sem trabalho manual nem erros.' },
      { title: 'App web sem instalação', desc: 'Acesso direto pelo browser em qualquer dispositivo — sem app store, sem instalação, partilhável por link.' },
    ],
    scope: [
      'Web app de resultados ao vivo',
      'Tabelas de classificação por grupo',
      'Lista de marcadores',
      'Fases e eliminatórias',
      'Painel de gestão do torneio',
      'Design 100% responsivo',
    ],
    highlights: [
      { metric: '5 escalões', label: 'Sub-8, Sub-10, Sub-12, Sub-14 e Sub-16 em tempo real' },
      { metric: 'Ao vivo', label: 'Live Match Center com marcador e eventos por jogo' },
      { metric: 'Sem app', label: 'web app acessível por qualquer browser, sem instalação' },
    ],
    before: [
      { label: 'Resultados por WhatsApp', icon: (<><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" /></>) },
      { label: 'Classificações manuais', icon: (<><path d="M9 11V6a3 3 0 0 1 6 0v5" /><path d="M5 11h14l-1 9H6l-1-9Z" /></>) },
      { label: 'Informação dispersa', icon: (<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>) },
    ],
    engineChips: ['Web app', 'Resultados ao vivo', 'Classificações automáticas'],
    resultLine: 'Como a ADSR CUP ganhou uma plataforma de resultados ao vivo — do WhatsApp à web app',
    servicesUsed: [
      { label: 'Criação de Websites', href: '/servicos/web' },
    ],
    snapshot: {
      industria: 'Futebol · Torneio · Clube',
      desafio: 'Resultados manuais por WhatsApp, sem plataforma central',
      resultado: 'O torneio passou a ter uma web app com resultados ao vivo, classificações automáticas e marcadores — acessível a qualquer pessoa pelo browser, em tempo real',
    },
    quote: {
      text: 'Reitero em meu nome e em nome da ADSR um enorme agradecimento, bem como a recomendação da Element Group, na pessoa do Ricardo Costa, pela competência e profissionalismo demonstrados na conceção deste projeto.',
      author: 'Rafael Figueiredo',
      role: 'Presidente · AD São Romão',
      avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/presi.png',
    },
    cover: { src: '/Projetos/adsrapp/adsr1.jpeg', alt: 'Live Match Center da ADSR CUP 2026 — resultados ao vivo', frame: 'phone' },
    showcase: { mobile: '/Projetos/adsrapp/adsr4.jpeg' },
    gallery: [
      { src: '/Projetos/adsrapp/adsr2.jpeg', alt: 'Melhores Marcadores por escalão — ADSR CUP 2026', frame: 'phone' as const },
      { src: '/Projetos/adsrapp/adsr5.jpeg', alt: 'Prémios individuais por escalão — ADSR CUP 2026', frame: 'phone' as const },
    ],
  },
  {
    slug: 'estrela-detail-wash',
    client: 'Estrela Detail Wash',
    category: 'Design & Branding',
    kind: 'web',
    accent: 'lilac',
    year: '2026',
    summary: 'Logótipo e identidade de marca de raiz para uma empresa de detailing automóvel.',
    intro:
      'Uma empresa de detailing e lavagem automóvel criada de raiz — sem logótipo nem identidade visual. O objetivo: uma marca premium, à altura do serviço.',
    challenge:
      'Uma empresa nova, sem qualquer identidade visual: sem logótipo, sem cores, sem marca reconhecível. Para um serviço premium, a falta de imagem profissional é a primeira barreira à confiança.',
    challengeHeadline: 'Um serviço premium — sem uma marca à altura.',
    challengePoints: [
      { pain: 'Empresa criada de raiz, sem logótipo nem identidade visual.', cost: 'Nada que a tornasse reconhecível.' },
      { pain: 'Sem uma imagem profissional, a confiança do cliente começava em desvantagem.', cost: 'O serviço premium não transparecia.' },
      { pain: 'Sem coerência visual entre suportes (redes, viatura, materiais).', cost: 'A marca não passava como uma.' },
    ],
    solution:
      'Criámos a identidade de marca de raiz: logótipo, paleta de cores e sistema visual coerente — uma imagem premium, à altura do serviço de detailing, pronta a aplicar em todos os suportes.',
    approach: [
      { title: 'Logótipo de raiz', desc: 'Conceito e logótipo desenhados do zero — uma marca reconhecível e memorável.' },
      { title: 'Sistema de identidade', desc: 'Paleta de cores, tipografia e elementos visuais coerentes — prontos para qualquer suporte.' },
      { title: 'Imagem premium', desc: 'Uma identidade à altura de um serviço de detailing premium — confiança à primeira vista.' },
    ],
    scope: [
      'Conceito de marca',
      'Design de logótipo',
      'Paleta de cores',
      'Sistema de identidade visual',
      'Aplicações da marca',
    ],
    highlights: [
      { metric: 'Marca', label: 'identidade criada de raiz' },
      { metric: 'Logótipo', label: 'conceito original e memorável' },
      { metric: 'Premium', label: 'imagem à altura do serviço' },
    ],
    resultLine: 'Como criámos a marca da Estrela Detail Wash de raiz',
    snapshot: {
      industria: 'Detailing automóvel · Marca nova',
      desafio: 'Empresa nova sem logótipo nem identidade',
      resultado: 'Ganhou uma identidade de marca completa criada de raiz — logótipo, cores e sistema visual premium, à altura do serviço',
    },
    quote: {
      text: 'Desde a primeira abordagem até ao conceito que pretendia foi super rápido e o trabalho realizado com excelência e muito profissionalismo. Recomendo. Serviço premium. Obrigado!',
      author: 'Gonçalo Nascimento',
      role: 'CEO · Estrela Detail & Wash',
      url: 'https://share.google/jd5Bb3OQu1Wge1d3B',
      avatar: 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/Avatars%20Reviews/goncalo%20-%20Edited.jpg',
    },
    cover: { src: '/Projetos/estreladetail/estrela-detail-wasg.design.webp', alt: 'Identidade e aplicações da marca Estrela Detail Wash', frame: 'plain' },
    gallery: [
      { src: '/Projetos/estreladetail/estrelalogo.jpg', alt: 'Logótipo Estrela Detail Wash', frame: 'plain' },
    ],
  },
]

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug)

// ── Capa do projeto: moldura de browser com a captura real, OU o resultado
//    real do Google (SEO). Reutilizada no índice e na página de caso. ────────
export function ProjectCover({ project, priority = false, variant = 'detail' }: { project: Project; priority?: boolean; variant?: 'card' | 'detail' }) {
  // 0 · Variante "card" (grelha do portefólio) — janela de browser macOS uniforme
  //     em TODOS os cards, independentemente do tipo de capa. Usa a melhor imagem
  //     disponível (captura real ou mockup desktop); sem imagem → iniciais branded.
  if (variant === 'card') {
    // a) SEO → cartão de resultado Google compacto (mantém a história de SEO no card)
    if (project.googleCard) {
      const g = project.googleCard
      return (
        <div className="absolute inset-0 grid place-items-center p-4">
          <div className="w-full max-w-[320px] rounded-xl bg-white shadow-[0_20px_44px_rgba(0,0,0,0.45)] p-3.5">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-[13px] font-medium leading-none tracking-tight select-none">
                <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
              </span>
              <div className="flex-1 flex items-center gap-2 h-6 rounded-full border border-[#dfe1e5] px-2.5">
                <span className="text-[10.5px] text-[#3c4043] truncate">{g.query}</span>
                <svg className="ml-auto shrink-0" width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="7" stroke="#4285F4" strokeWidth="2" />
                  <path d="m20 20-3-3" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="grid place-items-center w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[9px] font-semibold shrink-0">{g.brandInitial}</span>
              <span className="leading-tight min-w-0">
                <span className="block text-[10.5px] text-[#202124] truncate">{project.client}</span>
                <span className="block text-[9.5px] text-[#5f6368] truncate">{g.domain}</span>
              </span>
              {g.rank && (
                <span className="ml-auto shrink-0 inline-flex items-center rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[9px] font-semibold text-[#188038]">{g.rank} no Google</span>
              )}
            </div>
            <p className="text-[13px] leading-snug text-[#1a0dab] line-clamp-1">{g.title}</p>
            <p className="mt-0.5 text-[10.5px] leading-snug text-[#4d5156] line-clamp-2">{g.desc}</p>
          </div>
        </div>
      )
    }

    // b) Branding/identidade → moldura de "atelier" (paleta da marca + mockup), nunca browser
    if (project.cover.frame === 'plain' && project.cover.src) {
      return (
        <div className="absolute inset-0 grid place-items-center p-4 sm:p-5">
          <div className="w-full h-full max-w-xl flex flex-col rounded-xl border border-white/12 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.55)] overflow-hidden">
            {/* barra de atelier — paleta da marca em vez de semáforo de browser */}
            <div className="flex items-center gap-2 px-3 h-8 shrink-0 border-b border-white/10 bg-white/[0.03]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: 'var(--accent-deep)' }} />
                <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: 'var(--accent-mid)' }} />
                <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: 'var(--accent)' }} />
                <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: 'var(--accent-light)' }} />
              </span>
              <span className="ml-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-dark">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" />
                </svg>
                Identidade
              </span>
            </div>
            <div className="relative flex-1 min-h-0">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(max-width: 768px) 90vw, 560px"
                className="object-cover object-center"
                priority={priority}
              />
            </div>
          </div>
        </div>
      )
    }

    // c) Phone — iPhone 17 Pro Max (rim titanium brushed, Action Button, Camera Control, Dynamic Island, reflexo vidro)
    if (project.cover.frame === 'phone') {
      const phoneImg = project.cover.src ?? project.showcase?.mobile
      const initials = project.client.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
      return (
        <div className="absolute inset-0 grid place-items-center bg-[#0b0c0f]">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full blur-[60px] opacity-[0.16]" style={{ background: 'rgb(var(--accent-rgb))' }} />
          </div>
          <div className="relative" style={{ height: '90%', aspectRatio: '9/19.5' }}>
            {/* rim titanium — multi-stop, aço brushed a apanhar luz */}
            <div
              className="absolute inset-0 rounded-[1.8rem]"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(180,182,192,0.07) 22%, rgba(255,255,255,0.05) 50%, rgba(195,197,207,0.06) 75%, rgba(255,255,255,0.20) 100%)',
                boxShadow: '0 26px 64px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.09)',
              }}
            />
            {/* corpo — 1.5px inset do rim */}
            <div className="absolute rounded-[1.65rem] bg-[#0e0f13]" style={{ inset: '1.5px' }}>
              {/* Dynamic Island — pill com camera dot + sensor IR */}
              <div
                className="absolute top-[1.8%] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center rounded-full"
                style={{ width: '28%', height: '2.7%', background: '#050507', gap: '12%' }}
              >
                <div style={{ width: '14%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(20,22,32,0.9)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }} />
                <div style={{ width: '8%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(12,14,20,0.8)' }} />
              </div>
              {/* ecrã */}
              <div className="absolute overflow-hidden rounded-[1.5rem]" style={{ inset: '4px' }}>
                {phoneImg ? (
                  <Image src={phoneImg} alt={project.cover.alt} fill sizes="220px" className="object-cover object-top" priority={priority} />
                ) : (
                  <div className="absolute inset-0 grid place-items-center" aria-hidden>
                    <span className="grid place-items-center w-10 h-10 rounded-[12px] border border-accent/30 bg-accent/10 text-accent font-heading text-lg font-semibold shadow-[0_0_24px_-6px_rgb(var(--accent-rgb)/0.6)]">
                      {initials}
                    </span>
                  </div>
                )}
                {/* reflexo de vidro diagonal */}
                <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(148deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.016) 28%, transparent 48%)' }} />
              </div>
            </div>
            {/* Action Button — esquerda topo (iPhone 16/17 Pro) */}
            <div className="absolute left-0 top-[11%]" style={{ translate: '-1.5px', width: '3px', height: '5%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.19))', borderRadius: '3px 0 0 3px' }} />
            {/* Volume Up */}
            <div className="absolute left-0 top-[19%]" style={{ translate: '-1.5px', width: '3px', height: '8%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.15))', borderRadius: '3px 0 0 3px' }} />
            {/* Volume Down */}
            <div className="absolute left-0 top-[29%]" style={{ translate: '-1.5px', width: '3px', height: '8%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.15))', borderRadius: '3px 0 0 3px' }} />
            {/* Power / Side button */}
            <div className="absolute right-0 top-[20%]" style={{ translate: '1.5px', width: '3px', height: '11%', background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.19))', borderRadius: '0 3px 3px 0' }} />
            {/* Camera Control — direita abaixo do power (iPhone 16/17 Pro) */}
            <div className="absolute right-0 top-[37%]" style={{ translate: '1.5px', width: '3px', height: '7%', background: 'linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.13))', borderRadius: '0 3px 3px 0' }} />
            {/* accent glow */}
            <div className="absolute inset-0 rounded-[1.8rem] pointer-events-none" style={{ boxShadow: '0 18px 52px -20px rgb(var(--accent-rgb) / 0.44)' }} />
          </div>
        </div>
      )
    }

    // d) Default → janela de browser macOS uniforme (sites/lojas)
    const img = project.cover.src ?? project.showcase?.desktop
    const initials = project.client.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
    return (
      <div className="absolute inset-0 grid place-items-center p-4 sm:p-5">
        {/* janela preenche a altura do card (flex-col) → a barra nunca é cortada */}
        <div className="w-full h-full max-w-xl flex flex-col rounded-xl border border-white/12 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.55)] overflow-hidden">
          {/* barra do browser — semáforo + barra de endereço com cadeado */}
          <div className="flex items-center gap-1.5 px-3 h-8 shrink-0 border-b border-white/10 bg-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/85" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/85" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/85" />
            <div className="ml-2 flex-1 flex items-center gap-1.5 h-5 rounded-full bg-white/[0.06] px-2.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dark shrink-0" aria-hidden>
                <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span className="text-[10px] text-dark truncate">{project.urlLabel ?? 'preview'}</span>
            </div>
          </div>
          <div className="relative flex-1 min-h-0">
            {img ? (
              <Image
                src={img}
                alt={project.cover.alt}
                fill
                sizes="(max-width: 768px) 90vw, 560px"
                className="object-cover object-top"
                priority={priority}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#171a20] to-[#0e0f13]" aria-hidden>
                <span className="grid place-items-center w-16 h-16 rounded-[18px] border border-accent/30 bg-accent/10 text-accent font-heading text-2xl font-semibold shadow-[0_0_36px_-10px_rgb(var(--accent-rgb)/0.75)]">
                  {initials}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // 1 · Capa "resultado Google" (SEO) — data-driven
  if (project.googleCard) {
    const g = project.googleCard
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 sm:p-8" aria-hidden>
        <div className="w-full max-w-[360px] rounded-xl bg-white shadow-[0_20px_44px_rgba(0,0,0,0.45)] p-4">
          <div className="flex items-center gap-2 mb-3.5">
            <span className="font-heading text-[15px] font-medium leading-none tracking-tight select-none">
              <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
            </span>
            <div className="flex-1 flex items-center gap-2 h-7 rounded-full border border-[#dfe1e5] px-3">
              <span className="text-[11.5px] text-[#3c4043] truncate">{g.query}</span>
              <svg className="ml-auto shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#4285F4" strokeWidth="2" />
                <path d="m20 20-3-3" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="grid place-items-center w-5 h-5 rounded-full bg-[var(--accent)] text-white text-[9px] font-semibold shrink-0">{g.brandInitial}</span>
            <span className="leading-tight min-w-0">
              <span className="block text-[11px] text-[#202124] truncate">{project.client}</span>
              <span className="block text-[10px] text-[#5f6368] truncate">{g.domain}</span>
            </span>
          </div>
          <p className="text-[15px] leading-snug text-[#1a0dab] line-clamp-2">{g.title}</p>
          <p className="mt-0.5 text-[11.5px] leading-snug text-[#4d5156] line-clamp-2">{g.desc}</p>
        </div>
        <span className="text-[10px] uppercase tracking-[0.18em] text-accent">↑ Resultado real no Google</span>
      </div>
    )
  }

  // 2 · Capa com captura real do site (janela de browser macOS) OU moldura especial
  if (project.cover.src) {
    // 2a · Phone — iPhone 17 Pro Max (rim titanium brushed, Action Button, Camera Control, Dynamic Island, reflexo vidro)
    if (project.cover.frame === 'phone') {
      return (
        <div className="absolute inset-0 grid place-items-center bg-[#0b0c0f]">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-[72px] opacity-[0.20]" style={{ background: 'rgb(var(--accent-rgb))' }} />
          </div>
          <div className="relative" style={{ height: '84%', aspectRatio: '9/19.5' }}>
            {/* rim titanium — multi-stop brushed. radius proporcional à largura do dispositivo (~147px) */}
            <div
              className="absolute inset-0 rounded-[1.7rem]"
              style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(180,182,192,0.07) 22%, rgba(255,255,255,0.05) 50%, rgba(195,197,207,0.06) 75%, rgba(255,255,255,0.21) 100%)',
                boxShadow: '0 36px 84px rgba(0,0,0,0.93), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.10)',
              }}
            />
            {/* corpo — 1.5px inset do rim */}
            <div className="absolute rounded-[1.55rem] bg-[#0e0f13]" style={{ inset: '1.5px' }}>
              {/* Dynamic Island — pill com camera dot + sensor IR */}
              <div
                className="absolute top-[1.8%] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center rounded-full"
                style={{ width: '28%', height: '2.7%', background: '#050507', gap: '12%' }}
              >
                <div style={{ width: '14%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(20,22,32,0.9)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }} />
                <div style={{ width: '8%', aspectRatio: '1', borderRadius: '50%', background: 'rgba(12,14,20,0.8)' }} />
              </div>
              {/* Action Button — esquerda topo (iPhone 16/17 Pro) */}
              <div
                className="absolute left-0 top-[11%]"
                style={{ translate: '-1.5px', width: '3px', height: '5%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.19))', borderRadius: '3px 0 0 3px' }}
              />
              {/* Power / Side button */}
              <div
                className="absolute right-0 top-[20%]"
                style={{ translate: '1.5px', width: '3px', height: '11%', background: 'linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.19))', borderRadius: '0 3px 3px 0' }}
              />
              {/* Camera Control — direita abaixo power (iPhone 16/17 Pro) */}
              <div
                className="absolute right-0 top-[37%]"
                style={{ translate: '1.5px', width: '3px', height: '7%', background: 'linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.13))', borderRadius: '0 3px 3px 0' }}
              />
              {/* Volume Up */}
              <div
                className="absolute left-0 top-[19%]"
                style={{ translate: '-1.5px', width: '3px', height: '8.5%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.15))', borderRadius: '3px 0 0 3px' }}
              />
              {/* Volume Down */}
              <div
                className="absolute left-0 top-[29.5%]"
                style={{ translate: '-1.5px', width: '3px', height: '8.5%', background: 'linear-gradient(to left, rgba(255,255,255,0.05), rgba(255,255,255,0.15))', borderRadius: '3px 0 0 3px' }}
              />
              {/* ecrã com profundidade */}
              <div className="absolute overflow-hidden rounded-[1.4rem]" style={{ inset: '4px' }}>
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(max-width: 768px) 55vw, 340px"
                  className="object-cover object-top"
                  priority={priority}
                />
                {/* reflexo de vidro diagonal */}
                <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.045) 0%, transparent 38%)' }} />
              </div>
            </div>
            {/* accent glow por baixo */}
            <div className="absolute inset-0 rounded-[1.7rem] pointer-events-none" style={{ boxShadow: '0 22px 64px -24px rgb(var(--accent-rgb) / 0.48)' }} />
          </div>
          <span className="absolute bottom-5 text-[10px] uppercase tracking-[0.18em] text-accent/60">App móvel · Resultados ao vivo</span>
        </div>
      )
    }

    // 2b · Moldura branded — projetos de marca/identidade (sem cromo de browser).
    //      Um logótipo dentro de uma janela de Safari fica errado; aqui usamos
    //      marcas de registo ("ficha técnica"), a mesma linguagem da ficha rápida.
    if (project.cover.frame === 'plain') {
      return (
        <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
          <div className="relative w-full max-w-xl rounded-xl border border-white/12 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.55)] overflow-hidden">
            <span aria-hidden className="absolute top-2.5 left-2.5 z-10 w-3.5 h-3.5 border-l border-t border-white/25" />
            <span aria-hidden className="absolute top-2.5 right-2.5 z-10 w-3.5 h-3.5 border-r border-t border-white/25" />
            <span aria-hidden className="absolute bottom-2.5 left-2.5 z-10 w-3.5 h-3.5 border-l border-b border-white/25" />
            <span aria-hidden className="absolute bottom-2.5 right-2.5 z-10 w-3.5 h-3.5 border-r border-b border-white/25" />
            <div className="relative w-full aspect-[16/10]">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="(max-width: 768px) 90vw, 560px"
                className="object-cover object-center"
                priority={priority}
              />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="absolute inset-0 grid place-items-center p-4 sm:p-6">
        <div className="w-full max-w-xl rounded-xl border border-white/12 bg-[#101216] shadow-[0_24px_50px_rgba(0,0,0,0.55)] overflow-hidden">
          {/* barra do browser — semáforo + barra de endereço com cadeado */}
          <div className="flex items-center gap-1.5 px-3 h-8 border-b border-white/10 bg-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/85" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/85" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/85" />
            <div className="ml-2 flex-1 flex items-center gap-1.5 h-5 rounded-full bg-white/[0.06] px-2.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-dark shrink-0" aria-hidden>
                <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              <span className="text-[10px] text-dark truncate">{project.urlLabel ?? 'preview'}</span>
            </div>
          </div>
          <div className="relative w-full aspect-[16/10]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(max-width: 768px) 90vw, 560px"
              className="object-cover object-top"
              priority={priority}
            />
          </div>
        </div>
      </div>
    )
  }

  // 3 · Capa branded (placeholder) — projetos ainda sem imagem
  const initials = project.client.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  return (
    <div className="absolute inset-0 grid place-items-center p-8" aria-hidden>
      <div className="text-center">
        <span className="grid place-items-center w-20 h-20 mx-auto rounded-[22px] border border-accent/30 bg-accent/10 text-accent font-heading text-3xl font-semibold shadow-[0_0_44px_-10px_rgb(var(--accent-rgb)/0.75)]">
          {initials}
        </span>
        <p className="mt-5 font-heading text-lg font-medium text-white">{project.client}</p>
        <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-accent/80">{project.category}</p>
      </div>
    </div>
  )
}
