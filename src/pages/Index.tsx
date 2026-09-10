import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import RetroComputer from '@/components/RetroComputer';
import SoundFamiliar from '@/components/SoundFamiliar';
import { Reveal, CtaLink } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { PAGES } from '@/seo';
import { OFFERS } from '@/data/site';

/* ---- What we build: three steps on a white plate --------------------------- */

const Offers: React.FC = () => (
  <section id="systems" className="gutter scroll-mt-24 py-16 md:py-24">
    <Reveal>
      <div className="plate grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="border-b border-border p-7 md:border-b-0 md:border-r md:p-10">
          <p className="kicker mb-5">What we build</p>
          <h2 className="headline">Three steps. One workflow.</h2>
          <p className="mt-5 max-w-[320px] text-[15px] leading-relaxed text-muted-foreground">
            Not a platform. The missing part between the tools you already have, built around how you work.
          </p>
          <div className="mt-8">
            <CtaLink to="/lets-build">Start with the Blueprint</CtaLink>
          </div>
        </div>
        <ol className="stagger">
          {OFFERS.map((o, i) => (
            <li key={o.name} className={`grid gap-3 p-7 sm:grid-cols-[40px_1fr] md:p-10 ${i < OFFERS.length - 1 ? 'border-b border-border' : ''}`}>
              <span className="list-index pt-1.5">{o.index}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{o.name}</h3>
                <p className="mt-2 max-w-[460px] text-[15px] leading-relaxed text-muted-foreground">{o.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  </section>
);

/* ---- Proof: the one ink band ---------------------------------------------- */

const Proof: React.FC = () => (
  <section id="proof" className="band-ink">
    <div className="gutter grid gap-8 py-14 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-end md:py-20">
      <Reveal>
        <p className="kicker mb-5">Proof of work</p>
        <h2 className="headline max-w-[600px]">
          Our systems run every day inside real businesses: a Fortune 500 sales organisation, a made-to-order commerce
          business. Both kept working while we built.
        </h2>
      </Reveal>
      <Reveal delay={0.08} className="md:justify-self-end">
        <p className="muted mb-5 max-w-[300px] text-[15px] leading-relaxed">
          Case studies are shown to prospective clients, not published.
        </p>
        <Link to="/work" className="cta">
          Request a walkthrough
        </Link>
      </Reveal>
    </div>
  </section>
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
