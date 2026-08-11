import { useAppSelector } from '../redux/hooks'
import { 
  GithubOutlined, 
  LinkedinOutlined, 
  InstagramOutlined, 
  WhatsAppOutlined,
  MailOutlined,
  GitlabOutlined,
  CheckCircleFilled,
  SendOutlined
} from '@ant-design/icons'
import { COLORS } from '../constants/colors'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Input, Button, App as AntdApp } from 'antd'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../constants/config'
import Magnetic from './common/Magnetic'

const { TextArea } = Input

interface ContactSectionProps {
  isDark: boolean
}

/**
 * ContactSection Component
 * Provides social media links and copyright information from Redux.
 */
const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const { contact } = useAppSelector((state) => state.portfolio.data) || {}
  const { message } = AntdApp.useApp()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

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
      <svg viewBox="0 0 48 48" fill="currentColor" width="20" height="20">
        <path d="M30.709 4.5h-7.474c-5.447 0-10.198 4.294-9.88 12.076H7.99v7.245h5.724V43.5h8.498V23.821h8.856V43.5h8.944V16.576H22.748v-1.879a2.805 2.805 0 0 1 2.848-2.951h5.113Z"/>
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

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12">
        
        {/* Contact Form Container */}
        <motion.div 
          className={`w-full p-8 rounded-2xl ${isDark ? 'glass-effect bg-black/20' : 'bg-white shadow-xl'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                ref={formRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!formRef.current) return

                  setLoading(true)
                  emailjs.sendForm(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    formRef.current,
                    EMAILJS_CONFIG.PUBLIC_KEY
                  ).then(() => {
                    setLoading(false)
                    setIsSubmitted(true)
                    message.success('Message sent successfully!')
                  }).catch((error) => {
                    setLoading(false)
                    console.error('Email error:', error)
                    message.error('Failed to send message. Please try again later.')
                  })
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    name="user_name"
                    placeholder="Name" 
                    size="large" 
                    required 
                    className="contact-form-input"
                    style={{ 
                      borderRadius: '12px',
                      backgroundColor: isDark ? COLORS.UI.GLASS_BG_DARK : COLORS.WHITE,
                      color: isDark ? COLORS.WHITE : COLORS.BLACK,
                      borderColor: isDark ? COLORS.UI.BORDER_DARK : COLORS.UI.BORDER_LIGHT
                    }}
                  />
                  <Input 
                    name="user_email"
                    placeholder="Email" 
                    type="email" 
                    size="large" 
                    required 
                    className="contact-form-input"
                    style={{ 
                      borderRadius: '12px',
                      backgroundColor: isDark ? COLORS.UI.GLASS_BG_DARK : COLORS.WHITE,
                      color: isDark ? COLORS.WHITE : COLORS.BLACK,
                      borderColor: isDark ? COLORS.UI.BORDER_DARK : COLORS.UI.BORDER_LIGHT
                    }}
                  />
                </div>
                <TextArea 
                  name="message"
                  placeholder="Your Message" 
                  rows={4} 
                  required 
                  className="contact-form-input"
                  style={{ 
                    borderRadius: '12px',
                    backgroundColor: isDark ? COLORS.UI.GLASS_BG_DARK : COLORS.WHITE,
                    color: isDark ? COLORS.WHITE : COLORS.BLACK,
                    borderColor: isDark ? COLORS.UI.BORDER_DARK : COLORS.UI.BORDER_LIGHT
                  }}
                />
                <Magnetic>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    icon={<SendOutlined />} 
                    loading={loading}
                    block
                    data-magnetic
                    size="large"
                    style={{ 
                      borderRadius: '12px',
                      height: '48px',
                      backgroundColor: COLORS.PRIMARY,
                      borderColor: COLORS.PRIMARY,
                      color: COLORS.DARK_GREY,
                      fontWeight: 600
                    }}
                  >
                    Send Message
                  </Button>
                </Magnetic>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                >
                  <CheckCircleFilled style={{ fontSize: '64px', color: COLORS.UI.SUCCESS }} />
                </motion.div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Message Sent!
                </h3>
                <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  type="link"
                  style={{ color: COLORS.PRIMARY }}
                >
                  Send another message
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social Connectivity Links from Redux */}
        <div className="flex flex-col items-center gap-4">
          <p className={`text-sm font-semibold tracking-widest uppercase ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Find me on
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {contact?.socialLinks?.map((link, idx) => (
              <Magnetic key={idx}>
                <motion.a
                  href={link.url}
                  target={link.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  data-magnetic
                  title={link.name}
                  whileHover={{ y: -5, scale: 1.1 }}
                  style={{
                    backgroundColor: isDark ? COLORS.DARK.CARD_BG : COLORS.LIGHT_GREY,
                    color: isDark ? (link.darkColor || COLORS.WHITE) : (link.lightColor || COLORS.DARK_GREY),
                  }}
                >
                  {iconMap[link.iconName] || <MailOutlined />}
                </motion.a>
              </Magnetic>
            ))}
          </div>
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
