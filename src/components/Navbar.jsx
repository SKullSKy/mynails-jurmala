import { useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import config from '../data/config.json'

const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export default function Navbar() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const links = ['Services', 'Gallery', 'About', 'Book']
  const city = config.brand.location.split(' · ')[0]

  return (
    <>
      <nav style={{
        animation: 'fadeUp 0.6s ease-out forwards',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 1.25rem' : '0 3rem',
        background: '#1A1817',
      }}>
        {/* Wordmark */}
        <a href="#hero" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.1rem', fontWeight: 700,
            color: config.brand.accentColor, letterSpacing: '0.02em',
            lineHeight: 1.1,
          }}>
            {config.brand.shortName ?? config.brand.name}
            <span style={{
              display: 'block', fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem', fontWeight: 400,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)', marginTop: 1,
            }}>
              {city}
            </span>
          </div>
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}>
            {links.slice(0, -1).map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 300,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                >{link}</a>
              </li>
            ))}
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {config.contact.instagram && (
                <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = config.brand.accentColor}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
                ><InstagramIcon /></a>
              )}
              {config.contact.facebook && (
                <a href={config.contact.facebook} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => e.currentTarget.style.color = config.brand.accentColor}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
                ><FacebookIcon /></a>
              )}
            </li>
            <li>
              <a href="#book" style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#fff', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.4)',
                padding: '0.55rem 1.5rem', textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1A1817'; e.currentTarget.style.borderColor = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
              >Book Now</a>
            </li>
          </ul>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setOpen(o => !o)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
          }}>
            <span style={{ display: 'block', width: 22, height: 1.5, background: open ? 'transparent' : '#fff', transition: 'all 0.3s' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#fff', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translateY(-3px)' : 'none', transformOrigin: 'center' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: '#fff', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translateY(-3px)' : 'none', transformOrigin: 'center' }} />
          </button>
        )}
      </nav>

      {/* Mobile slide-down menu */}
      {isMobile && open && (
        <div style={{
          position: 'fixed', top: 68, left: 0, right: 0, zIndex: 999,
          background: '#1A1817',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '1.5rem 1.25rem 2rem',
          animation: 'fadeUp 0.25s ease-out forwards',
        }}>
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                padding: '0.9rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >{link}</a>
          ))}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            {config.contact.instagram && (
              <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
              ><InstagramIcon /></a>
            )}
            {config.contact.facebook && (
              <a href={config.contact.facebook} target="_blank" rel="noopener noreferrer"
                style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}
              ><FacebookIcon /></a>
            )}
          </div>
        </div>
      )}
    </>
  )
}
