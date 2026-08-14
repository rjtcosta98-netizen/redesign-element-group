import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import GlowButton from '@/components/ui/GlowButton'
import CoverArt from '@/components/blog/CoverArt'
import { POSTS, getPost, relatedPosts, formatDate, readingMinutes } from '@/lib/posts'
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
    dateModified: post.updated ?? post.date,
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
      logo: `${SITE.url}/web-app-manifest-512x512.png`,
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
              <span className="text-[11px] text-dark">
                {formatDate(post.date)} · {readingMinutes(post)} min de leitura
                {post.updated && <> · atualizado a {formatDate(post.updated)}</>}
              </span>
            </div>

            <h1 className="mt-4 text-white tracking-[-0.03em] leading-[1.05]">{post.title}</h1>
            <p className="mt-5 text-muted text-lg leading-relaxed">{post.excerpt}</p>

            <div className="mt-7 flex items-center gap-3">
              <Image src="/ricardo-portrait.jpg" alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover object-top border border-white/10" />
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
              // Resposta destacada — fica no topo, curta e auto-suficiente, para
              // poder ser lida (e citada) sem o resto do artigo à volta.
              if (b.type === 'answer') {
                return (
                  <div key={i} className="my-6 rounded-[20px] border border-accent/30 bg-accent/[0.06] p-6 md:p-7">
                    <p className="text-white/90 leading-relaxed">{b.text}</p>
                  </div>
                )
              }
              if (b.type === 'h2') {
                return <h2 key={i} className="text-white font-heading text-xl md:text-2xl font-medium tracking-[-0.01em] mt-10 mb-3">{b.text}</h2>
              }
              if (b.type === 'h3') {
                return <h3 key={i} className="text-white font-heading text-base md:text-lg font-medium tracking-[-0.01em] mt-7 mb-2">{b.text}</h3>
              }
              if (b.type === 'ul') {
                return (
                  <ul key={i} role="list" className="my-4 flex flex-col gap-2.5">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex gap-3 text-muted leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                )
              }
              if (b.type === 'ol') {
                return (
                  <ol key={i} className="my-4 flex flex-col gap-2.5">
                    {b.items.map((it, j) => (
                      <li key={j} className="flex gap-3 text-muted leading-relaxed">
                        <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full border border-accent/40 text-accent text-[11px] grid place-items-center" aria-hidden>{j + 1}</span>
                        {it}
                      </li>
                    ))}
                  </ol>
                )
              }
              if (b.type === 'table') {
                return (
                  <figure key={i} className="my-7 -mx-6 md:mx-0">
                    <div className="overflow-x-auto px-6 md:px-0">
                      <table className="w-full min-w-[520px] border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-white/15">
                            {b.headers.map((h, j) => (
                              <th key={j} scope="col" className="text-left font-medium text-white py-3 pr-4 align-bottom">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {b.rows.map((row, j) => (
                            <tr key={j} className="border-b border-white/[0.07]">
                              {row.map((cell, k) => (
                                <td key={k} className={`py-3 pr-4 align-top leading-relaxed ${k === 0 ? 'text-white/90' : 'text-muted'}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {b.caption && (
                      <figcaption className="mt-3 px-6 md:px-0 text-[11px] text-dark">{b.caption}</figcaption>
                    )}
                  </figure>
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
                      <p className="mt-3 text-[11px] text-dark">{formatDate(r.date)} · {readingMinutes(r)} min</p>
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
