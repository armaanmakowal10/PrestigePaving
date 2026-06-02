import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '../lib/brand';
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/mediaUrl';
import { NavDrawer } from './NavDrawer';

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 3h3l1.5 4-2 1.2a9 9 0 004.3 4.3L11 10.5 15 12v3a1 1 0 01-1 1A12 12 0 012 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

export function SiteNav({ scrolled = false, onClose }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleHomeClick = (e) => {
    if (onClose) onClose();
    if (!isHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link className="brand" to="/" onClick={handleHomeClick} title="Go to home">
            <BrandLogo />
          </Link>

          <div className="nav-links" aria-label="Main navigation">
            <Link className={`nav-link${isHome ? ' active' : ''}`} to="/" onClick={handleHomeClick}>
              Home
            </Link>
            <Link className={`nav-link${isAbout ? ' active' : ''}`} to="/about" onClick={handleAboutClick}>
              About Us
            </Link>
          </div>

          <div className="nav-right">
            <a
              className="nav-phone nav-phone--bar nav-phone--cta"
              href={`tel:${PHONE_TEL}`}
              aria-label={`Call us now at ${PHONE_DISPLAY}`}
            >
              <PhoneIcon />
              <span className="nav-phone-num">{PHONE_DISPLAY}</span>
            </a>
          </div>

          <button
            type="button"
            className="nav-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onHome={isHome ? () => window.scrollTo({ top: 0, behavior: 'smooth' }) : undefined}
      />
    </>
  );
}
