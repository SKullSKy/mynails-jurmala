import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DOMPurify from 'dompurify'
import { z } from 'zod'
import config from '../data/config.json'

const ACCENT = config.brand.accentColor
const SECTION_BG = config.palette.sectionBg
const _rgb = (hex) => { const r = parseInt(hex.slice(1,3),16); const g = parseInt(hex.slice(3,5),16); const b = parseInt(hex.slice(5,7),16); return `${r},${g},${b}` }
const ACCENT_RGB = _rgb(ACCENT)
const ac = (o) => `rgba(${ACCENT_RGB},${o})`

// ── BOOKLA CONFIGURATION ──────────────────────────────────────────────────────
// Set VITE_BOOKLA_COMPANY_ID and VITE_BOOKLA_SERVICE_ID in your .env file.
// Never hardcode these values here — they are read from the environment at
// build time so they remain outside the committed source tree.
const BOOKLA_COMPANY_ID = import.meta.env.VITE_BOOKLA_COMPANY_ID ?? ''
const BOOKLA_SERVICE_ID = import.meta.env.VITE_BOOKLA_SERVICE_ID ?? ''
// ─────────────────────────────────────────────────────────────────────────────

const bookingSchema = z.object({
  name: z.string().min(2, 'Your name is required'),
  email: z.string().email('A valid email address is required'),
  phone: z.string().regex(/^[+\d\s\-()]{7,20}$/, 'Enter a valid phone number').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
})

const services = config.services.map(s => ({ id: s.id, label: s.name, duration: s.duration, price: s.price }))

const timeSlots = [
  '09:00', '09:45', '10:30', '11:15',
  '12:00', '13:30', '14:15', '15:00',
  '15:45', '16:30', '17:15', '18:00',
]

// Generate the next 21 days for the calendar strip
function getDays() {
  const days = []
  const today = new Date()
  for (let i = 1; i <= 21; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Simulate some unavailable slots for realism
const BLOCKED = { 1: ['10:30', '15:00'], 3: ['09:00', '14:15', '17:15'], 6: ['11:15', '13:30'] }

function SuccessModal({ booking, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const svc = services.find(s => s.id === booking.service)
  const d = new Date(booking.date)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(26,26,26,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: SECTION_BG,
          maxWidth: 480, width: '100%',
          padding: '3rem',
          position: 'relative',
          boxShadow: '0 24px 80px rgba(26,26,26,0.18)',
        }}
      >
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 300,
          color: 'rgba(74,85,104,0.5)', letterSpacing: '0.08em',
          transition: 'color 0.2s',
          padding: '4px',
        }}
          onMouseEnter={e => e.currentTarget.style.color = ACCENT}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(74,85,104,0.5)'}
        >✕</button>

        {/* Rose petal icon */}
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: ac(0.1),
          border: `1px solid ${ac(0.2)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.75rem',
          fontSize: '1.4rem',
        }}>🌸</div>

        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', fontWeight: 400,
          color: '#1A1A1A', lineHeight: 1.1, marginBottom: '0.5rem',
        }}>
          Appointment confirmed.
        </h3>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', fontWeight: 300,
          color: 'rgba(74,85,104,0.65)', lineHeight: 1.75, marginBottom: '2rem',
        }}>
          A confirmation has been sent to <strong style={{ fontWeight: 400, color: '#1A1A1A' }}>{booking.email}</strong>.
          We look forward to welcoming you.
        </p>

        {/* Booking summary */}
        <div style={{ border: `1px solid ${ac(0.15)}`, background: '#EDE9E4' }}>
          {[
            { label: 'Client', value: booking.name },
            { label: 'Service', value: svc?.label },
            { label: 'Duration', value: svc?.duration },
            { label: 'Date', value: `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` },
            { label: 'Time', value: booking.time },
            { label: 'Price', value: svc?.price },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.75rem 1.25rem',
              borderBottom: `1px solid ${ac(0.08)}`,
            }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(74,85,104,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {label}
              </span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 400, color: '#1A1A1A' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', padding: '0.9rem 1.25rem', background: `${ac(0.06)}`, border: `1px solid ${ac(0.12)}` }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(74,85,104,0.65)', lineHeight: 1.7 }}>
            Please arrive 5 minutes before your appointment. Cancellations require 24 hours' notice.
            We are located on <strong style={{ fontWeight: 400, color: '#1A1A1A' }}>{config.contact.address}</strong>.
          </p>
        </div>

        <button onClick={onClose} style={{
          display: 'block', width: '100%', marginTop: '1.5rem',
          fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 400,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#fff', background: ACCENT, border: 'none',
          padding: '0.9rem', cursor: 'pointer',
          transition: 'background 0.3s ease',
          boxShadow: `0 4px 16px ${ac(0.3)}`,
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#A8883E'}
          onMouseLeave={e => e.currentTarget.style.background = ACCENT}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function Booking() {
  const days = getDays()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', time: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1) // 1: service+date+time, 2: details

  const selectedDayIndex = form.date
    ? days.findIndex(d => d.toISOString().split('T')[0] === form.date)
    : -1

  const blockedToday = selectedDayIndex >= 0 ? (BLOCKED[selectedDayIndex] || []) : []

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const selectDate = (d) => {
    const iso = d.toISOString().split('T')[0]
    setForm(p => ({ ...p, date: iso, time: '' }))
  }

  const selectTime = (t) => {
    if (!blockedToday.includes(t)) setForm(p => ({ ...p, time: t }))
  }

  const selectService = (id) => setForm(p => ({ ...p, service: id }))

  const advance = () => {
    const partial = z.object({
      service: z.string().min(1, 'Please select a service'),
      date: z.string().min(1, 'Please select a date'),
      time: z.string().min(1, 'Please select a time'),
    }).safeParse(form)
    if (!partial.success) {
      const errs = {}
      partial.error.issues.forEach(i => { errs[i.path[0]] = i.message })
      setErrors(errs); return
    }
    setErrors({})
    setStep(2)
  }

  const submit = async (e) => {
    e.preventDefault()
    const sanitized = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, typeof v === 'string' ? DOMPurify.sanitize(v.trim()) : v])
    )
    const result = bookingSchema.safeParse(sanitized)
    if (!result.success) {
      const errs = {}
      result.error.issues.forEach(i => { errs[i.path[0]] = i.message })
      setErrors(errs); return
    }
    setErrors({})
    setSubmitting(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (res.status === 429) {
        setErrors({ form: 'Too many requests — please wait a moment and try again.' })
        return
      }
      if (!res.ok) {
        setErrors({ form: 'Something went wrong. Please try again or call us directly.' })
        return
      }
      setSuccess(true)
    } catch {
      setErrors({ form: 'Unable to reach the server. Please check your connection.' })
    } finally {
      setSubmitting(false)
    }
  }

  const svc = services.find(s => s.id === form.service)

  const INPUT = {
    width: '100%', background: SECTION_BG,
    border: '1px solid rgba(74,85,104,0.15)',
    padding: '0.8rem 1rem',
    fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300,
    color: '#1A1A1A', outline: 'none', borderRadius: 0,
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    appearance: 'none',
  }
  const onFocus = e => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ac(0.08)}` }
  const onBlur  = e => { e.target.style.borderColor = 'rgba(74,85,104,0.15)'; e.target.style.boxShadow = 'none' }

  const LABEL = {
    display: 'block', fontFamily: 'Inter, sans-serif',
    fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: 'rgba(74,85,104,0.5)', marginBottom: '0.45rem',
  }

  return (
    <>
      <AnimatePresence>
        {success && <SuccessModal booking={form} onClose={() => { setSuccess(false); setStep(1); setForm({ name: '', email: '', phone: '', service: '', date: '', time: '' }) }} />}
      </AnimatePresence>

      <section id="book" style={{ padding: '7rem 3rem', background: SECTION_BG, borderTop: '1px solid rgba(26,26,26,0.07)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left — copy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
              <div style={{ width: 24, height: 1, background: ACCENT }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT }}>Reservations</span>
            </div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem,4vw,3rem)', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Reserve your<br />
              <em style={{ fontStyle: 'italic', color: ACCENT }}>moment.</em>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.85, color: '#1A1A1A', marginBottom: '2.5rem' }}>
              Select your service, choose a date and time that suits you,
              then confirm your details. A confirmation will arrive in your inbox.
            </p>

            {/* Studio info */}
            {[
              { label: 'Location', value: config.contact.address },
              { label: 'Hours', value: 'Mon – Sat  09:00 – 19:00\nSun  10:00 – 16:00' },
              { label: 'Cancellation', value: '24 hours notice required' },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: `2px solid ${ac(0.35)}` }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{item.value}</div>
              </div>
            ))}

            {/* Bookla future note */}
            <div style={{ marginTop: '2rem', padding: '1rem 1.25rem', background: `${ac(0.08)}`, border: `1px solid ${ac(0.2)}` }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 400, color: ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                {/* ── BOOKLA: replace this note once live ── */}
                Coming soon — instant booking
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#1A1A1A', lineHeight: 1.6 }}>
                Real-time availability via Bookla will be activated shortly. Until then, all requests are confirmed personally within 2 hours.
              </div>
            </div>
          </div>

          {/* Right — booking widget */}
          <div style={{ border: '1px solid rgba(74,85,104,0.1)', background: SECTION_BG, boxShadow: '0 8px 48px rgba(26,26,26,0.06)' }}>

            {/* Step indicator */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(74,85,104,0.08)' }}>
              {['Choose Service & Time', 'Your Details'].map((label, i) => (
                <div key={i} style={{
                  flex: 1, padding: '1rem 1.5rem',
                  borderBottom: step === i + 1 ? `2px solid ${ACCENT}` : '2px solid transparent',
                  transition: 'border-color 0.3s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: step > i ? ACCENT : step === i + 1 ? `${ac(0.15)}` : 'transparent',
                      border: `1px solid ${step >= i + 1 ? ACCENT : 'rgba(74,85,104,0.2)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500,
                      color: step > i ? '#fff' : step === i + 1 ? ACCENT : 'rgba(74,85,104,0.4)',
                      transition: 'all 0.3s ease', flexShrink: 0,
                    }}>
                      {step > i ? '✓' : i + 1}
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: step === i + 1 ? 500 : 300, letterSpacing: '0.06em', color: step === i + 1 ? '#1A1A1A' : 'rgba(74,85,104,0.45)', transition: 'color 0.3s' }}>
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div key="step1"
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.3 }}
                  >
                    {/* Service selector */}
                    <div style={{ marginBottom: '1.75rem' }}>
                      <div style={{ ...LABEL, marginBottom: '0.75rem' }}>Select Service</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {services.map(s => (
                          <button
                            key={s.id}
                            onClick={() => selectService(s.id)}
                            /* ── BOOKLA: data-bookla-service={s.id} data-bookla-company={BOOKLA_COMPANY_ID} ── */
                            data-bookla-service={s.id || undefined}
                            data-bookla-company={BOOKLA_COMPANY_ID || undefined}
                            style={{
                              padding: '0.75rem 0.9rem', textAlign: 'left',
                              border: `1px solid ${form.service === s.id ? ACCENT : 'rgba(74,85,104,0.12)'}`,
                              background: form.service === s.id ? `${ac(0.06)}` : SECTION_BG,
                              cursor: 'pointer', transition: 'all 0.25s ease',
                            }}
                            onMouseEnter={e => { if (form.service !== s.id) e.currentTarget.style.borderColor = ac(0.35) }}
                            onMouseLeave={e => { if (form.service !== s.id) e.currentTarget.style.borderColor = 'rgba(74,85,104,0.12)' }}
                          >
                            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.2 }}>{s.label}</div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 300, color: ACCENT, marginTop: '0.2rem' }}>{s.price} · {s.duration}</div>
                          </button>
                        ))}
                      </div>
                      {errors.service && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#dc2626', marginTop: '0.4rem' }}>{errors.service}</div>}
                    </div>

                    {/* Date strip */}
                    <div style={{ marginBottom: '1.75rem' }}>
                      <div style={{ ...LABEL, marginBottom: '0.75rem' }}>Select Date</div>
                      <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
                        {days.map((d, i) => {
                          const iso = d.toISOString().split('T')[0]
                          const active = form.date === iso
                          const isSun = d.getDay() === 0
                          return (
                            <button key={i} onClick={() => selectDate(d)} style={{
                              flexShrink: 0, width: 52, padding: '0.65rem 0',
                              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                              border: `1px solid ${active ? ACCENT : 'rgba(74,85,104,0.12)'}`,
                              background: active ? ACCENT : SECTION_BG,
                              cursor: 'pointer', transition: 'all 0.25s ease',
                            }}
                              onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = ac(0.4) }}
                              onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'rgba(74,85,104,0.12)' }}
                            >
                              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 300, color: active ? 'rgba(255,255,255,0.7)' : isSun ? ACCENT : 'rgba(74,85,104,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                {DAY_NAMES[d.getDay()]}
                              </div>
                              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontWeight: 400, color: active ? '#fff' : '#1A1A1A', lineHeight: 1 }}>
                                {d.getDate()}
                              </div>
                              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', fontWeight: 300, color: active ? 'rgba(255,255,255,0.6)' : 'rgba(74,85,104,0.4)' }}>
                                {MONTH_NAMES[d.getMonth()]}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                      {errors.date && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#dc2626', marginTop: '0.4rem' }}>{errors.date}</div>}
                    </div>

                    {/* Time slots */}
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ ...LABEL, marginBottom: '0.75rem' }}>Select Time</div>
                      {!form.date ? (
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(74,85,104,0.4)', padding: '1rem 0', fontStyle: 'italic' }}>
                          Select a date to see available times.
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
                          {timeSlots.map(t => {
                            const blocked = blockedToday.includes(t)
                            const active = form.time === t
                            return (
                              <button key={t} onClick={() => selectTime(t)} disabled={blocked} style={{
                                padding: '0.6rem 0',
                                border: `1px solid ${active ? ACCENT : blocked ? 'rgba(74,85,104,0.06)' : 'rgba(74,85,104,0.12)'}`,
                                background: active ? ACCENT : blocked ? '#EDE9E4' : SECTION_BG,
                                cursor: blocked ? 'not-allowed' : 'pointer',
                                fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300,
                                color: active ? '#fff' : blocked ? 'rgba(74,85,104,0.3)' : '#1A1A1A',
                                transition: 'all 0.25s ease',
                                position: 'relative',
                              }}
                                onMouseEnter={e => { if (!blocked && !active) e.currentTarget.style.borderColor = ac(0.4) }}
                                onMouseLeave={e => { if (!blocked && !active) e.currentTarget.style.borderColor = 'rgba(74,85,104,0.12)' }}
                              >
                                {t}
                                {blocked && (
                                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '60%', height: 1, background: 'rgba(74,85,104,0.2)', position: 'absolute' }} />
                                  </div>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      )}
                      {errors.time && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#dc2626', marginTop: '0.4rem' }}>{errors.time}</div>}
                    </div>

                    <button onClick={advance} style={{
                      width: '100%', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 400,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: '#fff', background: ACCENT, border: 'none',
                      padding: '0.95rem', cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: `0 4px 16px ${ac(0.25)}`,
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#A8883E'; e.currentTarget.style.boxShadow = `0 6px 24px ${ac(0.4)}` }}
                      onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.boxShadow = `0 4px 16px ${ac(0.25)}` }}
                    >
                      Continue to Your Details →
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="step2"
                    initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.3 }}
                  >
                    {/* Booking summary bar */}
                    {svc && form.date && form.time && (
                      <div style={{ marginBottom: '1.75rem', padding: '1rem 1.25rem', background: `${ac(0.05)}`, border: `1px solid ${ac(0.15)}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 400, color: '#1A1A1A' }}>{svc.label}</div>
                          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(74,85,104,0.6)' }}>
                            {(() => { const d = new Date(form.date); return `${DAY_NAMES[d.getDay()]} ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}` })()}
                            {' '}at {form.time} · {svc.duration}
                          </div>
                        </div>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 400, color: ACCENT }}>{svc.price}</div>
                      </div>
                    )}

                    <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                        <div>
                          <label style={LABEL}>Full Name *</label>
                          <input name="name" required value={form.name} onChange={handle} placeholder="Anete Bērziņa" style={INPUT} onFocus={onFocus} onBlur={onBlur} />
                          {errors.name && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#dc2626', marginTop: '0.3rem' }}>{errors.name}</div>}
                        </div>
                        <div>
                          <label style={LABEL}>Phone</label>
                          <input name="phone" value={form.phone} onChange={handle} placeholder="+371 2X XXX XXX" style={INPUT} onFocus={onFocus} onBlur={onBlur} />
                          {errors.phone && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#dc2626', marginTop: '0.3rem' }}>{errors.phone}</div>}
                        </div>
                      </div>

                      <div>
                        <label style={LABEL}>Email Address *</label>
                        <input name="email" type="email" required value={form.email} onChange={handle} placeholder="anete@example.lv" style={INPUT} onFocus={onFocus} onBlur={onBlur} />
                        {errors.email && <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#dc2626', marginTop: '0.3rem' }}>{errors.email}</div>}
                      </div>

                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button type="button" onClick={() => setStep(1)} style={{
                          flex: '0 0 auto',
                          fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 300,
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          color: 'rgba(74,85,104,0.55)', background: 'none',
                          border: '1px solid rgba(74,85,104,0.15)', padding: '0.9rem 1.2rem',
                          cursor: 'pointer', transition: 'all 0.3s ease',
                        }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(74,85,104,0.15)'; e.currentTarget.style.color = 'rgba(74,85,104,0.55)' }}
                        >← Back</button>

                        <button type="submit" disabled={submitting} style={{
                          flex: 1,
                          fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 400,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: '#fff', background: submitting ? '#c9909a' : ACCENT, border: 'none',
                          padding: '0.95rem', cursor: submitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 16px ${ac(0.25)}`,
                        }}
                          onMouseEnter={e => { if (!submitting) { e.currentTarget.style.background = '#A8883E'; e.currentTarget.style.boxShadow = `0 6px 24px ${ac(0.4)}` } }}
                          onMouseLeave={e => { if (!submitting) { e.currentTarget.style.background = ACCENT; e.currentTarget.style.boxShadow = `0 4px 16px ${ac(0.25)}` } }}
                        >
                          {submitting ? 'Sending…' : 'Confirm Appointment'}
                        </button>
                      </div>
                      {errors.form && (
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#dc2626', marginTop: '0.75rem', padding: '0.7rem 1rem', background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)' }}>
                          {errors.form}
                        </div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
