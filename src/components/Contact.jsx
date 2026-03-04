import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Terminal } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '8rem 2rem 4rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{
                    maxWidth: '800px',
                    width: '100%',
                    textAlign: 'center',
                    padding: '4rem',
                    border: '1px solid var(--primary)',
                    background: 'rgba(10, 10, 15, 0.8)',
                    borderRadius: '16px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
                className="glass"
            >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }} />

                <h2 style={{ fontSize: '3rem', color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '2px' }}>
                    INITIATE <span style={{ color: 'var(--primary)' }}>HANDSHAKE</span>
                </h2>

                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                    My inbox is always open. Whether you have a question or just want to connect, I'll try my best to get back to you!
                </p>

                <a
                    href="mailto:hello@dharshith.example.com"
                    className="interactive"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'transparent',
                        border: '2px solid var(--primary)',
                        color: 'var(--primary)',
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.4)';
                        e.currentTarget.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <Mail size={20} /> PING COMMLINK
                </a>
            </motion.div>

            {/* Modern Footer */}
            <footer style={{ marginTop: '8rem', width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                    <Terminal size={18} color="var(--primary)" />
                    <span style={{ fontSize: '0.9rem' }}>Designed & Built by Dharshith</span>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {[
                        { Icon: Github, href: '#' },
                        { Icon: Linkedin, href: '#' },
                        { Icon: Instagram, href: '#' },
                    ].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="interactive"
                            style={{ color: 'var(--text-muted)', transition: 'color 0.2s, transform 0.2s' }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = 'var(--primary)';
                                e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = 'var(--text-muted)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <item.Icon size={22} />
                        </a>
                    ))}
                </div>
            </footer>
        </section>
    );
};

export default Contact;
