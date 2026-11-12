'use client'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import EnquiryForm from './EnquiryForm'
import { Eyebrow } from './ui'

// "What are you building?" — opened by openConsult() and, like the benchmark,
// once per session after the visitor has scrolled a good way down the page.
export default function ConsultModal() {
  const ref = useRef(null)
  const [service, setService] = useState('')
  const [n, setN] = useState(0)
  useEffect(() => {
    const dlg = ref.current
    const open = (e) => {
      setService(e?.detail?.service || '')
      setN((x) => x + 1)
      if (!dlg.open) dlg.showModal()
    }
    let fired = false
    const onScroll = () => {
      if (fired) return
      const depth = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)
      if (depth < 0.35) return
      fired = true
      try {
        if (sessionStorage.getItem('consult-shown')) return
        sessionStorage.setItem('consult-shown', '1')
      } catch {
        return
      }
      if (!document.querySelector('dialog[open]')) open()
    }
    window.addEventListener('open-consult', open)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('open-consult', open)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <dialog
      ref={ref}
      aria-labelledby="consult-title"
      onClick={(e) => e.target === ref.current && ref.current.close()}
      onKeyDown={(e) => e.key === 'Escape' && ref.current.close()}
      className="m-auto w-[calc(100%-2rem)] max-w-[34rem] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border border-line bg-bg p-0 text-ink shadow-float backdrop:bg-ink/30 backdrop:backdrop-blur-[6px]"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <Eyebrow>Free consultation</Eyebrow>
          <button type="button" aria-label="Close" onClick={() => ref.current.close()} className="-mt-2 -mr-2 grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink">
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
        <h2 id="consult-title" className="mt-3 font-display text-h2 text-ink">What are you building?</h2>
        <p className="mt-2 text-small text-ink-2">A short brief is enough to start. We come back within 24 hours with a view on scope, timeline and cost.</p>
        <div className="mt-6">
          <EnquiryForm key={`${service}-${n}`} title="" bare defaultService={service} source="Free Consultation" showTalk />
        </div>
      </div>
    </dialog>
  )
}
