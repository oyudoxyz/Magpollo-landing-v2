import React from 'react';
import Layout from '@/components/Layout';
import { PageHeader, Prose } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { PAGES } from '@/seo';
import { CONTACT } from '@/data/site';

const UPDATED = '2026-09-10';

const Terms: React.FC = () => {
  useMeta(PAGES.terms);

  return (
    <Layout>
      <PageHeader
        kicker={`Terms · updated ${UPDATED}`}
        title={
          <>
            The site, and the <span className="accented">work</span>.
          </>
        }
        standfirst="Two things are covered here: using this website, and how an engagement with Magpollo is agreed. The second is always governed by a signed proposal, which takes precedence over anything on this page."
      />

      <section className="gutter pb-16 md:pb-24">
        <div className="hairline mb-12" />
        <Prose>
          <h2>Using this site</h2>
          <p>
            magpollo.com is operated by {CONTACT.legalName}. The content is provided for information about our
            services. You may read it, link to it and quote from it with attribution. You may not copy it wholesale,
            present it as your own, or use it to train a system that competes with us.
          </p>
          <p>
            Nothing on the site is a binding offer. Prices, timelines and scope shown here describe how we usually
            work and may change without notice. A commitment exists only in a proposal we have both signed.
          </p>

          <h2>Forms and submissions</h2>
          <p>
            When you send us information through the site you confirm that you are entitled to share it and that it
            does not include anyone's confidential data without their permission. We treat what you send as described
            in our <a href="/privacy">privacy page</a>. Please do not send credentials or sensitive personal data
            through the forms; we will ask for those, if needed, through a secure channel once we are working together.
          </p>

          <h2>How engagements are contracted</h2>
          <ul>
            <li>
              <strong>Blueprint.</strong> Begins after signature and full payment. The fee is credited toward the
              proposed Sprint if you proceed within sixty days. The Blueprint may conclude that we should not build.
            </li>
            <li>
              <strong>Sprint.</strong> Fixed scope and fixed price, set out in the proposal with explicit exclusions
              and a definition of done. Paid fifty percent at kickoff, thirty percent after the approved workflow
              prototype, twenty percent before production launch. Changes to scope require written approval and a
              change order.
            </li>
            <li>
              <strong>Care Plan.</strong> Monthly, starting after the two-week stabilization period, and required
              for systems we host. Third-party usage and unusual infrastructure costs are billed separately and kept
              visible.
            </li>
          </ul>
          <p>
            Client delay may move a delivery date but does not create unlimited availability on our side; we will
            say so in writing when a schedule slips.
          </p>

          <h2>Ownership and confidentiality</h2>
          <p>
            Work delivered under a paid engagement is yours on final payment, as set out in the proposal. Reusable
            components and know-how we bring to the engagement remain ours, and we may reuse patterns across clients
            without disclosing your data, your identity or your business rules. We keep client information,
            credentials, pricing and source code confidential, and we ask the same of you regarding our proposals.
          </p>

          <h2>Case studies and references</h2>
          <p>
            We do not publish case studies without written permission. Founding-rate engagements include agreed
            case-study, testimonial and reference terms in the proposal. Anything shared as a walkthrough on request
            is shared in confidence.
          </p>

          <h2>Liability</h2>
          <p>
            The site is provided as is. We do our best to keep it accurate and available, but we do not guarantee
            either. To the extent permitted by law, our liability in connection with the site is limited to the
            amount you have paid us to use it, which is nothing. Liability under an engagement is set out in the
            signed proposal.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </Prose>
      </section>
    </Layout>
  );
};

export default Terms;
