// Survey overlay — full-page multi-step flow with animated page transitions.
import React from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { SURVEY_LOCATION_BG_SRCS, SURVEY_PROPERTY_BG_SRCS, SURVEY_PROMO_VIDEO_SRC, mediaUrl } from '@/lib/mediaUrl';
import { SiteNav } from '@/components/SiteNav';

function useSurveyPhotoSlideshow(isActive, slideCount, intervalMs = 6500) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!isActive) {
      setIndex(0);
      return undefined;
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [isActive, slideCount, intervalMs]);

  return index;
}

function SurveyStepPhotoBg({ slides, index }) {
  return (
    <div className="survey-photo-bg active" aria-hidden>
      {slides.map((src, i) => (
        <div
          key={src}
          className={`survey-photo-slide${i === index ? ' active' : ''}`}
          style={{ backgroundImage: `url(${mediaUrl(src)})` }}
        />
      ))}
      <div className="survey-photo-veil" />
    </div>
  );
}

function SurveyPromoVideo() {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (mq.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <video
      ref={videoRef}
      className="promo-split-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src={mediaUrl(SURVEY_PROMO_VIDEO_SRC)} type="video/quicktime" />
      <source src={mediaUrl(SURVEY_PROMO_VIDEO_SRC)} type="video/mp4" />
    </video>
  );
}

const S_SERVICES = [
  { id: 'seal-coating', t: 'Seal Coating', d: 'Protect & restore asphalt surfaces' },
  { id: 'line-stripping', t: 'Line Stripping', d: 'Parking lot lines & markings' },
  { id: 'crack-repair', t: 'Crack Repair', d: 'Stop water damage before it spreads' },
  { id: 'hole-repair', t: 'Hole Repair', d: 'Potholes & surface damage' },
  { id: 'asphalt-paving', t: 'Asphalt Paving', d: 'New driveways, overlays, resurfacing' },
  { id: 'other', t: 'Other', d: 'Tell us what you need' },
];

const S_AREAS = [
  { id: 'toronto', t: 'Toronto' },
  { id: 'durham', t: 'Durham' },
  { id: 'bowmanville', t: 'Bowmanville' },
  { id: 'vaughan', t: 'Vaughan' },
  { id: 'markham', t: 'Markham' },
  { id: 'other', t: 'Elsewhere in GTA' },
];

const S_PROPS = [
  { id: 'house', t: 'Detached house', d: 'Single-family driveway' },
  { id: 'townhome', t: 'Townhome / semi', d: 'Shared or private drive' },
  { id: 'condo', t: 'Condo / multi-unit', d: 'Assigned or visitor parking' },
  { id: 'commercial', t: 'Commercial property', d: 'Shop, plaza, or office lot' },
];

const STEPS = [
  { id: 'service', label: 'Service' },
  { id: 'location', label: 'Location' },
  { id: 'property', label: 'Property' },
  { id: 'promo', label: 'Promo' },
];

export function SurveyOverlay({ open, onClose, onComplete, prefill }) {
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
  const pageRef = React.useRef(null);
  const showPhotoBg = open && !done && (step === 1 || step === 2);
  const locationBgIndex = useSurveyPhotoSlideshow(
    open && step === 1 && !done,
    SURVEY_LOCATION_BG_SRCS.length,
  );
  const propertyBgIndex = useSurveyPhotoSlideshow(
    open && step === 2 && !done,
    SURVEY_PROPERTY_BG_SRCS.length,
  );

  React.useEffect(() => {
    if (!open) return;
    const scrollTop = () => {
      const el = pageRef.current;
      if (el) el.scrollTop = 0;
    };
    scrollTop();
    requestAnimationFrame(scrollTop);
  }, [open, step, done]);

  const [secondsLeft, setSecondsLeft] = React.useState(20 * 60);
  React.useEffect(() => {
    if (!open) { setSecondsLeft(20 * 60); return; }
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [open]);
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  React.useEffect(() => {
    if (open) {
      const loc = prefill && prefill.location ? prefill.location : null;
      const svc = prefill && prefill.service ? prefill.service : null;
      const initial = svc ? 1 : 0;
      setStep(initial);
      startStepRef.current = initial;
      setDirection('fwd');
      setDone(false);
      setErrors({});
      setData({ service: svc, location: loc, locationOther: '', property: null, timing: null, email: '', phone: '', notes: '' });
      setSubmitting(false);
    }
  }, [open, prefill]);

  React.useEffect(() => {
    if (open) {
      // iOS Safari ignores overflow:hidden on body once an input is focused,
      // so the page behind the overlay scrolls instead of the survey content.
      // Pinning the body with position:fixed is the only lock it respects.
      const scrollY = window.scrollY;
      const { style } = document.body;
      const prev = {
        position: style.position,
        top: style.top,
        left: style.left,
        right: style.right,
        width: style.width,
      };
      const prevHtml = document.documentElement.style.overflow;
      style.position = 'fixed';
      style.top = `-${scrollY}px`;
      style.left = '0';
      style.right = '0';
      style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        style.position = prev.position;
        style.top = prev.top;
        style.left = prev.left;
        style.right = prev.right;
        style.width = prev.width;
        document.documentElement.style.overflow = prevHtml;
        window.scrollTo(0, scrollY);
      };
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
      if (step === 3) {
        const e = {};
        if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) e.email = 'Enter a valid email';
        if (data.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid phone number';
        setErrors(e);
      }
      return;
    }
    if (step === STEPS.length - 1) {
      setSubmitting(true);
      const labelFor = (list, id) => {
        const found = list.find((x) => x.id === id);
        return found ? found.t : id;
      };
      const locationLabel = data.location === 'other'
        ? `Other — ${data.locationOther.trim()}`
        : labelFor(S_AREAS, data.location);
      const payload = {
        _subject: 'New Prestige Paving quote request',
        _template: 'table',
        _captcha: 'false',
        Service: labelFor(S_SERVICES, data.service),
        Location: locationLabel,
        Property: labelFor(S_PROPS, data.property),
        Email: data.email.trim(),
        Phone: data.phone.trim(),
        Notes: data.notes.trim() || '(none)',
      };
      fetch('https://formsubmit.co/ajax/prestigeps10@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .catch(() => {})
        .finally(() => {
          setSubmitting(false);
          setDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
            else onClose();
          }, 3500);
        });
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

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && !e.shiftKey) {
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

  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="qstack">
          <div className="q-counter">Question 1 of {totalSteps}</div>
          <h2 className="q-title">What Can We <em>Do</em> For Your Driveway?</h2>
          <p className="q-sub">Choose the service that fits best — we&apos;ll confirm details and provide a free on-site quote.</p>
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
          <h2 className="q-title">Where Is Your <em>Property?</em></h2>
          <p className="q-sub">We serve the Greater Toronto Area — driveway sealing and paving across the GTA.</p>
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
              <span className="q-helper"><b>Tip:</b> we travel throughout the GTA for residential and commercial jobs.</span>
            </div>
          )}
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="qstack">
          <div className="q-counter">Question 3 of {totalSteps}</div>
          <h2 className="q-title">What Type Of <em>Property?</em></h2>
          <p className="q-sub">Helps us size the crew, materials, and quote accurately.</p>
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
              <h2 className="q-title">Claim Your <em className="plain">10% Discount</em> On Driveway Services</h2>
              <div className="promo-bullets">
                <div className="promo-bullet">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Free On-Site Quote with Every Booking
                </div>
                <div className="promo-bullet">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Premium Sealers &amp; Commercial-Grade Asphalt
                </div>
                <div className="promo-bullet">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3L13 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Driveway Sealing Specialists in the GTA
                </div>
              </div>
              <div className="promo-fields">
                <div>
                  <textarea className="q-input q-textarea"
                            placeholder="Tell us about your driveway (size, condition, timeline)"
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
                         type="tel" placeholder="(905) 261-6800"
                         value={data.phone}
                         onChange={(e) => { set('phone', e.target.value); if (errors.phone) setErrors((er) => ({ ...er, phone: null })); }} />
                  {errors.phone && <div className="q-err" style={{ marginTop: 6 }}>{errors.phone}</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="promo-split-right">
            <SurveyPromoVideo />
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
        <h2 className="q-title">Request <em>Received!</em></h2>
        <p className="q-sub" style={{ textAlign: 'center', margin: '0 auto' }}>
          Thanks{data.email ? `, ${data.email.split('@')[0]}` : ''} — we&apos;ll reach out shortly with your free quote.
        </p>
        <span className="q-helper" style={{ marginTop: 16 }}>Returning you to the home page…</span>
      </div>
    </div>
  );

  return (
    <div className={`survey${open ? ' open' : ''}${showPhotoBg ? ' survey--photo-bg' : ''}${step === 3 && !done ? ' survey--promo' : ''}`} role="dialog" aria-modal="true" aria-label="Get a free quote">
      <div className="survey-grid"></div>

      {open && step === 1 && !done && (
        <SurveyStepPhotoBg slides={SURVEY_LOCATION_BG_SRCS} index={locationBgIndex} />
      )}
      {open && step === 2 && !done && (
        <SurveyStepPhotoBg slides={SURVEY_PROPERTY_BG_SRCS} index={propertyBgIndex} />
      )}

      <SiteNav onClose={() => { if (onComplete) onComplete(); else onClose(); }} />

      <div className="survey-progress-track">
        <div className="survey-progress-fill" style={{ width: `${progressPct}%` }}></div>
      </div>

      <div className="survey-stage">
        {open && step === 3 && !done && (
          <div className="survey-promo-bg" aria-hidden>
            <BackgroundBeams
              className="z-0 opacity-[0.85] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,#000_25%,transparent_78%)] [-webkit-mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,#000_25%,transparent_78%)]"
            />
          </div>
        )}
        <div
             key={done ? 'done' : step}
             ref={pageRef}
             className={`survey-page${step === 3 && !done ? ' no-anim no-scroll' : ` enter-${direction}`}`}>
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
          {step === STEPS.length - 1 ? (submitting ? 'Sending…' : 'Get my free quote') : 'Continue'}
          {!submitting && (
            <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
