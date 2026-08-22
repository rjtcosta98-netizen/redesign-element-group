# Reestruturação do catálogo de serviços — design

**Data:** 2026-08-22
**Âmbito:** arquitetura de serviços, preços e páginas do site elementgroup.pt
**Origem:** `EG - INFOS-IDEIAS`, `element-group-catalogo-servicos-precos` (12/08), `element-group-fase2-portfolio-servicos` (11/08), `LACUNAS A CORRIGIR`, `CONCORRENTES DETETADOS`, `EG - Novos preços e serviços`
**Estado:** desenho aprovado nas oito decisões da §1; implementação por aprovar

---

## 0. O problema, numa frase

O site vende quatro serviços a preços de 2024 — 297 € de landing page, 790 € de site, 197 €/mês de social — enquanto a casa já entrega software com Stripe, RLS e painel de gestão, e já recebeu um RFQ corporativo. O catálogo decidido a 12/08 tem doze linhas de projeto, três planos e três módulos; o site expõe quatro. Esta reestruturação fecha essa distância.

Duas frases no site bloqueiam tudo o resto e saem primeiro: **"por um terço do preço de uma agência"** e **"a partir de 297 €"**. Enquanto lá estiverem, nenhum preço novo é defensável na mesma página.

---

## 1. Decisões tomadas nesta sessão

| # | Questão | Decisão |
|---|---------|---------|
| Q1 | Âmbito | Só plano/spec. Implementação por fases, aprovadas uma a uma. |
| Q2 | Exibição de preço | **Intervalos visíveis** do catálogo (ex.: "2.500-3.500 €") com a nota *valor fixo fechado após diagnóstico*. Cumpre R2 na substância e mantém o tráfego de pesquisa por preço. |
| Q3 | Escopo de IA | **Três serviços**: Visibilidade em IA (B2), Diagnóstico (C1) e Assistente de qualificação (novo). Automações leves entram como componente do plano E3, sem página própria. RAG, CRM+IA e BI ficam fora, como a Fase 2 determina. |
| Q4 | `/servicos/social` | **Converter**, não eliminar. O URL mantém-se e passa a "Conteúdo & Marketing", explicando o conteúdo como componente do E2/E3, com o marketing com IA supervisionada do INFOS-IDEIAS. Sem pacotes à venda. |
| Q5 | Diagnóstico | **Produto único pago** — "Diagnóstico Digital & Prontidão para IA", 490-890 €, abatido no projeto. Funde a lista do INFOS-IDEIAS com o C1 do catálogo. A chamada de 30 min continua gratuita e serve para qualificar. |
| Q6 | Navegação | **Hub `/servicos` + quatro famílias** no mega-menu, com Planos Mensais destacado à parte. |
| Q7 | Corporativo | **Sim, sem página nova.** Linguagem e um bloco dedicado no hub e em A1/A6. `/empresas` fica para quando houver caso publicado. |
| Q8 | 100 Montanhas | **Entra no plano como bloqueante**, com material a fornecer pelo Ricardo (§9). |

---

## 2. O catálogo final

### 2.1 Sai do catálogo

| O que sai | Onde vive hoje | Porquê |
|---|---|---|
| Landing Page — 297 € | `app/servicos/web/page.tsx:337` | Degrau que compete com geradores de IA e perde sempre. Novo piso de web: 2.500 €. |
| Website Essencial — 790 € | `app/servicos/web/page.tsx:339` | Mesma razão. É também o número que significa coisas diferentes em `/servicos/web` e `/parcerias`. |
| Website Profissional — 1.290 € | `app/servicos/web/page.tsx:341` | Absorvido por A1 (2.500-3.500 €). |
| Redesign — desde 590 € | `app/servicos/web/page.tsx:343` | Sobe para A5, 1.500-2.500 €. |
| Setup Google + Perfis — 297 € | `app/servicos/seo/page.tsx:339` | Absorvido por B1 (890-1.200 €), que já inclui SEO local. |
| Setup SEO Técnico — 390 € | `app/servicos/seo/page.tsx:341` | Idem. |
| Copywriting — desde 190 € | `app/servicos/seo/page.tsx:343` | Deixa de ser linha avulsa; é entregável dentro de A1/A5 e do plano E2. |
| SEO para IAs (GEO) — 290 € add-on | `app/servicos/seo/page.tsx:345` | **Não morre — promove-se.** Sai do seletor e passa a página própria a 690-1.200 €. É o serviço que já vendes e ninguém encontra. |
| Gestão de Social Media — 197 €/mês | `app/servicos/social/page.tsx:334` | Único serviço com cancelamento registado; maior consumo de horas por euro. Absorvido pelos planos. |
| Pack de Posts — 190 € | `app/servicos/social/page.tsx:336` | Idem. |
| Pack Vídeo Vertical — 397 € | `app/servicos/social/page.tsx:338` | Idem. |
| Planos 97 / 197 / 297 €/mês | `app/servicos/planos-mensais/page.tsx:333,341,350` | Teto de 197 € torna a meta aritmeticamente impossível. Substituídos por 149 / 349 / 649 €. |
| Qualquer trabalho a 0 € | prática, não código | 44% do entregue foi faturado a zero. |

> **Ressalva registada do catálogo:** *medir antes de matar*. Se ao registar horas durante quatro semanas a gestão de redes ficar abaixo de 4h/mês por cliente, é rentável a 197 € e a decisão deve ser revista. Sem a coluna de horas, isto é decisão às cegas.

### 2.2 Sobe de preço

| Ref | Serviço | Antes | Depois |
|---|---|---|---|
| A1 | Site institucional (5-8 páginas) | 790 € | 2.500-3.500 € |
| A4 | Loja online | ~2.500 € | 3.500-6.000 € |
| A5 | Redesign + CRO | 50-490 € | 1.500-2.500 € |
| B1 | SEO — setup técnico + local | 297 € | 890-1.200 € |
| E1 | Plano Base | 60-97 €/mês | 149 €/mês |
| E2 | Plano Crescimento | 197 €/mês | 349 €/mês |

### 2.3 Nasce

| Ref | Serviço | Preço | Prioridade |
|---|---|---|---|
| A2 | Site com reservas, pagamentos e painel | 4.500-7.500 € | — |
| A3 | Motor de reservas e pagamentos sobre site existente | 2.500-4.500 € | **1** |
| A6 | Software e painéis à medida | 4.000-12.000 € | — |
| B2 | Visibilidade em IA (GEO/AEO) | 690-1.200 € | **2** |
| C1 | Diagnóstico Digital & Prontidão para IA | 490-890 € | **3** |
| D1 | Logótipo | 490-790 € | — |
| D2 | Identidade completa | 900-1.800 € | — |
| D3 | Identidade + aplicação a site e redes | 1.500-2.500 € | — |
| G1 | Assistente de IA para qualificação de leads (site + WhatsApp) | *proposta:* 1.200-2.500 € setup + 99-199 €/mês | **decisão pendente D4** |
| E3 | Plano Sistema | 649 €/mês | — |
| F1 | Módulo: operação do motor de reservas | 149-249 €/mês | — |
| F2 | Módulo: monitorização de citações em IA | 199-349 €/mês | — |
| F3 | Módulo: manutenção de software à medida | 249-449 €/mês | — |

**Regra R5 a respeitar no design das páginas:** os módulos F1-F3 nunca aparecem lado a lado com os planos como se fossem alternativas somáveis. Aparecem numa secção separada, rotulada *"só para quem não leva plano"*. O E2 já contém F2; o E3 já contém F1. Cobrar os dois é cobrar duas vezes a mesma coisa.

---

## 3. Arquitetura de informação

### 3.1 Mapa de páginas

```
/servicos                              ← NOVO · hub, as quatro famílias e o sistema completo
│
├── Web & Software
│   ├── /servicos/web                  ← ALTERAR · A1 + A2 + A4 + A5, sem Landing/Essencial
│   ├── /servicos/reservas-pagamentos  ← NOVO · A3 · prioridade 1
│   └── /servicos/software             ← NOVO · A6
│
├── SEO & Visibilidade em IA
│   ├── /servicos/seo                  ← ALTERAR · B1 · GEO sai daqui
│   └── /servicos/visibilidade-ia      ← NOVO · B2 · prioridade 2
│
├── IA & Automação
│   ├── /servicos/diagnostico-ia       ← NOVO · C1 · prioridade 3
│   └── /servicos/assistente-ia        ← NOVO · G1
│
├── Marca & Conteúdo
│   ├── /servicos/design               ← NOVO · D1-D3
│   └── /servicos/social               ← CONVERTER · "Conteúdo & Marketing", sem venda
│
└── /servicos/planos-mensais           ← ALTERAR · E1/E2/E3 + módulos F1-F3

/portfolio/100-montanhas               ← NOVO · pré-condição P3, hoje 404
```

Onze páginas de serviço mais o hub, contra as quatro de hoje.

### 3.2 Porque estas quatro famílias

Não são categorias de conveniência — cada uma corresponde a uma pergunta diferente que o cliente traz:

- **Web & Software** — *"preciso de uma coisa construída"*. É o produto central e o que gera recorrente.
- **SEO & Visibilidade em IA** — *"ninguém me encontra"*. Separa deliberadamente o Google do ChatGPT, porque são hoje duas compras distintas e é onde o concorrente da Guarda já se posiciona.
- **IA & Automação** — *"gasto tempo em coisas repetidas"*. Entrada barata de produzir (C1) que abre A3 e A6.
- **Marca & Conteúdo** — *"pareço amador"*. 36% das leads de 25 dias pediram design e não havia uma única página para as receber.

### 3.3 Navegação

`components/Nav.tsx` passa de uma lista de quatro para um mega-menu de quatro colunas mais um destaque:

```
SERVIÇOS
+------------------+------------------+------------------+------------------+
| WEB & SOFTWARE   | SEO & IA         | IA & AUTOMAÇÃO   | MARCA & CONTEÚDO |
| Websites e lojas | SEO e Google     | Diagnóstico      | Marca e design   |
| Reservas e pagam.| Visibilidade IA  | Assistente de IA | Conteúdo e mkt   |
| Software à medida|                  |                  |                  |
+------------------+------------------+------------------+------------------+
  Ver todos os serviços          PLANOS MENSAIS — desde 149 €/mês
```

Regras: no telemóvel as famílias tornam-se acordeão (o menu atual já é uma folha vertical — mantém-se o padrão, com um nível de agrupamento); a linha "Ver todos os serviços" aponta ao hub; Planos fica visualmente destacado porque é o recorrente que sustenta a meta (R4).

`components/servicos/RelatedServices.tsx` precisa de alteração estrutural: o tipo `Key` é hoje uma união fechada de quatro (`'web' | 'seo' | 'social' | 'plans'`) e o `ORDER` mostra sempre os outros três. Com onze páginas isso deixa de funcionar. Passa a mostrar **as irmãs da mesma família primeiro, e depois um cartão para o hub** — no máximo três cartões, para não inchar o rodapé da página.

---

## 4. Fichas das páginas novas

Todas seguem o esqueleto que as páginas atuais já provaram — Hero, PainPoints, Inclui, Para quem é, Processo, Resultados, Preço, FAQ, Serviços relacionados, CTA final — com as variações que cada serviço exige. O que se afasta do template está marcado em **negrito**.

### 4.1 `/servicos/reservas-pagamentos` — A3 · prioridade 1

**Porque é a primeira.** É a linha mais defensável da casa: o argumento é aritmética que o dono do negócio faz de cabeça, e o retorno verifica-se no extrato dele, não numa promessa de marketing.

- **Hero** — "Deixa de pagar 25% de comissão em cada reserva." Subtítulo: motor de marcações e pagamentos instalado no site que já tens.
- **Bloco de aritmética, imediatamente a seguir ao hero** — é a secção que vende a página e vem antes da dor, ao contrário do template. Números verificáveis: Booking 10-20% (média 15%); GetYourGuide e Viator 20-30%, sendo 25% o mais reportado e o custo real 3-5 pontos acima depois de taxas e promoções obrigatórias; gestão de alojamento local em Portugal 15-25% da receita.
- **Componente novo: calculadora de comissões.** O visitante indica a receita mensal via plataformas e a comissão que paga; a página devolve o que gasta por ano, a poupança ao recuperar 30% para canal direto, e em quantos meses o sistema se paga. O exemplo do catálogo já lá está: 2.000 €/mês a 25% são 500 €/mês de comissão, e recuperar 30% poupa 150 €/mês.
- **Para quem é** — alojamento, atividades, clínicas, estética, ginásios, formação, restauração com reserva. Horizontal por setor, e a página deve dizê-lo.
- **O que inclui** — motor de marcações com agenda em base de dados, checkout Stripe (sinal ou pagamento integral), painel de gestão, confirmações automáticas, autenticação e regras de acesso (RLS).
- **Prova** — 100 Montanhas: Stripe com edge functions, RLS provada, oito provas ponta-a-ponta. **Bloqueado por P3.**
- **Limites ditos em voz alta** — suporte de pagamentos é responsabilidade a sério; falhas de checkout são urgentes e o SLA é honesto e com horário limitado. Dizer isto na página é sinal de competência, não fraqueza.
- **Preço** — 2.500-4.500 €, valor fixo fechado após diagnóstico. Plano proposto no fecho: E3 Sistema, ou módulo F1 se recusar plano.
- **Venda cruzada obrigatória** — vende-se sempre com SEO/GEO no mesmo pacote: sem tráfego direto o motor fica vazio e a culpa cai em ti. A página liga a `/servicos/seo` e `/servicos/visibilidade-ia`.

### 4.2 `/servicos/visibilidade-ia` — B2 · prioridade 2

**Não é um serviço novo.** É o pacote "SEO para IAs (GEO)" que já vendes a 290 €, escondido dentro de um seletor, sem página e sem descrição.

- **Hero** — "Quando alguém pergunta ao ChatGPT quem faz isto na tua zona, o teu nome tem de aparecer."
- **Os números que o vendem** — AI Overviews em 48% das pesquisas; CTR orgânico −61%; +35% de cliques para marcas citadas. O mercado PT já vende packs desde 150 €; o internacional vai de 1.500 $ a 50.000 $/mês.
- **Componente novo: visualização de linha de base.** Antes e depois de citações em cinco queries reais do setor do cliente. A medição documentada *antes* de qualquer alteração é o entregável que separa isto de vender fumo.
- **O que inclui** — acesso de crawlers de IA (desbloqueio e verificação), `llms.txt`, dados estruturados, conteúdo em formato de resposta, consistência de entidade (NAP, Google Business, diretórios), medição de citações com linha de base.
- **Limite rígido, escrito na página** — não se pode garantir citação. Vende-se processo e medição, nunca posição.
- **Preço** — 690-1.200 €. Plano no fecho: E2, ou módulo F2.
- **Pré-condição bloqueante P2** — desbloquear ClaudeBot, GPTBot, ChatGPT-User e PerplexityBot no Cloudflare. Vender GEO com o próprio site a devolver 403 aos crawlers de IA é indefensável, e está assim há dois meses.

### 4.3 `/servicos/diagnostico-ia` — C1 · prioridade 3

Produto único, fundindo o Diagnóstico Digital do INFOS-IDEIAS com a prontidão para IA do catálogo. É a porta de entrada mais barata de produzir e a que abre A3 e A6: vende-se um diagnóstico de 490 € e sai-se com um projeto de 4.000 €.

- **Hero** — "Meia jornada a olhar para o teu negócio. No fim, sabes exatamente o que automatizar primeiro."
- **O que inclui** — análise do website; SEO local e Google Business Profile; revisão das redes; análise da jornada do cliente; inventário das ferramentas de IA já em uso, incluindo o *shadow AI* dos colaboradores; mapa de 3-5 tarefas automatizáveis com estimativa de horas poupadas; política interna de uso aceitável de IA; sessão de formação de 90 minutos com registo de participação; documento final e plano priorizado a 30, 60 e 90 dias.
- **Componente novo: antes e depois de um processo.** O INFOS-IDEIAS pede isto explicitamente e é o que impede a página de prometer que "a IA faz tudo": *um pedido recebido no website é analisado, classificado, registado no CRM e encaminhado para a pessoa certa*. Um diagrama, não um parágrafo.
- **Os factos que o legitimam** — o artigo 4.º do AI Act aplica-se desde 2 fev 2025 e o restante Regulamento desde 2 ago 2026; apenas 11,5% das empresas portuguesas usam IA, e sobretudo de forma informal; o MIT identifica a *shadow AI economy*; fornecedores externos têm o dobro da taxa de sucesso de implementações internas.
- **Limite rígido, sem exceção** — nunca dar garantia de conformidade legal, nunca usar coimas como argumento de venda, nunca classificar risco de sistemas. Encaminhar para jurista assim que a conversa lá chegar. Isto vincula a copy da página, não apenas a conversa de venda.
- **Preço** — 490-890 €, abatido no projeto se avançares.
- **Teste a fazer nas primeiras cinco chamadas** — se ninguém em PME ligar ao AI Act, corta-se a componente de conformidade e fica o mapa de automatização, que vende na mesma por poupança de horas. Isto muda a página, por isso fica registado aqui.

### 4.4 `/servicos/assistente-ia` — G1

O único serviço deste plano que o catálogo não fixou. Entra porque a procura está confirmada em Portugal — cerca de 30% das PME já usam, a crescer 20%/ano — há concorrente nacional a vendê-lo (automatizaia.pt) e é financiável a 75% pelo IAPMEI.

- **Hero** — "Um assistente que responde e qualifica, para tu falares só com quem interessa."
- **O que inclui** — assistente no site e no WhatsApp; respostas a perguntas frequentes a partir dos teus conteúdos; qualificação de pedidos com encaminhamento; registo do contacto; notificação interna; painel com o histórico.
- Reutiliza o componente **antes e depois** de 4.3.
- **A tensão a resolver na copy** — `/contacto` promete hoje *"Sem chatbots, sem respostas automáticas genéricas"*. A página tem de dizer a versão nova, sem contradição: *quem responde ao teu pedido sou eu, não um robô; a automação que construo é para o teu negócio poupar tempo, não para eu fugir de ti.*
- **Menção ao financiamento** — factual e sem promessa: existe financiamento IAPMEI para projetos de IA; a Element Group não trata da candidatura.
- **Preço** — **decisão pendente D4**, proposta de 1.200-2.500 € de setup mais 99-199 €/mês. Não publicar sem confirmação.

### 4.5 `/servicos/design` — D1-D3

- **Hero** — "Uma marca que não parece feita à pressa."
- **Três pacotes** — logótipo 490-790 €; identidade completa 900-1.800 €; identidade aplicada a site e redes 1.500-2.500 €.
- **Case study** — Estrela Detail Wash, que já existe em `app/portfolio/projects.tsx`.
- **Ressalva que molda o design da página** — o branding puro é o mais exposto à IA generativa de todo o portfólio e o menos recorrente. Não se abre como linha principal, abre-se como **captador**: o valor está no cliente que entra por 790 € de logótipo e sai com 349 €/mês. Em concreto, o D3 é o pacote destacado — é o único que já toca site e redes — e o CTA secundário aponta aos planos, não a mais design.

### 4.6 `/servicos/software` — A6

- **Hero** — "Quando a folha de Excel já não chega."
- **Prova** — app de resultados ao vivo da AD São Romão e painel F0-F5 com agenda em base de dados da 100 Montanhas. Os primeiros já estão no portfólio (`ad-sao-romao`, `adsr-cup-app`); o da 100 Montanhas falta.
- **Argumento central** — é o entregável que a IA generativa não replica: exige base de dados, autenticação, RLS, estados e manutenção.
- **Regras de aceitação visíveis na página** — um projeto de cada vez; 40% adiantado, sem exceção. Publicar as regras filtra o cliente errado antes da chamada.
- **Bloco corporativo** (decisão Q7) — processo, SLA, faturação e trabalho à distância, para o decisor remoto tipo Securitas Angola.
- **Preço** — 4.000-12.000 €. Plano no fecho: F3 ou E3.

### 4.7 `/servicos` — hub

A página que hoje não existe e que responde às pesquisas de comparação onde não apareces.

- **Hero de posicionamento** — a frase do INFOS-IDEIAS: *parceiro de crescimento digital para PMEs — estratégia, presença online, automação e IA num sistema simples e orientado a resultados*. Não é "websites, redes sociais e marketing".
- **As quatro famílias** em grelha, cada uma com as suas páginas.
- **O sistema, não a lista** — um diagrama de percurso: diagnóstico, construção, visibilidade, plano mensal. É o que transforma serviços isolados numa transformação vendável.
- **Bloco corporativo** (Q7).
- **Tabela-resumo de todo o catálogo** com os intervalos, ligando a cada página.

---

## 5. Alterações às páginas existentes

### 5.1 `/servicos/web` — A1 + A2 + A4 + A5

- Remover os cinco pacotes atuais (`app/servicos/web/page.tsx:337-345`) e substituir por quatro linhas: site institucional 2.500-3.500 €; site com reservas e pagamentos 4.500-7.500 €; loja online 3.500-6.000 €; redesign e CRO 1.500-2.500 €.
- A `metadata.description` (linha 22) tem "A partir de 297€" — sai.
- A FAQ (linha 355) refere redesign "a partir de 590€" — atualizar para 1.500-2.500 €.
- A2 entra aqui como degrau superior, com ligação forte a `/servicos/reservas-pagamentos` para quem já tem site.
- **A promessa muda de eixo.** "Rápido" continua verdadeiro e fica; mas o argumento passa a ser *mais fácil para o cliente pedir orçamento, marcar, comprar ou contactar*. Cada projeto anuncia, quando aplicável: estrutura baseada na jornada do cliente, copywriting orientado a conversão, formulários inteligentes, integração com CRM ou email, tracking de contactos e vendas, SEO técnico e local, analytics e eventos de conversão, área de conteúdos, assistente de IA quando fizer sentido.
- **Bloco corporativo** (Q7).

### 5.2 `/servicos/seo` — B1, sem GEO

- Remover os quatro pacotes (`app/servicos/seo/page.tsx:339-345`). Fica uma linha: setup técnico e local, 890-1.200 €.
- O item "SEO para IAs (GEO) — 290 €" (linha 345) **não se apaga**: converte-se num bloco de remissão para `/servicos/visibilidade-ia`.
- Substituir a âncora "a partir de 297 €" pela âncora de resultado do catálogo.

### 5.3 `/servicos/social` — converter em "Conteúdo & Marketing"

- Remover os três pacotes (`app/servicos/social/page.tsx:334-338`). A página deixa de ter preço.
- Nova função: explicar como o conteúdo funciona *dentro* dos planos — quatro peças/mês no E2, mais no E3 — e apresentar o **marketing com IA supervisionada** do INFOS-IDEIAS: planeamento editorial, criação de rascunhos, adaptação a diferentes redes, reaproveitamento de artigos em posts/emails/vídeos, análise de desempenho, sugestões de temas a partir de perguntas reais dos clientes.
- A frase que a página tem de deixar clara: **a IA acelera o trabalho; a estratégia, a revisão e a identidade da marca continuam humanas.**
- Título e navegação passam a "Conteúdo & Marketing"; o URL `/servicos/social` mantém-se (SEO e links históricos).
- CTA único: os planos mensais.

### 5.4 `/servicos/planos-mensais` — E1/E2/E3

Substituir os três planos (`app/servicos/planos-mensais/page.tsx:333-350`):

| Plano | € /mês | Inclui | Horas/mês |
|---|---|---|---|
| E1 · Base | 149 | Monitorização, backups, atualizações, correções, relatório | 1-2h |
| E2 · Crescimento | 349 | Base + SEO contínuo + GEO/citações em IA medidas + 4 peças de conteúdo | 4-5h |
| E3 · Sistema | 649 | Crescimento + operação do motor de reservas/pagamentos + painel + automação de um fluxo + revisão trimestral | 8-10h |

- Cada plano inclui o anterior — o padrão "tudo do anterior +" já existe na página e mantém-se.
- **A reformulação central não é o preço, é o eixo:** sai "manutenção" (uma lista de tarefas, que se compara por preço) e entra "sistema" (resultado composto). As horas/mês são publicadas — é o que impede a comparação por lista.
- **Secção nova e visualmente separada: módulos avulso F1-F3**, rotulada *só para quem não leva plano*, com a regra R5 dita na página: o Crescimento já inclui a monitorização de citações, o Sistema já inclui a operação do motor.
- Metadata (linhas 23, 30, 62) diz "Desde 97€/mês" — passa a 149 €.
- FAQ: manter "sem fidelização", que é diferenciador real; atualizar a resposta sobre a diferença entre planos.

### 5.5 `/parcerias` — comissões

`app/parcerias/ParceriasContent.tsx:62-64` tem três serviços a 490/790/2.500 € com 10% de comissão. O 790 € aqui e o 790 € em `/servicos/web` significam coisas diferentes — é uma das incoerências públicas de P6. Proposta, mantendo os 10%:

| Serviço | Preço | Comissão |
|---|---|---|
| Site institucional | 2.500 € | 250 € |
| Reservas e pagamentos | 3.500 € | 350 € |
| Loja online | 3.500 € | 350 € |
| Marca e design | 900 € | 90 € |

Também `ParceriasContent.tsx:1043-1046` ("150 € · Projeto Website 1.500 €") precisa de acerto à tabela nova.

### 5.6 Home e componentes globais

| Ficheiro | Linha | Está | Passa a |
|---|---|---|---|
| `components/sections/Hero.tsx` | 153-154 | "por um terço do preço de uma agência. A partir de 297€" | Âncora de resultado: "sites que carregam em menos de 1 segundo e aparecem no Google — e no ChatGPT." |
| `components/sections/FinalCTA.tsx` | 72 | "a partir de 297€" | Mesma âncora, ou remover o selo de preço |
| `components/sections/WhyUs.tsx` | 34 | "Preço fixo e justo, desde 297€" | "Preço fixo, fechado depois do diagnóstico" |
| `lib/faq-home.ts` | 8 | "começam em 297€ (…) proposta gratuita" | Novo piso 2.500 € e diagnóstico pago abatido no projeto |
| `app/contacto/page.tsx` | 155 | "Sem chatbots, sem respostas automáticas genéricas" | "Quem responde ao teu pedido sou eu, não um robô. A automação que construo é para o teu negócio poupar tempo — não para eu fugir de ti." |

A alteração ao passo 02 do contacto não é cosmética: é a frase que hoje proíbe a Element Group de vender a categoria de IA sem se contradizer.

---

## 6. Componentes a construir

| Componente | Onde serve | Porquê é novo |
|---|---|---|
| `ServiceHubGrid` | `/servicos` | As quatro famílias e o percurso do sistema. Nada equivalente existe. |
| `PriceRange` | todas as páginas de serviço | `PackageSelector` mostra preços únicos. Passa a mostrar intervalos com a nota "valor fixo fechado após diagnóstico" (decisão Q2). Ou se estende o existente, ou se cria ao lado — decidir na implementação. |
| `OtaCommissionCalculator` | `/servicos/reservas-pagamentos` | É o argumento de venda da linha prioritária. Interativo, com os números do catálogo por defeito. |
| `AiCitationBaseline` | `/servicos/visibilidade-ia` | Antes e depois de citações em queries reais. |
| `ProcessBeforeAfter` | `/servicos/diagnostico-ia`, `/servicos/assistente-ia` | O diagrama que o INFOS-IDEIAS pede: pedido recebido, analisado, classificado, registado, encaminhado. |
| `ModulesTable` | `/servicos/planos-mensais` | F1-F3 com a regra R5 visível. |
| `CorporateBlock` | `/servicos`, `/servicos/web`, `/servicos/software` | Processo, SLA, faturação e trabalho remoto para o decisor corporativo. |
| `Nav` (mega-menu) | global | Alteração estrutural de `components/Nav.tsx`. |
| `RelatedServices` | global | Alteração estrutural: famílias em vez de união fechada de quatro. |

Componentes existentes que se reutilizam sem alteração nas páginas novas: `PainPoints`, `IncludesGlobe`, `ProcessTimeline`, `ResultsFlow`, `FaqAccordion`, `AnimateOnScroll`, `GlowButton`, `JsonLd`.

---

## 7. Higiene técnica que acompanha a mudança

Estes pontos vêm das lacunas e não são opcionais — vários bloqueiam serviços deste catálogo.

1. **Desbloquear crawlers de IA no Cloudflare/WAF** — ClaudeBot, ChatGPT-User, PerplexityBot, GPTBot. Manter o bloqueio de treino (CCBot) via robots.txt, se se quiser essa linha. Retestar com um pedido que envie cada user-agent. **Bloqueia B2.**
2. **Remover `aggregateRating` do schema** (`lib/seo.ts:76-79`) — é self-serving contra as guidelines do Google. Manter 5,0 estrelas como texto com link ao perfil.
3. **Reconciliar o número de avaliações** — `SITE.rating.count` está a 9 (`lib/seo.ts:20`) e há uma página a dizer 7. Escolher o número certo e uniformizar.
4. **Adicionar `FAQPage` ao JSON-LD** de cada página de serviço — `lib/seo.ts` já exporta `faqSchema()` e o `@graph` já é bom (NIF, geo, founder); falta ligar o FAQPage às páginas. Hoje só `/servicos/planos-mensais` tem FAQ estruturada.
5. **Expandir a FAQ** — 4 a 6 perguntas por página de serviço, em formato extraível. É o que alimenta as citações em IA que se está a vender.
6. **`app/sitemap.ts`** — acrescentar as sete rotas novas, com prioridade 0.9 para as três prioritárias e 0.95 para o hub.
7. **Ficha do Google Maps** — corrigir a localização (está no meio do Atlântico) e os horários contraditórios.
8. **Pedir indexação da raiz no Search Console** — pendente desde 29/07.

---

## 8. Ordem de execução

Cada fase é aprovada antes de começar.

### Fase 0 — pré-condições (não se publica um preço novo sem estas)

| # | O quê | Esforço | Bloqueia |
|---|---|---|---|
| P2 | Desbloquear crawlers de IA no Cloudflare | 1h | B2 |
| P3 | Publicar `/portfolio/100-montanhas` | 4h | A1, A2, A3 |
| P6 | Corrigir incoerências públicas (avaliações, Maps, horários, duplo sentido do 790 €) | 3h | tudo |
| P1 | Responder às 11 leads Zaask | 3h | fora do site, mas 36% pediram design |
| P4 | Registar horas nos projetos | 30 min/projeto | decisão sobre social |
| P5 | Resolver a assinatura da Bella Essência | 15 min | saber o MRR de partida |

### Fase 1 — fundação

Hub `/servicos`, mega-menu, `RelatedServices` por famílias, `PriceRange`, limpeza dos preços antigos nos oito ficheiros da §5.6, as duas âncoras da home, passo 02 do contacto. **No fim desta fase o site já não contradiz o catálogo novo, mesmo sem uma única página nova.**

### Fase 2 — as três prioridades

`/servicos/reservas-pagamentos` (com calculadora), `/servicos/visibilidade-ia`, `/servicos/diagnostico-ia`. É a fase de maior retorno: prioridades 1, 2 e 3 do catálogo.

### Fase 3 — completar o catálogo

`/servicos/design`, `/servicos/software`, `/servicos/assistente-ia` (depois de D4 fechada).

### Fase 4 — reformular o existente

`/servicos/web`, `/servicos/seo`, conversão de `/servicos/social`, `/servicos/planos-mensais`, `/parcerias`, mais a higiene técnica da §7 (schema, FAQ, sitemap).

---

## 9. Decisões pendentes e o que é preciso de ti

**D4 · Preço do assistente de IA (G1).** Não existe no catálogo. Proposta: 1.200-2.500 € de setup mais 99-199 €/mês. Precisa de confirmação antes de publicar.

**D5 · Comissões de parcerias.** A §5.5 propõe manter os 10% sobre os preços novos. Confirmar a percentagem, ou fixar valores.

**D6 · Destino da promessa "proposta gratuita".** Aparece em `lib/faq-home.ts` e no contacto. Com o diagnóstico pago (Q5), a chamada de 30 minutos continua gratuita mas a análise deixa de ser. É preciso escolher a formulação exata.

**Material para `/portfolio/100-montanhas` (P3, bloqueante):**
- capturas do painel de gestão e do checkout;
- número de reservas ou receita processada, ou uma faixa publicável;
- o que o cliente pagava em comissões antes;
- autorização do cliente para publicar nome e números.

**Verificação factual antes de publicar.** Os números de mercado deste documento (48% de AI Overviews, −61% de CTR orgânico, +35% de cliques para marcas citadas, comissões de OTA, 11,5% de adoção de IA em PME portuguesas, cerca de 30% de PME com chatbot) vêm dos documentos da Fase 2 e não foram reverificados nesta sessão. Antes de irem para uma página pública com fonte citada, convém confirmar a origem de cada um.

---

## 10. Rastreabilidade

| Bloco deste documento | Origem |
|---|---|
| §2.1 cortes | Catálogo §4.1; Fase 2 §4.2 C1-C3 |
| §2.2 subidas | Catálogo §1; Fase 2 §4.4 |
| §2.3 linhas novas A2-A6, B2, C1, D1-D3, E1-E3, F1-F3 | Catálogo §1 e §2; Fase 2 §4.5 e §4.6 |
| G1 assistente de IA | `EG - Novos preços e serviços` (veredicto "Avançar"); INFOS-IDEIAS; sem preço de origem |
| §3 famílias e navegação | Deste documento, a partir do mapa de páginas do Catálogo §5.2 |
| §4 fichas de página | Catálogo §2 — argumentos e limites literais |
| §4.3 fusão dos diagnósticos | Decisão Q5 desta sessão, sobre INFOS-IDEIAS e Catálogo C1 |
| §5.3 marketing com IA supervisionada | INFOS-IDEIAS |
| §5.6 âncoras da home e contacto | Catálogo §0 e §4.2 |
| §7 higiene técnica | `LACUNAS A CORRIGIR`; auditoria SEO 13/07; dossier 10/08 |
| §8 Fase 0 | Catálogo §5.1 P1-P6 |
| Posicionamento do hub | INFOS-IDEIAS |
| Contexto competitivo (Wechase, JELLY, Somos6Digital) | `CONCORRENTES DETETADOS` |
