import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '#home' },
        { name: 'ABOUT', href: '#about' },
        { name: 'PROJECTS', href: '#projects' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                transition: 'all 0.4s ease',
                background: scrolled ? 'rgba(10, 10, 15, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(0, 240, 255, 0.1)' : '1px solid transparent',
            }}
        >
            <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                letterSpacing: '2px',
            }}>
                D<span style={{ color: 'var(--text-main)' }}>.</span>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                {navLinks.map((link, index) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        className="interactive"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 0.5 }}
                        style={{
                            color: 'var(--text-main)',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            letterSpacing: '1px',
                            position: 'relative',
                            padding: '0.5rem 0',
                        }}
                        whileHover={{ color: 'var(--primary)' }}
                    >
                        {link.name}
                        <motion.div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                height: '2px',
                                width: '100%',
                                background: 'var(--primary)',
                                originX: 0,
                            }}
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.a>
                ))}
            </div>
        </motion.nav>
    );
};

export default Navbar;
