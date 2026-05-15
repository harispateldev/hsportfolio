import React, { useState, useEffect, useRef } from 'react'
import { useAppSelector } from '../redux/hooks'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { COLORS } from '../constants/colors'
import { motion, useInView } from 'framer-motion'

interface StatsSectionProps {
  isDark: boolean
}

/**
 * StatsSection Component
 * Displays external platform cards (daily.dev, Fiverr) and a testimonial carousel.
 * Enhanced with Glassmorphism, equalized heights, and interactive counters.
 */
// Sub-component for Skill Proficiency Bar
const ProficiencyBar = ({ label, percentage, isDark }: { label: string, percentage: number, isDark: boolean }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
        <span className="text-[10px] font-bold text-primary" style={{ color: COLORS.PRIMARY }}>{percentage}%</span>
      </div>
      <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${COLORS.PRIMARY} 0%, ${isDark ? '#fff' : COLORS.BROWN} 100%)` }}
        />
      </div>
    </div>
  );
};

const StatsSectionProps_Inner: React.FC<StatsSectionProps> = ({ isDark }) => {
  const { stats } = useAppSelector((state) => state.portfolio.data) || {}
  
  if (!stats) return null
  
  const { testimonials } = stats
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  }

  // Sub-component for rendering star ratings
  const StarRating = ({ count }: { count: number }) => (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: COLORS.PRIMARY, fontSize: '14px' }}>★</span>
      ))}
    </div>
  )

  // Sub-component for animated counters
  const StatCounter = ({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null);
    const isInView = useInView  (ref, { once: true });
    
    useEffect(() => {
      if (isInView) {
        let start = 0
        const duration = 2000
        const increment = end / (duration / 16)
        
        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)
        
        return () => clearInterval(timer)
      }
    }, [end, isInView])

    return (
      <div ref={ref} className="flex flex-col items-center justify-center p-4">
        <span className="text-3xl font-bold mb-1" style={{ color: COLORS.PRIMARY }}>
          {count}{suffix}
        </span>
        <span className={`text-[10px] tracking-widest uppercase font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {label}
        </span>
      </div>
    )
  }

  return (
    <section
      id="stats"
      className={`relative py-20 overflow-hidden ${isDark ? 'section-dark-1 bg-grid-pattern' : 'section-light-1 bg-dot-pattern'}`}
      style={{
        backgroundColor: isDark ? COLORS.DARK.STATS_BG : undefined
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary opacity-5 blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-primary opacity-5 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            
            {/* Left: Skill Proficiency & daily.dev */}
            <div className="space-y-8">
                <div className={`p-8 rounded-2xl ${isDark ? 'glass-effect bg-white/5' : 'bg-white shadow-xl'}`}>
                    <h3 className={`text-xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Technical Proficiency</h3>
                    <ProficiencyBar label="Web Development" percentage={95} isDark={isDark} />
                    <ProficiencyBar label="Mobile Development" percentage={90} isDark={isDark} />
                    <ProficiencyBar label="Backend Engineering" percentage={85} isDark={isDark} />
                    <ProficiencyBar label="UI/UX Design" percentage={80} isDark={isDark} />
                </div>

                <div className={`rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDark ? 'glass-effect bg-white/5' : 'glass-effect-light shadow-xl'}`}>
                    <a href={stats.dailyDevUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                        <img
                        src={stats.dailyDevCardApi}
                        alt="Dev Card"
                        className="w-full h-full object-cover"
                        />
                    </a>
                </div>
            </div>

            {/* Right: Testimonials */}
            <div className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${isDark ? 'glass-effect bg-white/5' : 'bg-white shadow-xl'}`}>
              <div className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
                <span className={`text-xs font-bold tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>CLIENT REVIEWS</span>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.UI.TERMINAL_RED }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.UI.TERMINAL_YELLOW }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.UI.TERMINAL_GREEN }} />
                </div>
              </div>

              <div className="p-8">
                <Slider {...slickSettings}>
                  {testimonials?.map((t, idx) => (
                    <div key={idx} className="outline-none">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-xl"
                          style={{ background: `linear-gradient(135deg, ${COLORS.DARK_GREY} 0%, ${COLORS.UI.TESTIMONIAL_BG_DARK} 100%)`, border: `2px solid ${COLORS.PRIMARY}` }}>
                          {t.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.name}</p>
                          <p className={`text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.flag}</p>
                          <StarRating count={t.stars} />
                        </div>
                      </div>
                      <p className={`text-sm leading-relaxed italic border-l-2 pl-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} style={{ borderColor: COLORS.PRIMARY }}>
                        "{t.text}"
                      </p>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 py-8 rounded-3xl ${isDark ? 'bg-white/5 glass-effect' : 'bg-white shadow-xl border border-gray-100'}`}>
            <StatCounter end={8} label="Years Exp" suffix="+" />
            <StatCounter end={50} label="Projects" suffix="+" />
            <StatCounter end={12} label="Core Skills" />
            <StatCounter end={100} label="Satisfaction" suffix="%" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSectionProps_Inner
