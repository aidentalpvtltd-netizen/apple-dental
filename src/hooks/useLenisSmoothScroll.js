import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const shouldUseNativeScroll = (node) => {
  if (!(node instanceof HTMLElement)) {
    return false
  }

  return Boolean(
    node.closest(
      [
        '[data-lenis-prevent]',
        'input',
        'select',
        'textarea',
        '[role="dialog"]',
        '.admin-dashboard',
        '.chatbot-panel',
        '.chatbot-support-form',
        '.support-inbox',
      ].join(', '),
    ),
  )
}

export function useLenisSmoothScroll({ enabled = true } = {}) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || prefersReducedMotion()) {
      return undefined
    }

    const lenis = new Lenis({
      anchors: {
        duration: 0.85,
        easing: (time) => 1 - Math.pow(1 - time, 3),
      },
      duration: 0.9,
      easing: (time) => 1 - Math.pow(1 - time, 3),
      smoothWheel: true,
      syncTouch: false,
      prevent: shouldUseNativeScroll,
    })

    let animationFrameId = 0

    const raf = (time) => {
      lenis.raf(time)
      animationFrameId = window.requestAnimationFrame(raf)
    }

    animationFrameId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [enabled])
}
