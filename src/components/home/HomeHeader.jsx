import { SiteNav } from '../SiteNav.jsx'
import {
  clinicPhoneDisplay,
  clinicPhoneHref,
} from '../../config/siteContent.js'

export function HomeHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-brand" href="#top">
          <span className="site-brand-mark">
            <img
              src="/logo.webp"
              alt="Apple International Dental logo"
              width="160"
              height="160"
              decoding="async"
            />
          </span>
          <span className="site-brand-copy">
            <strong>Apple International Dental</strong>
            <small>Family, cosmetic, implant, and preventive dentistry</small>
          </span>
        </a>

        <SiteNav />

        <div className="site-actions">
          <a className="site-call" href={`tel:${clinicPhoneHref}`}>
            CALL {clinicPhoneDisplay}
          </a>
          <a className="site-cta" href="#booking">
            Book now
          </a>
        </div>
      </div>
    </header>
  )
}
