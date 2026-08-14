// Placeholder blog data — pronto para trocar por um fetch ao Supabase/CMS.
// TODO: const { data: POSTS } = await supabase.from('posts').select('*').order('date', { ascending: false })

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  // Tabelas são o formato que os motores de resposta (ChatGPT, Perplexity,
  // AI Overviews) extraem e citam com mais facilidade — dados comparáveis,
  // sem prosa à volta.
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  // Resposta destacada: a frase que responde à pergunta do título, isolada
  // logo no topo do artigo para poder ser citada sem contexto.
  | { type: 'answer'; text: string }

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string // ISO (YYYY-MM-DD)
  updated?: string // ISO — preenchido quando o artigo é revisto
  service?: { label: string; href: string } // CTA contextual
  body: Block[]
}

export const CATEGORIES = ['Todos', 'SEO', 'Websites', 'Social Media', 'Negócio'] as const

export const POSTS: Post[] = [
  {
    slug: 'quanto-custa-site-pequena-empresa-portugal',
    title: 'Quanto custa um site para uma pequena empresa em Portugal?',
    excerpt:
      'Preços reais praticados em Portugal em 2026, o que faz a fatura subir e os custos anuais que quase ninguém menciona antes de assinar.',
    category: 'Websites',
    date: '2026-08-14',
    service: { label: 'Ver o serviço de Websites', href: '/servicos/web' },
    body: [
      {
        type: 'answer',
        text: 'Em Portugal, em 2026, um site profissional para uma pequena empresa custa tipicamente entre 300€ e 3.600€ num pagamento único. Uma landing page fica na casa dos 300€, um site institucional de 3 a 5 páginas entre 700€ e 1.300€, e uma loja online começa perto dos 1.500€. A isto acrescem 60€ a 180€ por ano de domínio e alojamento, e — se quiseres manutenção — entre 50€ e 300€ por mês.',
      },
      {
        type: 'p',
        text: 'A pergunta parece simples e quase nunca tem resposta pública. Pede orçamento a cinco agências portuguesas e recebes cinco propostas com âmbitos diferentes, nenhuma tabela de preços e a mesma frase no fim: «depende do projeto». Depende mesmo — mas isso não impede ninguém de te dizer as faixas. Este artigo diz.',
      },
      {
        type: 'p',
        text: 'Os números abaixo vêm de duas fontes distintas, e vale a pena separá-las: as faixas de mercado resultam de um levantamento de tabelas e artigos públicos de agências portuguesas em 2026; os preços da Element Group são os nossos, estão publicados no site e podes confirmá-los agora mesmo.',
      },

      { type: 'h2', text: 'Faixas praticadas no mercado português' },
      {
        type: 'p',
        text: 'Abaixo dos 300€ é raro encontrar trabalho profissional feito à medida — o que existe nessa gama são templates montados à pressa. Acima disso, o mercado organiza-se mais ou menos assim:',
      },
      {
        type: 'table',
        caption: 'Faixas de preço para criação de sites em Portugal (2026)',
        headers: ['Tipo de site', 'Faixa de mercado', 'O que costuma incluir'],
        rows: [
          ['Landing page (1 página)', '260€ – 500€', 'Página única de conversão, formulário, domínio apontado'],
          ['Site institucional (3–5 páginas)', '700€ – 1.800€', 'Design à medida, responsivo, SEO básico, formulário'],
          ['Site institucional (6–20 páginas)', '1.800€ – 3.600€', 'Design trabalhado, conteúdos, SEO técnico, integrações'],
          ['Loja online (e-commerce)', '1.500€ – 10.000€', 'Catálogo, pagamentos, envios, gestão de stock'],
          ['Trabalho ao hora', '10€ – 250€/hora', 'Varia entre freelancer em início e agência estabelecida'],
        ],
      },
      {
        type: 'p',
        text: 'A amplitude da última linha explica quase toda a confusão do mercado. Dez euros à hora e duzentos e cinquenta euros à hora existem os dois, e ambos se apresentam como «criação de sites». A diferença não está no rótulo — está em quem faz, no que entrega e no que acontece depois de entregar.',
      },

      { type: 'h2', text: 'Os nossos preços, para teres uma âncora verificável' },
      {
        type: 'p',
        text: 'Publicamos os preços porque a alternativa — obrigar-te a marcar uma reunião para saber se cabe no orçamento — faz-te perder tempo e a nós também. São estes:',
      },
      {
        type: 'table',
        caption: 'Preços Element Group (públicos, atualizados a agosto de 2026)',
        headers: ['Serviço', 'Preço', 'Modalidade'],
        rows: [
          ['Landing page', '297€', 'Pagamento único'],
          ['Website Essencial (3–5 páginas)', '790€', 'Pagamento único'],
          ['Website Profissional (até 8 páginas)', '1.290€', 'Pagamento único'],
          ['Redesign de site existente', 'desde 590€', 'Pagamento único'],
          ['Loja online', 'desde 1.500€', 'Sob consulta'],
          ['Plano mensal de manutenção', '97€ / 197€ / 297€ por mês', 'Sem fidelização'],
        ],
      },
      {
        type: 'p',
        text: 'Estamos abaixo da faixa média do mercado para trabalho equivalente, e a razão é concreta, não promocional: usamos IA no desenvolvimento, na produção de conteúdo e na análise. O que uma equipa tradicional faz em semanas de horas faturáveis, fazemos em dias. A poupança é de tempo, não de qualidade — os sites arrancam com PageSpeed 95+ por defeito.',
      },

      { type: 'h2', text: 'O que faz o preço subir (e o que não faz)' },
      {
        type: 'p',
        text: 'Quatro coisas explicam a maior parte da diferença entre um orçamento de 800€ e um de 3.000€ para sites que, à primeira vista, parecem iguais.',
      },
      { type: 'h3', text: '1. Número de páginas e de modelos distintos' },
      {
        type: 'p',
        text: 'Dez páginas que usam o mesmo modelo custam muito menos que quatro páginas com quatro desenhos diferentes. O que dá trabalho é desenhar e programar cada modelo novo, não duplicar conteúdo dentro de um que já existe.',
      },
      { type: 'h3', text: '2. Conteúdo: quem escreve e quem fotografa' },
      {
        type: 'p',
        text: 'Este é o custo escondido mais comum. Muitos orçamentos baratos assumem que entregas os textos e as fotografias prontos. Se não os tens — e a maioria das PME não tem — ou pagas copywriting e fotografia à parte, ou o site fica no ar meio vazio à espera durante meses. Vale a pena perguntar isto antes de comparar dois orçamentos.',
      },
      { type: 'h3', text: '3. Funcionalidade a sério' },
      {
        type: 'p',
        text: 'Pagamentos, reservas, área de cliente, integrações com faturação ou CRM, multi-idioma. Cada uma destas empurra o projeto para outra escala de esforço — e de manutenção futura.',
      },
      { type: 'h3', text: '4. Performance e SEO técnico' },
      {
        type: 'p',
        text: 'Um site pode ficar bonito e continuar lento, invisível no Google e impossível de navegar num telemóvel antigo. Otimizar imagens, cortar código morto, estruturar o conteúdo para pesquisa e garantir acessibilidade dá trabalho real. É onde os orçamentos mais baratos cortam primeiro, porque é o que o cliente não vê na apresentação.',
      },
      {
        type: 'p',
        text: 'E o que não faz o preço subir de forma legítima: o número de revisões que te deixam pedir, desde que o âmbito esteja escrito. Se um orçamento é barato mas limita as revisões a uma, o preço final não é o que está no papel.',
      },

      { type: 'h2', text: 'Os custos anuais que ninguém menciona antes de assinar' },
      {
        type: 'p',
        text: 'O pagamento único é a parte visível. Um site é uma coisa viva e tem contas todos os anos:',
      },
      {
        type: 'table',
        caption: 'Custos recorrentes de um site em Portugal',
        headers: ['Item', 'Custo típico', 'É obrigatório?'],
        rows: [
          ['Domínio .pt', '10€ – 30€ / ano', 'Sim'],
          ['Alojamento', '50€ – 150€ / ano', 'Sim'],
          ['Certificado SSL', 'Normalmente incluído', 'Sim'],
          ['Manutenção e atualizações', '50€ – 300€ / mês', 'Não, mas recomendado'],
          ['Alterações de conteúdo', 'Variável, ou incluído no plano', 'Não'],
        ],
      },
      {
        type: 'p',
        text: 'A manutenção é a linha onde vale a pena pensar duas vezes. Um site parado não é um site estável — é um site a acumular vulnerabilidades, plugins desatualizados e conteúdo velho. Mas também não precisas de um plano caro no primeiro ano se o site é simples e não mexes nele.',
      },

      { type: 'h2', text: 'Três erros que saem caros' },
      {
        type: 'ol',
        items: [
          'Comprar pelo preço mais baixo sem comparar âmbitos. Um orçamento de 400€ que não inclui textos, fotografias nem SEO não é mais barato que um de 900€ que inclui — é outro produto.',
          'Não ficar dono do domínio. Se a agência regista o domínio em nome dela, mudar de fornecedor deixa de ser uma decisão tua. Exige que o domínio fique no teu nome, sempre.',
          'Assinar fidelização de 12 ou 24 meses para manutenção. Se o serviço for bom, ficas por vontade. A fidelização só protege quem tem medo de que saias.',
        ],
      },

      { type: 'h2', text: 'Perguntas frequentes' },
      { type: 'h3', text: 'Um site de 300€ pode ser bom?' },
      {
        type: 'p',
        text: 'Pode, se for uma landing page — uma página única, com um objetivo claro. O que não existe por 300€ é um site institucional completo, com conteúdo escrito de raiz e SEO trabalhado. Nessa gama, ou é template, ou alguém está a trabalhar a perder.',
      },
      { type: 'h3', text: 'Vale mais a pena WordPress ou site à medida?' },
      {
        type: 'p',
        text: 'WordPress resolve bem quando precisas de publicar conteúdo com frequência e queres autonomia total. Um site à medida ganha em velocidade, segurança e em não depender de plugins de terceiros. Para uma PME que atualiza o site poucas vezes por ano, à medida costuma sair mais barato ao fim de três anos, contando manutenção.',
      },
      { type: 'h3', text: 'Quanto tempo demora?' },
      {
        type: 'p',
        text: 'Uma landing page, dias. Um site institucional, duas a quatro semanas. O que atrasa quase sempre não é o desenvolvimento — é o conteúdo do lado do cliente. Textos, logótipo em condições e fotografias são o caminho crítico real.',
      },
      { type: 'h3', text: 'E se eu já tiver um site mau?' },
      {
        type: 'p',
        text: 'Um redesign costuma sair mais barato que começar do zero, porque a estrutura e o conteúdo já existem para trabalhar em cima. Faz sentido a partir do momento em que o site atual não carrega em três segundos, não funciona bem no telemóvel ou não aparece no Google para o teu próprio nome.',
      },

      { type: 'h2', text: 'Em resumo' },
      {
        type: 'p',
        text: 'Para a maioria das pequenas empresas portuguesas, o orçamento realista de um site que funciona anda entre os 700€ e os 1.500€, mais 60€ a 180€ por ano de domínio e alojamento. Se te pedirem muito acima disso, pergunta o que justifica. Se te pedirem muito abaixo, pergunta o que fica de fora. Em qualquer dos casos, exige o âmbito por escrito e o domínio no teu nome.',
      },
    ],
  },
  {
    slug: 'como-escolher-agencia-marketing-digital',
    title: 'Como escolher uma agência de marketing digital (sem te arrependeres)',
    excerpt:
      'As perguntas a fazer, os sinais de alarme e como verificar por ti mesmo se uma agência entrega o que promete — em vinte minutos.',
    category: 'Negócio',
    date: '2026-08-14',
    service: { label: 'Falar comigo, sem compromisso', href: '/contacto' },
    body: [
      {
        type: 'answer',
        text: 'Escolhe pela prova, não pela apresentação. Antes de assinar seja o que for, verifica três coisas que ninguém pode falsificar: o desempenho real dos sites que a agência entregou (testa-os no PageSpeed Insights), avaliações públicas com nome e data, e um âmbito escrito que diga exatamente o que recebes por mês. Se houver fidelização de 12 meses, pergunta porquê — o serviço bom não precisa dela.',
      },
      {
        type: 'p',
        text: 'Convém dizer isto já: escrevemos isto de dentro. Somos uma agência, e não é imparcial. Por isso o artigo está construído à volta de coisas que podes verificar sozinho, sem acreditares em nós — incluindo sobre nós.',
      },

      { type: 'h2', text: 'Primeiro, decide o que precisas mesmo' },
      {
        type: 'p',
        text: 'Metade das más contratações começa antes de haver agência nenhuma: o negócio não sabe o que quer comprar. «Precisamos de marketing» não é um objetivo. Estes são:',
      },
      {
        type: 'ul',
        items: [
          'Quero que me encontrem no Google quando procuram o meu serviço na minha zona.',
          'Tenho visitas mas ninguém contacta — o site não converte.',
          'Não tenho onde mandar quem me encontra nas redes.',
          'Perco tempo demais a publicar e não vejo retorno.',
        ],
      },
      {
        type: 'p',
        text: 'Cada um destes leva a um trabalho diferente, com custos diferentes. Chegar à reunião com o problema definido muda completamente a conversa — e permite perceber depressa se do outro lado te estão a vender aquilo de que precisas ou aquilo que têm para vender.',
      },

      { type: 'h2', text: 'Os cinco critérios que importam' },
      { type: 'h3', text: '1. Trabalho verificável, não portfólio bonito' },
      {
        type: 'p',
        text: 'Uma imagem de um site num portfólio não prova nada — pode ser um conceito que nunca foi para o ar. Pede os links. Depois abre-os e confirma que estão vivos, que carregam depressa e que funcionam no telemóvel. Leva cinco minutos e elimina metade dos candidatos.',
      },
      { type: 'h3', text: '2. Resultados com número e contexto' },
      {
        type: 'p',
        text: '«Aumentámos as vendas em 300%» sem base de partida nem período não é um resultado, é uma frase. Um resultado tem princípio, fim e unidade: de zero presença online a primeiro lugar no Google para a pesquisa da zona, em quatro meses. Podes verificar essa — basta pesquisares.',
      },
      { type: 'h3', text: '3. Avaliações públicas, com nome e data' },
      {
        type: 'p',
        text: 'Testemunhos anónimos numa página do próprio site valem pouco. Avaliações no Perfil de Empresa do Google, com nome, data e a possibilidade de a pessoa ser contactada, valem muito. Repara também na resposta da agência às avaliações — sobretudo às menos boas, se existirem.',
      },
      { type: 'h3', text: '4. Preço e âmbito por escrito' },
      {
        type: 'p',
        text: 'Deves conseguir responder a estas três perguntas antes de assinar: o que recebo exatamente por mês, quantas alterações estão incluídas e o que acontece se quiser sair. Se alguma resposta for vaga, o problema não é a vagueza — é o que ela vai custar-te daqui a três meses.',
      },
      { type: 'h3', text: '5. Quem faz o trabalho é quem está na reunião?' },
      {
        type: 'p',
        text: 'Em agências maiores, quem te encanta na proposta raramente é quem executa. Não é necessariamente mau, mas muda a expectativa. Pergunta quem vai mexer no teu projeto e com quem falas quando algo corre mal.',
      },

      { type: 'h2', text: 'Sinais de alarme' },
      {
        type: 'table',
        caption: 'O que ouves e o que costuma significar',
        headers: ['Sinal', 'Porque é preocupante'],
        rows: [
          ['«Garantimos o 1.º lugar no Google»', 'Ninguém controla o algoritmo. Garantia de posição é venda de fumo ou vai por atalhos que te penalizam.'],
          ['Fidelização de 12 ou 24 meses', 'Protege a agência do teu direito de sair. Serviço bom retém por resultados, não por contrato.'],
          ['Preço só depois de reunião obrigatória', 'Preço opaco é preço variável consoante o que acharem que podes pagar.'],
          ['Sem acesso às tuas próprias contas', 'Domínio, Google Business, redes e analytics devem estar no teu nome. Sempre.'],
          ['Relatórios cheios de gráficos sem decisão', 'Métricas de vaidade — impressões, alcance — sem ligação a contactos ou vendas.'],
          ['Contrato sem âmbito detalhado', '«Gestão de redes sociais» pode ser doze posts por mês ou dois. Escreve-se.'],
        ],
      },

      { type: 'h2', text: 'Como verificar em vinte minutos, sem ajuda de ninguém' },
      {
        type: 'ol',
        items: [
          'Testa a velocidade. Pega em dois sites do portfólio e passa-os pelo PageSpeed Insights do Google. Abaixo de 50 no telemóvel, é mau sinal — se não cuidam do que mostram, não vão cuidar do teu.',
          'Pesquisa o nome da agência no Google. Vê o que aparece além do site dela: avaliações, menções, presença real.',
          'Pesquisa o nome de um cliente do portfólio. Se a agência trata do SEO dele, ele devia aparecer bem para o próprio nome, no mínimo.',
          'Abre o site da agência no telemóvel. Se a casa do sapateiro estiver descalça, já sabes.',
          'Pede um contacto de cliente e liga mesmo. É o passo que quase ninguém dá e o que mais informação dá.',
        ],
      },

      { type: 'h2', text: 'Agência, freelancer ou fazer por dentro?' },
      {
        type: 'table',
        caption: 'Vantagens e limites de cada opção',
        headers: ['Opção', 'Melhor quando', 'Risco principal'],
        rows: [
          ['Freelancer', 'O âmbito é claro e pontual — um site, uma campanha', 'Disponibilidade e continuidade; férias e doença param tudo'],
          ['Agência pequena', 'Queres continuidade e falar com quem executa', 'Capacidade limitada em picos de trabalho'],
          ['Agência grande', 'Precisas de várias especialidades ao mesmo tempo', 'Custo mais alto; és uma conta entre muitas'],
          ['Equipa interna', 'Marketing é o motor do negócio e há volume constante', 'Custo fixo elevado e dificuldade em cobrir todas as áreas'],
        ],
      },

      { type: 'h2', text: 'Perguntas frequentes' },
      { type: 'h3', text: 'Quanto devo esperar pagar por mês?' },
      {
        type: 'p',
        text: 'Em Portugal, manutenção e presença contínua para uma PME andam entre 50€ e 300€ por mês, consoante o que está incluído. Gestão de redes com produção de conteúdo situa-se tipicamente acima dos 150€. Valores muito abaixo costumam significar volume mínimo ou trabalho automatizado sem revisão.',
      },
      { type: 'h3', text: 'Quanto tempo até ver resultados?' },
      {
        type: 'p',
        text: 'Depende do canal, e desconfia de quem não fizer esta distinção. SEO local pode mostrar movimento em semanas; SEO competitivo demora meses. Anúncios pagos dão sinal em dias — e param no dia em que deixas de pagar. Redes sociais constroem confiança devagar e raramente vendem sozinhas.',
      },
      { type: 'h3', text: 'Devo assinar contrato anual para poupar?' },
      {
        type: 'p',
        text: 'Só se o desconto for real e tu já tiveres visto trabalho feito. Assinar doze meses no primeiro dia é apostar às cegas. Um mês a mês bem executado converte-se em anos por vontade própria.',
      },
      { type: 'h3', text: 'A agência deve trabalhar com concorrentes meus?' },
      {
        type: 'p',
        text: 'É legítimo perguntar e é legítimo pedir exclusividade na tua zona e setor. Uma agência séria diz-te com franqueza se já trabalha com alguém que compete diretamente contigo.',
      },

      { type: 'h2', text: 'Em resumo' },
      {
        type: 'p',
        text: 'Escolhe quem te mostra trabalho que podes abrir e testar, quem escreve o âmbito antes de te pedir a assinatura e quem não precisa de te prender por contrato. Se depois disto quiseres comparar connosco, os preços estão publicados e as avaliações estão no Google — não precisas de marcar reunião para saber se fazemos sentido para ti.',
      },
    ],
  },
  {
    slug: 'seo-local-top-3-google-maps',
    title: 'SEO local: como chegar ao Top 3 do Google Maps',
    excerpt: 'Quem procura “perto de mim” decide em segundos. Eis como pôr o teu negócio à frente no mapa.',
    category: 'SEO',
    date: '2026-06-20',
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
    title: 'Presença online para PME: por onde começar (e por onde não)',
    excerpt: 'Site, SEO, redes, anúncios… A ordem certa poupa-te dinheiro e dores de cabeça.',
    category: 'Negócio',
    date: '2026-05-28',
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

// Tempo de leitura calculado a partir do texto real, a 200 palavras/minuto.
// Era um campo escrito à mão e tinha derivado para 4-7 minutos em artigos de
// menos de 200 palavras — um número inventado num sítio onde o leitor confia.
export function readingMinutes(post: Post): number {
  const text = post.body
    .map((b) => {
      switch (b.type) {
        case 'ul':
        case 'ol':
          return b.items.join(' ')
        case 'table':
          return [b.caption ?? '', ...b.headers, ...b.rows.flat()].join(' ')
        default:
          return b.text
      }
    })
    .join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
