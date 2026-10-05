import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * The site's building blocks. Pages are assembled from these rather than from
 * one-off markup: PageHeader opens an inner page, Section lays out heading-left
 * / content-right, NumberedRows and NumberedList are the two list styles,
 * CtaLink and CtaButton are the one button style. Type and colour come from the
 * classes and tokens in index.css. Cormorant is the hero's alone; everything
 * here sets headings in Jakarta.
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
    transition={{ duration: 0.6, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

/** The small plus glyph that marks a section heading in the approved design. */
export const PlusMarker: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 12 12"
    aria-hidden="true"
    className={`mb-3 h-3 w-3 stroke-border stroke-1 ${className}`}
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
  /** Optional actions under the intro, e.g. a CtaLink. */
  actions?: ReactNode;
  children: ReactNode;
  /** Draw a hairline above the section. Defaults to true. */
  rule?: boolean;
  /** Centre the two columns on each other, for a short left column beside an illustration. */
  centered?: boolean;
  className?: string;
}

/** A section laid out as heading-left / content-right on large screens. */
export const Section: React.FC<SectionProps> = ({
  id,
  heading,
  kicker,
  intro,
  actions,
  children,
  rule = true,
  centered = false,
  className = '',
}) => (
  <section id={id} className={`gutter scroll-mt-24 ${className}`}>
    {rule && <div className="hairline" />}
    <div className={`editorial-grid py-16 md:py-24 ${centered ? 'items-center' : ''}`}>
      <Reveal>
        <div className={centered ? '' : 'lg:sticky lg:top-28'}>
          {kicker && <p className="kicker mb-5">{kicker}</p>}
          <h2 className="headline">
            <PlusMarker />
            {heading}
          </h2>
          {intro && <p className="mt-5 max-w-[380px] text-base leading-relaxed text-muted-foreground">{intro}</p>}
          {actions && <div className="mt-8">{actions}</div>}
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

export interface NumberedRow {
  title: ReactNode;
  body: ReactNode;
  /** Optional mono line under the body, e.g. who the client is. */
  meta?: ReactNode;
}

interface NumberedRowsProps {
  items: NumberedRow[];
  /** Heading level for the row titles: h3 under a section heading, h2 directly under a page title. */
  titleAs?: 'h2' | 'h3';
  className?: string;
}

/**
 * Index on the left, then a title and one supporting line. Used for the offers,
 * the careers lanes and the case studies. Inside a .plate the rows become padded
 * cells with faint dividers; on paper they are ruled rows.
 */
export const NumberedRows: React.FC<NumberedRowsProps> = ({ items, titleAs: Title = 'h3', className = '' }) => (
  <ol className={`numbered-rows ${className}`}>
    {items.map((item, i) => (
      <li key={i}>
        <span className="list-index pt-1.5">{String(i + 1).padStart(2, '0')}</span>
        <div>
          <Title className="item-title">{item.title}</Title>
          <p className="copy mt-2 max-w-[460px]">{item.body}</p>
          {item.meta && <p className="kicker mt-4">{item.meta}</p>}
        </div>
      </li>
    ))}
  </ol>
);

interface PageHeaderProps {
  kicker: ReactNode;
  title: ReactNode;
  standfirst?: ReactNode;
  /** Actions rendered under the standfirst, e.g. a CtaLink. */
  actions?: ReactNode;
  /** Something to sit in the right column instead of a standfirst, e.g. an illustration. */
  aside?: ReactNode;
}

/**
 * Inner pages open with a kicker and a Jakarta title on the left, a standfirst
 * (or an aside) on the right. Enter animation matches the hero.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ kicker, title, standfirst, actions, aside }) => (
  <section className="gutter">
    <div className="editorial-grid pb-12 pt-10 md:pb-16 md:pt-16">
      <div className="flex flex-col">
        <p className="eyebrow rise mb-6">{kicker}</p>
        <h1 className="headline rise rise-2">
          {title}
        </h1>
        {standfirst && aside && <p className="subhead mt-6 max-w-[440px]">{standfirst}</p>}
        {actions && aside && <div className="mt-8">{actions}</div>}
      </div>
      {aside ? (
        <div className="rise rise-3">
          {aside}
        </div>
      ) : (
        (standfirst || actions) && (
          <div className="rise rise-3 flex flex-col lg:pt-12">
            {standfirst && <p className="subhead mb-8 max-w-[440px]">{standfirst}</p>}
            {actions}
          </div>
        )
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

/** The site's button, as a link. Underlined uppercase type; never a filled box. */
export const CtaLink: React.FC<CtaLinkProps> = ({ to, children, muted = false, state, className = '' }) => (
  <Link to={to} state={state} className={`cta ${muted ? 'cta-muted' : ''} ${className}`}>
    {children}
  </Link>
);

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Secondary actions: Back, Cancel. Grey label and underline. */
  muted?: boolean;
  /** A primary action that is not ready yet. Grey label, red underline kept. */
  waiting?: boolean;
}

/** The same button, as a <button>: form steps and submits. */
export const CtaButton: React.FC<CtaButtonProps> = ({ muted = false, waiting = false, type = 'button', className = '', ...rest }) => (
  <button type={type} className={`cta press ${muted ? 'cta-muted' : ''} ${waiting ? 'cta-waiting' : ''} ${className}`} {...rest} />
);

interface ProseProps {
  children: ReactNode;
  className?: string;
}

/** Long-form copy at a 66ch measure: privacy, terms. */
export const Prose: React.FC<ProseProps> = ({ children, className = '' }) => (
  <div className={`prose ${className}`}>
    {children}
  </div>
);
