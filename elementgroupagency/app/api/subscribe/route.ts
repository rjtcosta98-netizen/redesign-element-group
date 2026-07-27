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
 * Grava a subscrição em `public.subscribers` (Supabase).
 *
 * Porquê: até 27/07/2026 esta route só enviava um email pela Brevo — e, apesar
 * do nome, não inscrevia ninguém em lista nenhuma (usa a API de email
 * transacional, não a de contactos). Quem pediu a newsletter ou um recurso
 * existia só nesse email, e o consentimento que torna legal enviar-lhe alguma
 * coisa também. Uma lista que não existe é uma newsletter que nunca se pode
 * enviar.
 *
 * Chave ANON e não service_role, como em /api/contact: a porta que a base
 * abriu é só de INSERT, com a forma validada pela policy `site pode inserir
 * subscricoes validadas`. Esta chave não lê a lista de subscritores — que é
 * precisamente o que a torna apetecível para quem a queira roubar.
 *
 * Duplicados: há um índice único (email, source), portanto carregar duas vezes
 * no botão devolve 409 — que aqui é SUCESSO, não erro: a pessoa já lá está.
 * Deliberadamente NÃO se usa `Prefer: resolution=...` — medido a 27/07, tanto
 * `merge-duplicates` como `ignore-duplicates` exigem mais do que INSERT e
 * levam 401 com esta chave. Tratar o 409 aqui é melhor do que alargar a porta
 * da base para resolver um caso que o código resolve em duas linhas.
 *
 * NUNCA faz o pedido falhar: se o Supabase estiver em baixo, o email da Brevo
 * segue na mesma e a pessoa não vê erro nenhum.
 */
async function registarSubscritor(email: string, source: string): Promise<void> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) return

  try {
    const res = await fetch(`${url}/rest/v1/subscribers`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      // email em minúsculas: sem isto `A@x.pt` e `a@x.pt` passavam os dois pelo
      // índice único e a mesma pessoa recebia a newsletter duas vezes.
      body: JSON.stringify({
        email: email.toLowerCase(),
        source,
        consent: true,
      }),
    })
    // 409 = já subscreveu por esta via. Não é erro nem vale um log.
    if (!res.ok && res.status !== 409) {
      console.error('Supabase subscriber insert:', res.status, await res.text())
    }
  } catch (e) {
    console.error('Supabase subscriber insert falhou:', e)
  }
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

  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'A subscrição ainda não está ligada. Escreve-me para info@elementgroup.pt.' },
      { status: 503 },
    )
  }

  // Antes da Brevo, de propósito: se o envio falhar, a subscrição fica na mesma
  // registada — que é o buraco que isto veio fechar. A função nunca lança.
  await registarSubscritor(email, source)

  const isResource = source.startsWith('resource:')
  const sourceLabel = isResource ? source.replace('resource:', 'Recurso: ') : 'Newsletter'

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Element Group Website', email: 'info@elementgroup.pt' },
      to: [{ email: 'info@elementgroup.pt', name: 'Element Group' }],
      replyTo: { email },
      subject: `Nova subscrição — ${sourceLabel}`,
      htmlContent: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <h2 style="margin:0 0 24px;font-size:20px">Nova subscrição</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:4px 0;color:#888;width:100px">Email</td><td style="padding:4px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:4px 0;color:#888">Origem</td><td style="padding:4px 0">${sourceLabel}</td></tr>
          </table>
          <p style="font-size:12px;color:#888;margin-top:24px">Enviado via elementgroup.pt</p>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    console.error('Brevo error:', res.status, await res.text())
    return NextResponse.json({ error: 'Não consegui registar. Tenta de novo.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
