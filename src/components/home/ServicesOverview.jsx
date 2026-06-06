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
          <img
            src="/badges/nabh.webp"
            alt="NABH Accredited"
            width="512"
            height="512"
            decoding="async"
          />
          <strong>NABH Accredited Dental Hospital</strong>
        </div>
      </div>

      <div className="services-layout">
        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-visual" aria-hidden="true">
                <img
                  src={service.image}
                  alt={`${service.title} dental care illustration`}
                  width="160"
                  height="160"
                  loading="lazy"
                  decoding="async"
                />
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
              <span>CGHS and ECHS Schemes Empanelled</span>
              <SchemeLogoStrip schemes={['CGHS', 'ECHS']} />
              <ul className="scheme-card-points">
                <li>Cash less Treatment for CGHS Pensioners and Ex-Service men</li>
                <li>Reimbursement for CGHS service employees and their family members</li>
              </ul>
            </a>
            <a className="hero-info-card hero-scheme-card-link" href="/schemes?scroll=scheme-list">
              <span>EHS and ABS Schemes Empanelled</span>
              <SchemeLogoStrip schemes={['EHS', 'ABS']} />
              <ul className="scheme-card-points">
                <li>
                  Cash less Treatment for State Govt Employees, Pensioners, Police Employees and
                  their Family members
                </li>
              </ul>
            </a>
            <a
              className="hero-info-card hero-scheme-card-link accent"
              href="/schemes?scroll=scheme-list"
            >
              <span>CAPF, CRPF, SCR, ESIC Schemes Empanelled</span>
              <SchemeLogoStrip schemes={['CAPF', 'CRPF', 'SCR', 'ESIC']} />
              <ul className="scheme-card-points">
                <li>Cash less Treatment for CAPF, CRPF, SCR, ESIC employees</li>
              </ul>
            </a>
          </div>

          <div className="services-schemes-promo" aria-hidden="true">
            <div className="services-schemes-text">
              <img
                src="/schemes/dental-schemes-text.webp"
                alt="Dental schemes accepted at Apple International Dental"
                width="503"
                height="281"
                loading="lazy"
                decoding="async"
              />
              <span className="services-promo-sparkle" />
            </div>
            <div className="services-schemes-arrow">
              <img
                src="/schemes/dental-schemes-arrow.webp"
                alt="Arrow pointing to empanelled dental schemes"
                width="160"
                height="160"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
