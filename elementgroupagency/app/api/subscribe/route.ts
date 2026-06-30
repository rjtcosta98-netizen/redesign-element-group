import { NextResponse } from 'next/server'
import { Resend } from 'resend'

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
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

  // Honeypot
  if (data.company) return NextResponse.json({ ok: true })

  if (!await verifyTurnstile(cfToken)) {
    return NextResponse.json({ error: 'Verificação de segurança falhou. Recarrega a página.' }, { status: 403 })
  }

  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido.' }, { status: 422 })
  }
  if (!consent) {
    return NextResponse.json({ error: 'É necessário aceitar a Política de Privacidade.' }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'A subscrição ainda não está ligada. Escreve-me para info@elementgroup.pt.' },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)

  const isResource = source.startsWith('resource:')
  const sourceLabel = isResource ? source.replace('resource:', 'Recurso: ') : 'Newsletter'

  const { error } = await resend.emails.send({
    from: 'Element Group <noreply@elementgroup.pt>',
    to: ['info@elementgroup.pt'],
    replyTo: email,
    subject: `Nova subscrição — ${sourceLabel}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="margin:0 0 24px;font-size:20px">Nova subscrição</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:4px 0;color:#888;width:100px">Email</td><td style="padding:4px 0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:4px 0;color:#888">Origem</td><td style="padding:4px 0">${sourceLabel}</td></tr>
        </table>
        <p style="font-size:12px;color:#888;margin-top:24px">Enviado via elementgroup.pt</p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Não consegui registar. Tenta de novo.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
