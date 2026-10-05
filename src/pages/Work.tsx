import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import RetroPrinter from '@/components/illustrations/RetroPrinter';
import { PageHeader, CtaLink, Reveal, NumberedRows } from '@/components/editorial';
import { SimpleForm } from '@/components/SimpleForm';
import { useMeta } from '@/hooks/use-meta';
import { PAGES } from '@/seo';
import { PROOF } from '@/data/site';

const Work: React.FC = () => {
  useMeta(PAGES.work);
  const location = useLocation();
  const preselected = (location.state as { system?: string } | null)?.system;
  const initialSystem = PROOF.find((p) => p.id === preselected)?.title ?? '';

  return (
    <Layout>
      <PageHeader
        kicker="Proof of work"
        title="Shown, not published."
        standfirst="Our case studies describe real workflows in detail: what people did by hand, what the system took on, what changed. We walk prospective clients through them on a call rather than hosting them here."
        aside={
          <div className="flex justify-center lg:justify-end">
            <RetroPrinter />
          </div>
        }
      />

      <section className="gutter pb-16 md:pb-24">
        <Reveal>
          <div className="plate grid md:grid-cols-2">
            <NumberedRows
              titleAs="h2"
              className="plate-rule border-b md:border-b-0 md:border-r"
              items={PROOF.map((p) => ({ title: p.title, body: p.summary, meta: `${p.client} · name withheld` }))}
            />
            <div className="plate-cell">
              <p className="kicker mb-8">Request a walkthrough</p>
              <SimpleForm
                purpose="Case study walkthrough"
                submitLabel="Request it"
                initial={{ system: initialSystem }}
                fields={[
                  { key: 'name', label: 'Name', placeholder: 'Your name', required: true, autoComplete: 'name' },
                  { key: 'email', label: 'Email', kind: 'email', placeholder: 'you@yourbusiness.com', required: true, autoComplete: 'email' },
                  { key: 'company', label: 'Firm', placeholder: 'Company or practice name', autoComplete: 'organization' },
                  { key: 'system', label: 'Which one', kind: 'select', options: [...PROOF.map((p) => p.title), 'Both'] },
                ]}
                sent={
                  <div>
                    <p className="eyebrow mb-4">Received</p>
                    <p className="subhead mb-8 max-w-[440px]">Thank you. We will reply within one business day with a few times that work.</p>
                    <CtaLink to="/">Back to the site</CtaLink>
                  </div>
                }
              />
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
};

export default Work;
