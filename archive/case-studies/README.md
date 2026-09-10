# Case studies (archived from the public site)

Proof of work is shared with prospective clients on request, not hosted. These are the
source files that used to render `/work`, `/work/sales-ops-system` and `/work/custom-commerce`,
kept here so the material can be turned into the on-request walkthrough or a PDF.

They are outside `src/` and `api/`, so they are not built, typechecked or served.

- `SalesOpsSystem.tsx`, `CustomCommerce.tsx` — the two case-study pages (React, Layout-wrapped).
- `WorkIndex.tsx` — the old index page.
- `api-work-*.ts` — the server-rendered SEO copies that Vercel used to serve for crawlers.
- `assets/` — diagrams, screenshots and the standalone stylesheet those pages referenced.

The request form lives at `src/pages/Work.tsx`.
