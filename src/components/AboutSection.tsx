import { useAppSelector } from '../redux/hooks'
import { EyeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import profilePic from '../assets/profilePic.png'
import { COLORS } from '../constants/colors'

interface AboutSectionProps {
  isDark: boolean
}

// Inline SVG icons for tech stack
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-10 h-10">
    <circle cx="0" cy="0" r="2.05" fill={COLORS.BRAND.REACT} />
    <g stroke={COLORS.BRAND.REACT} strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

const PhpIcon = () => (
  <svg viewBox="0 0 128 128" className="w-10 h-10">
    <path
      d="M64 33.039c-33.772 0-61.148 13.783-61.148 30.787s27.376 30.787 61.148 30.787 61.148-13.783 61.148-30.787S97.772 33.039 64 33.039z"
      fill={COLORS.BRAND.PHP}
    />
    <path
      d="M82.487 64c0 5.405-1.015 9.729-3.047 12.971-2.031 3.244-5.063 5.373-9.096 6.39-2.031.508-5.57.762-10.619.762H46.756l2.538-12.705h13.157c2.794 0 4.571-.254 5.332-.762.762-.508 1.27-1.778 1.524-3.81l.254-1.524c.254-2.031.127-3.301-.381-3.81-.508-.508-1.778-.762-3.81-.762h-7.112c-2.794 0-4.826-.635-6.097-1.905-1.27-1.271-1.778-3.175-1.524-5.714l2.793-13.975h6.604l-2.285 11.688h7.112c1.524 0 2.794.127 3.81.381 1.015.254 1.905.762 2.667 1.524.762.762 1.27 1.778 1.524 3.047.254 1.27.127 3.048-.381 5.332z"
      fill={COLORS.WHITE}
    />
    <path
      d="M44.979 64H31.822l2.538-12.705h12.395c2.794 0 4.571-.254 5.332-.762.762-.508 1.27-1.778 1.524-3.81l.254-1.524c.254-2.031.127-3.301-.381-3.81-.508-.508-1.778-.762-3.81-.762H36.395l-5.587 28l-6.604.005 5.587-28h-7.62l1.27-6.35h21.971c3.556 0 6.097.635 7.62 1.905s2.031 3.302 1.524 6.096l-.381 1.905c-.508 2.794-1.651 4.826-3.429 6.097-1.778 1.27-4.444 1.905-8.001 1.905H44.979z"
      fill={COLORS.WHITE}
    />
    <path
      d="M97.02 64H83.864l2.538-12.705h12.395c2.794 0 4.571-.254 5.332-.762.762-.508 1.27-1.778 1.524-3.81l.254-1.524c.254-2.031.127-3.301-.381-3.81-.508-.508-1.778-.762-3.81-.762H88.437l-5.587 28-6.604.005 5.587-28h-7.62l1.27-6.35h21.971c3.556 0 6.097.635 7.62 1.905s2.031 3.302 1.524 6.096l-.381 1.905c-.508 2.794-1.651 4.826-3.429 6.097-1.778 1.27-4.444 1.905-8.001 1.905H97.02z"
      fill={COLORS.WHITE}
    />
  </svg>
)

const NodeIcon = () => (
  <svg viewBox="0 0 128 128" className="w-10 h-10">
    <path
      d="M64.837 128c-1.162 0-2.305-.301-3.305-.905l-10.516-6.233c-1.571-.879-0.803-1.191-.286-1.372 2.094-.729 2.516-.892 4.746-2.157.234-.134.54-.084.78.05l8.079 4.796c.295.161.706.161.977 0l31.494-18.194c.295-.171.487-.515.487-.878V45.876c0-.373-.192-.708-.495-.886L64.315 26.805c-.293-.169-.686-.169-.978 0L31.844 45.005c-.309.178-.504.52-.504.885v36.379c0 .362.195.699.499.867l8.627 4.983c4.684 2.341 7.553-.417 7.553-3.193V49.552c0-.51.408-.917.917-.917h4.001c.503 0 .917.406.917.917v35.373c0 6.249-3.405 9.832-9.331 9.832-1.82 0-3.254 0-7.264-1.976l-8.267-4.759C27.552 86.62 26 84.126 26 81.451V45.072c0-2.681 1.552-5.18 4.048-6.573l31.498-18.207c2.44-1.351 5.683-1.351 8.106 0l31.498 18.207C103.648 39.893 105.2 42.39 105.2 45.072V81.45c0 2.677-1.552 5.17-4.048 6.556l-31.502 18.194c-1 .61-2.138.9-3.299.9h-.514z"
      fill={COLORS.BRAND.NODE}
    />
    <path
      d="M74.797 81.208c-13.782 0-16.66-6.325-16.66-11.631 0-.509.408-.917.917-.917h4.08c.454 0 .836.33.911.779.625 4.212 2.484 6.339 10.752 6.339 6.617 0 9.43-1.497 9.43-5.005 0-2.021-.796-3.52-11.057-4.527-8.576-.849-13.877-2.752-13.877-9.638 0-6.345 5.348-10.127 14.31-10.127 10.066 0 15.04 3.491 15.656 10.989.023.261-.076.519-.264.706-.188.184-.449.292-.715.292h-4.1c-.428 0-.805-.298-.894-.716-1.005-4.346-3.457-5.737-9.683-5.737-7.13 0-7.962 2.483-7.962 4.343 0 2.256 0.979 2.916 10.711 4.19 9.617 1.262 14.22 3.047 14.22 9.938 0 6.847-5.709 10.782-15.666 10.782l-.07-.001z"
      fill={COLORS.BRAND.NODE}
    />
  </svg>
)

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
                src={profilePic}
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
              <ReactIcon />
              <PhpIcon />
              <NodeIcon />
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
                  <p key={idx}>{para}</p>
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
