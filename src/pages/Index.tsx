import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import RetroComputer from '@/components/RetroComputer';
import RetroPrinter from '@/components/illustrations/RetroPrinter';
import SoundFamiliar from '@/components/SoundFamiliar';
import { Reveal, CtaLink, Section, NumberedRows } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { PAGES } from '@/seo';
import { OFFERS } from '@/data/site';

/* ---- What we build: three steps on a white plate --------------------------- */

const Offers: React.FC = () => (
  <section id="systems" className="gutter scroll-mt-24 py-16 md:py-24">
    <Reveal>
      <div className="plate grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="plate-cell plate-rule border-b md:border-b-0 md:border-r">
          <p className="kicker mb-5">What we build</p>
          <h2 className="headline">Keep what works. Build what’s missing.</h2>
          <p className="copy mt-5 max-w-[320px]">
            We won’t ask you to switch tools. We look at how the work happens today, then build only the part that’s missing.
          </p>
          <div className="mt-8">
            <CtaLink to="/lets-build">Show us how it{' '}works today</CtaLink>
          </div>
        </div>
        <NumberedRows className="stagger" items={OFFERS} />
      </div>
    </Reveal>
  </section>
);

/* ---- Proof: a pointer to the Work page, carried by the printer --------------- */

/**
 * The case studies themselves live on /work and grow there. The homepage only
 * says they exist and how to see them, with the printer standing in for them.
 */
const Proof: React.FC = () => (
  <Section
    id="proof"
    centered
    heading="Already running in real businesses."
    intro="Our systems run every day inside the firms we build for. Each case study walks through what people did by hand, what the system took over and what changed. We show them on a call rather than publishing them."
    actions={<CtaLink to="/work">Request a walkthrough</CtaLink>}
  >
    <div className="flex justify-center lg:justify-end">
      <RetroPrinter />
    </div>
  </Section>
);

/* ---- Page ------------------------------------------------------------------ */

const Index: React.FC = () => {
  useMeta(PAGES.home);

  return (
    <Layout>
      <Hero />
      <section className="gutter pb-20 md:pb-28">
        <div className="editorial-grid">
          <div className="hidden lg:block" />
          <RetroComputer />
        </div>
      </section>
      <SoundFamiliar />
      <Offers />
      <Proof />
    </Layout>
  );
};

export default Index;
