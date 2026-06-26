// ── Fonte única de configuração de SEO ──────────────────────────────────────
// Domínio canónico, dados de marca e geradores de JSON-LD reutilizáveis.
// metadataBase (em app/layout.tsx) torna canonical/OG relativos em absolutos.

import { COMPANY } from './company'

export const SITE = {
  url: 'https://elementgroup.pt',
  name: 'Element Group',
  locale: 'pt_PT',
  // Coordenadas aproximadas de Seia (Serra da Estrela)
  geo: { lat: 40.4156, lng: -7.7081 },
  sameAs: [
    'https://www.instagram.com/elementgrouppt',
    'https://www.facebook.com/elementgroupdigital/',
    'https://www.tiktok.com/@elementgroup.pt',
    'https://share.google/wRWp5sI4YBerW7l9q',
  ],
  // Avaliações reais do Perfil de Empresa do Google (confirmado: 5,0 · 9 reviews)
  rating: { value: '5', count: '9' },
} as const

const ABS = (path: string) => (path === '/' ? SITE.url : `${SITE.url}${path}`)

// Zona servida: Portugal (nacional) + foco local Seia/Guarda/Serra da Estrela.
const AREA_SERVED = [
  { '@type': 'Country', name: 'Portugal' },
  { '@type': 'City', name: 'Seia' },
  { '@type': 'AdministrativeArea', name: 'Guarda' },
  { '@type': 'AdministrativeArea', name: 'Serra da Estrela' },
]

// ── Grafo global (Organization/ProfessionalService + WebSite) ────────────────
// Renderizado uma vez no layout. Os Service usam @id para referenciar o provider.
export function organizationGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE.url}/#business`,
        name: SITE.name,
        legalName: COMPANY.legalName,
        url: SITE.url,
        logo: `${SITE.url}/web-app-manifest-512x512.png`,
        image: `${SITE.url}/opengraph-image`,
        email: COMPANY.email,
        telephone: COMPANY.phone,
        vatID: COMPANY.nif,
        priceRange: '€€',
        description:
          'Agência de marketing digital para PMEs em Portugal: criação de websites e lojas online, SEO, gestão de redes sociais e planos mensais.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY.address,
          postalCode: COMPANY.postalCity.split(' ')[0],
          addressLocality: 'Seia',
          addressRegion: 'Guarda',
          addressCountry: 'PT',
        },
        geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
        areaServed: AREA_SERVED,
        sameAs: SITE.sameAs,
        founder: { '@type': 'Person', name: COMPANY.legalName },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: SITE.rating.value,
          reviewCount: SITE.rating.count,
          bestRating: '5',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: 'pt-PT',
        publisher: { '@id': `${SITE.url}/#business` },
      },
    ],
  }
}

// ── Service schema (uma por página de serviço) ───────────────────────────────
export function serviceSchema(opts: {
  name: string
  serviceType: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: ABS(opts.path),
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: AREA_SERVED,
    inLanguage: 'pt-PT',
  }
}

// ── Case study schema (uma por página de caso do portefólio) ─────────────────
// CreativeWork: ajuda o Google e os motores de IA a entender cada caso como
// trabalho real da Element Group (creator → #business). Sem ratings inventados.
export function caseStudySchema(opts: {
  slug: string
  client: string
  category: string
  description: string
  year?: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${opts.client} — ${opts.category}`,
    headline: opts.description,
    about: opts.client,
    description: opts.description,
    url: ABS(`/portfolio/${opts.slug}`),
    inLanguage: 'pt-PT',
    creator: { '@id': `${SITE.url}/#business` },
    isPartOf: { '@id': `${SITE.url}/#website` },
    ...(opts.year ? { dateCreated: opts.year } : {}),
    ...(opts.image ? { image: opts.image.startsWith('http') ? opts.image : ABS(opts.image) } : {}),
  }
}

// ── BreadcrumbList schema ────────────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: ABS(it.path),
    })),
  }
}
