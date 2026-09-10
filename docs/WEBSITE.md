# magpollo.com — structure and rules

Updated 2026-09-10 with the company-site rebuild.

## Site map

| Route | Page | Modules |
|---|---|---|
| `/` | Home | Hero (Cormorant, the only place), Sound familiar, What we build (three steps on a white plate, no prices or timelines), Proof (one ink band, walkthrough on request) |
| `/company` | Company | Header, founding team on a white plate, details (absorbs contact) |
| `/careers` | Careers | Header, four lanes, form on a white plate |
| `/work` | Proof of work | Header with the printer illustration, two one-line summaries, request form. Old `/work/*` URLs redirect here |
| `/lets-build` | Intake | Two-step intake |
| `/privacy`, `/terms` | Legal | Plain-language privacy and terms |

`/systems`, `/how-we-work` and `/contact` were built in v1 and cut in v2 as repetition; they redirect.

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
- Founding team names and lanes are published on `/company`.
- Careers and walkthrough requests go to `salesteam@magpollo.com` through the existing `/api/send_mail` endpoint.
- Privacy and Terms are written plainly and need a legal read before launch.
