export function BackToTopLink() {
  const handleBackToTop = (event) => {
    event.preventDefault()

    document.getElementById('top')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <a className="back-to-top-link" href="#top" onClick={handleBackToTop} aria-label="Back to top">
      <span className="back-to-top-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
        </svg>
      </span>
      <span>Back to top</span>
    </a>
  )
}
