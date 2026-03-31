import { useAppSelector } from '../redux/hooks'
import { Typewriter } from 'react-simple-typewriter'
import { IMAGES } from '../constants/IMAGES'
import { COLORS } from '../constants/colors'

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
      className={`relative flex flex-col items-center justify-center min-h-screen py-16 ${isDark ? 'section-dark-1' : 'section-light-1'}`}
    >
      {/* Brand Identity: Logo Linked to Blog */}
      <a
        href={hero.logoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6"
      >
        <img
          src={isDark ? IMAGES.hsLogo : IMAGES.DarkLogo}
          alt="HSP DEV Logo"
          className="w-24 h-auto object-contain"
        />
      </a>

      {/* Primary Branding: Developer Name */}
      <h1
        className="text-2xl font-bold tracking-widest uppercase mb-2"
        style={{ color: isDark ? COLORS.WHITE : COLORS.DARK_GREY }}
      >
        {hero.name}
      </h1>

      {/* Dynamic Subtitle: Professional Roles (Typewriter Animation) */}
      <p
        className="text-sm font-semibold tracking-widest uppercase"
        style={{ color: isDark ? COLORS.LIGHT_GREY : '#636e72' }}
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
      </p>

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
