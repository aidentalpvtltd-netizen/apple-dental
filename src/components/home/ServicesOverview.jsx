import { services } from '../../config/siteContent.js'

export function ServicesOverview() {
  return (
    <section className="services-overview reveal-section" id="services">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Complete dental care</p>
          <h2>Comprehensive dental services in Vijayawada</h2>
        </div>
        <p className="section-text">
          Explore preventive, cosmetic, restorative, implant, and orthodontic dental services
          tailored to children, adults, and long-term oral health needs.
        </p>
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

        <div className="services-summary">
          <p className="eyebrow">Why families choose us</p>
          <h3>Comfortable visits, clear advice, and long-term dental care under one roof.</h3>
          <div className="services-summary-points">
            <article>
              <strong>Experienced team</strong>
              <p>
                General, cosmetic, restorative, and children&apos;s care planned by experienced
                dentists.
              </p>
            </article>
            <article>
              <strong>Modern diagnosis</strong>
              <p>
                Digital imaging, treatment planning, and practical guidance for confident decisions.
              </p>
            </article>
            <article>
              <strong>Convenient scheduling</strong>
              <p>
                Weekday and weekend consultations for families, working professionals, and urgent
                visits.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
