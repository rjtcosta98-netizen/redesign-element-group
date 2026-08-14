import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'

// Crawlers de IA (motores de resposta e de treino) declarados um a um.
// O grupo `*` já os cobria, mas explicitar tem duas razões:
//  1. Google-Extended e Applebot-Extended só reconhecem a diretiva quando vem
//     com o nome deles — não herdam do `*`.
//  2. Torna a política legível para quem audita o site, e deixa o robots.txt
//     coerente com a configuração da Cloudflare (ver nota abaixo).
//
// NOTA DE INFRAESTRUTURA: de nada serve o Allow aqui se a firewall bloquear
// antes. Se estes agentes voltarem a receber 403, o problema está na Cloudflare
// (Security → Bots → "Block AI Scrapers and Crawlers" / AI Crawl Control),
// não neste ficheiro. Confirma com:
//   curl -sI -A "Mozilla/5.0 (compatible; ClaudeBot/1.0)" https://elementgroup.pt/
const AI_CRAWLERS = [
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  // OpenAI
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google (Gemini / AI Overviews) e Apple — só obedecem ao nome próprio
  'Google-Extended',
  'Applebot-Extended',
  // Restantes motores e datasets
  'CCBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'Bytespider',
  'cohere-ai',
  'DuckAssistBot',
  'MistralAI-User',
  'YouBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
