import { useEffect, useRef } from 'react'
import { AmbientDentalLayer } from '../components/AmbientDentalLayer.jsx'
import { SiteNav } from '../components/SiteNav.jsx'
import { useGsapParallaxDepth } from '../hooks/useGsapParallaxDepth.js'
import {
  clinicPhoneDisplay,
  clinicPhoneHref,
  branchContacts,
  schemePrograms,
  getWhatsappLink,
} from '../config/siteContent.js'

export function SchemesPage() {
  const pageRef = useRef(null)

  useGsapParallaxDepth(pageRef)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const params = new URLSearchParams(window.location.search)

    if (params.get('scroll') !== 'scheme-list') {
      return
    }

    const scrollTimeout = window.setTimeout(() => {
      document.getElementById('scheme-list')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 450)

    return () => window.clearTimeout(scrollTimeout)
  }, [])

  return (
    <main className="page-shell schemes-page" id="top" ref={pageRef}>
      <AmbientDentalLayer variant="schemes" />
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/">
            <span className="site-brand-mark">
              <img src="/logo.png" alt="" aria-hidden="true" />
            </span>
            <span className="site-brand-copy">
              <strong>Apple International Dental</strong>
              <small>Scheme-based dental care guidance</small>
            </span>
          </a>

          <SiteNav homePrefix="/" />

          <div className="site-actions">
            <a className="site-call" href={`tel:${clinicPhoneHref}`}>
              CALL {clinicPhoneDisplay}
            </a>
            <a className="site-cta" href="/#booking">
              Book now
            </a>
          </div>
        </div>
      </header>

      <section className="scheme-hero">
        <div className="scheme-hero-copy">
          <p className="eyebrow">Government and employee schemes</p>
          <h1>Dental care support for eligible scheme card holders.</h1>
          <p>
            Apple International Dental helps patients understand the documents, approval route,
            and branch coordination needed for scheme-linked dental visits.
          </p>
          <div className="scheme-hero-actions">
            <a className="primary-action" href="#scheme-list">
              View schemes
            </a>
            <a className="secondary-action" href="/#booking">
              Request appointment
            </a>
          </div>
        </div>
        <div className="scheme-hero-media scheme-logo-carousel" aria-label="Scheme logo carousel">
          <div className="scheme-carousel-window">
            <div className="scheme-carousel-track">
              {[...schemePrograms, ...schemePrograms].map((scheme, index) => (
                <span className="scheme-carousel-slide" key={`${scheme.shortName}-${index}`}>
                  <img src={scheme.logo} alt={`${scheme.name} logo`} />
                  <small>{scheme.shortName}</small>
                </span>
              ))}
            </div>
          </div>
          <div className="scheme-collage-count">
            <strong>{schemePrograms.length}</strong>
            <span>Schemes</span>
          </div>
        </div>
      </section>

      <section className="scheme-intro">
        <article>
          <span>Before visit</span>
          <strong>Bring your scheme card, ID proof, and any referral note.</strong>
        </article>
        <article>
          <span>At reception</span>
          <strong>The branch team checks documents and guides the approval path.</strong>
        </article>
        <article>
          <span>Treatment plan</span>
          <strong>The dentist explains what can proceed immediately and what needs approval.</strong>
        </article>
      </section>

      <section className="scheme-section" id="scheme-list">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Schemes accepted or guided</p>
            <h2>Choose your scheme and prepare for the branch visit.</h2>
          </div>
          <p className="section-text">
            Coverage can vary by card type, referral status, branch empanelment, and the exact
            dental procedure. Final approval is confirmed through the applicable scheme process.
          </p>
        </div>

        <div className="scheme-grid">
          {schemePrograms.map((scheme) => (
            <article className="scheme-card" key={scheme.shortName}>
              <div className="scheme-logo-frame">
                <img src={scheme.logo} alt={`${scheme.name} logo`} loading="lazy" />
              </div>
              <div className="scheme-card-body">
                <div className="scheme-card-top">
                  <span>{scheme.shortName}</span>
                  <small>{scheme.accent}</small>
                </div>
                <h3>{scheme.name}</h3>
                <p>{scheme.audience}</p>
                <div className="scheme-card-detail">
                  <strong>How we help</strong>
                  <p>{scheme.carePath}</p>
                </div>
              </div>
              <div className="scheme-card-aside">
                <div className="scheme-card-detail">
                  <strong>Dental focus</strong>
                  <p>{scheme.dentalFocus}</p>
                </div>
                <div className="scheme-doc-list">
                  {scheme.documents.map((document) => (
                    <span key={document}>{document}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="scheme-branch-cta">
        <div>
          <p className="eyebrow">Branch help desk</p>
          <h2>Speak to the nearest branch before visiting.</h2>
          <p>
            Share your scheme name, branch preference, and dental concern so the front desk can
            guide documents and appointment timing.
          </p>
        </div>
        <div className="scheme-branch-links">
          {branchContacts.slice(0, 6).map((contact) => (
            <a href={getWhatsappLink(contact.branch)} target="_blank" rel="noreferrer" key={contact.branch}>
              {contact.area}
            </a>
          ))}
          <a className="scheme-all-branches" href="/#contact">
            View all branches
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <strong>Apple International Dental</strong>
            <p>Scheme-linked dental visits are coordinated through branch teams and the applicable approval process.</p>
          </div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/#booking">Booking</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
        <p className="site-footer-credit">
          All Rights Reserved - 2026, Apple International Dental. Designed &amp; Managed By{' '}
          <a href="https://phaseonevfx.com" target="_blank" rel="noreferrer">
            PHASEONEVFX
          </a>
        </p>
      </footer>

    </main>
  )
}
