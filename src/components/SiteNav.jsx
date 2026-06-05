import { useEffect, useState } from 'react'
import { ComingSoonPopup } from './ComingSoonPopup.jsx'
import { schemePrograms, siteNavGroups } from '../config/siteContent.js'

export function SiteNav({ homePrefix = '' }) {
  const normalizedHomePrefix = homePrefix.replace(/\/$/, '')
  const schemesHref = `${normalizedHomePrefix}/schemes`
  const findClinicHref = `${normalizedHomePrefix}/find-a-clinic`
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState('')
  const [isBlogNoticeOpen, setIsBlogNoticeOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setOpenGroup('')
      }
    }

    const handleWideViewport = () => {
      if (window.innerWidth > 1440) {
        setIsMenuOpen(false)
        setOpenGroup('')
      }
    }

    window.addEventListener('keydown', handleEscape)
    window.addEventListener('resize', handleWideViewport)

    return () => {
      window.removeEventListener('keydown', handleEscape)
      window.removeEventListener('resize', handleWideViewport)
    }
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setOpenGroup('')
  }

  const handleBlogClick = () => {
    closeMenu()
    setIsBlogNoticeOpen(true)
  }

  return (
    <>
      <button
        className={`site-nav-toggle${isMenuOpen ? ' open' : ''}`}
        type="button"
        aria-controls="site-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => {
          setIsMenuOpen((current) => !current)
          setOpenGroup('')
        }}
      >
        <span className="site-nav-toggle-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>Menu</span>
      </button>
      <nav className={`site-nav${isMenuOpen ? ' open' : ''}`} aria-label="Site" id="site-navigation">
        {siteNavGroups.map((group) => (
          <div className={`site-nav-item${openGroup === group.label ? ' is-open' : ''}`} key={group.label}>
            <button
              type="button"
              className="site-nav-trigger"
              aria-haspopup="true"
              aria-expanded={openGroup === group.label}
              onClick={() => setOpenGroup((current) => (current === group.label ? '' : group.label))}
            >
              {group.label}
              <span className="site-nav-caret" aria-hidden="true" />
            </button>
            <div className="site-nav-menu" role="menu">
              {group.items.map((item) => {
                const label = typeof item === 'string' ? item : item.label
                const href = typeof item === 'string' ? `${homePrefix}#booking` : item.href

                return (
                  <a href={href} key={label} onClick={closeMenu} role="menuitem">
                    {label}
                  </a>
                )
              })}
            </div>
          </div>
        ))}
        <div className="site-nav-item">
          <a className="site-nav-trigger site-nav-link-trigger" href={schemesHref} onClick={closeMenu}>
            Schemes
          </a>
        </div>
        <div className="site-nav-item">
          <a className="site-nav-trigger site-nav-link-trigger" href={findClinicHref} onClick={closeMenu}>
            Find a Clinic
          </a>
        </div>
        <div className="site-nav-item">
          <button type="button" className="site-nav-trigger" onClick={handleBlogClick}>
            Blog
          </button>
        </div>
      </nav>
      <ComingSoonPopup
        eyebrow="Apple Dental Blog"
        isOpen={isBlogNoticeOpen}
        message="We are preparing helpful dental care articles, clinic updates, and treatment guides. Please check back shortly."
        onClose={() => setIsBlogNoticeOpen(false)}
      />
    </>
  )
}

export function SchemeLogoStrip({ schemes }) {
  return (
    <div className="hero-scheme-logos" aria-hidden="true">
      {schemes.map((schemeName) => {
        const scheme = schemePrograms.find((program) => program.shortName === schemeName)

        return scheme ? (
          <span key={scheme.shortName}>
            <img
              src={scheme.logo}
              alt=""
              width="96"
              height="96"
              loading="lazy"
              decoding="async"
            />
          </span>
        ) : null
      })}
    </div>
  )
}
