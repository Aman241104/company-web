// Company facts reused across the homepage, inner pages and footer.
// Every figure here was already published elsewhere on the site
// (About stats, Stats band, Contact page) — nothing new is claimed.
// Benchmark metrics we have no data for (e.g. "99% on-time") are deliberately absent.

export const contact = {
  phone: '+91 98765 43210',
  tel: 'tel:+919876543210',
  whatsapp: 'https://wa.me/919876543210?text=Hi%20Mehta%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20project.',
  email: 'hello@mehtatechnologies.com',
  city: 'Ahmedabad',
  region: 'Gujarat, India',
  timezone: 'Asia/Kolkata',
  hours: 'Mon–Fri, 9:00–18:00 IST',
}

export const stats = [
  { value: '150+', label: 'Projects delivered', note: 'Websites, stores & software' },
  { value: '100+', label: 'Happy clients', note: 'Across India & abroad' },
  { value: '4.9/5', label: 'Client rating', note: 'Rated by real clients' },
  { value: '2019', label: 'Building since', note: 'Founded in Ahmedabad' },
  { value: '24 hrs', label: 'Response time', note: 'To every new enquiry' },
]

export const processSteps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    text: 'Our technical leads review your requirements and existing setup, then a 30-minute discovery call aligns features, goals and roadmap.',
    items: ['Architectural review', '30-min discovery session', 'Scope definition', 'Timeline & budget'],
  },
  {
    num: '02',
    title: 'Proposal & Design',
    text: 'You get a fixed-price milestone proposal with transparent line items, then designs you can click through before any code is written.',
    items: ['Milestone proposal', 'UI/UX design', 'Clickable prototype', 'Feedback rounds'],
  },
  {
    num: '03',
    title: 'Build & Test',
    text: 'Development starts within 5 days of sign-off, on a live staging link you can check any time, with regular sprint updates.',
    items: ['Live staging access', 'Sprint updates', 'Performance budgets', 'QA & testing'],
  },
  {
    num: '04',
    title: 'Launch & Support',
    text: 'We deploy, hand over 100% of the code and IP, and stay on with post-launch SLA support from 2 weeks up to 12 months.',
    items: ['Deployment', 'Code & IP handover', 'Training', 'SLA support'],
  },
]

export const whyUs = [
  { title: 'Business focused', tag: 'Outcomes over activity', desc: 'We build solutions that solve real business problems, judged on enquiries and sales, not page count.' },
  { title: 'Fast & SEO ready', tag: 'Built on Next.js', desc: 'Built for speed and SEO to help you rank better on Google — several client sites score 100/100 on Lighthouse.' },
  { title: 'Transparent pricing', tag: 'Published, fixed-price', desc: 'Starting prices are on this page. Fixed-price milestones or monthly retainers — no surprise billable hours.' },
  { title: 'Mobile first', tag: 'Every screen size', desc: 'Every website we build is designed for the phone first, then scaled up.' },
  { title: 'Clear communication', tag: 'Direct access', desc: 'You talk to the people building your project, with a live staging link and regular updates.' },
  { title: 'Ongoing support', tag: 'We stay after launch', desc: "We're here after your website or project goes live, with SLA support and monthly retainers." },
]

export const stack: { domain: string; text: string; tools: string[] }[] = [
  { domain: 'Frontend', text: 'Typed, component-driven interfaces that load fast on any phone.', tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'] },
  { domain: 'Backend', text: 'APIs and services designed around your data.', tools: ['Node.js', 'Python', 'Django', 'GraphQL', 'REST APIs'] },
  { domain: 'Commerce', text: 'Stores and payments that just work.', tools: ['Shopify Plus', 'Stripe', 'Razorpay', 'WhatsApp Business'] },
  { domain: 'Mobile', text: 'One codebase, both app stores.', tools: ['React Native', 'Flutter', 'Firebase'] },
  { domain: 'Data', text: 'Databases and storage sized for real traffic.', tools: ['PostgreSQL', 'Supabase', 'Prisma', 'Redis'] },
  { domain: 'Cloud & DevOps', text: 'Predictable deploys, quiet infrastructure.', tools: ['Vercel', 'AWS', 'Cloudflare', 'Docker', 'GitHub Actions'] },
  { domain: 'CMS', text: 'Content your team can edit without us.', tools: ['Sanity', 'Strapi', 'Contentful'] },
  { domain: 'Marketing', text: 'Tracking that proves what worked.', tools: ['Google Ads', 'Meta Ads', 'GA4', 'GTM', 'Search Console'] },
]

// Industries we have actually shipped for (from lib/caseStudies.ts).
export const industries: { name: string; text: string; work: string[] }[] = [
  { name: 'E-commerce & Retail', text: 'Storefronts, catalogs and WhatsApp ordering.', work: ['prihaan-spices', 'silver-spoon', 'aangan-boutique'] },
  { name: 'Weddings & Events', text: 'Portfolio sites that turn browsers into bookings.', work: ['zingbliss-events', 'club-mj-events'] },
  { name: 'Interiors & Architecture', text: 'Image-heavy portfolios that still load instantly.', work: ['sv-space-designs', 'si-decor'] },
  { name: 'Healthcare', text: 'Clinic sites built to rank locally and take bookings.', work: ['chahana-dental'] },
  { name: 'Manufacturing & Industrial', text: 'Product catalogs and RFQ flows for B2B buyers.', work: ['fgp-industries', 'rising-rechargeable'] },
  { name: 'Travel', text: 'Itineraries, packages and lead qualification.', work: ['destination-anywhere', 'jade-travels'] },
  { name: 'Finance & Legal', text: 'Clear advisory sites and document workflows.', work: ['nexsphere-global', 'naam-transfer'] },
  { name: 'Networks & Media', text: 'Member portals and agency showcases.', work: ['ares-business-league', 'jukebox-media'] },
]

export const timeline = [
  { year: '2019', event: 'Founded in Ahmedabad as a web development studio, building websites for local businesses.' },
  { year: '2021', event: 'Started building Vibo ERP — our own business management software — to run our own operations better.' },
  { year: '2023', event: 'Grew to serve clients across India, and took on custom software and mobile app projects.' },
  { year: '2024', event: 'Passed 150+ shipped websites, e-commerce stores and custom software projects.' },
]

export const values = [
  { title: 'Outcomes over activity', desc: 'We measure success by enquiries, sales and speed — not by billable hours.' },
  { title: 'Radical transparency', desc: 'Published prices, a live staging link and fixed-price milestones.' },
  { title: 'Built to grow with you', desc: 'Modern, well-structured code that the next developer can pick up.' },
  { title: 'Speed without cutting corners', desc: 'Small senior team, short feedback loops, proper QA before launch.' },
]
