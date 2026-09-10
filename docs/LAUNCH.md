# Launching magpollo.com

Two parts: getting the new site live, then telling Google about it.
Total hands-on time: about 40 minutes, most of it waiting.

---

## Part 1 — Deploy

The branch is `website-company-update`. Nothing deploys until it reaches `main`.

**1. Open the pull request**

    https://github.com/oyudoxyz/Magpollo-landing-v2/compare/main...website-company-update

Vercel posts a Preview URL on the PR within a couple of minutes. That preview is
the real thing — same build, same redirects, same headers — unlike the artifact
preview I've been sending you, which is a static single-file approximation.

**2. Check these five things on the Preview URL**

| Check | How | Expected |
|---|---|---|
| Intake sends | Fill `/lets-build` and submit | Arrives at salesteam@magpollo.com |
| Walkthrough request sends | Fill the form on `/work` | Same inbox |
| Careers sends | Fill the form on `/careers` | Same inbox |
| Old links redirect | Visit `/company`, `/work/sales-ops-system` | Land on `/` and `/work` |
| Unknown page 404s | Visit `/nonsense` | "That page is not here" |

The forms depend on the Brevo SMTP environment variables already set in Vercel
(`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `EMAIL_FROM`, `EMAIL_TO`).
They are unchanged, but the forms are the one thing I could not test from here,
so test all three before merging.

**3. Merge**

Merging to `main` deploys to production. If anything looks wrong afterwards,
Vercel → Deployments → the previous one → "Promote to Production" rolls back in
about ten seconds.

---

## Part 2 — Google Search Console

**What it is.** A free Google tool that shows you how Google sees your site.
Two jobs: it tells Google your pages exist so they get indexed faster, and it
reports what people searched for before clicking you, which pages Google could
not read, and anything broken. Think of it as the analytics for how you get found,
as opposed to Vercel Analytics, which measures people already on the site.

It does not affect your ranking. It gives you the information to affect it yourself.

**Setup, once, about 15 minutes.**

1. Go to **search.google.com/search-console** and sign in with the Google account
   that should own this (use a Magpollo account, not a personal one — you can add
   the rest of the team later).

2. Click **Add property**. Choose the **Domain** option on the left, not URL prefix.
   Type `magpollo.com` with no `https://` and no `www`. Domain covers every
   subdomain and both protocols in one property.

3. Google asks you to prove you own the domain and shows a **TXT record** —
   a line starting `google-site-verification=`. Copy it.

4. Add that record wherever magpollo.com's DNS lives (Vercel → Project → Settings →
   Domains, or your registrar if DNS is there):
   - Type: `TXT`
   - Name/Host: `@` (some registrars want it blank, or `magpollo.com`)
   - Value: the whole `google-site-verification=...` string

5. Back in Search Console, click **Verify**. It usually works within minutes; DNS
   can take up to an hour. If it fails, wait and press Verify again — the record
   is fine, the propagation isn't.

6. Once verified: **Sitemaps** in the left sidebar → type `sitemap.xml` → **Submit**.
   Status goes to "Success" within a day or two.

7. **URL Inspection** at the top → paste `https://magpollo.com/` → **Request indexing**.
   Repeat for `/work`, `/careers`, `/lets-build`. This is a nudge, not a guarantee;
   it moves things from weeks to days.

**Then leave it alone for two weeks.** There is no data before Google has crawled.

**What to look at after that**, once a month, ten minutes:

- **Performance** — the queries people actually used to find you. This is the useful
  one. If nobody searches the words on your homepage, the homepage words are wrong.
- **Pages** (under Indexing) — should show 6 indexed. If a page says "Crawled,
  currently not indexed", that usually means Google judged it thin; tell me and
  I will look.
- **Core Web Vitals** and **Mobile Usability** — should stay green. Any red is a
  bug worth fixing.

**Also worth doing while you're there (5 minutes):** create a
**Bing Webmaster Tools** account at bing.com/webmasters and use "Import from
Google Search Console". One click, and it covers Bing, DuckDuckGo, and the
search built into Windows and ChatGPT.

---

## What I could not do from here

- **Test the three forms.** No SMTP credentials in this environment. Do this on
  the Preview URL before merging.
- **Verify the domain.** Needs DNS access and a Google login.
- **Confirm the Open Graph image.** I replaced the old one — pink is not in the
  palette and "Build systems for your business" is not the current positioning.
  The new one is paper, the wordmark, the hero line and the gutter ruler. Look at
  `public/assets/og-image.jpg` and say if you
  want it different; it is generated from `scripts/og-image.html`, so it is a
  two-minute change.
- **Legal read of Privacy and Terms.** I wrote them to be accurate and plain, but
  they have not been reviewed by anyone qualified.
