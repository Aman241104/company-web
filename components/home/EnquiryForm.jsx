'use client'
import { useState } from 'react'
import { ArrowUpRight, CheckCircle2, Phone } from 'lucide-react'
import { chapters } from '@/lib/services'
import { contact } from '@/lib/site'
import { submitLead } from '@/lib/lead'
import { btnPrimary } from './primitives'

const field =
  'w-full rounded-xl border border-ink/15 bg-bg px-3.5 py-3 text-[15px] text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none transition-colors'

// Name / email / phone / service / details + honeypot. Used inline in the
// homepage contact section and inside the consultation modal.
export default function EnquiryForm({ defaultService = '', source = 'Project Enquiry', compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: defaultService, project: '', company_website: '' })
  const [state, setState] = useState('idle') // idle | sending | sent | mailto

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = async (e) => {
    e.preventDefault()
    if (form.company_website) return
    if (!form.name || (!form.email && !form.phone)) return
    setState('sending')
    const { name, email, phone, service, project } = form
    setState(await submitLead({ name, email, phone, service, project, subjectPrefix: source }))
  }

  if (state === 'sent' || state === 'mailto') {
    return (
      <div role="status" className="rounded-2xl border border-accent/30 bg-accent-soft p-5 text-sm text-ink">
        <CheckCircle2 className="text-accent mb-2" size={20} />
        {state === 'sent' ? 'Thanks — we reply within 24 hours.' : 'Your mail app should open with the details filled in.'}{' '}
        Faster?{' '}
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline">
          WhatsApp us
        </a>
        .
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="company_website" value={form.company_website} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] w-px h-px opacity-0" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-xs font-semibold text-ink mb-1.5">Name</span>
          <input required name="name" autoComplete="name" value={form.name} onChange={set} className={field} />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-ink mb-1.5">Email</span>
          <input type="email" name="email" autoComplete="email" value={form.email} onChange={set} className={field} />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-ink mb-1.5">Phone</span>
          <input type="tel" name="phone" autoComplete="tel" inputMode="tel" required={!form.email} value={form.phone} onChange={set} className={field} />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-ink mb-1.5">Service</span>
          <select name="service" value={form.service} onChange={set} className={field}>
            <option value="">Choose a service</option>
            {chapters.map((c) => (
              <optgroup key={c.slug} label={c.name}>
                {c.disciplines.map((d) => (
                  <option key={d.slug} value={d.title}>{d.title}</option>
                ))}
              </optgroup>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
      </div>
        <label className="block">
          <span className="flex justify-between text-xs font-semibold text-ink mb-1.5">
            Project details <span className="font-mono text-[10px] uppercase tracking-wider text-ink/50">Optional</span>
          </span>
          <textarea name="project" rows={compact ? 3 : 4} value={form.project} onChange={set} className={`${field} resize-y`} />
        </label>
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <p className="text-xs text-ink/60">
          We reply within 24 hours. Prefer to talk?{' '}
          <a href={contact.tel} className="inline-flex items-center gap-1 font-semibold text-accent underline-offset-2 hover:underline">
            <Phone size={12} /> {contact.phone}
          </a>
        </p>
        <button type="submit" disabled={state === 'sending'} className={`${btnPrimary} disabled:opacity-60`}>
          {state === 'sending' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={15} />
        </button>
      </div>
    </form>
  )
}
