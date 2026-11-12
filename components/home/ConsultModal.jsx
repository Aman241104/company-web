'use client'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import EnquiryForm from './EnquiryForm'
import { Eyebrow } from './primitives'

// "What are you building?" modal. Opened by any openConsult() call, plus once
// per session on desktop exit-intent (mouse leaving through the top edge).
// Native <dialog> gives focus trapping, Esc-to-close and the backdrop for free.
export default function ConsultModal() {
  const ref = useRef(null)
  const [service, setService] = useState('')

  useEffect(() => {
    const dlg = ref.current
    const open = (e) => {
      setService(e?.detail?.service || '')
      if (!dlg.open) dlg.showModal()
    }
    const onLeave = (e) => {
      if (e.clientY > 0 || window.innerWidth < 1024) return
      try {
        if (sessionStorage.getItem('consult-shown')) return
        sessionStorage.setItem('consult-shown', '1')
      } catch {
        return
      }
      open()
    }
    window.addEventListener('open-consult', open)
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('open-consult', open)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return (
    <dialog
      ref={ref}
      aria-labelledby="consult-title"
      onClick={(e) => e.target === ref.current && ref.current.close()}
      onKeyDown={(e) => e.key === 'Escape' && ref.current.close()}
      className="m-auto w-[calc(100%-2rem)] max-w-[560px] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl bg-bg text-ink p-0 shadow-2xl backdrop:bg-night/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <Eyebrow>Free consultation</Eyebrow>
          <button type="button" onClick={() => ref.current.close()} aria-label="Close" className="-mt-1 -mr-1 w-9 h-9 inline-flex items-center justify-center rounded-full text-ink/60 hover:text-ink hover:bg-ink/5">
            <X size={18} />
          </button>
        </div>
        <h2 id="consult-title" className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">What are you building?</h2>
        <p className="text-sm text-ink/70 mb-6">A short brief is enough. We come back within 24 hours with a view on scope, timeline and cost.</p>
        <EnquiryForm key={service} defaultService={service} source="Free Consultation" compact />
      </div>
    </dialog>
  )
}
