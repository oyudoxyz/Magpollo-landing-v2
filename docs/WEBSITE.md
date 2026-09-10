# magpollo.com — structure and rules

Updated 2026-09-10 with the company-site rebuild.

## Site map

| Route | Page | Modules |
|---|---|---|
| `/` | Home | Hero (Cormorant, the only place), Sound familiar, What we build (three steps on a white plate, no prices or timelines), Proof (one ink band, walkthrough on request) |
| `/careers` | Careers | Header, four lanes, form on a white plate |
| `/work` | Proof of work | Header with the printer illustration, two one-line summaries, request form. Old `/work/*` URLs redirect here |
| `/lets-build` | Intake | Two-step intake |
| `/privacy`, `/terms` | Legal | Plain-language privacy and terms |

`/systems`, `/how-we-work`, `/contact` and `/company` were built in v1 and cut in v2 as repetition; they redirect. Contact details live in the footer and behind the logo and copyright.

## Grounds

Paper is the page. White plates hold anything product-like: the offer, forms, the team list. One ink band per page at most, for the line that should land hardest. Cormorant appears once on the whole site, in the home hero; every other heading is Jakarta (`.title`, `.headline`).

## Case studies

The full case studies are no longer built or served. Sources and assets live in
`archive/case-studies/` for turning into the on-request walkthrough or a PDF.

## Motion rules (Emil Kowalski, fitted to the house style)

Tokens in `src/index.css`; rules in `src/styles/motion.css`.

- Animate `transform` and `opacity` only. Never `transition: all`.
- Entering/exiting: `--ease-out`. Movement on screen: `--ease-in-out`. Sheets: `--ease-drawer`. Hover: `ease`.
- UI under 300ms. Press feedback 160ms. Exit faster than enter (intake steps: 250ms in, 150ms out).
- Pressables carry `.press` (`scale(0.98)` on `:active`); rows carry `.press-row` (`0.995`).
- Dropdowns scale in from their trigger edge (`.dropdown-panel`, `@starting-style` with a `data-mounted` fallback).
- Hover effects are gated behind `@media (hover: hover) and (pointer: fine)`.
- Reduced motion keeps opacity and colour, drops movement.
- Every interactive element has a visible focus ring: 1px ink, 2px offset.
- Marketing reveals (600–800ms fade-up, once, in view) are the exception to the 300ms rule; they are explanatory, not UI.
- Toasts are Sonner, styled square and paper. Errors only.

## Illustrations

CSS-drawn, same material as the retro computer: `src/components/illustrations/`.

- `RetroPrinter` — dot-matrix printer printing the approval log, on the proof-of-work page.

No client names appear on illustrations. Record IDs only.

## Decisions to confirm

- No prices or timelines on the site, by decision.
- Careers and walkthrough requests go to `salesteam@magpollo.com` through the existing `/api/send_mail` endpoint.
- Privacy and Terms are written plainly and need a legal read before launch.

## SEO

The site is a Vite SPA, prerendered to static HTML at build time so crawlers, link
previews and no-JS readers get real markup, and the browser hydrates it.

- `src/seo.ts` is the single source of truth: per-page title, description, canonical,
  robots, Open Graph, Twitter card and JSON-LD (`Organization` with an `OfferCatalog`,
  `WebSite`, `WebPage`/`ContactPage`, `BreadcrumbList`). Add a page there first.
- `npm run build` runs `vite build`, then an SSR build of `src/entry-server.tsx`, then
  `scripts/prerender.mjs`, which writes `dist/<route>/index.html` for every route in
  `PRERENDER_ROUTES` plus `dist/404.html` (noindex). `src/main.tsx` hydrates when `#root`
  already has markup.
- `src/hooks/use-meta.ts` mirrors the same tags on client-side navigation.
- One `h1` per page. Section heads are `h2`, offers `h3`. Illustrations are `aria-hidden`.
  Footer contact is an `<address>`.
- Above-the-fold entrances are CSS (`.rise`), so the static HTML rests visible and LCP does
  not wait for JavaScript.
- `public/robots.txt` allows everything and points at `public/sitemap.xml` (lastmod per URL).
- Bundle: framework and motion are split into long-cached chunks; the intake email is a
  string template so `react-dom/server` stays out of the browser bundle.
- Vercel: the SPA rewrite stays as a fallback, but the filesystem is checked first, so the
  prerendered files are what gets served. Unknown paths still return 200 with the noindex
  404 page; a true 404 status needs Vercel `routes` with `handle: filesystem`.

Not done, needs you: verify `og-image.jpg` is current, submit the sitemap in Search
Console, and decide whether to self-host the three Google Fonts.
