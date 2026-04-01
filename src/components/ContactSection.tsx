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
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SendOutlined />} 
                  loading={loading}
                  block
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
              <motion.a
                key={idx}
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="social-icon-btn"
                title={link.name}
                whileHover={{ y: -5, scale: 1.1 }}
                style={{
                  backgroundColor: isDark ? COLORS.DARK.CARD_BG : COLORS.LIGHT_GREY,
                  color: isDark ? (link.darkColor || COLORS.WHITE) : (link.lightColor || COLORS.DARK_GREY),
                }}
              >
                {iconMap[link.iconName] || <MailOutlined />}
              </motion.a>
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
