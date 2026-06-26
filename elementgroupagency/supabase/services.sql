-- ─────────────────────────────────────────────────────────────
-- Secção "Serviços" (homepage · FeatureStack)
-- Imagem + texto de cada categoria de serviço.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  eyebrow     text not null,            -- ex: "Categoria 01 · Websites & Lojas Online"
  title       text not null,            -- título do serviço
  body        text not null,            -- descrição
  href        text not null,            -- link da página do serviço (ex: /servicos/websites)
  image       text,                     -- URL da imagem da categoria (Storage)
  position    int  not null default 0,
  active      boolean not null default true
);

alter table public.services enable row level security;

create policy "Público pode ler serviços ativos"
  on public.services for select
  to anon
  using (active = true);

-- ── Seed (conteúdo atual). Sobe as imagens e preenche a coluna image. ──
insert into public.services (eyebrow, title, body, href, image, position) values
  (
    'Categoria 01 · Websites & Lojas Online',
    'Criação de Websites e Lojas Online à medida',
    'Sites institucionais e lojas online (e-commerce) desenhados à medida do teu negócio — ultra-rápidos (PageSpeed 95+), responsivos e pensados para converter visitas em clientes. Do design ao alojamento, tratamos de tudo.',
    '/servicos/websites',
    null,
    1
  ),
  (
    'Categoria 02 · Visibilidade & SEO',
    'SEO e Otimização para apareceres no Google',
    'Colocamos o teu negócio à frente de quem procura: SEO técnico, SEO local (Top 3 no Google Maps) e conteúdo otimizado para as pesquisas certas. Em média, os nossos projetos de SEO geram 3,2× mais tráfego orgânico.',
    '/servicos/seo',
    null,
    2
  ),
  (
    'Categoria 03 · Social Media',
    'Gestão de Redes Sociais e Campanhas que vendem',
    'Gerimos as tuas redes sociais com conteúdo e design profissional e campanhas pagas (Meta e Google Ads) que atraem os clientes certos — não só seguidores. Presença consistente, todos os dias, sem te tirar tempo.',
    '/servicos/social-media',
    null,
    3
  ),
  (
    'Categoria 04 · Planos Mensais',
    'Planos Mensais para o teu negócio crescer todos os meses',
    'Uma parceria contínua, sem surpresas: manutenção técnica e backups, SEO mensal, gestão de redes sociais e relatórios de resultados — tudo num plano recorrente. O teu marketing digital sempre a trabalhar por ti.',
    '/servicos/planos-mensais',
    null,
    4
  );
