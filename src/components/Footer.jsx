import { useIsMobile } from '../hooks/useIsMobile'
import config from '../data/config.json'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

export default function Footer() {
  const isMobile = useIsMobile()
  const year = new Date().getFullYear()
  const addressLines = config.contact.address.split(', ')

  return (
    <footer style={{ background: '#1A1817', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Large wordmark */}
      <div style={{
        textAlign: 'center',
        padding: isMobile ? '3rem 1.5rem 2.5rem' : '5rem 3rem 4rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(2.8rem, 8vw, 8rem)',
          fontWeight: 800, color: config.brand.accentColor,
          letterSpacing: '-0.03em', lineHeight: 1,
        }}>
          {config.brand.name}
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 300,
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)', marginTop: '1.25rem',
        }}>
          {config.brand.location}
        </div>
      </div>

      {/* Columns */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
        gap: isMobile ? '2rem' : '3rem',
        padding: isMobile ? '2.5rem 1.5rem' : '3.5rem 3rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 240 }}>
            "{config.brand.tagline}"
          </p>
        </div>

        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '1.25rem' }}>Navigate</div>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap', gap: isMobile ? '0.5rem 1.5rem' : '0.65rem' }}>
            {['Services', 'Gallery', 'About', 'Book'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', fontWeight: 300,
                color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                transition: 'color 0.3s ease', letterSpacing: '0.02em',
              }}
                onMouseEnter={e => e.currentTarget.style.color = config.brand.accentColor}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              >{l}</a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '1.25rem' }}>Find Us</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {[...addressLines, 'By appointment'].map((line, i) => (
              <div key={i} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em' }}>{line}</div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              {config.contact.instagram && (
                <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.color = config.brand.accentColor}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                ><InstagramIcon /></a>
              )}
              {config.contact.facebook && (
                <a href={config.contact.facebook} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.3s ease', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.color = config.brand.accentColor}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                ><FacebookIcon /></a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '1.25rem 1.5rem' : '1.25rem 3rem',
        flexWrap: 'wrap', gap: '0.5rem',
      }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
          © {year} {config.brand.name}
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
          Crafted with precision
        </span>
      </div>
    </footer>
  )
}
