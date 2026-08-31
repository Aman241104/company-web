'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight, CheckCircle2, Layers, Calendar, ExternalLink, Globe, Sparkles } from 'lucide-react'
import BrowserMockup from './BrowserMockup'

export default function ProjectModal({ project, onClose }) {
  const { MockupContent } = project

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const accent = project.accent || '#3B82F6'

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-xl overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-5xl rounded-3xl bg-[#0B0D14] border border-white/10 shadow-2xl shadow-black/90 overflow-hidden flex flex-col lg:flex-row my-auto max-h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close case study modal"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
        >
          <X size={16} />
        </button>

        {/* LEFT COLUMN: Live Preview Mockup */}
        <div className="lg:w-[55%] p-6 sm:p-8 bg-gradient-to-br from-white/[0.03] to-transparent border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                Interactive Preview
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#07080C] shadow-2xl">
              {/* Browser chrome header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/[0.06] text-xs text-white/55">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[11px] text-white/50 truncate max-w-[200px]">
                  {project.mockupUrl || 'app.mehtatechnologies.com'}
                </span>
                <div className="w-6" />
              </div>

              {/* View area */}
              <div className="max-h-[360px] sm:max-h-[420px] overflow-y-auto bg-[#07080C]">
                {MockupContent ? <MockupContent /> : null}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <div className="text-xs text-white/55 font-mono">
              Designed & Engineered by Mehta Technologies
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Open in New Tab <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Case Study Breakdown */}
        <div className="lg:w-[45%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#0A0C14]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-white/55">
                  {project.year || '2024'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                {project.name}
              </h2>

              <p className="text-sm text-white/60 leading-relaxed font-normal">
                {project.desc}
              </p>
            </div>

            {/* Key Measurable Outcome */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-blue-400/80">
                  Verified Outcome
                </div>
                <div className="text-base font-bold text-white tracking-tight">
                  {project.result}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-white/55 mb-2.5">
                Engineered With
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.04] text-white/70 border border-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-8 border-t border-white/[0.08] flex flex-col sm:flex-row gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 text-center transition-all flex items-center justify-center gap-2"
              >
                Visit Live Site <ArrowUpRight size={13} />
              </a>
            )}
            <a
              href="/contact"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 text-center transition-all flex items-center justify-center gap-2"
            >
              Build Similar Project
            </a>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
