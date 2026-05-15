import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { motion } from 'framer-motion';
import { GlobalOutlined, MobileOutlined, SolutionOutlined } from '@ant-design/icons';
import { COLORS } from '../constants/colors';

interface ExpertiseSectionProps {
  isDark: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  GlobalOutlined: <GlobalOutlined />,
  MobileOutlined: <MobileOutlined />,
  SolutionOutlined: <SolutionOutlined />,
};

/**
 * ExpertiseSection Component
 * Highlights the developer's core specialized domains (Web, Mobile, Leadership).
 * Designed for a premium, professional look with Glassmorphism and animations.
 */
const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ isDark }) => {
  const { expertise } = useAppSelector((state) => state.portfolio.data) || {};

  if (!expertise) return null;

  return (
    <section
      id="expertise"
      className={`py-20 relative overflow-hidden ${isDark ? 'section-dark-1' : 'section-light-1'}`}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className={`absolute top-1/4 left-0 w-96 h-96 rounded-full blur-[120px] opacity-10 animate-pulse ${isDark ? 'bg-primary' : 'bg-primary'}`} />
        <div className={`absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-[120px] opacity-10 animate-pulse ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`} style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.p 
            className={`section-title !pt-0 mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
          >
            CORE EXPERTISE
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            8+ Years of <span className="text-primary" style={{ color: COLORS.PRIMARY }}>Engineering Excellence</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertise.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-2xl transition-all duration-300 ${
                isDark 
                ? 'glass-effect bg-white/5 border-white/10' 
                : 'bg-white border-gray-100 shadow-xl shadow-gray-200/50'
              }`}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.PRIMARY} 0%, ${isDark ? '#8B4513' : '#e9d5a1'} 100%)`,
                  color: isDark ? '#000' : '#fff'
                }}
              >
                {iconMap[item.icon]}
              </div>

              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              
              <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill: string, sIdx: number) => (
                  <span 
                    key={sIdx}
                    className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${
                      isDark 
                      ? 'border-primary/30 text-primary bg-primary/5' 
                      : 'border-gray-200 text-gray-500 bg-gray-50'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
