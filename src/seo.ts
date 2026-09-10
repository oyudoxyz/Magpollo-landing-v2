/**
 * One source of truth for everything a crawler reads: titles, descriptions,
 * canonicals, Open Graph, Twitter cards and JSON-LD. Used by the build-time
 * prerender (scripts/prerender.mjs → entry-server) and by the client (use-meta)
 * so SPA navigation keeps the head correct after hydration.
 */

export const SITE = {
  url: 'https://magpollo.com',
  name: 'Magpollo',
  legalName: 'Magpollo Corp',
  tagline: 'Product Systems for Practice & Business',
  description:
    'Magpollo is a product systems studio for owner-led firms. We diagnose one workflow, keep the tools you already use, and build the missing system around how you actually work.',
  ogImage: 'https://magpollo.com/assets/og-image.jpg',
  logo: 'https://magpollo.com/assets/magpollo-logo.png',
  email: 'salesteam@magpollo.com',
  phone: '+1-470-287-7285',
  sameAs: ['https://x.com/MagpolloTech', 'https://linkedin.com/company/magpollo', 'https://www.instagram.com/magpollotech'],
  locale: 'en_US',
};

export interface PageSeo {
  path: string;
  /** Shown in the tab and as the OG title. Keep under 60 characters. */
  title: string;
  /** Keep under 155 characters. */
  description: string;
  /** Page type for JSON-LD. */
  type?: 'WebPage' | 'ContactPage' | 'AboutPage';
  noindex?: boolean;
}

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export const PAGES: Record<string, PageSeo> = {
  home: {
    path: '/',
    title: 'Magpollo — Product Systems Studio',
    description:
      'A product systems studio for owner-led firms. We diagnose one workflow, keep the tools you already use, and build the missing system around how you actually work.',
  },
  letsBuild: {
    path: '/lets-build',
    title: "Let's build — Magpollo",
    description: 'Two short steps: where the work breaks, and how to reach you. We read every one ourselves and reply within one business day.',
    type: 'ContactPage',
  },
  work: {
    path: '/work',
    title: 'Proof of work — Magpollo',
    description:
      'Magpollo case studies are shown to prospective clients on request: a prospecting engine in daily use inside a Fortune 500 sales organisation, and a custom commerce system.',
  },
  careers: {
    path: '/careers',
    title: 'Careers — Magpollo',
    description: 'Magpollo hires by lane: engineering, product, design, marketing. Internships are being formalised. No portal; a form that reaches the founders.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy — Magpollo',
    description: 'How Magpollo Corp collects, uses and protects the information you share through magpollo.com.',
  },
  terms: {
    path: '/terms',
    title: 'Terms — Magpollo',
    description: 'Terms of use for magpollo.com, and how engagements with Magpollo Corp are contracted.',
  },
  notFound: {
    path: '/404',
    title: 'Not found — Magpollo',
    description: 'That page is not here.',
    noindex: true,
  },
};

/** Routes the build prerenders to static HTML, in sitemap order. */
export const PRERENDER_ROUTES = [PAGES.home, PAGES.letsBuild, PAGES.work, PAGES.careers, PAGES.privacy, PAGES.terms];

function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: { '@type': 'ImageObject', url: SITE.logo },
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: SITE.sameAs,
    knowsAbout: ['workflow diagnosis', 'internal software systems', 'client development systems', 'human-in-the-loop automation'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Product systems',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Blueprint', description: 'We map the workflow as it actually runs and give you a fixed scope.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sprint', description: 'We build the agreed system around your real workflow, with a written definition of done.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Care', description: 'Monitoring, fixes, updates and a monthly review of whether the system is still doing its job.' } },
      ],
    },
  };
}

function website() {
  return { '@type': 'WebSite', '@id': SITE_ID, url: SITE.url, name: SITE.name, publisher: { '@id': ORG_ID }, inLanguage: 'en' };
}

function breadcrumb(page: PageSeo) {
  if (page.path === '/') return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' },
      { '@type': 'ListItem', position: 2, name: page.title.replace(/ — Magpollo$/, ''), item: SITE.url + page.path },
    ],
  };
}

/** The JSON-LD graph for a page. */
export function jsonLd(page: PageSeo) {
  const graph: unknown[] = [organization(), website()];
  graph.push({
    '@type': page.type ?? 'WebPage',
    '@id': `${SITE.url}${page.path}#webpage`,
    url: SITE.url + page.path,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en',
    primaryImageOfPage: { '@type': 'ImageObject', url: SITE.ogImage },
  });
  const crumbs = breadcrumb(page);
  if (crumbs) graph.push(crumbs);
  return { '@context': 'https://schema.org', '@graph': graph };
}

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Head markup for the prerender. Everything here is also applied by use-meta on the client. */
export function renderHead(page: PageSeo): string {
  const url = SITE.url + page.path;
  const tags = [
    `<title>${escapeAttr(page.title)}</title>`,
    `<meta name="description" content="${escapeAttr(page.description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta name="robots" content="${page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:locale" content="${SITE.locale}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${escapeAttr(page.title)}">`,
    `<meta property="og:description" content="${escapeAttr(page.description)}">`,
    `<meta property="og:image" content="${SITE.ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${escapeAttr(SITE.name + ' — ' + SITE.tagline)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(page.title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(page.description)}">`,
    `<meta name="twitter:image" content="${SITE.ogImage}">`,
    `<script type="application/ld+json" data-seo>${JSON.stringify(jsonLd(page)).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.join('\n    ');
}
