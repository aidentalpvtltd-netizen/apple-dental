import { SchemeLogoStrip } from '../SiteNav.jsx'
import { heroCarouselImages } from '../../config/siteContent.js'

export function HeroSection() {
  return (
    <section className="hero-section reveal-section">
      <div className="hero-image-card">
        <div className="hero-slide-track" aria-hidden="true">
          {heroCarouselImages.map((image, index) => (
            <div
              className="hero-slide"
              key={`${image}-${index}`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
        </div>
        <div className="hero-overlay">
          <div className="hero-copy">
            <p className="eyebrow">Apple International Dental</p>
            <div className="hero-accreditation">
              <img src="/badges/nabh-accredited-dental-hospital.png" alt="NABH Accredited" />
              <span>NABH ACCREDITED DENTAL HOSPITAL</span>
            </div>
            <h1>No.1 Trusted Dental Care in South India.</h1>
            <p className="hero-text">
              From routine cleanings and kids checkups to aligners, implants, and emergency
              dentistry, our dental clinics in Andhra Pradesh, Telangana and Karnataka offers
              complete care and services.
            </p>

            <div className="hero-actions">
              <a className="secondary-action" href="#services">
                Our services
              </a>
            </div>
          </div>

          <div className="hero-info-grid">
            <article className="hero-info-card">
              <span>Hours</span>
              <strong>Mon - Sun: 10:00 am to 8:00 pm</strong>
            </article>
            <a className="hero-info-card hero-scheme-card-link" href="/schemes?scroll=scheme-list">
              <span>CGHS and ECHS</span>
              <SchemeLogoStrip schemes={['CGHS', 'ECHS']} />
              <strong>
                Dental care guidance for eligible government and ex-servicemen scheme patients
              </strong>
            </a>
            <a className="hero-info-card hero-scheme-card-link" href="/schemes?scroll=scheme-list">
              <span>EHS and ESIC</span>
              <SchemeLogoStrip schemes={['EHS', 'ESIC']} />
              <strong>
                Scheme document support for employee health and insured patient dental visits
              </strong>
            </a>
            <a
              className="hero-info-card hero-scheme-card-link accent"
              href="/schemes?scroll=scheme-list"
            >
              <span>CAPF, CRPF, SCR, ABS</span>
              <SchemeLogoStrip schemes={['CAPF', 'CRPF', 'SCR', 'ABS']} />
              <strong>
                Branch help desk for defence, railway, and Aarogya Bhadratha dental approvals
              </strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
