import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import AppRoutes from './AppRoutes';
import { PAGES, PRERENDER_ROUTES, renderHead, PageSeo } from './seo';

export { PAGES, PRERENDER_ROUTES };

/** Renders one route to HTML plus its head tags. Used only at build time. */
export function render(page: PageSeo) {
  const html = renderToString(
    <StaticRouter location={page.path}>
      <AppRoutes />
    </StaticRouter>,
  );
  return { html, head: renderHead(page) };
}
