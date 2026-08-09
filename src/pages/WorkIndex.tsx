import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const WorkIndex: React.FC = () => {
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
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground print:text-black/70">
                Selected product systems
              </div>
            </div>

            {/* Lede Summary */}
            <p className="mt-3 max-w-4xl text-base leading-relaxed text-foreground/90 font-sans print:text-black print:text-sm">
              The work is the evidence. These are examples of turning a messy operating problem into a product that people can actually use.
            </p>

            {/* Main Document Title */}
            <h1 className="mt-6 font-sans text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl print:text-3xl print:text-black print:mt-4">
              Systems built <br className="hidden sm:inline" />
              around the work.
            </h1>
          </header>

          {/* Selected Work Grid */}
          <section className="py-10 border-b border-border/80 print:py-6 print:border-black/20">
            <h2 className="font-sans text-2xl font-semibold tracking-tight mb-6 text-foreground print:text-xl print:text-black">
              Selected work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/work/sales-ops-system"
                className="group border border-border bg-card p-6 transition-all hover:border-foreground/40 hover:shadow-md"
              >
                <h3 className="font-sans font-semibold text-xl mb-3 text-foreground group-hover:text-mark transition-colors">
                  Sales Operation System: Built for Field Reps
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Public-data sourcing, AI enrichment, voice-matched drafting, follow-up sequencing, reply triage, field tooling, and a human approval gate.
                </p>
                <div className="mt-6 text-xs font-mono font-medium text-mark uppercase tracking-wider">
                  Read Case Study &rarr;
                </div>
              </Link>

              <Link
                to="/work/custom-commerce"
                className="group border border-border bg-card p-6 transition-all hover:border-foreground/40 hover:shadow-md"
              >
                <h3 className="font-sans font-semibold text-xl mb-3 text-foreground group-hover:text-mark transition-colors">
                  Custom Commerce System: From Visual Choice to Fulfillment
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A 3D custom-order workflow connecting product configuration, rules-based pricing, checkout, fulfillment data, and customer support.
                </p>
                <div className="mt-6 text-xs font-mono font-medium text-mark uppercase tracking-wider">
                  Read Case Study &rarr;
                </div>
              </Link>
            </div>
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

export default WorkIndex;
