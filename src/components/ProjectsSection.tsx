import { useAppSelector } from '../redux/hooks'
import { useState } from 'react'
import { COLORS } from '../constants/colors'
import dentalImg from '../assets/dental.png'
import partimerImg from '../assets/partimer.png'
import phonebookImg from '../assets/phonebook.png'
import ProjectModal, { ModalNavArrows } from './ProjectModal'

interface ProjectsSectionProps {
  isDark: boolean
}

// Map image keys to actual imports
const projectImages: Record<string, string> = {
  dental: dentalImg,
  partimer: partimerImg,
  phonebook: phonebookImg,
}

/**
 * ProjectsSection Component
 * Showcases featured projects in a responsive grid.
 * Includes a modal for detailed project views and navigation.
 */
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDark }) => {
  const { projects: projectData } = useAppSelector((state) => state.portfolio.data) || {}
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (!projectData) return null

  // Enrich project data with actual images
  const projects = projectData.map((p: any) => ({
    ...p,
    image: projectImages[p.imageKey as keyof typeof projectImages] || ''
  }))

  // Handlers for modal navigation and state
  const openModal = (idx: number) => setSelectedIndex(idx)
  const closeModal = () => setSelectedIndex(null)
  const navigateTo = (idx: number) => setSelectedIndex(idx)

  return (
    <section
      id="projects"
      // section-dark-2 background is --bg-dark-2 (#808080) in index.css
      className={`py-12 ${isDark ? 'section-dark-2' : 'section-light-2'}`}
      style={{
        // Ensure section background matches requested #808080 in dark mode
        backgroundColor: isDark ? COLORS.DARK.PROJECT_BG : undefined
      }}
    >
      <p className={`section-title ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        WORKED ON PROJECTS
      </p>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, idx) => (
            <div
              key={idx}
              className={`project-card ${isDark ? '' : 'project-card-light'}`}
              style={{
                // Card background colors
                background: isDark ? COLORS.DARK.PROJECT_BG : COLORS.WHITE,
                cursor: 'pointer',
              }}
              onClick={() => openModal(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(idx)}
            >
              {/* Project Visual Representation (Image with Hover Effect) */}
              <div className="w-full h-40 overflow-hidden relative group">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Visual Feedback on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest uppercase">
                    View Details
                  </span>
                </div>
              </div>

              {/* Project Descriptive Meta (Name, Year, Stack) */}
              <div className="p-4">
                <p
                  className={`text-xs font-bold tracking-widest mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                  {project.name}
                </p>
                <p
                  className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  {project.year}
                </p>
                <p
                  className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  <span className="font-medium">Stack used: </span>
                  {project.stack}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal Overlay */}
      <ProjectModal
        isDark={isDark}
        selectedIndex={selectedIndex}
        onClose={closeModal}
        onNavigate={navigateTo}
      />

      {/* Fixed Contextual Navigation Arrows */}
      <ModalNavArrows
        isDark={isDark}
        selectedIndex={selectedIndex}
        onNavigate={navigateTo}
      />
    </section>
  )
}

export default ProjectsSection
