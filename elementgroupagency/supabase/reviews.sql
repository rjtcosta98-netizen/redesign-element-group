-- ─────────────────────────────────────────────────────────────
-- Secção "Reviews / Testemunhos" (homepage)
-- Avaliações reais (Google) da Element Group. Idempotente: pode correr de novo.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  quote       text not null,            -- o testemunho
  name        text not null,            -- nome de quem deu
  role        text,                     -- ex: "Negócio local · Portugal"
  avatar      text,                     -- URL da foto (Storage)
  rating      numeric(2,1) default 5.0, -- ex: 5.0 (opcional)
  featured    boolean not null default false,
  position    int  not null default 0,
  active      boolean not null default true
);

alter table public.reviews enable row level security;

-- Idempotente: recria a policy sem dar erro "already exists".
drop policy if exists "Público pode ler reviews ativas" on public.reviews;
create policy "Público pode ler reviews ativas"
  on public.reviews for select
  to anon
  using (active = true);

-- ── Avaliações reais (todas 5★). Limpa o seed anterior. ──
delete from public.reviews;

insert into public.reviews (quote, name, role, avatar, rating, featured, position) values
  (
    'A Element Group foi quem criou o meu website, mais concretamente o Ricardo, uma pessoa fantástica, simpático e muito profissional — recomendo vivamente os seus serviços. É muito atento aos pormenores, empenhado e com bom gosto. O meu website está magnífico, com classe e elegância. Muito obrigada ao Ricardo pelo empenho e ajuda.',
    'Grupótico São Romão', 'Grupótico · São Romão', null, 5.0, true, 1
  ),
  (
    'Excelente profissional, bastante atencioso, simpático e empenhado no trabalho, com grandes capacidades de oferecer o melhor aos clientes. Muito paciente e sempre atento ao nosso gosto — foi uma grande ajuda para o nosso negócio, sem dúvida. Muito obrigado!',
    'Mariana Mendes', 'Football Nation Store', null, 5.0, true, 2
  ),
  (
    'Desde a primeira abordagem até ao conceito que pretendia foi super rápido e o trabalho realizado com excelência e muito profissionalismo. Recomendo. Serviço premium. Obrigado!',
    'Gonçalo Nascimento', 'Cliente · Website', null, 5.0, true, 3
  ),
  (
    'Excelente trabalho na elaboração e no design, com elevados padrões de qualidade e adequação às temáticas abordadas! Um exemplo de empenho e dedicação ao trabalho. Parabéns pelo excelente trabalho!',
    'Duarte Marvanejo', 'Cliente · Website', null, 5.0, true, 4
  ),
  (
    'Desde o primeiro contacto até ao fim foi excecional! Criou o que eu pretendia há imenso tempo — ficou um site extremamente incrível! Obrigada pela tua ajuda e pelo teu profissionalismo.',
    'Maria Mendes', 'Cliente · Website', null, 5.0, false, 5
  ),
  (
    'Trabalho TOP na criação do site da Associação Desportiva de São Romão.',
    'Prof. Jason Silva', 'Associação Desportiva de São Romão', null, 5.0, false, 6
  ),
  (
    'A Element Group é um projeto altamente competente para empresas que pretendem crescer no e-commerce e expandir o seu negócio. Destaca-se pela abordagem estratégica personalizada, conhecimento elevado do mercado e acompanhamento próximo ao cliente. O site é de extrema organização e fácil entendimento — uma visão integrada que gera resultados concretos. Recomendo a marcas que procuram crescimento sustentável e profissional. Sem dúvida, fantástico e muito contente com os resultados.',
    'Adriana Soares', 'Cliente · E-commerce', null, 5.0, false, 7
  ),
  (
    'O site impressiona pelo design moderno e pela navegação intuitiva, garantindo uma experiência fluida e agradável para o utilizador. A organização clara do conteúdo, aliada ao bom desempenho e funcionalidades eficientes, demonstra o cuidado e a qualidade na sua criação. Um trabalho realmente bem executado.',
    'Susana Costa', 'Cliente · Website', null, 5.0, false, 8
  ),
  (
    'Recomendo totalmente o trabalho realizado na criação do meu site. Destaco o profissionalismo, a rapidez na execução e a excelente capacidade de transformar ideias em processos claros, simples e eficazes. Todo o desenvolvimento foi conduzido com grande organização, comunicação eficiente e foco na solução — com elevada qualidade técnica e prazos cumpridos de forma impressionante. Uma escolha segura para quem procura eficiência, rigor e resultados.',
    'Ricardo Jesus', 'Cliente · Website', null, 5.0, false, 9
  );
