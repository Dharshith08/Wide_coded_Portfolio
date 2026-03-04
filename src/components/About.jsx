import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" style={{ padding: '8rem 2rem', position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

                {/* Left Column: Who I Am */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>01.</span> WHO I AM
                    </h2>
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '12px' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '1.5rem' }}>
                            Hi, I'm <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Dharshith</span> — a second-year BCA student driven by curiosity, logic, and the obsession to build meaningful technology.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
                            I don't just study concepts. I experiment with them, implement them, debug them, and understand them from the system level. I believe real learning happens when theory meets execution.
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: What I Do */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>02.</span> CORE MODULES
                    </h2>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {[
                            { title: 'SOFTWARE ENGINEERING', desc: 'Crafting clean architectures, scalable backend systems, and high-performance applications.' },
                            { title: 'APP DEVELOPMENT', desc: 'Building seamless cross-platform mobile experiences with React Native & Flutter.' },
                            { title: 'AI & LLM', desc: 'Integrating cutting-edge language models into intelligent and contextual software.' },
                            { title: 'HARDWARE & IOT', desc: 'Bridging code and physical reality through microcontrollers and sensors.' }
                        ].map((skill, index) => (
                            <motion.div
                                key={index}
                                className="glass interactive"
                                whileHover={{ x: 10, borderColor: 'var(--secondary)' }}
                                style={{ padding: '1.5rem', borderLeft: '3px solid var(--secondary)', transition: 'border-color 0.3s ease' }}
                            >
                                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '1px' }}>{skill.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{skill.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
