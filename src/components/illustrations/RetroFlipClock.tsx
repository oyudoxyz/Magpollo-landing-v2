import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = ['Diagnose', 'Specify', 'Build', 'Integrate', 'Launch'];

/**
 * A desk flip-clock counting the five weeks to launch. Same material as the
 * retro computer. Runs through the weeks once when it comes into view, then
 * rests on week five.
 */
const RetroFlipClock: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const [week, setWeek] = useState(1);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (!inView || week >= STEPS.length) return;
    if (reduceMotion) {
      setWeek(STEPS.length);
      return;
    }
    // Hold each week for a beat, flip in 250ms, land on the next.
    const hold = setTimeout(() => {
      setFlipping(true);
      const land = setTimeout(() => {
        setWeek((w) => w + 1);
        setFlipping(false);
      }, 250);
      return () => clearTimeout(land);
    }, 900);
    return () => clearTimeout(hold);
  }, [inView, week, reduceMotion]);

  return (
    <motion.div
      ref={ref}
      className="illo retro-clock"
      aria-hidden="true"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="fc-body">
        <div className="fc-face">
          <div className="fc-cards">
            <div className="fc-card is-label">
              <span className="fc-digit">WK</span>
            </div>
            <div className="fc-card">
              <span className={`fc-digit ${flipping ? 'is-flipping' : ''}`}>{String(week).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="fc-steps">
            {STEPS.map((step, i) => (
              <span key={step} className={`fc-step ${i + 1 === week ? 'is-current' : ''}`}>
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="fc-feet">
        <div className="fc-foot" />
        <div className="fc-foot" />
      </div>
    </motion.div>
  );
};

export default RetroFlipClock;
