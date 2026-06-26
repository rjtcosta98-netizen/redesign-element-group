'use client'
import { useState } from 'react'
import Link from 'next/link'
import CoverArt from './CoverArt'
import { formatDate } from '@/lib/posts'

type Card = { slug: string; title: string; excerpt: string; category: string; date: string; readingMinutes: number }

const PAGE = 6

export default function BlogList({ posts, categories }: { posts: Card[]; categories: readonly string[] }) {
  const [cat, setCat] = useState('Todos')
  const [count, setCount] = useState(PAGE)

  const filtered = cat === 'Todos' ? posts : posts.filter((p) => p.category === cat)
  const visible = filtered.slice(0, count)

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => { setCat(c); setCount(PAGE) }}
            aria-pressed={cat === c}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent
              ${cat === c ? 'bg-accent text-black font-medium' : 'border border-white/15 text-muted hover:text-white hover:border-white/30'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted text-sm py-10">Ainda não há artigos nesta categoria.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-[20px] border border-white/10 bg-bg-card overflow-hidden transition-colors hover:border-white/25"
            >
              <CoverArt category={p.category} className="h-44" />
              <div className="p-6 flex flex-col flex-1">
                <span className="text-[11px] uppercase tracking-[0.14em] text-accent/90 mb-2">{p.category}</span>
                <h3 className="text-white font-heading text-lg font-medium leading-snug tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-2 text-muted text-sm leading-relaxed line-clamp-2">{p.excerpt}</p>
                <p className="mt-4 text-[11px] text-dark">{formatDate(p.date)} · {p.readingMinutes} min de leitura</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {count < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setCount((c) => c + PAGE)}
            className="rounded-pill border border-white/20 text-white text-sm px-6 py-3 hover:bg-white hover:text-bg transition-all"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
  )
}
