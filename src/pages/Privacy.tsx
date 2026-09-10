import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Prose } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { CONTACT } from '@/data/site';

const UPDATED = '2026-09-10';

const Privacy: React.FC = () => {
  useMeta({
    title: 'Privacy',
    description: 'How Magpollo Corp collects, uses and protects the information you share through magpollo.com.',
    path: '/privacy',
  });

  return (
    <Layout>
      <PageHeader
        kicker={`Privacy · updated ${UPDATED}`}
        title={
          <>
            What we keep, and <span className="accented">why</span>.
          </>
        }
        standfirst="This site collects very little. What it does collect, it collects so that we can reply to you. This page says what that is, in plain terms."
      />

      <section className="gutter pb-16 md:pb-24">
        <div className="hairline mb-12" />
        <Prose>
          <h2>Who we are</h2>
          <p>
            {CONTACT.legalName} ("Magpollo", "we") operates magpollo.com. You can reach us at{' '}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or {CONTACT.phone}.
          </p>

          <h2>What we collect</h2>
          <p>
            <strong>Forms.</strong> When you use the intake, request a case-study walkthrough, or write to us about
            careers, we receive what you type: typically your name, email address, firm, role, the answers you choose,
            any notes you add, and any files you attach. Submissions are delivered to our team inbox by email and are
            not stored in a separate database by this site.
          </p>
          <p>
            <strong>Analytics.</strong> We use Vercel Analytics to understand which pages are visited. It is
            cookie-free and does not identify you personally. It records page views, referrer, approximate location by
            country, device type and browser.
          </p>
          <p>
            <strong>Fonts.</strong> Typefaces are served by Google Fonts. Your browser requests them directly from
            Google, which sees your IP address in that request, as it would for any web font.
          </p>
          <p>We do not use advertising trackers, session recording, or marketing cookies.</p>

          <h2>How we use it</h2>
          <ul>
            <li>To reply to your enquiry and, if you ask, to prepare a recommendation or proposal.</li>
            <li>To keep a record of our correspondence with you for as long as we are in contact or working together.</li>
            <li>To understand which parts of the site are read, in aggregate.</li>
          </ul>
          <p>
            We do not sell or rent your information. We do not add you to a mailing list because you filled in a form.
          </p>

          <h2>Who else sees it</h2>
          <p>
            Form submissions pass through our email provider (Brevo) and our hosting provider (Vercel) on the way to
            us. Both act on our instructions and under their own privacy terms. Beyond that, nobody outside Magpollo
            sees what you send unless you ask us to share it, or the law requires it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries we do not take further are deleted from our inbox within twelve months. Correspondence with
            clients is kept for the life of the engagement and for the period afterwards that our contract or
            accounting obligations require.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what we hold about you, ask us to correct it, or ask us to delete it, by writing to{' '}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. We will answer within thirty days. If you are in
            a jurisdiction that gives you further rights over your data, those rights apply and we will honour them.
          </p>

          <h2>Security</h2>
          <p>
            The site is served over HTTPS. Form attachments are limited in size and number and are handled in memory
            on the way to email rather than written to disk. No system is perfectly secure; if we learn of a breach
            that affects you, we will tell you.
          </p>

          <h2>Changes</h2>
          <p>
            If this page changes in a way that matters, the date at the top will change with it. Continued use of the
            site after a change means you accept the new version.
          </p>
        </Prose>
      </section>
    </Layout>
  );
};

export default Privacy;
