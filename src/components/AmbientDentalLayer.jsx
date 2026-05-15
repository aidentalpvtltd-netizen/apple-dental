import { motion, useReducedMotion } from 'framer-motion'

const ambientItems = {
  home: [
    { type: 'tooth', className: 'ambient-item ambient-glass tooth tooth-one', delay: 0 },
    { type: 'braces', className: 'ambient-item ambient-glass braces braces-one', delay: 0.8 },
    { type: 'aligner', className: 'ambient-item ambient-glass aligner aligner-one', delay: 1.2 },
    { type: 'tooth', className: 'ambient-item ambient-glass tooth tooth-two', delay: 1.7 },
    { type: 'braces', className: 'ambient-item ambient-glass braces braces-two', delay: 2.1 },
    { type: 'mist', className: 'ambient-item mist mist-one', delay: 0.4 },
    { type: 'mist', className: 'ambient-item mist mist-two', delay: 1.6 },
    { type: 'halo', className: 'ambient-item halo halo-one', delay: 0.3 },
    { type: 'halo', className: 'ambient-item halo halo-two', delay: 1.5 },
  ],
  schemes: [
    { type: 'tooth', className: 'ambient-item ambient-glass tooth tooth-three', delay: 0.1 },
    { type: 'braces', className: 'ambient-item ambient-glass braces braces-three', delay: 0.9 },
    { type: 'aligner', className: 'ambient-item ambient-glass aligner aligner-two', delay: 1.4 },
    { type: 'mist', className: 'ambient-item mist mist-three', delay: 0.5 },
    { type: 'halo', className: 'ambient-item halo halo-three', delay: 1.1 },
  ],
}

const glassMarks = Array.from({ length: 8 }, (_, index) => ({
  className: `ambient-glass-mark mark-${index + 1}`,
  delay: index * 0.55,
}))

function getFloatAnimation(delay, shouldReduceMotion) {
  if (shouldReduceMotion) {
    return {}
  }

  return {
    animate: {
      y: [0, -28, 10, 0],
      x: [0, 14, -10, 0],
      rotate: [0, 3, -2.4, 0],
    },
    transition: {
      duration: 18,
      delay,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  }
}

function ToothWireframe() {
  return (
    <svg viewBox="0 0 82 98" aria-hidden="true" focusable="false">
      <path d="M41 93c-8-17-13-28-21-31C9 58 5 47 7 31 9 14 19 6 32 11c4 1 7 4 9 4s5-3 9-4c13-5 23 3 25 20 2 16-2 27-13 31-8 3-13 14-21 31Z" />
      <path d="M25 18c5 4 10 6 16 6s11-2 16-6" />
      <path d="M31 60c3 9 6 17 10 25 4-8 7-16 10-25" />
    </svg>
  )
}

function BracesOutline() {
  return (
    <svg viewBox="0 0 150 70" aria-hidden="true" focusable="false">
      <path d="M9 37c22-17 43-25 66-25s44 8 66 25" />
      <path d="M14 48c21-13 40-19 61-19s40 6 61 19" />
      {[24, 43, 62, 81, 100, 119].map((x) => (
        <rect x={x} y="29" width="12" height="12" rx="3" key={x} />
      ))}
    </svg>
  )
}

function AlignerOutline() {
  return (
    <svg viewBox="0 0 150 72" aria-hidden="true" focusable="false">
      <path d="M12 43c14-25 37-36 63-36s49 11 63 36c-17 14-38 21-63 21s-46-7-63-21Z" />
      <path d="M34 39c10-11 24-17 41-17s31 6 41 17" />
      <path d="M44 45c8 5 18 8 31 8s23-3 31-8" />
    </svg>
  )
}

function AmbientShape({ item, shouldReduceMotion }) {
  const motionProps = getFloatAnimation(item.delay, shouldReduceMotion)

  return (
    <motion.span className={item.className} {...motionProps}>
      {item.type === 'tooth' && <ToothWireframe />}
      {item.type === 'braces' && <BracesOutline />}
      {item.type === 'aligner' && <AlignerOutline />}
    </motion.span>
  )
}

export function AmbientDentalLayer({ variant = 'home' }) {
  const shouldReduceMotion = useReducedMotion()
  const items = ambientItems[variant] ?? ambientItems.home

  return (
    <div className={`ambient-dental-layer ambient-${variant}`} aria-hidden="true">
      {items.map((item) => (
        <AmbientShape item={item} shouldReduceMotion={shouldReduceMotion} key={item.className} />
      ))}
      <div className="ambient-glass-marks">
        {glassMarks.map((mark) => (
          <motion.span
            className={mark.className}
            key={mark.className}
            {...(!shouldReduceMotion
              ? {
                  animate: {
                    y: [0, -22, 0],
                    x: [0, 8, 0],
                    opacity: [0.24, 0.58, 0.24],
                    rotate: [0, 6, 0],
                  },
                  transition: {
                    duration: 10,
                    delay: mark.delay,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  },
                }
              : {})}
          />
        ))}
      </div>
    </div>
  )
}
