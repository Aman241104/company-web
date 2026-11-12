// Team roster — shared by the homepage rail, /team and /about.
export const team: { name: string; role: string; image?: string; init?: string; bio: string; skills: string[] }[] = [
  {
    name: 'Gaurav Mehta',
    role: 'Founder & CEO',
    image: '/team/gaurav.jpg',
    bio: 'Full-stack web developer and product engineer, leading the studio since 2019 with a focus on building websites that genuinely help businesses grow.',
    skills: ['Next.js', 'Web Architecture', 'Client Strategy'],
  },
  {
    name: 'Riya Shah',
    role: 'Head of Design & UX',
    image: '/team/riya.jpg',
    bio: 'Design lead focused on clean, conversion-minded interfaces — making sure every site looks great and is easy for visitors to act on.',
    skills: ['Figma', 'Interaction Design', 'Design Systems'],
  },
  {
    name: 'Arjun Pillai',
    role: 'Lead Backend Engineer',
    image: '/team/arjun.jpg',
    bio: 'Backend engineer focused on building reliable, well-structured systems for custom software and e-commerce projects.',
    skills: ['Node.js', 'PostgreSQL', 'API Design'],
  },
  {
    name: 'Sameer Joshi',
    role: 'Mobile Engineering Lead',
    image: '/team/sameer.jpg',
    bio: 'Cross-platform mobile developer, building iOS and Android apps for clients who need a mobile presence alongside their website.',
    skills: ['React Native', 'Flutter', 'iOS & Android'],
  },
  {
    name: 'Priya Nambiar',
    role: 'Growth & Performance Lead',
    image: '/team/priya.jpg',
    bio: 'Performance marketing lead focused on running Google and Meta campaigns that bring in real, qualified enquiries.',
    skills: ['Google Ads', 'Meta Campaigns', 'Attribution UX'],
  },
  {
    name: 'Kavya Reddy',
    role: 'Technical SEO Lead',
    // No published headshot yet — `init` triggers the monogram fallback
    // below instead of a photo. Deliberate, documented pattern for "no
    // photo yet," not a missing asset: every card uses the same 56px
    // circular frame/border/shadow, and the monogram gets a solid ink fill
    // (not a gradient — see research/design-system-v2.md, gradient fills
    // are retired sitewide) with equal visual weight to a photo rather than
    // a pale placeholder tint. Swap in `image: '/team/kavya.jpg'` (and drop
    // `init`) the moment a real photo exists — never fabricate one.
    init: 'KR',
    bio: 'Technical SEO specialist focused on Core Web Vitals, site structure, and search fundamentals that help clients actually get found.',
    skills: ['Technical SEO', 'Schema Markup', 'Core Web Vitals'],
  },
]
