import { useState } from 'react'
import { treatments } from '../../config/siteContent.js'

export function TreatmentsSection({
  selectedTreatmentId,
  onTreatmentOpen,
  onTreatmentKeyDown,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="treatment-section reveal-section" id="treatments">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Popular treatments</p>
          <h2>Explore our most requested dental treatments</h2>
        </div>
        <p className="section-text">
          Choose a treatment to request a consultation with the right focus from the very beginning.
        </p>
      </div>

      <button
        className="treatment-mobile-toggle"
        type="button"
        aria-controls="popular-treatments-grid"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span>{isExpanded ? 'Hide popular treatments' : 'Expand popular treatments'}</span>
        <span className={`treatment-toggle-caret${isExpanded ? ' expanded' : ''}`} aria-hidden="true" />
      </button>

      <div
        className={`treatment-grid${isExpanded ? ' expanded' : ''}`}
        id="popular-treatments-grid"
      >
        {treatments.map((treatment) => {
          const isActive = treatment.id === selectedTreatmentId

          return (
            <article
              key={treatment.id}
              className={`treatment-card${isActive ? ' active' : ''}`}
              role="button"
              tabIndex="0"
              onClick={() => onTreatmentOpen(treatment.id)}
              onKeyDown={(event) => onTreatmentKeyDown(event, treatment.id)}
            >
              {treatment.image && (
                <div className="treatment-image-wrap">
                  {treatment.isVideoPreview ? (
                    <video
                      className="treatment-image"
                      src={treatment.image}
                      muted
                      playsInline
                      autoPlay
                      loop
                      preload="none"
                      aria-label={`${treatment.name} preview`}
                    />
                  ) : (
                    <img
                      className="treatment-image"
                      src={treatment.image}
                      alt={treatment.name}
                      loading="lazy"
                      decoding="async"
                      width="640"
                      height="640"
                    />
                  )}
                </div>
              )}
              <div className="treatment-card-top">
                <span className="treatment-icon treatment-icon-fallback" aria-hidden="true">
                  {treatment.name
                    .split(' ')
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join('')}
                </span>
                <span className="treatment-tag">{treatment.highlight}</span>
              </div>
              <h3>{treatment.name}</h3>
              <p>{treatment.blurb}</p>
              <div className="treatment-card-footer">
                <span className="treatment-meta">{treatment.duration}</span>
                <button
                  type="button"
                  className="treatment-book-button"
                  onClick={(event) => {
                    event.stopPropagation()
                    onTreatmentOpen(treatment.id)
                  }}
                >
                  Learn more
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
