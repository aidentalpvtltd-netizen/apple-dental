import { useEffect, useState } from 'react'
import {
  getResponsiveSrcSet,
  heroImageAlts,
  heroImageDimensions,
  heroMobileImageWidths,
  heroMobileImages,
  heroImageWidths,
  heroImages,
} from '../../config/siteContent.js'

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
      <h1 className="sr-only">
        Apple International Dental clinic for root canal treatment, dental implants, braces, clear
        aligners, kids dentistry, crowns, dentures, and emergency dental consultations
      </h1>
      <div className="hero-image-card">
        <div
          className="hero-slide-track"
          onTransitionEnd={handleSlideTransitionEnd}
          style={{
            transform: `translateX(-${Math.min(currentSlide, heroImages.length) * (100 / heroCarouselSlides.length)}%)`,
            transition: isTransitioning ? undefined : 'none',
          }}
        >
          {heroCarouselSlides.map((image, index) => {
            const dimensions = heroImageDimensions[image] ?? { width: 1920, height: 640 }
            const mobileImage = heroMobileImages[index % heroImages.length]

            return (
              <div className="hero-slide" key={`${image}-${index}`}>
                <picture>
                  <source
                    media="(max-width: 1024px)"
                    srcSet={getResponsiveSrcSet(mobileImage, heroMobileImageWidths)}
                    sizes="100vw"
                    type="image/webp"
                  />
                  <img
                    src={image}
                    srcSet={getResponsiveSrcSet(image, heroImageWidths)}
                    sizes="100vw"
                    alt={heroImageAlts[index % heroImages.length]}
                    width={dimensions.width}
                    height={dimensions.height}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </picture>
              </div>
            )
          })}
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
