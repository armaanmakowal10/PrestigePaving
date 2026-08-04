// Service icons keyed by service id — shared by the survey's service step.
import React from 'react';

export const SERVICE_ICONS = {
  'seal-coating': (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="7" y="28" width="30" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M15 28V17c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M22 9v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M18 9h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M9 37h26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45"/>
    </svg>
  ),
  'line-stripping': (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="6" y="8" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 12v20M22 12v20M30 12v20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3.5 5"/>
    </svg>
  ),
  'crack-repair': (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="6" y="10" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M11 30l5-7 4 3 5-9 4 5 4-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 14l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="30" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  'hole-repair': (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="6" y="12" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <ellipse cx="22" cy="27" rx="9" ry="5.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 27c2.5-2 5.5-2 8 0s5.5 2 8 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M12 18h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  'asphalt-paving': (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <path d="M6 32h32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8 32V20l14-9 14 9v12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M8 26h28M8 20h28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
    </svg>
  ),
  other: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="8" y="8" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M16 22h12M22 16v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};
