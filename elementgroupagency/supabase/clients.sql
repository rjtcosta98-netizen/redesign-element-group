-- ─────────────────────────────────────────────────────────────
-- Secção "Negócios que confiaram em nós" (homepage · LogoTicker)
-- Logótipos + nomes dos clientes. Idempotente: pode correr de novo.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.clients (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,            -- nome do cliente (usado no alt e no fallback)
  logo        text,                     -- URL público do logótipo (Storage). Pode ficar vazio.
  position    int  not null default 0,  -- ordem de apresentação
  active      boolean not null default true
);

-- Permite clientes só com nome (sem logo) — o site mostra o nome estilizado.
alter table public.clients alter column logo drop not null;

-- Leitura pública (homepage), só dos ativos. Sem escrita pública.
alter table public.clients enable row level security;

drop policy if exists "Público pode ler clientes ativos" on public.clients;
create policy "Público pode ler clientes ativos"
  on public.clients for select
  to anon
  using (active = true);

-- ── Seed dos clientes reais ──────────────────────────────────
-- Sobe os logótipos para um bucket PÚBLICO chamado `client-logos` no teu
-- Storage (com estes nomes de ficheiro) e os URLs abaixo funcionam tal como estão.
-- Se ainda não tiveres um logo, deixa o campo a NULL → o site mostra o nome.
delete from public.clients;

insert into public.clients (name, logo, position) values
  ('Matias Nature',            'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/client-logos/matias-nature-logo.png',       1),
  ('Apiários Terras da Pulga', 'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/client-logos/apiarios-logo.png',            2),
  ('Maria Mendes Massagens',   'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/client-logos/maria-mendes-logo.png',        3),
  ('AD São Romão',             'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/client-logos/adsr-logo.png',                4),
  ('Estrela Detail & Wash',    'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/client-logos/estrela-detail-wash-logo.png', 5),
  ('Football Nation Store',    'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/client-logos/football-nation-store.png',    6),
  ('Bella Essência',           'https://zkxmotwtrblluqcahnpc.supabase.co/storage/v1/object/public/client-logos/bella-essencia-logo.png',      7);

-- Verificação:
-- select position, name, logo, active from public.clients order by position;
