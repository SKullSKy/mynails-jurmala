// api/booking.js — Vercel Serverless Function
// Handles booking form submissions with rate limiting and validation.
// No sensitive data is stored here — submissions are forwarded to email only.

import { z } from 'zod'

// ── RATE LIMITER ─────────────────────────────────────────────────────────────
// Simple in-memory IP rate limiter.
// For multi-region Vercel deployments, swap this for @upstash/ratelimit + Redis
// so limits are shared across all edge instances.
const rateLimitMap = new Map() // ip -> { count, resetAt }
const LIMIT = 5          // max requests
const WINDOW_MS = 15 * 60 * 1000 // per 15 minutes

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= LIMIT) return true
  entry.count++
  return false
}

// ── VALIDATION SCHEMA ────────────────────────────────────────────────────────
// Mirror of the client-side schema — never trust the client alone.
const bookingSchema = z.object({
  name:    z.string().min(2).max(80).regex(/^[\p{L}\s'\-]+$/u, 'Invalid characters in name'),
  email:   z.string().email().max(120),
  phone:   z.string().regex(/^[+\d\s\-()]{7,20}$/).optional().or(z.literal('')),
  service: z.enum(['classic-mani','gel-mani','nail-art','french','ombre','classic-pedi','spa-pedi','gel-extensions']),
  date:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time:    z.string().regex(/^\d{2}:\d{2}$/),
})

// ── HANDLER ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // CORS — allow only the production domain (set ALLOWED_ORIGIN in Vercel env vars)
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5176'
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Rate limiting by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait before trying again.' })
  }

  // Parse and validate body
  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid request body' })
  }

  const result = bookingSchema.safeParse(body)
  if (!result.success) {
    return res.status(422).json({
      error: 'Validation failed',
      issues: result.error.issues.map(i => ({ field: i.path[0], message: i.message })),
    })
  }

  const { name, email, phone, service, date, time } = result.data

  // ── EMAIL DELIVERY ────────────────────────────────────────────────────────
  // When ready, send via Resend or SendGrid using process.env.RESEND_API_KEY.
  // Example (Resend):
  //
  // const { Resend } = await import('resend')
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'bookings@mynailsjurmala.lv',
  //   to: process.env.SALON_EMAIL,
  //   subject: `New booking — ${service} on ${date} at ${time}`,
  //   html: `<p>${name} (${email}${phone ? ', ' + phone : ''}) has booked ${service} for ${date} at ${time}.</p>`,
  // })
  // ─────────────────────────────────────────────────────────────────────────

  return res.status(200).json({ success: true, message: 'Booking received.' })
}
