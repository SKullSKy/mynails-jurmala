import { useEffect, useRef } from 'react'

// Nail photography — all sourced from Unsplash, .webp format
const photos = [
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85&fm=webp', alt: 'Soft pink gel nails close-up', span: 'row' },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&fm=webp', alt: 'French tip manicure detail', span: '' },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&fm=webp', alt: 'Rose gold nail art', span: '' },
  { src: 'https://images.unsplash.com/photo-1604655852743-a5e8e8b8fe13?w=800&q=85&fm=webp', alt: 'Nude almond nails', span: 'col' },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&fm=webp', alt: 'Gel manicure side profile', span: '' },
  { src: 'https://images.unsplash.com/photo-1604655852743-a5e8e8b8fe13?w=600&q=80&fm=webp', alt: 'Ombre nail design', span: '' },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85&fm=webp', alt: 'Classic red manicure', span: '' },
  { src: 'https://images.unsplash.com/photo-1604655852743-a5e8e8b8fe13?w=800&q=85&fm=webp', alt: 'Nail art detail', span: '' },
]

// Real varied nail photography sources
const nailPhotos = [
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85&fm=webp', alt: 'Elegant pink gel manicure', wide: true, tall: false },
  { src: 'https://images.unsplash.com/photo-1604655852743-a5e8e8b8fe13?w=600&q=85&fm=webp', alt: 'French tip nail art', wide: false, tall: true },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=85&fm=webp', alt: 'Rose gold nail detail', wide: false, tall: false },
  { src: 'https://images.unsplash.com/photo-1604655852743-a5e8e8b8fe13?w=800&q=85&fm=webp', alt: 'Nude almond nails', wide: true, tall: false },
  { src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=85&fm=webp', alt: 'Gel manicure profile', wide: false, tall: false },
  { src: 'https://images.unsplash.com/photo-1604655852743-a5e8e8b8fe13?w=600&q=85&fm=webp', alt: 'Nail art with floral detail', wide: false, tall: true },
]

function GalleryItem({ photo, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity = '0'; el.style.transform = 'scale(0.97)'
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
          el.style.opacity = '1'; el.style.transform = 'scale(1)'
        }, index * 80)
        obs.disconnect()
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      gridColumn: photo.wide ? 'span 2' : 'span 1',
      gridRow: photo.tall ? 'span 2' : 'span 1',
      minHeight: photo.tall ? '460px' : '230px',
      background: '#F5F0EB',
    }}>
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.6s ease',
          display: 'block',
        }}
        onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      />
      {/* Rose tint hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(183,110,121,0)',
        transition: 'background 0.4s ease',
        pointerEvents: 'none',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(183,110,121,0.08)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(183,110,121,0)'}
      />
      {/* Corner bracket — bottom right */}
      <div style={{
        position: 'absolute', bottom: 10, right: 10, width: 14, height: 14,
        borderBottom: '1px solid rgba(183,110,121,0.4)',
        borderRight: '1px solid rgba(183,110,121,0.4)',
        pointerEvents: 'none',
      }} />
    </div>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" style={{ padding: '7rem 3rem', background: '#F5F0EB' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
              <div style={{ width: 24, height: 1, background: '#B76E79' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B76E79' }}>Gallery</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,4vw,3rem)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.1 }}>
              Work that<br />
              <em style={{ fontStyle: 'italic', color: '#B76E79' }}>speaks.</em>
            </h2>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(74,85,104,0.6)', maxWidth: 320 }}>
            Every set photographed in natural Jūrmala light. No filters — just the work.
          </p>
        </div>

        {/* Asymmetric mosaic */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '3px',
        }}>
          {nailPhotos.map((photo, i) => (
            <GalleryItem key={i} photo={photo} index={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(74,85,104,0.45)', letterSpacing: '0.06em' }}>
            Follow us on Instagram for daily updates — <span style={{ color: '#B76E79' }}>@mynailsjurmala</span>
          </p>
        </div>
      </div>
    </section>
  )
}
