import type { IncomingMessage, ServerResponse } from 'node:http';

const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Custom Commerce System: From Visual Choice to Fulfillment',
  description:
    'An anonymized MagPollo case study about a custom commerce workflow that connects 3D product configuration, rules-based pricing, checkout, fulfillment data, and customer support.',
  author: { '@type': 'Organization', name: 'MagPollo' },
  publisher: { '@type': 'Organization', name: 'MagPollo' },
  mainEntityOfPage: 'https://magpollo.com/work/custom-commerce',
});

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Commerce System | MagPollo</title>
    <meta name="description" content="An anonymized MagPollo case study about a custom commerce workflow that connects 3D product configuration, rules-based pricing, checkout, fulfillment data, and customer support.">
    <meta name="robots" content="index,follow">
    <link rel="canonical" href="https://magpollo.com/work/custom-commerce">
    <meta property="og:type" content="article">
    <meta property="og:title" content="Custom Commerce System: From Visual Choice to Fulfillment">
    <meta property="og:description" content="How a custom jewelry commerce workflow turns visual product decisions into validated pricing, paid orders, and fulfillment-ready data.">
    <meta property="og:url" content="https://magpollo.com/work/custom-commerce">
    <meta property="og:image" content="https://magpollo.com/assets/og-image.jpg">
    <meta property="og:image:alt" content="MagPollo custom commerce system case study">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="theme-color" content="#DFD8CE">
    <meta name="color-scheme" content="light">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap">
    <link rel="stylesheet" href="/work/custom-commerce.css">
    <script type="application/ld+json">${structuredData}</script>
  </head>
  <body>
    <div class="preload-spinner" aria-hidden="true"><div class="preload-rule"></div></div>
    <div class="page-ruler" aria-hidden="true"><div class="guides-ruler"></div></div>
    <div class="case-shell">
      <nav class="case-nav" aria-label="Case study navigation">
        <a class="case-brand" href="/" aria-label="Magpollo home"><img src="/assets/magpollo-logo.svg" alt="Magpollo" width="124" height="30"></a>
        <div class="case-nav-links">
          <a href="/work/sales-ops-system">Other work</a>
          <a href="/lets-build">Let's build</a>
        </div>
      </nav>

      <main class="case-article">
        <header class="case-header">
          <div class="case-header-row">
            <div class="case-kicker">Proof of work</div>
            <div class="case-meta">Case study · Product systems</div>
          </div>
          <p class="case-lede">An end-to-end commerce workflow for a custom jewelry business: a 3D configurator that turns a customer's tooth-by-tooth decisions into validated pricing, a checkout-ready order, and a fulfillment record the team can actually build from.</p>
          <h1>Custom Commerce System:<br>From Visual Choice to Fulfillment</h1>
          <div class="case-tags" aria-label="Technology used">
            <span class="case-tag">Next.js + TypeScript</span>
            <span class="case-tag">Three.js</span>
            <span class="case-tag">Sanity</span>
            <span class="case-tag">Prisma + PostgreSQL</span>
            <span class="case-tag">Clerk</span>
            <span class="case-tag">Stripe</span>
            <span class="case-tag">Telegram</span>
            <span class="case-tag">Client identity withheld</span>
          </div>
        </header>

        <section class="case-section" aria-labelledby="problem-heading">
          <h2 id="problem-heading">The problem: custom products do not behave like normal SKUs</h2>
          <p>A custom jewelry order is not one product with one price. It is a set of dependent decisions that have to stay accurate from the first interaction through payment and production.</p>
          <ul class="case-list">
            <li><div><strong>The customer needs to see the choice.</strong> Tooth selection, material, color, style, stones, and cut are easier to understand when the product responds visually.</div></li>
            <li><div><strong>The price needs to follow the rules.</strong> Availability, per-tooth rates, bundle tiers, stone pricing, and cut fees all affect the final total.</div></li>
            <li><div><strong>The order needs to preserve the decision.</strong> A payment confirmation alone is not a manufacturing specification.</div></li>
            <li><div><strong>Questions need a place to go.</strong> When a customer needs help, the support conversation should remain attached to the same identity and order context.</div></li>
          </ul>
          <p class="case-callout"><strong>The system we built:</strong> a guided custom-order path that makes a complex product understandable to the customer and legible to the team fulfilling it.</p>
        </section>

        <section class="case-section" aria-labelledby="overview-heading">
          <h2 id="overview-heading">The system at a glance</h2>
          <p>Four layers work together. Each one turns an informal part of the buying process into a durable piece of the product system.</p>
          <figure class="case-figure">
            <img src="/work/custom-commerce-system.svg" alt="Architecture diagram showing customer input, rules and pricing, checkout and persistence, then fulfillment and support" width="1200" height="420">
            <figcaption>A custom request becomes a data contract that survives the handoff from customer to team.</figcaption>
          </figure>
          <div class="case-grid">
            <article class="case-card"><h3>Content and pricing</h3><p>Sanity holds product content and the pricing data that drives the experience instead of scattering numbers through the UI.</p></article>
            <article class="case-card"><h3>Interactive configuration</h3><p>A browser-based 3D flow lets customers select teeth and configure materials, styles, stones, and cut preferences.</p></article>
            <article class="case-card"><h3>Order persistence</h3><p>Checkout creates a pending order and stores the full configuration before payment is finalized.</p></article>
            <article class="case-card"><h3>Support loop</h3><p>Authenticated chat routes conversations and attachments to a private team channel, then brings replies back to the customer.</p></article>
          </div>
        </section>

        <section class="case-section" aria-labelledby="configurator-heading">
          <h2 id="configurator-heading">The configurator is the product</h2>
          <p>The custom flow is built around the actual object being sold. Customers can choose individual teeth or use 6x6, 8x8, 10x10, and 12x12 presets, then move through the dependent choices that shape the final piece.</p>
          <div class="case-grid">
            <article class="case-card"><h3>Selection</h3><p>Teeth are selected directly against a 3D model, with presets for common builds and support for custom selection.</p></article>
            <article class="case-card"><h3>Materials</h3><p>Metal family, karat, and color are represented as structured selections rather than free-form notes.</p></article>
            <article class="case-card"><h3>Style</h3><p>Plain and iced-out paths are handled as different valid configurations, with stone choices shown only when available.</p></article>
            <article class="case-card"><h3>Validation</h3><p>The customer cannot add an incomplete configuration to the cart. The system checks every selected tooth before handoff.</p></article>
          </div>
        </section>

        <section class="case-section" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading">Pricing becomes a rule, not a conversation</h2>
          <p>The configurator calculates the total from the same structured data that controls the available options. That keeps the visible product experience and the eventual order aligned.</p>
          <div class="case-table-wrap">
            <table class="case-table">
              <thead><tr><th>Input</th><th>System behavior</th><th>Why it matters</th></tr></thead>
              <tbody>
                <tr><td>Selected teeth</td><td>Counts teeth and applies per-tooth or bundle pricing.</td><td>Common builds can be priced consistently without manual quoting.</td></tr>
                <tr><td>Metal and color</td><td>Filters valid material paths and resets dependent choices when needed.</td><td>Customers do not create combinations the team cannot fulfill.</td></tr>
                <tr><td>Style and stones</td><td>Uses an availability matrix for iced-out options and stone pricing.</td><td>The price reflects the actual material combination.</td></tr>
                <tr><td>Cut preference</td><td>Adds the relevant service charge to the final total.</td><td>The selected service is carried into the build instructions.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="case-section" aria-labelledby="checkout-heading">
          <h2 id="checkout-heading">Checkout carries the full decision</h2>
          <p>The checkout boundary is where the system earns its keep. Before creating a payment session, the server validates the cart, upserts the customer, creates a pending order, and stores the full configuration as JSON in PostgreSQL through Prisma.</p>
          <figure class="case-figure">
            <img src="/work/custom-commerce-flow.svg" alt="Six-step custom order lifecycle from selecting teeth to a fulfillment-ready order" width="1200" height="260" loading="lazy">
            <figcaption>The lifecycle: select, configure, calculate, review, pay, and build from data.</figcaption>
          </figure>
          <p class="case-callout"><strong>Important boundary:</strong> the payment provider receives a human-readable summary, while the database keeps the complete structured configuration. The signed payment webhook updates the existing pending order to paid instead of reconstructing it from the checkout description.</p>
        </section>

        <section class="case-section" aria-labelledby="support-heading">
          <h2 id="support-heading">Support is attached to identity</h2>
          <p>Customers can authenticate with Clerk and open a chat session from the product. The server creates one private Telegram forum topic per customer, sends text, images, and PDFs into that topic, and stores team replies for the customer-facing widget to poll.</p>
          <p>This is a small but important operational decision: support does not become a separate inbox that has to be reconciled later. It is part of the same product context.</p>
        </section>

        <section class="case-section" aria-labelledby="systems-heading">
          <h2 id="systems-heading">The systems view</h2>
          <p>The notable part is not any individual integration. It is the contract between them:</p>
          <ul class="case-list">
            <li><div><strong>Sanity defines the catalog and pricing.</strong> The content team can change product data without rewriting the application.</div></li>
            <li><div><strong>The configurator produces typed state.</strong> Customer decisions are stored as fields with validation and dependencies.</div></li>
            <li><div><strong>Prisma preserves the order.</strong> The configuration is stored with the order item so later catalog changes do not rewrite history.</div></li>
            <li><div><strong>Stripe confirms payment.</strong> The webhook is verified before the order is marked paid.</div></li>
            <li><div><strong>Clerk and Telegram close the loop.</strong> Identity and support stay connected to the same customer record.</div></li>
          </ul>
          <p class="case-callout"><strong>The result:</strong> a customer can design a complex custom product in the browser, receive a rules-based total, pay through standard checkout, and leave the team with structured instructions instead of a message thread to decode.</p>
        </section>

        <footer class="case-footer">
          <span>Product systems</span>
          <span><a href="/lets-build">Build the missing system</a></span>
          <span>magpollo.com</span>
        </footer>
      </main>
    </div>
    <script>window.addEventListener('load', function () { document.body.classList.add('js-loaded'); });</script>
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
