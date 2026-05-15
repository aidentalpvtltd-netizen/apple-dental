import { useEffect } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useGsapParallaxDepth(rootRef, { enabled = true } = {}) {
  useEffect(() => {
    const root = rootRef.current

    if (!enabled || !root || typeof window === 'undefined' || prefersReducedMotion()) {
      return undefined
    }

    let context
    let isCancelled = false

    const setupParallax = async () => {
      const [{ default: gsapDefault, gsap: gsapNamed }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])

      if (isCancelled) {
        return
      }

      const gsap = gsapNamed ?? gsapDefault

      gsap.registerPlugin(ScrollTrigger)

      context = gsap.context(() => {
        gsap.to('.ambient-dental-layer', {
          y: -110,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2.2,
          },
        })

        gsap.to('.ambient-glass-marks', {
          y: -42,
          x: 18,
          rotate: 4,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2.6,
          },
        })

        gsap.utils.toArray('.hero-image-card, .scheme-hero-media').forEach((element) => {
          gsap.fromTo(
            element,
            { y: 0 },
            {
              y: -28,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: element,
                start: 'top 82%',
                end: 'bottom top',
                scrub: 1.2,
              },
            },
          )
        })

        gsap.utils
          .toArray('.services-summary, .video-testimonial-panel, .contact-card, .scheme-branch-cta')
          .forEach((section) => {
          gsap.fromTo(
            section,
            { y: 10 },
            {
              y: -14,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.6,
              },
            },
          )
        })
      }, root)

      ScrollTrigger.refresh()
    }

    setupParallax()

    return () => {
      isCancelled = true
      context?.revert()
    }
  }, [enabled, rootRef])
}
