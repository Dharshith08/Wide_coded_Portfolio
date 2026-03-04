import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <AnimatePresence>
      <CustomCursor />
      <Navbar />
      <div className="cyber-grid"></div>

      {/* Container for SPA scrolling */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: '100px' }}>

        {/* Hero Section */}
        <section id="home" style={{ minHeight: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ textAlign: 'center', maxWidth: '800px', zIndex: 10 }}
          >
            <div className="glass" style={{ padding: '3rem', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '2px solid var(--primary)', borderLeft: '2px solid var(--primary)' }}></div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '2px solid var(--primary)', borderRight: '2px solid var(--primary)' }}></div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  border: '1px solid var(--primary)',
                  background: 'rgba(0, 240, 255, 0.1)',
                  color: 'var(--primary)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  letterSpacing: '3px',
                  marginBottom: '1.5rem',
                  boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)'
                }}
              >
                SYSTEM // V2_ACTIVE
              </motion.div>

              <h1 className="glitch-text" data-text="DHARSHITH" style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: '700',
                marginBottom: '0.5rem',
                letterSpacing: '-2px',
                textTransform: 'uppercase'
              }}>
                DHARSHITH
              </h1>

              <h2 style={{
                fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
                fontWeight: '300',
                letterSpacing: '1px'
              }}>
                WEB DEVELOPER <span style={{ color: 'var(--accent)' }}>&</span> TECH ARCHITECT
              </h2>

              <p style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: 'var(--text-main)',
                marginBottom: '2.5rem',
                maxWidth: '600px',
                margin: '0 auto 2.5rem'
              }}>
                Initializing full-stack capabilities. Transforming concepts into blazing-fast, dynamic architectures.
              </p>

              <button
                className="interactive"
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'linear-gradient(45deg, rgba(255,0,60,0.8), rgba(255,0,60,0.2))',
                  border: '1px solid var(--secondary)',
                  color: 'var(--text-main)',
                  padding: '16px 40px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px rgba(255, 0, 60, 0.4)',
                  clipPath: 'polygon(15px 0%, 100% 0%, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0% 100%, 0% 15px)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(255, 0, 60, 0.7)';
                  e.currentTarget.style.background = 'linear-gradient(45deg, rgba(255,0,60,1), rgba(255,0,60,0.4))';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 60, 0.4)';
                  e.currentTarget.style.background = 'linear-gradient(45deg, rgba(255,0,60,0.8), rgba(255,0,60,0.2))';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                INITIALIZE PROTOCOL
              </button>
            </div>
          </motion.div>
        </section>

        {/* Other Sections */}
        <About />
        <Projects />
        <Contact />
      </div>
    </AnimatePresence>
  );
}

export default App;
