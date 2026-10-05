import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '@/lib/motion';

const memoText =
  'Good morning. Your follow-ups are sent, invoices are filed, and your calendar is set. Ready when you are.';

const sidebarItems = [
  { status: 'is-live', label: 'System' },
  { status: 'is-recent', label: 'Clients' },
  { status: '', label: 'Invoices' },
  { status: '', label: 'Outreach' },
  { status: '', label: 'Reports' },
];

/** Keys per row, top to bottom; the last row is two keys either side of the space bar. */
const KEY_ROWS = [13, 12, 11];

const RetroComputer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!inView || typed.length >= memoText.length) return;
    const id = setTimeout(
      () => setTyped(memoText.slice(0, typed.length + 1)),
      30 + Math.random() * 40,
    );
    return () => clearTimeout(id);
  }, [inView, typed]);

  return (
    <motion.div
      ref={ref}
      className="illo retro-computer"
      aria-hidden="true"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: EASE }}
    >
      {/* --- Monitor body --- */}
      <div className="rc-body">
        <div className="rc-bezel">
          <div className="rc-screen">
            {/* Title bar */}
            <div className="rc-titlebar">
              <span className="rc-titlebar-dot" />
              <span className="rc-titlebar-text">Magpollo PS 1.0</span>
            </div>

            {/* Desktop */}
            <div className="rc-desktop">
              {/* Sidebar */}
              <div className="rc-sidebar">
                {sidebarItems.map(({ status, label }) => (
                  <div key={label} className="rc-sidebar-item">
                    <span className={`rc-dot ${status}`}>●</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="rc-main">
                <div className="rc-window">
                  <div className="rc-window-titlebar">
                    <span>workflow.txt</span>
                    <span className="rc-window-close">[x]</span>
                  </div>
                  <div className="rc-window-body">
                    {typed}
                    <span className="rc-cursor">▌</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="rc-statusbar">
              <span>5 tasks completed</span>
              <span>⣿ connected</span>
            </div>
          </div>
        </div>

        {/* Sticker area */}
        <div className="rc-badge-area">
          <div className="rc-badge">Product Systems</div>
          <div className="rc-logo-mark" />
        </div>
      </div>

      {/* Chin */}
      <div className="rc-chin">
        <div className="rc-slot" />
      </div>

      {/* Keyboard */}
      <div className="rc-keyboard">
        {KEY_ROWS.map((count) => (
          <div key={count} className="rc-key-row">
            {Array.from({ length: count }, (_, i) => (
              <div key={i} className="rc-key rc-key-sm" />
            ))}
          </div>
        ))}
        <div className="rc-key-row">
          <div className="rc-key rc-key-sm" />
          <div className="rc-key rc-key-sm" />
          <div className="rc-key rc-key-space" />
          <div className="rc-key rc-key-sm" />
          <div className="rc-key rc-key-sm" />
        </div>
      </div>
    </motion.div>
  );
};

export default RetroComputer;
