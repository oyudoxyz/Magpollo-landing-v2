import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink, ClosingCta } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { NOT, TEAM, CONTACT } from '@/data/site';

const HOW_WE_RUN = [
  'Every active engagement has an owner, a next action and a date.',
  'Customer evidence can change a working decision. One interesting idea cannot.',
  'Nothing is treated as a repeatable product until three clients have bought the same outcome.',
  'Buyers see a coherent business outcome, never a catalogue of internal capabilities.',
  'Client information, credentials, pricing and source code stay confidential.',
];

const Company: React.FC = () => {
  useMeta({
    title: 'Company',
    description:
      'Magpollo Corp is a product systems studio founded by four people who diagnose, design and ship focused software for owner-led firms.',
    path: '/company',
  });

  return (
    <Layout>
      <PageHeader
        kicker="Company"
        title={
          <>
            A studio, not an <span className="accented">agency</span>.
          </>
        }
        standfirst="Magpollo is a product systems studio. We started by building a prospecting system for our own use inside a Fortune 500 sales organisation, under rules that forbade automatic sending. It has run daily since. The company exists to build that kind of system for firms that cannot hire a product team to do it."
        actions={<CtaLink to="/contact">Get in touch</CtaLink>}
      />

      <Section
        id="what"
        kicker="What we are"
        heading={
          <>
            Diagnosis and build in <span className="accented">one</span> team.
          </>
        }
        intro="Most software for small firms is either a platform you adapt to, or a developer waiting for you to define the product. We are neither."
      >
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="kicker mb-3">We are</p>
            <ul className="rule-list">
              {[
                'A product systems studio',
                'Workflow diagnosis plus implementation',
                'Fixed-scope custom software',
                'Human-controlled automation, where it is appropriate',
                'Reusable architecture, workflow-specific configuration',
              ].map((s) => (
                <li key={s}>
                  <span className="text-[15px]">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker mb-3">We are not</p>
            <ul className="rule-list">
              {NOT.map((s) => (
                <li key={s}>
                  <span className="text-[15px] text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="team"
        kicker="Founding team"
        heading={
          <>
            Four people, four <span className="accented">lanes</span>.
          </>
        }
        intro="Starting lanes, not boxes. Everyone works across sales, product, design, engineering and delivery when the work calls for it."
      >
        <dl className="def-list">
          {TEAM.map((m) => (
            <div key={m.name}>
              <dt className="!normal-case !tracking-normal !font-sans !text-[15px] !font-semibold !text-foreground">{m.name}</dt>
              <dd className="text-muted-foreground">{m.lane}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        id="rules"
        kicker="How we run"
        heading={
          <>
            Written down, so it <span className="accented">holds</span>.
          </>
        }
        intro="A few of the operating rules we hold ourselves to. They are the same discipline we build into client systems."
      >
        <ol className="rule-list">
          {HOW_WE_RUN.map((r, i) => (
            <li key={r}>
              <span>{r}</span>
              <span className="list-index">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="details"
        kicker="Details"
        heading={
          <>
            The <span className="accented">particulars</span>.
          </>
        }
      >
        <dl className="def-list">
          <div>
            <dt>Legal entity</dt>
            <dd>{CONTACT.legalName}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">
                {CONTACT.email}
              </a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={CONTACT.phoneHref} className="underline underline-offset-4">
                {CONTACT.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt>Careers</dt>
            <dd>
              <CtaLink to="/careers" className="!text-[13px]">
                Open lanes and internships
              </CtaLink>
            </dd>
          </div>
        </dl>
      </Section>

      <ClosingCta />
    </Layout>
  );
};

export default Company;
