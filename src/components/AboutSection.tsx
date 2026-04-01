import { useAppSelector } from '../redux/hooks'
import { EyeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { COLORS } from '../constants/colors'
import { IMAGES } from '../constants/IMAGES'
import { motion } from 'framer-motion'

interface AboutSectionProps {
  isDark: boolean
}


/**
 * AboutSection Component
 * Displays personal introduction, profile picture, tech stack, and resume link.
 */
const AboutSection: React.FC<AboutSectionProps> = ({ isDark }) => {
  const { about } = useAppSelector((state) => state.portfolio.data) || {}

  if (!about) return null

  return (
    <section
      id="about"
      className={`py-16 ${isDark ? 'section-dark-2' : 'section-light-2'}`}
      style={{
        // Use secondary color for light mode background as requested
        backgroundColor: isDark ? undefined : COLORS.SECONDARY
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Column: Profile image + tech icons */}
          <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[200px]">
            {/* Profile Picture Container */}
            <div className="rounded-xl overflow-hidden w-full max-w-[220px] mx-auto lg:mx-0 flex-1">
              <img
                src={IMAGES.profilePic}
                alt="Haris Patel"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'top' }}
              />
            </div>
            
            {/* Tech Stack Icons Tray - Fixed Height */}
            <div
              className={`flex items-center justify-center gap-4 p-4 rounded-xl shrink-0 ${isDark ? 'bg-dark-1' : 'bg-light-1'}`}
              style={{
                backgroundColor: isDark ? COLORS.DARK.STATS_BG : COLORS.WHITE
              }}
            >
             
              <img 
                src={IMAGES.ReactLogo} 
                alt="React" 
                className="w-10 h-auto object-contain" 
                style={{ filter: isDark ? 'none' : 'invert(1)' }}
              />
              <img 
                src={IMAGES.php} 
                alt="PHP" 
                className="w-10 h-auto object-contain" 
                style={{ filter: isDark ? 'none' : 'invert(1)' }}
              />
              <img 
                src={IMAGES.nodejs} 
                alt="Node.js" 
                className="w-10 h-auto object-contain" 
                style={{ filter: isDark ? 'none' : 'invert(1)' }}
              />
            </div>
          </div>

          {/* Right Column: Information Terminal Card */}
          <div className="flex-1 w-full flex">
            <div className={`w-full ${isDark ? 'terminal-card' : 'terminal-card-light'}`}>
              {/* Terminal Title Bar with Dots */}
              <div className={isDark ? 'terminal-dots' : 'terminal-dots-light'}>
                <span className="dot-red" />
                <span className="dot-yellow" />
                <span className="dot-green" />
              </div>
              
              {/* Terminal Content Area */}
              <div className={`p-6 space-y-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {about?.paragraphs?.map((para, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {para}
                  </motion.p>
                ))}

                {/* Resume Action Area */}
                <div className="pt-2">
                  <Button
                    type="default"
                    icon={<EyeOutlined />}
                    href={about.resumeLink}
                    target="_blank"
                    style={{
                    backgroundColor: isDark ? COLORS.DARK.CARD_BG : COLORS.DARK_GREY,
                    color: COLORS.WHITE,
                    borderColor: isDark ? COLORS.DARK_GREY : COLORS.DARK_GREY,
                      borderRadius: '20px',
                      fontSize: '12px',
                      height: '32px',
                    }}
                  >
                    View Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
