import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass interactive"
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                border: '1px solid rgba(255,255,255,0.05)',
                cursor: 'none'
            }}
            whileHover={{ y: -5, borderColor: 'var(--primary)' }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 240, 255, 0.1),
              transparent 80%
            )
          `,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{project.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {project.tech.map((tech, i) => (
                        <span key={i} style={{
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            background: 'rgba(0, 240, 255, 0.1)',
                            color: 'var(--primary)',
                            borderRadius: '999px',
                            border: '1px solid rgba(0,240,255,0.2)'
                        }}>
                            {tech}
                        </span>
                    ))}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
                    {project.description}
                </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', zIndex: 1 }}>
                <a href="#" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-main)'}>
                    <Github size={18} /> Source
                </a>
                <a href="#" className="interactive" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-main)'}>
                    <ExternalLink size={18} /> Live Demo
                </a>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const projects = [
        {
            title: 'Neural Engine Core',
            description: 'A robust microservices backend architected with Node.js and gRPC, designed for massive scale and minimal latency data processing.',
            tech: ['Node.js', 'gRPC', 'PostgreSQL', 'Docker']
        },
        {
            title: 'Quantum UI Toolkit',
            description: 'An open-source React component library embodying neo-brutalism and cyberpunk aesthetics. Highly optimized with Framer Motion.',
            tech: ['React', 'Framer Motion', 'Tailwind']
        },
        {
            title: 'SecurNet Proxy',
            description: 'A high-performance reverse proxy and load balancer written in Go, featuring dynamic SSL termination and real-time threat analysis.',
            tech: ['Go', 'Redis', 'WebSockets', 'Lua']
        }
    ];

    return (
        <section id="projects" style={{ padding: '8rem 2rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '3rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '1rem', color: 'var(--primary)' }}>03.</span> ARCHIVES // DEPLOYMENTS
                    </h2>
                    <div style={{ width: '100px', height: '4px', background: 'var(--primary)', marginTop: '1rem' }} />
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
