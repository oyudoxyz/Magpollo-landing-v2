import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import RetroPrinter from '@/components/illustrations/RetroPrinter';
import { PageHeader, CtaLink, Reveal } from '@/components/editorial';
import { SimpleForm } from '@/components/SimpleForm';
import { useMeta } from '@/hooks/use-meta';
import { PROOF } from '@/data/site';

const Work: React.FC = () => {
  useMeta({
    title: 'Proof of work',
    description: 'Magpollo case studies are shown to prospective clients on request: a prospecting engine in daily production inside a Fortune 500 environment, and a custom commerce system.',
    path: '/work',
  });
  const location = useLocation();
  const preselected = (location.state as { system?: string } | null)?.system;
  const initialSystem = PROOF.find((p) => p.id === preselected)?.title ?? '';

  return (
    <Layout>
      <PageHeader
        kicker="Proof of work"
        title="Shown, not published."
        standfirst="Our case studies describe real workflows in detail. We walk prospective clients through them on a call rather than hosting them here."
        aside={
          <div className="flex justify-center lg:justify-end">
            <RetroPrinter />
          </div>
        }
      />

      <section className="gutter pb-16 md:pb-24">
        <Reveal>
          <div className="plate grid md:grid-cols-2">
            <ul className="border-b border-border md:border-b-0 md:border-r">
              {PROOF.map((p, i) => (
                <li key={p.id} className={`grid gap-3 p-7 sm:grid-cols-[40px_1fr] md:p-10 ${i < PROOF.length - 1 ? 'border-b border-border' : ''}`}>
                  <span className="list-index pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">{p.title}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-7 md:p-10">
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
