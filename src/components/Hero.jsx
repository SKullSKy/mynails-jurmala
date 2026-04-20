import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Left — content */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '9rem 3rem 5rem',
        background: '#FAFAF8',
        position: 'relative', zIndex: 1,
      }}>
        <motion.div {...fade(0.1)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.75rem' }}>
          <div style={{ width: 24, height: 1, background: '#B76E79' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B76E79' }}>
            Jūrmala, Latvia
          </span>
        </motion.div>

        <motion.h1 {...fade(0.2)} style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 5.5vw, 5rem)',
          fontWeight: 300, lineHeight: 1.05,
          color: '#1A1A1A', letterSpacing: '-0.01em',
          marginBottom: '1.5rem',
        }}>
          The most<br />
          <em style={{ fontStyle: 'italic', color: '#B76E79' }}>precise detail</em><br />
          in your day.
        </motion.h1>

        <motion.p {...fade(0.3)} style={{
          fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300,
          lineHeight: 1.85, color: 'rgba(74,85,104,0.7)',
          maxWidth: 380, marginBottom: '2.5rem',
        }}>
          Nail artistry as a considered ritual. Each appointment unhurried,
          each finish exact — because the details you carry with you matter.
        </motion.p>

        <motion.div {...fade(0.4)} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#book"
            /* ── BOOKLA: data-bookla-company="COMPANY_ID" data-bookla-service="SERVICE_ID" ── */
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 400,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', background: '#B76E79',
              padding: '0.9rem 2.2rem', textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(183,110,121,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#9E5A64'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(183,110,121,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#B76E79'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(183,110,121,0.3)' }}
          >
            Book Your Appointment
          </a>
          <a href="#services" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'rgba(74,85,104,0.65)', border: '1px solid rgba(74,85,104,0.2)',
            padding: '0.9rem 2.2rem', textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#B76E79'; e.currentTarget.style.color = '#B76E79' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,85,104,0.2)'; e.currentTarget.style.color = 'rgba(74,85,104,0.65)' }}
          >
            View Services
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
          style={{ position: 'absolute', bottom: '2.5rem', left: '3rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 1, background: 'rgba(183,110,121,0.4)' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(183,110,121,0.5)' }}>Scroll</span>
        </motion.div>
      </div>

      {/* Right — full-bleed nail photography */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#F5F0EB' }}>
        <img
          src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=90&fm=webp"
          alt="Elegant nail artistry close-up"
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Soft left fade into cream */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(250,250,248,0.4) 0%, transparent 30%)',
          pointerEvents: 'none',
        }} />
      </div>
    </section>
  )
}
