-- Tabela de leads do formulário de contacto da Element Group.
-- Corre isto no SQL Editor do teu projeto Supabase.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  message       text not null,
  service       text,
  source        text default 'website-contact',
  consent       boolean not null default false,  -- consentimento RGPD dado
  consent_text  text                             -- texto exato aceite (prova)
);

-- Segurança: liga RLS e permite APENAS inserir (a chave anónima nunca lê os leads).
alter table public.leads enable row level security;

drop policy if exists "Public pode inserir leads" on public.leads;
create policy "Public pode inserir leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- (Opcional) notificação por email a cada novo lead:
-- usa um Database Webhook / Edge Function a apontar para o teu email ou ao teu provider.
