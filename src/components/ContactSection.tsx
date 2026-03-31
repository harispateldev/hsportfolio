import { useAppSelector } from '../redux/hooks'
import { 
  GithubOutlined, 
  LinkedinOutlined, 
  InstagramOutlined, 
  WhatsAppOutlined,
  MailOutlined,
  GitlabOutlined
} from '@ant-design/icons'
import { COLORS } from '../constants/colors'

interface ContactSectionProps {
  isDark: boolean
}

/**
 * ContactSection Component
 * Provides social media links and copyright information from Redux.
 */
const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const { contact } = useAppSelector((state) => state.portfolio.data) || {}

  if (!contact) return null

  // Map icon names to actual Ant Design components or specialized SVGs if needed
  const iconMap: Record<string, JSX.Element> = {
    GithubOutlined: <GithubOutlined />,
    LinkedinOutlined: <LinkedinOutlined />,
    InstagramOutlined: <InstagramOutlined />,
    WhatsAppOutlined: <WhatsAppOutlined />,
    MailOutlined: <MailOutlined />,
    GitlabOutlined: <GitlabOutlined />,
    Fiverr: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M23.004 15.588a.995.995 0 10.001-1.99.995.995 0 000 1.99zm-2.983-10.767c.1 0 .195.01.284.027l.076.018a.989.989 0 00.686-1.717A.995.995 0 0021 4.002V3h-2v1H9V3H7v1H6a2 2 0 00-2 2v13a2 2 0 002 2h13a2 2 0 002-2v-1.412a1 1 0 00-.285-.693L19 15.586V18a.5.5 0 01-.5.5h-12A.5.5 0 016 18V8.5h13v3l1.999-.002V8a1 1 0 00-1-1h-.978z"/>
      </svg>
    )
  }

  return (
    <section
      id="contact"
      className={`py-16 ${isDark ? 'section-dark-1' : 'section-light-1'}`}
    >
      <p className={`section-title ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
        CONTACT
      </p>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
        
        {/* Social Connectivity Links from Redux */}
        <div className="flex flex-wrap justify-center gap-3">
          {contact?.socialLinks?.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target={link.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="social-icon-btn"
              title={link.name}
              style={{
                backgroundColor: isDark ? COLORS.DARK.CARD_BG : COLORS.LIGHT_GREY,
                color: isDark ? (link.darkColor || COLORS.WHITE) : (link.lightColor || COLORS.DARK_GREY),
              }}
            >
              {iconMap[link.iconName] || <MailOutlined />}
            </a>
          ))}
        </div>

        {/* Footer / Copyright Information from Redux */}
        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {contact.copyright}
        </p>
      </div>
    </section>
  )
}

export default ContactSection
