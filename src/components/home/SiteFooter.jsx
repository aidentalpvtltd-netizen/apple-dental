import {
  instagramProfileUrl,
} from '../../config/siteContent.js'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <strong>Apple International Dental</strong>
          <p>
            Serving patients across our clinic network with family dentistry, smile makeovers,
            implants, aligners, and emergency care.
          </p>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#booking">Booking</a>
          <a href="/schemes">Schemes</a>
          <a href="#dentists">Doctors</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-social-links" aria-label="Social media links">
          <a href={instagramProfileUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
            </svg>
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M13.7 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6H17V4.1c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V22h3.4Z" />
            </svg>
          </a>
          <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M13.9 10.6 21.3 2h-1.8l-6.4 7.4L8 2H2l7.8 11.3L2 22h1.8l6.8-7.8 5.4 7.8h6l-8.1-11.4Zm-2.4 2.8-.8-1.1L4.4 3.3h2.7l5 7.1.8 1.1 6.6 9.4h-2.7l-5.3-7.5Z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6.9 8.8H3.5V22h3.4V8.8ZM5.2 2.4a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1ZM22 14.4c0-3.5-1.9-5.8-4.9-5.8-2 0-3.1 1.1-3.6 1.9V8.8h-3.3V22h3.4v-6.5c0-1.7.3-3.4 2.5-3.4 2.1 0 2.1 2 2.1 3.5V22H22v-7.6Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
