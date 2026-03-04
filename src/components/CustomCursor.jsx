import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use motion values for better performance
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);

    // Add smooth spring physics
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(x, springConfig);
    const cursorY = useSpring(y, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            x.set(e.clientX - 16);
            y.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [x, y, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 9999,
                    pointerEvents: 'none',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: 1
                }}
                transition={{ duration: 0.2 }}
            >
                <div style={{
                    width: '32px',
                    height: '32px',
                    border: `2px solid ${isHovering ? 'var(--secondary)' : 'var(--primary)'}`,
                    borderRadius: '50%',
                    backgroundColor: isHovering ? 'rgba(255, 0, 60, 0.1)' : 'transparent',
                    boxShadow: `0 0 10px ${isHovering ? 'var(--secondary)' : 'var(--primary)'}`,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: isHovering ? 'var(--secondary)' : 'var(--primary)',
                        borderRadius: '50%',
                    }} />
                </div>
            </motion.div>
        </>
    );
};

export default CustomCursor;
