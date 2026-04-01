import { useAppSelector } from '../redux/hooks'
import { COLORS } from '../constants/colors'
import { motion } from 'framer-motion'

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
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {skillsWithIcons?.map((skill, idx) => (
            <motion.div 
              key={idx} 
              className="skill-icon-wrapper group"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                show: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: isDark ? 'rgba(233, 213, 161, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: '12px'
              }}
            >
              {/* Skill Icon */}
              <div className="transition-transform duration-300 group-hover:scale-110">
                {skill.icon}
              </div>
              {/* Skill Name Label */}
              <span
                className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-100 group-hover:text-white'}`}
              >
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection
