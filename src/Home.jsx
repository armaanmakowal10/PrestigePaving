// Main app — nav, hero, services, stats, process, CTA, footer, sticky call bar, Tweaks panel.

import React from 'react';
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRadio,
  TweakColor,
  TweakSelect,
} from './components/tweaks-panel';
import { SurveyOverlay } from './components/SurveyOverlay';
import { SiteNav } from './components/SiteNav';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, OUR_PROCESS_VIDEO_SRC, BEFORE_AFTER_PAIRS, mediaUrl } from './lib/mediaUrl';
import { BrandLogo } from './lib/brand';

const GOOGLE_REVIEWS_URL = '#';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#0080e0",
  "headline": "precision",
  "heroLayout": "centered",
  "fontPair": "instrument"
}/*EDITMODE-END*/;

const HEADLINES = {
  precision: { lead: "Sealed with", em: "precision.", trail: " Built to last.", sub: "GTA driveway sealing and paving for homeowners who want results that last. Book online for a free on-site quote." },
  power: { lead: "Paving,", em: "done properly.", trail: "", sub: "From fresh asphalt to protective sealing, our crew delivers clean, durable driveways across the Greater Toronto Area. Book in 60 seconds." },
  modern: { lead: "Protecting the GTA's", em: "driveways", trail: ".", sub: "Professional sealing, resurfacing, and repairs — premium materials and workmanship you can see from the curb." },
  trust: { lead: "The GTA's trusted", em: "paving", trail: " team.", sub: "Driveway sealing specialists. Fully insured. Free quotes on every job. Book online and we'll confirm your visit within one business day." },
};

// ─── Icons ───
const Icon = {
  bolt: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <path d="M24 6L10 26h10l-4 16 18-22H24l4-14z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  ),
  ev: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="6" y="12" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M10 18h6M10 24h10M10 30h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M28 16h6c1.1 0 2 .9 2 2v10a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V18z" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M32 13v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  panel: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="8" y="6" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="13" y="11" width="7" height="3" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="24" y="11" width="7" height="3" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="13" y="17" width="7" height="3" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="24" y="17" width="7" height="3" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="13" y="23" width="7" height="3" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="24" y="23" width="7" height="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M16 32h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  hottub: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <path d="M6 22h32v8a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4v-8z" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 22V12a4 4 0 0 1 8 0M22 22V14a4 4 0 0 1 8 0v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M6 26c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  reno: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <path d="M6 36V18l16-12 16 12v18" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M16 36V24h12v12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M24 28v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  light: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <path d="M22 6a10 10 0 0 0-6 18c1.4 1 2 2 2 4v2h8v-2c0-2 .6-3 2-4a10 10 0 0 0-6-18z" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M18 34h8M19 38h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  alert: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <path d="M22 6L4 36h36L22 6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M22 18v8M22 30v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16" {...p}>
      <path d="M8 1.5L2.5 3.5v4c0 3 2.5 5.5 5.5 7 3-1.5 5.5-4 5.5-7v-4L8 1.5z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5.5 8l2 2 3-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cert: (p) => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16" {...p}>
      <circle cx="8" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5.5 9.5L4.5 14l3.5-2 3.5 2-1-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  star: (p) => (
    <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16" {...p}>
      <path d="M8 1l2.1 4.6 5 .6-3.7 3.4 1 5L8 12l-4.4 2.6 1-5L1 6.2l5-.6L8 1z"/>
    </svg>
  ),
  clock: (p) => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16" {...p}>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 4v4l2.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  phone: (p) => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16" {...p}>
      <path d="M3 3.5c0-.8.7-1.5 1.5-1.5h2l1.2 3-1.6 1c1 2 2.4 3.4 4.4 4.4l1-1.6 3 1.2v2c0 .8-.7 1.5-1.5 1.5C7 14 2 9 2 4.5 2 4.2 2 3.8 3 3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  sealCoating: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="7" y="28" width="30" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M15 28V17c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v11" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M22 9v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M18 9h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M9 37h26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45"/>
    </svg>
  ),
  lineStripping: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="6" y="8" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 12v20M22 12v20M30 12v20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="3.5 5"/>
    </svg>
  ),
  crackRepair: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="6" y="10" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M11 30l5-7 4 3 5-9 4 5 4-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28 14l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="30" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  holeRepair: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="6" y="12" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <ellipse cx="22" cy="27" rx="9" ry="5.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M14 27c2.5-2 5.5-2 8 0s5.5 2 8 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M12 18h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  asphaltPaving: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <path d="M6 32h32" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8 32V20l14-9 14 9v12" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M8 26h28M8 20h28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55"/>
    </svg>
  ),
  otherService: (p) => (
    <svg viewBox="0 0 44 44" fill="none" {...p}>
      <rect x="8" y="8" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M16 22h12M22 16v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

const SERVICES_LIST = [
  { id: 'sealing', n: '01', icon: 'shield', title: 'Driveway sealing', desc: 'Protect asphalt from sun, salt, and water. Deep-penetrating sealers that restore colour and extend pavement life.' },
  { id: 'paving',  n: '02', icon: 'reno',   title: 'Asphalt paving & resurfacing', desc: 'New driveways, overlays, and full resurfacing. Proper base prep and compaction for a smooth, long-lasting finish.' },
  { id: 'cracks',  n: '03', icon: 'alert',  title: 'Crack filling & patch repair', desc: 'Stop cracks before they become potholes. Hot-rubberized or cold-pour repairs matched to your driveway.' },
  { id: 'commercial', n: '04', icon: 'panel', title: 'Commercial property', desc: 'Lots, laneways, and private roads — striping, sealing, and resurfacing with minimal downtime.' },
  { id: 'striping', n: '05', icon: 'panel', title: 'Line striping', desc: 'Crisp parking stall lines, arrows, and markings for lots, laneways, and private drives.' },
  { id: 'other',   n: '06', icon: 'light',  title: 'Custom paving projects', desc: 'Walkways, pads, and specialty surfaces. Tell us what you need — we\'ll quote it on-site.' },
];

// ─── Animated counter ───
function Counter({ end, suffix = '', duration = 1600, decimals = 0 }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(end * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setVal(end);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

// ─── Hero circuit SVG (animated) ───
function HeroCircuit() {
  return (
    <svg className="hero-circuit" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0"/>
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </linearGradient>
        <radialGradient id="node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="1"/>
          <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Subtle static traces */}
      <g stroke="var(--line-strong)" strokeWidth="1" fill="none" opacity="0.6">
        <path d="M0 200 L300 200 L340 240 L600 240 L640 200 L900 200 L940 240 L1400 240"/>
        <path d="M0 560 L260 560 L300 600 L520 600 L560 560 L900 560 L940 600 L1400 600"/>
        <path d="M200 800 L200 640 L160 600 L160 400"/>
        <path d="M1100 800 L1100 700 L1140 660 L1140 320 L1100 280 L1100 0"/>
        <path d="M780 0 L780 100 L820 140 L820 360"/>
      </g>

      {/* Animated traces — sliding pulse along the path */}
      <g fill="none" strokeWidth="1.5">
        <path d="M0 200 L300 200 L340 240 L600 240 L640 200 L900 200 L940 240 L1400 240"
              stroke="url(#trace)" strokeDasharray="200 1400" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="0" to="-1600" dur="6s" repeatCount="indefinite"/>
        </path>
        <path d="M0 560 L260 560 L300 600 L520 600 L560 560 L900 560 L940 600 L1400 600"
              stroke="url(#trace)" strokeDasharray="200 1400" strokeDashoffset="-400">
          <animate attributeName="stroke-dashoffset" from="-400" to="-2000" dur="7.5s" repeatCount="indefinite"/>
        </path>
        <path d="M1100 800 L1100 700 L1140 660 L1140 320 L1100 280 L1100 0"
              stroke="url(#trace)" strokeDasharray="160 900" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" from="0" to="-1060" dur="5s" repeatCount="indefinite"/>
        </path>
      </g>

      {/* Glowing nodes at junctions */}
      <g>
        {[
          [340, 240, 0], [640, 200, 1.5], [940, 240, 0.8],
          [300, 600, 2.2], [560, 560, 0.5], [940, 600, 1.7],
          [1140, 320, 1.1], [820, 140, 2.5], [160, 400, 0.3]
        ].map(([x, y, delay], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="22" fill="url(#node)" opacity="0.7">
              <animate attributeName="opacity" values="0.2;0.85;0.2" dur="3.2s" begin={`${delay}s`} repeatCount="indefinite"/>
              <animate attributeName="r" values="14;28;14" dur="3.2s" begin={`${delay}s`} repeatCount="indefinite"/>
            </circle>
            <circle cx={x} cy={y} r="2.5" fill="var(--accent-bright)" opacity="0.9"/>
          </g>
        ))}
      </g>
    </svg>
  );
}

// ─── Brand mark ───
function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <rect x="1" y="1" width="30" height="30" rx="7" stroke="var(--accent)" strokeWidth="1.5"/>
      <path d="M18 6L10 18h6l-2 8 8-12h-6l2-8z" fill="var(--accent)"/>
    </svg>
  );
}

function ProcessVideo() {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    video.muted = true;
    const play = () => {
      video.play().catch(() => {});
    };
    play();
    return undefined;
  }, []);

  return (
    <video
      ref={videoRef}
      className="our-process-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Our driveway sealing and paving process"
    >
      <source src={mediaUrl(OUR_PROCESS_VIDEO_SRC)} type="video/mp4" />
    </video>
  );
}

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Free on-site quote',
    desc: 'We visit your driveway, assess the condition, and recommend the right service — sealing, paving, or repair.',
  },
  {
    n: '02',
    title: 'Surface prep',
    desc: 'Clean the asphalt, fill cracks, and patch damaged areas so the finish bonds properly and lasts.',
  },
  {
    n: '03',
    title: 'Seal or pave',
    desc: 'Apply premium sealer or fresh asphalt with professional equipment built for GTA weather.',
  },
  {
    n: '04',
    title: 'Final finish',
    desc: 'Clean edges, line striping if needed, and a walkthrough so you know exactly what was done.',
  },
];

const TRUST_STRIP_ITEMS = [
  { icon: 'cert', text: 'Free on-site quotes' },
  { icon: 'shield', text: 'Fully insured · GTA' },
  { icon: 'star', text: '4.9 / 5 customer rating' },
  { icon: 'clock', text: 'Fast scheduling · Mon–Sat' },
  { icon: 'cert', text: 'Driveway sealing specialists' },
  { icon: 'shield', text: 'Premium sealers & asphalt' },
];

function TrustCarousel() {
  const track = [...TRUST_STRIP_ITEMS, ...TRUST_STRIP_ITEMS];

  return (
    <div className="trust-carousel" aria-label="Trust badges">
      <div className="trust-carousel-track">
        {track.map((item, i) => {
          const Ico = Icon[item.icon];
          return (
            <div
              key={`${item.text}-${i}`}
              className="trust-item"
              aria-hidden={i >= TRUST_STRIP_ITEMS.length ? true : undefined}
            >
              <Ico /> {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RealResultsCarousel({ pairs }) {
  const [index, setIndex] = React.useState(0);
  const count = pairs.length;

  const goTo = (next) => {
    setIndex((i) => (next + count) % count);
  };

  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);

  const pair = pairs[index];

  return (
    <div className="real-results-carousel" data-reveal>
      <div className="real-results-stage">
        <button
          type="button"
          className="real-results-nav real-results-nav--prev"
          onClick={goPrev}
          aria-label="Previous before and after"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
            <path d="M15 6H1M1 6l4-4M1 6l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="real-results-viewport" aria-live="polite">
          <div key={index} className="real-results-slide">
            <div className="real-results-grid">
              <figure className="real-results-card">
                <span className="real-results-badge">Before</span>
                <div className="real-results-frame">
                  <img
                    src={mediaUrl(pair.before)}
                    alt={pair.altBefore}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
              <figure className="real-results-card real-results-card--after">
                <span className="real-results-badge real-results-badge--after">After</span>
                <div className="real-results-frame">
                  <img
                    src={mediaUrl(pair.after)}
                    alt={pair.altAfter}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </figure>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="real-results-nav real-results-nav--next"
          onClick={goNext}
          aria-label="Next before and after"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
            <path d="M1 6h14M15 6l-4-4M15 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="real-results-controls">
        <div className="real-results-dots" role="tablist" aria-label="Before and after projects">
          {pairs.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={`real-results-dot${i === index ? ' active' : ''}`}
              aria-selected={i === index}
              aria-label={`Project ${i + 1} of ${count}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <p className="real-results-counter" aria-hidden="true">
          {index + 1} / {count}
        </p>
      </div>
    </div>
  );
}

// ─── Hero background slideshow ───
const HERO_BG_SLIDES = [
  { src: mediaUrl('/media/pavement-marking-guide.jpg') },
  { src: mediaUrl('/media/nacsupplyinc-seotool-52134-howasealcoat-blogbanner3_2048x.jpg') },
  { src: mediaUrl('/media/blog-4-commercial-paving-repair.jpg') },
  { src: mediaUrl('/media/asphalt-paving-guide.jpg') },
  { src: mediaUrl('/media/20190330_115127-e1554151664764.jpg') },
];

function HeroSlideshow({ activeIdx }) {
  return (
    <div className="hero-slides" aria-hidden="true">
      {HERO_BG_SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={`hero-slide${s.bgPosition ? ' hero-slide--focus-top' : ''}${i === activeIdx ? ' active' : ''}`}
          style={{
            backgroundImage: `url(${s.src})`,
            ...(s.bgPosition ? { backgroundPosition: s.bgPosition } : {}),
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero variants ───
function HeroCentered({ headline, openBooking }) {
  const SERVICES = [
    { id: 'seal-coating', t: 'Seal Coating', icon: 'sealCoating' },
    { id: 'line-stripping', t: 'Line Stripping', icon: 'lineStripping' },
    { id: 'crack-repair', t: 'Crack Repair', icon: 'crackRepair' },
    { id: 'hole-repair', t: 'Hole Repair', icon: 'holeRepair' },
    { id: 'asphalt-paving', t: 'Asphalt Paving', icon: 'asphaltPaving' },
    { id: 'other', t: 'Other', icon: 'otherService' },
  ];
  return (
    <div className="hero-content hero-split-content">
      <div className="hero-split-head">
        <h1 className="hero-split-title">
          <span className="hero-split-title-line">Select Your</span>
          <span className="hero-split-title-line hero-split-title-line--accent">Service</span>
        </h1>
      </div>
      <div className="hero-svc-grid">
        {SERVICES.map((s) => {
          const SvcIcon = Icon[s.icon];
          return (
            <button key={s.id} className="hero-loc hero-svc"
                    onClick={() => openBooking({ service: s.id })}>
              <span className="hero-svc-inner">
                <span className="hero-svc-icon" aria-hidden="true">
                  {SvcIcon ? <SvcIcon /> : null}
                </span>
                <span className="hero-loc-t">{s.t}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="hero-split-lead">
        Receive <strong>10% off</strong> when you complete your free quote request!
      </p>
    </div>
  );
}

// ─── Headline-only hero (full / scrollable view) ───
function HeroHeadline({ headline, openBooking }) {
  return (
    <div className="hero-content">
      <span className="hero-tag-light">
        <span className="pulse"></span>
        Booking visits this week · Greater Toronto Area
      </span>
      <h1>{headline.lead} <em>{headline.em}</em>{headline.trail}</h1>
      <p className="hero-sub" style={{ marginLeft: 0 }}>{headline.sub}</p>
      <div className="hero-cta" style={{ justifyContent: 'center' }}>
        <button className="btn btn-primary btn-lg" onClick={() => openBooking()}>
          Book a service
          <svg className="arrow" width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M15 6l-4-4M15 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

function HeroSplit({ headline, openBooking }) {
  return (
    <div className="hero-content">
      <div>
        <span className="hero-tag-light">
          <span className="pulse"></span>
          Booking visits this week
        </span>
        <h1 style={{ fontSize: 'clamp(44px, 6vw, 84px)' }}>{headline.lead} <em>{headline.em}</em>{headline.trail}</h1>
        <p className="hero-sub">{headline.sub}</p>
        <div className="hero-cta">
          <button className="btn btn-primary btn-lg" onClick={openBooking}>
            Book a service
            <svg className="arrow" width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M15 6l-4-4M15 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div className="hero-visual">
        {/* Placeholder image area */}
        <svg width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="diag" patternUnits="userSpaceOnUse" width="14" height="14" patternTransform="rotate(35)">
              <line x1="0" y1="0" x2="0" y2="14" stroke="var(--line)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="400" height="500" fill="url(#diag)"/>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--ink-faint)', marginBottom: 14 }}>[ HERO IMAGE ]</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--ink-dim)', maxWidth: 240, margin: '0 auto', lineHeight: 1.3 }}>Freshly sealed driveway · drop your photo here</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 24, bottom: 24, padding: '12px 16px', background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 10, fontSize: 12, color: 'var(--ink-dim)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em' }}>● LIVE</div>
          <div style={{ marginTop: 4 }}>Crews active across the GTA today</div>
        </div>
      </div>
    </div>
  );
}

function HeroStamp({ headline, openBooking }) {
  return (
    <div className="hero-content">
      <div className="hero-stamp">DRIVEWAY SEALING · PAVING · GTA</div>
      <h1>{headline.lead} <em>{headline.em}</em>{headline.trail}</h1>
      <p className="hero-sub">{headline.sub}</p>
      <div className="hero-cta">
        <button className="btn btn-primary btn-lg" onClick={openBooking}>
          Book a service
          <svg className="arrow" width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M15 6l-4-4M15 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── Pollen background (shadcn.io-style) ───
// Soft drifting particles with gentle cursor magnetism — ambient, like pollen.
function Pollen({ count = 90, color = "#ffffff", staticity = 50, ease = 50, minAlpha = 0.15, maxAlpha = 0.65 }) {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const mouseRef = React.useRef({ x: 0, y: 0 });
  const cursorRef = React.useRef({ x: 0, y: 0 });
  const rafRef = React.useRef(0);
  const particlesRef = React.useRef([]);
  const sizeRef = React.useRef({ w: 0, h: 0, dpr: 1 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const r = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: r.width, h: r.height, dpr };
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Spawn particles
      particlesRef.current = Array.from({ length: count }, () => spawn());
    };

    const spawn = () => {
      const { w, h } = sizeRef.current;
      const size = Math.random() * 1.6 + 0.6;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        translateX: 0,
        translateY: 0,
        size,
        alpha: 0,
        targetAlpha: Math.random() * (maxAlpha - minAlpha) + minAlpha,
        dx: (Math.random() - 0.5) * 0.18,
        dy: (Math.random() - 0.5) * 0.18 - 0.04, // slight upward bias
        magnetism: 0.1 + Math.random() * 4,
      };
    };

    const onMouse = (e) => {
      const r = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - r.left - r.width / 2;
      mouseRef.current.y = e.clientY - r.top - r.height / 2;
    };

    const draw = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      // Smooth cursor follow
      cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) / ease;
      cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) / ease;

      const ps = particlesRef.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        // fade in
        if (p.alpha < p.targetAlpha) p.alpha += 0.015;
        // base drift
        p.x += p.dx;
        p.y += p.dy;
        // edge fade — 70px soft margin
        const edgeX = Math.min(p.x, w - p.x);
        const edgeY = Math.min(p.y, h - p.y);
        const edge = Math.min(edgeX, edgeY);
        const edgeAlpha = Math.max(0, Math.min(1, edge / 70));
        // magnetism toward cursor
        p.translateX += (cursorRef.current.x / (staticity / p.magnetism) - p.translateX) / ease;
        p.translateY += (cursorRef.current.y / (staticity / p.magnetism) - p.translateY) / ease;

        const drawX = p.x + p.translateX;
        const drawY = p.y + p.translateY;

        // glow
        ctx.save();
        ctx.globalAlpha = p.alpha * edgeAlpha;
        const grad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size * 6);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * 6, 0, Math.PI * 2);
        ctx.fill();
        // core
        ctx.globalAlpha = Math.min(1, p.alpha * edgeAlpha * 1.6);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // respawn if off-screen
        if (p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          ps[i] = spawn();
          ps[i].alpha = 0;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [count, color, staticity, ease, minAlpha, maxAlpha]);

  return (
    <div ref={containerRef} className="pollen-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

// ─── Reveal-on-scroll hook ───
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── FAQ ───
const FAQ_ITEMS = [
  {
    q: "How often should I seal my driveway?",
    a: "Most asphalt driveways in the GTA benefit from sealing every 2–3 years, depending on sun exposure, traffic, and winter salt. We'll inspect your pavement on-site and recommend the right schedule — never a one-size-fits-all push.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve the Greater Toronto Area — Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, Scarborough, and surrounding communities. Not sure if you're in range? Request a quote and we'll confirm.",
  },
  {
    q: "Do you provide free quotes?",
    a: "Yes. Every booking includes a free, no-obligation on-site quote. We'll measure your driveway, assess condition, explain options (sealing vs. paving vs. repairs), and put a clear price in writing before any work starts.",
  },
  {
    q: "Sealing vs. paving — which do I need?",
    a: "Sealing protects existing asphalt in good condition. Paving or resurfacing is for driveways with extensive cracking, potholes, or base failure. We'll walk you through both on-site so you don't pay for work you don't need.",
  },
  {
    q: "How long does driveway sealing take?",
    a: "A typical residential driveway can be sealed in a few hours, with 24–48 hours cure time before driving on it. We schedule around weather and keep you updated if rain shifts the timeline.",
  },
  {
    q: "Are you insured?",
    a: "Yes — Prestige Paving Solutions is fully insured for residential and commercial work. Your property and our crew are protected on every job.",
  },
];

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-icon" aria-hidden="true"></span>
      </button>
      <div className="faq-a">
        <div className="faq-a-inner">{a}</div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section className="faq" id="faq">
      <Pollen color="#0080e0" minAlpha={0.12} maxAlpha={0.42} count={100} />
      <div className="container">
        <div className="faq-head" data-reveal>
          <span className="uplabel">— Frequently asked</span>
          <h2 className="faq-title">Questions, <em>Answered</em></h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} data-reveal data-reveal-delay={Math.min(i + 1, 6)}>
              <FAQItem q={item.q} a={item.a}
                       open={openIdx === i}
                       onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── App ───
function Home() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [showCallBar, setShowCallBar] = React.useState(false);
  const [slideIdx, setSlideIdx] = React.useState(0);

  React.useEffect(() => {
    const b = document.body;
    b.classList.remove('accent-electric', 'accent-amber', 'font-modern', 'font-editorial');
    const a = String(t.accent).toLowerCase();
    if (a === '#42b0ff') b.classList.add('accent-electric');
    if (a === '#3d4f63') b.classList.add('accent-amber');
    if (t.fontPair === 'modern') b.classList.add('font-modern');
    if (t.fontPair === 'editorial') b.classList.add('font-editorial');
  }, [t.accent, t.fontPair]);

  // Scroll handler
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setShowCallBar(y > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      setSlideIdx((i) => (i + 1) % HERO_BG_SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    HERO_BG_SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  const headline = HEADLINES[t.headline] || HEADLINES.precision;

  let HeroBody = HeroCentered;
  let heroLayoutClass = 'layout-centered';

  const [prefill, setPrefill] = React.useState(null);
  const openBooking = (pre) => { setPrefill(pre || null); setBookingOpen(true); };

  return (
    <React.Fragment>
      <div className="hero-shell">
        <HeroSlideshow activeIdx={slideIdx} />
        <div className="hero-veil" aria-hidden="true" />
        <SiteNav scrolled={scrolled} />
        <section className={`hero ${heroLayoutClass}`}>
          <div className="container">
            <HeroBody headline={headline} openBooking={openBooking} />
          </div>
        </section>
        <section className="trust">
          <TrustCarousel />
        </section>
      </div>

      {/* Stats */}
      <section className="stats" id="services">
        <div className="container">
          <div className="stats-layout">
            <div className="stats-content">
              <div className="section-head" style={{ marginBottom: 48 }}>
                <div>
                  <h2>GTA <em>Driveway Sealing</em> &amp; Paving Experts</h2>
                </div>
              </div>
              <div className="stats-grid">
                <div className="stat">
                  <span className="label">Driveways sealed</span>
                  <span className="num"><Counter end={500} />+</span>
                  <span className="desc">Residential and commercial projects across the Greater Toronto Area.</span>
                </div>
                <div className="stat">
                  <span className="label">GTA communities</span>
                  <span className="num"><Counter end={25} />+</span>
                  <span className="desc">Toronto, Mississauga, Brampton, Vaughan, Markham, and beyond.</span>
                </div>
                <div className="stat">
                  <span className="label">Quote turnaround</span>
                  <span className="num"><Counter end={24} /><em>hr</em></span>
                  <span className="desc">From request to on-site visit — often same week in season.</span>
                </div>
                <div className="stat">
                  <span className="label">Customer rating</span>
                  <span className="num"><Counter end={4.9} decimals={1} /><em>/5</em></span>
                  <span className="desc">Trusted for sealing, paving, and honest recommendations.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our process */}
      <section className="section our-process" id="process">
        <div className="container">
          <div className="our-process-head" data-reveal>
            <span className="uplabel">— How We Work</span>
            <h2 className="our-process-title">Our <em>Process</em></h2>
          </div>
          <div className="our-process-split" data-reveal>
            <div className="our-process-video-wrap">
              <ProcessVideo />
            </div>
            <div className="our-process-copy">
              <p className="our-process-intro">
                From free on-site quote to finished driveway — see how we prepare, seal, and finish every GTA job.
              </p>
              <div className="our-process-steps">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.n} className="process-step">
                    <span className="process-num">{step.n}</span>
                    <div className="process-body">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real results — before & after */}
      <section className="section real-results" id="results">
        <div className="container">
          <div className="real-results-head" data-reveal>
            <span className="uplabel">— Before &amp; After</span>
            <h2 className="real-results-title">Real <em>Results</em></h2>
            <p className="real-results-sub">
              Real GTA driveways we&apos;ve sealed and restored — browse before-and-after photos
              from recent projects.
            </p>
          </div>
          <RealResultsCarousel pairs={BEFORE_AFTER_PAIRS} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials" id="testimonials">
        <Pollen color="#0080e0" minAlpha={0.12} maxAlpha={0.42} count={110} />
        <div className="container">
          <div className="testimonials-head" data-reveal>
            <span className="uplabel">— Client Testimonials</span>
            <h2 className="testimonials-title">What Our <em>Clients</em> Say</h2>
            <div className="testimonials-stars" aria-label="4.9 out of 5 stars">
              {[0,1,2,3,4].map((i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2.2 4.5 5 .7-3.6 3.5.85 5L8 12.3 3.55 14.7l.85-5L.8 6.2l5-.7z"/></svg>
              ))}
              <span className="testimonials-rating">4.9 / 5 · 200+ reviews</span>
            </div>
          </div>
          <div className="testimonials-grid">
            {[
              {
                quote: "Our driveway looked tired and grey — after sealing it looks brand new. They showed up on time, explained the process, and the price matched the quote exactly. Already recommended them to our neighbours.",
                name: "Sarah M.",
                role: "Residential · Mississauga",
              },
              {
                quote: "We needed our plaza parking lot resurfaced before winter. Prestige Paving handled striping, patching, and sealing with minimal disruption to tenants. Professional crew and clear communication throughout.",
                name: "James T.",
                role: "Commercial Property Manager",
              },
              {
                quote: "Honest advice — they told us sealing was enough instead of pushing a full repave. Work was done in one day and they left the property clean. Will use them again when it's time to reseal.",
                name: "David K.",
                role: "Residential · Vaughan",
              },
            ].map((t, i) => {
              const initial = t.name.trim().charAt(0);
              return (
                <a
                  key={i}
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="testimonial"
                  data-reveal
                  data-reveal-delay={i + 1}
                  aria-label={`${t.name} — read review on Google`}
                >
                  <blockquote className="testimonial-quote-text"><span className="testimonial-mark">"</span>{t.quote}<span className="testimonial-mark">"</span></blockquote>
                  <span className="testimonial-meta">
                    <span className="testimonial-avatar" aria-hidden="true">{initial}</span>
                    <span className="testimonial-id">
                      <span className="testimonial-name">{t.name}</span>
                      <span className="testimonial-role">{t.role}</span>
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="cta-section" id="about">
        <Pollen color="#0080e0" minAlpha={0.12} maxAlpha={0.42} count={100} />
        <div className="container">
          <div className="cta-card" data-reveal>
            <span className="uplabel">— Ready when you are</span>
            <h2 style={{ marginTop: 14 }}>A Driveway You&apos;re <em>Proud Of</em><br/>Book Your Free Quote</h2>
            <p>GTA service area · Free on-site quote on every booking · Fully insured · Sealing &amp; paving specialists.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={openBooking}>
                Book a service
                <svg className="arrow" width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M15 6l-4-4M15 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <a className="btn btn-ghost btn-lg" href={`tel:${PHONE_TEL}`}>
                <Icon.phone /> Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-row">
            <div className="footer-brand-col">
              <a className="brand" href="#">
                <BrandLogo />
              </a>
              <p className="footer-tag">
                Driveway sealing and paving in the GTA — <em>curb appeal that lasts.</em>
              </p>
            </div>
            <div>
              <h5>Services</h5>
              <ul>
                <li><a href="#services">Driveway sealing</a></li>
                <li><a href="#services">Asphalt paving</a></li>
                <li><a href="#services">Crack filling</a></li>
                <li><a href="#services">Commercial property</a></li>
                <li><a href="#services">Line striping</a></li>
              </ul>
            </div>
            <div>
              <h5>Service area</h5>
              <ul>
                <li><a href="#">Toronto</a></li>
                <li><a href="#">Mississauga</a></li>
                <li><a href="#">Brampton</a></li>
                <li><a href="#">Vaughan</a></li>
                <li><a href="#">Markham</a></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="footer-email">
                    <span className="footer-email-local">{EMAIL.split('@')[0]}</span>
                    <span className="footer-email-domain">@{EMAIL.split('@')[1]}</span>
                  </a>
                </li>
                <li style={{ color: 'var(--ink-faint)' }}>Mon – Sat · seasonal hours</li>
                <li style={{ color: 'var(--ink-faint)' }}>Greater Toronto Area</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Prestige Paving Solutions · All rights reserved</span>
            <span>Driveway sealing &amp; paving · GTA · Fully insured</span>
          </div>
        </div>
      </footer>

      {/* Sticky call bar */}
      <div className={`call-bar${showCallBar ? ' visible' : ''}`} role="region" aria-label="Quick contact">
        <span className="call-bar-text">Ready to Elevate Your Driveway?</span>
        <span className="call-bar-num">{PHONE_DISPLAY}</span>
        <button className="btn btn-primary btn-sm call-bar-cta" onClick={openBooking}>
          BOOK NOW!
        </button>
      </div>

      {/* Survey overlay */}
      <SurveyOverlay open={bookingOpen} prefill={prefill}
                     onClose={() => setBookingOpen(false)}
                     onComplete={() => {
                       setBookingOpen(false);
                       setTimeout(() => {
                         const el = document.getElementById('services');
                         if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                       }, 60);
                     }} />

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakColor label="Accent" value={t.accent}
          options={['#0080e0', '#42b0ff', '#3d4f63']}
          onChange={(v) => setTweak('accent', v)} />

        <TweakSection label="Hero" />
        <TweakRadio label="Layout" value={t.heroLayout}
          options={[
            { value: 'centered', label: 'Centered' },
            { value: 'split', label: 'Split' },
            { value: 'stamp', label: 'Stamp' },
          ]}
          onChange={(v) => setTweak('heroLayout', v)} />
        <TweakSelect label="Headline" value={t.headline}
          options={[
            { value: 'precision', label: 'Sealed with precision.' },
            { value: 'power', label: 'Paving, done properly.' },
            { value: 'modern', label: 'Protecting GTA driveways.' },
            { value: 'trust', label: 'The GTA\'s trusted team.' },
          ]}
          onChange={(v) => setTweak('headline', v)} />

        <TweakSection label="Typography" />
        <TweakSelect label="Font pair" value={t.fontPair}
          options={[
            { value: 'instrument', label: 'Instrument Serif + Manrope' },
            { value: 'modern', label: 'Fraunces + Inter' },
            { value: 'editorial', label: 'DM Serif + Space Grotesk' },
          ]}
          onChange={(v) => setTweak('fontPair', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

export default Home;
