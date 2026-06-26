-- ─────────────────────────────────────────────────────────────
-- Secção "Portefólio" (homepage · Portfolio)
-- Imagem + texto + métrica de cada trabalho.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,           -- atribuição (ex: "Negócio local · Portugal")
  category      text not null,           -- ex: "Loja Online · E-commerce"
  title         text not null,           -- título do caso
  blurb         text not null,           -- descrição curta
  metric        text,                    -- ex: "3,2×", "98", "Top 3"
  metric_label  text,                    -- ex: "mais tráfego orgânico"
  image         text,                    -- URL da imagem do projeto (Storage)
  featured      boolean not null default false,  -- destaque (card grande)
  position      int  not null default 0,
  active        boolean not null default true
);

alter table public.projects enable row level security;

create policy "Público pode ler projetos ativos"
  on public.projects for select
  to anon
  using (active = true);

-- ── Seed (placeholders atuais). Sobe imagens e troca por casos reais. ──
insert into public.projects (name, category, title, blurb, metric, metric_label, image, featured, position) values
  (
    'Negócio local · Portugal',
    'Loja Online · E-commerce',
    'Loja online rápida, a vender 24/7',
    'Catálogo, carrinho e checkout otimizados para transformar visitas em encomendas — sem comissões de marketplace.',
    '3,2×', 'mais tráfego orgânico',
    null, true, 1
  ),
  (
    'Negócio local · Portugal',
    'Website Institucional',
    'Website que gera contactos',
    'Site à medida, ultra-rápido e otimizado para converter visitantes em pedidos de orçamento.',
    '98', 'PageSpeed / 100',
    null, false, 2
  ),
  (
    'Negócio local · Portugal',
    'SEO Local · Google',
    'No topo do Google da tua zona',
    'Otimização de SEO local que coloca o negócio à frente de quem procura na zona certa.',
    'Top 3', 'no Google Maps',
    null, false, 3
  );
