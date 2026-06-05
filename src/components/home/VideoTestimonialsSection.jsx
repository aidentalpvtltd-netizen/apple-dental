import { useEffect, useRef, useState } from 'react'

export function VideoTestimonialsSection({
  carouselTestimonials,
  testimonialSlideIndex,
  testimonialMuted,
  onHoverChange,
  onMuteToggle,
}) {
  const sectionRef = useRef(null)
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false)

  useEffect(() => {
    if (shouldLoadVideos) {
      return undefined
    }

    const section = sectionRef.current

    if (!section || !('IntersectionObserver' in window)) {
      setShouldLoadVideos(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideos(true)
          observer.disconnect()
        }
      },
      { rootMargin: '900px 0px' },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [shouldLoadVideos])

  return (
    <section
      className="video-testimonial-section reveal-section"
      aria-label="Video testimonials"
      ref={sectionRef}
    >
      <div className="video-testimonial-panel">
        <div className="video-testimonial-heading">
          <div>
            <p className="eyebrow">Video testimonials</p>
            <h2>Real patient stories from our Clinics.</h2>
          </div>
          <div
            className="google-rating-line"
            aria-label="Google rating 4.8 stars with 1.5K plus reviews"
          >
            <span aria-hidden="true">★★★★★</span>
            <strong>4.8 Stars (1.5K+ Google Reviews)</strong>
          </div>
        </div>

        <div
          className="testimonial-carousel"
          onMouseEnter={() => onHoverChange(true)}
          onMouseLeave={() => onHoverChange(false)}
        >
          <div className="testimonial-track" style={{ '--testimonial-index': testimonialSlideIndex }}>
            {carouselTestimonials.map((testimonial, index) => (
              <article className="testimonial-video-card" key={`${testimonial.id}-${index}`}>
                <video
                  autoPlay={shouldLoadVideos}
                  loop
                  muted={testimonialMuted[testimonial.id]}
                  playsInline
                  preload="none"
                  poster="/logo.webp"
                  src={shouldLoadVideos ? testimonial.video : undefined}
                  aria-label={testimonial.label}
                >
                  <track
                    kind="captions"
                    src="/captions/testimonial-captions.vtt"
                    srcLang="en"
                    label="English captions"
                    default
                  />
                </video>
                <button
                  type="button"
                  className="testimonial-volume-button"
                  aria-label={
                    testimonialMuted[testimonial.id]
                      ? 'Turn testimonial sound on'
                      : 'Turn testimonial sound off'
                  }
                  onClick={() => onMuteToggle(testimonial.id)}
                >
                  {testimonialMuted[testimonial.id] ? 'Sound off' : 'Sound on'}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
