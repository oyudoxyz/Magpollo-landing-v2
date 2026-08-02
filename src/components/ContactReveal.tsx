import React, { useEffect, useRef, useState } from 'react';

/* ---- Icons ---------------------------------------------------------------- */

const size = { width: 15, height: 15 };

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...size}>
    <rect x="2" y="4" width="20" height="16" rx="1" />
    <path d="m2 6 10 7 10-7" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...size}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...size}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...size}>
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...size}>
    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.28a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.28.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.49a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .03.048c1.986 1.454 3.92 2.338 5.82 2.926a.078.078 0 0 0 .085-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106c-.632-.242-1.235-.52-1.807-.838a.077.077 0 0 1-.008-.128c.122-.09.244-.185.36-.28a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.095.24.19.36.28a.077.077 0 0 1-.006.127c-.574.32-1.175.599-1.81.839a.076.076 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .085.026c1.908-.59 3.842-1.474 5.83-2.926a.077.077 0 0 0 .03-.047c.5-5.177-.838-9.6-3.549-13.442a.061.061 0 0 0-.031-.027zM8.02 15.278c-1.182 0-2.157-1.086-2.157-2.419 0-1.332.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.332.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...size}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const links = [
  { label: 'salesteam@magpollo.com', href: 'mailto:salesteam@magpollo.com', Icon: MailIcon },
  { label: '+1 (470) 952-5987', href: 'tel:+14709525987', Icon: PhoneIcon },
  { label: 'X', href: 'https://x.com/MagpolloTech', Icon: TwitterIcon },
  { label: 'LinkedIn', href: 'http://linkedin.com/company/magpollo', Icon: LinkedinIcon },
  { label: 'Discord', href: 'https://discord.gg/4Qv8khbBf8', Icon: DiscordIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/magpollotech', Icon: InstagramIcon },
];

const CLOSE_DELAY_MS = 500;

interface ContactRevealProps {
  children: React.ReactNode;
  ariaLabel: string;
  /** Breathing + that rotates to × when open. Footer only. */
  showPlus?: boolean;
  /** Footer uses a button; the navbar keeps the logo as a home link. */
  asButton?: boolean;
  triggerClassName?: string;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Contact details hide behind a trigger until hover, focus or tap. Icons unfurl
 * to the right without shifting the trigger.
 */
export const ContactReveal: React.FC<ContactRevealProps> = ({
  children,
  ariaLabel,
  showPlus = false,
  asButton = true,
  triggerClassName = '',
  onOpenChange,
}) => {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const open = hovered || pinned;

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setHovered(false), CLOSE_DELAY_MS);
  };

  const show = () => {
    cancelClose();
    setHovered(true);
  };

  const hide = () => {
    if (!pinned) scheduleClose();
  };

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => () => cancelClose(), []);

  useEffect(() => {
    if (!pinned) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setPinned(false);
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [pinned]);

  const hoverHandlers = {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (pinned) return;
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      hide();
    },
  };

  const triggerClasses = `inline-flex items-center gap-2 whitespace-nowrap transition-colors duration-300 ${
    open ? 'reveal-open text-foreground' : ''
  } ${triggerClassName}`;

  return (
    <div className="relative" {...hoverHandlers}>
      {asButton ? (
        <button
          type="button"
          aria-expanded={open}
          aria-label={ariaLabel}
          onClick={() => setPinned((p) => !p)}
          className={triggerClasses}
        >
          {children}
          {showPlus && <span className="reveal-plus" aria-hidden="true" />}
        </button>
      ) : (
        <div aria-expanded={open} className={triggerClasses}>
          {children}
        </div>
      )}

      <div
        {...hoverHandlers}
        className={`absolute left-full top-1/2 ml-5 flex -translate-y-1/2 items-center gap-3.5 ${
          open ? '' : 'pointer-events-none'
        }`}
      >
        {links.map(({ label, href, Icon }, i) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={label}
            title={label}
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: `${open ? i * 45 : 0}ms` }}
            className={`text-muted-foreground transition-all duration-300 ease-out hover:text-foreground ${
              open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
            }`}
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
};
