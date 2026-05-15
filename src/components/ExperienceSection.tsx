import { useAppSelector } from '../redux/hooks'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { COLORS } from '../constants/colors'

interface ExperienceSectionProps {
  isDark: boolean
}

/**
 * ExperienceSection Component
 * Displays a professional vertical timeline of professional experience.
 * Uses Glassmorphism and scroll-linked animations for a premium feel.
 */
const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDark }) => {
  const { experience: experiences } = useAppSelector((state) => state.portfolio.data) || {}
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!experiences) return null

  return (
    <section
      id="experience"
      className={`py-20 relative overflow-hidden ${isDark ? 'section-dark-1' : 'section-light-1'}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className={`section-title !pt-0 mb-16 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          PROFESSIONAL JOURNEY
        </p>

        <div ref={containerRef} className="relative">
          {/* Animated Vertical Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20"
            style={{ 
                transformOrigin: "top",
                scaleY,
                backgroundColor: `${COLORS.PRIMARY}40`
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center justify-between w-full mb-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary z-20 -translate-x-1/2 shadow-[0_0_15px_rgba(233,213,161,0.8)]" style={{ backgroundColor: COLORS.PRIMARY }} />

                  {/* Spacer for desktop */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 w-full md:w-[45%] p-6 rounded-2xl transition-all duration-300 ${
                    isDark 
                    ? 'glass-effect bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-white border-gray-100 shadow-xl hover:shadow-2xl'
                  }`}>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary" style={{ color: COLORS.PRIMARY }}>
                      {exp.duration}
                    </span>
                    <h3 className={`text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {exp.company}
                    </h3>
                    <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {exp.role}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
