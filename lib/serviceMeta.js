import {
  Monitor, ShoppingCart, Boxes, Smartphone, Server, Bot, Cloud, ShieldCheck, Search, TrendingUp, Users, Star,
  FileCode2, Blocks, Gem, ScanSearch, LayoutTemplate, Shapes, Palette, PanelsTopLeft, Megaphone, PenTool, Code,
} from 'lucide-react'
import { caseStudiesData } from './caseStudies'
import { stack } from './site'

/** @type {Record<string, any>} */
export const serviceIcon = {
  'website-development': Monitor, 'ecommerce-development': ShoppingCart, 'custom-software-development': Boxes, 'mobile-app-development': Smartphone,
  'backend-api-development': Server, 'ai-automation': Bot, 'cloud-devops': Cloud, cybersecurity: ShieldCheck, 'technical-seo': Search,
  'performance-marketing': TrendingUp, 'social-media-management': Users, 'influencer-marketing': Star, 'smart-contracts': FileCode2, dapps: Blocks,
  'nft-platforms': Gem, 'contract-audits': ScanSearch, 'ui-ux-design': LayoutTemplate, 'brand-identity-design': Shapes, 'graphic-design': Palette, 'website-design': PanelsTopLeft,
  development: Code, 'digital-marketing': Megaphone, 'blockchain-web3': Blocks, designing: PenTool,
}

// Real case studies that demonstrate each discipline (only where we have one).
/** @type {Record<string, string[]>} */
export const serviceWork = {
  'website-development': ['silver-spoon', 'sv-space-designs', 'zingbliss-events'],
  'ecommerce-development': ['prihaan-spices', 'silver-spoon'],
  'custom-software-development': ['vibo-erp', 'ares-business-league', 'naam-transfer'],
  'backend-api-development': ['ares-business-league', 'naam-transfer'],
  'technical-seo': ['chahana-dental', 'sv-space-designs'],
  'performance-marketing': ['jukebox-media'],
  'ui-ux-design': ['sv-space-designs', 'zingbliss-events'],
  'website-design': ['zingbliss-events', 'silver-spoon'],
  development: ['silver-spoon', 'prihaan-spices', 'vibo-erp'],
  'digital-marketing': ['chahana-dental', 'jukebox-media'],
  designing: ['sv-space-designs', 'zingbliss-events'],
}
export const workFor = (slug) => (serviceWork[slug] || []).map((s) => caseStudiesData[s]).filter(Boolean)
export const imageFor = (slug) => workFor(slug)[0]?.heroImage || null

const stackBy = Object.fromEntries(stack.map((s) => [s.domain, s]))
export const stackFor = (slug, chapter) => {
  const pick = {
    'ecommerce-development': ['Commerce', 'Frontend', 'Data'],
    'mobile-app-development': ['Mobile', 'Backend', 'Data'],
    'backend-api-development': ['Backend', 'Data', 'Cloud & DevOps'],
    'cloud-devops': ['Cloud & DevOps', 'Data'],
    'custom-software-development': ['Frontend', 'Backend', 'Data'],
  }[slug] || (chapter === 'development' ? ['Frontend', 'Backend', 'Data'] : chapter === 'digital-marketing' ? ['Marketing', 'CMS'] : [])
  return pick.map((d) => stackBy[d]).filter(Boolean)
}
