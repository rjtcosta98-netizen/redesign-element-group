# Caso de estudo — Maria Mendes Massagens: Redesign & Conversão (CRO)

**Data:** 2026-07-10
**Slug:** `maria-mendes-redesign`
**Autor:** Ricardo Jorge / Element Group

## Contexto e objetivo

O Ricardo fez um redesign ao site `mariamendesmassagens.pt` e publicou-o no Instagram
(post `DagT92AAA87`). Objetivo: transformar essa história num caso de estudo de
portefólio, otimizado para **SEO** e **AEO** (answer engine optimization).

### Decisão-chave: segundo caso, não substituição

Já existe uma entrada `maria-mendes-massagens` no portefólio, focada em **SEO local**
(«sem site → #1 no Google»). Este redesign é uma **história distinta** — foco em design
de conversão. Decisão do cliente: criar um **2.º caso separado** (`maria-mendes-redesign`),
a viver ao lado do de SEO.

### SEO em duas camadas

- **Não** ataca as keywords do cliente (`massagens seia`/`são romão`) — o caso de SEO
  já as detém; repetir causaria **canibalização**. Cada caso, o seu território.
- **Ataca as keywords Element Group** (foco em captação de leads para a agência):
  redesign de website, CRO, agência web/digital (geo Guarda/Seia/Serra da Estrela),
  SEO local como serviço, e prova/resultados.

## Narrativa (fonte: legenda do Instagram)

Tese central: **«O design não é gosto. É comportamento.»**
Ângulo: mesmo conteúdo, palavra por palavra — só mudaram **4 coisas**, e reservar
deixou de ser um salto de fé.

Os 4 pilares (→ `approach[]`):
1. **Atmosfera** — uma paleta só, repetida. O cliente não repara, mas sente.
2. **Fotografia real** — fora ícones genéricos, dentro o espaço real (telemóvel serve).
3. **Clareza** — a promessa passou de 3 parágrafos a caber num ecrã.
4. **Confiança** — avaliações 5,0★ ao lado do botão de reserva, não numa página perdida.

Resultado (honesto, qualitativo — sem números inventados):
- Do primeiro clique à reserva enviada: ~1 minuto, no telemóvel.
- Experiência 100% mobile-first.
- Zero conteúdo novo — só melhor mostrado.

## Arquitetura da implementação

O portefólio é data-driven: uma entrada em `PROJECTS` (`app/portfolio/projects.tsx`)
gera automaticamente rota, meta tags, JSON-LD, sitemap, breadcrumbs e cards relacionados.

### 1. `lib/seo.ts` — novo helper `faqSchema(slug, faq)`
Gera `FAQPage` JSON-LD, `@id` ancorado a `/portfolio/<slug>#faq`. Motor do AEO.

### 2. `app/portfolio/projects.tsx`
- Novo campo no `type Project`: `faq?: { q: string; a: string }[]`.
- Novo objeto `Project` com slug `maria-mendes-redesign`: narrativa dos 4 pilares,
  `seoKeywords[]` (camada Element Group), `faq[]` (5 perguntas citáveis por IA),
  `gallery[]` com placeholders before/after e `showcase` = design novo (imagens reais
  existentes).

### 3. `app/portfolio/[slug]/page.tsx`
- Importa e injeta `faqSchema` no array de JSON-LD quando `project.faq` existe.
- Renderiza secção FAQ acessível (`<details>`/`<summary>` nativo, sem JS) entre
  «Serviços usados» e o CTA final.

## AEO — bloco FAQ (5 perguntas)

1. Vale a pena fazer redesign a um site que já funciona?
2. O que muda num redesign focado em conversão (CRO)?
3. Preciso de fotografia profissional para o site converter?
4. Quanto tempo demora a marcar no site novo da Maria Mendes?
5. Quem faz redesign de websites na Guarda e Serra da Estrela? *(captura geo + marca)*

## Assets e testemunho (resolvido)

- **Testemunho novo** da Maria sobre o redesign — fornecido e ligado ao campo `quote`.
- **Imagens before/after** — fornecidas pelo Ricardo em `public/Projetos/redesingmaria/`
  (AntesWeb/AntesMob = webp; DepoisWeb/DepoisMob = PNG, convertidos para webp com `cwebp -q 82`).
  Curados 6 shots para `public/Projetos/mariamendes/` (prefixo `mm-`):
  - `showcase`: `mm-depois-web.webp` (secção premium escura/dourada) + `mm-depois-mob.webp` (área de cliente).
  - `gallery` 2×2 comparativa: `mm-antes-web` · `mm-depois-web2` · `mm-antes-mob` · `mm-depois-mob2`,
    com legendas «Antes»/«Depois» (o `<figcaption>` mostra o `alt`).

## Verificação

- `tsc --noEmit` → exit 0.
- `next build` → `/portfolio/maria-mendes-redesign` prerenderizado como SSG, sem erros.

## Não incluído (YAGNI)

- Sem migração para Supabase (mantém o padrão hardcoded atual).
- Sem alterar o caso de SEO existente.
- Sem métricas quantitativas fabricadas — só factos qualitativos verificáveis.
