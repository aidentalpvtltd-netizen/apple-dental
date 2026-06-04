import { useEffect, useRef, useState } from 'react'
import {
  BookingSection,
  BrandSection,
  ContactSection,
  DentistsSection,
  FaqSection,
  HeroSection,
  HomeHeader,
  AlignersSection,
  InstagramSection,
  KpiSection,
  ServicesOverview,
  SiteFooter,
  SiteLoader,
  TreatmentModal,
  TreatmentsSection,
  VideoTestimonialsSection,
  WhyChooseUsSection,
} from '../components/home/WebsiteSections.jsx'
import { AmbientDentalLayer } from '../components/AmbientDentalLayer.jsx'
import { useGsapParallaxDepth } from '../hooks/useGsapParallaxDepth.js'
import {
  treatments,
  treatmentInsights,
  clinicBranches,
  videoTestimonials,
  instagramPosts,
  instagramProfileUrl,
  instagramFeedEndpoint,
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

export function WebsiteApp({ onLoadingChange }) {
  const pageRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formState, setFormState] = useState(initialFormState)
  const [submittedFor, setSubmittedFor] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingLock, setBookingLock] = useState(getActiveBookingLock)
  const [activeTreatmentId, setActiveTreatmentId] = useState('')
  const [liveInstagramPosts, setLiveInstagramPosts] = useState([])
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
  const displayedInstagramPosts = liveInstagramPosts.length ? liveInstagramPosts : instagramPosts
  const carouselTestimonials = [...videoTestimonials, ...videoTestimonials.slice(0, 3)]

  useGsapParallaxDepth(pageRef, { enabled: !isLoading })

  useEffect(() => {
    onLoadingChange?.(isLoading)
  }, [isLoading, onLoadingChange])

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
    if (!instagramFeedEndpoint) {
      return undefined
    }

    let isMounted = true

    fetch(instagramFeedEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Instagram feed unavailable.')
        }

        return response.json()
      })
      .then((posts) => {
        if (!isMounted || !Array.isArray(posts)) {
          return
        }

        setLiveInstagramPosts(
          posts
            .map((post) => ({
              image: post.image ?? post.media_url ?? post.thumbnail_url,
              caption: post.caption ?? '',
              permalink: post.permalink ?? instagramProfileUrl,
            }))
            .filter((post) => post.image)
            .slice(0, 8),
        )
      })
      .catch(() => {
        if (isMounted) {
          setLiveInstagramPosts([])
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

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
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page-shell" id="top" ref={pageRef}>
      <SiteLoader isLoading={isLoading} />
      <AmbientDentalLayer />
      <HomeHeader />
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
        <BrandSection />
        <InstagramSection displayedInstagramPosts={displayedInstagramPosts} />
        <AlignersSection />
        <VideoTestimonialsSection
          carouselTestimonials={carouselTestimonials}
          testimonialSlideIndex={testimonialSlideIndex}
          testimonialMuted={testimonialMuted}
          onHoverChange={setIsTestimonialHovered}
          onMuteToggle={handleTestimonialMuteToggle}
        />
        <DentistsSection />
        <WhyChooseUsSection />
        <FaqSection />
        <ContactSection selectedClinic={selectedClinic} onClinicChange={handleClinicChange} />
      </div>

      <SiteFooter />
    </main>
  )
}
