import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'hello@mehtatechnologies.com'
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Mehta Technologies Website <onboarding@resend.dev>'

// Basic in-memory rate limit — one submission per IP per 30s per server instance.
// Not durable across serverless cold starts/instances; good enough to blunt casual abuse.
const lastSubmission = new Map<string, number>()
const RATE_LIMIT_MS = 30_000

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

export async function POST(req: NextRequest) {
  if (!RESEND_API_KEY) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })
  }

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 })
  }

  // Honeypot — bots fill hidden fields humans never see.
  if (body.company_website) {
    return NextResponse.json({ ok: true })
  }

  const { name = '', email = '', phone = '', company = '', service = '', budget = '', project = '', subjectPrefix = 'Project Brief' } = body

  const validEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : ''
  if (!name || (!validEmail && !phone)) {
    return NextResponse.json({ ok: false, error: 'missing_contact_info' }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const last = lastSubmission.get(ip)
  if (last && now - last < RATE_LIMIT_MS) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
  }
  lastSubmission.set(ip, now)

  const fields = [
    ['Name', name],
    ['Company', company],
    ['Email', validEmail],
    ['Phone', phone],
    ['Service Category', service],
    ['Budget Range', budget],
  ].filter(([, v]) => v)

  const html = `
    <h2>${escapeHtml(subjectPrefix)} — ${escapeHtml(name || 'Website Visitor')}</h2>
    <table cellpadding="4">
      ${fields.map(([label, v]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('')}
    </table>
    ${project ? `<p><strong>Project Details:</strong><br/>${escapeHtml(project).replace(/\n/g, '<br/>')}</p>` : ''}
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        ...(validEmail ? { reply_to: validEmail } : {}),
        subject: `${subjectPrefix} — ${name || 'Website'}`,
        html,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('Resend send failed:', res.status, errText)
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form send error:', err)
    return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 })
  }
}
