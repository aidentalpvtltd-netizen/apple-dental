import { useEffect, useState } from 'react'
import './styles/index.css'
import { ChatBotLauncher } from './components/ChatBotLauncher.jsx'
import { WhatsappLauncher } from './components/WhatsappLauncher.jsx'
import { treatmentPages } from './config/siteContent.js'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { CookiesPolicyPage } from './pages/CookiesPolicyPage.jsx'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.jsx'
import { RefundCancellationPolicyPage } from './pages/RefundCancellationPolicyPage.jsx'
import { FindClinicPage } from './pages/FindClinicPage.jsx'
import { SchemesPage } from './pages/SchemesPage.jsx'
import { TermsConditionsPage } from './pages/TermsConditionsPage.jsx'
import { TreatmentPage } from './pages/TreatmentPage.jsx'
import { WebsiteApp } from './pages/WebsiteApp.jsx'
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll.js'

function App() {
  const normalizedPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : ''
  const isSchemesPath = normalizedPath === '/schemes'
  const isFindClinicPath = normalizedPath === '/find-a-clinic'
  const isPrivacyPath = normalizedPath === '/privacy-policy'
  const isTermsPath = normalizedPath === '/terms-and-conditions'
  const isCookiesPath = normalizedPath === '/cookies-policy'
  const isRefundPath = normalizedPath === '/refund-and-cancellation-policy'
  const isAdminPath = normalizedPath === '/admin'
  const treatmentPage = treatmentPages[normalizedPath]
  const isStaticPublicPath =
    isSchemesPath ||
    isFindClinicPath ||
    isPrivacyPath ||
    isTermsPath ||
    isCookiesPath ||
    isRefundPath ||
    Boolean(treatmentPage)
  const [isWebsiteLoading, setIsWebsiteLoading] = useState(!isStaticPublicPath)

  useLenisSmoothScroll({ enabled: !isAdminPath })

  useEffect(() => {
    const handleImageDragStart = (event) => {
      if (event.target instanceof Element && event.target.closest('img')) {
        event.preventDefault()
      }
    }

    window.addEventListener('dragstart', handleImageDragStart, { capture: true })

    return () => {
      window.removeEventListener('dragstart', handleImageDragStart, { capture: true })
    }
  }, [])

  if (isAdminPath) {
    return <AdminDashboard />
  }

  return (
    <>
      {isSchemesPath ? (
        <SchemesPage />
      ) : isFindClinicPath ? (
        <FindClinicPage />
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
          <ChatBotLauncher playMainSiteIntro={!isSchemesPath && !isFindClinicPath} />
          <WhatsappLauncher />
        </>
      )}
    </>
  )
}

export default App
