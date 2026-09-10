import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink, Reveal } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { TEAM, CONTACT } from '@/data/site';

const Company: React.FC = () => {
  useMeta({
    title: 'Company',
    description: 'Magpollo Corp is a product systems studio founded by four people who diagnose, design and ship focused software for owner-led firms.',
    path: '/company',
  });

  return (
    <Layout>
      <PageHeader
        kicker="Company"
        title="A studio, not an agency."
        standfirst="We built a system for use inside a Fortune 500 sales organisation. Reps spent less time sourcing, drafting and chasing, and more time selling and talking to customers. It has run daily since. Magpollo exists to build that kind of system for firms that cannot hire a product team to do it."
        actions={<CtaLink to="/lets-build">Let's build</CtaLink>}
      />

      <section className="gutter pb-16 md:pb-24">
        <Reveal>
          <div className="plate">
            <div className="flex items-baseline justify-between gap-6 border-b border-border px-7 py-5 md:px-10">
              <p className="kicker text-foreground">Founding team</p>
              <p className="kicker">Starting lanes, not boxes</p>
            </div>
            <ul>
              {TEAM.map((m, i) => (
                <li key={m.name} className={`grid gap-1 px-7 py-5 sm:grid-cols-[1fr_1fr] sm:gap-8 md:px-10 ${i < TEAM.length - 1 ? 'border-b border-border' : ''}`}>
                  <span className="text-[15px] font-semibold">{m.name}</span>
                  <span className="text-[15px] text-muted-foreground">{m.lane}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <Section kicker="Details" heading="The particulars." intro="One business day to a first reply.">
        <dl className="def-list">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">{CONTACT.email}</a>
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>
              <a href={CONTACT.phoneHref} className="underline underline-offset-4">{CONTACT.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Elsewhere</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-2">
              {CONTACT.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="meta-link">{s.label}</a>
              ))}
            </dd>
          </div>
          <div>
            <dt>Legal entity</dt>
            <dd>{CONTACT.legalName}</dd>
          </div>
          <div>
            <dt>Careers</dt>
            <dd>
              <CtaLink to="/careers" className="!text-[12px]">We hire by lane</CtaLink>
            </dd>
          </div>
        </dl>
      </Section>
    </Layout>
  );
};

export default Company;
