export function TreatmentModal({
  activeTreatment,
  activeTreatmentInsight,
  onClose,
  onBookTreatment,
}) {
  if (!activeTreatment || !activeTreatmentInsight) {
    return null
  }

  return (
    <div className="treatment-modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="treatment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="treatment-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="treatment-modal-close"
          type="button"
          aria-label="Close treatment details"
          onClick={onClose}
        >
          x
        </button>

        <div className="treatment-modal-media">
          {activeTreatment.video ? (
            <video
              src={activeTreatment.video}
              muted
              playsInline
              preload="metadata"
              autoPlay
              loop
              aria-label={`${activeTreatment.name} treatment video`}
            />
          ) : activeTreatment.gif ? (
            <img src={activeTreatment.gif} alt={`${activeTreatment.name} animated preview`} />
          ) : (
            <img src={activeTreatment.image} alt={activeTreatment.name} />
          )}
        </div>

        <div className="treatment-modal-copy">
          <p className="eyebrow">{activeTreatment.highlight}</p>
          <h3 id="treatment-modal-title">{activeTreatment.name}</h3>
          <p>{activeTreatment.details}</p>

          <div className="treatment-modal-grid">
            <div>
              <strong>Benefits</strong>
              <ul>
                {activeTreatmentInsight.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Who needs it</strong>
              <ul>
                {activeTreatmentInsight.whoNeedsIt.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="treatment-modal-footer">
            <span>
              <small>Approx. duration</small>
              <strong>{activeTreatment.duration}</strong>
            </span>
            <button
              className="submit-button treatment-modal-cta"
              type="button"
              onClick={() => onBookTreatment(activeTreatment.id)}
            >
              Book this treatment
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
