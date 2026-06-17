'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  { q: 'What types of projects do you work on?', a: 'Everything from marketing websites and e-commerce stores to complex SaaS platforms, mobile apps, and enterprise ERP systems. Our sweet spot is full-stack digital products where design and engineering both matter — typically with a 6–24 week delivery window.' },
  { q: 'How long does a typical project take?', a: 'A landing page or branding site: 2–4 weeks. A web app or mobile app: 6–16 weeks depending on scope. Enterprise systems are quoted individually after a discovery session. We always share a written timeline before work begins — no moving goalposts.' },
  { q: 'Do you work with international clients?', a: 'Yes. About a third of our work is for clients in the US, UK, UAE, and Singapore. We\'re fully async-friendly and run overlapping hours with most time zones. International projects are scoped and billed in USD.' },
  { q: 'How is pricing structured?', a: 'Fixed-price for scoped builds, monthly retainers for ongoing partnerships. No hourly billing, no surprise invoices. Starter websites begin at ₹20,000; web and mobile applications from ₹75,000. Enterprise projects are quoted after a free discovery call.' },
  { q: 'Can you work with our existing technology stack?', a: "Yes — we're stack-agnostic for all major modern frameworks. React, Vue, Laravel, Django, Ruby on Rails, legacy systems — we adapt. If a full rewrite genuinely makes more sense than extending what you have, we'll tell you honestly and explain why." },
  { q: 'Who owns the code when the project is done?', a: 'You do, fully — all source code, assets, and intellectual property transfer to you upon final payment. We sign NDAs on request. Client data is never used for any internal purpose, demonstration, or third-party access.' },
  { q: 'Do you offer ongoing maintenance and support?', a: 'Every project includes a post-launch support window (1–12 months depending on tier). Beyond that, we offer monthly retainer options covering hosting management, bug fixes, performance monitoring, and continued feature development. Most clients stay on.' },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 16, color: isOpen ? '#fff' : 'rgba(255,255,255,0.78)', lineHeight: 1.4, transition: 'color 0.2s' }}>
          {item.q}
        </span>
        <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: isOpen ? 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' : 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}>
          {isOpen ? <Minus size={13} color="#fff" /> : <Plus size={13} color="rgba(255,255,255,0.55)" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'rgba(255,255,255,0.48)', lineHeight: 1.7, margin: '0 0 22px', paddingRight: 48 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" style={{ padding: '100px 24px', maxWidth: 780, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 56 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block' }} />
          FAQ
        </span>
        <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px', lineHeight: 1.1 }}>
          Everything you<br />need to know.
        </h2>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.4)', maxWidth: 400, margin: '0 auto' }}>
          Straight answers to the questions we hear most often.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
        {faqs.map((f, i) => <FAQItem key={i} item={f} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />)}
      </motion.div>
    </section>
  )
}
