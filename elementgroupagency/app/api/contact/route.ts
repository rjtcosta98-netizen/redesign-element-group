import { NextResponse } from 'next/server'

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

/**
 * Grava o contacto em `public.leads` (Supabase).
 *
 * Porquê: até 27/07/2026 este formulário só enviava o email pela Brevo. O
 * contacto existia enquanto esse email não fosse arquivado ou esquecido, e não
 * havia como contar quantos houve no mês passado. A Brevo continua a ser a
 * NOTIFICAÇÃO; isto é o REGISTO. O cockpit lê-o e o Ricardo decide se entra no
 * CRM.
 *
 * Usa a chave ANON, não a service_role: a porta que a base abriu é só de INSERT
 * e com a forma validada pela policy `site pode inserir leads validadas`
 * (consent obrigatório, email com formato, limites de comprimento, source de
 * lista fechada). Esta chave não lê o que lá está, não altera e não apaga —
 * nem sequer o que acabou de inserir. Pôr aqui a service_role daria a este
 * projeto acesso à base inteira para gravar um formulário.
 *
 * NUNCA faz o pedido falhar: se o Supabase estiver em baixo, o email da Brevo
 * segue na mesma e a pessoa não vê erro nenhum. Perder o registo é mau; perder
 * o contacto é pior.
 */
async function registarLead(lead: {
  name: string
  email: string
  message: string
  service?: string
}): Promise<boolean> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) return false

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        message: lead.message,
        service: lead.service || null,
        source: 'website-contact',
        // Só se chega aqui com o consentimento dado — a policy também o exige.
        consent: true,
      }),
    })
    if (!res.ok) {
      console.error('Supabase lead insert:', res.status, await res.text())
      return false
    }
    return true
  } catch (e) {
    console.error('Supabase lead insert falhou:', e)
    return false
  }
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

  // GRAVAR É A PRIMEIRA COISA A ACONTECER depois das validações, e antes de
  // qualquer coisa que possa falhar ou sair mais cedo.
  //
  // Não é detalhe de ordem — foi um bug real a 27/07/2026. Esta chamada estava
  // DEPOIS do guard da BREVO_API_KEY abaixo, e como essa chave não estava
  // configurada no ambiente, a route saía com 503 sem nunca chegar aqui. O
  // contacto perdia-se por inteiro: nem email, nem registo. O comentário dizia
  // "antes da Brevo" e o código dizia outra coisa.
  //
  // A função nunca lança — engole os próprios erros.
  const registada = await registarLead({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    service: service?.trim(),
  })

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    // Sem Brevo não há email — mas se o contacto ficou gravado, ele CHEGOU.
    // Dizer à pessoa que falhou seria falso e mandava-a embora; o Ricardo vê-o
    // no painel «Contactos do site» do cockpit.
    if (registada) return NextResponse.json({ ok: true })
    return NextResponse.json(
      { error: 'O formulário ainda não está ligado. Escreve-me para info@elementgroup.pt.' },
      { status: 503 },
    )
  }

  const serviceLabel = service ? `<tr><td style="padding:4px 0;color:#888;width:100px">Serviço</td><td style="padding:4px 0">${service}</td></tr>` : ''

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Element Group Website', email: 'info@elementgroup.pt' },
      to: [{ email: 'info@elementgroup.pt', name: 'Element Group' }],
      replyTo: { email: email.trim(), name: name.trim() },
      subject: `Novo contacto de ${name.trim()}`,
      htmlContent: `
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
    }),
  })

  if (!res.ok) {
    console.error('Brevo error:', res.status, await res.text())
    return NextResponse.json({ error: 'Não consegui enviar. Tenta de novo ou escreve para info@elementgroup.pt.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
