import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BookingSection } from '../components/home/BookingSection.jsx'
import { HeroSection } from '../components/home/HeroSection.jsx'
import { HomeHeader } from '../components/home/HomeHeader.jsx'
import { KpiSection } from '../components/home/KpiSection.jsx'
import { ServicesOverview } from '../components/home/ServicesOverview.jsx'
import { SiteLoader } from '../components/home/SiteLoader.jsx'
import { TreatmentModal } from '../components/home/TreatmentModal.jsx'
import { TreatmentsSection } from '../components/home/TreatmentsSection.jsx'
import { ComingSoonPopup } from '../components/ComingSoonPopup.jsx'
import { useGsapParallaxDepth } from '../hooks/useGsapParallaxDepth.js'
import {
  treatments,
  treatmentInsights,
  clinicBranches,
  videoTestimonials,
  bookingEndpoint,
  formspreeEndpoint,
  consultationFeeAmount,
  onlineConsultationFeeAmount,
  loaderMinimumDuration,
  loaderMaximumDuration,
  consultationTreatments,
  onlinePaymentMethod,
  payAtClinicPaymentMethod,
  initialFormState,
  preloadImage,
  getPreloadImages,
  getActiveBookingLock,
  recordBookingSubmission,
  formatBookingCooldown,
  getTodayDateValue,
  submitFormToFormspree,
  submitBookingToSheets,
  collectConsultationPayment,
} from '../config/siteContent.js'

const BrandSection = lazy(() =>
  import('../components/home/BrandSection.jsx').then((module) => ({
    default: module.BrandSection,
  })),
)
const AmbientDentalLayer = lazy(() =>
  import('../components/AmbientDentalLayer.jsx').then((module) => ({
    default: module.AmbientDentalLayer,
  })),
)
const InstagramSection = lazy(() =>
  import('../components/home/InstagramSection.jsx').then((module) => ({
    default: module.InstagramSection,
  })),
)
const AlignersSection = lazy(() =>
  import('../components/home/AlignersSection.jsx').then((module) => ({
    default: module.AlignersSection,
  })),
)
const VideoTestimonialsSection = lazy(() =>
  import('../components/home/VideoTestimonialsSection.jsx').then((module) => ({
    default: module.VideoTestimonialsSection,
  })),
)
const DentistsSection = lazy(() =>
  import('../components/home/DentistsSection.jsx').then((module) => ({
    default: module.DentistsSection,
  })),
)
const WhyChooseUsSection = lazy(() =>
  import('../components/home/WhyChooseUsSection.jsx').then((module) => ({
    default: module.WhyChooseUsSection,
  })),
)
const FaqSection = lazy(() =>
  import('../components/home/FaqSection.jsx').then((module) => ({
    default: module.FaqSection,
  })),
)
const ContactSection = lazy(() =>
  import('../components/home/ContactSection.jsx').then((module) => ({
    default: module.ContactSection,
  })),
)
const SiteFooter = lazy(() =>
  import('../components/home/SiteFooter.jsx').then((module) => ({
    default: module.SiteFooter,
  })),
)

function VisibleLazySection({ children }) {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current

    if (!wrapper) {
      return undefined
    }

    const markVisible = () => {
      wrapper.querySelectorAll('.reveal-section').forEach((element) => {
        element.classList.add('visible')
      })
    }

    markVisible()

    const observer = new MutationObserver(markVisible)
    observer.observe(wrapper, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return <div ref={wrapperRef}>{children}</div>
}

function LazyWhenVisible({ children, minHeight = 240 }) {
  const placeholderRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (shouldRender) {
      return undefined
    }

    const placeholder = placeholderRef.current

    if (!placeholder || !('IntersectionObserver' in window)) {
      setShouldRender(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '900px 0px' },
    )

    observer.observe(placeholder)

    return () => observer.disconnect()
  }, [shouldRender])

  if (!shouldRender) {
    return <div ref={placeholderRef} aria-hidden="true" style={{ minHeight }} />
  }

  return (
    <VisibleLazySection>
      <Suspense fallback={<div aria-hidden="true" style={{ minHeight }} />}>{children}</Suspense>
    </VisibleLazySection>
  )
}

export function WebsiteApp({ onLoadingChange }) {
  const pageRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formState, setFormState] = useState(initialFormState)
  const [submittedFor, setSubmittedFor] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentModalState, setPaymentModalState] = useState('idle')
  const [shouldRenderAmbient, setShouldRenderAmbient] = useState(false)
  const [bookingLock, setBookingLock] = useState(getActiveBookingLock)
  const [activeTreatmentId, setActiveTreatmentId] = useState('')
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0)
  const [testimonialSlideIndex, setTestimonialSlideIndex] = useState(0)
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false)
  const [testimonialMuted, setTestimonialMuted] = useState(() =>
    Object.fromEntries(videoTestimonials.map((testimonial) => [testimonial.id, true])),
  )

  const selectedTreatment =
    consultationTreatments.find((treatment) => treatment.id === formState.treatment) ??
    consultationTreatments[0]
  const activeTreatment = treatments.find((treatment) => treatment.id === activeTreatmentId)
  const activeTreatmentInsight = activeTreatment ? treatmentInsights[activeTreatment.id] : null
  const selectedClinic = clinicBranches[selectedClinicIndex] ?? clinicBranches[0]
  const confirmationTreatment = submittedFor || bookingLock?.treatmentName
  const isBookingLocked = Boolean(bookingLock)
  const isFormDisabled = isSubmitting || isBookingLocked
  const bookingCooldown = bookingLock ? formatBookingCooldown(bookingLock.submittedAt) : ''
  const todayDateValue = getTodayDateValue()
  const requiresSlotSelection = !isBookingLocked && (!formState.date || !formState.timeSlot)
  const carouselTestimonials = [...videoTestimonials, ...videoTestimonials.slice(0, 3)]
  const isPaymentModalOpen = paymentModalState !== 'idle'
  const isPaymentSuccess = paymentModalState === 'success'

  useGsapParallaxDepth(pageRef, { enabled: !isLoading })

  useEffect(() => {
    onLoadingChange?.(isLoading)
  }, [isLoading, onLoadingChange])

  useEffect(() => {
    if (isLoading) {
      return undefined
    }

    if ('requestIdleCallback' in window) {
      const ambientTimer = window.requestIdleCallback(() => setShouldRenderAmbient(true), {
        timeout: 1200,
      })

      return () => window.cancelIdleCallback(ambientTimer)
    }

    const ambientTimer = window.setTimeout(() => setShouldRenderAmbient(true), 1200)

    return () => window.clearTimeout(ambientTimer)
  }, [isLoading])

  useEffect(() => {
    if (isLoading || !window.location.hash) {
      return undefined
    }

    const targetId = window.location.hash.slice(1)

    const scrollTimer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 120)

    return () => window.clearTimeout(scrollTimer)
  }, [isLoading])

  const handleClinicChange = (direction) => {
    setSelectedClinicIndex((current) =>
      (current + direction + clinicBranches.length) % clinicBranches.length,
    )
  }

  const handleTestimonialMuteToggle = (testimonialId) => {
    setTestimonialMuted((current) => ({
      ...current,
      [testimonialId]: !current[testimonialId],
    }))
  }

  useEffect(() => {
    let isMounted = true

    const minimumLoader = new Promise((resolve) => {
      window.setTimeout(resolve, loaderMinimumDuration)
    })

    const maximumLoader = new Promise((resolve) => {
      window.setTimeout(resolve, loaderMaximumDuration)
    })

    const imagePreload = Promise.allSettled(getPreloadImages().map(preloadImage))

    Promise.race([Promise.all([minimumLoader, imagePreload]), maximumLoader]).then(() => {
      if (isMounted) {
        setIsLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (isTestimonialHovered) {
      return undefined
    }

    const slideTimer = window.setInterval(() => {
      setTestimonialSlideIndex((current) => (current + 1) % videoTestimonials.length)
    }, 3600)

    return () => window.clearInterval(slideTimer)
  }, [isTestimonialHovered])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-section')

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!activeTreatmentId) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveTreatmentId('')
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [activeTreatmentId])

  const handleChange = ({ target: { name, value } }) => {
    const nextValue =
      name === 'phone'
        ? value.replace(/\D/g, '').slice(0, 10)
          : value

    setFormState((current) => ({
      ...current,
      [name]: nextValue,
      ...(name === 'branch' || name === 'date' ? { timeSlot: '' } : {}),
    }))
    setSubmitError('')
  }

  const handleTimeSlotSelect = (timeSlot) => {
    setFormState((current) => ({
      ...current,
      timeSlot,
    }))
    setSubmitError('')
  }

  const handleBookTreatment = (treatmentId) => {
    if (!isBookingLocked) {
      setFormState((current) => ({
        ...current,
        treatment: treatmentId,
      }))
      setSubmittedFor('')
      setSubmitError('')
    }

    document.getElementById('booking-form')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleTreatmentKeyDown = (event, treatmentId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setActiveTreatmentId(treatmentId)
    }
  }

  const handleModalBooking = (treatmentId) => {
    setActiveTreatmentId('')
    setTimeout(() => handleBookTreatment(treatmentId), 0)
  }

  const handleDateFieldClick = (event) => {
    const dateInput = event.currentTarget.querySelector('input[type="date"]')

    dateInput?.focus()
    dateInput?.showPicker?.()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isBookingLocked) {
      return
    }

    const treatmentName = selectedTreatment.name
    const branchName = formState.branch
    const isPayAtClinic = formState.paymentMethod === payAtClinicPaymentMethod
    const selectedFee = isPayAtClinic ? consultationFeeAmount : onlineConsultationFeeAmount

    if (requiresSlotSelection) {
      setSubmitError('Please choose a preferred date and time before sending the request.')
      return
    }

    setIsSubmitting(true)
    setSubmittedFor('')
    setSubmitError('')

    try {
      let paymentDetails = {
        paymentMethod: formState.paymentMethod || onlinePaymentMethod,
        paymentStatus: isPayAtClinic ? 'Payment due at clinic' : 'Pending',
        paymentAmount: selectedFee,
      }

      if (bookingEndpoint) {
        if (!isPayAtClinic) {
          paymentDetails = await collectConsultationPayment({
            name: formState.name,
            phone: formState.phone,
            email: '',
            branch: branchName,
            source: 'Website consultation',
            onProcessingPayment: () => setPaymentModalState('processing'),
          })
        }

        await submitBookingToSheets({
          formState: {
            ...formState,
            ...paymentDetails,
          },
          treatmentName,
          branchName,
        })

        if (formspreeEndpoint) {
          submitFormToFormspree({
            form: event.currentTarget,
            formName: 'Consultation request',
            metadata: {
              treatment_name: treatmentName,
              branch_name: branchName,
              appointment_time: formState.timeSlot,
              source: 'Apple International Dental website',
              payment_status: paymentDetails.paymentStatus,
              payment_amount: String(paymentDetails.paymentAmount),
              payment_id: paymentDetails.paymentId || '',
            },
          }).catch(() => {})
        }
      } else {
        await submitFormToFormspree({
          form: event.currentTarget,
          formName: 'Consultation request',
          metadata: {
            treatment_name: treatmentName,
            branch_name: branchName,
            appointment_time: formState.timeSlot,
            source: 'Apple International Dental website',
            payment_status: paymentDetails.paymentStatus,
            payment_amount: String(paymentDetails.paymentAmount),
          },
        })
      }

      const nextBookingLock = recordBookingSubmission({
        treatmentName,
        branchName,
      })

      setBookingLock(nextBookingLock)
      setSubmittedFor(treatmentName)
      setFormState(initialFormState)

      if (!isPayAtClinic) {
        setPaymentModalState('success')
        await new Promise((resolve) => {
          window.setTimeout(resolve, 2400)
        })
      }
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setPaymentModalState('idle')
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-shell" id="top" ref={pageRef}>
      <SiteLoader isLoading={isLoading} />
      {shouldRenderAmbient ? (
        <Suspense fallback={null}>
          <AmbientDentalLayer />
        </Suspense>
      ) : null}
      <HomeHeader />
      <ComingSoonPopup
        eyebrow={isPaymentSuccess ? 'Payment complete' : 'Payment verification'}
        isDismissible={false}
        isOpen={isPaymentModalOpen}
        message={
          isPaymentSuccess
            ? 'Your payment is verified and your appointment request has been sent to the clinic.'
            : 'Please wait while we verify your payment and send your appointment request to the clinic.'
        }
        onClose={() => {}}
        title={isPaymentSuccess ? 'Payment successful' : 'Completing payment process'}
        variant={isPaymentSuccess ? 'success' : 'processing'}
      />
      <HeroSection />

      <div className="content-shell">
        <KpiSection />
        <ServicesOverview />
        <TreatmentsSection
          selectedTreatmentId={formState.treatment}
          onTreatmentOpen={setActiveTreatmentId}
          onTreatmentKeyDown={handleTreatmentKeyDown}
        />
        <BookingSection
          selectedTreatment={selectedTreatment}
          formState={formState}
          isFormDisabled={isFormDisabled}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleDateFieldClick={handleDateFieldClick}
          todayDateValue={todayDateValue}
          handleTimeSlotSelect={handleTimeSlotSelect}
          isSubmitting={isSubmitting}
          requiresSlotSelection={requiresSlotSelection}
          isBookingLocked={isBookingLocked}
          submitError={submitError}
          confirmationTreatment={confirmationTreatment}
          bookingLock={bookingLock}
          bookingCooldown={bookingCooldown}
        />
        <TreatmentModal
          activeTreatment={activeTreatment}
          activeTreatmentInsight={activeTreatmentInsight}
          onClose={() => setActiveTreatmentId('')}
          onBookTreatment={handleModalBooking}
        />
        <LazyWhenVisible minHeight={300}>
          <BrandSection />
        </LazyWhenVisible>
        <LazyWhenVisible minHeight={420}>
          <InstagramSection />
        </LazyWhenVisible>
        <LazyWhenVisible minHeight={520}>
          <AlignersSection />
        </LazyWhenVisible>
        <LazyWhenVisible minHeight={520}>
          <VideoTestimonialsSection
            carouselTestimonials={carouselTestimonials}
            testimonialSlideIndex={testimonialSlideIndex}
            testimonialMuted={testimonialMuted}
            onHoverChange={setIsTestimonialHovered}
            onMuteToggle={handleTestimonialMuteToggle}
          />
        </LazyWhenVisible>
        <LazyWhenVisible minHeight={520}>
          <DentistsSection />
        </LazyWhenVisible>
        <LazyWhenVisible minHeight={420}>
          <WhyChooseUsSection />
        </LazyWhenVisible>
        <LazyWhenVisible minHeight={360}>
          <FaqSection />
        </LazyWhenVisible>
        <LazyWhenVisible minHeight={520}>
          <ContactSection selectedClinic={selectedClinic} onClinicChange={handleClinicChange} />
        </LazyWhenVisible>
      </div>

      <LazyWhenVisible minHeight={180}>
        <SiteFooter />
      </LazyWhenVisible>
    </main>
  )
}
