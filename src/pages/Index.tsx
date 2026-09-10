import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import RetroComputer from '@/components/RetroComputer';
import RetroPrinter from '@/components/illustrations/RetroPrinter';
import RetroFlipClock from '@/components/illustrations/RetroFlipClock';
import SoundFamiliar from '@/components/SoundFamiliar';
import { Section, CtaLink, Reveal, ClosingCta } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { OFFERS, PRINCIPLES, FIT, WEEKS, PROOF } from '@/data/site';

/* ---- What we build --------------------------------------------------------- */

const Offers: React.FC = () => (
  <Section
    id="systems"
    kicker="What we build"
    heading={
      <>
        One workflow, one <span className="accented">system</span>, in three steps.
      </>
    }
    intro="You do not buy a platform. You buy the missing part, built around the tools you already use, in a fixed scope with a written definition of done."
  >
    <div className="rule-list">
      {OFFERS.map((offer) => (
        <div key={offer.name} className="grid gap-4 border-b border-border py-7 first:border-t sm:grid-cols-[48px_1fr]">
          <span className="list-index pt-1.5">{offer.index}</span>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight">{offer.name}</h3>
              <span className="kicker">{offer.kicker}</span>
            </div>
            <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">{offer.summary}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
      <CtaLink to="/systems">See what each includes</CtaLink>
      <CtaLink to="/how-we-work" muted>
        How we work
      </CtaLink>
    </div>
  </Section>
);

/* ---- Five weeks ------------------------------------------------------------ */

const FiveWeeks: React.FC = () => (
  <section className="gutter scroll-mt-24" id="five-weeks">
    <div className="hairline" />
    <div className="editorial-grid py-16 md:py-24">
      <Reveal>
        <p className="kicker mb-5">The Sprint</p>
        <h2 className="section-head">
          Five weeks to <span className="accented">launch</span>.
        </h2>
        <p className="mt-6 max-w-[380px] text-base leading-relaxed text-muted-foreground">
          Each week ends with one decision from you. Nothing moves to the next week without it, so you always know what
          has been agreed and what is being built.
        </p>
        <div className="mt-10">
          <RetroFlipClock />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <ol className="rule-list">
          {WEEKS.map((w) => (
            <li key={w.week} className="!items-start">
              <span className="grid gap-1 sm:grid-cols-[96px_1fr] sm:gap-6">
                <span className="font-semibold">{w.name}</span>
                <span className="text-muted-foreground">
                  {w.we} <span className="text-foreground">You: {w.you}</span>
                </span>
              </span>
              <span className="list-index">{w.week}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <CtaLink to="/how-we-work">The full process</CtaLink>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---- Principles ------------------------------------------------------------ */

const Principles: React.FC = () => (
  <section className="gutter scroll-mt-24" id="principles">
    <div className="hairline" />
    <div className="editorial-grid py-16 md:py-24">
      <Reveal>
        <p className="kicker mb-5">How this is different</p>
        <h2 className="section-head">
          Built to be <span className="accented">owned</span>, not demoed.
        </h2>
        <p className="mt-6 max-w-[380px] text-base leading-relaxed text-muted-foreground">
          The rules we build by, in the order a client usually asks about them.
        </p>
        <div className="mt-10">
          <RetroPrinter />
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title}>
              <span className="list-index block">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* ---- Who it is for --------------------------------------------------------- */

const WhoFor: React.FC = () => (
  <Section
    id="fit"
    kicker="Who we work with"
    heading={
      <>
        Owner-led firms where the owner is still the <span className="accented">glue</span>.
      </>
    }
    intro="Headcount is not the test. The test is whether an important workflow still depends on someone remembering, chasing, retyping, approving or searching."
  >
    <ul className="rule-list">
      {FIT.yes.map((item, i) => (
        <li key={item}>
          <span>{item}</span>
          <span className="list-index">{String(i + 1).padStart(2, '0')}</span>
        </li>
      ))}
    </ul>
    <p className="kicker mt-10 mb-3">Where we are focused first</p>
    <p className="max-w-[480px] text-[15px] leading-relaxed text-muted-foreground">
      {FIT.focus.join(', and ')}. If you are elsewhere and the description above fits, write to us anyway; the workflow
      matters more than the industry.
    </p>
  </Section>
);

/* ---- Proof ----------------------------------------------------------------- */

const Proof: React.FC = () => (
  <Section
    id="proof"
    kicker="Proof of work"
    heading={
      <>
        In production, <span className="accented">daily</span>.
      </>
    }
    intro="The core system runs inside a Fortune 500 environment under a compliance policy that forbids auto-sending. We walk clients through it on request rather than publishing it."
  >
    <div className="grid gap-6 sm:grid-cols-2">
      {PROOF.map((p) => (
        <Link key={p.id} to="/work" state={{ system: p.id }} className="paper-card press-row group flex flex-col p-6">
          <span className="kicker">Case study · on request</span>
          <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">{p.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
          <span className="cta mt-6">Request the walkthrough</span>
        </Link>
      ))}
    </div>
  </Section>
);

/* ---- Page ------------------------------------------------------------------ */

const Index: React.FC = () => {
  useMeta({
    title: 'Magpollo',
    description:
      'A product systems studio for owner-led firms. We diagnose one important workflow, keep the tools you already use, and build the missing system around how the work actually happens.',
    path: '/',
  });

  return (
    <Layout>
      <Hero />
      <section className="gutter pb-24 md:pb-32">
        <div className="editorial-grid">
          <div className="hidden lg:block" />
          <RetroComputer />
        </div>
      </section>
      <SoundFamiliar />
      <Offers />
      <FiveWeeks />
      <Principles />
      <WhoFor />
      <Proof />
      <ClosingCta />
    </Layout>
  );
};

export default Index;
