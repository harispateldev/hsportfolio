import { useAppSelector } from '../redux/hooks'
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { COLORS } from '../constants/colors'
import { Steps, ConfigProvider, theme } from 'antd'

interface ExperienceSectionProps {
  isDark: boolean
}

/**
 * ExperienceSection Component
 * Displays a timeline of professional experience using Ant Design Steps.
 * Uses a horizontal layout on desktop and vertical on mobile.
 */
const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isDark }) => {
  const { experience: experiences } = useAppSelector((state) => state.portfolio.data) || {}

  if (!experiences) return null

  const stepItems = experiences.map((exp) => {
    const isPresent = exp.duration.includes('Present')
    return {
      title: (
        <div className="flex flex-col">
          <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {exp.company}
          </span>
          <span className={`text-xs font-normal mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {exp.duration}
          </span>
        </div>
      ),
      description: (
        <span className={`text-xs block mt-2 max-w-[150px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {exp.role}
        </span>
      ),
      icon: isPresent ? (
        <LoadingOutlined />
      ) : (
        <CheckCircleOutlined />
      ),
      status: isPresent ? 'process' as const : 'finish' as const,
    }
  })

  // Find the current active step index (index of "Present" role, otherwise the last one)
  const currentIndex = experiences.findIndex(e => e.duration.includes('Present'))
  const activeStep = currentIndex !== -1 ? currentIndex : experiences.length - 1

  return (
    <section
      id="experience"
      className={`py-12 ${isDark ? 'section-dark-1' : 'section-light-1'}`}
      style={{
        backgroundColor: isDark ? undefined : COLORS.EXPERIENCE_BG
      }}
    >
      <p className={`section-title ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        EXPERIENCE
      </p>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              colorPrimary: isDark ? COLORS.PRIMARY : COLORS.DARK_GREY,
              colorTextDescription: isDark ? COLORS.GREY_TEXT : COLORS.DARK_GREY_TEXT, // gray-300 / gray-600
            }
          }}
        >
          {/* Desktop View: Horizontal Timeline */}
          <div className="hidden lg:block">
            <Steps
              direction="horizontal"
              current={activeStep}
              items={stepItems}
              labelPlacement="vertical"
              className="px-4"
            />
          </div>

          {/* Mobile View: Vertical List */}
          <div className="lg:hidden">
            <Steps
              direction="vertical"
              current={activeStep}
              items={stepItems}
            />
          </div>
        </ConfigProvider>
      </div>
    </section>
  )
}

export default ExperienceSection
