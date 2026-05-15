import { useAppSelector } from '../redux/hooks'
import { EyeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { COLORS } from '../constants/colors'
import { IMAGES } from '../constants/IMAGES'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Magnetic from './common/Magnetic'

interface AboutSectionProps {
  isDark: boolean
}

// Sub-component for animated counter
const AnimatedCounter = ({ value, suffix, label, isDark }: { value: number, suffix: string, label: string, isDark: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className={`text-3xl font-bold ${isDark ? 'text-primary' : 'text-gray-900'}`} style={{ color: COLORS.PRIMARY }}>
        {count}{suffix}
      </div>
      <div className={`text-[10px] uppercase tracking-widest font-semibold ${isDark ? 'text-gray-200' : 'text-gray-500'}`}>
        {label}
      </div>
    </div>
  );
};

/**
 * AboutSection Component
 * Displays personal introduction, profile picture, tech stack, and resume link.
 */
const AboutSection: React.FC<AboutSectionProps> = ({ isDark }) => {
  const { about, achievements } = useAppSelector((state) => state.portfolio.data) || {}

  if (!about) return null

  return (
    <section
      id="about"
      className={`py-20 relative overflow-hidden ${isDark ? 'section-dark-2' : 'section-light-2'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Column: Profile image + floating tech icons */}
          <div className="relative w-full lg:w-1/3 flex justify-center py-8 lg:py-0">
            <div className="relative">
              {/* Main Profile Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-20 rounded-2xl overflow-hidden aspect-[4/5] w-full max-w-[280px] md:max-w-[320px] shadow-2xl"
              >
                <img
                  src={IMAGES.profilePic}
                  alt="Haris Patel"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Floating Tech Icons */}
              {[
                { src: IMAGES.ReactLogo, top: "-5%", left: "-10%", delay: 0 },
                { src: IMAGES.ReactNative, top: "20%", right: "-12%", delay: 1 },
                { src: IMAGES.nodejs, bottom: "15%", left: "-12%", delay: 2 },
                { src: IMAGES.JsLogo, bottom: "-5%", right: "0%", delay: 3 },
              ].map((icon, i) => (
                <motion.div
                  key={i}
                  className={`absolute z-30 w-12 h-12 md:w-16 md:h-16 p-2 md:p-3 rounded-xl md:rounded-2xl glass-effect flex items-center justify-center shadow-xl ${isDark ? 'bg-white/10' : 'bg-white/80'}`}
                  style={{ top: icon.top, left: icon.left, right: icon.right, bottom: icon.bottom }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: icon.delay,
                    ease: "easeInOut"
                  }}
                >
                  <img 
                    src={icon.src} 
                    alt="tech" 
                    className="w-full h-full object-contain" 
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Information & Counters */}
          <div className="flex-1 w-full space-y-8">
            <div className={`w-full ${isDark ? 'terminal-card' : 'terminal-card-light'}`}>
              <div className={isDark ? 'terminal-dots' : 'terminal-dots-light'}>
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              
              <div className={`p-8 space-y-6 text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {about?.paragraphs?.map((para, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {para}
                  </motion.p>
                ))}

                <div className="pt-4 flex flex-wrap gap-4">
                  <Magnetic>
                    <Button
                      type="default"
                      icon={<EyeOutlined />}
                      href={about.resumeLink}
                      target="_blank"
                      data-magnetic
                      className="h-12 px-8 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: COLORS.PRIMARY,
                        color: '#000',
                        border: 'none',
                      }}
                    >
                      View Resume
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>

            {/* Achievement Counters Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              {achievements?.map((ach, i) => (
                <AnimatedCounter key={i} {...ach} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
