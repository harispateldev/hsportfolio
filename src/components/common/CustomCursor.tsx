import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { COLORS } from '../../constants/colors';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Smooth physics for the follower
    const mouseX = useSpring(0, { damping: 20, stiffness: 250 });
    const mouseY = useSpring(0, { damping: 20, stiffness: 250 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            mouseX.set(e.clientX - 20); // Center the 40px follower
            mouseY.set(e.clientY - 20);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.onclick || 
                target.closest('a') || 
                target.closest('button')
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
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Outer Follower */}
            <motion.div
                className="cursor-follower"
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? COLORS.UI.CURSOR_BG_HOVER : COLORS.UI.CURSOR_BG,
                }}
            />
            {/* Inner Dot */}
            <motion.div
                className="cursor-dot"
                style={{
                    left: mousePosition.x - 4,
                    top: mousePosition.y - 4,
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
