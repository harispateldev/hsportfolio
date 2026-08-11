import React, { useState, useEffect, useRef } from 'react'
import { useAppSelector } from '../redux/hooks'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { COLORS } from '../constants/colors'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

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

// Sub-component for 3D Tilt Card with Parallax Glare
const TiltCard = ({ children, className, style = {} }: { children: React.ReactNode, className: string, style?: React.CSSProperties }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareRef = useRef<HTMLDivElement>(null);

  // High performance smooth springs (snappier transition)
  const mouseXSpring = useSpring(x, { stiffness: 450, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 450, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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

    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 50%)`;
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.025 }}
      transition={{ type: "tween", ease: [0.03, 0.98, 0.52, 0.99], duration: 0.4 }}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        willChange: "transform",
      }}
    >
      {/* Dynamic light reflection glare overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none z-50 opacity-0 transition-opacity duration-300 rounded-2xl"
        style={{
          mixBlendMode: "overlay",
        }}
      />
      {children}
    </motion.div>
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
                </div>                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TiltCard
                      className={`rounded-2xl overflow-hidden ${isDark ? 'glass-effect bg-white/5' : 'glass-effect-light shadow-xl'}`}
                    >
                        <a href={stats.dailyDevUrl} target="_blank" rel="noopener noreferrer" className="block h-full w-full" style={{ transform: "translateZ(30px)" }}>
                            <img
                            src={stats.dailyDevCardApi}
                            alt="Dev Card"
                            className="w-full h-full object-cover"
                            />
                        </a>
                    </TiltCard>

                    {stats.fiverrStats && (
                      <TiltCard
                        className={`p-6 rounded-2xl flex flex-col justify-between ${
                          isDark ? 'glass-effect bg-white/5 border border-white/10' : 'bg-white shadow-xl border border-gray-100'
                        }`}
                      >
                        {/* Top: Brand Header & Level Badge */}
                        <div className="flex justify-between items-start mb-3" style={{ transform: "translateZ(30px)" }}>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1 mb-0.5">
                              <svg viewBox="0 0 48 48" className="w-5 h-5" style={{ color: COLORS.BRAND.FIVERR }} fill="currentColor">
                                <path d="M30.709 4.5h-7.474c-5.447 0-10.198 4.294-9.88 12.076H7.99v7.245h5.724V43.5h8.498V23.821h8.856V43.5h8.944V16.576H22.748v-1.879a2.805 2.805 0 0 1 2.848-2.951h5.113Z"/>
                              </svg>
                              <span className="font-extrabold text-[15px] tracking-tight" style={{ color: COLORS.BRAND.FIVERR }}>fiverr</span>
                            </div>
                            <a 
                              href={stats.fiverrStats.profileUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`text-[11px] font-semibold hover:underline ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                            >
                              @{stats.fiverrStats.username}
                            </a>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className={`text-[9px] tracking-wider uppercase font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Online</span>
                            </div>
                          </div>

                          {/* Level Badge */}
                          <div className="flex flex-col items-center">
                            <div className="relative flex items-center justify-center w-8 h-8">
                              <svg viewBox="0 0 100 100" className="absolute w-full h-full" style={{ color: '#ea54a2' }} fill="currentColor">
                                <path d="M50 2.5 L95 35 L77.5 90 L22.5 90 L5 35 Z" />
                              </svg>
                              <span className="relative text-white font-black text-[10px]">★</span>
                            </div>
                            <span className={`text-[8px] font-extrabold mt-0.5 uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {stats.fiverrStats.level}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Rating and Metric Bars */}
                        <div className="space-y-2.5 my-2" style={{ transform: "translateZ(20px)" }}>
                          <div className="flex items-center justify-between">
                            <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Rating</span>
                            <div className="flex items-center gap-0.5">
                              <span className="text-[11px] font-bold" style={{ color: COLORS.PRIMARY }}>{stats.fiverrStats.rating}</span>
                              <span style={{ color: COLORS.PRIMARY, fontSize: '11px' }}>★</span>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-0.5">
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Success Score</span>
                              <span className="text-[9px] font-bold text-emerald-500">{stats.fiverrStats.successScore}/10</span>
                            </div>
                            <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${stats.fiverrStats.successScore * 10}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full rounded-full bg-emerald-500"
                              />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between mb-0.5">
                              <span className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Response Rate</span>
                              <span className="text-[9px] font-bold text-emerald-500">{stats.fiverrStats.responseRate}%</span>
                            </div>
                            <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${stats.fiverrStats.responseRate}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full rounded-full bg-emerald-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Bottom: Counts */}
                        <div className={`grid grid-cols-2 gap-2 pt-2 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`} style={{ transform: "translateZ(25px)" }}>
                          <div className="text-center">
                            <p className="text-sm font-black" style={{ color: COLORS.BRAND.FIVERR }}>{stats.fiverrStats.orders}+</p>
                            <p className={`text-[8px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Orders</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-black" style={{ color: COLORS.BRAND.FIVERR }}>{stats.fiverrStats.uniqueClients}+</p>
                            <p className={`text-[8px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clients</p>
                          </div>
                        </div>
                      </TiltCard>
                    )}
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
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
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
                        
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <svg viewBox="0 0 48 48" className="w-3 h-3" style={{ color: COLORS.BRAND.FIVERR }} fill="currentColor">
                            <path d="M30.709 4.5h-7.474c-5.447 0-10.198 4.294-9.88 12.076H7.99v7.245h5.724V43.5h8.498V23.821h8.856V43.5h8.944V16.576H22.748v-1.879a2.805 2.805 0 0 1 2.848-2.951h5.113Z"/>
                          </svg>
                          <span className="text-[8px] font-extrabold uppercase tracking-wider text-emerald-500">Verified</span>
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
