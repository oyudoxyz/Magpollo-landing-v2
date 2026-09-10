import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

// Record IDs only. No client names, invented or otherwise, on an illustration.
const LOG = [
  { time: '09:14', item: 'Draft #0412 · outreach', status: 'Approved · owner', tone: 'approved' },
  { time: '09:16', item: 'Draft #0413 · outreach', status: 'Held for review', tone: 'held' },
  { time: '09:21', item: 'Follow-up #0398 · day 3', status: 'Sent', tone: 'approved' },
  { time: '09:40', item: 'Reply #0391 · classified', status: 'Routed', tone: '' },
  { time: '10:02', item: 'Draft #0414 · outreach', status: 'Approved · owner', tone: 'approved' },
] as const;

/**
 * A dot-matrix printer printing the approval log. Companion to the retro
 * computer: same material, same scale. Illustrates "human approval, enforced
 * in code" — every line names who approved what.
 */
const RetroPrinter: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={`illo retro-printer ${inView ? 'is-in-view' : ''}`}
      aria-hidden="true"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="rp-paper">
        <div className="rp-paper-title">Approval log · today</div>
        {LOG.map((line) => (
          <div key={line.time} className="rp-line">
            <time>{line.time}</time>
            <span>{line.item}</span>
            <span className={`rp-status ${line.tone === 'approved' ? 'is-approved' : line.tone === 'held' ? 'is-held' : ''}`}>
              {line.status}
            </span>
          </div>
        ))}
      </div>

      <div className="rp-body">
        <div className="rp-slot" />
        <div className="rp-panel">
          <span className="rp-panel-label">Magpollo PS · approvals</span>
          <div className="rp-buttons">
            <div className="rp-button" />
            <div className="rp-button" />
            <span className="rp-led" style={{ marginLeft: 6, alignSelf: 'center' }} />
          </div>
        </div>
      </div>
      <div className="rp-chin" />
    </motion.div>
  );
};

export default RetroPrinter;
