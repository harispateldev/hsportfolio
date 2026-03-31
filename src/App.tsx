import { useState, useEffect } from 'react'
import { useAppDispatch } from './redux/hooks'
import { fetchPortfolioData } from './redux/slices/portfolioSlice'
import { FloatButton } from 'antd'
import { BulbOutlined, BulbFilled } from '@ant-design/icons'
import { COLORS } from './constants/colors'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import StatsSection from './components/StatsSection'
import ContactSection from './components/ContactSection'

import FadeInSection from './components/common/FadeInSection'

/**
 * Main Application Component
 * Manages global theme state (Dark/Light mode) and renders all portfolio sections.
 */
function App() {
  // Initialize theme from localStorage, default to dark if not set
  const [isDark, setIsDark] = useState<boolean>(
    () => localStorage.getItem('theme') !== 'light'
  )

  const dispatch = useAppDispatch()

  // Side effect to update the DOM with the 'dark' class and persist theme selection
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Fetch portfolio data on mount
  useEffect(() => {
    dispatch(fetchPortfolioData())
  }, [dispatch])

  // Toggle function for the theme switcher
  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        // Smooth transition when switching themes
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Scrollable Portfolio Sections with Fade-in Animation */}
      <FadeInSection>
        <HeroSection isDark={isDark} />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <AboutSection isDark={isDark} />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <ExperienceSection isDark={isDark} />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <SkillsSection isDark={isDark} />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <ProjectsSection isDark={isDark} />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <StatsSection isDark={isDark} />
      </FadeInSection>
      
      <FadeInSection delay={0.1}>
        <ContactSection isDark={isDark} />
      </FadeInSection>

      {/* Persistent Theme Toggle Floating Button */}
      <FloatButton
        icon={isDark ? <BulbFilled style={{ color: COLORS.GOLD }} /> : <BulbOutlined />}
        onClick={toggleTheme}
        tooltip={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        style={{
          right: 24,
          bottom: 80,
          backgroundColor: isDark ? COLORS.DARK_GREY : COLORS.LIGHT_GREY,
        }}
      />

      {/* Utility: Quick scroll to top functionality */}
      <FloatButton.BackTop
        style={{ right: 24, bottom: 24 }}
      />
    </div>
  )
}

export default App
