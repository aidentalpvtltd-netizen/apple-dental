import { useEffect, useState } from 'react'
import { heroImages } from '../../config/siteContent.js'

const heroCarouselSlides = [...heroImages, heroImages[0]]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsTransitioning(true)
      setCurrentSlide((slide) => (slide >= heroImages.length ? slide : slide + 1))
    }, 5600)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentSlide !== heroImages.length) {
      return undefined
    }

    const resetTimer = window.setTimeout(() => {
      setIsTransitioning(false)
      setCurrentSlide(0)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      })
    }, 760)

    return () => window.clearTimeout(resetTimer)
  }, [currentSlide])

  const showPreviousSlide = () => {
    if (currentSlide === 0) {
      setIsTransitioning(false)
      setCurrentSlide(heroImages.length)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsTransitioning(true)
          setCurrentSlide(heroImages.length - 1)
        })
      })
      return
    }

    setIsTransitioning(true)
    setCurrentSlide((slide) => slide - 1)
  }

  const showNextSlide = () => {
    setIsTransitioning(true)
    setCurrentSlide((slide) => (slide >= heroImages.length ? 1 : slide + 1))
  }

  const handleSlideTransitionEnd = () => {
    if (currentSlide !== heroImages.length) {
      return
    }

    setIsTransitioning(false)
    setCurrentSlide(0)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsTransitioning(true)
      })
    })
  }

  return (
    <section className="hero-section reveal-section">
      <div className="hero-image-card">
        <div
          className="hero-slide-track"
          aria-hidden="true"
          onTransitionEnd={handleSlideTransitionEnd}
          style={{
            transform: `translateX(-${Math.min(currentSlide, heroImages.length) * (100 / heroCarouselSlides.length)}%)`,
            transition: isTransitioning ? undefined : 'none',
          }}
        >
          {heroCarouselSlides.map((image, index) => (
            <div
              className="hero-slide"
              key={`${image}-${index}`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
        </div>
        <button
          className="hero-carousel-arrow hero-carousel-arrow-left"
          type="button"
          aria-label="Show previous banner"
          onClick={showPreviousSlide}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <button
          className="hero-carousel-arrow hero-carousel-arrow-right"
          type="button"
          aria-label="Show next banner"
          onClick={showNextSlide}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
