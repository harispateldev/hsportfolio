import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../redux/hooks'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { COLORS } from '../constants/colors'

interface StatsSectionProps {
  isDark: boolean
}

/**
 * StatsSection Component
 * Displays external platform cards (daily.dev, Fiverr) and a testimonial carousel.
 * Enhanced with Glassmorphism, equalized heights, and interactive counters.
 */
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
    
    useEffect(() => {
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
    }, [end])

    return (
      <div className="flex flex-col items-center justify-center p-4">
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
        <p className={`section-title ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          STATISTICS & DETAILS
        </p>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Grid: Equalized heights with items-stretch */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
            
            {/* Daily.dev Platform Card with Glassmorphism */}
            <div className={`rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDark ? 'glass-effect bg-white/5' : 'glass-effect-light'}`}>
              <a
                href={stats.dailyDevUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <img
                  src={stats.dailyDevCardApi}
                  alt="Haris Patel's Dev Card"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.style.cssText = `background: linear-gradient(135deg, ${COLORS.DARK_GREY} 0%, #1a1a2e 100%); padding: 40px; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 12px;`
                      parent.innerHTML = `<span style="color:#e9d5a1;font-size:32px;font-weight:900;">daily.dev</span><span style="color:#aaa;font-size:14px;">${stats.dailyDevUsername}</span><span style="color:#e9d5a1;font-size:12px;border:1px solid #e9d5a1;padding:4px 12px;border-radius:20px;margin-top:10px;">View Profile →</span>`
                    }
                  }}
                />
              </a>
            </div>

            {/* Testimonial Terminal Card with Glassmorphism */}
            <div className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDark ? 'glass-effect bg-white/5' : 'glass-effect-light'}`}>
              <div
                className={`flex items-center justify-between px-5 py-4 ${isDark ? 'bg-white/5' : 'bg-gray-100/50'}`}
              >
                <span className={`text-xs font-bold tracking-widest ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  CLIENT REVIEWS
                </span>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
              </div>

              <div className="flex-grow p-8 flex flex-col justify-center">
                <Slider {...slickSettings}>
                  {testimonials?.map((t, idx) => (
                    <div key={idx} className="outline-none">
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-bold shadow-xl"
                          style={{ 
                            background: `linear-gradient(135deg, ${COLORS.DARK_GREY} 0%, #1e272e 100%)`,
                            border: `2px solid ${COLORS.PRIMARY}`
                          }}
                        >
                          {t.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            {t.name}
                          </p>
                          <p className={`text-xs opacity-60 mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {t.flag}
                          </p>
                          <StarRating count={t.stars} />
                        </div>
                      </div>
                      <div className="relative pl-4 border-l-2" style={{ borderColor: COLORS.PRIMARY }}>
                        <p className={`text-sm leading-relaxed italic font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          "{t.text}"
                        </p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Fiverr Profile Card with Glassmorphism */}
            <div className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] ${isDark ? 'glass-effect bg-white/5' : 'glass-effect-light'}`}>
              <div className="relative group overflow-hidden">
                <div
                  className="w-full h-32 flex items-center justify-center text-5xl font-black transition-transform duration-500 group-hover:scale-110"
                  style={{ background: COLORS.GRADIENTS.FIVERR }}
                >
                  <span className="drop-shadow-lg" style={{ color: COLORS.BRAND.FIVERR }}>HSP</span>
                  <span className="text-lg ml-2 text-white opacity-40 font-serif lowercase italic">
                    {stats.fiverr.bannerText}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold tracking-widest bg-black/50 px-4 py-2 rounded-full border border-white/20">FIVERR PRO</span>
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                      style={{ background: COLORS.BRAND.FIVERR }}
                    >
                      {stats.fiverr.username[0].toUpperCase()}
                    </div>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      @{stats.fiverr.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-6">
                    <span className="text-lg font-bold mr-2" style={{ color: COLORS.PRIMARY }}>{stats.fiverr.rating.toFixed(1)}</span>
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="text-sm" style={{ color: COLORS.PRIMARY }}>★</span>
                    ))}
                  </div>
                </div>
                
                <a
                  href={stats.fiverr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                  style={{ 
                    backgroundColor: COLORS.BRAND.FIVERR,
                    color: COLORS.WHITE
                  }}
                >
                  Hire Me on Fiverr
                  <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats Counter Row - Utilizing Bottom Empty Space */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 py-8 rounded-3xl ${isDark ? 'bg-white/5 glass-effect' : 'bg-gray-50 glass-effect-light'}`}>
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
