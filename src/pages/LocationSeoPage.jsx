import { useState } from 'react'
import { AmbientDentalLayer } from '../components/AmbientDentalLayer.jsx'
import { SiteNav } from '../components/SiteNav.jsx'
import { ContactSection } from '../components/home/ContactSection.jsx'
import { FaqSection } from '../components/home/FaqSection.jsx'
import { SiteFooter } from '../components/home/SiteFooter.jsx'
import { useDocumentSeo } from '../hooks/useDocumentSeo.js'
import {
  clinicBranches,
  clinicPhoneDisplay,
  clinicPhoneHref,
  consultationTreatments,
} from '../config/siteContent.js'
import { getCanonicalUrl } from '../config/seoContent.js'

export function LocationSeoPage({ page, path }) {
  const initialClinicIndex = Math.max(
    clinicBranches.findIndex((clinic) =>
      `${clinic.branch} ${clinic.area} ${clinic.address}`
        .toLowerCase()
        .includes(page.city.toLowerCase()),
    ),
    0,
  )
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(initialClinicIndex)
  const selectedClinic = clinicBranches[selectedClinicIndex] ?? clinicBranches[0]

  const handleClinicChange = (direction) => {
    setSelectedClinicIndex((current) =>
      (current + direction + clinicBranches.length) % clinicBranches.length,
    )
  }

  useDocumentSeo({
    title: page.title,
    description: page.description,
    path,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Dentist',
      name: 'Apple International Dental',
      url: getCanonicalUrl(path),
      areaServed: page.city,
      description: page.description,
      telephone: clinicPhoneDisplay,
      medicalSpecialty: ['Dentistry', 'Orthodontics', 'Implant Dentistry', 'Pediatric Dentistry'],
    },
  })

  return (
    <main className="page-shell treatment-detail-page location-seo-page" id="top">
      <AmbientDentalLayer />
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/">
            <span className="site-brand-mark">
              <img src="/logo.webp" alt="Apple International Dental logo" />
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
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="treatment-detail-actions">
            <a className="primary-action" href="/#booking">
              Book consultation
            </a>
            <a className="secondary-action" href="/find-a-clinic">
              Find a clinic
            </a>
          </div>
        </div>
        <div className="treatment-detail-media">
          <img
            src="/hero/root-canal-homepage-banner.webp"
            alt={`Apple International Dental clinic services in ${page.city}`}
            width="2172"
            height="724"
            decoding="async"
          />
        </div>
      </section>

      <div className="content-shell treatment-detail-content">
        <section className="treatment-detail-section reveal-section visible">
          <div className="treatment-detail-section-copy">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Dental treatments</p>
                <h2>Dental care available for patients in {page.city}.</h2>
              </div>
              <p className="section-text">
                Apple International Dental supports consultations for root canal treatment, dental
                implants, braces, clear aligners, kids dentistry, gum care, crowns, dentures, smile
                correction, teeth whitening, and emergency dental concerns.
              </p>
            </div>
          </div>

          <div className="treatment-detail-highlights">
            {page.highlights.map((highlight) => (
              <article key={highlight}>
                <p>{highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="scheme-section reveal-section visible">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Common services</p>
              <h2>Popular dental consultation options in {page.city}</h2>
            </div>
            <p className="section-text">
              Patients can choose the relevant treatment while booking and the front desk team will
              guide the correct branch, doctor, and appointment slot.
            </p>
          </div>
          <div className="scheme-grid">
            {consultationTreatments.slice(0, 8).map((treatment) => (
              <article className="scheme-card" key={treatment.id}>
                <div className="scheme-card-body">
                  <div className="scheme-card-top">
                    <span>{page.city}</span>
                  </div>
                  <h3>{treatment.name}</h3>
                  <p>{treatment.details}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <FaqSection
          title={`Dental care FAQs for ${page.city}`}
          intro={`Common questions patients ask before booking a dental consultation with Apple International Dental in ${page.city}.`}
        />
        <ContactSection selectedClinic={selectedClinic} onClinicChange={handleClinicChange} />
      </div>

      <SiteFooter />
    </main>
  )
}
