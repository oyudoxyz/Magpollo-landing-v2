import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink } from '@/components/editorial';
import { SimpleForm } from '@/components/SimpleForm';
import { useMeta } from '@/hooks/use-meta';
import { PROOF } from '@/data/site';

const SYSTEM_LABELS = PROOF.map((p) => p.title).concat('Both');

const Work: React.FC = () => {
  useMeta({
    title: 'Proof of work',
    description:
      'Magpollo case studies are shared with prospective clients on request: a prospecting engine in daily production inside a Fortune 500 environment, and a custom commerce system.',
    path: '/work',
  });
  const location = useLocation();
  const preselected = (location.state as { system?: string } | null)?.system;
  const initialSystem = PROOF.find((p) => p.id === preselected)?.title ?? '';

  return (
    <Layout>
      <PageHeader
        kicker="Proof of work"
        title={
          <>
            Shown, not <span className="accented">published</span>.
          </>
        }
        standfirst="Our case studies describe real client workflows in detail: the data, the rules, the failure points, the numbers. We walk prospective clients through them on a call rather than hosting them here. Tell us who you are and which one you would like to see."
      />

      <Section
        id="systems"
        kicker="Available on request"
        heading={
          <>
            Two systems, both in <span className="accented">use</span>.
          </>
        }
        intro="Each walkthrough is thirty minutes: the problem as the client described it, what was built, what changed, and what transferred to the next build."
      >
        <div className="rule-list">
          {PROOF.map((p, i) => (
            <div key={p.id} className="grid gap-4 border-b border-border py-7 first:border-t sm:grid-cols-[48px_1fr]">
              <span className="list-index pt-1.5">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-muted-foreground">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="kicker border border-border px-2 py-1 !text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="request"
        kicker="Request"
        heading={
          <>
            Ask for the <span className="accented">walkthrough</span>.
          </>
        }
        intro="We reply within one business day with two or three times that work. If it is easier, the intake gets you there too."
      >
        <SimpleForm
          purpose="Case study walkthrough"
          submitLabel="Request it"
          initial={{ system: initialSystem }}
          fields={[
            { key: 'name', label: 'Name', placeholder: 'Your name', required: true, autoComplete: 'name' },
            { key: 'email', label: 'Email', kind: 'email', placeholder: 'you@yourbusiness.com', required: true, autoComplete: 'email' },
            { key: 'company', label: 'Firm', placeholder: 'Company or practice name', autoComplete: 'organization' },
            { key: 'system', label: 'Which one', kind: 'select', options: SYSTEM_LABELS },
            { key: 'context', label: 'What are you trying to fix?', kind: 'textarea', placeholder: 'One or two lines is plenty.' },
          ]}
          sent={
            <div>
              <p className="eyebrow mb-4">Received</p>
              <p className="subhead mb-8 max-w-[440px]">
                Thank you. We will reply within one business day with a few times that work for the walkthrough.
              </p>
              <CtaLink to="/">Back to the site</CtaLink>
            </div>
          }
        />
      </Section>
    </Layout>
  );
};

export default Work;
