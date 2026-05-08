export function SiteLoader({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return (
    <div className="site-loader" role="status" aria-live="polite">
      <div className="site-loader-card">
        <img className="site-loader-logo" src="/logo.png" alt="Apple International Dental" />
        <img className="site-loader-gif" src="/loading/dentistry.gif" alt="" aria-hidden="true" />
        <p>Preparing your smile care experience...</p>
      </div>
    </div>
  )
}
