// Serializa JSON de forma segura para embedding em HTML.
// < > & são escapados para unicode para evitar que parsers HTML os interpretem
// como markup mesmo dentro de um <script> (especialmente em CDNs e validators).
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
