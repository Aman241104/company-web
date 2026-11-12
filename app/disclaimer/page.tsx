import type { Metadata } from 'next'
import LegalPage from '@/components/site/LegalPage'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'General information about the content on this website.',
  alternates: { canonical: 'https://mehtatechnologies.com/disclaimer' },
}

export default function Disclaimer() {
  return (
    <LegalPage
      title="Disclaimer"
      updated="12 November 2026"
      lead="General information about the content published on this website."
      sections={[
        { id: 'general', title: 'General information', body: ['The content on this website describes Mehta Technologies’ services and past work. It is provided for general information and is not a formal quotation or contract. Scope, price and timelines for any project are set out in a written proposal.'] },
        { id: 'pricing', title: 'Prices', body: ['Prices shown are starting points for the scope described. The final price depends on your requirements and is agreed in writing before work begins.'] },
        { id: 'results', title: 'Case studies and results', body: ['Performance figures in our case studies (for example page-load times and Lighthouse scores) were measured on the live sites at or after launch. Results for other projects will depend on their own content, hosting and goals.'] },
        { id: 'trademarks', title: 'Client names and trademarks', body: ['Client names and screenshots are shown to describe work we delivered for them. Third-party product names and logos (for example frameworks and platforms in our technology lists) belong to their respective owners.'] },
        { id: 'links', title: 'External links', body: ['Links to client websites and third-party services are provided for convenience. We are not responsible for the content of sites we do not control.'] },
      ]}
    />
  )
}
