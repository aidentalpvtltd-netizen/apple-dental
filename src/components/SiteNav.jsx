import { schemePrograms, siteNavGroups } from '../config/siteContent.js'

export function SiteNav({ homePrefix = '' }) {
  return (
    <nav className="site-nav" aria-label="Site">
      {siteNavGroups.map((group) => (
        <div className="site-nav-item" key={group.label}>
          <button type="button" className="site-nav-trigger" aria-haspopup="true">
            {group.label}
          </button>
          <div className="site-nav-menu" role="menu">
            {group.items.map((item) => (
              <a href={`${homePrefix}#booking`} key={item} role="menuitem">
                {item}
              </a>
            ))}
          </div>
        </div>
      ))}
      <div className="site-nav-item">
        <a className="site-nav-trigger site-nav-link-trigger" href={`${homePrefix}/schemes`}>
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
