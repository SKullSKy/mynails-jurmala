import { useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import config from '../data/config.json'

const ACCENT = config.brand.accentColor
const SECTION_BG = config.palette.sectionBg

const INPUT = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(26,24,23,0.18)', padding: '0.75rem 0',
  fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 300,
  color: '#1A1817', outline: 'none', borderRadius: 0, transition: 'border-color 0.3s ease',
}

const LABEL = {
  display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500,
  letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,24,23,0.38)', marginBottom: '0.35rem',
}

export default function Contact() {
  const isMobile = useIsMobile()
  const [form, setForm] = useState({ name: '', business: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    if (!form.name || !form.message) return
    const subject = encodeURIComponent(`Quote Request — ${form.business || form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nBusiness: ${form.business}\n\n${form.message}`)
    if (config.contact.email) {
      window.location.href = `mailto:${config.contact.email}?subject=${subject}&body=${body}`
    }
    setSent(true)
  }

  const whatsappHref = config.contact.whatsapp
    ? `https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}`
    : null

  return (
    <section id="book" style={{ padding: isMobile ? '4rem 1.5rem' : '7rem 3rem', background: SECTION_BG, borderTop: '1px solid rgba(26,24,23,0.07)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2.5rem' : '7rem', alignItems: 'start' }}>

        {/* Left — info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <div style={{ width: 28, height: 1, background: ACCENT }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: ACCENT }}>Get in Touch</span>
          </div>

          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: isMobile ? 'clamp(2rem, 9vw, 2.8rem)' : 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#1A1817', lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: '1.5rem',
          }}>
            Request<br />
            <span style={{ borderBottom: `2px solid ${ACCENT}`, paddingBottom: '3px' }}>a quote.</span>
          </h2>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300, lineHeight: 1.85, color: 'rgba(26,24,23,0.6)', marginBottom: '2rem', maxWidth: 360 }}>
            Tell us about your project — the space, the size, your brand colours. We'll come back with a precise proposal.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {config.contact.phone && (
              <a href={`tel:${config.contact.phone}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,24,23,0.35)' }}>Phone</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 400, color: '#1A1817', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = ACCENT}
                  onMouseLeave={e => e.currentTarget.style.color = '#1A1817'}
                >{config.contact.phone}</span>
              </a>
            )}
            {config.contact.address && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,24,23,0.35)' }}>Location</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300, color: '#1A1817' }}>{config.contact.address}</span>
              </div>
            )}
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#fff', background: '#25D366',
                padding: '0.85rem 1.75rem', textDecoration: 'none',
                transition: 'opacity 0.3s ease', marginTop: '0.5rem', alignSelf: 'flex-start',
                width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'center' : 'flex-start',
                boxSizing: 'border-box',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Right — form */}
        <div>
          {sent ? (
            <div style={{ padding: '3rem', border: '1px solid rgba(26,24,23,0.08)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT, marginBottom: '1rem' }}>
                Message received
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300, color: 'rgba(26,24,23,0.65)', lineHeight: 1.8 }}>
                Thank you. We'll review your project and be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <label style={LABEL}>Your Name *</label>
                <input name="name" required value={form.name} onChange={handle} placeholder="Anna Bērziņa" style={INPUT}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,24,23,0.18)'}
                />
              </div>
              <div>
                <label style={LABEL}>Business / Brand</label>
                <input name="business" value={form.business} onChange={handle} placeholder="Your studio or company name" style={INPUT}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,24,23,0.18)'}
                />
              </div>
              <div>
                <label style={LABEL}>Project Details *</label>
                <textarea name="message" required value={form.message} onChange={handle}
                  placeholder="Describe your space, the size you have in mind, and your brand colours."
                  rows={5} style={{ ...INPUT, resize: 'vertical', lineHeight: 1.7 }}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,24,23,0.18)'}
                />
              </div>
              <button type="submit" style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 500,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#fff', background: '#1A1817', border: 'none',
                padding: '1.1rem 2.5rem', cursor: 'pointer',
                transition: 'background 0.3s ease',
                width: isMobile ? '100%' : 'auto', alignSelf: isMobile ? 'stretch' : 'flex-start',
              }}
                onMouseEnter={e => e.currentTarget.style.background = ACCENT}
                onMouseLeave={e => e.currentTarget.style.background = '#1A1817'}
              >Send Request</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
