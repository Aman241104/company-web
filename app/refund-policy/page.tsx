import type { Metadata } from 'next'
import LegalPage from '@/components/site/LegalPage'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'How payments, milestones, cancellations and refunds work on Mehta Technologies projects.',
  alternates: { canonical: 'https://mehtatechnologies.com/refund-policy' },
}

export default function RefundPolicy() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="12 November 2026"
      lead="How payments, milestones, cancellations and refunds work on our projects."
      sections={[
        { id: 'milestones', title: 'Milestone-based payments', body: ['Projects are billed against the fixed-price milestones set out in your written proposal. Each payment covers the work in that milestone, and you review and approve each milestone before the next one starts.'] },
        { id: 'advance', title: 'Advance payment', body: ['The advance paid to start a project reserves our team’s time and covers discovery and planning. Once discovery work has begun, the advance is non-refundable.'] },
        { id: 'cancellation', title: 'Cancelling a project', body: ['You can cancel at any time by writing to us. You pay for milestones completed and for work done on the milestone in progress, calculated pro rata. Any amount paid beyond that is refunded.', 'Everything delivered and paid for up to cancellation — designs, code and content — is handed over to you.'] },
        { id: 'not-delivered', title: 'If we cannot deliver', body: ['If we are unable to deliver a milestone as described in the agreed scope, and cannot fix it within a reasonable time, we refund the payment for that milestone in full.'] },
        { id: 'retainers', title: 'Monthly retainers and marketing', body: ['Monthly retainers (support, SEO, performance marketing) can be stopped with 30 days’ written notice. Fees for a month already started are not refunded. Ad spend paid to Google, Meta or other platforms is governed by those platforms and is not refundable by us.'] },
        { id: 'third-party', title: 'Third-party costs', body: ['Domains, hosting, paid plugins, licences and other third-party purchases made on your behalf are non-refundable once bought.'] },
        { id: 'how', title: 'How refunds are paid', body: ['Approved refunds are paid to the original payment method or by bank transfer within 14 working days. To request one, email hello@mehtatechnologies.com with your project name.'] },
      ]}
    />
  )
}
