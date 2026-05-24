import { useEffect, useState } from 'react'

const alignerCases = [
  {
    id: 'aligner-case-1',
    label: 'Case 01',
    title: 'Aakanksha',
    note: 'Forwardly Placed & Deep Bite - 10 Months, 32 Aligners',
    image: '/aligners/cases/aligner-case-01.png',
  },
  {
    id: 'aligner-case-2',
    label: 'Case 02',
    title: 'Aarti',
    note: 'Crowding - 10 Months, 32 Aligners',
    image: '/aligners/cases/aligner-case-02.png',
  },
  {
    id: 'aligner-case-3',
    label: 'Case 03',
    title: 'Abhishek',
    note: 'Crooked & Forwardly Placed - 8 Months, 32 Aligners',
    image: '/aligners/cases/aligner-case-03.png',
  },
  {
    id: 'aligner-case-4',
    label: 'Case 04',
    title: 'Andyson',
    note: 'Crowding - 7 Months, 25 Aligners',
    image: '/aligners/cases/aligner-case-04.png',
  },
  {
    id: 'aligner-case-5',
    label: 'Case 05',
    title: 'Ankit',
    note: 'Spacing - 20 Months, 79 Aligners',
    image: '/aligners/cases/aligner-case-05.png',
  },
  {
    id: 'aligner-case-6',
    label: 'Case 06',
    title: 'Anusha',
    note: 'Crowding - 14 Months, 52 Aligners',
    image: '/aligners/cases/aligner-case-06.png',
  },
  {
    id: 'aligner-case-7',
    label: 'Case 07',
    title: 'Atul',
    note: 'Open Bites - 9 Months, 49 Aligners',
    image: '/aligners/cases/aligner-case-07.png',
  },
  {
    id: 'aligner-case-8',
    label: 'Case 08',
    title: 'Khajan',
    note: 'Deep Bite - 9 Months, 49 Aligners',
    image: '/aligners/cases/aligner-case-08.png',
  },
  {
    id: 'aligner-case-9',
    label: 'Case 09',
    title: 'Nisha',
    note: 'Spacing - 11 Months, 40 Aligners',
    image: '/aligners/cases/aligner-case-09.png',
  },
  {
    id: 'aligner-case-10',
    label: 'Case 10',
    title: 'Pooja',
    note: 'Crowding - 13 Months, 42 Aligners',
    image: '/aligners/cases/aligner-case-10.png',
  },
  {
    id: 'aligner-case-11',
    label: 'Case 11',
    title: 'Shanmugapriya',
    note: 'Forwardly Placed - 9 Months, 36 Aligners',
    image: '/aligners/cases/aligner-case-11.png',
  },
  {
    id: 'aligner-case-12',
    label: 'Case 12',
    title: 'Vamshi',
    note: 'Forwardly Placed - 8 Months, 26 Aligners',
    image: '/aligners/cases/aligner-case-12.png',
  },
]

export function AlignersSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const visibleIndex = activeIndex % alignerCases.length
  const renderedAlignerCases = [...alignerCases, alignerCases[0]]

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setIsTransitioning(true)
      setActiveIndex((current) => Math.min(current + 1, alignerCases.length))
    }, 3600)

    return () => window.clearInterval(slideTimer)
  }, [])

  useEffect(() => {
    if (isTransitioning || activeIndex !== 0) {
      return undefined
    }

    const transitionTimer = window.requestAnimationFrame(() => {
      setIsTransitioning(true)
    })

    return () => window.cancelAnimationFrame(transitionTimer)
  }, [activeIndex, isTransitioning])

  const handleSlideChange = (direction) => {
    setIsTransitioning(true)
    setActiveIndex((current) => {
      if (direction > 0) {
        return Math.min(current + 1, alignerCases.length)
      }

      return (visibleIndex - 1 + alignerCases.length) % alignerCases.length
    })
  }

  const handleTransitionEnd = () => {
    if (activeIndex === alignerCases.length) {
      setIsTransitioning(false)
      setActiveIndex(0)
    }
  }

  return (
    <section
      className="aligners-section reveal-section"
      id="aligners-gallery"
      aria-label="Aligners before and after"
    >
      <img
        className="aligners-floating-logo"
        src="/aligners/toothsi-logo-float.png"
        alt="makeO toothsi aligners"
        loading="lazy"
      />
      <div className="aligners-section-inner">
        <div className="aligners-heading">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Aligners gallery</p>
              <h2>Before and after smile journeys.</h2>
            </div>
            <p className="section-text">
              Clear aligner transformations planned for subtle movement, better bite balance, and
              confident smiles.
            </p>
          </div>

          <div className="aligners-carousel-controls" aria-label="Aligners carousel controls">
            <button
              type="button"
              className="aligners-arrow"
              aria-label="Previous aligner case"
              onClick={() => handleSlideChange(-1)}
            >
              &lsaquo;
            </button>
            <button
              type="button"
              className="aligners-arrow"
              aria-label="Next aligner case"
              onClick={() => handleSlideChange(1)}
            >
              &rsaquo;
            </button>
          </div>
        </div>

        <div className="aligners-carousel" aria-live="polite">
          <div
            className={`aligners-track${isTransitioning ? '' : ' no-transition'}`}
            style={{ '--aligner-index': activeIndex }}
            onTransitionEnd={handleTransitionEnd}
          >
            {renderedAlignerCases.map((alignerCase, index) => (
              <article className="aligners-case-card" key={`${alignerCase.id}-${index}`}>
                <div className="aligners-case-copy">
                  <span>{alignerCase.label}</span>
                  <h3>{alignerCase.title}</h3>
                  <p>{alignerCase.note}</p>
                </div>

                <figure className="aligners-case-photo">
                  <img src={alignerCase.image} alt={`${alignerCase.title} aligner before and after`} />
                </figure>
              </article>
            ))}
          </div>
        </div>

        <div className="aligners-dots" aria-label="Aligners carousel pagination">
          {alignerCases.map((alignerCase, index) => (
            <button
              type="button"
              key={alignerCase.id}
              className={index === visibleIndex ? 'active' : ''}
              aria-label={`Show ${alignerCase.label}`}
              aria-current={index === visibleIndex ? 'true' : undefined}
              onClick={() => {
                setIsTransitioning(true)
                setActiveIndex(index)
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
