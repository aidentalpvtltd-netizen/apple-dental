import {
  whyChooseUs,
} from '../../config/siteContent.js'

export function WhyChooseUsSection() {
  return (
    <section className="why-section reveal-section" id="why-apple-dental">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Why choose us</p>
          <h2>Why Apple International Dental</h2>
        </div>
        <p className="section-text">
          Comprehensive dental care backed by experienced doctors, advanced technology,
          international standards, and a strong safety-first clinic culture.
        </p>
      </div>

      <div className="why-grid">
        {whyChooseUs.map((item) => (
          <article className="why-card" key={item.title}>
            <span className="why-card-icon" aria-hidden="true">
              {item.icon}
            </span>
            <h3>{item.title}</h3>
            <ul>
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
