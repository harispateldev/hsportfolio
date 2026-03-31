import { useAppSelector } from '../redux/hooks'
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { COLORS } from '../constants/colors'

interface ExperienceSectionProps {
  isDark: boolean
}

/**
 * ExperienceSection Component
 * Displays a timeline of professional experience.
 * Uses a horizontal layout on desktop and vertical on mobile.
 */
const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDark }) => {
  const { experience: experiences } = useAppSelector((state) => state.portfolio.data) || {}

  if (!experiences) return null

  return (
    <section
      id="experience"
      // section-light-1 background is --bg-light-1 (#fff6df) as defined in index.css
      className={`py-12 ${isDark ? 'section-dark-1' : 'section-light-1'}`}
      style={{
        backgroundColor: isDark ? undefined : COLORS.EXPERIENCE_BG
      }}
    >
      <p className={`section-title ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        EXPERIENCE
      </p>

      {/* Timeline Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop View: Horizontal Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div
            className={`absolute top-6 left-0 right-0 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-400'}`}
          />
          <div className="flex justify-between">
            {experiences?.map((exp, idx) => (
              <div key={idx} className="experience-item relative z-10">
                <div className={`${isDark ? 'text-white' : 'text-gray-700'}`}>
                  {exp.duration.includes('Present') ? (
                    <LoadingOutlined 
                      style={{ 
                        fontSize: '24px', 
                        color: isDark ? COLORS.PRIMARY : COLORS.DARK_GREY 
                      }} 
                    />
                  ) : (
                    <CheckCircleOutlined 
                      style={{ 
                        fontSize: '24px', 
                        color: isDark ? COLORS.PRIMARY : COLORS.DARK_GREY 
                      }} 
                    />
                  )}
                </div>
                <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {exp.company}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {exp.duration}
                </p>
                <p className={`text-xs max-w-[120px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {exp.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: Vertical List */}
        <div className="lg:hidden flex flex-col gap-6">
          {experiences?.map((exp, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {exp.duration.includes('Present') ? (
                <LoadingOutlined
                  style={{ 
                    fontSize: '20px', 
                    color: isDark ? COLORS.PRIMARY : COLORS.DARK_GREY, 
                    marginTop: '2px' 
                  }}
                />
              ) : (
                <CheckCircleOutlined
                  style={{ 
                    fontSize: '20px', 
                    color: isDark ? COLORS.PRIMARY : COLORS.DARK_GREY, 
                    marginTop: '2px' 
                  }}
                />
              )}
              <div>
                <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {exp.company}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {exp.duration}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {exp.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
