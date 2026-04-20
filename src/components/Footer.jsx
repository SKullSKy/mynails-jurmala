export default function Footer() {
  return (
    <footer style={{ background: '#F5F0EB', borderTop: '1px solid rgba(74,85,104,0.08)', padding: '2.5rem 3rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 400, color: '#1A1A1A' }}>My Nails Jūrmala</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(74,85,104,0.5)', marginTop: '0.2rem', letterSpacing: '0.06em' }}>Jomas iela, Jūrmala · By appointment</div>
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(74,85,104,0.4)', letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} My Nails Jūrmala
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Services', 'Gallery', 'About', 'Book'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(74,85,104,0.5)', textDecoration: 'none', transition: 'color 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#B76E79'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(74,85,104,0.5)'}
            >{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
