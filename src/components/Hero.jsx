import { useIsMobile } from '../hooks/useIsMobile'
import config from '../data/config.json'

const fadeUp = (delay = 0) => ({
  style: {
    opacity: 0,
    animation: `fadeUp 0.8s ease-out ${delay}s forwards`,
  },
})

export default function Hero() {
  const isMobile = useIsMobile()
  const city = config.brand.location.split(' · ')[0]

  if (isMobile) {
    return (
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: config.palette.heroBg }}>

        {/* Image — top banner */}
        <div style={{ position: 'relative', height: '55vw', minHeight: 220, maxHeight: 340, overflow: 'hidden', background: '#E8E4DE' }}>
          <img
            src={config.images.hero}
            alt={`${config.brand.name} — hero image`}
            loading="eager"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 65%', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(242,240,235,0.7) 100%)', pointerEvents: 'none' }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem 1.5rem 3rem' }}>
          <div style={{ ...fadeUp(0.1).style, display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem' }}>
            <div style={{ width: 24, height: 1, background: config.brand.accentColor }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: config.brand.accentColor }}>
              {config.brand.location}
            </span>
          </div>

          <h1 style={{
            ...fadeUp(0.2).style,
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(2.4rem, 11vw, 3.5rem)',
            fontWeight: 800, lineHeight: 1.0,
            color: '#1A1817', letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}>
            {config.hero.headlineLine1}<br />
            <span style={{ display: 'inline-block', borderBottom: `2px solid ${config.brand.accentColor}`, paddingBottom: '3px', marginBottom: '0.05em' }}>
              {config.hero.headlineAccent}
            </span><br />
            {config.hero.headlineLine3}
          </h1>

          <p style={{
            ...fadeUp(0.3).style,
            fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 300,
            lineHeight: 1.85, color: 'rgba(26,24,23,0.65)',
            marginBottom: '2.5rem',
          }}>
            {config.hero.subheadline}
          </p>

          <div style={{ ...fadeUp(0.4).style, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="#book" style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#F2F0EB', background: '#1A1817',
              padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block',
              transition: 'background 0.3s ease', flex: 1, textAlign: 'center',
            }}>{config.hero.ctaText}</a>
            <a href="#services" style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 400,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: '#1A1817', border: '1px solid rgba(26,24,23,0.3)',
              padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block',
              transition: 'all 0.3s ease', flex: 1, textAlign: 'center',
            }}>Our Services</a>
          </div>
        </div>
      </section>
    )
  }

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
        padding: '9rem 4rem 6rem 15%',
        background: config.palette.heroBg,
        position: 'relative', zIndex: 1,
        minHeight: '100vh',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-60px', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Inter, sans-serif', fontSize: '500px', fontWeight: 800,
          lineHeight: 1, color: '#EBE8E0', userSelect: 'none', pointerEvents: 'none',
          zIndex: 0, letterSpacing: '-0.06em', whiteSpace: 'nowrap',
        }}>01</div>

        <div style={{ ...fadeUp(0.1).style, display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <div style={{ width: 36, height: 1, background: config.brand.accentColor }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.28em', textTransform: 'uppercase', color: config.brand.accentColor }}>
            {config.brand.location}
          </span>
        </div>

        <h1 style={{
          ...fadeUp(0.2).style,
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.0,
          color: '#1A1817', letterSpacing: '-0.03em',
          marginBottom: '2.5rem', position: 'relative', zIndex: 1,
        }}>
          {config.hero.headlineLine1}<br />
          <span style={{ display: 'inline-block', borderBottom: `2px solid ${config.brand.accentColor}`, paddingBottom: '4px', marginBottom: '0.05em' }}>
            {config.hero.headlineAccent}
          </span><br />
          {config.hero.headlineLine3}
        </h1>

        <p style={{
          ...fadeUp(0.3).style,
          fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300,
          lineHeight: 1.95, color: 'rgba(26,24,23,0.65)',
          maxWidth: 360, marginBottom: '3.5rem', position: 'relative', zIndex: 1,
        }}>
          {config.hero.subheadline}
        </p>

        <div style={{ ...fadeUp(0.4).style, display: 'flex', gap: '1rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <a href="#book" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#F2F0EB', background: '#1A1817',
            padding: '1.1rem 2.75rem', textDecoration: 'none', borderRadius: 0,
            transition: 'background 0.3s ease', display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = config.brand.accentColor }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1A1817' }}
          >{config.hero.ctaText}</a>
          <a href="#services" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 400,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#1A1817', border: '1px solid rgba(26,24,23,0.3)',
            padding: '1.1rem 2.75rem', textDecoration: 'none', borderRadius: 0,
            transition: 'all 0.3s ease', display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = config.brand.accentColor; e.currentTarget.style.color = config.brand.accentColor }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,24,23,0.3)'; e.currentTarget.style.color = '#1A1817' }}
          >Our Services</a>
        </div>
      </div>

      {/* Right — full-bleed photography */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#E8E4DE', minHeight: '100vh' }}>
        <img
          src={config.images.hero}
          alt={`${config.brand.name} — hero image`}
          loading="eager"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: '50% 65%',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${config.palette.heroBg}66 0%, transparent 25%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          ...fadeUp(1.4).style,
          position: 'absolute', right: '1.25rem', bottom: '3rem',
          writingMode: 'vertical-rl', textOrientation: 'mixed',
          fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 300,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
        }}>
          Est. {city} {config.brand.established}
        </div>
      </div>
    </section>
  )
}
