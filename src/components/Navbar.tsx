import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { ContactReveal } from './ContactReveal';
import { CONTACT, NAV } from '@/data/site';

/**
 * Absolute header over the page: logo (with contact details behind it) on the
 * left, the section links and the intake CTA on the right. On small screens
 * the links move into a bottom sheet — the one surface in the site that
 * slides. 300ms in on the drawer curve, 200ms out; Escape and the scrim close it.
 */
const Navbar: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();

  // Route changes close the sheet; the new page should never open behind it.
  useEffect(() => {
    setSheetOpen(false);
  }, [location.pathname]);

  // Lock page scroll while the sheet is out, and close on Escape.
  useEffect(() => {
    if (!sheetOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheetOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [sheetOpen]);

  const dim = contactOpen ? 'opacity-30' : 'opacity-100';

  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="gutter flex h-20 items-center justify-between md:h-24">
        <ContactReveal asButton={false} ariaLabel="Magpollo — show contact details" onOpenChange={setContactOpen}>
          <Link to="/" aria-label="Magpollo home" className="flex items-center">
            <Logo width={124} height={30} />
          </Link>
        </ContactReveal>

        {/* Desktop */}
        <nav aria-label="Primary" className={`hidden items-center gap-8 transition-opacity duration-300 md:flex ${dim}`}>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className="meta-link">
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/lets-build" className="meta-link text-foreground">
            Let's build
          </NavLink>
        </nav>

        {/* Mobile */}
        <button
          type="button"
          className={`nav-toggle press relative z-[60] md:hidden ${dim}`}
          aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={sheetOpen}
          aria-controls="mobile-menu"
          onClick={() => setSheetOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`nav-scrim fixed inset-0 z-40 bg-foreground/55 md:hidden ${sheetOpen ? 'is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setSheetOpen(false)}
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`nav-sheet fixed inset-x-0 bottom-0 z-50 md:hidden ${sheetOpen ? 'is-open' : ''}`}
        aria-hidden={!sheetOpen}
      >
        <div className="nav-sheet-handle" aria-hidden="true" />
        <nav aria-label="Primary" className="gutter pb-8 pt-6">
          {[...NAV, { to: '/lets-build', label: "Let's build" }].map((item, i) => (
            <NavLink key={item.to} to={item.to} className="nav-sheet-link press-row" tabIndex={sheetOpen ? 0 : -1}>
              <span>{item.label}</span>
              <span className="kicker">{String(i + 1).padStart(2, '0')}</span>
            </NavLink>
          ))}
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <a href={`mailto:${CONTACT.email}`} className="w-fit" tabIndex={sheetOpen ? 0 : -1}>
              {CONTACT.email}
            </a>
            <a href={CONTACT.phoneHref} className="w-fit" tabIndex={sheetOpen ? 0 : -1}>
              {CONTACT.phone}
            </a>
            <div className="mt-2 flex gap-5">
              {CONTACT.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="meta-link" tabIndex={sheetOpen ? 0 : -1}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
