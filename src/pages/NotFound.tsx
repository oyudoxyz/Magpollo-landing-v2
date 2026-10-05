import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { CtaLink } from '@/components/editorial';
import { useMeta } from '@/hooks/use-meta';
import { PAGES } from '@/seo';

const NotFound: React.FC = () => {
  const location = useLocation();
  useMeta(PAGES.notFound);

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="gutter py-24 md:py-32">
        <div className="editorial-grid">
          <div>
            <p className="eyebrow mb-6">Error 404</p>
            <h1 className="display">
              That page is <span className="accented">not</span>
              <br />
              here.
            </h1>
          </div>

          <div className="lg:pt-24">
            <p className="subhead mb-8 max-w-[440px] text-muted-foreground">
              The link may be old, or we may have moved it during the rebuild. Everything
              worth reading is one click away.
            </p>
            <div className="flex flex-col items-start gap-5">
              <CtaLink to="/">Back to the site</CtaLink>
              <CtaLink to="/lets-build" muted>
                Tell us what it is
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
