import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL } from '../lib/mediaUrl';
import { BrandLogo } from '../lib/brand';
import '../about-scoped.css';

export default function About() {
  useEffect(() => {
    document.body.classList.add('page-about');
    return () => document.body.classList.remove('page-about');
  }, []);

  useEffect(() => {
    const callBar = document.getElementById('callBar');
    if (!callBar) return undefined;
    const onScroll = () => callBar.classList.toggle('visible', window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <SiteNav />

      <section className="about-hero">
        <div className="about-hero-img about-hero-img--gradient" aria-hidden="true" />
        <div className="about-hero-veil" />
        <div className="about-hero-content">
          <span className="about-hero-eyebrow">— Prestige Paving Solutions</span>
          <h1 className="about-hero-title">About <em>Us</em></h1>
        </div>
      </section>

      <div className="about-body">
        <section className="about-section">
          <div className="about-section-inner">
            <span className="about-section-label">Our Mission</span>
            <div className="about-section-body">
              <h2>Driveways Done <em>Right</em>, Every Time</h2>
              <p>
                Our mission is to deliver dependable, high-quality driveway sealing and paving tailored to residential and commercial properties across the GTA. Through clear communication, premium materials, and workmanship we stand behind, we build lasting relationships and ensure every project is completed with excellence.
              </p>
              <p>
                We treat every driveway like it&apos;s our own — because for most homeowners, it&apos;s the first thing guests see and one of the largest surfaces on the property. Getting it right isn&apos;t just about a fresh coat of sealer; it&apos;s about protecting your investment for years to come.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <span className="about-stat-num">500+</span>
                  <span className="about-stat-label">Driveways sealed</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">4.9<span className="about-stat-star">★</span></span>
                  <span className="about-stat-label">Average rating</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">100%</span>
                  <span className="about-stat-label">Fully insured</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat-num">GTA</span>
                  <span className="about-stat-label">Service area</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-inner">
            <span className="about-section-label">Our Story</span>
            <div className="about-section-body">
              <h2>Local Roots, <em>Lasting</em> Results</h2>
              <p>
                Prestige Paving Solutions started with a frustration we heard again and again from homeowners: driveway work that looked great for a season, then faded, cracked, or peeled within a year. Too many crews cut corners with watered-down sealer, skipped proper surface prep, or disappeared the moment the cheque cleared.
              </p>
              <p>
                We set out to do it differently. As a GTA-based team, we know exactly what Ontario winters do to asphalt — the freeze-thaw cycles, the road salt, the spring heaving. Every recommendation we make is grounded in that reality, and every job is done to hold up to it. When we finish, we want you to forget about your driveway until we call to check in.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-inner">
            <span className="about-section-label">What We Do</span>
            <div className="about-section-body">
              <h2>Sealing, Paving &amp; <em>Repair</em></h2>
              <p>
                Prestige Paving Solutions specializes in protecting and restoring asphalt driveways. From routine sealing that guards against Ontario winters to full resurfacing and crack repair, we focus on honest recommendations — sealing when it&apos;s enough, paving when it&apos;s truly needed.
              </p>
              <p>
                We serve homeowners, townhomes, condos, and commercial properties throughout the Greater Toronto Area with free on-site quotes and fully insured crews.
              </p>
              <ul className="about-featlist">
                <li>
                  <strong>Driveway sealing</strong>
                  Commercial-grade sealer that shields asphalt from UV, water, oil, and salt — restoring that deep black finish.
                </li>
                <li>
                  <strong>Asphalt paving &amp; resurfacing</strong>
                  Full replacements and overlays when a driveway is past the point of sealing, built on a properly prepared base.
                </li>
                <li>
                  <strong>Crack filling &amp; repair</strong>
                  Hot-rubberized crack filling that stops water intrusion before it turns small cracks into costly potholes.
                </li>
                <li>
                  <strong>Commercial &amp; line striping</strong>
                  Parking lots, laneways, and commercial surfaces — sealed, repaired, and clearly striped for safety and compliance.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-inner">
            <span className="about-section-label">Our Process</span>
            <div className="about-section-body">
              <h2>Simple, Transparent, <em>No Surprises</em></h2>
              <p>
                Booking with us is straightforward. Here&apos;s exactly what to expect from first call to finished driveway.
              </p>
              <ol className="about-steps">
                <li>
                  <span className="about-step-num">1</span>
                  <div>
                    <strong>Free on-site quote</strong>
                    We visit, measure your driveway, assess its condition, and explain your options — with a clear price in writing. No obligation.
                  </div>
                </li>
                <li>
                  <span className="about-step-num">2</span>
                  <div>
                    <strong>Honest recommendation</strong>
                    We tell you what your driveway actually needs — sealing, repair, or paving — never upselling work that won&apos;t add value.
                  </div>
                </li>
                <li>
                  <span className="about-step-num">3</span>
                  <div>
                    <strong>Professional prep &amp; work</strong>
                    We clean the surface, fill cracks, and apply premium materials with fully insured crews who respect your property.
                  </div>
                </li>
                <li>
                  <span className="about-step-num">4</span>
                  <div>
                    <strong>Clean finish &amp; follow-up</strong>
                    We leave the site spotless, walk you through aftercare, and stand behind the results long after the job is done.
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-section-inner">
            <span className="about-section-label">Why Choose Us</span>
            <div className="about-section-body">
              <h2>Built on <em>Trust</em> &amp; Quality</h2>
              <p>
                Prestige Paving Solutions was built on a simple belief: your driveway should look great and hold up to Canadian weather. We use commercial-grade sealers and proven paving practices, leave every site clean, and put pricing in writing before work begins — no surprises.
              </p>
              <ul className="about-featlist about-featlist--check">
                <li>
                  <strong>Fully insured &amp; professional</strong>
                  Your property and our crew are protected on every job — residential and commercial.
                </li>
                <li>
                  <strong>Premium materials only</strong>
                  Commercial-grade sealers and proven paving practices, never watered down to cut costs.
                </li>
                <li>
                  <strong>Transparent, written pricing</strong>
                  Clear quotes before work starts — the price we quote is the price you pay.
                </li>
                <li>
                  <strong>Honest advice</strong>
                  We recommend sealing when it&apos;s enough and paving only when it&apos;s truly needed.
                </li>
              </ul>
              <p>
                Ready to give your driveway the treatment it deserves? <Link to="/">Book your free on-site quote</Link> and we&apos;ll confirm your visit within one business day.
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-row">
            <div className="footer-brand-col">
              <Link to="/" className="brand">
                <BrandLogo />
              </Link>
              <p className="footer-tag">
                Driveway sealing and paving in the GTA — <em>curb appeal that lasts.</em>
              </p>
            </div>
            <div>
              <h5>Services</h5>
              <ul>
                <li><a href="/#services">Driveway sealing</a></li>
                <li><a href="/#services">Asphalt paving</a></li>
                <li><a href="/#services">Crack filling</a></li>
                <li><a href="/#services">Commercial property</a></li>
                <li><a href="/#services">Line striping</a></li>
              </ul>
            </div>
            <div>
              <h5>Service area</h5>
              <ul>
                <li><a href="#">Toronto</a></li>
                <li><a href="#">Durham</a></li>
                <li><a href="#">Bowmanville</a></li>
                <li><a href="#">Vaughan</a></li>
                <li><a href="#">Markham</a></li>
                <li><a href="#">Elsewhere in GTA</a></li>
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

      <div className="call-bar" id="callBar" role="region" aria-label="Quick contact">
        <span className="call-bar-text">Ready to Elevate Your Driveway?</span>
        <span className="call-bar-num">{PHONE_DISPLAY}</span>
        <Link to="/" className="btn-primary">BOOK NOW!</Link>
      </div>
    </>
  );
}
