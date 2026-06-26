// Leitura dos clientes (logos da homepage) da tabela `clients` no Supabase.
// Schema: name, logo, position, active. RLS permite SELECT dos active = true.

export type Client = { name: string; logo: string }

export async function getClients(): Promise<Client[]> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) return []

  try {
    const res = await fetch(
      `${url}/rest/v1/clients?select=name,logo&active=eq.true&order=position.asc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 3600 }, // ISR: revê de hora a hora
      },
    )
    if (!res.ok) return []
    const data = (await res.json()) as Client[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}
