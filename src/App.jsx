import { useState } from 'react'
import './App.css'
import { ChatBotLauncher } from './components/ChatBotLauncher.jsx'
import { WhatsappLauncher } from './components/WhatsappLauncher.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'
import { SchemesPage } from './pages/SchemesPage.jsx'
import { WebsiteApp } from './pages/WebsiteApp.jsx'

function App() {
  const normalizedPath =
    typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : ''
  const isSchemesPath = normalizedPath === '/schemes'
  const [isWebsiteLoading, setIsWebsiteLoading] = useState(!isSchemesPath)

  if (normalizedPath === '/admin') {
    return <AdminDashboard />
  }

  return (
    <>
      {isSchemesPath ? (
        <SchemesPage />
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
