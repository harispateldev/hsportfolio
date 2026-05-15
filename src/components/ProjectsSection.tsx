import { useAppSelector } from '../redux/hooks'
import { useState, useMemo } from 'react'
import { COLORS } from '../constants/colors'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import dentalImg from '../assets/dental.png'
import partimerImg from '../assets/partimer.png'
import phonebookImg from '../assets/phonebook.png'
import ProjectModal, { ModalNavArrows } from './ProjectModal'

interface ProjectsSectionProps {
  isDark: boolean
}

const projectImages: Record<string, string> = {
  dental: dentalImg,
  partimer: partimerImg,
  phonebook: phonebookImg,
}

// Sub-component for 3D Tilt Card
const ProjectCard = ({ project, idx, isDark, onClick }: { project: any, idx: number, isDark: boolean, onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`project-card group ${isDark ? '' : 'project-card-light'}`}
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : COLORS.WHITE,
        cursor: 'pointer',
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="w-full h-48 overflow-hidden relative" style={{ transform: "translateZ(30px)" }}>
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
            <span className="text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 tracking-widest uppercase border border-white/50 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full">
                View Project
            </span>
        </div>
      </div>

      <div className="p-6" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase" style={{ color: COLORS.PRIMARY }}>
                {project.category}
            </span>
            <span className={`text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.year}
            </span>
        </div>
        <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {project.name}
        </h3>
        <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
          {project.stack}
        </p>
      </div>
    </motion.div>
  );
};

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDark }) => {
  const { projects: projectData } = useAppSelector((state) => state.portfolio.data) || {}
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState('All')

  const projects = useMemo(() => {
    if (!projectData) return []
    return projectData.map((p: any) => ({
      ...p,
      image: projectImages[p.imageKey as keyof typeof projectImages] || ''
    }))
  }, [projectData])

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projects.map(p => p.category))]
    return cats
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter(p => p.category === filter)
  }, [projects, filter])

  if (!projectData) return null

  return (
    <section
      id="projects"
      className={`py-20 ${isDark ? 'section-dark-2' : 'section-light-2'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
                <p className={`section-title !text-left !p-0 mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    SELECTED WORKS
                </p>
                <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Featured <span style={{ color: COLORS.PRIMARY }}>Projects</span>
                </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                            filter === cat 
                            ? (isDark ? 'bg-primary text-black' : 'bg-gray-900 text-white') 
                            : (isDark ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')
                        }`}
                        style={{ backgroundColor: filter === cat ? COLORS.PRIMARY : undefined }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                    <ProjectCard 
                        key={project.name} 
                        project={project} 
                        idx={idx} 
                        isDark={isDark} 
                        onClick={() => setSelectedIndex(projects.indexOf(project))} 
                    />
                ))}
            </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        isDark={isDark}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(idx) => setSelectedIndex(idx)}
      />

      <ModalNavArrows
        isDark={isDark}
        selectedIndex={selectedIndex}
        onNavigate={(idx) => setSelectedIndex(idx)}
      />
    </section>
  )
}

export default ProjectsSection
