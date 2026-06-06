import { useEffect, useRef, useState } from 'react'
import { AmbientDentalLayer } from '../components/AmbientDentalLayer.jsx'
import { SiteNav } from '../components/SiteNav.jsx'
import { BrandSection } from '../components/home/BrandSection.jsx'
import { ContactSection } from '../components/home/ContactSection.jsx'
import { SiteFooter } from '../components/home/SiteFooter.jsx'
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection.jsx'
import { useGsapParallaxDepth } from '../hooks/useGsapParallaxDepth.js'
import { useDocumentSeo } from '../hooks/useDocumentSeo.js'
import {
  clinicBranches,
  clinicPhoneDisplay,
  clinicPhoneHref,
  formatPhoneDisplay,
  getGoogleMapsUrl,
} from '../config/siteContent.js'

const normalizeSearchTerm = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim()
const finderCollageClinics = [...clinicBranches, ...clinicBranches]

export function FindClinicPage() {
  const pageRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0)
  const selectedClinic = clinicBranches[selectedClinicIndex] ?? clinicBranches[0]
  const query = normalizeSearchTerm(searchTerm)
  const matchingClinics = query
    ? clinicBranches.filter((clinic) =>
        normalizeSearchTerm(`${clinic.area} ${clinic.branch} ${clinic.address}`).includes(query),
      )
    : clinicBranches

  useDocumentSeo({
    title: 'Find Apple International Dental Clinics | Hyderabad, Andhra Pradesh and Bangalore',
    description:
      'Find Apple International Dental clinic branches for dental consultations in Hyderabad, Andhra Pradesh, Bangalore and Bengaluru with address, phone and directions.',
    path: '/find-a-clinic',
  })

  useGsapParallaxDepth(pageRef)

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

  const handleClinicChange = (direction) => {
    setSelectedClinicIndex((current) =>
      (current + direction + clinicBranches.length) % clinicBranches.length,
    )
  }

  const showClinicDetails = (clinic) => {
    const clinicIndex = clinicBranches.findIndex((item) => item.branch === clinic.branch)

    if (clinicIndex >= 0) {
      setSelectedClinicIndex(clinicIndex)
    }

    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="page-shell find-clinic-page" id="top" ref={pageRef}>
      <AmbientDentalLayer />
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/">
            <span className="site-brand-mark">
              <img src="/logo.webp" alt="Apple International Dental logo" />
            </span>
            <span className="site-brand-copy">
              <strong>Apple International Dental</strong>
              <small>Find care close to your home</small>
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

      <div className="content-shell find-clinic-content">
        <div className="clinic-finder-stage">
          <div className="clinic-finder-collage" aria-hidden="true">
            {finderCollageClinics.map((clinic, index) => (
              <img
                src={clinic.image}
                alt={`${clinic.branch} Apple International Dental branch`}
                key={`${clinic.branch}-backdrop-${index}`}
              />
            ))}
          </div>

          <section className="clinic-finder-section" aria-labelledby="clinic-finder-title">
            <div className="clinic-finder-heading">
              <p className="eyebrow">Find a clinic</p>
              <h1 id="clinic-finder-title">Find an Apple International Dental clinic near you.</h1>
              <p>
                Search using your city or locality to view nearby clinic addresses and contact
                details.
              </p>
            </div>

            <label className="clinic-search-field">
              <span>City name or locality</span>
              <div>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m21 21-4.5-4.5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
                <input
                  type="search"
                  value={searchTerm}
                  placeholder="Example: Hyderabad or Gachibowli"
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
            </label>

            <div className="clinic-result-header" aria-live="polite">
              <strong>
                {query
                  ? `${matchingClinics.length} clinic${matchingClinics.length === 1 ? '' : 's'} found`
                  : `${clinicBranches.length} clinics across South India`}
              </strong>
              {query && (
                <button type="button" onClick={() => setSearchTerm('')}>
                  Clear search
                </button>
              )}
            </div>

            {matchingClinics.length ? (
              <div className="clinic-results-grid">
                {matchingClinics.map((clinic) => (
                  <article className="clinic-result-card" key={clinic.branch}>
                    <p>{clinic.area}</p>
                    <h2>{clinic.branch}</h2>
                    <address>{clinic.address}</address>
                    <a className="clinic-result-phone" href={`tel:+91${clinic.phone}`}>
                      {formatPhoneDisplay(clinic.phone)}
                    </a>
                    <div className="clinic-result-actions">
                      <button type="button" onClick={() => showClinicDetails(clinic)}>
                        View clinic details
                      </button>
                      <a href={getGoogleMapsUrl(clinic.address)} target="_blank" rel="noreferrer">
                        Directions
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="clinic-no-results">
                <h2>No nearby clinics found for this search.</h2>
                <p>
                  Try a nearby city or locality name, or contact our helpline for guidance.
                </p>
                <a href={`tel:${clinicPhoneHref}`}>Call {clinicPhoneDisplay}</a>
              </div>
            )}
          </section>
        </div>

        <BrandSection />
        <WhyChooseUsSection />
        <ContactSection selectedClinic={selectedClinic} onClinicChange={handleClinicChange} />
      </div>

      <SiteFooter />
    </main>
  )
}
