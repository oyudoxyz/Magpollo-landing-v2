import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ContactReveal } from './ContactReveal';
import { CONTACT } from '@/data/site';

const COLUMNS = [
  {
    title: 'Systems',
    links: [
      { to: '/systems', label: 'Blueprint' },
      { to: '/systems#sprint', label: 'System Sprint' },
      { to: '/systems#care', label: 'Care Plan' },
      { to: '/how-we-work', label: 'How we work' },
      { to: '/work', label: 'Proof of work' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/company', label: 'About' },
      { to: '/careers', label: 'Careers' },
      { to: '/contact', label: 'Contact' },
      { to: '/lets-build', label: "Let's build" },
    ],
  },
];

/**
 * The company footer: wordmark and one line on the left, two link columns and
 * the contact set on the right, then the legal row. The copyright still hides
 * the contact icons behind it, as the original footer did.
 */
const Footer: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="site-footer gutter mt-16 md:mt-24">
      <div className="hairline" />
      <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-16">
        <div className="flex flex-col gap-5">
          <Logo width={110} height={27} />
          <p className="max-w-[300px] text-sm leading-relaxed text-muted-foreground">
            A product systems studio. We diagnose one important workflow, keep the tools that work, and build the
            missing system around how the work actually happens.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="kicker mb-4 text-foreground">{col.title}</p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="kicker mb-4 text-foreground">Contact</p>
          <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${CONTACT.email}`} className="transition-colors duration-200 hover:text-foreground">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="transition-colors duration-200 hover:text-foreground">
                {CONTACT.phone}
              </a>
            </li>
            <li className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {CONTACT.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="meta-link">
                  {s.label}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      {/* items-start: the contact strip hangs off the trigger's right edge, so the trigger must stay intrinsic width */}
      <div className="flex flex-col items-start gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <ContactReveal showPlus ariaLabel={`© 2026 ${CONTACT.legalName} — show contact details`} onOpenChange={setOpen}>
          © 2026 {CONTACT.legalName}
        </ContactReveal>

        <div className={`flex items-center gap-5 transition-opacity duration-300 ${open ? 'opacity-30' : 'opacity-100'}`}>
          <Link to="/privacy" className="transition-colors duration-200 hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="transition-colors duration-200 hover:text-foreground">
            Terms
          </Link>
          <span className="hidden whitespace-nowrap lg:inline">Product Systems for Practice &amp; Business</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
