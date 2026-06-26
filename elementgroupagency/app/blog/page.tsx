import type { Metadata } from 'next'
import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import CoverArt from '@/components/blog/CoverArt'
import BlogList from '@/components/blog/BlogList'
import NewsletterSignup from '@/components/blog/NewsletterSignup'
import { POSTS, CATEGORIES, formatDate } from '@/lib/posts'

export const metadata: Metadata = {
  alternates: { canonical: '/blog' },
  title: 'Blog de Websites, SEO e Marketing Digital — Element Group',
  description:
    'Artigos práticos sobre websites, SEO, redes sociais e marketing digital — escritos para donos de PMEs em Portugal, sem jargão.',
}

export default function BlogIndex() {
  const [featured, ...rest] = POSTS
  const cards = rest.map(({ slug, title, excerpt, category, date, readingMinutes }) => ({ slug, title, excerpt, category, date, readingMinutes }))

  return (
    <main>
      {/* Header */}
      <section className="relative overflow-hidden bg-bg pt-36 pb-12 px-6">
        <div aria-hidden className="absolute top-10 left-1/2 -translate-x-1/2 w-[680px] h-[480px] pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(127,168,217,0.15), transparent 62%)' }} />
        <div className="relative max-w-[760px] mx-auto text-center">
          <AnimateOnScroll>
            <p className="text-[11px] uppercase tracking-[0.22em] text-dark mb-4">Blog</p>
            <h1 className="text-white tracking-[-0.03em] leading-[1.04]">Ideias para o teu negócio crescer online</h1>
            <p className="mt-5 text-muted leading-relaxed">
              Artigos práticos sobre websites, SEO, redes sociais e marketing digital — para donos de PMEs, sem jargão.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-bg px-6 pb-16">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid md:grid-cols-2 rounded-[24px] border border-white/10 bg-bg-card overflow-hidden transition-colors hover:border-white/25"
            >
              <CoverArt category={featured.category} className="min-h-[240px] md:min-h-full" />
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-accent font-medium">Em destaque</span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-accent/90">{featured.category}</span>
                </div>
                <h2 className="text-white font-heading text-2xl md:text-[30px] font-medium leading-tight tracking-[-0.02em]">{featured.title}</h2>
                <p className="mt-3 text-muted leading-relaxed">{featured.excerpt}</p>
                <p className="mt-5 text-[11px] text-dark">{formatDate(featured.date)} · {featured.readingMinutes} min de leitura</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-white">
                  Ler artigo <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="bg-bg px-6 pb-24 pt-16 border-t border-white/10">
        <div className="max-w-[1100px] mx-auto">
          <BlogList posts={cards} categories={CATEGORIES} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-bg px-6 pb-28">
        <div className="max-w-[1100px] mx-auto">
          <AnimateOnScroll>
            <NewsletterSignup />
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
