import { Modal } from 'antd'
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import dentalImg from '../assets/dental.png'
import partimerImg from '../assets/partimer.png'
import phonebookImg from '../assets/phonebook.png'
import { COLORS } from '../constants/colors'

// ── Inline tech icons ──────────────────────────────────────────
const ReactIcon = () => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" width="32" height="32">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

const PhpIcon = () => (
  <svg viewBox="0 0 128 50" width="44" height="22">
    <rect width="128" height="50" rx="10" fill="#6181b6" />
    <text x="64" y="35" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold" fontFamily="sans-serif">php</text>
  </svg>
)

const BootstrapIcon = () => (
  <svg viewBox="0 0 128 128" width="32" height="32">
    <rect width="128" height="128" rx="16" fill="#7952B3" />
    <text x="64" y="88" textAnchor="middle" fill="white" fontSize="80" fontWeight="900" fontFamily="serif">B</text>
  </svg>
)

const ReduxIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="#764abc">
    <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.043-.914-.784-1.638-1.71-1.638h-.furlong-.043c-2.043.107-3.96-.72-5.392-2.124C10.989 11 10.989 11 10.989 11l-2.26-2.125 1.04-1.04c.51-.52.51-1.36 0-1.87l-.84-.85c-.53-.52-1.37-.52-1.87 0l-.86.87-.82.83V4.27c0-.72-.6-1.32-1.33-1.32-.73 0-1.33.6-1.33 1.32v12.09c0 .73.6 1.32 1.33 1.32.73 0 1.33-.59 1.33-1.32v-3.6l.76.73 4.39 4.21c.54.52.81 1.26.75 2.02-.055.73.6 1.36 1.33 1.36.33 0 .65-.13.88-.37.23-.23.36-.53.36-.85v-.16c.06-1.2-.36-2.37-1.2-3.22l-.82-.8a7.33 7.33 0 004.12-.97zm4.69-10.84c-.73 0-1.33.6-1.33 1.32v3.62l-.76-.73-4.39-4.21c-.54-.52-.81-1.26-.75-2.02.055-.73-.6-1.36-1.33-1.36-.33 0-.65.13-.88.37-.23.23-.36.53-.36.85v.16c-.06 1.2.36 2.37 1.2 3.22l.82.8a7.33 7.33 0 00-4.12.97l.82.78c1.43 1.37 3.3 2.19 5.32 2.19h.15c2.043-.107 3.96.72 5.392 2.124L21.01 13l-1.04 1.04c-.51.52-.51 1.36 0 1.87l.84.85c.53.52 1.37.52 1.87 0l.86-.87.82-.83v2.52c0 .72.6 1.32 1.33 1.32v-12.09c0-.73-.6-1.32-1.33-1.32z" />
  </svg>
)

const NodeIconSmall = () => (
  <svg viewBox="0 0 128 128" width="32" height="32">
    <path d="M66.958.825a6.07 6.07 0 00-5.917 0L11.203 29.6a6.083 6.083 0 00-2.958 5.25v57.6a6.083 6.083 0 002.958 5.25l49.838 28.774a6.07 6.07 0 005.917 0L116.795 97.7a6.083 6.083 0 002.958-5.25V34.85a6.083 6.083 0 00-2.958-5.25z" fill="#83CD29" />
  </svg>
)

// ── Project data ───────────────────────────────────────────────
export interface ProjectData {
  name: string
  year: string
  images: string[]
  description: string
  techIcons: React.ReactNode[]
  notes?: string
}

export const projectsData: ProjectData[] = [
  {
    name: 'Dental Chart',
    year: '2023',
    images: [dentalImg],
    description:
      'Dental chart software is an essential tool for modern dental practitioners, providing a digital platform to record and manage patient information, treatment plans, and clinical data. This detailed description will outline the key features and benefits of a comprehensive dental chart software designed for doctors.',
    techIcons: [<ReactIcon />, <PhpIcon />, <BootstrapIcon />],
    notes: 'Stack: React Js, Node (Adonis), MySql, Ant Design',
  },
  {
    name: 'The ParTimers',
    year: '2022',
    images: [partimerImg],
    description:
      'The partimer is a dedicated platform for part-time jobs and simplified application processes in the UK. From job advert to (remote) handshake, they provide an end-to-end solution for part time recruitment. Struggling to fit in that interview? Swap a live meeting for a recorded session, and review at your convenience.',
    techIcons: [<ReduxIcon />, <ReactIcon />],
    notes:
      'Used Redux and Async Storage, Used Axios for Api Integration Handling multiple user Accounts like, Employer and Employee, Platform indevidually handeled (Ios & Android)',
  },
  {
    name: 'My Phone Book',
    year: '2021',
    images: [phonebookImg],
    description:
      "Built around the concept of 'Vocal for Local' the App gives users details of services and utilities available in their immediate vicinity. More importantly it gives the local service providers, small scale businesses and vendors a platform for getting noticed by their prospective customers",
    techIcons: [<NodeIconSmall />, <ReactIcon />],
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
  onNavigate,
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
  }

  // Dynamic theme-based colors for the modal UI
  const modalBg = isDark ? COLORS.DARK.STATS_BG : COLORS.WHITE
  const textColor = isDark ? COLORS.WHITE : COLORS.DARK_GREY
  const subTextColor = isDark ? COLORS.LIGHT_GREY : '#636e72'

  return (
    <Modal
      open={selectedIndex !== null}
      onCancel={onClose}
      footer={null}
      centered
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
      {/* Project Visual Showcase (Slider for multiple images) */}
      <div className="rounded-lg overflow-hidden mb-5" style={{ border: `1px solid ${isDark ? '#444' : '#e0e0e0'}` }}>
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
        {project?.techIcons?.map((icon, i) => (
          <div key={i}>{icon}</div>
        ))}
      </div>

      {/* Supplemental Implementation Notes */}
      {project.notes && (
        <p style={{ color: subTextColor, fontSize: '12px', lineHeight: '1.7' }}>
          {project.notes}
        </p>
      )}
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
    zIndex: 1100,
    background: isDark ? 'rgba(45,52,54,0.85)' : 'rgba(255,255,255,0.85)',
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
