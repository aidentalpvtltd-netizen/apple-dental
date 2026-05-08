import {
  dentists,
} from '../../config/siteContent.js'

export function DentistsSection() {
  return (
    <section className="dentists-section reveal-section" id="dentists">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Meet the dentists</p>
          <h2>Meet the dentists behind your care</h2>
        </div>
        <p className="section-text">
          Add specialist bios, credentials, and areas of focus to build confidence.
        </p>
      </div>

      <div className="dentists-grid">
        {dentists.map((dentist) => (
          <article className="dentist-card" key={dentist.name}>
            <div
              className="dentist-photo"
              style={{ backgroundImage: `url(${dentist.image})` }}
              aria-label={dentist.name}
            />
            <h3>{dentist.name}</h3>
            <span>{dentist.role}</span>
            <p>{dentist.bio}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
