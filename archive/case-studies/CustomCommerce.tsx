import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const techStack = [
  'Next.js + TypeScript',
  'Three.js',
  'Sanity',
  'Prisma + PostgreSQL',
  'Clerk',
  'Stripe',
  'Telegram',
  'Client identity withheld'
];

const CustomCommerce: React.FC = () => {
  return (
    <Layout>
      <div className="gutter pb-24 pt-4 md:pt-8 print:p-0 print:m-0 print:w-full print:max-w-none">
        <article className="relative bg-background text-foreground print:bg-white print:text-black">
          
          {/* Document Header Bar */}
          <header className="border-b border-border pb-6 print:border-black">
            <div className="flex items-center justify-between pb-2">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-mark">
                Proof of work
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground print:text-black/70 flex gap-4">
                <Link to="/work/sales-ops-system" className="hover:text-foreground transition-colors">Other work</Link>
                <span>Case study · Product systems</span>
              </div>
            </div>

            {/* Lede Summary */}
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-foreground/90 font-sans print:text-black print:text-sm">
              An end-to-end commerce workflow for a custom jewelry business: a 3D configurator that turns a customer's tooth-by-tooth decisions into validated pricing, a checkout-ready order, and a fulfillment record the team can actually build from.
            </p>

            {/* Main Document Title */}
            <h1 className="mt-6 font-sans text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl print:text-3xl print:text-black print:mt-4">
              Custom Commerce System: <br className="hidden sm:inline" />
              From Visual Choice to Fulfillment
            </h1>

            {/* Tech Stack Pills / Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5 print:mt-4">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border/80 bg-card px-2.5 py-1 text-[10px] font-mono font-medium text-foreground/80 tracking-wider uppercase print:border-black/30 print:bg-gray-100 print:text-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          {/* Section 1: The Problem */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-4 text-foreground print:text-xl print:text-black">
              The problem: custom products do not behave like normal SKUs
            </h2>
            
            <p className="text-base leading-relaxed text-foreground/90 mb-6 print:text-sm print:text-black">
              A custom jewelry order is not one product with one price. It is a set of dependent decisions that have to stay accurate from the first interaction through payment and production.
            </p>

            <ul className="space-y-3 pl-1 text-base text-foreground/90 print:text-sm print:text-black">
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>The customer needs to see the choice.</strong> Tooth selection, material, color, style, stones, and cut are easier to understand when the product responds visually.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>The price needs to follow the rules.</strong> Availability, per-tooth rates, bundle tiers, stone pricing, and cut fees all affect the final total.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>The order needs to preserve the decision.</strong> A payment confirmation alone is not a manufacturing specification.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div>
                  <strong>Questions need a place to go.</strong> When a customer needs help, the support conversation should remain attached to the same identity and order context.
                </div>
              </li>
            </ul>

            <p className="mt-6 bg-card border-l-2 border-mark p-4 text-base font-medium text-foreground print:bg-gray-100 print:text-black">
              <strong>The system we built:</strong> a guided custom-order path that makes a complex product understandable to the customer and legible to the team fulfilling it.
            </p>
          </section>

          {/* Section 2: System at a Glance */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              The system at a glance
            </h2>
            <p className="text-base text-muted-foreground mb-6 print:text-sm print:text-black/70">
              Four layers work together. Each one turns an informal part of the buying process into a durable piece of the product system.
            </p>

            <figure className="my-6 overflow-hidden border border-border bg-card p-2 print:border-black/30 print:bg-white">
              <img
                src="/work/custom-commerce-system.svg"
                alt="Architecture diagram showing customer input, rules and pricing, checkout and persistence, then fulfillment and support"
                className="w-full h-auto object-contain"
                loading="eager"
              />
              <figcaption className="mt-3 text-center text-xs font-mono text-muted-foreground print:text-black/70">
                A custom request becomes a data contract that survives the handoff from customer to team.
              </figcaption>
            </figure>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="border border-border bg-card p-5">
                <h3 className="font-sans font-semibold text-lg mb-2">Content and pricing</h3>
                <p className="text-sm text-muted-foreground">Sanity holds product content and the pricing data that drives the experience instead of scattering numbers through the UI.</p>
              </div>
              <div className="border border-border bg-card p-5">
                <h3 className="font-sans font-semibold text-lg mb-2">Interactive configuration</h3>
                <p className="text-sm text-muted-foreground">A browser-based 3D flow lets customers select teeth and configure materials, styles, stones, and cut preferences.</p>
              </div>
              <div className="border border-border bg-card p-5">
                <h3 className="font-sans font-semibold text-lg mb-2">Order persistence</h3>
                <p className="text-sm text-muted-foreground">Checkout creates a pending order and stores the full configuration before payment is finalized.</p>
              </div>
              <div className="border border-border bg-card p-5">
                <h3 className="font-sans font-semibold text-lg mb-2">Support loop</h3>
                <p className="text-sm text-muted-foreground">Authenticated chat routes conversations and attachments to a private team channel, then brings replies back to the customer.</p>
              </div>
            </div>
          </section>

          {/* Section 3: The Configurator */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              The configurator is the product
            </h2>
            <p className="text-base text-muted-foreground mb-6 print:text-sm print:text-black/70">
              The custom flow is built around the actual object being sold. Customers can choose individual teeth or use 6x6, 8x8, 10x10, and 12x12 presets, then move through the dependent choices that shape the final piece.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-border bg-card p-4">
                <h3 className="font-sans font-semibold text-base mb-1">Selection</h3>
                <p className="text-xs text-muted-foreground">Teeth are selected directly against a 3D model, with presets for common builds and support for custom selection.</p>
              </div>
              <div className="border border-border bg-card p-4">
                <h3 className="font-sans font-semibold text-base mb-1">Materials</h3>
                <p className="text-xs text-muted-foreground">Metal family, karat, and color are represented as structured selections rather than free-form notes.</p>
              </div>
              <div className="border border-border bg-card p-4">
                <h3 className="font-sans font-semibold text-base mb-1">Style</h3>
                <p className="text-xs text-muted-foreground">Plain and iced-out paths are handled as different valid configurations, with stone choices shown only when available.</p>
              </div>
              <div className="border border-border bg-card p-4">
                <h3 className="font-sans font-semibold text-base mb-1">Validation</h3>
                <p className="text-xs text-muted-foreground">The customer cannot add an incomplete configuration to the cart. The system checks every selected tooth before handoff.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Pricing Rules */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              Pricing becomes a rule, not a conversation
            </h2>
            <p className="text-base text-muted-foreground mb-6 print:text-sm print:text-black/70">
              The configurator calculates the total from the same structured data that controls the available options. That keeps the visible product experience and the eventual order aligned.
            </p>

            <div className="overflow-x-auto border border-border print:border-black/40">
              <table className="w-full text-left text-xs font-mono print:text-[10px]">
                <thead>
                  <tr className="border-b border-border bg-muted/50 uppercase text-muted-foreground print:border-black/30 print:bg-gray-100 print:text-black">
                    <th className="px-4 py-3 font-semibold w-1/4">Input</th>
                    <th className="px-4 py-3 font-semibold w-5/12">System behavior</th>
                    <th className="px-4 py-3 font-semibold w-1/3">Why it matters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 print:divide-black/20">
                  <tr className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-semibold text-foreground print:text-black">Selected teeth</td>
                    <td className="px-4 py-3 text-foreground/90 font-sans print:text-black">Counts teeth and applies per-tooth or bundle pricing.</td>
                    <td className="px-4 py-3 text-muted-foreground font-sans print:text-black/80">Common builds can be priced consistently without manual quoting.</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-semibold text-foreground print:text-black">Metal and color</td>
                    <td className="px-4 py-3 text-foreground/90 font-sans print:text-black">Filters valid material paths and resets dependent choices when needed.</td>
                    <td className="px-4 py-3 text-muted-foreground font-sans print:text-black/80">Customers do not create combinations the team cannot fulfill.</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-semibold text-foreground print:text-black">Style and stones</td>
                    <td className="px-4 py-3 text-foreground/90 font-sans print:text-black">Uses an availability matrix for iced-out options and stone pricing.</td>
                    <td className="px-4 py-3 text-muted-foreground font-sans print:text-black/80">The price reflects the actual material combination.</td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="px-4 py-3 font-semibold text-foreground print:text-black">Cut preference</td>
                    <td className="px-4 py-3 text-foreground/90 font-sans print:text-black">Adds the relevant service charge to the final total.</td>
                    <td className="px-4 py-3 text-muted-foreground font-sans print:text-black/80">The selected service is carried into the build instructions.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Checkout */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              Checkout carries the full decision
            </h2>
            <p className="text-base text-muted-foreground mb-6 print:text-sm print:text-black/70">
              The checkout boundary is where the system earns its keep. Before creating a payment session, the server validates the cart, upserts the customer, creates a pending order, and stores the full configuration as JSON in PostgreSQL through Prisma.
            </p>

            <figure className="my-6 overflow-hidden border border-border bg-card p-2 print:border-black/30 print:bg-white">
              <img
                src="/work/custom-commerce-flow.svg"
                alt="Six-step custom order lifecycle from selecting teeth to a fulfillment-ready order"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
              <figcaption className="mt-3 text-center text-xs font-mono text-muted-foreground print:text-black/70">
                The lifecycle: select, configure, calculate, review, pay, and build from data.
              </figcaption>
            </figure>

            <p className="bg-card border-l-2 border-mark p-4 text-base leading-relaxed text-foreground/90 print:bg-gray-100 print:text-black">
              <strong>Important boundary:</strong> the payment provider receives a human-readable summary, while the database keeps the complete structured configuration. The signed payment webhook updates the existing pending order to paid instead of reconstructing it from the checkout description.
            </p>
          </section>

          {/* Section 6: Support */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-2 text-foreground print:text-xl print:text-black">
              Support is attached to identity
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4 print:text-sm print:text-black">
              Customers can authenticate with Clerk and open a chat session from the product. The server creates one private Telegram forum topic per customer, sends text, images, and PDFs into that topic, and stores team replies for the customer-facing widget to poll.
            </p>
            <p className="text-base leading-relaxed text-foreground/90 print:text-sm print:text-black">
              This is a small but important operational decision: support does not become a separate inbox that has to be reconciled later. It is part of the same product context.
            </p>
          </section>

          {/* Section 7: Systems View */}
          <section className="pt-10 print:pt-6 print:break-inside-avoid">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-4 text-foreground print:text-xl print:text-black">
              The systems view
            </h2>
            <p className="text-base text-foreground/90 mb-4 print:text-sm print:text-black">
              The notable part is not any individual integration. It is the contract between them:
            </p>
            <ul className="space-y-3 pl-1 text-base text-foreground/90 mb-6 print:text-sm print:text-black">
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div><strong>Sanity defines the catalog and pricing.</strong> The content team can change product data without rewriting the application.</div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div><strong>The configurator produces typed state.</strong> Customer decisions are stored as fields with validation and dependencies.</div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div><strong>Prisma preserves the order.</strong> The configuration is stored with the order item so later catalog changes do not rewrite history.</div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div><strong>Stripe confirms payment.</strong> The webhook is verified before the order is marked paid.</div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="select-none text-mark font-bold print:text-black">•</span>
                <div><strong>Clerk and Telegram close the loop.</strong> Identity and support stay connected to the same customer record.</div>
              </li>
            </ul>

            <p className="bg-card border-l-2 border-mark p-4 text-base font-medium text-foreground print:bg-gray-100 print:text-black">
              <strong>The result:</strong> a customer can design a complex custom product in the browser, receive a rules-based total, pay through standard checkout, and leave the team with structured instructions instead of a message thread to decode.
            </p>
          </section>

          {/* Document Footer Bar */}
          <footer className="mt-12 border-t border-border pt-4 flex items-center justify-between text-xs font-mono text-muted-foreground print:mt-8 print:border-black print:text-black/70">
            <span>Product systems</span>
            <Link to="/lets-build" className="hover:text-foreground transition-colors">Build the missing system</Link>
            <span>magpollo.com</span>
          </footer>

        </article>
      </div>
    </Layout>
  );
};

export default CustomCommerce;
