import { useState } from 'react'
import './App.css'

const treatments = [
  {
    id: 'smile-design',
    name: 'Smile Design',
    icon: null,
    duration: '90 min consultation',
    blurb: 'Veneers, contouring, whitening, and facially balanced smile planning.',
    highlight: 'Cosmetic care',
    details:
      'A cosmetic planning session focused on shape, symmetry, shade, and confidence-building smile refinement.',
  },
  {
    id: 'implants',
    name: 'Dental Implants',
    icon: null,
    duration: '120 min assessment',
    blurb: 'Replace missing teeth with guided implant planning and lasting bite support.',
    highlight: 'Restorative care',
    details:
      'Ideal for single or multiple missing teeth with digital planning, natural-looking crowns, and stable function.',
  },
  {
    id: 'aligners',
    name: 'Clear Aligners',
    icon: null,
    duration: '60 min scan',
    blurb: 'Discreet teeth straightening with scan-led planning and progress reviews.',
    highlight: 'Orthodontics',
    details:
      'Great for crowding, spacing, and mild bite correction using transparent staged aligners.',
  },
  {
    id: 'kids-dentistry',
    name: 'Kids Dentistry',
    icon: null,
    duration: '45 min visit',
    blurb: 'Friendly visits, preventive checkups, sealants, and early habit coaching.',
    highlight: 'Family care',
    details:
      'A gentle approach for children with preventive care and reassuring communication for parents.',
  },
  {
    id: 'root-canal',
    name: 'Root Canal Therapy',
    icon: null,
    duration: '75 min diagnosis',
    blurb: 'Target infection early and preserve the natural tooth comfortably.',
    highlight: 'Pain relief',
    details:
      'Microscope-assisted endodontic care designed to reduce discomfort and protect healthy tooth structure.',
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    icon: null,
    duration: '40 min session',
    blurb: 'In-clinic brightening for photo-ready smiles with sensitivity-aware protocols.',
    highlight: 'Smile boost',
    details:
      'A fast cosmetic option for patients preparing for events, weddings, or a cleaner brighter finish.',
  },
  {
    id: 'veneers',
    name: 'Porcelain Veneers',
    icon: null,
    duration: '75 min design consult',
    blurb: 'Refine tooth shape, color, and alignment with natural-looking veneer planning.',
    highlight: 'Aesthetic care',
    details:
      'Designed for patients seeking dramatic yet polished smile enhancement with precise cosmetic planning.',
  },
  {
    id: 'crowns-bridges',
    name: 'Crowns & Bridges',
    icon: null,
    duration: '60 min restorative visit',
    blurb: 'Restore damaged or missing teeth with strong, shade-matched ceramic options.',
    highlight: 'Tooth repair',
    details:
      'A restorative treatment for fractured teeth, worn bites, and fixed replacement solutions.',
  },
  {
    id: 'gum-care',
    name: 'Gum Care',
    icon: null,
    duration: '50 min periodontal exam',
    blurb: 'Address bleeding gums, inflammation, and long-term periodontal maintenance early.',
    highlight: 'Preventive care',
    details:
      'Focused on periodontal health, deep cleaning pathways, and protecting tooth stability over time.',
  },
  {
    id: 'extractions',
    name: 'Tooth Extractions',
    icon: null,
    duration: '45 min surgical consult',
    blurb: 'Safe extractions for damaged, infected, or impacted teeth with aftercare guidance.',
    highlight: 'Oral surgery',
    details:
      'Appropriate for severe decay, non-restorable teeth, and wisdom tooth evaluation when needed.',
  },
  {
    id: 'dentures',
    name: 'Dentures',
    icon: null,
    duration: '70 min prosthetic consult',
    blurb: 'Comfort-focused removable tooth replacement designed for fit, stability, and confidence.',
    highlight: 'Smile restoration',
    details:
      'Includes planning for full or partial dentures with functional bite and appearance in mind.',
  },
  {
    id: 'emergency',
    name: 'Emergency Dentistry',
    icon: null,
    duration: 'Urgent same-day triage',
    blurb: 'Fast help for pain, swelling, broken teeth, trauma, and sudden dental infections.',
    highlight: 'Urgent care',
    details:
      'Built for immediate attention, pain relief, and next-step treatment planning during dental emergencies.',
  },
]

const kpis = [
  { value: '25+', label: 'years serving families in Hyderabad' },
  { value: '8k+', label: 'patients treated across routine and advanced care' },
  { value: '7 days', label: 'consultations and emergency visits available' },
  { value: '12', label: 'core treatments under one roof' },
]

const services = [
  {
    title: 'Preventive Dentistry',
    text:
      'Routine checkups, digital x-rays, ultrasonic scaling, fluoride care, and gum-health reviews for long-term prevention.',
  },
  {
    title: 'Cosmetic Dentistry',
    text:
      'Smile design, veneers, whitening, and enamel reshaping for patients looking for a brighter, more balanced smile.',
  },
  {
    title: 'Restorative Dentistry',
    text:
      'Tooth-colored fillings, crowns, bridges, implants, and root canal care that restore strength, comfort, and function.',
  },
  {
    title: 'Children & Orthodontic Care',
    text:
      'Kids checkups, habit guidance, sealants, and clear aligner treatment planned around comfort and predictable results.',
  },
]

const dentists = [
  {
    name: 'Dr. Ananya Reddy',
    role: 'Cosmetic & Family Dentist',
    bio: 'Known for smile design, veneers, and conservative aesthetic treatment plans for working professionals and families.',
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dr. Rohit Varma',
    role: 'Implant & Restorative Dentist',
    bio: 'Handles implants, crowns, full-mouth rehabilitation, and complex bite restoration with digital planning workflows.',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dr. Meera Iyer',
    role: 'Pediatric & Preventive Dentist',
    bio: 'Supports child-friendly visits, preventive care, and parent guidance to help children build healthy dental habits early.',
    image:
      'https://images.unsplash.com/photo-1594824388853-d0cfe3f19b1c?auto=format&fit=crop&w=900&q=80',
  },
]

const instagramPosts = [
  {
    image:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80',
    title: 'Smile makeover reveal',
    caption: 'Natural shade, cleaner contours, and a confidence-first finish.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1588776814546-bc4c6c4b5f2f?auto=format&fit=crop&w=900&q=80',
    title: 'Clinic moments',
    caption: 'A calm treatment room designed for comfort, hygiene, and clarity.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=900&q=80',
    title: 'Aligner journey',
    caption: 'Digital scans, structured check-ins, and predictable smile progress.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=900&q=80',
    title: 'Patient education',
    caption: 'Every appointment includes simple next steps and transparent guidance.',
  },
]

const initialFormState = {
  treatment: treatments[0].id,
  name: '',
  phone: '',
  email: '',
  date: '',
  concern: '',
}

function App() {
  const [formState, setFormState] = useState(initialFormState)
  const [submittedFor, setSubmittedFor] = useState('')

  const selectedTreatment =
    treatments.find((treatment) => treatment.id === formState.treatment) ?? treatments[0]

  const handleChange = ({ target: { name, value } }) => {
    setFormState((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleBookTreatment = (treatmentId) => {
    setFormState((current) => ({
      ...current,
      treatment: treatmentId,
    }))
    setSubmittedFor('')
    document.getElementById('booking-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmittedFor(selectedTreatment.name)
    setFormState(initialFormState)
  }

  return (
    <main className="page-shell" id="top">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="#top">
            <span className="site-brand-mark">LD</span>
            <span className="site-brand-copy">
              <strong>Jubilee Dental Care</strong>
              <small>Family, cosmetic, implant, and preventive dentistry</small>
            </span>
          </a>

          <nav className="site-nav" aria-label="Site">
            <a href="#services">Services</a>
            <a href="#treatments">Treatments</a>
            <a href="#instagram">Gallery</a>
            <a href="#dentists">Doctors</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="site-cta" href="#booking">
            Book now
          </a>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-image-card">
          <div className="hero-overlay">
            <div className="hero-copy">
              <p className="eyebrow">Jubilee Hills family, cosmetic, and restorative dentistry</p>
              <h1>Trusted dental care, advanced treatment, and lasting smiles for over 25 years.</h1>
              <p className="hero-text">
                From routine cleanings and kids checkups to aligners, implants, and emergency
                dentistry, our clinic offers complete care in one comfortable setting.
              </p>

              <div className="hero-actions">
                <a className="primary-action" href="#booking">
                  Book appointment
                </a>
                <a className="secondary-action" href="#services">
                  Our services
                </a>
              </div>
            </div>

            <div className="hero-info-grid">
              <article className="hero-info-card">
                <span>Hours</span>
                <strong>Mon-Sat 9:00 AM - 8:00 PM</strong>
              </article>
              <article className="hero-info-card">
                <span>Consultations</span>
                <strong>Same-day and weekend appointments available</strong>
              </article>
              <article className="hero-info-card">
                <span>Technology</span>
                <strong>Digital x-rays, aligners, implants, and microscope-assisted care</strong>
              </article>
              <article className="hero-info-card accent">
                <span>New patients</span>
                <strong>Call, WhatsApp, or request a visit online in under a minute</strong>
              </article>
            </div>
          </div>

          <div className="hero-floating-card">
            <span className="hero-badge">Since 1999</span>
            <div className="hero-image-copy">
              <p>Comfort-first visits</p>
              <strong>Gentle dental care with clear treatment plans and a welcoming clinic team.</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="content-shell">
        <section className="kpi-section" aria-label="Clinic performance highlights">
          {kpis.map((item) => (
            <article className="kpi-card" key={item.label}>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </section>

        <section className="services-overview" id="services">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Complete dental care</p>
              <h2>Comprehensive dental services</h2>
            </div>
            <p className="section-text">
              Explore preventive, cosmetic, restorative, and orthodontic services tailored
              to children, adults, and long-term oral health needs.
            </p>
          </div>

          <div className="services-layout">
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
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
                  <p>General, cosmetic, restorative, and children&apos;s care planned by experienced dentists.</p>
                </article>
                <article>
                  <strong>Modern diagnosis</strong>
                  <p>Digital imaging, treatment planning, and practical guidance for confident decisions.</p>
                </article>
                <article>
                  <strong>Convenient scheduling</strong>
                  <p>Weekday and weekend consultations for families, working professionals, and urgent visits.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="treatment-section" id="treatments">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Popular treatments</p>
              <h2>Explore our most requested treatments</h2>
            </div>
            <p className="section-text">
              Choose a treatment to request a consultation with the right focus from the
              very beginning.
            </p>
          </div>

          <div className="treatment-grid" role="list">
            {treatments.map((treatment) => {
              const isActive = treatment.id === formState.treatment

              return (
                <article
                  key={treatment.id}
                  className={`treatment-card${isActive ? ' active' : ''}`}
                >
                  <div className="treatment-card-top">
                    {treatment.icon ? (
                      <img className="treatment-icon" src={treatment.icon} alt="" aria-hidden="true" />
                    ) : (
                      <span className="treatment-icon treatment-icon-fallback" aria-hidden="true">
                        {treatment.name
                          .split(' ')
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join('')}
                      </span>
                    )}
                    <span className="treatment-tag">{treatment.highlight}</span>
                  </div>
                  <h3>{treatment.name}</h3>
                  <p>{treatment.blurb}</p>
                  <div className="treatment-card-footer">
                    <span className="treatment-meta">{treatment.duration}</span>
                    <button
                      type="button"
                      className="treatment-book-button"
                      onClick={() => handleBookTreatment(treatment.id)}
                    >
                      Book now
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="booking-section" id="booking-form">
            <div className="section-heading compact">
            <div>
              <p className="eyebrow">Contact us</p>
              <h2>Schedule your consultation</h2>
            </div>
            <p className="section-text">
              Tell us what you need help with and our front desk team will confirm the
              right doctor, visit type, and available appointment slot.
            </p>
          </div>

          <aside className="booking-panel booking-panel-full" id="booking">
            <div className="booking-header">
              <p className="eyebrow">Consultation form</p>
              <h3>{selectedTreatment.name}</h3>
              <p>{selectedTreatment.details}</p>
            </div>

            <form className="booking-form booking-form-grid" onSubmit={handleSubmit}>
              <label>
                Treatment
                <select
                  required
                  name="treatment"
                  value={formState.treatment}
                  onChange={handleChange}
                >
                  {treatments.map((treatment) => (
                    <option key={treatment.id} value={treatment.id}>
                      {treatment.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Full name
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={handleChange}
                />
              </label>

              <label>
                Phone number
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formState.phone}
                  onChange={handleChange}
                />
              </label>

              <label>
                Email address
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="hello@patient.com"
                  value={formState.email}
                  onChange={handleChange}
                />
              </label>

              <label>
                Preferred date
                <input
                  required
                  name="date"
                  type="date"
                  value={formState.date}
                  onChange={handleChange}
                />
              </label>

              <label className="booking-form-wide">
                What would you like help with?
                <textarea
                  required
                  name="concern"
                  rows="4"
                  placeholder="Tell us about your smile goals or dental concern."
                  value={formState.concern}
                  onChange={handleChange}
                />
              </label>

              <button className="submit-button booking-form-wide" type="submit">
                Request appointment
              </button>
            </form>

              <div className={`confirmation-card${submittedFor ? ' visible' : ''}`}>
                <strong>Consultation request ready</strong>
                <p>
                  {submittedFor
                    ? `${submittedFor} request submitted. Our reception team will contact you shortly to confirm your appointment.`
                    : 'Select a treatment from the dropdown or use the treatment cards above to begin.'}
                </p>
              </div>
          </aside>
        </section>

        <section className="instagram-section" id="instagram">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Instagram feed</p>
              <h2>Inside our clinic</h2>
            </div>
            <p className="section-text">
              Use this strip for clinic interiors, treatment moments, and smile results.
            </p>
          </div>

          <div className="instagram-grid">
            {instagramPosts.map((post) => (
              <article className="instagram-card" key={post.title}>
                <div
                  className="instagram-image"
                  style={{ backgroundImage: `url(${post.image})` }}
                  aria-label={post.title}
                />
                <div className="instagram-copy">
                  <h3>{post.title}</h3>
                  <p>{post.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dentists-section" id="dentists">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Meet the dentists</p>
              <h2>Meet the doctors behind your care</h2>
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

        <section className="contact-section" id="contact">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">Visit the clinic</p>
              <h2>Visit our clinic for family dentistry, specialist care, and urgent appointments.</h2>
              <p className="section-text">
                We welcome routine appointments, second opinions, urgent visits, and family
                consultations throughout the week.
              </p>
            </div>

            <div className="contact-grid">
              <article className="contact-item">
                <span>Address</span>
                <strong>Road No. 36, Jubilee Hills, Hyderabad 500033</strong>
              </article>
              <article className="contact-item">
                <span>Phone</span>
                <strong>+91 98490 24567</strong>
              </article>
              <article className="contact-item">
                <span>Email</span>
                <strong>care@jubileedental.in</strong>
              </article>
              <article className="contact-item">
                <span>Hours</span>
                <strong>Mon-Sat, 9:00 AM - 8:00 PM</strong>
              </article>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <strong>Jubilee Dental Care</strong>
            <p>Serving Jubilee Hills and surrounding Hyderabad neighborhoods with family dentistry, smile makeovers, implants, aligners, and emergency care.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#booking">Booking</a>
            <a href="#dentists">Doctors</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
