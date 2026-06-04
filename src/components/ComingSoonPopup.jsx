import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function ComingSoonPopup({ eyebrow, isOpen, message, onClose, title = 'Coming soon' }) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="coming-soon-overlay" role="presentation" onClick={onClose}>
      <div
        className="coming-soon-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="coming-soon-close"
          type="button"
          aria-label="Close coming soon popup"
          onClick={onClose}
        >
          x
        </button>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id="coming-soon-title">{title}</h2>
        <p>{message}</p>
      </div>
    </div>,
    document.body,
  )
}
