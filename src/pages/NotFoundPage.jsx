import { SiteNav } from '../components/SiteNav.jsx'
import { SiteFooter } from '../components/home/SiteFooter.jsx'
import { useDocumentSeo } from '../hooks/useDocumentSeo.js'
import { clinicPhoneDisplay, clinicPhoneHref } from '../config/siteContent.js'

export function NotFoundPage() {
  useDocumentSeo({
    title: 'Page Not Found | Apple International Dental',
    description:
      'The page you are looking for could not be found. Visit Apple international dental pages for services, schemes, and clinic details in Hyderabad, Vijayawada, and Bangalore.',
    path: '/404',
  })

  return (
    <main className="page-shell treatment-detail-page" id="top">
      <header className="site-header">
        <div className="site-header-inner">
          <a className="site-brand" href="/">
            <span className="site-brand-mark">
              <img src="/logo.webp" alt="Apple International Dental logo" />
            </span>
            <span className="site-brand-copy">
              <strong>Apple International Dental</strong>
              <small>Family, cosmetic, implant, and preventive dentistry</small>
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

      <section className="treatment-detail-hero">
        <div className="treatment-detail-copy">
          <p className="eyebrow">404</p>
          <h1>Page not found</h1>
          <p>
            This page may have moved. Please return to the homepage, view treatments, or find the
            nearest Apple International Dental branch.
          </p>
          <div className="treatment-detail-actions">
            <a className="primary-action" href="/">
              Go home
            </a>
            <a className="secondary-action" href="/find-a-clinic">
              Find a clinic
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
