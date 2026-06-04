import { SchemeLogoStrip } from '../SiteNav.jsx'
import { services } from '../../config/siteContent.js'

export function ServicesOverview() {
  return (
    <section className="services-overview reveal-section" id="services">
      <div className="services-heading-row">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Complete dental care</p>
            <h2>Comprehensive Dental Services and Empanelled Schemes in South india</h2>
          </div>
          <p className="section-text">
            Explore Schemes, preventive, cosmetic, restorative, implant, and orthodontic dental services
            tailored to children, adults, and long-term oral health needs. In all our Andhra
            Pradesh, Telangana and Karnataka Branches.
          </p>
        </div>

        <div className="services-accreditation" aria-label="NABH Accredited Dental Hospital">
          <img src="/badges/nabh.png" alt="NABH Accredited" />
          <strong>NABH Accredited Dental Hospital</strong>
        </div>
      </div>

      <div className="services-layout">
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-visual" aria-hidden="true">
                <img src={service.image} alt="" loading="lazy" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>

        <div className="services-schemes-column">
          <div className="services-info-grid">
            <article className="hero-info-card">
              <span>Hours</span>
              <strong>Mon - Sun: 10:00 am to 8:00 pm</strong>
            </article>
            <a className="hero-info-card hero-scheme-card-link" href="/schemes?scroll=scheme-list">
              <span>CGHS and ECHS Empanelled Schemes</span>
              <SchemeLogoStrip schemes={['CGHS', 'ECHS']} />
              <strong>
                Dental care guidance for eligible government and ex-servicemen scheme patients
              </strong>
            </a>
            <a className="hero-info-card hero-scheme-card-link" href="/schemes?scroll=scheme-list">
              <span>EHS and ESIC Empanelled Schemes</span>
              <SchemeLogoStrip schemes={['EHS', 'ESIC']} />
              <strong>
                Scheme document support for employee health and insured patient dental visits
              </strong>
            </a>
            <a
              className="hero-info-card hero-scheme-card-link accent"
              href="/schemes?scroll=scheme-list"
            >
              <span>CAPF, CRPF, SCR, ABS Empanelled Schemes</span>
              <SchemeLogoStrip schemes={['CAPF', 'CRPF', 'SCR', 'ABS']} />
              <strong>
                Branch help desk for defence, railway, and Aarogya Bhadratha dental approvals
              </strong>
            </a>
          </div>

          <div className="services-schemes-promo" aria-hidden="true">
            <div className="services-schemes-text">
              <img src="/schemes/dental-schemes-text.png" alt="" />
              <span className="services-promo-sparkle" />
            </div>
            <div className="services-schemes-arrow">
              <img src="/schemes/dental-schemes-arrow.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
