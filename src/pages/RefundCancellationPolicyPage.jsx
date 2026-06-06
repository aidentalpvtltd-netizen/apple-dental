import '../components/Privacy/Privacy.css'
import { AmbientDentalLayer } from '../components/AmbientDentalLayer.jsx'
import { SiteNav } from '../components/SiteNav.jsx'
import { SiteFooter } from '../components/home/SiteFooter.jsx'
import { useDocumentSeo } from '../hooks/useDocumentSeo.js'
import {
  branchContacts,
  clinicPhoneDisplay,
  clinicPhoneHref,
} from '../config/siteContent.js'

const refundSections = [
  {
    title: '1. Appointment Requests',
    paragraphs: [
      'Appointments submitted through our website are considered appointment requests until confirmed by our clinic staff.',
    ],
    listTitle: 'Appointment confirmations are subject to:',
    items: [
      'Doctor availability',
      'Branch availability',
      'Treatment scheduling',
      'Operational considerations',
    ],
    note: 'Apple International Dental reserves the right to reschedule or decline appointment requests when necessary.',
  },
  {
    title: '2. Appointment Cancellation',
    paragraphs: [
      'Patients may request cancellation or rescheduling of appointments by contacting the clinic directly.',
      'We encourage patients to inform the clinic as early as possible if they are unable to attend their appointment.',
      'Repeated no-shows or last-minute cancellations may affect future appointment scheduling.',
    ],
  },
  {
    title: '3. Rescheduling Policy',
    paragraphs: ['Appointments may be rescheduled depending on:'],
    items: ['Doctor availability', 'Branch schedule', 'Treatment requirements'],
    note: 'Our team will make reasonable efforts to provide alternate appointment slots.',
  },
  {
    title: '4. Consultation Fees',
    paragraphs: ['Consultation charges, if applicable, may vary depending on:'],
    items: [
      'Doctor',
      'Treatment type',
      'Branch location',
      'Specialist consultation requirements',
    ],
    note: 'Consultation fees once utilized for professional consultation services may be non-refundable unless otherwise determined by the clinic management.',
  },
  {
    title: '5. Treatment Payments',
    paragraphs: ['Dental treatment costs may vary based on:'],
    items: [
      'Patient condition',
      'Complexity of procedure',
      'Materials used',
      'Additional procedures required',
      'Doctor recommendations',
    ],
    note: 'Final treatment plans and pricing are confirmed only after professional examination and consultation.',
  },
  {
    title: '6. Refund Eligibility',
    paragraphs: [
      'Refunds, if applicable, are considered only under specific circumstances determined by clinic management.',
    ],
    listTitle: 'Refunds will not apply for:',
    items: [
      'Completed treatments',
      'Partially completed procedures',
      'Customized dental appliances',
      'Aligners',
      'Crowns',
      'Dentures',
      'Implants',
      'Laboratory-related work already initiated',
    ],
    note: 'Any approved refund process may require reasonable processing time.',
  },
  {
    title: '7. Treatment Outcomes',
    paragraphs: ['Dental and medical treatments may vary from patient to patient depending on:'],
    items: [
      'Oral condition',
      'Healing response',
      'Compliance with aftercare instructions',
      'Biological factors',
    ],
    note: 'Apple International Dental does not guarantee identical outcomes for all patients.',
  },
  {
    title: '8. Missed Appointments / No-Shows',
    paragraphs: ['Failure to attend scheduled appointments without prior notice may:'],
    items: [
      'Delay future scheduling',
      'Affect treatment timelines',
      'Result in loss of reserved consultation slots',
    ],
    note: 'Patients are encouraged to communicate with the clinic regarding schedule changes whenever possible.',
  },
  {
    title: '9. Emergency Situations',
    paragraphs: ['In rare circumstances, appointments may need to be postponed or modified due to:'],
    items: [
      'Medical emergencies',
      'Doctor unavailability',
      'Operational issues',
      'Equipment maintenance',
      'Public safety concerns',
    ],
    note: 'The clinic will attempt to inform affected patients promptly and provide alternate scheduling options.',
  },
  {
    title: '10. Payment Disputes',
    paragraphs: [
      'For any concerns regarding payments, billing, cancellations, or refunds, patients are encouraged to contact the clinic directly for clarification and resolution.',
    ],
  },
  {
    title: '11. Policy Updates',
    paragraphs: [
      'Apple International Dental reserves the right to update or modify this Refund & Cancellation Policy at any time. Updated versions will be posted on this page with the revised effective date.',
    ],
  },
]

export function RefundCancellationPolicyPage() {
  const primaryContact = branchContacts[0] ?? {}
  const contactEmail = primaryContact.email || 'appledentalvij@gmail.com'
  const contactAddress =
    primaryContact.address || 'Apple International Dental clinic network'

  useDocumentSeo({
    title:
      'Refund and Cancellation Policy in Hyderabad, Vijayawada & Bangalore | Apple International Dental',
    description:
      'Apple international dental refund and cancellation policy explains appointment changes, consultation fees, and treatment payment guidance in Hyderabad, Vijayawada, and Bangalore.',
    path: '/refund-and-cancellation-policy',
  })

  return (
    <main className="page-shell privacy-page" id="top">
      <AmbientDentalLayer variant="schemes" />
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/">
            <span className="site-brand-mark">
              <img src="/logo.webp" alt="Apple International Dental logo" />
            </span>
            <span className="site-brand-copy">
              <strong>Apple International Dental</strong>
              <small>Refund, cancellation, and appointment policy</small>
            </span>
          </a>

          <SiteNav homePrefix="/" />

          <div className="site-actions">
            <a className="site-call" href={`tel:${clinicPhoneHref}`}>
              CALL {clinicPhoneDisplay}
            </a>
            <a className="site-cta" href="/#booking">
              Book now
            </a>
          </div>
        </div>
      </header>

      <section className="privacy-hero">
        <div className="privacy-hero-mark">
          <img src="/logo.webp" alt="Apple International Dental logo" />
        </div>
        <p className="eyebrow">Refund & Cancellation Policy</p>
        <h1>Apple International Dental</h1>
        <p>
          At Apple International Dental, we strive to provide quality dental care and smooth
          appointment experiences for all patients.
        </p>
        <span>Effective Date: May 24th 2026</span>
      </section>

      <section className="privacy-content" aria-label="Refund and Cancellation Policy details">
        <div className="privacy-intro-card">
          <h2>Apple International Dental Refund & Cancellation Policy</h2>
          <p>
            This policy explains the terms related to appointment cancellations, rescheduling,
            payments, and treatment-related refunds. By booking an appointment or using our
            services, you agree to this policy.
          </p>
        </div>

        {refundSections.map((section) => (
          <article className="privacy-policy-card" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.listTitle ? <strong>{section.listTitle}</strong> : null}
            {section.items ? (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.note ? <p className="privacy-note">{section.note}</p> : null}
          </article>
        ))}

        <article className="privacy-policy-card privacy-contact-card">
          <h2>12. Contact Information</h2>
          <p>
            For cancellation requests, appointment changes, or refund-related questions, please
            contact:
          </p>
          <address>
            <strong>Apple International Dental</strong>
            <span>{contactAddress}</span>
            <a href={`tel:${clinicPhoneHref}`}>Phone: {clinicPhoneDisplay}</a>
            <a href={`mailto:${contactEmail}`}>Email: {contactEmail}</a>
          </address>
        </article>

        <article className="privacy-policy-card privacy-disclaimer-card">
          <h2>Disclaimer</h2>
          <p>
            Dental treatments and procedures are personalized healthcare services. Refund decisions,
            if applicable, are subject to clinical evaluation, operational policies, and management
            discretion.
          </p>
        </article>
      </section>

      <SiteFooter />
    </main>
  )
}
