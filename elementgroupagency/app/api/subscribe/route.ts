import { NextResponse } from 'next/server'

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true // sem chave configurada: deixa passar (dev/local)
  if (!token) return false
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  })
  const data = (await res.json()) as { success: boolean }
  return data.success === true
}

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
  const cfToken = typeof data.cfToken === 'string' ? data.cfToken : undefined
  if (data.company) return NextResponse.json({ ok: true }) // honeypot

  if (!await verifyTurnstile(cfToken)) {
    return NextResponse.json({ error: 'Verificação de segurança falhou. Recarrega a página.' }, { status: 403 })
  }

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
