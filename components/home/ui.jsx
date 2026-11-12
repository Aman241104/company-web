'use client'
import { Eyebrow, btnPrimary } from './primitives'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

export function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const reduced = usePrefersReducedMotion()
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </M>
  )
}

export const openConsult = (service = '') =>
  window.dispatchEvent(new CustomEvent('open-consult', { detail: { service } }))

export function StartProjectButton({ children = 'Start a Project', service = '', className = '' }) {
  return (
    <button type="button" onClick={() => openConsult(service)} className={`${btnPrimary} ${className}`}>
      {children} <ArrowUpRight size={15} />
    </button>
  )
}

export function SectionHead({ eyebrow, title, intro, align = 'left', className = '' }) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-10 sm:mb-14 ${className}`}>
      <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
      <h2 className="font-display text-[32px] leading-[1.05] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink">{title}</h2>
      {intro && <p className={`mt-5 text-base sm:text-lg text-ink/70 leading-relaxed ${center ? 'mx-auto' : ''} max-w-2xl`}>{intro}</p>}
    </Reveal>
  )
}
