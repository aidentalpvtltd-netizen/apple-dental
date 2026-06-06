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

const policySections = [
  {
    title: '1. Information We Collect',
    paragraphs: [
      'We may collect personal information when you book an appointment, submit a contact form, use our chatbot, or request a callback.',
    ],
    listTitle: 'Personal information may include:',
    items: [
      'Full name',
      'Phone number',
      'Email address',
      'Preferred branch',
      'Preferred treatment',
      'Appointment date and time',
      'Messages or inquiries submitted by you',
    ],
  },
  {
    title: 'Automatically Collected Information',
    paragraphs: [
      'When you browse our website, we may automatically collect information that helps us improve website performance and user experience.',
    ],
    items: [
      'IP address',
      'Browser type',
      'Device information',
      'Operating system',
      'Pages visited',
      'Time spent on website',
      'Referring website information',
    ],
  },
  {
    title: '2. How We Use Your Information',
    paragraphs: ['We use collected information to support patient care and website operations.'],
    items: [
      'Schedule and manage appointments',
      'Contact patients regarding appointments or inquiries',
      'Improve our dental services and website experience',
      'Respond to customer support requests',
      'Provide treatment-related information',
      'Analyze website traffic and performance',
      'Prevent spam, abuse, or fraudulent activity',
    ],
    note: 'We do not sell your personal information.',
  },
  {
    title: '3. Appointment & Contact Forms',
    paragraphs: [
      'Information submitted through appointment forms, contact forms, or chatbot interactions may be stored securely using Google Sheets, email systems, and secure third-party service providers. This data is only accessible to authorized clinic staff.',
    ],
  },
  {
    title: '4. AI Chatbot Usage',
    paragraphs: [
      'Our website may include an AI-powered dental assistant chatbot to help answer general dental questions and assist with appointment booking.',
      'The chatbot does not provide medical diagnosis, does not replace professional dental consultation, and may temporarily process conversation data to improve responses and appointment assistance.',
      'Users should consult a licensed dentist for professional medical advice or treatment decisions.',
    ],
  },
  {
    title: '5. Cookies & Tracking Technologies',
    paragraphs: ['We may use cookies and similar technologies to support the website experience.'],
    items: [
      'Improve website functionality',
      'Remember user preferences',
      'Analyze traffic and performance',
      'Improve user experience',
    ],
    note: 'You can disable cookies through your browser settings.',
  },
  {
    title: '6. Third-Party Services',
    paragraphs: [
      'We may use trusted third-party services such as Google Analytics, Google Sheets API, form handling services, hosting providers, and chatbot providers. These services may process limited data necessary for functionality.',
      'We are not responsible for the privacy practices of third-party websites or external services.',
    ],
  },
  {
    title: '7. Data Security',
    paragraphs: [
      'We implement reasonable security measures to protect personal information from unauthorized access, misuse, disclosure, loss, or alteration. However, no internet-based system can guarantee complete security.',
    ],
  },
  {
    title: '8. Patient Confidentiality',
    paragraphs: [
      'Apple International Dental respects patient confidentiality and handles submitted information responsibly. Please avoid submitting highly sensitive medical information through public website forms unless specifically requested by clinic staff.',
    ],
  },
  {
    title: "9. Children's Privacy",
    paragraphs: [
      'Our website is not intended for children under 13 years of age without parental supervision. We do not knowingly collect personal information from children without appropriate consent.',
    ],
  },
  {
    title: '10. Your Rights',
    paragraphs: ['Depending on your location and applicable laws, you may have rights to:'],
    items: [
      'Access your personal data',
      'Request corrections',
      'Request deletion of information',
      'Withdraw consent for communication',
    ],
    note: 'To make such requests, contact us using the details below.',
  },
  {
    title: '11. Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically to reflect legal requirements, technology changes, or service updates. Updated versions will be posted on this page with the revised effective date.',
    ],
  },
]

export function PrivacyPolicyPage() {
  const primaryContact = branchContacts[0] ?? {}
  const contactEmail = primaryContact.email || 'appledentalvij@gmail.com'
  const contactAddress =
    primaryContact.address || 'Apple International Dental clinic network'

  useDocumentSeo({
    title: 'Privacy Policy in Hyderabad, Vijayawada & Bangalore | Apple International Dental',
    description:
      'Apple international dental privacy policy explains how patient and appointment information is handled in Hyderabad, Vijayawada, and Bangalore.',
    path: '/privacy-policy',
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
              <small>Privacy and patient information policy</small>
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
        <p className="eyebrow">Privacy Policy</p>
        <h1>Apple International Dental</h1>
        <p>
          Apple International Dental values your privacy and is committed to protecting your
          personal information when you visit our website or use our services.
        </p>
        <span>Effective Date: May 24th 2026</span>
      </section>

      <section className="privacy-content" aria-label="Privacy Policy details">
        <div className="privacy-intro-card">
          <h2>Apple International Dental Privacy Policy</h2>
          <p>
            By using this website, you agree to the practices described in this Privacy Policy.
          </p>
        </div>

        {policySections.map((section) => (
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
            If you have questions regarding this Privacy Policy or your personal information,
            please contact:
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
            Information provided on this website is for general informational purposes only and does
            not constitute medical advice, diagnosis, or treatment. Always consult a licensed dental
            professional for personalized care.
          </p>
        </article>
      </section>

      <SiteFooter />
    </main>
  )
}
