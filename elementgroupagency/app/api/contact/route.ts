import { NextResponse } from 'next/server'

// Recebe o formulário de contacto e grava na tabela `leads` do Supabase.
// Project-agnostic: usa SUPABASE_URL + SUPABASE_ANON_KEY das env vars.
// Anti-spam: honeypot ('company'). A chave anónima só precisa de uma policy de INSERT.
export async function POST(req: Request) {
  let data: Record<string, string>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const { name, email, message, service, consent, company } = data ?? {}

  // Honeypot: bots preenchem 'company'. Fingimos sucesso e ignoramos.
  if (company) return NextResponse.json({ ok: true })

  if (!name?.trim() || !email?.includes('@') || !message?.trim()) {
    return NextResponse.json({ error: 'Preenche nome, email e mensagem.' }, { status: 422 })
  }

  if (!consent) {
    return NextResponse.json({ error: 'É necessário aceitar a Política de Privacidade.' }, { status: 422 })
  }

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) {
    return NextResponse.json(
      { error: 'O formulário ainda não está ligado. Escreve-me para info@elementgroup.pt.' },
      { status: 503 },
    )
  }

  const res = await fetch(`${url}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      service: service || null,
      source: 'website-contact',
      consent: true,
      consent_text: 'Li e aceito a Política de Privacidade e autorizo o tratamento dos meus dados para resposta a este contacto.',
    }),
  })

  if (!res.ok) {
    console.error('Supabase insert falhou:', res.status, await res.text())
    return NextResponse.json({ error: 'Não consegui guardar. Tenta de novo ou escreve-me por email.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
