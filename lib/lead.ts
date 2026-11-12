// Shared lead submission: POST /api/contact (Resend), falling back to the
// visitor's mail app when the API isn't configured or fails.
export type Lead = { name: string; email?: string; phone?: string; service?: string; project?: string; subjectPrefix?: string }

export async function submitLead(lead: Lead): Promise<'sent' | 'mailto'> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (res.ok) return 'sent'
  } catch {}
  const subject = encodeURIComponent(`${lead.subjectPrefix || 'Project Enquiry'} from ${lead.name}`)
  const body = encodeURIComponent(
    [`Name: ${lead.name}`, lead.email && `Email: ${lead.email}`, lead.phone && `Phone: ${lead.phone}`, lead.service && `Service: ${lead.service}`, lead.project && `\n${lead.project}`]
      .filter(Boolean)
      .join('\n')
  )
  window.location.href = `mailto:hello@mehtatechnologies.com?subject=${subject}&body=${body}`
  return 'mailto'
}
