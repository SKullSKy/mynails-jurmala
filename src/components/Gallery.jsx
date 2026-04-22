import { useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import config from '../data/config.json'

const ACCENT = config.brand.accentColor
const SECTION_BG = config.palette.sectionBg

const photos = Array.from(
  new Map((config.gallery ?? []).map(p => [p.src, p])).values()
)

export default function Gallery() {
  const isMobile = useIsMobile()
  const CARDS_VISIBLE = isMobile ? 1 : 3
  const [offset, setOffset] = useState(0)

  if (photos.length === 0) return null

  const maxOffset = Math.max(0, photos.length - CARDS_VISIBLE)
  const visible = photos.slice(offset, offset + CARDS_VISIBLE)

  const prev = () => setOffset(o => Math.max(0, o - 1))
  const next = () => setOffset(o => Math.min(maxOffset, o + 1))

  return (
    <section id="gallery" style={{ padding: isMobile ? '4rem 0' : '8rem 0', background: SECTION_BG, borderTop: '1px solid rgba(26,24,23,0.07)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '0 1.5rem' : '0 3rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(26,24,23,0.38)', marginBottom: '1rem',
          }}>Gallery</div>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.5rem)' : 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 800, color: '#1A1817', lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: '1rem',
          }}>
            Work that speaks for itself.
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 300,
            color: 'rgba(26,24,23,0.5)', maxWidth: 520, margin: '0 auto',
            lineHeight: 1.75,
          }}>
            {config.gallery_caption || 'A selection of our work — crafted with precision and care.'}
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(photos.length, CARDS_VISIBLE)}, 1fr)`, gap: isMobile ? '1rem' : '1.5rem' }}>
          {visible.map((photo) => (
            <div key={photo.src} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative', aspectRatio: isMobile ? '4/3' : '4/5', overflow: 'hidden' }}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: photo.objectPosition || 'center',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={e => { if (!isMobile) e.currentTarget.style.transform = 'scale(1.03)' }}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {photo.label && (
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: 'rgba(26,24,23,0.62)',
                    padding: '0.35rem 0.75rem',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff',
                  }}>{photo.label}</div>
                )}
              </div>
              <div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#1A1817', marginBottom: '0.2rem' }}>
                  {photo.alt}
                </div>
                {photo.subtitle && (
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 300, color: 'rgba(26,24,23,0.45)', fontStyle: 'italic' }}>
                    {photo.subtitle}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        {photos.length > CARDS_VISIBLE && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: isMobile ? '1.5rem' : '3rem' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(26,24,23,0.35)', letterSpacing: '0.1em' }}>
              {offset + 1} – {Math.min(offset + CARDS_VISIBLE, photos.length)} / {photos.length}
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[[-1, '←'], [1, '→']].map(([dir, label]) => (
                <button key={dir} onClick={dir === -1 ? prev : next}
                  disabled={(dir === -1 && offset === 0) || (dir === 1 && offset >= maxOffset)}
                  style={{
                    width: isMobile ? 48 : 44, height: isMobile ? 48 : 44,
                    background: 'transparent', border: '1px solid rgba(26,24,23,0.2)',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '1rem',
                    color: '#1A1817', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s ease',
                    opacity: ((dir === -1 && offset === 0) || (dir === 1 && offset >= maxOffset)) ? 0.25 : 1,
                  }}
                  onMouseEnter={e => { if (!e.currentTarget.disabled) { e.currentTarget.style.background = '#1A1817'; e.currentTarget.style.color = '#fff' } }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1817' }}
                >{label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
