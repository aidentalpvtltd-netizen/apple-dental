import { useEffect, useRef, useState } from 'react'
import { AmbientDentalLayer } from '../components/AmbientDentalLayer.jsx'
import { SiteNav } from '../components/SiteNav.jsx'
import { ContactSection } from '../components/home/ContactSection.jsx'
import { FaqSection } from '../components/home/FaqSection.jsx'
import { SiteFooter } from '../components/home/SiteFooter.jsx'
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection.jsx'
import { useGsapParallaxDepth } from '../hooks/useGsapParallaxDepth.js'
import {
  clinicBranches,
  clinicPhoneDisplay,
  clinicPhoneHref,
} from '../config/siteContent.js'

export function TreatmentPage({ page }) {
  const pageRef = useRef(null)
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0)
  const [expandedMedia, setExpandedMedia] = useState(null)
  const selectedClinic = clinicBranches[selectedClinicIndex] ?? clinicBranches[0]

  useGsapParallaxDepth(pageRef)

  const handleClinicChange = (direction) => {
    setSelectedClinicIndex((current) =>
      (current + direction + clinicBranches.length) % clinicBranches.length,
    )
  }

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-section').forEach((element) => {
        element.classList.add('visible')
      })
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll('.reveal-section').forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!expandedMedia) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setExpandedMedia(null)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [expandedMedia])

  return (
    <main
      className={`page-shell treatment-detail-page${page.variant ? ` ${page.variant}` : ''}`}
      id="top"
      ref={pageRef}
    >
      <AmbientDentalLayer />
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/">
            <span className="site-brand-mark">
              <img src="/logo.png" alt="" aria-hidden="true" />
            </span>
            <span className="site-brand-copy">
              <strong>Apple International Dental</strong>
              <small>Family, cosmetic, implant, and preventive dentistry</small>
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

      <section className="treatment-detail-hero">
        <div className="treatment-detail-copy">
          <p className="eyebrow">{page.category}</p>
          <h1>{page.title}</h1>
          <p>{page.summary}</p>
          <div className="treatment-detail-actions">
            <a className="primary-action" href="/#booking">
              Book consultation
            </a>
            <a className="secondary-action" href="#faq">
              Read FAQs
            </a>
          </div>
        </div>
        <div className="treatment-detail-media">
          <img src={page.image} alt={page.imageAlt} />
        </div>
      </section>

      <div className="content-shell treatment-detail-content">
        <section className="treatment-detail-section reveal-section">
          <div className="treatment-detail-section-copy">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">{page.eyebrow}</p>
                <h2>{page.sectionTitle ?? 'Designed to blend with your natural teeth.'}</h2>
              </div>
              <p className="section-text">{page.body}</p>
            </div>

            {page.sectionVideo ? (
              <button
                type="button"
                className="treatment-detail-before-after"
                onClick={() =>
                  setExpandedMedia({
                    type: 'video',
                    src: page.sectionVideo,
                    label: page.sectionVideoLabel,
                  })
                }
              >
                <video
                  src={page.sectionVideo}
                  aria-label={page.sectionVideoLabel}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </button>
            ) : page.sectionImage ? (
              <button
                type="button"
                className="treatment-detail-before-after"
                onClick={() =>
                  setExpandedMedia({
                    type: 'image',
                    src: page.sectionImage,
                    label: page.sectionImageAlt,
                  })
                }
              >
                <img src={page.sectionImage} alt={page.sectionImageAlt} loading="lazy" />
              </button>
            ) : null}
          </div>

          <div className="treatment-detail-highlights">
            {page.highlights.map((highlight) => (
              <article key={highlight}>
                <span aria-hidden="true">+</span>
                <p>{highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <FaqSection
          items={page.faqs}
          eyebrow="Frequently Asked Questions"
          title="General Dentistry FAQs"
          text={page.faqIntro}
        />

        <WhyChooseUsSection />
        <ContactSection selectedClinic={selectedClinic} onClinicChange={handleClinicChange} />
      </div>

      <SiteFooter />

      {expandedMedia && (
        <div
          className="treatment-media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={expandedMedia.label}
          onClick={() => setExpandedMedia(null)}
        >
          <button
            type="button"
            className="treatment-media-close"
            aria-label="Close enlarged media"
            onClick={() => setExpandedMedia(null)}
          >
            ×
          </button>
          <div className="treatment-media-lightbox-frame" onClick={(event) => event.stopPropagation()}>
            {expandedMedia.type === 'video' ? (
              <video src={expandedMedia.src} aria-label={expandedMedia.label} controls autoPlay />
            ) : (
              <img src={expandedMedia.src} alt={expandedMedia.label} />
            )}
          </div>
        </div>
      )}
    </main>
  )
}
