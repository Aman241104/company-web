'use client'
import { useId, useState } from 'react'
import { CheckCircle2, Phone } from 'lucide-react'
import { chapters } from '@/lib/services'
import { contact } from '@/lib/site'
import { submitLead } from '@/lib/lead'
import { btnClass, Arrow } from './ui'

const input =
  'w-full rounded-xl border border-line-strong bg-bg px-4 text-body text-ink placeholder:text-muted transition-[border-color,box-shadow] duration-200 hover:border-ink/40 focus-visible:border-brand-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 aria-invalid:border-danger disabled:cursor-not-allowed disabled:opacity-60'
const label = 'flex items-baseline justify-between gap-3 text-small font-medium text-ink'

export const serviceOptions = chapters.flatMap((c) => c.disciplines.map((d) => d.title))

// Benchmark "Project enquiry" form. `bare` renders the fields without the
// card (used inside the modal, which supplies its own surface).
export default function EnquiryForm({ title = 'Project enquiry', defaultService = '', source = 'Project Enquiry', bare = false, showTalk = false }) {
  const id = useId()
  const [f, setF] = useState({ name: '', email: '', phone: '', service: defaultService, message: '', website: '' })
  const [state, setState] = useState('idle')
  const [err, setErr] = useState('')
  const set = (e) => setF((v) => ({ ...v, [e.target.name]: e.target.value }))
  const submit = async (e) => {
    e.preventDefault()
    if (f.website) return
    if (!f.name.trim()) return setErr('Please add your name.')
    if (!f.email.trim() && !f.phone.trim()) return setErr('Add an email or a phone number so we can reply.')
    setErr('')
    setState('sending')
    setState(await submitLead({ name: f.name, email: f.email, phone: f.phone, service: f.service, project: f.message, subjectPrefix: source }))
  }

  if (state === 'sent' || state === 'mailto')
    return (
      <div role="status" className={`${bare ? '' : 'rounded-3xl border border-line bg-bg p-5 shadow-lift sm:p-8'}`}>
        <CheckCircle2 aria-hidden="true" className="size-8 text-brand-ink" />
        <p className="mt-4 text-h3 text-ink">{state === 'sent' ? 'Thanks — enquiry received.' : 'Your mail app is open with the details.'}</p>
        <p className="mt-2 text-body text-ink-2">
          We reply within 24 hours. Need us sooner?{' '}
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-ink underline underline-offset-4">WhatsApp us</a>.
        </p>
      </div>
    )

  return (
    <form onSubmit={submit} noValidate aria-labelledby={`${id}-title`} className={bare ? 'relative' : 'relative rounded-3xl border border-line bg-bg p-5 shadow-lift sm:p-8'}>
      {title && <h3 id={`${id}-title`} className="text-h3 text-ink">{title}</h3>}
      <div className={`grid gap-5 sm:grid-cols-2 ${title ? 'mt-6' : ''}`}>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={`${id}-name`} className={label}>Name</label>
          <input id={`${id}-name`} name="name" autoComplete="name" required value={f.name} onChange={set} aria-invalid={err && !f.name.trim() ? true : undefined} className={`${input} h-12`} />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={`${id}-email`} className={label}>Email</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" value={f.email} onChange={set} className={`${input} h-12`} />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={`${id}-phone`} className={label}>Phone</label>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set} className={`${input} h-12`} />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={`${id}-service`} className={label}>Service</label>
          <select id={`${id}-service`} name="service" value={f.service} onChange={set} className={`${input} h-12 appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2369728A' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
            <option value="">Choose a service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
            <option value="Vibo ERP">Vibo ERP</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>
        <div className="flex min-w-0 flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${id}-message`} className={label}>
            Project details <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted uppercase">Optional</span>
          </label>
          <textarea id={`${id}-message`} name="message" rows={bare ? 4 : 5} value={f.message} onChange={set} className={`${input} resize-y py-3 leading-relaxed ${bare ? 'min-h-28' : 'min-h-36'}`} />
        </div>
      </div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Do not fill this in</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={set} />
      </div>
      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-muted">We reply within 24 hours.</p>
        <button type="submit" disabled={state === 'sending'} className={btnClass('primary', 'md', 'disabled:opacity-60')}>
          <span>{state === 'sending' ? 'Sending…' : 'Send enquiry'}</span>
          <Arrow />
        </button>
      </div>
      {showTalk && (
        <p className="mt-5 text-small text-ink-2">
          Prefer to talk?{' '}
          <a href={contact.tel} className="inline-flex items-center gap-1 font-medium text-brand-ink underline underline-offset-4">
            <Phone aria-hidden="true" className="size-3.5" /> {contact.phone}
          </a>
        </p>
      )}
      <div role="alert" className="empty:hidden mt-4 text-small text-danger">{err}</div>
    </form>
  )
}
