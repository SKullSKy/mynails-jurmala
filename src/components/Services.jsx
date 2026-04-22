import { useEffect, useRef } from 'react'
import config from '../data/config.json'

function ServiceRow({ item, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity = '0'; el.style.transform = 'translateX(-8px)'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
          el.style.opacity = '1'; el.style.transform = 'translateX(0)'
        }, index * 60)
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: '1fr auto',
      gap: '1rem', alignItems: 'start',
      padding: '1.1rem 0',
      borderBottom: '1px solid rgba(26,24,23,0.07)',
    }}>
      <div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#1A1817', marginBottom: '0.2rem' }}>
          {item.name}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(26,24,23,0.5)' }}>
          {item.description}
        </div>
      </div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 500, color: config.brand.accentColor, whiteSpace: 'nowrap' }}>
        {item.price}
      </div>
    </div>
  )
}

export default function Services() {
  const mid = Math.ceil(config.services.length / 2)
  const col1 = config.services.slice(0, mid)
  const col2 = config.services.slice(mid)

  return (
    <section id="services" style={{ padding: '7rem 3rem', background: config.palette.sectionBg, borderTop: '1px solid rgba(26,24,23,0.07)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '5rem', alignItems: 'end' }}>
          <div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(26,24,23,0.38)', marginBottom: '1.25rem',
            }}>
              Services & Pricing
            </div>
            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              fontWeight: 800, color: '#1A1817', lineHeight: 1.0,
              letterSpacing: '-0.03em',
            }}>
              Every call,<br />
              <span style={{ borderBottom: `3px solid ${config.brand.accentColor}`, paddingBottom: '2px' }}>resolved.</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(26,24,23,0.6)', paddingBottom: '0.5rem' }}>
            All works use professional-grade materials. Pricing provided after initial assessment.
            Available for emergency callouts and scheduled appointments across Latvia.
          </p>
        </div>

        {/* Service columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 5rem' }}>
          <div>
            {col1.map((item, i) => <ServiceRow key={item.id} item={item} index={i} />)}
          </div>
          <div>
            {col2.map((item, i) => <ServiceRow key={item.id} item={item} index={mid + i} />)}
          </div>
        </div>

        {/* Book CTA */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <a href="#book"
            style={{
              display: 'inline-block',
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#fff', background: '#1A1817',
              border: '1px solid #1A1817',
              padding: '0.9rem 2.5rem', textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = config.brand.accentColor; e.currentTarget.style.borderColor = config.brand.accentColor }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1A1817'; e.currentTarget.style.borderColor = '#1A1817' }}
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  )
}
