import { schemePrograms, siteNavGroups } from '../config/siteContent.js'

export function SiteNav({ homePrefix = '' }) {
  const normalizedHomePrefix = homePrefix.replace(/\/$/, '')
  const schemesHref = `${normalizedHomePrefix}/schemes`

  return (
    <nav className="site-nav" aria-label="Site">
      {siteNavGroups.map((group) => (
        <div className="site-nav-item" key={group.label}>
          <button type="button" className="site-nav-trigger" aria-haspopup="true">
            {group.label}
          </button>
          <div className="site-nav-menu" role="menu">
            {group.items.map((item) => {
              const label = typeof item === 'string' ? item : item.label
              const href = typeof item === 'string' ? `${homePrefix}#booking` : item.href

              return (
                <a href={href} key={label} role="menuitem">
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      ))}
      <div className="site-nav-item">
        <a className="site-nav-trigger site-nav-link-trigger" href={schemesHref}>
          Schemes
        </a>
      </div>
      <div className="site-nav-item">
        <button type="button" className="site-nav-trigger">
          Blog
        </button>
      </div>
    </nav>
  )
}

export function SchemeLogoStrip({ schemes }) {
  return (
    <div className="hero-scheme-logos" aria-hidden="true">
      {schemes.map((schemeName) => {
        const scheme = schemePrograms.find((program) => program.shortName === schemeName)

        return scheme ? (
          <span key={scheme.shortName}>
            <img src={scheme.logo} alt="" />
          </span>
        ) : null
      })}
    </div>
  )
}
