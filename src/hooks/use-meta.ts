import { useEffect } from 'react';
import { jsonLd, PageSeo, SITE } from '@/seo';

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: 'name' | 'property', id: string, content: string) =>
  upsert(`meta[${key}="${id}"]`, () => Object.assign(document.createElement('meta'), { [key]: id }), 'content', content);

/**
 * Keeps the document head in step with the page after client-side navigation.
 * The prerendered HTML already carries the same tags; this only matters once
 * the router takes over. Mirrors seo.ts renderHead.
 */
export function useMeta(page: PageSeo) {
  useEffect(() => {
    const url = SITE.url + page.path;
    document.title = page.title;
    meta('name', 'description', page.description);
    meta('name', 'robots', page.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');
    upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url);
    meta('property', 'og:url', url);
    meta('property', 'og:title', page.title);
    meta('property', 'og:description', page.description);
    meta('name', 'twitter:title', page.title);
    meta('name', 'twitter:description', page.description);
    const ld = document.head.querySelector<HTMLScriptElement>('script[data-seo]') ?? document.head.appendChild(Object.assign(document.createElement('script'), { type: 'application/ld+json' }));
    ld.setAttribute('data-seo', '');
    ld.textContent = JSON.stringify(jsonLd(page));
  }, [page]);
}
