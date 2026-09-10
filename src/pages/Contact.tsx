import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Section, CtaLink } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { CONTACT } from '@/data/site';

const Contact: React.FC = () => {
  useMeta({
    title: 'Contact',
    description: 'Write to Magpollo, call, or start the intake. We reply within one business day.',
    path: '/contact',
  });

  return (
    <Layout>
      <PageHeader
        kicker="Contact"
        title={
          <>
            We read every one <span className="accented">ourselves</span>.
          </>
        }
        standfirst="If you have a workflow in mind, the intake is the fastest route: two short steps and you only describe the problem once. For anything else, email or call."
        actions={<CtaLink to="/lets-build">Start the intake</CtaLink>}
      />

      <Section
        kicker="Directly"
        heading={
          <>
            Email, phone, <span className="accented">elsewhere</span>.
          </>
        }
        intro="One business day to a first reply. Usually sooner."
      >
        <dl className="def-list">
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
            <dt>Elsewhere</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-2">
              {CONTACT.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="cta !text-[12px]">
                  {s.label}
                </a>
              ))}
            </dd>
          </div>
          <div>
            <dt>Case studies</dt>
            <dd>
              <CtaLink to="/work" className="!text-[13px]">
                Request a walkthrough
              </CtaLink>
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
    </Layout>
  );
};

export default Contact;
