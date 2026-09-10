import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Shared primitives for the editorial layout language: a two-column grid with a
 * headline on the left and content on the right, hairline rules between
 * sections, numbered lists, and the page header every inner page opens with.
 */

const ease = [0.22, 1, 0.36, 1] as const;

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
    transition={{ duration: 0.6, ease, delay }}
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
  /** Optional kicker above the heading. */
  kicker?: ReactNode;
  /** Optional short paragraph under the heading, in the left column. */
  intro?: ReactNode;
  children: ReactNode;
  /** Draw a hairline above the section. Defaults to true. */
  rule?: boolean;
  className?: string;
}

/** A section laid out as heading-left / content-right on large screens. */
export const Section: React.FC<SectionProps> = ({
  id,
  heading,
  kicker,
  intro,
  children,
  rule = true,
  className = '',
}) => (
  <section id={id} className={`gutter scroll-mt-24 ${className}`}>
    {rule && <div className="hairline" />}
    <div className="editorial-grid py-16 md:py-24">
      <Reveal>
        <div className="lg:sticky lg:top-28">
          {kicker && <p className="kicker mb-5">{kicker}</p>}
          <h2 className="section-head">
            <PlusMarker />
            {heading}
          </h2>
          {intro && <p className="mt-6 max-w-[380px] text-base leading-relaxed text-muted-foreground">{intro}</p>}
        </div>
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

interface PageHeaderProps {
  kicker: ReactNode;
  title: ReactNode;
  standfirst?: ReactNode;
  /** Actions rendered under the standfirst, e.g. a CtaLink. */
  actions?: ReactNode;
}

/**
 * Every inner page opens the way the homepage does: kicker, display headline
 * on the left, standfirst on the right. Enter animation matches the hero.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ kicker, title, standfirst, actions }) => (
  <section className="gutter">
    <div className="editorial-grid pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="flex flex-col">
        <motion.p className="eyebrow mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease }}>
          {kicker}
        </motion.p>
        <motion.h1
          className="display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
        >
          {title}
        </motion.h1>
      </div>
      {(standfirst || actions) && (
        <motion.div
          className="flex flex-col lg:pt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          {standfirst && <p className="subhead mb-8 max-w-[440px]">{standfirst}</p>}
          {actions}
        </motion.div>
      )}
    </div>
  </section>
);

interface CtaLinkProps {
  to: string;
  children: ReactNode;
  muted?: boolean;
  state?: unknown;
  className?: string;
}

/** The marketing CTA: underlined uppercase type. Never a filled box on the site. */
export const CtaLink: React.FC<CtaLinkProps> = ({ to, children, muted = false, state, className = '' }) => (
  <Link to={to} state={state} className={`cta ${muted ? 'cta-muted' : ''} ${className}`}>
    {children}
  </Link>
);

interface DefListProps {
  items: Array<{ term: ReactNode; description: ReactNode }>;
  className?: string;
}

/** Term on the left in mono, description on the right, hairlines between. */
export const DefList: React.FC<DefListProps> = ({ items, className = '' }) => (
  <dl className={`def-list ${className}`}>
    {items.map((item, i) => (
      <div key={i}>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </div>
    ))}
  </dl>
);

interface ProseProps {
  children: ReactNode;
  className?: string;
}

/** Long-form copy at a 66ch measure: privacy, terms, the company story. */
export const Prose: React.FC<ProseProps> = ({ children, className = '' }) => (
  <div className={`max-w-[66ch] text-[15px] leading-[1.6] text-foreground [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-sans [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2:first-child]:mt-0 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 [&_a]:underline [&_a]:underline-offset-4 ${className}`}>
    {children}
  </div>
);

interface ClosingCtaProps {
  heading?: ReactNode;
  body?: ReactNode;
  to?: string;
  label?: ReactNode;
}

/** The section every page ends on: one line, one link. */
export const ClosingCta: React.FC<ClosingCtaProps> = ({
  heading = (
    <>
      Tell us where it <span className="accented">breaks</span>.
    </>
  ),
  body = 'Two short steps. We read every one ourselves and reply within one business day, usually with a question or two about the part that sounds most expensive.',
  to = '/lets-build',
  label = "Let's build",
}) => (
  <Section heading={heading}>
    <p className="mb-8 max-w-[440px] text-base leading-relaxed text-muted-foreground">{body}</p>
    <CtaLink to={to}>{label}</CtaLink>
  </Section>
);
