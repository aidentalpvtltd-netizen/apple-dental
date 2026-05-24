import { useEffect, useState } from 'react'
import './App.css'
import { ChatBotLauncher } from './components/ChatBotLauncher.jsx'
import { WhatsappLauncher } from './components/WhatsappLauncher.jsx'
import { treatmentPages } from './config/siteContent.js'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { CookiesPolicyPage } from './pages/CookiesPolicyPage.jsx'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.jsx'
import { RefundCancellationPolicyPage } from './pages/RefundCancellationPolicyPage.jsx'
import { SchemesPage } from './pages/SchemesPage.jsx'
import { TermsConditionsPage } from './pages/TermsConditionsPage.jsx'
import { TreatmentPage } from './pages/TreatmentPage.jsx'
import { WebsiteApp } from './pages/WebsiteApp.jsx'
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll.js'

function App() {
  const normalizedPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : ''
  const isSchemesPath = normalizedPath === '/schemes'
  const isPrivacyPath = normalizedPath === '/privacy-policy'
  const isTermsPath = normalizedPath === '/terms-and-conditions'
  const isCookiesPath = normalizedPath === '/cookies-policy'
  const isRefundPath = normalizedPath === '/refund-and-cancellation-policy'
  const isAdminPath = normalizedPath === '/admin'
  const treatmentPage = treatmentPages[normalizedPath]
  const isStaticPublicPath =
    isSchemesPath ||
    isPrivacyPath ||
    isTermsPath ||
    isCookiesPath ||
    isRefundPath ||
    Boolean(treatmentPage)
  const [isWebsiteLoading, setIsWebsiteLoading] = useState(!isStaticPublicPath)
  const [rightClickNotice, setRightClickNotice] = useState(null)

  useLenisSmoothScroll({ enabled: !isAdminPath })

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault()
      setRightClickNotice({
        id: Date.now(),
        message: 'Right click disabled',
        x: event.clientX,
        y: event.clientY,
      })
    }

    const handleProtectedShortcuts = (event) => {
      const key = event.key.toLowerCase()
      const isBlockedShortcut =
        event.key === 'F12' ||
        (event.ctrlKey && event.shiftKey && ['i', 'j'].includes(key)) ||
        (event.ctrlKey && ['s', 'u'].includes(key))

      if (isBlockedShortcut) {
        event.preventDefault()
        setRightClickNotice({
          id: Date.now(),
          message: 'Dev tools disabled',
          x: window.innerWidth / 2,
          y: 96,
        })
      }
    }

    const handleImageDragStart = (event) => {
      if (event.target instanceof Element && event.target.closest('img')) {
        event.preventDefault()
      }
    }

    window.addEventListener('contextmenu', handleContextMenu, { capture: true })
    window.addEventListener('keydown', handleProtectedShortcuts, { capture: true })
    window.addEventListener('dragstart', handleImageDragStart, { capture: true })

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, { capture: true })
      window.removeEventListener('keydown', handleProtectedShortcuts, { capture: true })
      window.removeEventListener('dragstart', handleImageDragStart, { capture: true })
    }
  }, [])

  useEffect(() => {
    if (!rightClickNotice) {
      return undefined
    }

    const noticeTimer = window.setTimeout(() => {
      setRightClickNotice(null)
    }, 1400)

    return () => window.clearTimeout(noticeTimer)
  }, [rightClickNotice])

  if (isAdminPath) {
    return <AdminDashboard />
  }

  return (
    <>
      {isSchemesPath ? (
        <SchemesPage />
      ) : isPrivacyPath ? (
        <PrivacyPolicyPage />
      ) : isTermsPath ? (
        <TermsConditionsPage />
      ) : isCookiesPath ? (
        <CookiesPolicyPage />
      ) : isRefundPath ? (
        <RefundCancellationPolicyPage />
      ) : treatmentPage ? (
        <TreatmentPage page={treatmentPage} />
      ) : (
        <WebsiteApp onLoadingChange={setIsWebsiteLoading} />
      )}
      {!isWebsiteLoading && (
        <>
          <ChatBotLauncher playMainSiteIntro={!isSchemesPath} />
          <WhatsappLauncher />
        </>
      )}
      {rightClickNotice && (
        <div
          className="right-click-notice"
          style={{
            '--notice-x': `${rightClickNotice.x}px`,
            '--notice-y': `${rightClickNotice.y}px`,
          }}
          role="status"
          aria-live="polite"
        >
          {rightClickNotice.message}
        </div>
      )}
    </>
  )
}

export default App
