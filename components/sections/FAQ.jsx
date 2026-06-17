'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Minus } from 'lucide-react'
import GradientText from '@/components/ui/reactbits/GradientText'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope. A marketing website takes 4–6 weeks. A full-stack SaaS product typically takes 3–6 months. We\'ll give you a clear timeline after discovery. We never pad timelines — if we say 8 weeks, we mean 8 weeks.',
  },
  {
    q: 'Do you work with startups or only established companies?',
    a: 'Both. We love working with early-stage startups who need to move fast, and we also serve enterprise clients who need reliability and scale. What matters is that you\'re serious about building something that lasts.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every engagement includes post-launch support. For Growth and Enterprise tiers, we provide ongoing monitoring, bug fixes, and performance optimisation. We don\'t disappear after go-live — your success is our reputation.',
  },
  {
    q: 'Can you work with our existing design team?',
    a: 'Absolutely. We integrate seamlessly with in-house teams. We can take Figma files and build, collaborate with your designers, or lead the full design-to-dev process. Your call.',
  },
  {
    q: 'What technologies do you specialise in?',
    a: 'Our core stack is Next.js, React, Node.js, Python, PostgreSQL, and AWS/GCP. For mobile, we use React Native and Flutter. We pick the right tool for each job — we\'re not dogmatic about frameworks.',
  },
  {
    q: 'How do you handle project communication?',
    a: 'Weekly video calls, async updates via Slack/Notion, and a live project dashboard. You always know where things stand. We believe transparency is the foundation of good partnerships.',
  },
  {
    q: 'Do you offer performance marketing and SEO as well?',
    a: 'Yes. We\'re a full-service digital partner. Our performance marketing team manages Google Ads, Meta, and LinkedIn campaigns, while our SEO team handles technical audits, content, and link building. One vendor for everything.',
  },
  {
    q: 'What is ViboERP and can we use it?',
    a: 'ViboERP is our own SaaS ERP product built for SMEs. It covers inventory, billing, CRM, and reporting. You can request a demo and we\'ll show you if it fits your operations — or we can build you a custom alternative.',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)

  return (
    <div
      className="faq-item opacity-0"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ color: 'rgba(37,99,235,0.6)', fontSize: '0.75rem', fontFamily: 'var(--font-poppins)', fontWeight: 700, flexShrink: 0, marginTop: 3 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{ color: open ? 'white' : 'rgba(255,255,255,0.7)', fontSize: '1rem', fontWeight: 500, lineHeight: 1.5, transition: 'color 0.3s' }}>
            {faq.q}
          </span>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          border: `1px solid ${open ? 'rgba(37,99,235,0.4)' : 'rgba(255,255,255,0.1)'}`,
          background: open ? 'rgba(37,99,235,0.1)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
        }}>
          {open ? <Minus size={14} color="rgba(96,165,250,0.9)" /> : <Plus size={14} color="rgba(255,255,255,0.4)" />}
        </div>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? 400 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.8, paddingBottom: '1.5rem', paddingLeft: 36 }}>
          {faq.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.faq-word',
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, stagger: 0.07, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } }
        )
        gsap.fromTo('.faq-item',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.faq-list', start: 'top 80%', once: true } }
        )
      })
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(['.faq-word', '.faq-item'],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.5, scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const col1 = faqs.slice(0, 4)
  const col2 = faqs.slice(4)

  return (
    <section id="faq" ref={sectionRef} className="py-24 md:py-36 bg-[#05060f] border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-[0.3em] mb-5">Common Questions</p>
            <h2 className="font-display font-black leading-none" style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '-0.04em' }}>
              {['Got', 'Questions?'].map((w, i) => (
                <span key={i} className="block overflow-hidden">
                  <span className={`faq-word inline-block opacity-0 will-change-transform ${i === 0 ? 'text-white' : ''}`}>
                    {i === 1 ? <GradientText colors={['#60a5fa','#818cf8','#a78bfa','#60a5fa']} animationSpeed={6}>{w}</GradientText> : w}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:pt-16">
            <p className="text-white/35 text-base leading-relaxed mb-5">
              Can't find your answer? We're just a message away.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors">
              Ask us directly →
            </a>
          </div>
        </div>

        {/* Two-column FAQ */}
        <div className="faq-list grid lg:grid-cols-2 gap-x-16">
          <div>
            {col1.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
          </div>
          <div>
            {col2.map((faq, i) => <FAQItem key={i} faq={faq} index={i + 4} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
