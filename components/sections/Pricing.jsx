'use client'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter', price: '₹20,000', unit: 'and up',
    desc: 'Perfect for landing pages, branding sites, and small businesses.',
    features: ['Up to 8-page website', 'Mobile-first responsive design', 'Basic SEO setup', 'Contact form & CMS', '1 month free support', '2 revision rounds'],
    cta: 'Get Started', highlight: false,
  },
  {
    name: 'Growth', price: '₹75,000', unit: 'and up',
    desc: 'Web apps, mobile apps, and MVPs for growing startups.',
    features: ['Full-stack web or mobile app', 'Custom backend & database', 'Payment gateway integration', 'Analytics & dashboard', '3 months free support', 'Unlimited revisions in scope'],
    cta: 'Start Building', highlight: true,
  },
  {
    name: 'Enterprise', price: 'Custom', unit: 'quote',
    desc: 'Custom ERP, SaaS platforms, and dedicated team engagements.',
    features: ['Custom software & ERP systems', 'Dedicated engineering team', 'Multi-system integrations', 'SLA-backed 99.9% uptime', '12 months support & SLA', 'White-label & licensing options'],
    cta: 'Talk to Us', highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
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
            Fixed-price projects, no hourly billing, no retainer lock-ins. You know the cost before we write a single line of code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16, alignItems: 'stretch' }}>
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }} style={{ background: plan.highlight ? 'linear-gradient(145deg, #0E0E2E 0%, #0C0C26 100%)' : 'rgba(255,255,255,0.03)', border: plan.highlight ? '1px solid rgba(91,138,247,0.3)' : '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '32px 28px', position: 'relative', overflow: 'hidden', boxShadow: plan.highlight ? '0 0 60px rgba(91,138,247,0.08)' : 'none', display: 'flex', flexDirection: 'column' }}>
              {plan.highlight && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,138,247,0.6), transparent)' }} />}
              {plan.highlight && (
                <div style={{ position: 'absolute', top: 18, right: 18, padding: '4px 12px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 10.5, color: '#fff' }}>
                  Most Popular
                </div>
              )}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 6 }}>{plan.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 34, color: '#fff', letterSpacing: '-0.03em' }}>{plan.price}</span>
                  <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{plan.unit}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55, margin: 0 }}>{plan.desc}</p>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, marginBottom: 28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 1, background: 'rgba(91,138,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={10} color="#5B8AF7" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.6)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 13, borderRadius: 99, cursor: 'pointer', background: plan.highlight ? 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' : 'rgba(255,255,255,0.06)', border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14, color: plan.highlight ? '#fff' : 'rgba(255,255,255,0.65)', boxShadow: plan.highlight ? '0 4px 24px rgba(91,138,247,0.25)' : 'none' }}>
                  {plan.cta} <ArrowRight size={14} />
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} style={{ textAlign: 'center', marginTop: 28, fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
          All prices in INR. International projects billed in USD. Free discovery call included with every enquiry.
        </motion.p>
      </div>
    </section>
  )
}
