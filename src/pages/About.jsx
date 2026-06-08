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
