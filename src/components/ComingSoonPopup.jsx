import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function ComingSoonPopup({
  eyebrow,
  isDismissible = true,
  isOpen,
  message,
  onClose,
  title = 'Coming soon',
  variant = 'default',
}) {
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
      if (event.key === 'Escape' && isDismissible) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => window.removeEventListener('keydown', handleEscape)
  }, [isDismissible, isOpen, onClose])

  if (!isOpen || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className="coming-soon-overlay"
      role="presentation"
      onClick={isDismissible ? onClose : undefined}
    >
      <div
        className={`coming-soon-dialog${isDismissible ? '' : ' processing-dialog'} ${
          variant === 'success' ? 'success-dialog' : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        onClick={(event) => event.stopPropagation()}
      >
        {isDismissible ? (
          <button
            className="coming-soon-close"
            type="button"
            aria-label="Close coming soon popup"
            onClick={onClose}
          >
            x
          </button>
        ) : null}
        {variant === 'success' ? (
          <span className="payment-success-check" aria-hidden="true">
            ✓
          </span>
        ) : null}
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 id="coming-soon-title">{title}</h2>
        <p>{message}</p>
        {!isDismissible && variant !== 'success' ? (
          <span className="processing-spinner" aria-hidden="true" />
        ) : null}
      </div>
    </div>,
    document.body,
  )
}
