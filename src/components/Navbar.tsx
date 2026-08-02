import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { ContactReveal } from './ContactReveal';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="gutter flex h-20 items-center justify-between md:h-24">
        <ContactReveal
          asButton={false}
          ariaLabel="Magpollo — show contact details"
          onOpenChange={setOpen}
        >
          <Link to="/" aria-label="Magpollo home" className="flex items-center">
            <Logo width={124} height={30} />
          </Link>
        </ContactReveal>

        <Link
          to="/lets-build"
          className={`meta-link transition-opacity duration-300 hover:text-foreground ${
            open ? 'opacity-30' : 'opacity-100'
          }`}
        >
          Let's build
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
