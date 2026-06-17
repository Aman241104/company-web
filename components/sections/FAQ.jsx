'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  { q: 'What types of projects do you work on?', a: 'Everything from marketing websites and e-commerce stores to complex SaaS platforms, mobile apps, and enterprise ERP systems. Our sweet spot is full-stack digital products where design and engineering both matter — typically with a 6–24 week delivery window.' },
  { q: 'How long does a typical project take?', a: 'A landing page or branding site: 2–4 weeks. A web app or mobile app: 6–16 weeks depending on scope. Enterprise systems are quoted after a discovery session. We always share a written timeline before work begins — no moving goalposts.' },
  { q: 'Do you work with international clients?', a: "Yes. About a third of our work is for clients in the US, UK, UAE, and Singapore. We're fully async-friendly and run overlapping hours with most time zones. International projects are scoped and billed in USD." },
  { q: 'How is pricing structured?', a: 'Fixed-price for scoped builds, monthly retainers for ongoing partnerships. No hourly billing, no surprise invoices. Starter websites begin at ₹20,000; web and mobile applications from ₹75,000. Enterprise projects are quoted after a free discovery call.' },
  { q: 'Can you work with our existing technology stack?', a: "Yes — we adapt to all major modern frameworks. React, Vue, Laravel, Django, Ruby on Rails, legacy systems — we integrate and extend. If a full rewrite genuinely makes more sense, we'll tell you honestly and explain why." },
  { q: 'Who owns the code when the project is done?', a: 'You do, fully — all source code, assets, and intellectual property transfer to you on final payment. We sign NDAs on request. Client data is never used for any internal purpose or third-party access.' },
  { q: 'Do you offer ongoing maintenance and support?', a: 'Every project includes a post-launch support window (1–12 months depending on tier). Beyond that, we offer monthly retainers covering hosting, bug fixes, performance monitoring, and continued development. Most clients stay on.' },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 24 }}
      >
        <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 16, color: isOpen ? '#fff' : 'rgba(255,255,255,0.72)', lineHeight: 1.4, transition: 'color 0.2s' }}>
          {item.q}
        </span>
        <span style={{ flexShrink: 0, fontFamily: 'var(--font-syne)', fontWeight: 400, fontSize: 22, lineHeight: 1, color: isOpen ? '#5B8AF7' : 'rgba(255,255,255,0.3)', transition: 'color 0.2s', width: 20, textAlign: 'center' }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'rgba(255,255,255,0.52)', lineHeight: 1.75, margin: '0 0 24px', maxWidth: 600 }}>
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
    <section id="faq" style={{ padding: '100px 24px', maxWidth: 760, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(30px, 4vw, 48px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 14px', lineHeight: 1.1 }}>
          Common questions.
        </h2>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'rgba(255,255,255,0.38)', margin: 0 }}>
          Straight answers. No fluff.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
        {faqs.map((f, i) => <FAQItem key={i} item={f} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />)}
      </motion.div>
    </section>
  )
}
