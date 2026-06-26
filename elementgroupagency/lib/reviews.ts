// Leitura dos testemunhos da tabela `reviews` no Supabase (server-side, REST).
// Schema: quote, name, role, avatar, rating, featured, position, active.
// RLS permite SELECT das reviews com active = true.

export type Review = {
  quote: string
  name: string
  role?: string | null
  avatar?: string | null
  rating?: number | null
  position?: number | null
}

export async function getReviews(): Promise<Review[]> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) return []

  try {
    const res = await fetch(
      `${url}/rest/v1/reviews?select=quote,name,role,avatar,rating,position&active=eq.true&order=position.asc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 3600 }, // ISR: revê de hora a hora
      },
    )
    if (!res.ok) return []
    const data = (await res.json()) as Review[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}
