// Main app — nav, hero, services, stats, process, CTA, footer, sticky call bar, Tweaks panel.

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Power+Design+Electrical+LTD/@51.0860872,-114.087835,86041m/data=!3m1!1e3!4m8!3m7!1s0x57e28fd3bb5b1d3:0xa57ac50c3693cabb!8m2!3d51.0706676!4d-114.1485956!9m1!1b1!16s%2Fg%2F11rqgy_zh3?entry=ttu';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#c9a567",
  "headline": "precision",
  "heroLayout": "centered",
  "fontPair": "instrument"
}/*EDITMODE-END*/;

const HEADLINES = {
  precision: { lead: "Wired with", em: "precision.", trail: " Built to last.", sub: "Calgary's master electricians for homeowners who care how it's done. Book online, and we'll be on-site within 24 hours." },
  power: { lead: "Power,", em: "done properly.", trail: "", sub: "From EV chargers to full rewires, our master electrician team delivers code-perfect work across Calgary and Airdrie. Book in 60 seconds." },
  modern: { lead: "Powering Calgary's", em: "electric", trail: " future.", sub: "EV-ready panels, smart wiring, and emergency service from a master electrician with 15 years of in-the-field expertise." },
  trust: { lead: "Calgary's most", em: "trusted", trail: " electricians.", sub: "15 years. Master-electrician-led. Licensed and insured. Book online and we'll confirm your visit within one business hour." },
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
};

const SERVICES_LIST = [
  { id: 'maintenance', n: '01', icon: 'panel',  title: 'Electrical maintenance & repair', desc: 'Troubleshooting, repairs, and routine service. Tripping breakers, dead outlets, flickering lights — we diagnose and fix it right.' },
  { id: 'emergency',   n: '02', icon: 'alert',  title: 'Emergency repair service',         desc: 'Sparking outlets. Burning smells. No power. Call any time — we answer the phone and arrive same day.' },
  { id: 'panel',       n: '03', icon: 'panel',  title: 'Panel & service upgrades',         desc: '100A to 200A upgrades, sub-panels, and main breakers. Permitted, inspected, future-ready.' },
  { id: 'lighting',    n: '04', icon: 'reno',   title: 'Lighting installation & upgrades', desc: 'Pot lights, fixtures, dimmers, outdoor and landscape lighting. Clean installs, no drywall mess.' },
  { id: 'ev',          n: '05', icon: 'ev',     title: 'EV charger installation',          desc: 'Level 2 chargers wired straight to your panel — Tesla, ChargePoint, hardwired or NEMA 14-50.' },
  { id: 'hottub',      n: '06', icon: 'hottub', title: 'Hot tub wiring & installation',    desc: 'Code-compliant GFCI breakers and dedicated circuits sized to your unit, sealed for the elements.' },
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

// ─── Hero slideshow ───
const HERO_SLIDES = [
  { src: 'media/hero-panel.jpeg',  label: 'Panel upgrade · Calgary' },
  { src: 'media/hero-meter.jpeg',  label: 'Maintenance & diagnostics' },
  { src: 'media/hero-tech.png', label: 'Service & repair', bgPosition: 'center top' },
  { src: 'media/hero-ev.jpeg',     label: 'EV charger install' },
  { src: 'media/39ce4ad2-aaae-488b-9270-e300cd15716a.png', label: 'Hot tub wiring' },
  { src: 'media/hero-reno.png',    label: 'Renovation rough-in' },
];

function HeroSlideshow({ activeIdx }) {
  return (
    <div className="hero-slides" aria-hidden="true">
      {HERO_SLIDES.map((s, i) => (
        <div key={i}
             className={`hero-slide${s.bgPosition ? ' hero-slide--focus-top' : ''}${i === activeIdx ? ' active' : ''}`}
             style={{
               backgroundImage: `url(${s.src})`,
               ...(s.bgPosition ? { backgroundPosition: s.bgPosition } : {}),
             }} />
      ))}
    </div>
  );
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

// ─── Hero variants ───
function HeroCentered({ headline, openBooking }) {
  const SERVICES = [
    { id: 'maintenance', t: 'Maintenance & Repair',     d: 'Diagnostics, fixes, tune-ups' },
    { id: 'emergency',   t: 'Emergency Repair',         d: '24/7 — sparks, no power' },
    { id: 'panel',       t: 'Panel & Service Upgrades', d: '100A → 200A, sub-panels' },
    { id: 'lighting',    t: 'Lighting Installs',        d: 'Pot lights, fixtures, outlets' },
    { id: 'ev',          t: 'EV Charger Install',       d: 'Level 2 home charger' },
    { id: 'hottub',      t: 'Hot Tub Wiring',           d: 'GFCI dedicated circuits' },
    { id: 'other',       t: 'Other',                    d: 'Tell us what you need' },
  ];
  return (
    <div className="hero-content">
      <div className="hero-title-panel">
        <p className="hero-hours">
          {'Mon-Fri 7 AM - 7 PM & Sat 8:00 AM - 4PM'}
        </p>
        <h1 className="hero-question">Select Your <em>Service</em></h1>
      </div>
      <span className="hero-tag-light hero-tag-pulse">
        Receive 10% off once the assessment is completed!
      </span>
      <div className="hero-svc-grid">
        {SERVICES.map((s) => (
          <button key={s.id} className="hero-loc hero-svc"
                  onClick={() => openBooking({ service: s.id })}>
            <span className="hero-svc-stack">
              <span className="hero-loc-t">{s.t}</span>
              <span className="hero-svc-d">{s.d}</span>
            </span>
            <span className="hero-loc-arrow">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M15 6l-4-4M15 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </button>
        ))}
      </div>
      <div className="hero-certs">
        <span className="hero-cert">
          <svg className="hero-cert-check" width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ECAA Certified
        </span>
        <span className="hero-cert">
          <svg className="hero-cert-check" width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          BBB Accredited
        </span>
        <span className="hero-cert">
          <svg className="hero-cert-check" width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Fully Insured
        </span>
        <span className="hero-cert hero-cert-row2">
          <svg className="hero-cert-check" width="22" height="22" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          15+ Years of Experience
        </span>
      </div>
    </div>
  );
}

// ─── Headline-only hero (full / scrollable view) ───
function HeroHeadline({ headline, openBooking }) {
  return (
    <div className="hero-content">
      <span className="hero-tag-light">
        <span className="pulse"></span>
        Booking visits this week · Calgary &amp; Airdrie
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
            <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--ink-dim)', maxWidth: 240, margin: '0 auto', lineHeight: 1.3 }}>Master electrician at panel · drop your photo here</div>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 24, bottom: 24, padding: '12px 16px', background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderRadius: 10, fontSize: 12, color: 'var(--ink-dim)' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em' }}>● LIVE</div>
          <div style={{ marginTop: 4 }}>3 trucks active in Calgary today</div>
        </div>
      </div>
    </div>
  );
}

function HeroStamp({ headline, openBooking }) {
  return (
    <div className="hero-content">
      <div className="hero-stamp">EST. 2010 · CALGARY · ALBERTA</div>
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
function Pollen({ count = 90, color = "#ffffff", staticity = 50, ease = 50 }) {
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
        targetAlpha: Math.random() * 0.5 + 0.15,
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
  }, [count, color, staticity, ease]);

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
    q: "Do you offer same-day service?",
    a: "Yes — we keep daily slots open for same-day visits across Calgary and Airdrie. Call before noon and we'll do everything we can to get a master electrician on your driveway the same afternoon. Emergency calls (sparks, burning smells, no power) jump the queue.",
  },
  {
    q: "What areas do you serve?",
    a: "Calgary, Airdrie, Cochrane, Chestermere, Okotoks, and the surrounding communities. If you're within an hour of our Airdrie shop, we're happy to come out. Outside that radius? Give us a call — we'll see what we can do.",
  },
  {
    q: "Do you provide free quotes?",
    a: "Every booking includes a free, no-obligation on-site quote. We'll walk the job with you, explain what's needed, and put a fixed price in writing before any work starts. No surprise charges, no upsells.",
  },
  {
    q: "Can you handle emergency electrical repairs?",
    a: "Yes. We answer the phone 24/7 for true emergencies — sparking outlets, burning smells, partial or total power loss, panel issues. A master electrician is on call every night and weekend, with a guaranteed 2-hour response window for urgent calls.",
  },
  {
    q: "What types of EV chargers do you install?",
    a: "All major Level 2 home chargers — Tesla Wall Connector, ChargePoint, JuiceBox, Grizzl-E, Wallbox, and others. We can hardwire directly to your panel or install a NEMA 14-50 outlet, pull permits, and handle the inspection. Most installs are done in a single visit.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Absolutely. We're a licensed Master Electrician contractor in Alberta, ECAA certified, BBB accredited, and carry $5M in liability insurance. Every job is permitted and inspected through Safety Codes Council where required.",
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
      <Pollen />
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
// ─── Nav drawer ───
function NavDrawer({ open, onClose, setView }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <React.Fragment>
      <div className={`about-backdrop${open ? ' open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`about-sidebar${open ? ' open' : ''}`} role="navigation" aria-label="Site menu">
        <div className="about-sidebar-head">
          <span className="about-sidebar-label">Menu</span>
          <button className="about-close" onClick={onClose} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <nav className="drawer-nav">
          <a className="drawer-link" href="index.html"
             onClick={(e) => {
               e.preventDefault();
               onClose();
               setView('full');
               setTimeout(() => window.scrollTo({ top: 0 }), 60);
             }}>Home</a>
          <a className="drawer-link" href="about.html">About Us</a>
        </nav>
        <div className="drawer-foot">
          <a className="drawer-phone" href="tel:14037712553">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h3l1.5 4-2 1.2a9 9 0 004.3 4.3L11 10.5 15 12v3a1 1 0 01-1 1A12 12 0 012 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            (403) 771-2553
          </a>
        </div>
      </aside>
    </React.Fragment>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [showCallBar, setShowCallBar] = React.useState(false);
  const [slideIdx, setSlideIdx] = React.useState(0);
  /* Desktop: hero-only entry first. Mobile (≤860px): one scrollable page with hero + sections. */
  const [view, setView] = React.useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 860px)').matches ? 'full' : 'entry'
  ); // 'entry' | 'full'

  React.useEffect(() => {
    if (view === 'full') window.scrollTo(0, 0);
  }, [view]);

  // Auto-advance hero slideshow
  React.useEffect(() => {
    const id = setInterval(() => {
      setSlideIdx((i) => (i + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Preload images
  React.useEffect(() => {
    HERO_SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  // Apply theme classes to body
  React.useEffect(() => {
    const b = document.body;
    b.className = '';
    if (t.theme === 'light') b.classList.add('theme-light');
    const a = String(t.accent).toLowerCase();
    if (a === '#6fa8ff') b.classList.add('accent-electric');
    if (a === '#f0a93b') b.classList.add('accent-amber');
    if (t.fontPair === 'modern') b.classList.add('font-modern');
    if (t.fontPair === 'editorial') b.classList.add('font-editorial');
  }, [t.theme, t.accent, t.fontPair]);

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

  const headline = HEADLINES[t.headline] || HEADLINES.precision;

  let HeroBody = HeroCentered;
  let heroLayoutClass = 'layout-centered';

  const [prefill, setPrefill] = React.useState(null);
  const openBooking = (pre) => { setPrefill(pre || null); setBookingOpen(true); };

  return (
    <React.Fragment>
      {/* Nav */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="brand" href="#services"
             onClick={(e) => {
               e.preventDefault();
               const goToServices = () => {
                 const el = document.getElementById('services');
                 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
               };
               if (view === 'entry') { setView('full'); setTimeout(goToServices, 60); }
               else { goToServices(); }
             }}
             title="Go to services">
            <img src="media/power_design_electrical_logo_transparent.png" alt="Power Design Electrical Ltd" className="brand-logo" />
          </a>
          <div className="nav-right">
            <a className="nav-phone" href="tel:14037712553">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h3l1.5 4-2 1.2a9 9 0 004.3 4.3L11 10.5 15 12v3a1 1 0 01-1 1A12 12 0 012 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
              (403) 771-2553
            </a>
            <button className="nav-hamburger" onClick={() => setAboutOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <NavDrawer open={aboutOpen} onClose={() => setAboutOpen(false)} setView={setView} />

      {/* Hero */}
      <section className={`hero ${heroLayoutClass}`}>
        <HeroSlideshow activeIdx={slideIdx} />
        <div className="hero-veil"></div>
        <div className="container">
          <HeroBody headline={headline} openBooking={openBooking} />
        </div>
      </section>

      {view === 'full' && <React.Fragment>
      {/* Trust strip */}
      <section className="trust">
        <div className="trust-marquee" aria-label="Trust badges">
          <div className="trust-track">
            {[0,1].map((dup) => (
              <div className="trust-track-group" key={dup} aria-hidden={dup === 1 ? 'true' : 'false'}>
                <div className="trust-item"><Icon.cert /> Master Electrician on every job</div>
                <div className="trust-item"><Icon.shield /> Licensed &amp; fully insured · Alberta</div>
                <div className="trust-item"><Icon.star /> 4.9 / 5 across 200+ reviews</div>
                <div className="trust-item"><Icon.clock /> 24-hr response guarantee</div>
                <div className="trust-item"><Icon.cert /> 15+ years in Calgary</div>
                <div className="trust-item"><Icon.shield /> Permitted &amp; inspected</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats" id="services">
        <div className="container">
          <div className="stats-layout">
            <div className="stats-content">
              <div className="section-head" style={{ marginBottom: 48 }}>
                <div>
                  <h2>Calgary's <em>Best Local</em> Electrician Since 2010</h2>
                </div>
              </div>
              <div className="stats-grid">
                <div className="stat">
                  <span className="label">Years in service</span>
                  <span className="num"><Counter end={15} />+</span>
                  <span className="desc">Master-electrician-led since 2010, headquartered in Airdrie.</span>
                </div>
                <div className="stat">
                  <span className="label">Homes wired</span>
                  <span className="num"><Counter end={1000} />+</span>
                  <span className="desc">Across Calgary, Airdrie, Cochrane, and surrounding communities.</span>
                </div>
                <div className="stat">
                  <span className="label">Average response</span>
                  <span className="num"><Counter end={2.5} decimals={1} /><em>hr</em></span>
                  <span className="desc">From booking to a tech on your driveway. Faster for emergencies.</span>
                </div>
                <div className="stat">
                  <span className="label">Five-star reviews</span>
                  <span className="num"><Counter end={4.9} decimals={1} /><em>/5</em></span>
                  <span className="desc">Across Google &amp; HomeStars — verified, never bought.</span>
                </div>
              </div>
            </div>
            <div className="stats-image">
              <img src="media/IMG_8763.jpg" alt="Power Design Electrical team" className="stats-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials" id="testimonials">
        <Pollen />
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
                quote: "Awesome service! Quick response. Arrived when expected. Completed an entire laundry list of electrical items under the original timeframe quoted. High quality work and friendly. Will definitely be using again.",
                name: "Christopher R.",
                role: "Residential Customer",
              },
              {
                quote: "I used Power Design Electrical to repair an old nostalgic commercial sign in my farmers market location. They rewired the old sign, replaced all the bulbs with LED lighting for longer life, and left the space spotless! It looks better than it did before. Thank you so much — 5 out of 5!",
                name: "Margaret N.",
                role: "Primal Soup Co. · Commercial",
              },
              {
                quote: "Power Design Electrical did a great job on each of the projects we had for them. They were knowledgeable and saved us some money by thinking outside the box. They were also very efficient and got the job done in less time than I expected. I highly recommend them and will use them for any future work.",
                name: "Cameron",
                role: "Residential Customer",
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
        <Pollen />
        <div className="container">
          <div className="cta-card" data-reveal>
            <span className="uplabel">— Ready when you are</span>
            <h2 style={{ marginTop: 14 }}>Power That's <em>Actually Reliable</em><br/>Book Your Visit</h2>
            <p>Calgary &amp; Airdrie service area · Free on-site quote on every booking · Licensed, insured, and master-electrician-led.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={openBooking}>
                Book a service
                <svg className="arrow" width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6h14M15 6l-4-4M15 6l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <a className="btn btn-ghost btn-lg" href="tel:14037712553">
                <Icon.phone /> Call (403) 771-2553
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-row">
            <div>
              <a className="brand" href="#" style={{ marginBottom: 18 }}>
                <img src="media/power_design_electrical_logo_transparent.png" alt="Power Design Electrical Ltd" className="brand-logo" />
              </a>
              <p className="footer-tag" style={{ marginTop: 18 }}>
                Calgary's master electrician for homes that need <em>power that just works.</em>
              </p>
            </div>
            <div>
              <h5>Services</h5>
              <ul>
                <li><a href="#services">EV chargers</a></li>
                <li><a href="#services">Panel upgrades</a></li>
                <li><a href="#services">Hot tub wiring</a></li>
                <li><a href="#services">Renovations</a></li>
                <li><a href="#services">Emergency service</a></li>
              </ul>
            </div>
            <div>
              <h5>Service area</h5>
              <ul>
                <li><a href="#">Calgary</a></li>
                <li><a href="#">Airdrie</a></li>
                <li><a href="#">Cochrane</a></li>
                <li><a href="#">Chestermere</a></li>
                <li><a href="#">Okotoks</a></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li><a href="tel:14037712553">(403) 771-2553</a></li>
                <li>
                  <a href="mailto:powerdesignelectricalltd@gmail.com" className="footer-email">
                    <span className="footer-email-local">powerdesignelectricalltd</span>
                    <span className="footer-email-domain">@gmail.com</span>
                  </a>
                </li>
                <li style={{ color: 'var(--ink-faint)' }}>Mon – Sat · 7am – 7pm</li>
                <li style={{ color: 'var(--ink-faint)' }}>EN · ES · FR</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Power Design Electrical LTD · All rights reserved</span>
            <span>Licensed Master Electrician · Alberta · Insured to $5M</span>
          </div>
        </div>
      </footer>
      </React.Fragment>}

      {/* Sticky call bar */}
      <div className={`call-bar${showCallBar && view === 'full' ? ' visible' : ''}`} role="region" aria-label="Quick contact">
        <span className="call-bar-text">Need power back on?</span>
        <span className="call-bar-num">(403) 771-2553</span>
        <button className="btn btn-primary btn-sm call-bar-cta" onClick={openBooking}>
          BOOK NOW!
        </button>
      </div>

      {/* Survey overlay */}
      <SurveyOverlay open={bookingOpen} prefill={prefill}
                     onClose={() => setBookingOpen(false)}
                     onComplete={() => {
                       setBookingOpen(false);
                       setView('full');
                       setTimeout(() => {
                         const el = document.getElementById('services');
                         if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                       }, 60);
                     }} />

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakRadio label="Mode" value={t.theme}
          options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]}
          onChange={(v) => setTweak('theme', v)} />
        <TweakColor label="Accent" value={t.accent}
          options={['#c9a567', '#6fa8ff', '#f0a93b']}
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
            { value: 'precision', label: 'Wired with precision.' },
            { value: 'power', label: 'Power, done properly.' },
            { value: 'modern', label: 'Calgary\'s electric future.' },
            { value: 'trust', label: 'Calgary\'s most trusted.' },
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
