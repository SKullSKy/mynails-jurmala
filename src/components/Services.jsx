import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    category: 'Manicure',
    items: [
      { name: 'Classic Manicure', desc: 'Shape, cuticle care, buff and polish', duration: '45 min', price: '€25' },
      { name: 'Gel Manicure', desc: 'Long-wear gel colour, up to 3 weeks', duration: '60 min', price: '€35' },
      { name: 'Gel Removal', desc: 'Safe soak-off with nail conditioning', duration: '20 min', price: '€12' },
    ],
  },
  {
    category: 'Nail Art',
    items: [
      { name: 'French Tip', desc: 'Classic or coloured French finish', duration: '75 min', price: '€42' },
      { name: 'Nail Art Design', desc: 'Custom artwork, per nail (consult for complexity)', duration: '90 min', price: 'From €55' },
      { name: 'Ombre & Gradient', desc: 'Two or more colour blending, gel finish', duration: '90 min', price: '€48' },
    ],
  },
  {
    category: 'Pedicure',
    items: [
      { name: 'Classic Pedicure', desc: 'Soak, shape, cuticle care, polish', duration: '55 min', price: '€32' },
      { name: 'Spa Pedicure', desc: 'Extended treatment with scrub and mask', duration: '75 min', price: '€48' },
      { name: 'Gel Pedicure', desc: 'Long-wear colour with full foot care', duration: '70 min', price: '€45' },
    ],
  },
  {
    category: 'Extensions',
    items: [
      { name: 'Acrylic Full Set', desc: 'Full nail extension with gel colour finish', duration: '120 min', price: '€65' },
      { name: 'Gel Extensions', desc: 'Natural-look hard gel set, any length', duration: '100 min', price: '€58' },
      { name: 'Infill', desc: 'Regrowth fill for existing extensions', duration: '60 min', price: '€38' },
    ],
  },
]

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
      borderBottom: '1px solid rgba(74,85,104,0.08)',
    }}>
      <div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 400, color: '#1A1A1A', marginBottom: '0.2rem' }}>
          {item.name}
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(74,85,104,0.6)' }}>
          {item.desc} · {item.duration}
        </div>
      </div>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 400, color: '#B76E79', whiteSpace: 'nowrap' }}>
        {item.price}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" style={{ padding: '7rem 3rem', background: '#FDF6F0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '5rem', alignItems: 'end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{ width: 24, height: 1, background: '#B76E79' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B76E79' }}>Services & Pricing</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.1 }}>
              Every service,<br />
              <em style={{ fontStyle: 'italic', color: '#B76E79' }}>refined.</em>
            </h2>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(74,85,104,0.65)', paddingBottom: '0.5rem' }}>
            All treatments use professional-grade products. Prices include materials.
            Appointment required — walk-ins accommodated where availability allows.
          </p>
        </div>

        {/* Service columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 5rem' }}>
          {services.map((cat, ci) => (
            <div key={cat.category}>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(74,85,104,0.4)', marginBottom: '0.75rem',
                paddingBottom: '0.75rem', borderBottom: '1px solid rgba(183,110,121,0.2)',
              }}>{cat.category}</div>
              {cat.items.map((item, i) => (
                <ServiceRow key={item.name} item={item} index={ci * 3 + i} />
              ))}
            </div>
          ))}
        </div>

        {/* Book CTA */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <a href="#book"
            /* ── BOOKLA: data-bookla-company="COMPANY_ID" data-bookla-service="SERVICE_ID" ── */
            style={{
              display: 'inline-block',
              fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 400,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#B76E79', border: '1px solid rgba(183,110,121,0.4)',
              padding: '0.9rem 2.5rem', textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#B76E79'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(183,110,121,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B76E79'; e.currentTarget.style.boxShadow = 'none' }}
          >
            Book Your Appointment
          </a>
        </div>
      </div>
    </section>
  )
}
