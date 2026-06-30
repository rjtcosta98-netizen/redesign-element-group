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
  let data: Record<string, string>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const { name, email, message, service, consent, company, cfToken } = data ?? {}

  // Honeypot
  if (company) return NextResponse.json({ ok: true })

  if (!await verifyTurnstile(cfToken)) {
    return NextResponse.json({ error: 'Verificação de segurança falhou. Recarrega a página.' }, { status: 403 })
  }

  if (!name?.trim() || !email?.includes('@') || !message?.trim()) {
    return NextResponse.json({ error: 'Preenche nome, email e mensagem.' }, { status: 422 })
  }

  if (!consent) {
    return NextResponse.json({ error: 'É necessário aceitar a Política de Privacidade.' }, { status: 422 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'O formulário ainda não está ligado. Escreve-me para info@elementgroup.pt.' },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)

  const serviceLabel = service ? `<tr><td style="padding:4px 0;color:#888">Serviço</td><td style="padding:4px 0">${service}</td></tr>` : ''

  const { error } = await resend.emails.send({
    from: 'Element Group <noreply@elementgroup.pt>',
    to: ['info@elementgroup.pt'],
    replyTo: email.trim(),
    subject: `Novo contacto de ${name.trim()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="margin:0 0 24px;font-size:20px">Novo pedido de contacto</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:4px 0;color:#888;width:100px">Nome</td><td style="padding:4px 0">${name.trim()}</td></tr>
          <tr><td style="padding:4px 0;color:#888">Email</td><td style="padding:4px 0"><a href="mailto:${email.trim()}">${email.trim()}</a></td></tr>
          ${serviceLabel}
        </table>
        <div style="margin:24px 0;padding:16px;background:#f5f5f5;border-radius:8px;white-space:pre-wrap">${message.trim()}</div>
        <p style="font-size:12px;color:#888">Enviado via elementgroup.pt</p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Não consegui enviar. Tenta de novo ou escreve para info@elementgroup.pt.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
