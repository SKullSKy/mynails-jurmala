import { motion } from 'framer-motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function About() {
  return (
    <section id="about" style={{ padding: '7rem 3rem', background: '#FFF9F7', borderTop: '1px solid rgba(183,110,121,0.1)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

        {/* Left — image pair */}
        <div style={{ position: 'relative' }}>
          {/* Main image */}
          <div style={{ height: 420, overflow: 'hidden', border: '1px solid rgba(74,85,104,0.08)', background: '#F5F0EB' }}>
            <img
              src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=85&fm=webp"
              alt="Nail artistry at work"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {/* Floating accent card */}
          <motion.div {...fade(0.3)} style={{
            position: 'absolute', bottom: -28, right: -28,
            background: '#B76E79', padding: '1.5rem 2rem',
            boxShadow: '0 8px 32px rgba(183,110,121,0.25)',
          }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 300, color: '#fff', lineHeight: 1 }}>6+</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
              years in Jūrmala
            </div>
          </motion.div>
        </div>

        {/* Right — copy */}
        <div style={{ paddingRight: '1rem' }}>
          <motion.div {...fade(0.1)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <div style={{ width: 24, height: 1, background: '#B76E79' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#B76E79' }}>The Studio</span>
          </motion.div>

          <motion.h2 {...fade(0.15)} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,4vw,3rem)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Artistry rooted<br />
            <em style={{ fontStyle: 'italic', color: '#B76E79' }}>in Jūrmala.</em>
          </motion.h2>

          <motion.p {...fade(0.2)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300, lineHeight: 1.9, color: 'rgba(74,85,104,0.7)', marginBottom: '1.25rem' }}>
            My Nails Jūrmala was built on a simple conviction: that nail care
            should feel like an event, not an errand. Every appointment is given
            its full time — no rushing, no compromise on finish.
          </motion.p>
          <motion.p {...fade(0.25)} style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 300, lineHeight: 1.9, color: 'rgba(74,85,104,0.7)', marginBottom: '2rem' }}>
            The studio is located minutes from Jomas iela, designed to be calm
            and unhurried. We use professional-grade products exclusively, and
            every technique is practiced to a standard we would choose ourselves.
          </motion.p>

          <motion.div {...fade(0.3)} style={{ display: 'flex', gap: '2.5rem' }}>
            {[['500+', 'Clients served'], ['4.9★', 'Google rating'], ['6+', 'Years open']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 300, color: '#1A1A1A', lineHeight: 1 }}>{val}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(74,85,104,0.5)', marginTop: '0.25rem', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
