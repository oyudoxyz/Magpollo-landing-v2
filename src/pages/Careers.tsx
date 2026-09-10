import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink, DefList } from '@/components/editorial';
import { SimpleForm } from '@/components/SimpleForm';
import { useMeta } from '@/hooks/use-meta';

const LANES = [
  { term: 'Engineering', description: 'TypeScript, React, Node and PostgreSQL, with an appetite for integrations, scheduled jobs and the unglamorous parts that make a system run unattended.' },
  { term: 'Product and delivery', description: 'Running discovery, writing the recommendation, holding scope, and getting a client to one decision a week.' },
  { term: 'Design', description: 'Interfaces that read like print. Editorial layout, typography, and the discipline to leave things out.' },
  { term: 'Marketing and brand', description: 'Turning what we learn in client work into writing and assets that owner-led firms recognise themselves in.' },
];

const HOW_WE_WORK = [
  'Project-based. Pay follows the work that was assigned, completed and accepted, not the title.',
  'Written down. Every project has an allocation sheet, owners and acceptance criteria before it starts.',
  'Remote, asynchronous by default, with one weekly review per engagement.',
  'Small. Four founders today. You would be working with the people who make the decisions.',
];

const Careers: React.FC = () => {
  useMeta({
    title: 'Careers',
    description:
      'Magpollo hires by lane, not by title: engineering, product and delivery, design, marketing. Internships are being formalised; tell us where you fit.',
    path: '/careers',
  });

  return (
    <Layout>
      <PageHeader
        kicker="Careers"
        title={
          <>
            We hire by <span className="accented">lane</span>.
          </>
        }
        standfirst="Magpollo is small and intends to grow the way it builds: one clearly scoped piece of work at a time. There is no careers portal. There is a list of lanes we need help in, and a form that reaches the founders directly."
      />

      <Section
        id="lanes"
        kicker="Lanes"
        heading={
          <>
            Where we need <span className="accented">people</span>.
          </>
        }
        intro="Starting lanes, not boxes. Everyone here works across more than one when the project calls for it."
      >
        <DefList items={LANES} />
      </Section>

      <Section
        id="internships"
        kicker="Internships"
        heading={
          <>
            Structured, paid, <span className="accented">real</span> work.
          </>
        }
        intro="We are formalising an internship programme. Placements will be attached to live client work with a named owner and acceptance criteria, the same as everyone else."
      >
        <p className="max-w-[480px] text-[15px] leading-relaxed text-muted-foreground">
          Details on hosting, duration and timing will be published here once they are settled. If you want to be
          told when that happens, use the form below and choose the internship option; we will write to you first.
        </p>
      </Section>

      <Section
        id="how"
        kicker="How it works here"
        heading={
          <>
            The <span className="accented">terms</span>, plainly.
          </>
        }
      >
        <ol className="rule-list">
          {HOW_WE_WORK.map((r, i) => (
            <li key={r}>
              <span>{r}</span>
              <span className="list-index">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="apply"
        kicker="Tell us where you fit"
        heading={
          <>
            No portal. Just <span className="accented">this</span>.
          </>
        }
        intro="Name, a way to reach you, the lane, and a link to something you made. We reply to everyone."
      >
        <SimpleForm
          purpose="Careers"
          submitLabel="Send it"
          fields={[
            { key: 'name', label: 'Name', placeholder: 'Your name', required: true, autoComplete: 'name' },
            { key: 'email', label: 'Email', kind: 'email', placeholder: 'you@example.com', required: true, autoComplete: 'email' },
            { key: 'lane', label: 'Lane', kind: 'select', options: [...LANES.map((l) => l.term), 'Internship'] },
            { key: 'link', label: 'A link', placeholder: 'Portfolio, GitHub, LinkedIn, or something you built', autoComplete: 'url' },
            { key: 'note', label: 'Anything else', kind: 'textarea', placeholder: 'What you would want to work on, in your own words.' },
          ]}
          sent={
            <div>
              <p className="eyebrow mb-4">Received</p>
              <p className="subhead mb-8 max-w-[440px]">
                Thank you. One of the founders will read it and reply, usually within a week.
              </p>
              <CtaLink to="/company">About the company</CtaLink>
            </div>
          }
        />
      </Section>
    </Layout>
  );
};

export default Careers;
