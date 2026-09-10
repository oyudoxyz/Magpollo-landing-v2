import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { CONTACT } from '@/data/site';

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
        standfirst="Magpollo is a product systems studio. We diagnose one workflow, keep the tools that already work, and build the missing system around it, for firms that cannot hire a product team to do it. What we build is meant to be run every day, not demoed."
        actions={<CtaLink to="/lets-build">Let's build</CtaLink>}
      />

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
