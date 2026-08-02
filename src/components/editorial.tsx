import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Shared primitives for the editorial layout language: a two-column grid with a
 * headline on the left and content on the right, hairline rules between
 * sections, and numbered lists.
 */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fades content up as it scrolls into view. Respects reduced-motion. */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
);

/** The small plus glyph that marks a section heading in the approved design. */
export const PlusMarker: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 12 12"
    aria-hidden="true"
    className={`mb-3 h-3 w-3 stroke-border ${className}`}
    style={{ strokeWidth: 1 }}
  >
    <line x1="6" y1="0" x2="6" y2="12" />
    <line x1="0" y1="6" x2="12" y2="6" />
  </svg>
);

interface SectionProps {
  id?: string;
  /** Left-hand column heading. */
  heading: ReactNode;
  children: ReactNode;
  /** Draw a hairline above the section. Defaults to true. */
  rule?: boolean;
  className?: string;
}

/** A section laid out as heading-left / content-right on large screens. */
export const Section: React.FC<SectionProps> = ({
  id,
  heading,
  children,
  rule = true,
  className = '',
}) => (
  <section id={id} className={`gutter scroll-mt-24 ${className}`}>
    {rule && <div className="hairline" />}
    <div className="editorial-grid py-16 md:py-24">
      <Reveal>
        <h2 className="section-head">
          <PlusMarker />
          {heading}
        </h2>
      </Reveal>
      <Reveal delay={0.08}>{children}</Reveal>
    </div>
  </section>
);

interface NumberedListProps {
  items: ReactNode[];
  className?: string;
}

/** Rule-separated list with a small right-aligned index, as drawn in the design. */
export const NumberedList: React.FC<NumberedListProps> = ({ items, className = '' }) => (
  <ul className={`rule-list ${className}`}>
    {items.map((item, i) => (
      <li key={i}>
        <span>{item}</span>
        <span className="list-index">{String(i + 1).padStart(2, '0')}</span>
      </li>
    ))}
  </ul>
);
