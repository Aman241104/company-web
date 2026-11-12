'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function FaqList({ items, id = 'faq' }) {
  const [open, setOpen] = useState(0)
  return (
    <ul className="border-t border-line">
      {items.map((f, i) => {
        const on = open === i
        return (
          <li key={f.q} className="border-b border-line" data-reveal="true">
            <h3>
              <button type="button" id={`${id}-q-${i}`} aria-controls={`${id}-a-${i}`} aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6 sm:py-7">
                <span className={`mt-1.5 w-7 shrink-0 font-mono text-eyebrow uppercase transition-colors duration-300 ${on ? 'text-brand-ink' : 'text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-h3 text-ink transition-colors duration-300 group-hover:text-brand-ink">{f.q}</span>
                <span className={`grid size-10 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-500 ease-out-expo ${on ? 'rotate-45 border-transparent bg-brand text-on-brand' : 'border-line-strong text-ink'}`} aria-hidden="true">
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div id={`${id}-a-${i}`} role="region" aria-labelledby={`${id}-q-${i}`} inert={!on} className="grid transition-[grid-template-rows] duration-500 ease-out-expo" style={{ gridTemplateRows: on ? '1fr' : '0fr' }}>
              <div className="overflow-hidden">
                <p className={`max-w-[64ch] pb-7 pl-11 text-body text-ink-2 transition-[opacity,translate] duration-500 ease-out-expo sm:pr-16 sm:pl-13 ${on ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>{f.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
