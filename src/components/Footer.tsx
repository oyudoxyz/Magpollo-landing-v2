import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactReveal } from './ContactReveal';
import { CONTACT } from '@/data/site';
import { SITE } from '@/seo';

const COPYRIGHT = `© 2026 ${CONTACT.legalName}`;

const LINKS = [
  { to: '/lets-build', label: "Let's build" },
  { to: '/work', label: 'Proof of work' },
  { to: '/careers', label: 'Careers' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
];

/**
 * Two rows: the links, then the copyright with the contact icons hidden behind
 * it. The Contact link opens the same strip as the + beside the copyright.
 */
const Footer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  return (
    <footer className="site-footer gutter mt-16 md:mt-24">
      <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-baseline sm:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="meta-link">
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setPinned(!pinned)}
            aria-expanded={pinned}
            className="meta-link"
          >
            Contact
          </button>
        </nav>
      </div>

      {/* items-start: the contact strip hangs off the trigger's right edge, so the trigger must stay intrinsic width */}
      <div className="flex flex-col items-start gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <ContactReveal
          showPlus
          ariaLabel={`${COPYRIGHT}: show contact details`}
          onOpenChange={setOpen}
          pinned={pinned}
          onPinnedChange={setPinned}
        >
          {COPYRIGHT}
        </ContactReveal>
        <div className={`whitespace-nowrap transition-opacity duration-300 ${open ? 'opacity-30' : 'opacity-100'}`}>
          {SITE.tagline}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
