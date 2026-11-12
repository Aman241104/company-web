'use client'
import { useEffect, useRef, useState } from 'react'
import { MessageSquare, X, Phone, PenLine } from 'lucide-react'
import { contact } from '@/lib/site'
import { openConsult } from './consult'

const Wa = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.04 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0 0 12.04 0C5.48 0 .13 5.34.13 11.9c0 2.1.55 4.14 1.59 5.95L.03 24l6.3-1.65a11.88 11.88 0 0 0 5.7 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.48-8.41" />
  </svg>
)

const rows = [
  { label: 'Call us', icon: Phone, href: contact.tel },
  { label: 'WhatsApp', icon: Wa, href: contact.whatsapp, ext: true },
  { label: 'Enquiry', icon: PenLine, action: () => openConsult() },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const [scrolling, setScrolling] = useState(false)
  const t = useRef(null)
  useEffect(() => {
    const id = setTimeout(() => setShown(true), 1200)
    const on = () => {
      setScrolling(true)
      clearTimeout(t.current)
      t.current = setTimeout(() => setScrolling(false), 400)
    }
    window.addEventListener('scroll', on, { passive: true })
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => {
      clearTimeout(id)
      window.removeEventListener('scroll', on)
      window.removeEventListener('keydown', esc)
    }
  }, [])
  return (
    <div
      data-scrolling={scrolling && !open ? '' : undefined}
      className="fixed right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 transition-[opacity,translate] duration-300 ease-out-expo max-md:data-scrolling:pointer-events-none max-md:data-scrolling:translate-y-4 max-md:data-scrolling:opacity-0 sm:right-6 sm:bottom-6"
    >
      <div className="flex flex-col items-end gap-3 transition-[opacity,transform] duration-500 ease-out-expo" style={{ opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(14px)' }}>
        <ul id="contact-options" aria-label="Ways to contact us" className="flex flex-col items-end gap-2.5" inert={!open}>
          {rows.map((r, i) => {
            const inner = (
              <span className="flex items-center gap-2.5 rounded-full border border-line-strong bg-bg py-2.5 pr-4 pl-3.5 text-small font-medium whitespace-nowrap text-ink shadow-lift transition-colors duration-300 group-hover/row:border-ink">
                <span className="grid size-5 shrink-0 place-items-center text-brand-ink" aria-hidden="true">
                  <r.icon className="size-[1.125rem]" />
                </span>
                {r.label}
              </span>
            )
            return (
              <li
                key={r.label}
                className="transition-[opacity,transform] duration-300 ease-out-expo"
                style={{ opacity: open ? 1 : 0, transform: open ? 'none' : 'translateY(10px) scale(.96)', transitionDelay: open ? `${(rows.length - i) * 40}ms` : '0ms' }}
              >
                {r.href ? (
                  <a href={r.href} {...(r.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group/row block rounded-full" onClick={() => setOpen(false)}>
                    {inner}
                  </a>
                ) : (
                  <button type="button" className="group/row block rounded-full" onClick={() => { setOpen(false); r.action() }}>
                    {inner}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
        <button
          type="button"
          aria-controls="contact-options"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 items-center gap-2.5 rounded-full bg-brand-gradient px-4 text-on-brand shadow-[0_12px_28px_-12px_rgb(0_0_0/0.45)] transition-transform duration-300 ease-out-expo active:scale-95 sm:h-13 sm:px-5"
        >
          <span className="grid size-6 shrink-0 place-items-center" aria-hidden="true">
            {open ? <X className="size-[1.375rem]" /> : <MessageSquare className="size-[1.375rem]" />}
          </span>
          <span className="sr-only text-small font-semibold min-[380px]:not-sr-only">Contact Us</span>
        </button>
      </div>
    </div>
  )
}
