// Serializa JSON de forma segura para embedding em HTML.
// < > & são escapados para unicode para evitar que parsers HTML os interpretem
// como markup mesmo dentro de um <script> (especialmente em CDNs e validators).
//
// Sem nonce de propósito: type="application/ld+json" não é executável, por
// isso não passa pela verificação de script-src que importa para XSS — e
// chamar headers() aqui forçaria toda a página a renderizar em modo dinâmico
// só para satisfazer uma diretiva CSP que não tem efeito de segurança real
// neste caso.
function safeStringify(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data]
  return (
    <>
      {json.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeStringify(d) }}
        />
      ))}
    </>
  )
}
