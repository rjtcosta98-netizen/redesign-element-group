import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/seo'
import { POSTS } from '@/lib/posts'
import { PROJECTS } from '@/app/portfolio/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`

  // Páginas principais — prioridade por importância de negócio.
  const core: MetadataRoute.Sitemap = [
    { url: url('/'),                          changeFrequency: 'weekly',  priority: 1.0 },
    { url: url('/servicos/web'),              changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/servicos/seo'),              changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/servicos/social'),           changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/servicos/planos-mensais'),   changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/portfolio'),                 changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/sobre'),                     changeFrequency: 'yearly',  priority: 0.7 },
    { url: url('/contacto'),                  changeFrequency: 'yearly',  priority: 0.8 },
    { url: url('/recursos'),                  changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/parcerias'),                 changeFrequency: 'yearly',  priority: 0.6 },
    { url: url('/blog'),                      changeFrequency: 'weekly',  priority: 0.7 },
    { url: url('/politica-de-privacidade'),   changeFrequency: 'yearly',  priority: 0.2 },
    { url: url('/politica-de-cookies'),       changeFrequency: 'yearly',  priority: 0.2 },
    { url: url('/subprocessadores'),          changeFrequency: 'yearly',  priority: 0.2 },
  ]

  const posts: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const projects: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: url(`/portfolio/${p.slug}`),
    lastModified: p.year ? new Date(`${p.year}-06-01`) : undefined,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...core, ...posts, ...projects]
}
