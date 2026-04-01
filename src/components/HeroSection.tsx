import { useAppSelector } from '../redux/hooks'
import { Typewriter } from 'react-simple-typewriter'
import { IMAGES } from '../constants/IMAGES'
import { COLORS } from '../constants/colors'
import DynamicBackground from './common/DynamicBackground'
import { motion } from 'framer-motion'

interface HeroSectionProps {
  isDark: boolean
}

/**
 * HeroSection Component
 * The landing view of the portfolio with a logo, name, and typing animation.
 */
const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
  const { hero } = useAppSelector((state) => state.portfolio.data) || {}
  
  if (!hero) return null

  return (
    <section
      id="home"
      // Standard section background based on theme
      className={`relative flex flex-col items-center justify-center min-h-screen py-16 overflow-hidden ${isDark ? 'section-dark-1' : 'section-light-1'}`}
    >
      <DynamicBackground isDark={isDark} />
      
      {/* Brand Identity: Logo Linked to Blog */}
      <motion.a
        href={hero.logoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={isDark ? IMAGES.hsLogo : IMAGES.DarkLogo}
          alt="HSP DEV Logo"
          className="w-24 h-auto object-contain"
        />
      </motion.a>

      {/* Primary Branding: Developer Name */}
      <motion.h1
        className="text-2xl font-bold tracking-widest uppercase mb-2 z-10"
        style={{ color: isDark ? COLORS.WHITE : COLORS.DARK_GREY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {hero.name}
      </motion.h1>

      {/* Dynamic Subtitle: Professional Roles (Typewriter Animation) */}
      <motion.p
        className="text-sm font-semibold tracking-widest uppercase z-10"
        style={{ color: isDark ? COLORS.LIGHT_GREY : COLORS.DARK_GREY_TEXT }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Typewriter
          words={hero.roles}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </motion.p>

      {/* On-Page Navigation: Indicator to scroll to About Section */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a
          href="#about"
          className={`flex flex-col items-center gap-1 text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          <span>{hero.aboutAnchorText}</span>
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default HeroSection
