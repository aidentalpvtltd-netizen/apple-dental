import { useState } from 'react'
import './App.css'
import { ChatBotLauncher } from './components/ChatBotLauncher.jsx'
import { WhatsappLauncher } from './components/WhatsappLauncher.jsx'
import { treatmentPages } from './config/siteContent.js'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { SchemesPage } from './pages/SchemesPage.jsx'
import { TreatmentPage } from './pages/TreatmentPage.jsx'
import { WebsiteApp } from './pages/WebsiteApp.jsx'
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll.js'

function App() {
  const normalizedPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : ''
  const isSchemesPath = normalizedPath === '/schemes'
  const isAdminPath = normalizedPath === '/admin'
  const treatmentPage = treatmentPages[normalizedPath]
  const isStaticPublicPath = isSchemesPath || Boolean(treatmentPage)
  const [isWebsiteLoading, setIsWebsiteLoading] = useState(!isStaticPublicPath)

  useLenisSmoothScroll({ enabled: !isAdminPath })

  if (isAdminPath) {
    return <AdminDashboard />
  }

  return (
    <>
      {isSchemesPath ? (
        <SchemesPage />
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
    </>
  )
}

export default App
