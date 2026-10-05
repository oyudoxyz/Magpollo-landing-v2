# magpollo.com — structure and rules

Updated 2026-10-04: design system standardised, unused template code removed.

## Site map

| Route | Page | Modules |
|---|---|---|
| `/` | Home | Hero (Cormorant, the only place), Sound familiar, What we build (three steps on a white plate, no prices or timelines), Proof (a pointer to `/work`, with the printer) |
| `/careers` | Careers | Header, four lanes as numbered rows, form |
| `/work` | Proof of work | Header with the printer illustration, case studies as numbered rows, request form. Old `/work/*` URLs redirect here |
| `/lets-build` | Intake | Two-step intake; optional detail behind one toggle |
| `/privacy`, `/terms` | Legal | Plain-language privacy and terms |

`/systems`, `/how-we-work`, `/contact` and `/company` were built in v1 and cut in v2 as repetition; they redirect. Contact details live behind the logo, the footer's Contact link and the copyright.

## Design system

One rule: a value is defined once and referred to by name everywhere else.

**Tokens** live in `:root` in `src/index.css`. Colours are HSL triples so any of
them can take an alpha (`hsl(var(--rule) / 0.5)`). `tailwind.config.ts` points its
colour and font names at the same tokens.

| Token | Use |
|---|---|
| `--bg`, `--surface`, `--work`, `--tint` | Paper (the page), document paper (menus, toasts), white plates, hover fill |
| `--fg`, `--muted-ink` | Ink and secondary text |
| `--rule` | Hairlines |
| `--mark`, `--mark-ink` | The logo red as a line or fill; the darker red for red text (errors), which stays readable on paper |
| `--screen` | The computer's screen black |
| `--hw-*` | The putty plastic of the illustrations |
| `--font-sans`, `--font-serif`, `--font-mono`, `--font-terminal` | Jakarta, Cormorant (hero only), JetBrains Mono (kickers, figures), Courier (the computer's screen) |
| `--ease*`, `--dur-*` | Motion curves and durations |
| `--measure` | The page width, shared by `.gutter` and the margin ruler |

**Type** is six classes in `src/index.css`: `.display` (hero), `.headline` (page
titles and section headings), `.item-title`, `.subhead`, `.copy`, plus the labels
`.eyebrow`, `.kicker`, `.list-index`. Do not restate sizes in markup.

**Components** are in `src/components/editorial.tsx`. Build pages from these:

| Component | What it is |
|---|---|
| `PageHeader` | Opens an inner page: kicker, title, standfirst or an illustration |
| `Section` | Hairline, heading left, content right. `actions` for a button under the intro, `centered` beside an illustration |
| `NumberedRows` | Index, title, one line, optional mono meta line. Offers, lanes, case studies. Becomes padded cells inside a `.plate` |
| `NumberedList` | Plain ruled rows with the index on the right |
| `CtaLink`, `CtaButton` | The one button style (`.cta`): bold italic, red underline. `muted` for Back/Cancel and for a primary that is not ready |
| `Reveal` | Fade-up once, in view |
| `Prose` | Long-form copy (`.prose`) |

Form fields are in `src/components/intake.tsx` (`TextField`, `TextAreaField`,
`SelectField`, `ChoiceRows`, `FileDrop`); `SimpleForm` assembles a short form from
a field list. Shared form logic (email check, the send-failed toast) is in
`src/lib/forms.ts`. Site copy that appears in more than one place (contact
details, nav, offers, case studies) is in `src/data/site.ts`.

**Surfaces.** Paper is the page. A `.plate` is a white panel with no border;
dividers inside it use `.plate-rule`, cells use `.plate-cell`. Lists draw lines
between rows only, never above the first or below the last. Cormorant appears once
on the whole site, in the home hero; every other heading is Jakarta.

Gradients are allowed when they do a job (the gutter ruler and its mask, the
scanlines on the computer, the tractor-feed holes in the printer). No decorative
colour washes standing in for an idea.

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
- The margin ruler's scroll loop runs only while it is catching up; an idle page does no work.

## Illustrations

CSS-drawn, one material, styled in `src/styles/illustrations.css` from the `--hw-*` tokens.

- `RetroComputer` — the hero.
- `RetroPrinter` — dot-matrix printer printing the approval log, on the home page and the proof-of-work page.

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
- Above-the-fold entrances are CSS (`.rise`, `.rise-2`, `.rise-3`), so the static HTML rests
  visible and LCP does not wait for JavaScript. There is no loading overlay.
- Fonts load without blocking the first paint (`media="print"` swap in `index.html`).
- `public/robots.txt` allows everything and points at `public/sitemap.xml` (lastmod per URL).
- Bundle: framework and motion are split into long-cached chunks; the intake email is a
  string template so `react-dom/server` stays out of the browser bundle.
- Vercel: the SPA rewrite stays as a fallback, but the filesystem is checked first, so the
  prerendered files are what gets served. Unknown paths still return 200 with the noindex
  404 page; a true 404 status needs Vercel `routes` with `handle: filesystem`.

The link preview image is `public/assets/og-image.jpg` (1200×630), a designed file
supplied by Charles on 2026-10-04. It is not generated; replace the file to change it.

Not done, needs you: submit the sitemap in Search Console, and decide whether to
self-host the three Google Fonts.

## Checking it

Lighthouse must be run against the production build, not the dev server (the dev
server ships unminified development code and scores around 55):

```
npm run build && npm run preview
```

then audit `http://localhost:4173/` and inner pages with a trailing slash
(`/careers/`), because the local preview server only finds prerendered pages that
way. On 2026-10-04 every page scored 93–100 performance (mobile), 100 desktop,
100 accessibility, 100 SEO. Best practices shows 96 locally only because the
Vercel Analytics script does not exist off Vercel.
