import React, { useState } from 'react';
import { ContactReveal } from './ContactReveal';

/**
 * The footer stays as drawn: site name on the left, tagline on the right.
 * Contact details live behind the name — hovering, focusing or tapping it
 * unfurls them over the line, and the tagline steps back while they are out.
 */
const Footer: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="gutter">
      <div className="flex items-center justify-between gap-6 border-t border-border py-6 text-xs text-muted-foreground">
        <ContactReveal
          showPlus
          ariaLabel="© 2026 Magpollo — show contact details"
          onOpenChange={setOpen}
        >
          © 2026 Magpollo
        </ContactReveal>

        <div
          className={`hidden whitespace-nowrap transition-opacity duration-300 sm:block ${
            open ? 'opacity-30' : 'opacity-100'
          }`}
        >
          Product Systems for Practice &amp; Business
        </div>
      </div>
    </footer>
  );
};

export default Footer;
