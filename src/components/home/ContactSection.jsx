import { heroImage, formatPhoneDisplay, getGoogleMapsUrl } from '../../config/siteContent.js'

export function ContactSection({ selectedClinic, onClinicChange }) {
  return (
    <section className="contact-section reveal-section" id="contact">
      <div className="contact-card">
        <div className="contact-copy">
          <p className="eyebrow">Visit the clinic</p>
          <h2>Find the Apple International Dental branch nearest to you.</h2>
          <p className="section-text">
            Use the left and right arrows on the branch image to change the clinic details, address,
            phone number, and email.
          </p>
        </div>

        <div className="clinic-carousel" aria-live="polite">
          <div className="clinic-image-frame">
            <img
              src={selectedClinic.image}
              alt={`${selectedClinic.area} branch`}
              onError={(event) => {
                event.currentTarget.src = heroImage
              }}
            />
            <button
              type="button"
              className="clinic-arrow clinic-arrow-left"
              aria-label="Show previous branch"
              onClick={() => onClinicChange(-1)}
            >
              ?
            </button>
            <button
              type="button"
              className="clinic-arrow clinic-arrow-right"
              aria-label="Show next branch"
              onClick={() => onClinicChange(1)}
            >
              ?
            </button>
            <div className="clinic-image-caption">
              <strong>{selectedClinic.area}</strong>
            </div>
          </div>
          <p className="clinic-carousel-help">Click the arrows to view another clinic branch.</p>
        </div>

        <div className="contact-grid">
          <article className="contact-item">
            <span>Address</span>
            <a href={getGoogleMapsUrl(selectedClinic.address)} target="_blank" rel="noreferrer">
              <strong>{selectedClinic.address}</strong>
              <small>Open in Google Maps</small>
            </a>
          </article>
          <article className="contact-item">
            <span>Phone</span>
            <a href={`tel:+91${selectedClinic.phone}`}>
              <strong>{formatPhoneDisplay(selectedClinic.phone)}</strong>
            </a>
          </article>
          <article className="contact-item">
            <span>Email</span>
            {selectedClinic.email ? (
              <a href={`mailto:${selectedClinic.email}`}>
                <strong>{selectedClinic.email}</strong>
              </a>
            ) : (
              <strong>Email will be updated soon</strong>
            )}
          </article>
          <article className="contact-item">
            <span>Hours</span>
            <strong>Mon-Sat, 9:00 AM - 8:00 PM</strong>
          </article>
        </div>
      </div>
    </section>
  )
}
