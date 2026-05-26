import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/mediaUrl';

/**
 * Slide-out menu used on Home and About.
 * @param {( ) => void} [onHome] — Home-only: scroll to top. Omit on other routes (navigates to `/`).
 */
export function NavDrawer({ open, onClose, onHome }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onClose();
    if (typeof onHome === 'function') {
      onHome();
    } else {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0 }), 60);
    }
  };

  return (
    <>
      <div className={`about-backdrop${open ? ' open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`about-sidebar${open ? ' open' : ''}`} role="navigation" aria-label="Site menu">
        <div className="about-sidebar-head">
          <span className="about-sidebar-label">Menu</span>
          <button type="button" className="about-close" onClick={onClose} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className="drawer-nav">
          <a className="drawer-link" href="/" onClick={handleHomeClick}>Home</a>
          <Link className="drawer-link" to="/about" onClick={onClose}>About Us</Link>
        </nav>
        <div className="drawer-foot">
          <a className="drawer-phone" href={`tel:${PHONE_TEL}`}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h3l1.5 4-2 1.2a9 9 0 004.3 4.3L11 10.5 15 12v3a1 1 0 01-1 1A12 12 0 012 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            {PHONE_DISPLAY}
          </a>
        </div>
      </aside>
    </>
  );
}
