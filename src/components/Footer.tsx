import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactReveal } from './ContactReveal';
import { CONTACT } from '@/data/site';

const LINKS = [
  { to: '/lets-build', label: "Let's build" },
  { to: '/work', label: 'Proof of work' },
  { to: '/careers', label: 'Careers' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
];

/**
 * Two rows: the links and the direct contact, then the copyright with the
 * contact icons hidden behind it, as the original footer did.
 */
const Footer: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="site-footer gutter mt-16 md:mt-24">
      <div className="flex flex-col gap-6 border-t border-border py-8 sm:flex-row sm:items-baseline sm:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="meta-link">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href={`mailto:${CONTACT.email}`} className="transition-colors duration-200 hover:text-foreground">
            {CONTACT.email}
          </a>
          <a href={CONTACT.phoneHref} className="transition-colors duration-200 hover:text-foreground">
            {CONTACT.phone}
          </a>
        </div>
      </div>

      {/* items-start: the contact strip hangs off the trigger's right edge, so the trigger must stay intrinsic width */}
      <div className="flex flex-col items-start gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <ContactReveal showPlus ariaLabel={`© 2026 ${CONTACT.legalName} — show contact details`} onOpenChange={setOpen}>
          © 2026 {CONTACT.legalName}
        </ContactReveal>
        <div className={`whitespace-nowrap transition-opacity duration-300 ${open ? 'opacity-30' : 'opacity-100'}`}>
          Product Systems for Practice &amp; Business
        </div>
      </div>
    </footer>
  );
};

export default Footer;
