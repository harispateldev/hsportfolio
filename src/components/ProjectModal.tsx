import { Modal } from 'antd'
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons'
import Slider from 'react-slick'
import { motion, AnimatePresence } from 'framer-motion'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import dentalImg from '../assets/dental.png'
import dental1Img from '../assets/dental1.png'
import partimerImg from '../assets/partimer.png'
import partimer2_1Img from '../assets/partimer2_1.png'
import phonebookImg from '../assets/phonebook.png'
import phonebook2Img from '../assets/phonebook2..png'
import { COLORS } from '../constants/colors'
import { IMAGES } from '../constants/IMAGES'


// ── Project data ───────────────────────────────────────────────
export interface ProjectData {
  name: string
  year: string
  images: string[]
  description: string
  techStack: (keyof typeof IMAGES)[]
  notes?: string
}

export const projectsData: ProjectData[] = [
  {
    name: 'Dental Chart',
    year: '2023',
    images: [dentalImg, dental1Img],
    description:
      'Dental chart software is an essential tool for modern dental practitioners, providing a digital platform to record and manage patient information, treatment plans, and clinical data. This detailed description will outline the key features and benefits of a comprehensive dental chart software designed for doctors.',
    techStack: ['ReactLogo', 'php', 'BootstrapLogo'],
    notes: 'Stack: React Js, Node (Adonis), MySql, Ant Design',
  },
  {
    name: 'The ParTimers',
    year: '2022',
    images: [partimerImg, partimer2_1Img],
    description:
      'The partimer is a dedicated platform for part-time jobs and simplified application processes in the UK. From job advert to (remote) handshake, they provide an end-to-end solution for part time recruitment. Struggling to fit in that interview? Swap a live meeting for a recorded session, and review at your convenience.',
    techStack: ['ReactLogo', 'JsLogo'],
    notes:
      'Used Redux and Async Storage, Used Axios for Api Integration Handling multiple user Accounts like, Employer and Employee, Platform indevidually handeled (Ios & Android)',
  },
  {
    name: 'My Phone Book',
    year: '2021',
    images: [phonebookImg, phonebook2Img],
    description:
      "Built around the concept of 'Vocal for Local' the App gives users details of services and utilities available in their immediate vicinity. More importantly it gives the local service providers, small scale businesses and vendors a platform for getting noticed by their prospective customers",
    techStack: ['nodejs', 'ReactLogo'],
    notes:
      'Used Redux and Async Storage, Used Axios for Api Integration Memoization for best Performance Geo location to fetch user Current Location',
  },
]

// ── Component ──────────────────────────────────────────────────
interface ProjectModalProps {
  isDark: boolean
  selectedIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/**
 * ProjectModal Component
 * An overlay that displays detailed information about a selected project.
 */
const ProjectModal: React.FC<ProjectModalProps> = ({
  isDark,
  selectedIndex,
  onClose,
}) => {
  if (selectedIndex === null) return null

  const project = projectsData[selectedIndex]

  const slickSettings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  }

  // Dynamic theme-based colors for the modal UI
  const modalBg = isDark ? COLORS.DARK.STATS_BG : COLORS.WHITE
  const textColor = isDark ? COLORS.WHITE : COLORS.DARK_GREY
  const subTextColor = isDark ? COLORS.LIGHT_GREY : COLORS.DARK_GREY_TEXT

  return (
    <Modal
      open={selectedIndex !== null}
      onCancel={onClose}
      footer={null}
      centered
      zIndex={50000}
      width={460}
      closeIcon={<CloseOutlined style={{ color: isDark ? COLORS.WHITE : COLORS.DARK_GREY }} />}
      styles={{
        content: {
          backgroundColor: modalBg,
          borderRadius: '12px',
          padding: '0',
          overflow: 'hidden',
        },
        header: {
          backgroundColor: modalBg,
          padding: '20px 24px 12px',
          borderBottom: 'none',
        },
        body: {
          padding: '0 24px 24px',
          backgroundColor: modalBg,
        },
        mask: {
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(4px)',
        },
      }}
      title={
        <span style={{ color: textColor, fontSize: '18px', fontWeight: 600 }}>
          {project.name}
        </span>
      }
    >
      <AnimatePresence mode="wait">
        {project && (
          <motion.div
            key={selectedIndex} // Important for cross-fade when navigating between projects
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Project Visual Showcase (Slider for multiple images) */}
            <div className="rounded-lg overflow-hidden mb-5" style={{ border: `1px solid ${isDark ? COLORS.UI.PROJECT_BORDER_DARK : COLORS.UI.PROJECT_BORDER_LIGHT}` }}>
              <Slider {...slickSettings}>
                {project?.images?.map((img, i) => (
                  <div key={i}>
                    <img
                      src={img}
                      alt={project.name}
                      style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Project Narrative / Description */}
            <p style={{ color: subTextColor, fontSize: '13px', lineHeight: '1.75', marginBottom: '20px' }}>
              {project.description}
            </p>

            {/* Technology Stack Visual Indicators */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              {project?.techStack?.map((techKey, i) => (
                <div key={i}>
                  <img 
                    src={IMAGES[techKey]} 
                    className="w-8 h-8 object-contain" 
                    style={{ filter: isDark ? 'none' : 'invert(1)' }} 
                  />
                </div>
              ))}
            </div>

            {/* Supplemental Implementation Notes */}
            {project.notes && (
              <p style={{ color: subTextColor, fontSize: '12px', lineHeight: '1.7' }}>
                {project.notes}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
}

export default ProjectModal

// ── Navigation arrows rendered outside the modal ──────────────
interface ModalNavArrowsProps {
  isDark: boolean
  selectedIndex: number | null
  onNavigate: (index: number) => void
}

/**
 * ModalNavArrows Component
 * Floating navigation buttons for cycling through projects while the modal is open.
 */
export const ModalNavArrows: React.FC<ModalNavArrowsProps> = ({ isDark, selectedIndex, onNavigate }) => {
  if (selectedIndex === null) return null
  const total = projectsData.length

  const arrowStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 60000,
    background: isDark ? COLORS.UI.NAV_ARROW_BG_DARK : COLORS.UI.NAV_ARROW_BG_LIGHT,
    color: isDark ? COLORS.WHITE : COLORS.DARK_GREY,
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
    transition: 'opacity 0.2s',
  }

  return (
    <>
      {/* Scroll Previous Action */}
      {selectedIndex > 0 && (
        <button
          onClick={() => onNavigate(selectedIndex - 1)}
          style={{ ...arrowStyle, left: '16px' }}
          aria-label="Previous project"
        >
          <LeftOutlined />
        </button>
      )}
      {/* Scroll Next Action */}
      {selectedIndex < total - 1 && (
        <button
          onClick={() => onNavigate(selectedIndex + 1)}
          style={{ ...arrowStyle, right: '16px' }}
          aria-label="Next project"
        >
          <RightOutlined />
        </button>
      )}
    </>
  )
}
