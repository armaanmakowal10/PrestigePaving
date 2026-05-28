import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrandLogo } from '../lib/brand';
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/mediaUrl';

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 3h3l1.5 4-2 1.2a9 9 0 004.3 4.3L11 10.5 15 12v3a1 1 0 01-1 1A12 12 0 012 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

export function SiteNav({ scrolled = false }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';

  const handleHomeClick = (e) => {
    if (!isHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link className="brand" to="/" onClick={handleHomeClick} title="Go to home">
          <BrandLogo />
        </Link>

        <div className="nav-links" aria-label="Main navigation">
          <Link className={`nav-link${isHome ? ' active' : ''}`} to="/" onClick={handleHomeClick}>
            Home
          </Link>
          <Link className={`nav-link${isAbout ? ' active' : ''}`} to="/about">
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
      </div>
    </nav>
  );
}
