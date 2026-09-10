import { useEffect } from 'react';

interface Meta {
  title: string;
  description: string;
  /** Path for the canonical URL, e.g. "/systems". */
  path?: string;
}

const SITE = 'https://magpollo.com';

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    const [, key, val] = selector.match(/\[(\w+(?::\w+)?)="([^"]+)"\]/) ?? [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Per-page title, description and canonical, without a head-manager dependency. */
export function useMeta({ title, description, path = '/' }: Meta) {
  useEffect(() => {
    const full = title === 'Magpollo' ? 'Magpollo — Product Systems Studio' : `${title} — Magpollo`;
    document.title = full;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', full);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', `${SITE}${path}`);
    setMeta('link[rel="canonical"]', 'href', `${SITE}${path}`);
  }, [title, description, path]);
}
