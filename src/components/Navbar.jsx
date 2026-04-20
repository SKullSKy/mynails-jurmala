import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Services', 'Gallery', 'About', 'Book']

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 3rem',
        background: scrolled ? 'rgba(250,250,248,0.96)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 rgba(74,85,104,0.08)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Wordmark */}
      <a href="#hero" style={{ textDecoration: 'none' }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '1.25rem', fontWeight: 400,
          color: '#1A1A1A', letterSpacing: '0.04em',
          lineHeight: 1.1,
        }}>
          My Nails
          <span style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(74,85,104,0.5)', marginTop: 1 }}>
            Jūrmala
          </span>
        </div>
      </a>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}>
        {links.slice(0, -1).map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`} style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(74,85,104,0.65)', textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
              onMouseEnter={e => e.target.style.color = '#B76E79'}
              onMouseLeave={e => e.target.style.color = 'rgba(74,85,104,0.65)'}
            >{link}</a>
          </li>
        ))}
        <li>
          <a href="#book"
            /* ── BOOKLA: replace href with data-bookla-* trigger once ID is provided ── */
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', background: '#B76E79',
              padding: '0.55rem 1.5rem', textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 12px rgba(183,110,121,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#9E5A64'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(183,110,121,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#B76E79'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(183,110,121,0.3)' }}
          >
            Book Now
          </a>
        </li>
      </ul>

      <style>{`@media(max-width:768px){nav ul{display:none!important}}`}</style>
    </motion.nav>
  )
}
