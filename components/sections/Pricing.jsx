'use client'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter', price: '₹20,000', unit: '/ project',
    desc: 'Landing pages, branding sites, and small business websites.',
    features: ['Up to 8-page website', 'Mobile-first responsive design', 'Basic SEO setup', 'Contact form & CMS', '1 month post-launch support', '2 revision rounds'],
    cta: 'Get Started', highlight: false,
  },
  {
    name: 'Growth', price: '₹75,000', unit: '/ project',
    desc: 'Web apps, mobile apps, and MVPs for startups that need to move fast.',
    features: ['Full-stack web or mobile app', 'Custom backend & database', 'Payment gateway integration', 'Analytics & dashboard', '3 months post-launch support', 'Unlimited revisions in scope'],
    cta: 'Start Building', highlight: true,
  },
  {
    name: 'Enterprise', price: 'Custom', unit: 'quote',
    desc: 'Custom ERP, SaaS platforms, and dedicated engineering teams.',
    features: ['Custom software & ERP systems', 'Dedicated engineering team', 'Multi-system integrations', 'SLA-backed 99.9% uptime', '12 months support & SLA', 'White-label & licensing'],
    cta: 'Talk to Us', highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(91,138,247,0.07) 0%, rgba(139,92,246,0.04) 45%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block' }} />
            Pricing
          </span>
          <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px', lineHeight: 1.1 }}>
            Straightforward pricing.<br />
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>No surprises.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 440, margin: '0 auto' }}>
            Fixed-price projects. You know the full cost before we write a single line of code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: plan.highlight ? 'rgba(91,138,247,0.07)' : '#060614',
                padding: '36px 28px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {plan.highlight && (
                <>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #5B8AF7, #8B5CF6, transparent)' }} />
                  <div style={{ position: 'absolute', top: 20, right: 20, padding: '4px 11px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 10.5, color: '#fff', letterSpacing: '0.02em' }}>
                    Most Popular
                  </div>
                </>
              )}

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 38, color: '#fff', letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{plan.unit}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, margin: 0 }}>{plan.desc}</p>
              </div>

              <div style={{ height: 1, background: plan.highlight ? 'rgba(91,138,247,0.2)' : 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 13, flex: 1, marginBottom: 32 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                    <Check size={14} color={plan.highlight ? '#5B8AF7' : 'rgba(255,255,255,0.35)'} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.58)' }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 10, cursor: 'pointer', background: plan.highlight ? 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' : 'rgba(255,255,255,0.06)', border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.09)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14, color: plan.highlight ? '#fff' : 'rgba(255,255,255,0.6)', boxShadow: plan.highlight ? '0 4px 24px rgba(91,138,247,0.22)' : 'none' }}>
                  {plan.cta} <ArrowRight size={14} />
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.22)' }}>
          All prices in INR. International projects billed in USD. Free discovery call with every enquiry.
        </motion.p>
      </div>
    </section>
  )
}
