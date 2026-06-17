'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Send, Mail, Phone } from 'lucide-react'
import Threads from '@/components/ui/reactbits/Threads'
import LaserFlow from '@/components/ui/reactbits/LaserFlow'
import BlurText from '@/components/ui/reactbits/BlurText'
import GradientText from '@/components/ui/reactbits/GradientText'
import CountUp from 'react-countup'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', project: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email) return
    const subject = encodeURIComponent(`New Project Enquiry from ${form.name || 'Website'}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nProject Details:\n${form.project}`)
    window.location.href = `mailto:hello@mehtatechnologies.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.cta-word',
          { y: '115%', opacity: 0 },
          {
            y: '0%', opacity: 1, stagger: 0.06, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
          }
        )
        gsap.fromTo('.cta-form-panel',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: '.cta-form-panel', start: 'top 85%', once: true },
          }
        )
        gsap.fromTo('.cta-info-item',
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: '.cta-info-row', start: 'top 88%', once: true },
          }
        )
      })
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(['.cta-word', '.cta-form-panel', '.cta-info-item'],
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const inputBase = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid',
    borderRadius: '0.875rem',
    color: 'white',
    fontSize: '0.9rem',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
    fontFamily: 'inherit',
  }

  const inputStyle = (name) => ({
    ...inputBase,
    borderColor: focused === name ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.08)',
    background: focused === name ? 'rgba(37,99,235,0.04)' : 'rgba(255,255,255,0.03)',
    boxShadow: focused === name ? '0 0 0 3px rgba(37,99,235,0.08)' : 'none',
  })

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-40 relative overflow-hidden bg-[#04050e] border-t border-white/[0.04]">

      {/* Threads WebGL background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.35 }}>
        <Threads color={[0.15, 0.37, 0.92]} amplitude={0.4} distance={35} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* LaserFlow — vertical laser beams + fog overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.28 }}>
        <LaserFlow
          color="#2460f0"
          wispDensity={0.5}
          fogIntensity={0.45}
          fogScale={1.2}
          wispSpeed={0.9}
          wispIntensity={0.5}
          flowStrength={0.7}
          decay={0.88}
          falloffStart={0.3}
          verticalSizing={1}
          horizontalSizing={1}
        />
      </div>

      {/* Animated dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(37,99,235,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(37,99,235,0.4), transparent)' }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(37,99,235,0.06), transparent)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 80%, rgba(79,70,229,0.06), transparent 60%)' }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Section label */}
        <div className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/30 text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Let's Build Together
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-14 md:mb-18">
          <h2
            className="font-display font-black leading-[0.92] mx-auto"
            style={{ fontSize: 'clamp(1.8rem, 8vw, 8rem)', letterSpacing: '-0.04em' }}
          >
            {['Ready To', 'Build', 'Something', 'Great?'].map((w, i) => (
              <span key={i} className="block overflow-hidden">
                <span className={`cta-word inline-block opacity-0 will-change-transform ${i < 2 ? 'text-white' : ''}`}>
                  {i >= 2 ? (
                    <GradientText
                      colors={['#60a5fa', '#818cf8', '#a78bfa', '#4f46e5', '#60a5fa']}
                      animationSpeed={6}
                    >
                      {w}
                    </GradientText>
                  ) : w}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Two-col: form + info */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-6 md:gap-8 items-start max-w-5xl mx-auto">

          {/* Form panel */}
          <div
            className="cta-form-panel opacity-0 rounded-2xl border border-white/[0.07] p-5 md:p-7"
            style={{ background: 'rgba(255,255,255,0.018)' }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <Send size={22} className="text-emerald-400" />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">Message Sent!</h3>
                <p className="text-white/40 text-sm">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', project: '' }) }}
                  className="mt-6 text-blue-400 text-xs hover:text-blue-300 transition-colors"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-white font-semibold text-base md:text-lg mb-2">Tell us about your project</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-xs tracking-wide">Your Name</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('name'), padding: '0.75rem 1rem' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-xs tracking-wide">Email Address <span className="text-blue-500">*</span></label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('email'), padding: '0.75rem 1rem' }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-white/50 text-xs tracking-wide">Tell us about your project</label>
                  <textarea
                    rows={4}
                    placeholder="We need a SaaS dashboard for our B2B platform with user management and analytics..."
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    onFocus={() => setFocused('project')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle('project'),
                      padding: '0.875rem 1rem',
                      resize: 'vertical',
                      minHeight: 100,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold overflow-hidden mt-2"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)' }}
                >
                  <span className="absolute inset-0 translate-x-[-110%] skew-x-[-20deg] bg-white/10 group-hover:translate-x-[150%] transition-transform duration-700" />
                  <span className="relative">Start Your Project</span>
                  <ArrowUpRight size={16} className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <p className="text-white/40 text-xs text-center">Free consultation · No commitment · Reply within 24h</p>
              </form>
            )}
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-5">
            <div className="cta-info-row flex flex-col gap-4">
              {[
                { icon: Mail, label: 'Email Us', value: 'hello@mehtatechnologies.com', href: 'mailto:hello@mehtatechnologies.com' },
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="cta-info-item opacity-0 flex items-center gap-4 p-5 rounded-xl border border-white/[0.06] group transition-all duration-300 hover:border-white/[0.12]"
                  style={{ background: 'rgba(255,255,255,0.015)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.2)' }}>
                    <Icon size={17} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white/45 text-xs mb-0.5">{label}</p>
                    <p className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Why us */}
            <div
              className="cta-info-item opacity-0 p-6 rounded-xl border border-white/[0.06]"
              style={{ background: 'rgba(255,255,255,0.015)' }}
            >
              <p className="text-white/45 text-xs uppercase tracking-[0.2em] mb-4">Why Choose Us</p>
              <div className="flex flex-col gap-3">
                {[
                  'End-to-end technology partner',
                  'Transparent pricing, no surprises',
                  'Weekly progress updates',
                  'Post-launch support included',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-white/45 text-sm">{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-white/45 text-sm">
                    <CountUp end={150} suffix="+ projects shipped" enableScrollSpy scrollSpyOnce duration={2} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
