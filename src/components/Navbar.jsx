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
  const links = ['Services', 'Gallery', 'About', 'Book']
  const city = config.brand.location.split(' · ')[0]

  return (
    <nav
      style={{
        animation: 'fadeUp 0.6s ease-out forwards',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 3rem',
        background: '#1A1817',
      }}
    >
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

      {/* Links */}
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

        {/* Social icons */}
        <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {config.contact.instagram && (
            <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = config.brand.accentColor}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
            >
              <InstagramIcon />
            </a>
          )}
          {config.contact.facebook && (
            <a href={config.contact.facebook} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.38)', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = config.brand.accentColor}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}
            >
              <FacebookIcon />
            </a>
          )}
        </li>

        <li>
          <a href="#book"
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.4)',
              padding: '0.55rem 1.5rem', textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#1A1817'; e.currentTarget.style.borderColor = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
          >
            Book Now
          </a>
        </li>
      </ul>

      <style>{`@media(max-width:768px){nav ul{display:none!important}}`}</style>
    </nav>
  )
}
