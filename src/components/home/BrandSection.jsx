import {
  clinicBrands,
} from '../../config/siteContent.js'

export function BrandSection() {
  return (
    <section className="brand-section reveal-section" aria-label="Dental technology and partner brands">
      <div className="brand-panel">
        <div className="brand-heading">
          <div>
            <p className="eyebrow">Technology and material partners</p>
            <h2>Premium brands used across lasers, implants, aligners, and digital dentistry.</h2>
          </div>
          <p>
            Our clinical teams work with globally recognized dental systems for precision imaging,
            implant planning, restorative care, laser dentistry, and aligner workflows.
          </p>
        </div>

        <div className="brand-logo-grid">
          {clinicBrands.map((brand) => (
            <article
              className={`brand-logo-card${brand.featured ? ' brand-logo-card-featured' : ''}`}
              key={brand.name}
            >
              <div className="brand-logo-frame">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width="180"
                  height="72"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <strong>{brand.name}</strong>
                <span>{brand.category}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
