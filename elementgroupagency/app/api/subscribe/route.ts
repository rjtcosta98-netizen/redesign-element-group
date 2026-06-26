import { NextResponse } from 'next/server'

// Subscrições por email (newsletter / recursos) → tabela `subscribers` no Supabase.
// Regista o consentimento RGPD (texto aceite + data).
export async function POST(req: Request) {
  let data: Record<string, unknown>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const email = typeof data.email === 'string' ? data.email.trim() : ''
  const source = typeof data.source === 'string' && data.source ? data.source : 'newsletter'
  const consent = Boolean(data.consent)
  if (data.company) return NextResponse.json({ ok: true }) // honeypot

  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido.' }, { status: 422 })
  }
  if (!consent) {
    return NextResponse.json({ error: 'É necessário aceitar a Política de Privacidade.' }, { status: 422 })
  }

  const consentText = source.startsWith('resource:')
    ? 'Aceito receber este recurso e a Política de Privacidade.'
    : 'Aceito receber a newsletter e a Política de Privacidade.'

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) {
    return NextResponse.json(
      { error: 'A subscrição ainda não está ligada. Escreve-me para info@elementgroup.pt.' },
      { status: 503 },
    )
  }

  const res = await fetch(`${url}/rest/v1/subscribers`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ email, source, consent: true, consent_text: consentText }),
  })

  if (!res.ok) {
    console.error('Subscribe insert falhou:', res.status, await res.text())
    return NextResponse.json({ error: 'Não consegui registar. Tenta de novo.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
