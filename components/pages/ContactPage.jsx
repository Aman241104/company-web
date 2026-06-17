'use client'
import { useState } from 'react'
import { ArrowUpRight, Send, Mail, Phone, MapPin, Clock } from 'lucide-react'
import GradientText from '@/components/ui/reactbits/GradientText'
import LightRays from '@/components/ui/reactbits/LightRays'
import GradualBlur from '@/components/ui/reactbits/GradualBlur'
import BorderGlow from '@/components/ui/reactbits/BorderGlow'
import CircularText from '@/components/ui/reactbits/CircularText'

const services = ['Website Development', 'Software Development', 'Mobile App', 'SaaS Development', 'Performance Marketing', 'SEO', 'ViboERP Demo', 'Other']
const budgets = ['₹50K – ₹1L', '₹1L – ₹5L', '₹5L – ₹20L', '₹20L+', 'Not sure yet']

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', budget: '', project: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email) return
    const subject = encodeURIComponent(`New Project Enquiry — ${form.service || 'General'} from ${form.name || 'Website'}`)
    const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nBudget: ${form.budget}\n\nProject Details:\n${form.project}`)
    window.location.href = `mailto:hello@mehtatechnologies.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  const inputStyle = (name) => ({
    width: '100%', padding: '0.875rem 1rem',
    background: focused === name ? 'rgba(37,99,235,0.04)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === name ? 'rgba(37,99,235,0.4)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '0.75rem', color: 'white', fontSize: '0.9rem', outline: 'none',
    fontFamily: 'inherit', transition: 'all 0.3s ease',
    boxShadow: focused === name ? '0 0 0 3px rgba(37,99,235,0.08)' : 'none',
  })

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: '#03050f' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
          <LightRays raysOrigin="top-center" raysColor="#4f79ff" raysSpeed={0.6} lightSpread={1.5} rayLength={1.8} followMouse mouseInfluence={0.1} pulsating />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.07), transparent)' }} />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/30 text-xs tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Free Consultation · No Commitment
          </div>
          <h1 className="font-display font-black leading-none mb-5" style={{ fontSize: 'clamp(2.25rem, 8vw, 6.5rem)', letterSpacing: '-0.04em' }}>
            <span className="block text-white">Let's Build</span>
            <span className="block">
              <GradientText colors={['#60a5fa','#4f46e5','#a78bfa','#60a5fa']} animationSpeed={5}>Together.</GradientText>
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-lg mx-auto leading-relaxed">
            Tell us about your project. We'll reply within 24 hours with a clear path forward.
          </p>
        </div>
        <GradualBlur position="bottom" strength={3} height="8rem" />
      </section>

      {/* Form + Info */}
      <section className="py-16 md:py-20" style={{ background: '#03050f' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start max-w-5xl mx-auto">

            {/* Form */}
            <BorderGlow glowColor="rgba(37,99,235,0.4)" borderRadius="1.25rem" glowIntensity={0.2} animated>
              <div className="rounded-[1.25rem] p-5 sm:p-7 md:p-9" style={{ background: 'rgba(255,255,255,0.018)' }}>
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="relative mb-6">
                      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                        <Send size={24} color="#34d399" />
                      </div>
                      <div className="absolute -top-2 -right-2">
                        <CircularText text="SENT ✓ SENT ✓ " spinDuration={12} className="fill-emerald-400/40 text-[9px]" radius={38} />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-white text-2xl mb-2">Message Sent!</h3>
                    <p className="text-white/40 text-sm mb-6">We'll get back to you within 24 hours.</p>
                    <button onClick={() => { setSent(false); setForm({ name:'',company:'',email:'',phone:'',service:'',budget:'',project:'' }) }}
                      className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">Tell us about your project</p>
                      <p className="text-white/50 text-sm">The more detail, the better we can help.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/50 text-xs tracking-wide">Your Name <span className="text-blue-500">*</span></label>
                        <input type="text" placeholder="Your full name" value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                          style={inputStyle('name')} required />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/50 text-xs tracking-wide">Company</label>
                        <input type="text" placeholder="Your Company" value={form.company}
                          onChange={e => setForm({...form, company: e.target.value})}
                          onFocus={() => setFocused('company')} onBlur={() => setFocused(null)}
                          style={inputStyle('company')} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/50 text-xs tracking-wide">Email <span className="text-blue-500">*</span></label>
                        <input type="email" placeholder="you@company.com" value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                          style={inputStyle('email')} required />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/50 text-xs tracking-wide">Phone</label>
                        <input type="tel" placeholder="Your phone number" value={form.phone}
                          onChange={e => setForm({...form, phone: e.target.value})}
                          onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                          style={inputStyle('phone')} />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/50 text-xs tracking-wide">Service Needed</label>
                        <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                          onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}
                          style={{ ...inputStyle('service'), appearance: 'none', cursor: 'pointer' }}>
                          <option value="" style={{ background: '#0d0d1a' }}>Select a service</option>
                          {services.map(s => <option key={s} value={s} style={{ background: '#0d0d1a' }}>{s}</option>)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-white/50 text-xs tracking-wide">Budget Range</label>
                        <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}
                          onFocus={() => setFocused('budget')} onBlur={() => setFocused(null)}
                          style={{ ...inputStyle('budget'), appearance: 'none', cursor: 'pointer' }}>
                          <option value="" style={{ background: '#0d0d1a' }}>Select budget</option>
                          {budgets.map(b => <option key={b} value={b} style={{ background: '#0d0d1a' }}>{b}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-xs tracking-wide">Project Details</label>
                      <textarea rows={5} placeholder="Tell us what you're building, what problem you're solving, your timeline, and any technical context..."
                        value={form.project} onChange={e => setForm({...form, project: e.target.value})}
                        onFocus={() => setFocused('project')} onBlur={() => setFocused(null)}
                        style={{ ...inputStyle('project'), resize: 'vertical', minHeight: 120 }} />
                    </div>

                    <button type="submit"
                      className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold overflow-hidden mt-2"
                      style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)', animation: 'glow-pulse 3s ease-in-out infinite' }}>
                      <span className="absolute inset-0 translate-x-[-110%] skew-x-[-20deg] bg-white/10 group-hover:translate-x-[150%] transition-transform duration-700" />
                      <span className="relative">Send Project Brief</span>
                      <ArrowUpRight size={16} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <p className="text-white/40 text-xs text-center">Free consultation · No commitment · Reply within 24h</p>
                  </form>
                )}
              </div>
            </BorderGlow>

            {/* Info panel */}
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: 'Email Us', value: 'hello@mehtatechnologies.com', href: 'mailto:hello@mehtatechnologies.com', color: '#60a5fa', colorRgb: '96,165,250' },
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210', color: '#34d399', colorRgb: '52,211,153' },
                { icon: MapPin, label: 'Our Offices', value: 'Mumbai & Bengaluru', href: null, color: '#c084fc', colorRgb: '192,132,252' },
                { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null, color: '#fbbf24', colorRgb: '251,191,36' },
              ].map(({ icon: Icon, label, value, href, color, colorRgb }) => (
                href ? (
                  <a key={label} href={href} className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.06] group hover:border-white/[0.12] transition-all"
                    style={{ background: 'rgba(255,255,255,0.015)', textDecoration: 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '0.75rem', background: `rgba(${colorRgb},0.1)`, border: `1px solid rgba(${colorRgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={17} color={color} />
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', marginBottom: 2 }}>{label}</p>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: 500 }} className="group-hover:text-white transition-colors">{value}</p>
                    </div>
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '0.75rem', background: `rgba(${colorRgb},0.1)`, border: `1px solid rgba(${colorRgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={17} color={color} />
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.7rem', marginBottom: 2 }}>{label}</p>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: 500 }}>{value}</p>
                    </div>
                  </div>
                )
              ))}

              {/* Why respond quickly */}
              <div className="p-6 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.015)' }}>
                <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-4">What Happens Next</p>
                <div className="flex flex-col gap-3">
                  {[
                    { n: '1', text: 'We review your brief and do initial research' },
                    { n: '2', text: 'Free 30-min discovery call to align on scope' },
                    { n: '3', text: 'Detailed proposal with timeline and pricing' },
                    { n: '4', text: 'Kick off — usually within 1 week' },
                  ].map(step => (
                    <div key={step.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <span style={{ color: 'rgba(96,165,250,0.8)', fontSize: '0.6rem', fontWeight: 700 }}>{step.n}</span>
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', lineHeight: 1.6 }}>{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 p-3 rounded-xl border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/50 text-xs">Available for new projects starting immediately</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
