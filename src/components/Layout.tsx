import React, { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const rulerRef = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();

  // New page, top of page. Hash links scroll to their target after mount.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  useEffect(() => {
    let current = window.scrollY;
    let target = window.scrollY;
    let rafId: number;

    const onScroll = () => {
      target = window.scrollY;
    };

    const tick = () => {
      // Lerp — ruler follows scroll with a soft delay
      current += (target - current) * 0.07;
      if (rulerRef.current) {
        rulerRef.current.style.transform = `translateY(${-current}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="page-ruler" aria-hidden="true">
        <div className="guides-ruler" ref={rulerRef} />
      </div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        {/* Offset for the absolutely positioned header */}
        <main className="flex-grow pt-20 md:pt-24">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
