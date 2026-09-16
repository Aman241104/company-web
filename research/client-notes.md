# Client ask — 2026-09-15

Scope for this pipeline run: **Zan Services competitor-benchmark gaps.**

On 2026-08-31, at Gurav's request, mehta-next was benchmarked against competitor Zan
Services (zanservices.com) across SEO, on-site lead-conversion pipeline, and live Google
Ads. Most site-side findings were implemented same-day. This run's job:

1. **Re-verify** (don't trust the 15-day-old memory blindly) that everything recorded as
   "implemented" on 2026-08-31 is still actually present and correct in the current code —
   read the actual files, don't take the prior summary's word for it.
2. **Close any remaining gaps** from the original benchmark menu that are in-scope for a
   code change.
3. **Do not** attempt the one item explicitly flagged as out-of-scope for a code pipeline:
   restructuring Mehta's actual Google Ads account (separate campaigns per service line,
   sitelink extensions, numeric-hook ad headlines) — this requires Ads account access, not
   a repo change. Re-flag it as still pending if still unaddressed; do not silently skip
   mentioning it, but do not attempt to build a workaround for it either.

## Original benchmark menu (from research)

- **SEO:** Full `Organization`+`ProfessionalService` JSON-LD (NAP, `geo`,
  `openingHoursSpecification`, `sameAs`, `areaServed`, `knowsAbout`, `aggregateRating` only
  with real review counts, `priceRange`). FAQ sections with `FAQPage` schema, ~10 real
  long-tail buyer questions per landing page. Dedicated per-keyword/city landing pages kept
  crawlable and footer/nav-linked — **never orphaned doorway pages** (see
  `feedback_honest_seo_no_doorway_pages` memory: landing pages must be crawlable/linked,
  never fabricate client locations).
- **Lead-conversion pipeline:** Hero lead-capture form (with honeypot). Trust bar under
  hero (projects delivered, rating, on-time %, response-time SLA) — **only real, already-
  verified numbers, never invented**. Transparent starting-from pricing tiers. Redundant
  CTAs (hero, mid-page, footer) paired with tap-to-call + WhatsApp click-to-chat. GTM + Meta
  Pixel wired (inert without real IDs — never fabricate tracking IDs).
- **Landing pages & ads:** Per-service-line Google Ads campaigns with matched dedicated
  landing pages, numeric-hook ad headlines, sitelink extensions — **out of scope for this
  pipeline run**, flag status only.

## 2026-08-31 implementation status (verify, don't trust as current fact)

- Hero (`components/sections/Hero.jsx`): trust bar + inline mini lead-capture form
  (mailto:-based, not a real POST backend — no email API key was available).
- Pricing (`components/sections/Pricing.jsx`): 4 published tiers (Landing Page ₹9,999,
  Starter ₹19,999, Business Website ₹32,999, Growth MVP ₹75,000), Enterprise/SaaS moved to
  a bottom CTA banner. Calculator `projectTypes` updated to match.
- FAQ (`components/sections/FAQ.jsx` + `faqSchema` in `app/page.tsx`): 3 added long-tail
  questions, pricing answer synced to new tiers.
- Schema (`app/page.tsx` `localBusinessSchema`): `sameAs` + `knowsAbout` added.
- Footer (`components/sections/Footer.jsx`): `tel:` click-to-call link added.
- Tracking (`app/layout.tsx`, `.env.example`): GTM + Meta Pixel scaffolding, gated behind
  `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_META_PIXEL_ID`, inert without real IDs.

## Hard rule (inherited from workspace memory, non-negotiable)

Never fabricate content: no invented stats, testimonials, client logos, certifications,
SLAs, capability claims, or client locations not traceable to the real content source. If
real content is thin, scope the section down honestly instead of padding with fiction.
