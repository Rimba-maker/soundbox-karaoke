import type { Variants } from 'framer-motion'

export const stageFade: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
}

export const beatReveal: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 }
  }
}

export const staggerContainer = (delay = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } }
})
