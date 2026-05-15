import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { COLORS } from '../../constants/colors';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.onclick || 
                target.closest('a') || 
                target.closest('button') ||
                target.closest('.project-card') ||
                target.closest('.skill-icon-wrapper')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Highlighted Dot Cursor */}
            <motion.div
                className="cursor-dot"
                style={{
                    left: mousePosition.x - 5,
                    top: mousePosition.y - 5,
                }}
                animate={{
                    scale: isHovering ? 2.2 : 1,
                    backgroundColor: isHovering ? COLORS.PRIMARY : COLORS.PRIMARY,
                    boxShadow: isHovering 
                        ? `0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 30px ${COLORS.PRIMARY}, 0 0 10px #ffffff` 
                        : `0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 15px ${COLORS.PRIMARY}`,
                }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    mass: 0.5
                }}
            />
        </>
    );
};

export default CustomCursor;
