import React from 'react';
import { CtaLink } from './editorial';

const Hero: React.FC = () => {
  return (
    <section className="gutter">
      <div className="editorial-grid pb-24 pt-16 md:pb-32 md:pt-24">
        {/* Headline */}
        <div className="flex flex-col">
          <p className="eyebrow rise mb-6">For owner-run businesses and practices</p>

          <h1 className="display rise rise-2">
            A system <span className="accented">should</span>
            <br />
            be handling that.
          </h1>
        </div>

        {/* Standfirst */}
        <div className="rise rise-3 flex flex-col lg:pt-24">
          <p className="subhead mb-8 max-w-[440px]">
            You already have software, and most of it works. What’s left is held together by
            people: the chasing, the copying, the remembering. We build that missing part and
            keep everything else.
          </p>

          <CtaLink to="/lets-build">Let's build</CtaLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
