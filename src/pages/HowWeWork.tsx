import React from 'react';
import Layout from '@/components/Layout';
import RetroFlipClock from '@/components/illustrations/RetroFlipClock';
import { PageHeader, Section, CtaLink, DefList, ClosingCta, Reveal } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { WEEKS } from '@/data/site';

const PATH = [
  { term: '01 · Conversation', description: 'Thirty minutes. We walk through the last real example of the workflow, not the ideal version: what triggered it, who touched it, where someone had to remember, chase, copy, approve or search. We do not demo before the problem is clear.' },
  { term: '02 · Recommendation', description: 'We come back with a point of view in writing: what we heard, what we would keep, what we would build first, and what we would leave alone. Sometimes the recommendation is an off-the-shelf tool or a process change, and we say so.' },
  { term: '03 · Blueprint', description: 'One to two weeks of mapping the workflow, tools, data, constraints and consequences into a fixed scope. It ends in a Sprint proposal, or in a recommendation not to build. The fee is credited toward the Sprint.' },
  { term: '04 · Sprint', description: 'Five weeks to launch and two weeks of stabilization. One weekly review, one decision from you each week, a definition of done agreed before kickoff.' },
  { term: '05 · Care', description: 'From the first month after stabilization we monitor, fix, update and tune the system, and review its health with you monthly.' },
];

const YOU_BRING = [
  'One decision-maker and one day-to-day project owner',
  'Workflow examples, approved messages, data access and credentials on time',
  'Attendance at the weekly review, with consolidated feedback within two business days',
  'The legal, compliance and data-handling requirements that apply to you',
  'Ownership of adoption, internal policy and final approval of anything customer-facing',
];

const MEASURES = [
  { term: 'Follow-up completeness', description: 'Open opportunities carrying a dated next action. First target: 90% or better.' },
  { term: 'Draft acceptance', description: 'Drafts approved with minor or no edits. First target: 60% or better after tuning.' },
  { term: 'Stale records', description: 'Records past the agreed inactivity threshold. First target: halved within 60 days.' },
  { term: 'Response handling', description: 'From reply received to an assigned next action. First target: under one business day.' },
  { term: 'Owner time', description: 'Weekly hours spent rewriting, checking or chasing. Target agreed with you in week one.' },
];

const HowWeWork: React.FC = () => {
  useMeta({
    title: 'How we work',
    description:
      'From a thirty-minute conversation to a system in daily use: the Magpollo path, the five-week Sprint, what you bring, and how we measure whether it worked.',
    path: '/how-we-work',
  });

  return (
    <Layout>
      <PageHeader
        kicker="How we work"
        title={
          <>
            Diagnose first. <span className="accented">Then</span> build.
          </>
        }
        standfirst="Every engagement follows the same path, because the path is where the risk is removed: we do not quote a system we have not mapped, and we do not build a week further than you have approved."
        actions={<CtaLink to="/lets-build">Start the conversation</CtaLink>}
      />

      <Section
        id="path"
        kicker="The path"
        heading={
          <>
            From first call to a system in <span className="accented">use</span>.
          </>
        }
        intro="Five stages. Each one ends with something written down and a dated next step, so neither of us is ever waiting on the other without knowing it."
      >
        <DefList items={PATH} />
      </Section>

      <section className="gutter scroll-mt-24" id="sprint">
        <div className="hairline" />
        <div className="editorial-grid py-16 md:py-24">
          <Reveal>
            <p className="kicker mb-5">The Sprint, week by week</p>
            <h2 className="section-head">
              One decision a <span className="accented">week</span>.
            </h2>
            <p className="mt-6 max-w-[380px] text-base leading-relaxed text-muted-foreground">
              Payment follows the same rhythm: half at kickoff, thirty percent after you approve the workflow prototype,
              twenty percent before production launch.
            </p>
            <div className="mt-10">
              <RetroFlipClock />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="def-list">
              {WEEKS.map((w) => (
                <div key={w.week}>
                  <dt>
                    Week {w.week}
                    <br />
                    <span className="text-foreground">{w.name}</span>
                  </dt>
                  <dd>
                    <span className="block">{w.we}</span>
                    <span className="mt-2 block text-muted-foreground">Your decision: {w.you}</span>
                  </dd>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Section
        id="you"
        kicker="What you bring"
        heading={
          <>
            A build is a <span className="accented">joint</span> effort.
          </>
        }
        intro="We are fast because we do not wait. These are the things a Sprint needs from your side, and we ask for them at kickoff."
      >
        <ol className="rule-list">
          {YOU_BRING.map((item, i) => (
            <li key={item}>
              <span>{item}</span>
              <span className="list-index">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="measure"
        kicker="Measurement"
        heading={
          <>
            We agree what <span className="accented">better</span> means before we start.
          </>
        }
        intro="Baseline in week one. No more than three measures per client, chosen from these and reviewed at the monthly health check."
      >
        <DefList items={MEASURES} />
      </Section>

      <ClosingCta />
    </Layout>
  );
};

export default HowWeWork;
