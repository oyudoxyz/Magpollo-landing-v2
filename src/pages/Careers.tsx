import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink, DefList, Reveal } from '@/components/editorial';
import { SimpleForm } from '@/components/SimpleForm';
import { useMeta } from '@/hooks/use-meta';
import { PAGES } from '@/seo';

const LANES = [
  { term: 'Engineering', description: 'TypeScript, React, Node, PostgreSQL, and the unglamorous parts that make a system run unattended.' },
  { term: 'Product', description: 'Discovery, the written recommendation, holding scope, one client decision a week.' },
  { term: 'Design', description: 'Interfaces that read like print, and the discipline to leave things out.' },
  { term: 'Marketing', description: 'Turning client work into writing that owner-led firms recognise themselves in.' },
];

const Careers: React.FC = () => {
  useMeta(PAGES.careers);

  return (
    <Layout>
      <PageHeader
        kicker="Careers"
        title="We hire by lane."
        standfirst="Four founders, project-based work, everything written down before it starts. No portal: a form that reaches us directly. Internships are being formalised and will be paid, attached to live client work; choose that option below and we will write to you first."
      />

      <Section kicker="Lanes" heading="Where we need people.">
        <DefList items={LANES} />
      </Section>

      <section className="gutter pb-16 md:pb-24">
        <Reveal>
          <div className="plate p-7 md:p-10">
            <p className="kicker mb-8">Tell us where you fit</p>
            <SimpleForm
              purpose="Careers"
              submitLabel="Send it"
              fields={[
                { key: 'name', label: 'Name', placeholder: 'Your name', required: true, autoComplete: 'name' },
                { key: 'email', label: 'Email', kind: 'email', placeholder: 'you@example.com', required: true, autoComplete: 'email' },
                { key: 'lane', label: 'Lane', kind: 'select', options: [...LANES.map((l) => l.term), 'Internship'] },
                { key: 'link', label: 'A link', placeholder: 'Portfolio, GitHub, or something you built', autoComplete: 'url' },
              ]}
              sent={
                <div>
                  <p className="eyebrow mb-4">Received</p>
                  <p className="subhead mb-8 max-w-[440px]">Thank you. One of the founders will read it and reply, usually within a week.</p>
                  <CtaLink to="/">Back to the site</CtaLink>
                </div>
              }
            />
          </div>
        </Reveal>
      </section>
    </Layout>
  );
};

export default Careers;
