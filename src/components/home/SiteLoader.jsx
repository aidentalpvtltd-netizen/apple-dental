export function SiteLoader({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return (
    <div className="site-loader" role="status" aria-live="polite">
      <div className="site-loader-card">
        <img
          className="site-loader-logo"
          src="/logo.webp"
          alt="Apple International Dental"
          width="160"
          height="160"
          decoding="async"
        />
        <img
          className="site-loader-gif"
          src="/loading/dentistry.webp"
          alt="Dental care loading animation"
          width="160"
          height="160"
          decoding="async"
          fetchPriority="low"
        />
        <p>Preparing your smile care experience...</p>
      </div>
    </div>
  )
}
