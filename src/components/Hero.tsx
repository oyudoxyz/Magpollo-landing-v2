import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="gutter">
      <div className="editorial-grid pb-24 pt-16 md:pb-32 md:pt-24">
        {/* Headline */}
        <div className="flex flex-col">
          <p className="eyebrow rise mb-6">For owner-run businesses and practices</p>

          <h1 className="display rise" style={{ animationDelay: '80ms' }}>
            A system <span className="accented">should</span>
            <br />
            be handling that.
          </h1>
        </div>

        {/* Standfirst */}
        <div className="rise flex flex-col lg:pt-24" style={{ animationDelay: '200ms' }}>
          <p className="subhead mb-8 max-w-[440px]">
            You already have the software. Operating it eats your time: the outreach, the
            reminder, the document, the thing nobody owns. We build the missing part, around how
            you actually work.
          </p>

          <Link to="/lets-build" className="cta">
            Let's build
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
