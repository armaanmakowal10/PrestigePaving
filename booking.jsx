// Survey overlay — full-page multi-step flow with animated page transitions.
// Steps: Service → Location → Property → Timing → Promo (email/phone) → Done
// On submit, scrolls back to landing top.

const S_SERVICES = [
  { id: 'maintenance', t: 'Maintenance & repair', d: 'Diagnostics, fixes, tune-ups' },
  { id: 'emergency', t: 'Emergency repair', d: '24/7 — sparks, no power' },
  { id: 'panel', t: 'Panel & service upgrades', d: '100A → 200A, sub-panels' },
  { id: 'lighting', t: 'Lighting installs', d: 'Pot lights, fixtures, outlets' },
  { id: 'ev', t: 'EV charger install', d: 'Level 2 home charger' },
  { id: 'hottub', t: 'Hot tub wiring', d: 'GFCI dedicated circuits' },
  { id: 'other', t: 'Other', d: 'Tell us what you need' },
];

const S_AREAS = [
  { id: 'calgary', t: 'Calgary' },
  { id: 'airdrie', t: 'Airdrie' },
  { id: 'cochrane', t: 'Cochrane' },
  { id: 'chestermere', t: 'Chestermere' },
  { id: 'okotoks', t: 'Okotoks' },
  { id: 'other', t: 'Somewhere else' },
];

const S_PROPS = [
  { id: 'house', t: 'Detached house', d: 'Single-family home' },
  { id: 'townhome', t: 'Townhome / semi', d: 'Attached residential' },
  { id: 'condo', t: 'Condo / suite', d: 'Multi-unit residential' },
  { id: 'commercial', t: 'Commercial space', d: 'Shop, office, retail' },
];

const S_TIMING = [
  { id: 'asap', t: 'ASAP', d: 'Within 24 hours' },
  { id: 'thisweek', t: 'This week', d: 'Next 2–7 days' },
  { id: 'twoweeks', t: 'Couple of weeks', d: 'Flexible scheduling' },
  { id: 'planning', t: 'Just planning', d: 'Researching options' },
];

const STEPS = [
  { id: 'service', label: 'Service' },
  { id: 'location', label: 'Location' },
  { id: 'property', label: 'Property' },
  { id: 'promo', label: 'Promo' },
];

const LOCATION_SLIDES = [
  'media/image-dc6914e9.png',
  'media/pasted-1778541354183-0.png',
  'media/pasted-1778541390284-0.png',
  'media/pasted-1778541413458-0.png',
  'media/pasted-1778541446197-3.png',
];

const PROPERTY_SLIDES = [
  'media/MCC_14963_COMM_SFH_Article_01.jpg',
  'media/0d440e1b-f062-40a8-803a-d091b5d02b36-w.jpeg',
  'media/townhouse-in-Canada.jpg.webp',
  'media/hero-tablet-1x-res.jpg',
];

const PROMO_IMAGE = 'media/IMG_8839.jpg';

function SurveyOverlay({ open, onClose, onComplete, prefill }) {
  const [step, setStep] = React.useState(0);
  const startStepRef = React.useRef(0);
  const [direction, setDirection] = React.useState('fwd'); // 'fwd' | 'back'
  const [done, setDone] = React.useState(false);
  const [data, setData] = React.useState({
    service: null, location: null, locationOther: '',
    property: null, timing: null,
    email: '', phone: '', notes: '',
  });
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  // Preload step background images
  React.useEffect(() => {
    [...LOCATION_SLIDES, ...PROPERTY_SLIDES, PROMO_IMAGE].forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  // Location step slideshow
  const [locSlideIdx, setLocSlideIdx] = React.useState(0);
  React.useEffect(() => {
    if (step !== 1) return;
    const id = setInterval(() => setLocSlideIdx((i) => (i + 1) % LOCATION_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [step]);

  // Property step slideshow
  const [propSlideIdx, setPropSlideIdx] = React.useState(0);
  React.useEffect(() => {
    if (step !== 2) return;
    const id = setInterval(() => setPropSlideIdx((i) => (i + 1) % PROPERTY_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, [step]);

  // 20-minute countdown for the promo step
  const [secondsLeft, setSecondsLeft] = React.useState(20 * 60);
  React.useEffect(() => {
    if (!open) { setSecondsLeft(20 * 60); return; }
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [open]);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  // Reset when re-opened
  React.useEffect(() => {
    if (open) {
      const loc = prefill && prefill.location ? prefill.location : null;
      const svc = prefill && prefill.service ? prefill.service : null;
      // If service prefilled (from hero), skip step 0 and start at location.
      const initial = svc ? 1 : 0;
      setStep(initial);
      startStepRef.current = initial;
      setDirection('fwd');
      setDone(false);
      setErrors({});
      setData({ service: svc, location: loc, locationOther: '', property: null, timing: null, email: '', phone: '' });
      setSubmitting(false);
    }
  }, [open, prefill]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const isReady = (s = step) => {
    if (s === 0) return !!data.service;
    if (s === 1) return data.location && (data.location !== 'other' || data.locationOther.trim().length > 1);
    if (s === 2) return !!data.property;
    if (s === 3) {
      const okEmail = /^\S+@\S+\.\S+$/.test(data.email.trim());
      const okPhone = data.phone.replace(/\D/g, '').length >= 10;
      return okEmail && okPhone;
    }
    return true;
  };

  const goNext = () => {
    if (!isReady()) {
      // Show errors only on final step
      if (step === 3) {
        const e = {};
        if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) e.email = 'Enter a valid email';
        if (data.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number';
        setErrors(e);
      }
      return;
    }
    if (step === STEPS.length - 1) {
      // Final submit — show "Form Completed!" then scroll back to services section
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setDone(true);
        setTimeout(() => {
          if (onComplete) onComplete();
          else onClose();
        }, 3500);
      }, 350);
      return;
    }
    setDirection('fwd');
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step <= startStepRef.current) {
      onClose();
      return;
    }
    setDirection('back');
    setStep((s) => s - 1);
  };

  // Keyboard: Enter to advance, Esc to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && !e.shiftKey) {
        // don't intercept enter inside textarea
        if (e.target && e.target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft' && step > 0 && !['INPUT','TEXTAREA'].includes(e.target?.tagName)) {
        goBack();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Auto-advance when an option is picked (for choice questions, not text input)
  const pickAndAdvance = (k, v, autoStep) => {
    set(k, v);
    if (autoStep) {
      setTimeout(() => {
        setDirection('fwd');
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
      }, 280);
    }
  };

  const totalSteps = STEPS.length;
  const progressPct = done ? 100 : ((step + (isReady() ? 1 : 0)) / totalSteps) * 100;

  // Render content for active step
  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="qstack">
          <div className="q-counter">Question 1 of {totalSteps}</div>
          <h2 className="q-title">What Can We <em>Wire Up</em> For You?</h2>
          <p className="q-sub">Pick the service closest to what you need — we'll dial in the details on-site.</p>
          <div className="q-options">
            {S_SERVICES.map((s) => (
              <button key={s.id} className={`q-opt${data.service === s.id ? ' selected' : ''}`}
                      onClick={() => pickAndAdvance('service', s.id, true)}>
                <span className="q-opt-t">{s.t}</span>
                <span className="q-opt-d">{s.d}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }
    if (step === 1) {
      return (
        <div className="qstack">
          <div className="q-counter">Question 2 of {totalSteps}</div>
          <h2 className="q-title">Where Are <em>You?</em></h2>
          <p className="q-sub">We service Calgary, Airdrie, and the surrounding communities.</p>
          <div className="q-options three">
            {S_AREAS.map((a) => (
              <button key={a.id} className={`q-opt${data.location === a.id ? ' selected' : ''}`}
                      onClick={() => {
                        if (a.id === 'other') { set('location', 'other'); }
                        else { pickAndAdvance('location', a.id, true); }
                      }}>
                <span className="q-opt-t">{a.t}</span>
              </button>
            ))}
          </div>
          {data.location === 'other' && (
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input className="q-input" autoFocus
                     placeholder="City or postal code"
                     value={data.locationOther}
                     onChange={(e) => set('locationOther', e.target.value)} />
              <span className="q-helper"><b>Tip:</b> we travel up to 90 km from Calgary for larger jobs.</span>
            </div>
          )}
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="qstack">
          <div className="q-counter">Question 3 of {totalSteps}</div>
          <h2 className="q-title">What Kind Of <em>Property</em>?</h2>
          <p className="q-sub">Helps us bring the right gear and quote accurately.</p>
          <div className="q-options">
            {S_PROPS.map((p) => (
              <button key={p.id} className={`q-opt${data.property === p.id ? ' selected' : ''}`}
                      onClick={() => pickAndAdvance('property', p.id, true)}>
                <span className="q-opt-t">{p.t}</span>
                <span className="q-opt-d">{p.d}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }
    if (step === 3) {
      return (
        <div className="promo-split">
          <div className="promo-split-left">
            <div className="promo-card">
              <span className="promo-stamp promo-stamp--countdown">Limited Time Only! · {mm}:{ss}</span>
              <h2 className="q-title">Claim Your <em className="plain">10% Discount</em> On Electrical Services Now</h2>
              <div className="promo-bullets">
                <div className="promo-bullet">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Free On-Site Quote with Every Booking
                </div>
                <div className="promo-bullet">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Master Electrician Led, Licensed and Insured
                </div>
                <div className="promo-bullet">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Over 15+ Years of Experience
                </div>
              </div>
              <div className="promo-fields">
                <div>
                  <textarea className="q-input q-textarea"
                            placeholder="Tell Us About Your Electrical Needs"
                            rows={2}
                            value={data.notes}
                            onChange={(e) => set('notes', e.target.value)} />
                </div>
                <div>
                  <input className={`q-input${errors.email ? ' invalid' : ''}`}
                         autoFocus
                         type="email" placeholder="you@email.com"
                         value={data.email}
                         onChange={(e) => { set('email', e.target.value); if (errors.email) setErrors((er) => ({ ...er, email: null })); }} />
                  {errors.email && <div className="q-err" style={{ marginTop: 6 }}>{errors.email}</div>}
                </div>
                <div>
                  <input className={`q-input${errors.phone ? ' invalid' : ''}`}
                         type="tel" placeholder="(403) 555-0199"
                         value={data.phone}
                         onChange={(e) => { set('phone', e.target.value); if (errors.phone) setErrors((er) => ({ ...er, phone: null })); }} />
                  {errors.phone && <div className="q-err" style={{ marginTop: 6 }}>{errors.phone}</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="promo-split-right">
            <img src={PROMO_IMAGE} alt="Power Design Electrical" className="promo-split-img" />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderDone = () => (
    <div className="qstack" style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="survey-done">
        <div className="survey-done-mark">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 20.5L16 28L32 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="q-title" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>Form <em>Completed!</em></h2>
        <p className="q-sub" style={{ textAlign: 'center', margin: '0 auto' }}>
          Thanks{data.email ? `, ${data.email.split('@')[0]}` : ''} — we'll be in touch shortly.
        </p>
        <span className="q-helper" style={{ marginTop: 16 }}>Returning you to the home page…</span>
      </div>
    </div>
  );

  const CircuitBg = typeof window !== 'undefined' ? window.CircuitBackground : null;

  return (
    <div className={`survey${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Book a service">
      <div className={`survey-location-bg${step === 1 ? ' active' : ''}`} aria-hidden="true">
        {LOCATION_SLIDES.map((src, i) => (
          <div key={i}
               className={`survey-location-slide${i === locSlideIdx ? ' active' : ''}`}
               style={{ backgroundImage: `url(${src})` }} />
        ))}
        <div className="survey-location-veil" />
      </div>
      <div className={`survey-location-bg${step === 2 ? ' active' : ''}`} aria-hidden="true">
        {PROPERTY_SLIDES.map((src, i) => (
          <div key={i}
               className={`survey-location-slide${i === propSlideIdx ? ' active' : ''}`}
               style={{ backgroundImage: `url(${src})` }} />
        ))}
        <div className="survey-location-veil" />
      </div>
      <div className="survey-grid"></div>
      {open && step === 3 && !done && CircuitBg && (
        <div className="survey-circuit-bg">
          <CircuitBg />
        </div>
      )}

      <div className="survey-head">
        <a className="brand" href="#services"
           onClick={(e) => { e.preventDefault(); if (onComplete) onComplete(); else onClose(); }}
           title="Go to home">
          <img src="media/power_design_electrical_logo_transparent.png" alt="Power Design Electrical Ltd" className="brand-logo" />
        </a>
        <a className="nav-phone" href="tel:14037712553">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3h3l1.5 4-2 1.2a9 9 0 004.3 4.3L11 10.5 15 12v3a1 1 0 01-1 1A12 12 0 012 4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          (403) 771-2553
        </a>
      </div>

      <div className="survey-progress-track">
        <div className="survey-progress-fill" style={{ width: `${progressPct}%` }}></div>
      </div>

      <div className="survey-stage">
        <div key={done ? 'done' : step}
             className={`survey-page enter-${direction}${step === 3 ? ' no-scroll' : ''}`}>
          {done ? renderDone() : renderStep()}
        </div>
      </div>

      {!done && (
      <div className="survey-foot">
        <button className="back" onClick={goBack}>
          ← {step === 0 ? 'Back to home' : 'Previous'}
        </button>
        <span className="keyhint"></span>
        <button className="btn btn-primary"
                onClick={goNext}
                disabled={submitting || (!isReady() && step !== 3)}>
          {step === STEPS.length - 1 ? (submitting ? 'Sending…' : 'Claim my promo') : 'Continue'}
          {!submitting && (
            <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

window.SurveyOverlay = SurveyOverlay;
