import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import GlowButton from '@/components/ui/GlowButton'
import CoverArt from '@/components/blog/CoverArt'
import { POSTS, getPost, relatedPosts, formatDate } from '@/lib/posts'
import JsonLd from '@/components/JsonLd'
import { SITE, breadcrumbSchema } from '@/lib/seo'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Element Group`,
    description: post.excerpt,
    keywords: [post.category, 'Element Group', 'marketing digital Portugal', 'PME Portugal', 'dicas negócio online'],
    alternates: { canonical: `/blog/${post.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      locale: 'pt_PT',
      siteName: 'Element Group',
      images: [{ url: `${SITE.url}/opengraph-image`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [`${SITE.url}/opengraph-image`],
    },
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const related = relatedPosts(post.slug, 3)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'pt-PT',
    url: `${SITE.url}/blog/${post.slug}`,
    image: `${SITE.url}/opengraph-image`,
    mainEntityOfPage: { '@id': `${SITE.url}/blog/${post.slug}#webpage` },
    isPartOf: { '@id': `${SITE.url}/#website` },
    author: {
      '@type': 'Person',
      '@id': `${SITE.url}/sobre#author`,
      name: 'Ricardo Jorge',
      url: `${SITE.url}/sobre`,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE.url}/#business`,
      name: 'Element Group',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/web-app-manifest-512x512.png`,
      },
    },
  }
  const breadcrumb = breadcrumbSchema([
    { name: 'Início', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ])

  return (
    <main>
      <JsonLd data={[schema, breadcrumb]} />

      <article>
        {/* Header */}
        <header className="relative overflow-hidden bg-bg pt-36 pb-10 px-6">
          <div aria-hidden className="absolute top-10 left-1/2 -translate-x-1/2 w-[680px] h-[420px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.13), transparent 62%)' }} />
          <div className="relative max-w-[760px] mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors">
              <span aria-hidden>←</span> Blog
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent font-medium">{post.category}</span>
              <span className="text-[11px] text-dark">{formatDate(post.date)} · {post.readingMinutes} min de leitura</span>
            </div>

            <h1 className="mt-4 text-white tracking-[-0.03em] leading-[1.05]">{post.title}</h1>
            <p className="mt-5 text-muted text-lg leading-relaxed">{post.excerpt}</p>

            <div className="mt-7 flex items-center gap-3">
              <Image src="/ricardo-portrait.jpg" alt="Ricardo Jorge" width={40} height={40} className="w-10 h-10 rounded-full object-cover object-top border border-white/10" />
              <div className="text-sm">
                <p className="text-white leading-tight">Ricardo Jorge</p>
                <p className="text-[11px] text-dark">Fundador · Element Group</p>
              </div>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="px-6">
          <CoverArt category={post.category} className="max-w-[900px] mx-auto h-52 md:h-72 rounded-[24px] border border-white/10" />
        </div>

        {/* Body — comfortable reading column */}
        <div className="px-6 py-14">
          <div className="max-w-[700px] mx-auto">
            {post.body.map((b, i) => {
              if (b.type === 'h2') {
                return <h2 key={i} className="text-white font-heading text-xl md:text-2xl font-medium tracking-[-0.01em] mt-10 mb-3">{b.text}</h2>
              }
              if (b.type === 'ul') {
                return (
                  <ul key={i} className="my-4 flex flex-col gap-2.5">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex gap-3 text-muted leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                )
              }
              return <p key={i} className="text-muted leading-relaxed my-4">{b.text}</p>
            })}
          </div>
        </div>

        {/* Contextual CTA — liga ao serviço do tema */}
        {post.service && (
          <div className="px-6 pb-16">
            <div className="max-w-[760px] mx-auto rounded-[24px] border border-accent/30 bg-accent/[0.05] p-8 md:p-10 text-center">
              <h2 className="text-white font-heading text-xl md:text-2xl font-medium tracking-[-0.01em]">
                Gostas do que lês? Posso ajudar-te a aplicá-lo.
              </h2>
              <p className="mt-3 text-muted text-sm max-w-md mx-auto leading-relaxed">
                Se quiseres pôr isto a funcionar no teu negócio, é só falares comigo — sem compromisso.
              </p>
              <div className="mt-7 flex justify-center">
                <GlowButton href={post.service.href}>{post.service.label}</GlowButton>
              </div>
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-bg border-t border-white/10 px-6 py-16">
            <div className="max-w-[1100px] mx-auto">
              <h2 className="text-white font-heading text-xl font-medium tracking-[-0.01em] mb-8">Continua a ler</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="group flex flex-col rounded-[20px] border border-white/10 bg-bg-card overflow-hidden transition-colors hover:border-white/25">
                    <CoverArt category={r.category} className="h-36" />
                    <div className="p-6">
                      <span className="text-[11px] uppercase tracking-[0.14em] text-accent/90">{r.category}</span>
                      <h3 className="mt-2 text-white font-heading text-base font-medium leading-snug">{r.title}</h3>
                      <p className="mt-3 text-[11px] text-dark">{formatDate(r.date)} · {r.readingMinutes} min</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </main>
  )
}
