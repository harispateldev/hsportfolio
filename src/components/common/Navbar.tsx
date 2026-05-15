import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { IMAGES } from '../../constants/IMAGES';
import { COLORS } from '../../constants/colors';

interface NavbarProps {
  isDark: boolean;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

/**
 * Navbar Component
 * A premium, floating glassmorphism navigation bar.
 * Features magnetic links and active section detection.
 */
const Navbar: React.FC<NavbarProps> = ({ isDark }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detection logic for active section
      const sections = navLinks.map(link => link.href.substring(1));
      let currentSection = sections[0];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] px-4 py-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <Magnetic>
            <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-2">
              <img 
                src={isDark ? IMAGES.hsLogo : IMAGES.DarkLogo} 
                alt="HS" 
                className="h-10 w-auto"
              />
            </a>
          </Magnetic>
        </motion.div>

        {/* Desktop Nav */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`hidden md:flex items-center gap-1 p-1.5 rounded-full pointer-events-auto border transition-all duration-500 ${
            isScrolled 
            ? (isDark ? 'bg-black/20 border-white/10 backdrop-blur-md' : 'bg-white/70 border-gray-200/50 backdrop-blur-md shadow-lg')
            : 'bg-transparent border-transparent'
          }`}
        >
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <a
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 rounded-full ${
                  activeSection === link.href.substring(1)
                    ? (isDark ? 'text-black' : 'text-white')
                    : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black')
                }`}
              >
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 z-[-1] rounded-full"
                    style={{ backgroundColor: COLORS.PRIMARY }}
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            </Magnetic>
          ))}
        </motion.nav>

        {/* Mobile Menu Toggle */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:hidden pointer-events-auto"
        >
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`w-12 h-12 rounded-full flex flex-col items-center justify-center gap-1.5 border transition-all ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-md'
            }`}
          >
            <motion.span 
              animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 ${isDark ? 'bg-white' : 'bg-black'}`} 
            />
            <motion.span 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`w-6 h-0.5 ${isDark ? 'bg-white' : 'bg-black'}`} 
            />
            <motion.span 
              animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`w-6 h-0.5 ${isDark ? 'bg-white' : 'bg-black'}`} 
            />
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-24 left-4 right-4 p-6 rounded-3xl border pointer-events-auto md:hidden backdrop-blur-2xl ${
              isDark ? 'bg-black/90 border-white/10' : 'bg-white/95 border-gray-200 shadow-2xl'
            }`}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-lg font-bold uppercase tracking-tighter transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary'
                      : (isDark ? 'text-gray-400' : 'text-gray-500')
                  }`}
                  style={{ color: activeSection === link.href.substring(1) ? COLORS.PRIMARY : undefined }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
