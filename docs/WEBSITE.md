# magpollo.com — structure and rules

Updated 2026-09-10 with the company-site rebuild.

## Site map

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Hero, Sound familiar, What we build, Five weeks, Principles, Who we work with, Proof on request, closing CTA |
| `/systems` | Systems | Blueprint, System Sprint, Care Plan in detail; standard scope; optional modules; definition of done |
| `/how-we-work` | How we work | The five-stage path, the Sprint week by week, what the client brings, how success is measured |
| `/company` | Company | What we are and are not, founding team and lanes, operating rules, legal details |
| `/careers` | Careers | Lanes, internship notice, terms, expression-of-interest form |
| `/contact` | Contact | Email, phone, social, links to intake / walkthrough / careers |
| `/work` | Proof of work | Case studies are shared on request. Two summaries and a request form. Old `/work/*` URLs redirect here |
| `/lets-build` | Intake | Two-step intake (unchanged flow, motion tightened) |
| `/privacy`, `/terms` | Legal | Plain-language privacy and terms |

Copy is sourced from MAGPOLLO HQ in Notion: Founding Brief, Company One-Liner and Messaging,
Starter Offer, Paid Blueprint, Care Plan, Sales Playbook, Competitive Positioning, Team Operating
Policy. `src/data/site.ts` holds it in one place.

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

- `RetroPrinter` — dot-matrix printer printing the approval log (human approval in code).
- `RetroFlipClock` — desk flip-clock counting the five weeks to launch.

No client names appear on illustrations. Record IDs only.

## Decisions to confirm

- Prices shown: Blueprint $3,500; Care Plan from $1,000/month; Sprint "fixed price, quoted after the Blueprint". Sprint pricing is deliberately not shown.
- Founding team names and lanes are published on `/company`.
- Careers and walkthrough requests go to `salesteam@magpollo.com` through the existing `/api/send_mail` endpoint.
- Privacy and Terms are written plainly and need a legal read before launch.
