import { AmbientDentalLayer } from '../components/AmbientDentalLayer.jsx'
import { SiteNav } from '../components/SiteNav.jsx'
import { SiteFooter } from '../components/home/SiteFooter.jsx'
import {
  branchContacts,
  clinicPhoneDisplay,
  clinicPhoneHref,
} from '../config/siteContent.js'

const termsSections = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: ['By using this website, you agree to:'],
    items: [
      'Follow these Terms & Conditions',
      'Use the website lawfully',
      'Provide accurate information when booking appointments or submitting forms',
    ],
    note: 'If you do not agree with these terms, please do not use this website.',
  },
  {
    title: '2. Website Purpose',
    paragraphs: ['This website is intended to:'],
    items: [
      'Provide information about dental treatments and services',
      'Allow users to request appointments',
      'Enable communication with our clinic',
      'Offer educational and informational content related to dental care',
    ],
    note: 'The website does not provide medical diagnosis or emergency healthcare services.',
  },
  {
    title: '3. Medical Disclaimer',
    paragraphs: [
      'Information available on this website, including chatbot responses, articles, treatment descriptions, and other content, is provided for general informational purposes only.',
      'It should not be considered medical advice, diagnosis, treatment recommendation, or a substitute for professional consultation.',
      'Always consult a licensed dental professional for personalized treatment and medical decisions. If you experience severe pain, swelling, bleeding, trauma, or infection, seek immediate professional dental care.',
    ],
  },
  {
    title: '4. Appointment Requests',
    paragraphs: [
      'Submitting an appointment request through the website does not guarantee confirmation.',
    ],
    items: [
      'Doctor availability',
      'Branch availability',
      'Treatment scheduling',
      'Clinic confirmation',
    ],
    note: 'Our staff may contact you to confirm appointment details, reschedule appointments, or request additional information.',
  },
  {
    title: '5. User Responsibilities',
    paragraphs: ['By using our website, you agree:'],
    items: [
      'To provide accurate information',
      'Not to submit false or misleading data',
      'Not to misuse appointment systems',
      'Not to attempt unauthorized access to website systems',
      'Not to use this website for spam, fraudulent activity, malicious attacks, or illegal activities',
    ],
  },
  {
    title: '6. AI Chatbot Usage',
    paragraphs: [
      'Our website may include an AI-powered dental assistant chatbot. The chatbot provides general informational assistance only, does not replace licensed dental consultation, and may occasionally generate incomplete or inaccurate responses.',
      'Users should independently verify important medical information with qualified dental professionals. Apple International Dental is not responsible for decisions made solely based on chatbot interactions.',
    ],
  },
  {
    title: '7. Payments & Treatment Costs',
    paragraphs: ['Treatment pricing displayed on the website may vary depending on:'],
    items: [
      'Patient condition',
      'Treatment complexity',
      'Materials used',
      'Doctor recommendations',
      'Branch location',
    ],
    note: 'Final treatment costs are confirmed only after professional consultation.',
  },
  {
    title: '8. Intellectual Property',
    paragraphs: [
      'All website content including text, logos, graphics, images, videos, branding, and UI design are the property of Apple International Dental unless otherwise stated.',
    ],
    note: 'Unauthorized copying, reproduction, or redistribution is prohibited.',
  },
  {
    title: '9. Third-Party Services',
    paragraphs: [
      'Our website may integrate third-party services including Google services, analytics tools, chatbot systems, hosting providers, and form services.',
      'We are not responsible for the policies or practices of third-party services.',
    ],
  },
  {
    title: '10. Limitation of Liability',
    paragraphs: ['Apple International Dental is not liable for:'],
    items: [
      'Website interruptions',
      'Technical issues',
      'Delayed appointment confirmations',
      'Inaccuracies in informational content',
      'Decisions made without professional consultation',
    ],
    note: 'Use of this website is at your own discretion and risk.',
  },
  {
    title: '11. Privacy',
    paragraphs: [
      'Your use of this website is also governed by our Privacy Policy. By using the website, you consent to the collection and processing of information as described in the Privacy Policy.',
    ],
  },
  {
    title: '12. Appointment Cancellations & Rescheduling',
    paragraphs: [
      'Appointments may need to be rescheduled or cancelled due to doctor availability, emergencies, or clinic operational requirements.',
      'Patients are encouraged to inform the clinic in advance for appointment cancellations whenever possible.',
    ],
  },
  {
    title: '13. Modifications to Terms',
    paragraphs: [
      'Apple International Dental reserves the right to update or modify these Terms & Conditions at any time. Updated versions will be posted on this page with the revised effective date.',
      'Continued use of the website after updates constitutes acceptance of the revised terms.',
    ],
  },
  {
    title: '14. Governing Law',
    paragraphs: [
      'These Terms & Conditions shall be governed by and interpreted in accordance with the laws applicable in India. Any disputes arising from website usage shall fall under the jurisdiction of the appropriate courts.',
    ],
  },
]

export function TermsConditionsPage() {
  const primaryContact = branchContacts[0] ?? {}
  const contactEmail = primaryContact.email || 'appledentalvij@gmail.com'
  const contactAddress =
    primaryContact.address || 'Apple International Dental clinic network'

  return (
    <main className="page-shell privacy-page" id="top">
      <AmbientDentalLayer variant="schemes" />
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/">
            <span className="site-brand-mark">
              <img src="/logo.png" alt="" aria-hidden="true" />
            </span>
            <span className="site-brand-copy">
              <strong>Apple International Dental</strong>
              <small>Website terms and service conditions</small>
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
          <img src="/logo.png" alt="Apple International Dental logo" />
        </div>
        <p className="eyebrow">Terms & Conditions</p>
        <h1>Apple International Dental</h1>
        <p>
          Welcome to Apple International Dental. By accessing or using our website, booking
          appointments, or interacting with our services, you agree to comply with these Terms &
          Conditions.
        </p>
        <span>Effective Date: May 24th 2026</span>
      </section>

      <section className="privacy-content" aria-label="Terms and Conditions details">
        <div className="privacy-intro-card">
          <h2>Apple International Dental Terms & Conditions</h2>
          <p>Please read these terms carefully before using this website.</p>
        </div>

        {termsSections.map((section) => (
          <article className="privacy-policy-card" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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
          <h2>15. Contact Information</h2>
          <p>For questions regarding these Terms & Conditions, please contact:</p>
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
            This website is intended for informational and appointment-request purposes only. It does
            not provide emergency medical services or professional medical diagnosis.
          </p>
        </article>
      </section>

      <SiteFooter />
    </main>
  )
}
