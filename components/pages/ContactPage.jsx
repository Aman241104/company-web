'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, Check } from 'lucide-react'
import CircularText from '@/components/ui/reactbits/CircularText'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block', animation: 'opacity-glow 2s ease-in-out infinite alternate' }} />
    {children}
  </span>
)

const services = ['Website Development', 'Software Development', 'Mobile App', 'SaaS Development', 'Performance Marketing', 'SEO', 'ViboERP Demo', 'Other']
const budgets = ['₹50K – ₹1L', '₹1L – ₹5L', '₹5L – ₹20L', '₹20L+', 'Not sure yet']

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'hello@mehtatechnologies.com', href: 'mailto:hello@mehtatechnologies.com', color: '#5B8AF7', colorRgb: '91,138,247' },
  { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210', color: '#34D399', colorRgb: '52,211,153' },
  { icon: MapPin, label: 'Our Offices', value: 'Mumbai & Bengaluru', href: null, color: '#8B5CF6', colorRgb: '139,92,246' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null, color: '#FBBF24', colorRgb: '251,191,36' },
]

const nextSteps = [
  { n: '1', text: 'We review your brief and research your industry' },
  { n: '2', text: 'Free 30-min discovery call to align on scope and goals' },
  { n: '3', text: 'Detailed proposal — timeline, pricing, and approach' },
  { n: '4', text: 'Project kick-off — usually within 1 week of approval' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', budget: '', project: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)
  const [stars, setStars] = useState([])

  useEffect(() => {
    setStars(Array.from({ length: 35 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.4, opacity: Math.random() * 0.35 + 0.05, dur: 2 + Math.random() * 3,
    })))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email) return
    const subject = encodeURIComponent(`New Project Enquiry — ${form.service || 'General'} from ${form.name || 'Website'}`)
    const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nBudget: ${form.budget}\n\nProject Details:\n${form.project}`)
    window.location.href = `mailto:hello@mehtatechnologies.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  const inputBase = {
    width: '100%', padding: '12px 14px', borderRadius: 10, color: '#fff',
    fontSize: 14, outline: 'none', fontFamily: 'var(--font-outfit)', transition: 'all 0.25s ease',
  }

  const inputStyle = (name) => ({
    ...inputBase,
    background: focused === name ? 'rgba(91,138,247,0.05)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused === name ? 'rgba(91,138,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
    boxShadow: focused === name ? '0 0 0 3px rgba(91,138,247,0.08)' : 'none',
  })

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 64, textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {stars.map(s => (
            <div key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: '#fff', opacity: s.opacity, animation: `opacity-glow ${s.dur}s ease-in-out infinite alternate` }} />
          ))}
        </div>
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 350, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.13) 0%, rgba(139,92,246,0.07) 45%, transparent 70%)', filter: 'blur(60px)' }} />

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <Pill>Free Consultation · No Commitment</Pill>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(42px, 8vw, 76px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 20px' }}>
            Let's build<br />
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>together.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-outfit)', fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 480, margin: '0 auto' }}>
            Tell us about your project. We'll reply within 24 hours with a clear path forward.
          </motion.p>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }} className="contact-grid">

            {/* Form */}
            <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,138,247,0.4), transparent)' }} />
              <div style={{ padding: '32px 28px' }}>
                {sent ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', textAlign: 'center' }}>
                    <div style={{ position: 'relative', marginBottom: 24 }}>
                      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                        <Send size={24} color="#34D399" />
                      </div>
                      <div style={{ position: 'absolute', top: -8, right: -8 }}>
                        <CircularText text="SENT ✓ SENT ✓ " spinDuration={12} className="fill-emerald-400/40 text-[9px]" radius={38} />
                      </div>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 22, color: '#fff', margin: '0 0 8px' }}>Message Sent!</h3>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: '0 0 24px' }}>We'll get back to you within 24 hours.</p>
                    <button onClick={() => { setSent(false); setForm({ name:'',company:'',email:'',phone:'',service:'',budget:'',project:'' }) }}
                      style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: '#5B8AF7', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 18, color: '#fff', margin: '0 0 4px' }}>Tell us about your project</p>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.38)', margin: 0 }}>The more detail you share, the better we can help.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Your Name <span style={{ color: '#5B8AF7' }}>*</span></label>
                        <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={inputStyle('name')} required />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Company</label>
                        <input type="text" placeholder="Your company" value={form.company} onChange={e => setForm({...form, company: e.target.value})} onFocus={() => setFocused('company')} onBlur={() => setFocused(null)} style={inputStyle('company')} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Email <span style={{ color: '#5B8AF7' }}>*</span></label>
                        <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={inputStyle('email')} required />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Phone</label>
                        <input type="tel" placeholder="Your phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} style={inputStyle('phone')} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Service Needed</label>
                        <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} onFocus={() => setFocused('service')} onBlur={() => setFocused(null)} style={{ ...inputStyle('service'), appearance: 'none', cursor: 'pointer' }}>
                          <option value="" style={{ background: '#060614' }}>Select a service</option>
                          {services.map(s => <option key={s} value={s} style={{ background: '#060614' }}>{s}</option>)}
                        </select>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Budget Range</label>
                        <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} onFocus={() => setFocused('budget')} onBlur={() => setFocused(null)} style={{ ...inputStyle('budget'), appearance: 'none', cursor: 'pointer' }}>
                          <option value="" style={{ background: '#060614' }}>Select budget</option>
                          {budgets.map(b => <option key={b} value={b} style={{ background: '#060614' }}>{b}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Project Details</label>
                      <textarea rows={5} placeholder="Tell us what you're building, what problem you're solving, your timeline, and any technical context..." value={form.project} onChange={e => setForm({...form, project: e.target.value})} onFocus={() => setFocused('project')} onBlur={() => setFocused(null)} style={{ ...inputStyle('project'), resize: 'vertical', minHeight: 120 }} />
                    </div>

                    <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px', borderRadius: 12, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 15, color: '#fff', cursor: 'pointer', border: 'none', boxShadow: '0 8px 32px rgba(91,138,247,0.28)', marginTop: 4 }}>
                      Send Project Brief <ArrowRight size={15} />
                    </button>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(255,255,255,0.28)', textAlign: 'center', margin: 0 }}>Free consultation · No commitment · Reply within 24h</p>
                  </form>
                )}
              </div>
            </div>

            {/* Info panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {contactInfo.map(({ icon: Icon, label, value, href, color, colorRgb }) => {
                const inner = (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px', borderRadius: 14, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color 0.25s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(${colorRgb},0.25)`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(${colorRgb},0.1)`, border: `1px solid rgba(${colorRgb},0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color={color} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '0 0 2px' }}>{label}</p>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, fontWeight: 500, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{value}</p>
                    </div>
                  </div>
                )
                return href ? (
                  <a key={label} href={href} style={{ textDecoration: 'none' }}>{inner}</a>
                ) : (
                  <div key={label}>{inner}</div>
                )
              })}

              {/* What happens next */}
              <div style={{ padding: '20px', borderRadius: 14, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 10.5, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 16px' }}>What happens next</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {nextSteps.map(step => (
                    <div key={step.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(91,138,247,0.1)', border: '1px solid rgba(91,138,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 9.5, color: 'rgba(91,138,247,0.8)' }}>{step.n}</span>
                      </div>
                      <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(52,211,153,0.04)', border: '1px solid rgba(52,211,153,0.12)' }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px rgba(52,211,153,0.5)' }} />
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12.5, color: 'rgba(255,255,255,0.42)' }}>Available for new projects immediately</span>
              </div>
            </div>
          </motion.div>
        </div>
        <style>{`@media (max-width: 820px) { .contact-grid { grid-template-columns: 1fr !important; } .form-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  )
}
