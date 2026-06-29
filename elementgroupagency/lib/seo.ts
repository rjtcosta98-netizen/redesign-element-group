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
    'https://maps.app.goo.gl/1fk3WM9AXPJGD7YK9',
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
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
        '@id': `${SITE.url}/#business`,
        name: SITE.name,
        legalName: COMPANY.legalName,
        url: SITE.url,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE.url}/#logo`,
          url: `${SITE.url}/web-app-manifest-512x512.png`,
          width: 512,
          height: 512,
        },
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
        founder: { '@type': 'Person', '@id': `${SITE.url}/sobre#author`, name: 'Ricardo Jorge', jobTitle: 'Fundador', url: `${SITE.url}/sobre` },
        openingHours: 'Mo-Fr 09:00-18:00',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: Number(SITE.rating.value),
          reviewCount: Number(SITE.rating.count),
          bestRating: 5,
          worstRating: 1,
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
    '@id': ABS(`${opts.path}#service`),
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
// Article + CreativeWork: sinaliza ao Google que é conteúdo editorial com
// E-E-A-T — autor/publisher apontam para #business (experiência real).
export function caseStudySchema(opts: {
  slug: string
  client: string
  category: string
  description: string
  year?: string
  image?: string
  keywords?: string[]
}) {
  // ISO 8601: mínimo "YYYY-01-01" quando só o ano é conhecido
  const isoDate = opts.year ? `${opts.year}-01-01` : undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': ABS(`/portfolio/${opts.slug}#article`),
    name: `${opts.client} — ${opts.category}`,
    headline: opts.description,
    description: opts.description,
    about: { '@type': 'Organization', name: opts.client },
    articleSection: opts.category,
    url: ABS(`/portfolio/${opts.slug}`),
    inLanguage: 'pt-PT',
    author: { '@id': `${SITE.url}/#business` },
    publisher: { '@id': `${SITE.url}/#business` },
    creator: { '@id': `${SITE.url}/#business` },
    isPartOf: { '@id': `${SITE.url}/#website` },
    ...(opts.keywords?.length ? { keywords: opts.keywords.join(', ') } : {}),
    ...(isoDate ? { datePublished: isoDate, dateCreated: isoDate, dateModified: isoDate } : {}),
    ...(opts.image ? { image: opts.image.startsWith('http') ? opts.image : ABS(opts.image) } : {}),
  }
}

// ── ItemPage/WebPage schema (por página de case study) ──────────────────────
// Liga o BreadcrumbList e o Article num único grafo de página que o Google
// e os motores de IA entendem como documento estruturado completo.
export function itemPageSchema(opts: {
  slug: string
  name: string
  description: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    '@id': ABS(`/portfolio/${opts.slug}#webpage`),
    url: ABS(`/portfolio/${opts.slug}`),
    name: opts.name,
    description: opts.description,
    inLanguage: 'pt-PT',
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#business` },
    mainEntity: { '@id': ABS(`/portfolio/${opts.slug}#article`) },
    ...(opts.image ? { primaryImageOfPage: opts.image.startsWith('http') ? opts.image : ABS(opts.image) } : {}),
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
