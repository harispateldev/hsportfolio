import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface FadeInSectionProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
}

/**
 * FadeInSection Component
 * Uses framer-motion to animate children as they enter the viewport.
 */
const FadeInSection: React.FC<FadeInSectionProps> = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  duration = 0.6
}) => {
  // Define initial positions based on direction
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75], // Custom cubic-bezier for smoother feel
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export default FadeInSection
