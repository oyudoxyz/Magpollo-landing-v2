import type { IncomingMessage, ServerResponse } from 'node:http';

const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'MagPollo proof of work',
  description: 'Selected product systems built by MagPollo.',
  url: 'https://magpollo.com/work',
});

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proof of Work | MagPollo</title>
    <meta name="description" content="Selected product systems built by MagPollo, from sales operations to custom commerce.">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="https://magpollo.com/work">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Proof of Work | MagPollo">
    <meta property="og:description" content="Selected product systems built by MagPollo, from sales operations to custom commerce.">
    <meta property="og:url" content="https://magpollo.com/work">
    <meta property="og:image" content="https://magpollo.com/assets/og-image.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" href="/work/custom-commerce.css">
    <script type="application/ld+json">${structuredData}</script>
  </head>
  <body>
    <div class="case-shell">
      <nav class="case-nav" aria-label="Work navigation">
        <a class="case-brand" href="/">MagPollo</a>
        <div class="case-nav-links"><a href="/lets-build">Let's build</a></div>
      </nav>
      <main class="case-article">
        <header class="case-header">
          <div class="case-header-row">
            <div class="case-kicker">Proof of work</div>
            <div class="case-meta">Selected product systems</div>
          </div>
          <p class="case-lede">The work is the evidence. These are examples of turning a messy operating problem into a product that people can actually use.</p>
          <h1>Systems built<br>around the work.</h1>
        </header>
        <section class="case-section" aria-labelledby="selected-work-heading">
          <h2 id="selected-work-heading">Selected work</h2>
          <div class="case-grid">
            <a class="case-card" href="/work/sales-ops-system">
              <h3>Sales Operation System: Built for Field Reps</h3>
              <p>Public-data sourcing, AI enrichment, voice-matched drafting, follow-up sequencing, reply triage, field tooling, and a human approval gate.</p>
            </a>
            <a class="case-card" href="/work/custom-commerce">
              <h3>Custom Commerce System: From Visual Choice to Fulfillment</h3>
              <p>A 3D custom-order workflow connecting product configuration, rules-based pricing, checkout, fulfillment data, and customer support.</p>
            </a>
          </div>
        </section>
        <footer class="case-footer">
          <span>Product systems</span>
          <span><a href="/lets-build">Build the missing system</a></span>
          <span>magpollo.com</span>
        </footer>
      </main>
    </div>
  </body>
</html>`;

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end('Method Not Allowed');
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.end(page);
}
