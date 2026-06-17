'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { X, ArrowUpRight, Tag, Calendar } from 'lucide-react'
import BrowserMockup from './BrowserMockup'
import PhoneMockup from './PhoneMockup'

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const { MockupContent } = project

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const tl = gsap.timeline()
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' }
    )
    tl.fromTo(panelRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    )
    return () => { document.body.style.overflow = '' }
  }, [])

  const close = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current, { opacity: 0, y: 24, scale: 0.96, duration: 0.3, ease: 'power2.in' })
    tl.to(overlayRef.current, { opacity: 0, duration: 0.25 }, '-=0.1')
  }

  const handleBackdrop = (e) => {
    if (e.target === overlayRef.current) close()
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-6 lg:p-10"
      style={{ background: 'rgba(4,4,8,0.9)', backdropFilter: 'blur(16px)' }}
      onClick={handleBackdrop}
    >
      <div
        ref={panelRef}
        className="relative w-full flex flex-col lg:flex-row gap-0 overflow-hidden rounded-2xl border border-white/[0.08]"
        style={{
          maxWidth: 1100,
          maxHeight: '90vh',
          background: '#0a0a12',
          boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(${project.accentRgb},0.15), 0 0 80px rgba(${project.accentRgb},0.06)`,
        }}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
        >
          <X size={15} />
        </button>

        {/* LEFT: Live Preview */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{ background: project.gradient, minHeight: project.mockupType === 'phone' ? 420 : 480 }}
        >
          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Preview label */}
          <div className="flex items-center gap-2 px-5 pt-5 pb-3 shrink-0 relative z-10">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.accent }} />
            <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: `rgba(${project.accentRgb},0.6)` }}>
              Live Preview
            </span>
          </div>

          <div
            className="flex-1 flex items-center justify-center px-5 pb-5 relative z-10"
            style={{
              filter: `drop-shadow(0 20px 60px rgba(${project.accentRgb},0.25))`,
            }}
          >
            {project.mockupType === 'phone' ? (
              <PhoneMockup style={{ maxWidth: 220 }}>
                <MockupContent />
              </PhoneMockup>
            ) : (
              <div className="w-full">
                <BrowserMockup url={project.mockupUrl}>
                  <div style={{ maxHeight: 340, overflowY: 'auto', scrollbarWidth: 'none' }}>
                    <MockupContent />
                  </div>
                </BrowserMockup>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Project Details */}
        <div
          className="lg:w-[340px] shrink-0 flex flex-col overflow-y-auto"
          style={{ background: '#0d0d18', borderLeft: '1px solid rgba(255,255,255,0.05)', scrollbarWidth: 'none' }}
        >
          <div className="p-7 flex flex-col gap-6 flex-1">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display font-bold text-xs tabular-nums" style={{ color: `rgba(${project.accentRgb},0.5)` }}>
                  {project.id}
                </span>
                <span
                  className="text-[10px] px-2.5 py-0.5 rounded-full font-medium"
                  style={{ background: `rgba(${project.accentRgb},0.1)`, color: project.accent, border: `1px solid rgba(${project.accentRgb},0.2)` }}
                >
                  {project.type}
                </span>
                <div className="flex items-center gap-1.5 ml-auto">
                  <Calendar size={11} className="text-white/20" />
                  <span className="text-white/25 text-[10px]">{project.year}</span>
                </div>
              </div>

              <h2
                className="font-display font-black text-white leading-none mb-2"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}
              >
                {project.name}
              </h2>
              <p style={{ color: project.accent }} className="text-sm font-medium mb-4">
                {project.category}
              </p>
              <p className="text-white/35 text-sm leading-relaxed">
                {project.desc}
              </p>
            </div>

            {/* Result */}
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ background: `rgba(${project.accentRgb},0.07)`, border: `1px solid rgba(${project.accentRgb},0.15)` }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `rgba(${project.accentRgb},0.15)` }}>
                <span style={{ color: project.accent, fontSize: 14 }}>↑</span>
              </div>
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-wide mb-0.5">Key Result</p>
                <p className="text-white font-semibold text-sm">{project.result}</p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag size={11} className="text-white/20" />
                <p className="text-white/25 text-[10px] uppercase tracking-[0.15em]">Technologies</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `rgba(${project.accentRgb},0.08)`, color: project.accent, border: `1px solid rgba(${project.accentRgb},0.15)` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/[0.06]">
              {project.mockupUrl && (
                <a
                  href={`https://${project.mockupUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold text-sm relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, rgba(${project.accentRgb},0.8), rgba(${project.accentRgb},0.5))` }}
                >
                  <span className="absolute inset-0 translate-x-[-110%] skew-x-[-20deg] bg-white/10 group-hover:translate-x-[150%] transition-transform duration-700" />
                  <span className="relative">Visit Live Site</span>
                  <ArrowUpRight size={15} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
              <a
                href="#contact"
                onClick={close}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-white/50 text-sm border border-white/[0.08] hover:text-white hover:border-white/20 transition-all"
              >
                Build Something Similar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
