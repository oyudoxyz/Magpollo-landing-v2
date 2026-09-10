import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink, DefList, ClosingCta } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { OFFERS } from '@/data/site';

const SCOPE = {
  included: [
    'Up to eight named users',
    'One primary workflow',
    'One email channel, one source-of-truth database',
    'Up to two standard integrations',
    'Migration of one agreed dataset, up to 5,000 records',
    'Two workflow review rounds, one visual polish round',
    'Remote training and a written handover',
  ],
  changeOrder: [
    'Company-wide rollout or external customer portals',
    'Several unrelated departments or processes',
    'Omnichannel messaging across many vendors',
    'Custom integrations without stable, documented APIs',
    'Historical cleanup across many systems',
    'Unlimited revisions after approval',
    'Long-term managed operations or staff augmentation',
  ],
};

const MODULES = [
  { term: 'Knowledge brain', description: 'Your documents and methodology answer questions inside the workflow, with access scoped to who may see what.' },
  { term: 'Sourcing and enrichment', description: 'Current accounts, contacts or vendor intelligence pulled from agreed sources at an agreed volume.' },
  { term: 'Per-record assistant', description: 'Research, summaries and drafting from the full history of a record, after a permissions review.' },
  { term: 'Document generator', description: 'Proposals, one-pagers or reports produced from a locked template with an approval path.' },
  { term: 'Sheet bridge', description: 'Two-way mapping to Excel or Google Sheets so the team keeps working where it already does during adoption.' },
];

const DONE = [
  'A user can create or import a record, assign ownership and see its full history',
  'The system drafts in your approved style and cannot send without the configured approval',
  'Sequences advance correctly, stop on reply and record every touch',
  'Replies are classified and surfaced with an owner and a next action',
  'Leadership can see stage, stale records, overdue actions and the agreed measures',
  'Acceptance tests pass in production; permissions match the spec; scheduled jobs run with visible logs',
];

const Systems: React.FC = () => {
  useMeta({
    title: 'Systems',
    description:
      'Blueprint, System Sprint and Care Plan: how Magpollo diagnoses one workflow, ships a fixed-scope system in five weeks and keeps it running.',
    path: '/systems',
  });

  return (
    <Layout>
      <PageHeader
        kicker="What we build"
        title={
          <>
            The missing part, <span className="accented">built</span> to fit.
          </>
        }
        standfirst="Most firms do not need another platform. They need the operating layer between the tools they already have: the record, the draft, the approval, the follow-up, the view of what is stale. That is what a product system is, and it comes in three steps."
        actions={<CtaLink to="/lets-build">Start with a conversation</CtaLink>}
      />

      {OFFERS.map((offer, i) => (
        <Section
          key={offer.name}
          id={['blueprint', 'sprint', 'care'][i]}
          kicker={`Step ${offer.index} · ${offer.kicker}`}
          heading={offer.name}
          intro={offer.summary}
        >
          <p className="kicker mb-3">What you get</p>
          <ul className="rule-list">
            {offer.deliverables.map((d, j) => (
              <li key={d}>
                <span>{d}</span>
                <span className="list-index">{String(j + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[480px] text-sm leading-relaxed text-muted-foreground">{offer.note}</p>
        </Section>
      ))}

      <Section
        id="scope"
        kicker="Scope"
        heading={
          <>
            What a standard Sprint <span className="accented">includes</span>.
          </>
        }
        intro="The smallest complete system we will sell. Anything outside it is a written change order, agreed before it starts, never a surprise on the invoice."
      >
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="kicker mb-3">Included</p>
            <ul className="rule-list">
              {SCOPE.included.map((s) => (
                <li key={s}>
                  <span className="text-[15px]">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker mb-3">Change order</p>
            <ul className="rule-list">
              {SCOPE.changeOrder.map((s) => (
                <li key={s}>
                  <span className="text-[15px] text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="modules"
        kicker="Optional modules"
        heading={
          <>
            Added only when they serve the <span className="accented">same</span> outcome.
          </>
        }
        intro="Each one is scoped and priced on its own, after the Blueprint shows it is needed. We do not bundle features you will not use."
      >
        <DefList items={MODULES} />
      </Section>

      <Section
        id="done"
        kicker="Definition of done"
        heading={
          <>
            Launch means <span className="accented">this</span>.
          </>
        }
        intro="Written into the proposal before we start, checked in production before you make the final payment."
      >
        <ol className="rule-list">
          {DONE.map((d, i) => (
            <li key={d}>
              <span>{d}</span>
              <span className="list-index">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      </Section>

      <ClosingCta />
    </Layout>
  );
};

export default Systems;
