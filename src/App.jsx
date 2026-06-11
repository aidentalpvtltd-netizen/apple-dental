import { lazy, Suspense, useEffect, useState } from 'react'
import './styles/index.css'
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll.js'
import { locationSeoPages, locationSeoPaths } from './config/seoContent.js'

const bookingScrollStorageKey = 'appleDentalPendingBookingScroll'

const treatmentRoutePaths = new Set([
  '/specialist-dentistry/endodontics',
  '/specialist-dentistry/full-mouth-rehabilitation',
  '/specialist-dentistry/periodontics',
  '/specialist-dentistry/orthodontics',
  '/specialist-dentistry/oral-surgery',
  '/specialist-dentistry/pedodontics',
  '/digital-dentistry/cad-cam-solutions',
  '/digital-dentistry/intra-oral-scanning',
  '/digital-dentistry/digital-smile-design',
  '/digital-dentistry/digital-dental-implants',
  '/digital-dentistry/digital-opg-and-cbct',
  '/digital-dentistry/central-digital-lab',
  '/dental-implant-solutions/single-tooth-implant',
  '/dental-implant-solutions/multiple-implants',
  '/dental-implant-solutions/all-on-4-implants',
  '/dental-implant-solutions/full-mouth-implants',
  '/dental-implant-solutions/basal-implants',
  '/dental-implant-solutions/keyhole-implants',
  '/dental-implant-solutions/bone-grafting',
  '/dental-implant-solutions/soft-tissue-grafting',
  '/cosmetic-dentistry/dental-veneers',
  '/cosmetic-dentistry/gingival-depigmentation',
  '/cosmetic-dentistry/teeth-whitening',
  '/cosmetic-dentistry/3d-smile-designing',
  '/cosmetic-dentistry/smile-correction',
  '/general-dentistry/tooth-colored-fillings',
  '/general-dentistry/cleaning-and-polishing',
  '/general-dentistry/clips-and-braces-treatment',
  '/general-dentistry/aligners',
  '/general-dentistry/crowns-and-bridges',
  '/general-dentistry/root-canal-treatment',
  '/general-dentistry/complete-dentures',
  '/general-dentistry/partial-dentures',
  '/general-dentistry/over-dentures',
  '/general-dentistry/kids-dentistry',
  '/general-dentistry/tooth-extractions',
  '/general-dentistry/wisdom-molar-extraction',
  '/general-dentistry/gingival-flap-surgery',
  '/general-dentistry/frenectomy',
  '/general-dentistry/night-guard',
  '/general-dentistry/pit-and-fissure-sealants',
])

const AdminDashboard = lazy(() =>
  import('./pages/AdminDashboard.jsx').then((module) => ({ default: module.AdminDashboard })),
)
const ChatBotLauncher = lazy(() =>
  import('./components/ChatBotLauncher.jsx').then((module) => ({
    default: module.ChatBotLauncher,
  })),
)
const WhatsappLauncher = lazy(() =>
  import('./components/WhatsappLauncher.jsx').then((module) => ({
    default: module.WhatsappLauncher,
  })),
)
const CookiesPolicyPage = lazy(() =>
  import('./pages/CookiesPolicyPage.jsx').then((module) => ({
    default: module.CookiesPolicyPage,
  })),
)
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage.jsx').then((module) => ({
    default: module.PrivacyPolicyPage,
  })),
)
const RefundCancellationPolicyPage = lazy(() =>
  import('./pages/RefundCancellationPolicyPage.jsx').then((module) => ({
    default: module.RefundCancellationPolicyPage,
  })),
)
const FindClinicPage = lazy(() =>
  import('./pages/FindClinicPage.jsx').then((module) => ({ default: module.FindClinicPage })),
)
const SchemesPage = lazy(() =>
  import('./pages/SchemesPage.jsx').then((module) => ({ default: module.SchemesPage })),
)
const TermsConditionsPage = lazy(() =>
  import('./pages/TermsConditionsPage.jsx').then((module) => ({
    default: module.TermsConditionsPage,
  })),
)
const TreatmentPageRoute = lazy(() =>
  import('./pages/TreatmentPageRoute.jsx').then((module) => ({
    default: module.TreatmentPageRoute,
  })),
)
const WebsiteApp = lazy(() =>
  import('./pages/WebsiteApp.jsx').then((module) => ({ default: module.WebsiteApp })),
)
const LocationSeoPage = lazy(() =>
  import('./pages/LocationSeoPage.jsx').then((module) => ({ default: module.LocationSeoPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage.jsx').then((module) => ({ default: module.NotFoundPage })),
)

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
  const hasTreatmentPage = treatmentRoutePaths.has(normalizedPath)
  const hasLocationSeoPage = locationSeoPaths.includes(normalizedPath)
  const isStaticPublicPath =
    isSchemesPath ||
    isFindClinicPath ||
    isPrivacyPath ||
    isTermsPath ||
    isCookiesPath ||
    isRefundPath ||
    hasTreatmentPage ||
    hasLocationSeoPage
  const [isWebsiteLoading, setIsWebsiteLoading] = useState(!isStaticPublicPath)

  useLenisSmoothScroll({ enabled: !isAdminPath })

  /* useEffect(() => {
    const handleImageDragStart = (event) => {
      if (event.target instanceof Element && event.target.closest('img')) {
        event.preventDefault()
      }
    }

    window.addEventListener('dragstart', handleImageDragStart, { capture: true })

    return () => {
      window.removeEventListener('dragstart', handleImageDragStart, { capture: true })
    }
  }, []) */

  useEffect(() => {
    const scrollToBooking = () => {
      const target = document.getElementById('booking-form') ?? document.getElementById('booking')

      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    const handleBookingLinkClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null

      if (!anchor) {
        return
      }

      const targetUrl = new URL(anchor.href, window.location.href)

      if (targetUrl.origin !== window.location.origin || targetUrl.hash !== '#booking') {
        return
      }

      event.preventDefault()

      if (window.location.pathname === '/') {
        scrollToBooking()
        return
      }

      window.sessionStorage.setItem(bookingScrollStorageKey, 'true')
      window.location.assign('/')
    }

    window.addEventListener('click', handleBookingLinkClick)

    return () => window.removeEventListener('click', handleBookingLinkClick)
  }, [])

  useEffect(() => {
    const isContentProtectionEnabled = true

    if (!isContentProtectionEnabled) {
      return undefined
    }

    const blockedKeys = new Set(['F12'])
    const allowedEditableTags = new Set(['INPUT', 'TEXTAREA', 'SELECT'])
    let noticeTimer

    const showProtectionNotice = () => {
      const existingNotice = document.querySelector('.right-click-notice')

      if (existingNotice) {
        window.clearTimeout(noticeTimer)
        noticeTimer = window.setTimeout(() => existingNotice.remove(), 1800)
        return
      }

      const notice = document.createElement('div')
      notice.className = 'right-click-notice'
      notice.setAttribute('role', 'status')
      notice.textContent = 'Content protection is enabled on this website.'
      document.body.appendChild(notice)

      noticeTimer = window.setTimeout(() => notice.remove(), 1800)
    }

    const handleContextMenu = (event) => {
      event.preventDefault()
      showProtectionNotice()
    }

    const handleKeyDown = (event) => {
      const targetTag = event.target instanceof Element ? event.target.tagName : ''
      const isEditable =
        allowedEditableTags.has(targetTag) ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)

      if (isEditable) {
        return
      }

      const key = event.key.toUpperCase()
      const isDevToolsShortcut =
        blockedKeys.has(event.key) ||
        (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(key)) ||
        (event.ctrlKey && key === 'U')

      if (isDevToolsShortcut) {
        event.preventDefault()
        showProtectionNotice()
      }
    }

    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(noticeTimer)
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (isAdminPath) {
    return (
      <Suspense fallback={null}>
        <AdminDashboard />
      </Suspense>
    )
  }

  return (
    <>
      <Suspense fallback={null}>
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
        ) : hasTreatmentPage ? (
          <TreatmentPageRoute path={normalizedPath} />
        ) : hasLocationSeoPage ? (
          <LocationSeoPage page={locationSeoPages[normalizedPath]} path={normalizedPath} />
        ) : normalizedPath ? (
          <NotFoundPage />
        ) : (
          <WebsiteApp onLoadingChange={setIsWebsiteLoading} />
        )}
      </Suspense>
      {!isWebsiteLoading && (
        <Suspense fallback={null}>
          <ChatBotLauncher playMainSiteIntro={!isSchemesPath && !isFindClinicPath} />
          <WhatsappLauncher />
        </Suspense>
      )}
    </>
  )
}

export default App
