import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink, NumberedRows } from '@/components/editorial';
import { SimpleForm } from '@/components/SimpleForm';
import { useMeta } from '@/hooks/use-meta';
import { PAGES } from '@/seo';

const LANES = [
  { title: 'Engineering', body: 'TypeScript, React, Node, PostgreSQL, and the unglamorous parts that make a system run unattended.' },
  { title: 'Product', body: 'Discovery, the written recommendation, holding scope, one client decision a week.' },
  { title: 'Design', body: 'Interfaces that read like print, and the discipline to leave things out.' },
  { title: 'Marketing', body: 'Turning client work into writing that owner-led firms recognise themselves in.' },
];

const Careers: React.FC = () => {
  useMeta(PAGES.careers);

  return (
    <Layout>
      <PageHeader
        kicker="Careers"
        title="We hire by lane."
        standfirst="Four founders, project-based work, everything written down before it starts."
      />

      <Section heading="Where we need people.">
        <NumberedRows items={LANES} />
      </Section>

      <Section
        heading="Tell us where you fit."
        intro="No portal: this reaches the founders directly. Internships are being formalised and will be paid, attached to live client work. Choose Internship and we will write to you first."
      >
        <SimpleForm
          purpose="Careers"
          submitLabel="Send it"
          fields={[
            { key: 'name', label: 'Name', placeholder: 'Your name', required: true, autoComplete: 'name' },
            { key: 'email', label: 'Email', kind: 'email', placeholder: 'you@example.com', required: true, autoComplete: 'email' },
            { key: 'lane', label: 'Lane', kind: 'select', options: [...LANES.map((l) => l.title), 'Internship'] },
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
      </Section>
    </Layout>
  );
};

export default Careers;
