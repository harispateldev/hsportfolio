import { useAppSelector } from '../redux/hooks'
import { Typewriter } from 'react-simple-typewriter'
import { IMAGES } from '../constants/IMAGES'
import { COLORS } from '../constants/colors'
import DynamicBackground from './common/DynamicBackground'
import Magnetic from './common/Magnetic'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface HeroSectionProps {
  isDark: boolean
}

/**
 * HeroSection Component
 * The landing view of the portfolio with a logo, name, and typing animation.
 */
const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
  const { hero } = useAppSelector((state) => state.portfolio.data) || {}
  
  // Parallax Tilt Effect for Logo
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!hero) return null

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center min-h-screen py-16 overflow-hidden ${isDark ? 'section-dark-1' : 'section-light-1'}`}
    >
      <DynamicBackground isDark={isDark} />
      
      {/* Brand Identity: Logo with 3D Parallax */}
      <motion.a
        href={hero.logoLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 z-10"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={isDark ? IMAGES.hsLogo : IMAGES.DarkLogo}
          alt="HSP DEV Logo"
          className="w-32 h-auto object-contain transition-all duration-300 filter drop-shadow-2xl"
          style={{ transform: "translateZ(50px)" }}
        />
      </motion.a>

      {/* Primary Branding: Developer Name */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase mb-4 z-10 text-center"
        style={{ color: isDark ? COLORS.WHITE : COLORS.DARK_GREY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {hero.name}
      </motion.h1>

      {/* Dynamic Subtitle: Professional Roles (Typewriter Animation) */}
      <motion.p
        className="text-sm md:text-base font-semibold tracking-[0.4em] uppercase z-10"
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

      {/* On-Page Navigation: Magnetic Scroll Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
        <Magnetic>
          <a
            href="#about"
            data-magnetic
            className={`flex flex-col items-center gap-2 p-4 text-xs tracking-widest uppercase transition-all duration-300 ${isDark ? 'text-gray-300 hover:text-primary' : 'text-gray-600 hover:text-black'}`}
          >
            <span>{hero.aboutAnchorText}</span>
            <motion.svg
              className="w-5 h-5"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
            </motion.svg>
          </a>
        </Magnetic>
      </div>
    </section>
  )
}

export default HeroSection
