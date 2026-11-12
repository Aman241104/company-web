import type { Metadata } from 'next'
import LegalPage from '@/components/site/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'What this website stores in your browser and why.',
  alternates: { canonical: 'https://mehtatechnologies.com/cookie-policy' },
}

export default function CookiePolicy() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="12 November 2026"
      lead="What this website stores in your browser, and why."
      sections={[
        { id: 'what', title: 'What we store', body: ['This site keeps a small amount of information in your browser’s local and session storage so it works the way you expect: your light/dark theme choice, and whether you have already seen the intro animation or the consultation pop-up in this visit.', 'None of this is used to identify you, and none of it is sent to us.'] },
        { id: 'analytics', title: 'Analytics and advertising tags', body: ['If we enable Google Tag Manager or the Meta Pixel to measure our own marketing, those services may set their own cookies. They are only loaded when configured for this site, and are governed by Google’s and Meta’s own policies.'] },
        { id: 'forms', title: 'Enquiry forms', body: ['When you send an enquiry, the details you type are emailed to our team so we can reply. They are not stored in cookies. See our Privacy Policy for how we handle that information.'] },
        { id: 'control', title: 'Your choices', body: ['You can clear site data or block storage in your browser settings at any time. The site still works without it — your theme will simply reset to light.'] },
        { id: 'contact', title: 'Contact', body: ['Questions about this policy: hello@mehtatechnologies.com.'] },
      ]}
    />
  )
}
