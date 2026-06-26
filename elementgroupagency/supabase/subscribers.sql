-- ─────────────────────────────────────────────────────────────
-- Subscrições por email: newsletter + recursos (gated).
-- Guarda o consentimento RGPD (prova: texto aceite + data via created_at).
-- ─────────────────────────────────────────────────────────────

create table if not exists public.subscribers (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  email         text not null,
  source        text not null default 'newsletter',  -- 'newsletter' | 'resource:<slug>'
  consent       boolean not null default false,
  consent_text  text
);

-- Leitura privada; escrita pública apenas para INSERT.
alter table public.subscribers enable row level security;

create policy "Público pode inserir subscrições"
  on public.subscribers for insert
  to anon
  with check (true);
