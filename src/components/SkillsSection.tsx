import { useAppSelector } from '../redux/hooks'
import { motion } from 'framer-motion'

interface SkillsSectionProps {
}


/**
 * SkillsSection Component
 * Displays a grid of technical skills and tools with their respective icons.
 */
const SkillsSection: React.FC<SkillsSectionProps> = () => {
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
      className="relative py-20 overflow-hidden section-dark-1 bg-grid-pattern"
      style={{
        backgroundColor: 'var(--terminal-bg-dark)',
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary opacity-5 blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-primary opacity-5 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <p className="section-title text-gray-200">
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
            {skillsWithIcons?.map((skill: any, idx: number) => (
              <motion.div 
                key={idx} 
                className="skill-icon-wrapper group"
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  show: { opacity: 1, scale: 1, y: 0 }
                }}
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: 'rgba(233, 213, 161, 0.1)',
                  borderRadius: '12px'
                }}
              >
                {/* Skill Icon */}
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {skill.icon}
                </div>
                {/* Skill Name Label */}
                <span
                  className="text-xs font-semibold tracking-wide transition-colors duration-300 text-gray-400 group-hover:text-white"
                >
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
