import type { Metadata } from 'next'
import { Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import EnquiryForm from '@/components/site/EnquiryForm'
import { InnerHero, FaqSection, Shell } from '@/components/site/inner'
import { OfficeCard, ServeCard } from '@/components/site/home/Story'
import { Eyebrow, btnClass } from '@/components/site/ui'
import { contact } from '@/lib/site'
import { faqs } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Contact Us — Free Consultation',
  description: 'Tell us about your project. Free consultation, no obligation, and a reply within 24 hours. Mehta Technologies, Ahmedabad.',
  alternates: { canonical: 'https://mehtatechnologies.com/contact' },
}

function TalkCard() {
  return (
    <div className="rounded-3xl border border-line bg-bg p-6 shadow-lift sm:p-7">
      <h2 className="font-mono text-eyebrow text-muted uppercase">Talk to us directly</h2>
      <div className="mt-5 grid gap-3">
        <a href={contact.tel} className={btnClass('secondary', 'md', 'w-full')}>
          <Phone aria-hidden="true" className="size-4 shrink-0" />
          <span>Call {contact.phone}</span>
        </a>
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className={btnClass('secondary', 'md', 'w-full')}>
          <MessageCircle aria-hidden="true" className="size-4 shrink-0 text-whatsapp" />
          <span>WhatsApp us</span>
        </a>
        <a href={`mailto:${contact.email}`} className={btnClass('ghost', 'md', 'w-full justify-center')}>
          <Mail aria-hidden="true" className="size-4 shrink-0" />
          <span>{contact.email}</span>
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
      <p className="mt-6 border-t border-line pt-5 text-small text-ink-2">{contact.hours}. Every enquiry is answered within 24 hours.</p>
    </div>
  )
}

export default function Contact() {
  return (
    <>
      <Header />
      <Shell>
        <InnerHero
          trail={[['Home', '/'], ['Contact Us']]}
          eyebrow="Get in touch"
          title={["Let's build", 'something together']}
          lead="Tell us about your project. Free consultation, no obligation, and a reply within 24 hours."
          ctas={false}
          side={<TalkCard />}
        />
        <section className="scroll-mt-nav border-t border-line bg-bg py-[clamp(3.5rem,2.6rem+3.8vw,6rem)]" id="enquiry">
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-[calc(var(--spacing-nav)+1.5rem)]">
                <EnquiryForm source="Contact Page Enquiry" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <Eyebrow>Where we work</Eyebrow>
              <ul className="mt-5 grid gap-5">
                <li><OfficeCard /></li>
                <li><ServeCard sub="Service area" title="Across Gujarat" lines={['Surat, Nadiad and the rest of Gujarat', 'On-site meetings in Ahmedabad']} href="/locations" cta="Our locations" /></li>
                <li><ServeCard sub="Remote delivery" title="India & abroad" lines={['Mumbai and across India', 'International clients billed in USD']} href="/work" cta="See our work" /></li>
              </ul>
            </div>
          </div>
        </section>
        <FaqSection title="Frequently asked questions" items={faqs} />
      </Shell>
      <Footer />
    </>
  )
}
