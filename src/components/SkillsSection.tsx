import { useAppSelector } from '../redux/hooks'
import { COLORS } from '../constants/colors'

interface SkillsSectionProps {
  isDark: boolean
}


/**
 * SkillsSection Component
 * Displays a grid of technical skills and tools with their respective icons.
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({ isDark }) => {
  const { skills: skillData } = useAppSelector((state) => state.portfolio.data) || {}

  if (!skillData) return null

  // Use the logoUrl provided in the Redux state (which comes from mockData)
  const skillsWithIcons = skillData.map((s: { name: string, logoUrl: string }) => ({
    name: s.name,
    icon: <img src={s.logoUrl} alt={s.name} className="w-10 h-10 object-contain" />
  }))

  return (
    <section
      id="skills"
      // section-dark-1 background is --bg-dark-1 (#3a3b3c) in index.css
      className={`py-12 ${isDark ? 'section-dark-1' : 'section-light-1'}`}
      style={{
        // Apply SKILLS background color specifically as requested
        backgroundColor: isDark ? COLORS.SKILLS_BG : COLORS.SKILLS_BG,
        color: COLORS.WHITE // Ensure text is readable on dark background
      }}
    >
      <p className={`section-title ${isDark ? 'text-gray-200' : 'text-gray-200'}`}>
        SKILLS
      </p>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Icon Grid */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {skillsWithIcons?.map((skill, idx) => (
            <div key={idx} className="skill-icon-wrapper">
              {/* Skill Icon (SVG) */}
              {skill.icon}
              {/* Skill Name Label */}
              <span
                className={`text-xs font-medium tracking-wide ${isDark ? 'text-gray-300' : 'text-white'}`}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
