import { motion } from 'framer-motion'
import config from '../data/config.json'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

const pillars = [
  {
    n: '01',
    title: 'Punctual response',
    body: 'Emergency or scheduled — we arrive when we say we will, and work until the job is done.',
  },
  {
    n: '02',
    title: 'Honest diagnosis',
    body: 'We identify the root cause before recommending any work. No upselling, no unnecessary replacements.',
  },
  {
    n: '03',
    title: 'Professional materials',
    body: 'Industry-grade components exclusively — chosen for longevity and performance, not cost-cutting.',
  },
  {
    n: '04',
    title: 'Clean finish',
    body: 'Every site is left as we found it, or better. The work is invisible; the result speaks for itself.',
  },
]

export default function About() {
  const city = config.brand.location.split(' · ')[0]
  const [para1, para2] = config.philosophy.text.split('\n\n')

  return (
    <section id="about" style={{ padding: '8rem 3rem', background: config.palette.sectionBg, borderTop: '1px solid rgba(26,24,23,0.07)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '5fr 6fr', gap: '6rem', alignItems: 'start' }}>

        {/* Left — label + heading + image */}
        <div>
          <motion.div {...fade(0.05)} style={{ marginBottom: '1.75rem' }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 500,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(26,24,23,0.38)',
            }}>The Studio</span>
          </motion.div>

          <motion.h2 {...fade(0.1)} style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
            fontWeight: 800, color: '#1A1817', lineHeight: 1.0,
            marginBottom: '2.5rem',
            letterSpacing: '-0.03em',
          }}>
            Craftsmanship rooted<br />
            in{' '}
            <span style={{ borderBottom: `3px solid ${config.brand.accentColor}`, paddingBottom: '2px' }}>{city}.</span>
          </motion.h2>

          <motion.div {...fade(0.15)} style={{ position: 'relative', height: '460px', overflow: 'hidden', border: '1px solid rgba(26,24,23,0.08)' }}>
            <img
              src={config.images.about}
              alt={`${config.brand.name} — studio`}
              loading="lazy"
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                display: 'block', transition: 'transform 0.8s ease',
              }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            />
          </motion.div>

          <motion.p {...fade(0.2)} style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 300,
            color: 'rgba(26,24,23,0.4)', letterSpacing: '0.04em',
            marginTop: '0.75rem',
          }}>
            Serving {city} — available for emergency and scheduled callouts.
          </motion.p>
        </div>

        {/* Right — body text + numbered pillars */}
        <div style={{ paddingTop: '4.5rem' }}>
          <motion.p {...fade(0.2)} style={{
            fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300,
            lineHeight: 1.95, color: 'rgba(26,24,23,0.75)', marginBottom: '0.85rem',
          }}>
            {para1}
          </motion.p>

          {para2 && (
            <motion.p {...fade(0.25)} style={{
              fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300,
              lineHeight: 1.95, color: 'rgba(26,24,23,0.75)', marginBottom: '3rem',
            }}>
              {para2}
            </motion.p>
          )}

          <div>
            {pillars.map(({ n, title, body }, i) => (
              <motion.div key={n} {...fade(0.3 + i * 0.08)} style={{
                display: 'grid', gridTemplateColumns: '2.5rem 1fr',
                gap: '1rem', alignItems: 'start',
                padding: '1.5rem 0',
                borderTop: '1px solid rgba(26,24,23,0.08)',
              }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 400,
                  color: 'rgba(26,24,23,0.28)', letterSpacing: '0.08em', paddingTop: '0.15rem',
                }}>{n}</div>
                <div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', fontWeight: 600,
                    color: '#1A1817', marginBottom: '0.3rem',
                  }}>{title}</div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 300,
                    color: 'rgba(26,24,23,0.55)', lineHeight: 1.75, fontStyle: 'italic',
                  }}>{body}</div>
                </div>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid rgba(26,24,23,0.08)' }} />
          </div>
        </div>

      </div>
    </section>
  )
}
