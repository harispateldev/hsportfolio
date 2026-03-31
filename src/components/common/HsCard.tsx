import React from 'react';
import { motion } from 'framer-motion';

interface HsCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const HsCard: React.FC<HsCardProps> = ({ 
  children, 
  className = '', 
  hoverEffect = true 
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default HsCard;
