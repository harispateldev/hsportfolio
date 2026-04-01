import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/colors';

const DynamicBackground: React.FC<{ isDark: boolean }> = ({ isDark }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Background Base */}
            <div className={`absolute inset-0 ${isDark ? 'bg-transparent' : 'bg-transparent'}`} />

            {/* Moving Blobs */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full filter blur-[100px] opacity-20"
                style={{
                    background: COLORS.PRIMARY,
                    top: '-10%',
                    left: '-10%',
                }}
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full filter blur-[100px] opacity-10"
                style={{
                    background: COLORS.BROWN,
                    bottom: '10%',
                    right: '5%',
                }}
                animate={{
                    x: [0, -70, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Subtle Gradient Overlay */}
            <div className={`absolute inset-0 ${isDark ? 'opacity-30' : 'opacity-10'}`} 
                 style={{ background: `radial-gradient(circle at 50% 50%, transparent 0%, ${COLORS.UI.OVERLAY_DARK} 100%)` }} 
            />
        </div>
    );
};

export default DynamicBackground;
