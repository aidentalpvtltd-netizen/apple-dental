import { AmbientDentalLayer } from '../components/AmbientDentalLayer.jsx'
import { SiteNav } from '../components/SiteNav.jsx'
import { SiteFooter } from '../components/home/SiteFooter.jsx'
import {
  branchContacts,
  clinicPhoneDisplay,
  clinicPhoneHref,
} from '../config/siteContent.js'

const cookieSections = [
  {
    title: '1. What Are Cookies?',
    paragraphs: [
      'Cookies are small text files stored on your device when you visit a website. They help websites function properly, improve user experience, remember preferences, and analyze website performance.',
    ],
    note: 'Cookies do not typically contain personally identifiable information by themselves.',
  },
  {
    title: '2. How We Use Cookies',
    paragraphs: ['We may use cookies to:'],
    items: [
      'Improve website functionality',
      'Remember user preferences',
      'Analyze website traffic and usage',
      'Enhance booking experience',
      'Improve chatbot functionality',
      'Monitor website performance and security',
    ],
  },
  {
    title: '3. Types of Cookies We Use',
    paragraphs: ['We may use the following categories of cookies and similar technologies.'],
  },
  {
    title: 'Essential Cookies',
    paragraphs: [
      'These cookies are necessary for the website to function properly. They may support navigation, form submissions, security features, and session management.',
    ],
    note: 'Without these cookies, certain website functions may not work correctly.',
  },
  {
    title: 'Performance & Analytics Cookies',
    paragraphs: [
      'These cookies help us understand which pages users visit, how users interact with the website, and website performance and traffic patterns.',
      'We may use services such as Google Analytics and website performance monitoring tools. This information helps improve the website experience.',
    ],
  },
  {
    title: 'Functional Cookies',
    paragraphs: [
      'These cookies remember user preferences such as selected branch, chatbot interactions, form progress, and user interface preferences. They improve convenience and personalization.',
    ],
  },
  {
    title: 'Third-Party Cookies',
    paragraphs: [
      'Some website features may rely on third-party services including Google services, embedded content, AI chatbot providers, and social media integrations.',
      'These services may place their own cookies subject to their individual privacy policies.',
    ],
  },
  {
    title: '4. AI Chatbot & Interactive Features',
    paragraphs: [
      'Our website may include AI-powered features and interactive tools. Cookies or temporary session storage may be used to maintain conversation continuity, improve chatbot functionality, and remember session preferences.',
    ],
    note: 'These tools are intended to improve user experience only.',
  },
  {
    title: '5. Managing Cookies',
    paragraphs: ['Most web browsers allow you to:'],
    items: ['View cookies', 'Delete cookies', 'Block cookies', 'Control cookie preferences'],
    note: 'Disabling certain cookies may affect website functionality and user experience.',
  },
  {
    title: '6. Data Protection',
    paragraphs: [
      'Cookies used by Apple International Dental are intended to improve functionality, performance, and usability.',
      'We do not use cookies to sell personal information. Any personal information collected through website forms or appointments is handled according to our Privacy Policy.',
    ],
  },
  {
    title: '7. Updates to This Cookie Policy',
    paragraphs: [
      'We may update this Cookie Policy periodically to reflect legal requirements, technology updates, or website functionality changes. Updated versions will be posted on this page with the revised effective date.',
    ],
  },
]

export function CookiesPolicyPage() {
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
              <small>Cookie use and website preferences</small>
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
        <p className="eyebrow">Cookie Policy</p>
        <h1>Apple International Dental</h1>
        <p>
          This Cookie Policy explains how Apple International Dental uses cookies and similar
          technologies when you visit our website.
        </p>
        <span>Effective Date: May 24th 2026</span>
      </section>

      <section className="privacy-content" aria-label="Cookie Policy details">
        <div className="privacy-intro-card">
          <h2>Apple International Dental Cookie Policy</h2>
          <p>
            By continuing to browse or use our website, you agree to the use of cookies as described
            in this policy.
          </p>
        </div>

        {cookieSections.map((section) => (
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
          <h2>8. Contact Information</h2>
          <p>If you have questions regarding this Cookie Policy, please contact:</p>
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
            This website may use cookies and analytics tools to improve user experience, website
            performance, and functionality.
          </p>
        </article>
      </section>

      <SiteFooter />
    </main>
  )
}
