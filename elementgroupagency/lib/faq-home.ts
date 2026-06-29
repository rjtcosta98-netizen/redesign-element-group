// FAQ data shared between FAQ.tsx (client UI) and app/page.tsx (server-side JSON-LD).
// Keeping it here avoids importing from a 'use client' boundary, which would
// prevent Googlebot and AI crawlers from seeing the FAQPage schema in initial HTML.

export const FAQS = [
  {
    q: 'Quanto custa um website?',
    a: 'Os nossos websites começam em 297€, com preço fixo definido à cabeça — sem custos escondidos. O valor final depende do que precisas (site institucional, loja online, número de páginas) e dizemos-te tudo na proposta gratuita, antes de avançares.',
  },
  {
    q: 'Quanto tempo demora a ter o meu site pronto?',
    a: 'Depende da dimensão do projeto: um site institucional fica normalmente pronto mais depressa do que uma loja online completa. Depois de conversarmos, indicamos um prazo concreto na proposta — e cumprimo-lo.',
  },
  {
    q: 'Preciso de perceber de tecnologia ou tratar do domínio e alojamento?',
    a: 'Não. Tratamos de tudo por ti — design, desenvolvimento, domínio e alojamento. Só precisas de nos dizer o que queres para o teu negócio; a parte técnica é connosco.',
  },
  {
    q: 'Já tenho um site. Conseguem melhorá-lo?',
    a: 'Sim. Podemos redesenhar, acelerar (PageSpeed 95+) e otimizar para SEO o teu site atual, ou criar um novo de raiz — o que fizer mais sentido para os teus objetivos e orçamento.',
  },
  {
    q: 'Trabalham com o meu setor e com a minha zona?',
    a: 'Trabalhamos com PMEs de praticamente qualquer setor, em todo o Portugal — presencialmente ou à distância. Especializamo-nos em pequenos e médios negócios, não em grandes multinacionais.',
  },
  {
    q: 'O que acontece depois do site estar online?',
    a: 'Não desaparecemos. Temos planos mensais de manutenção, SEO e gestão de redes para o teu negócio continuar a crescer — mas sem obrigação: o site é teu e continuas connosco só se quiseres.',
  },
]
