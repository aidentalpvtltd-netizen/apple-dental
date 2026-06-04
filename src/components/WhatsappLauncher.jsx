import { branchContacts, getWhatsappLink } from '../config/siteContent.js'

function keepBranchListWheelInside(event) {
  const menu = event.currentTarget

  if (menu.scrollHeight <= menu.clientHeight) {
    return
  }

  const isScrollingUp = event.deltaY < 0
  const isScrollingDown = event.deltaY > 0
  const atTop = menu.scrollTop <= 0
  const atBottom = Math.ceil(menu.scrollTop + menu.clientHeight) >= menu.scrollHeight

  if ((isScrollingUp && atTop) || (isScrollingDown && atBottom)) {
    return
  }

  event.stopPropagation()
}

export function WhatsappLauncher() {
  return (
    <details className="whatsapp-launcher">
      <summary aria-label="Open WhatsApp branch options">
        <span className="whatsapp-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" focusable="false">
            <path d="M16.02 4.5C9.64 4.5 4.5 9.54 4.5 15.78c0 2.12.6 4.1 1.64 5.8L4.5 27.5l6.12-1.56a11.7 11.7 0 0 0 5.4 1.34c6.36 0 11.48-5.04 11.48-11.26S22.38 4.5 16.02 4.5Zm0 20.82c-1.78 0-3.44-.48-4.88-1.32l-.36-.22-3.62.92.96-3.42-.24-.36a9.22 9.22 0 0 1-1.44-4.94c0-5.14 4.3-9.34 9.58-9.34s9.56 4.2 9.56 9.34-4.28 9.34-9.56 9.34Zm5.24-6.98c-.28-.14-1.66-.8-1.92-.9-.26-.08-.44-.14-.64.14-.18.28-.74.9-.9 1.08-.16.18-.34.2-.62.06-.28-.14-1.2-.44-2.28-1.38-.84-.74-1.4-1.66-1.56-1.94-.16-.28-.02-.44.12-.58.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.04-.34-.02-.48-.08-.14-.64-1.5-.88-2.06-.22-.54-.46-.46-.64-.46h-.54c-.18 0-.48.06-.74.34-.26.28-.98.94-.98 2.3 0 1.36 1 2.68 1.14 2.86.14.18 1.98 2.96 4.78 4.14.66.28 1.18.46 1.58.58.66.2 1.28.18 1.76.1.54-.08 1.66-.66 1.9-1.3.24-.64.24-1.18.16-1.3-.08-.12-.26-.18-.54-.32Z" />
          </svg>
        </span>
      </summary>
      <div
        className="whatsapp-menu"
        aria-label="Choose a branch to message on WhatsApp"
        onWheel={keepBranchListWheelInside}
      >
        <div className="whatsapp-menu-header">
          <div>
            <span>Whatsapp us</span>
            <strong>Choose a branch</strong>
          </div>
          <button
            type="button"
            aria-label="Close WhatsApp branch options"
            onClick={(event) => {
              event.currentTarget.closest('details')?.removeAttribute('open')
            }}
          >
            x
          </button>
        </div>
        {branchContacts.map((contact) => (
          <a
            href={getWhatsappLink(contact.branch)}
            key={contact.branch}
            target="_blank"
            rel="noreferrer"
          >
            <span className="whatsapp-branch-label">
              <strong>{contact.area}</strong>
              <small>Apple International Dental</small>
            </span>
          </a>
        ))}
      </div>
    </details>
  )
}
