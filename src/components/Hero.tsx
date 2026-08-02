import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero: React.FC = () => {
  return (
    <section className="gutter">
      <div className="editorial-grid pb-24 pt-16 md:pb-32 md:pt-24">
        {/* Headline */}
        <div className="flex flex-col">
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease }}
          >
            For owner-run businesses and practices
          </motion.p>

          <motion.h1
            className="display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
          >
            A system <span className="accented">should</span>
            <br />
            be handling that.
          </motion.h1>
        </div>

        {/* Standfirst */}
        <motion.div
          className="flex flex-col lg:pt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <p className="subhead mb-8 max-w-[440px]">
            You already have the software, but operating them
            eats your time: the outreach, the reminder, the documents, the thing you keep
            meaning to fix. We build that missing part, a system around how you actually work.
          </p>

          <Link to="/lets-build" className="cta">
            Let's build
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
