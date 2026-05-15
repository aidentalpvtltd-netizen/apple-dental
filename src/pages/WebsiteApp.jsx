import { useEffect, useRef, useState } from 'react'
import {
  BookingSection,
  BrandSection,
  ContactSection,
  DentistsSection,
  FaqSection,
  HeroSection,
  HomeHeader,
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
  loaderMinimumDuration,
  loaderMaximumDuration,
  concernWordLimit,
  availabilityRefreshMs,
  onlinePaymentMethod,
  initialFormState,
  limitWords,
  preloadImage,
  getPreloadImages,
  getActiveBookingLock,
  recordBookingSubmission,
  formatBookingCooldown,
  getTodayDateValue,
  getAvailabilityKey,
  getDateAvailability,
  getDateSuggestions,
  fetchBookingAvailability,
  fetchBookingAvailabilityRange,
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
  const [bookingAvailability, setBookingAvailability] = useState({})
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false)
  const [availabilityError, setAvailabilityError] = useState('')
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0)
  const [testimonialSlideIndex, setTestimonialSlideIndex] = useState(0)
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false)
  const [testimonialMuted, setTestimonialMuted] = useState(() =>
    Object.fromEntries(videoTestimonials.map((testimonial) => [testimonial.id, true])),
  )

  const selectedTreatment =
    treatments.find((treatment) => treatment.id === formState.treatment) ?? treatments[0]
  const activeTreatment = treatments.find((treatment) => treatment.id === activeTreatmentId)
  const activeTreatmentInsight = activeTreatment ? treatmentInsights[activeTreatment.id] : null
  const selectedClinic = clinicBranches[selectedClinicIndex] ?? clinicBranches[0]
  const confirmationTreatment = submittedFor || bookingLock?.treatmentName
  const isBookingLocked = Boolean(bookingLock)
  const isFormDisabled = isSubmitting || isBookingLocked
  const bookingCooldown = bookingLock ? formatBookingCooldown(bookingLock.submittedAt) : ''
  const todayDateValue = getTodayDateValue()
  const selectedDateAvailability = getDateAvailability(
    formState.branch,
    formState.date,
    bookingAvailability,
  )
  const suggestedDates = getDateSuggestions(formState.branch, bookingAvailability)
  const hasAvailableSelectedDate =
    Boolean(formState.date) &&
    !selectedDateAvailability.isPast &&
    !selectedDateAvailability.isClosed &&
    !selectedDateAvailability.isFullyBooked
  const requiresSlotSelection = !isBookingLocked && (!hasAvailableSelectedDate || !formState.timeSlot)
  const appointmentStatusMessage = formState.date
    ? isAvailabilityLoading
      ? 'Checking the latest appointment slots...'
      : selectedDateAvailability.isPast
      ? 'Past dates are unavailable. Please choose today or a future date.'
      : selectedDateAvailability.isClosed
        ? 'This branch is closed on the selected date.'
        : 'All consultation slots are currently open for appointment requests.'
    : 'Select a date to view available time slots.'
  const displayedInstagramPosts = liveInstagramPosts.length ? liveInstagramPosts : instagramPosts
  const carouselTestimonials = [...videoTestimonials, ...videoTestimonials.slice(0, 3)]

  useGsapParallaxDepth(pageRef, { enabled: !isLoading })

  useEffect(() => {
    onLoadingChange?.(isLoading)
  }, [isLoading, onLoadingChange])

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
              title: post.title ?? 'Instagram post',
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
    if (!bookingEndpoint || !formState.branch) {
      return undefined
    }

    let isMounted = true

    const refreshAvailability = () => {
      setIsAvailabilityLoading(true)
      setAvailabilityError('')

      fetchBookingAvailabilityRange({
        branch: formState.branch,
        startDate: todayDateValue,
        days: 8,
      })
        .then((daysAvailability) => {
          if (!isMounted) {
            return
          }

          setBookingAvailability((current) => {
            const nextAvailability = { ...current }

            daysAvailability.forEach((day) => {
              if (day.date) {
                nextAvailability[getAvailabilityKey(formState.branch, day.date)] = day
              }
            })

            return nextAvailability
          })
        })
        .catch(() => {
          if (isMounted) {
            setAvailabilityError('Live slot sync is temporarily unavailable. Please try again.')
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsAvailabilityLoading(false)
          }
        })
    }

    refreshAvailability()
    const refreshInterval = window.setInterval(refreshAvailability, availabilityRefreshMs)

    return () => {
      isMounted = false
      window.clearInterval(refreshInterval)
    }
  }, [formState.branch, todayDateValue])

  useEffect(() => {
    if (!bookingEndpoint || !formState.branch || !formState.date) {
      return undefined
    }

    let isMounted = true

    const refreshSelectedDateAvailability = () => {
      setIsAvailabilityLoading(true)
      setAvailabilityError('')

      fetchBookingAvailability({
        branch: formState.branch,
        date: formState.date,
      })
        .then((dateAvailability) => {
          if (!isMounted || !dateAvailability) {
            return
          }

          setBookingAvailability((current) => ({
            ...current,
            [getAvailabilityKey(formState.branch, formState.date)]: dateAvailability,
          }))
        })
        .catch(() => {
          if (isMounted) {
            setAvailabilityError('Live slot sync is temporarily unavailable. Please try again.')
          }
        })
        .finally(() => {
          if (isMounted) {
            setIsAvailabilityLoading(false)
          }
        })
    }

    refreshSelectedDateAvailability()

    return () => {
      isMounted = false
    }
  }, [formState.branch, formState.date])

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
        : name === 'referredBy'
          ? value.replace(/[^A-Za-z ]/g, '')
          : name === 'email'
            ? value.trim()
          : name === 'concern'
            ? limitWords(value, concernWordLimit)
          : value

    setFormState((current) => ({
      ...current,
      [name]: nextValue,
      ...(name === 'branch' || name === 'date' ? { timeSlot: '' } : {}),
    }))
    setSubmitError('')
  }

  const handleDateSuggestion = (dateValue) => {
    setFormState((current) => ({
      ...current,
      date: dateValue,
      timeSlot: '',
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

    if (requiresSlotSelection) {
      setSubmitError('Please choose an available date and time slot before sending the request.')
      return
    }

    setIsSubmitting(true)
    setSubmittedFor('')
    setSubmitError('')

    try {
      let paymentDetails = {
        paymentMethod: onlinePaymentMethod,
        paymentStatus: 'Pending',
        paymentAmount: consultationFeeAmount,
      }

      if (bookingEndpoint) {
        paymentDetails = await collectConsultationPayment({
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          branch: branchName,
          source: 'Website consultation',
        })

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
          suggestedDates={suggestedDates}
          handleDateSuggestion={handleDateSuggestion}
          hasAvailableSelectedDate={hasAvailableSelectedDate}
          appointmentStatusMessage={appointmentStatusMessage}
          availabilityError={availabilityError}
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
        <VideoTestimonialsSection
          carouselTestimonials={carouselTestimonials}
          testimonialSlideIndex={testimonialSlideIndex}
          testimonialMuted={testimonialMuted}
          onHoverChange={setIsTestimonialHovered}
          onMuteToggle={handleTestimonialMuteToggle}
        />
        <InstagramSection displayedInstagramPosts={displayedInstagramPosts} />
        <DentistsSection />
        <WhyChooseUsSection />
        <FaqSection />
        <ContactSection selectedClinic={selectedClinic} onClinicChange={handleClinicChange} />
      </div>

      <SiteFooter />
    </main>
  )
}
