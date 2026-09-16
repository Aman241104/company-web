# Build spec — Zan Services competitor-benchmark gaps

_Analyst stage output. Verified against live code on 2026-09-15, not against the
2026-08-31 memory summary._

## Scope summary

This run closes the remaining code-side gaps from the Zan Services competitor
benchmark (research/client-notes.md). Re-verification found that two of the six
items the 2026-08-31 memory recorded as "implemented" — the homepage Pricing
section and the homepage FAQ section (with its `FAQPage` schema) — were deleted
outright on 2026-09-12 as "dead, unimported" code during an unrelated sitewide
light-theme conversion, and never got reconnected. That regression, plus one
schema property-name mismatch and one pricing-data inconsistency it surfaced,
is the real remaining work. The trust-bar metrics the benchmark asked for
(on-time %, response-time SLA) have no real data behind them anywhere in the
codebase, so per the no-fabrication rule this spec scopes that item down to
"do not build" rather than inventing numbers. The Google Ads account
restructuring item stays flagged as pending/external — no code task is
proposed for it. Everything below is bounded to these five items; no redesign,
no new pages, no new sections beyond what's listed.

---

## Drift check: 2026-08-31 memory vs. current code (2026-09-15)

| Item | 08-31 memory claimed | Actual current code | Verdict |
|---|---|---|---|
| Hero (`components/sections/Hero.jsx`) | Trust bar + inline mini lead-capture form, mailto:-based only (no POST backend, no API key available) | Lead form now POSTs to `/api/contact` (real `app/api/contact/route.ts`, Resend-backed, honeypot field, rate-limited); mailto: is now only a fallback if the POST fails or `RESEND_API_KEY` is unset. Trust bar itself is **not** in Hero.jsx — it lives in the separate `components/sections/Stats.jsx`, rendered directly after Hero on the homepage. | **Improved beyond the memory's description**, not regressed. `.env.example` now also documents `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`, correctly inert (falls back to mailto) without a key — no fabrication. |
| Pricing (`components/sections/Pricing.jsx`) | 4 published tiers (₹9,999 / ₹19,999 / ₹32,999 / ₹75,000), Enterprise moved to CTA banner, calculator synced | **File no longer exists.** Deleted in commit `eb8117b` ("Unify site theme to light mode across every page", 2026-09-12) along with FAQ.jsx and other components the commit found were dead/unimported on the homepage after an earlier redesign. No pricing tiers section renders anywhere on the site today. | **Regressed — gone.** Confirmed via `git log --diff-filter=D` and `git show --stat eb8117b`. |
| FAQ (`components/sections/FAQ.jsx` + `faqSchema` in `app/page.tsx`) | 3 added long-tail questions, pricing answer synced to new tiers, `FAQPage` schema on homepage | **File no longer exists**, and `app/page.tsx` currently only emits `WebSite` + `ProfessionalService` JSON-LD — no `FAQPage` schema on the homepage at all. `lib/faqs.ts` (9 Q&As, including the pricing-tiers answer) still exists but is now **imported by zero files** — dead, orphaned content. | **Regressed — gone**, deleted in the same `eb8117b` commit. Per-city FAQ + `FAQPage` schema on `app/locations/[city]/page.tsx` (driven by `lib/locations.ts`) is unaffected and still works correctly — that part of the original SEO ask is intact. |
| Schema (`app/page.tsx` `localBusinessSchema`) | `sameAs` + `knowsAbout` added | Confirmed present, plus `geo`, `openingHoursSpecification`, `priceRange`, `address` — all already there and correct. Uses `serviceArea: { "@type": "Country", name: "India" }` rather than the benchmark's named property `areaServed`. No `aggregateRating` — correctly absent; no review-count data exists anywhere in the codebase (`grep` for `reviewCount`/`ratingValue` across the repo returns nothing), so its continued absence is honest, not a gap. | **Mostly confirmed**, one minor property-name mismatch (see gap 3 below). |
| Footer (`components/sections/Footer.jsx`) | `tel:` click-to-call link added | Confirmed present (`tel:+919876543210` in the brand column). Footer also has real, footer-linked `/locations/[city]` links for all 5 real locations (Ahmedabad, Surat, Nadiad, Mumbai, Gujarat) — satisfies the "never orphaned doorway pages" rule. | **Confirmed accurate.** |
| Tracking (`app/layout.tsx`, `.env.example`) | GTM + Meta Pixel scaffolding, gated behind `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_META_PIXEL_ID`, inert without real IDs | Confirmed present exactly as described — both scripts (and their `<noscript>` fallbacks) are conditionally rendered only if the env var is set. | **Confirmed accurate.** |

Redundant CTA + tap-to-call/WhatsApp pattern (part of the lead-conversion
benchmark item, not itself claimed as a discrete 08-31 line item) is also
confirmed healthy independent of the Pricing/FAQ regression: `Footer.jsx`
(`tel:`), `components/sections/CTA.jsx` (WhatsApp link + contact CTA),
`components/ui/FloatingWhatsApp.jsx` (sitewide floating WhatsApp button), and
`components/ui/FastTrackDrawer.jsx` (both `tel:+919876543210` and a WhatsApp
deep link) all independently exist and work. No gap here.

---

## Codebase conventions to extend (for Stage 2)

- **Data/content separation**: `lib/faqs.ts` and `lib/locations.ts` are plain
  (non-`'use client'`) modules exporting typed arrays, imported by both a
  client component (for rendering) and a server component/page (for schema
  JSON-LD), so the two can never drift apart. This exact pattern — single
  source of truth in `lib/`, imported both places — was adopted deliberately
  in commit `cea6e2b` after FAQ text and FAQ schema drifted twice. **Any
  rebuilt Pricing or FAQ section must follow this pattern**, not reintroduce
  a `'use client'`-only data array.
- **Schema wiring**: `app/page.tsx` builds JSON-LD as a plain object
  (`websiteSchema`, `localBusinessSchema`) and injects it via
  `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(...) }} />`
  directly in the page body, above `<Navbar />`. `app/locations/[city]/page.tsx`
  does the same for `FAQPage` schema, building `mainEntity` by mapping over
  `location.faqs`. A rebuilt homepage FAQ schema should follow that exact
  `mainEntity` mapping shape, sourced from `lib/faqs.ts`.
- **Section components**: homepage sections live in `components/sections/`,
  are default-exported, and are composed in `app/page.tsx`'s `<main>` in
  document order (`Hero`, `Stats`, `Services`, `Portfolio`, `WhyUs`,
  `Products`, `CTA`, `Footer`). A restored `Pricing` and `FAQ` section should
  be added back into this same list, in a sensible position (Pricing after
  Services, FAQ before CTA is the layout Zan-style benchmarks typically use
  and matches where they sat before deletion, per `git show cea6e2b`).
- **Env-gated features**: optional/unverified integrations are gated behind
  env vars and degrade honestly when unset (GTM, Meta Pixel, Resend) — this
  pattern is the model for any future integration, not something to change.

---

## Bounded list of concrete gaps to close

### 1. Restore homepage FAQ section + `FAQPage` schema
- **Target files**: new `components/sections/FAQ.jsx` (rebuilt, accordion UI,
  imports from `lib/faqs.ts`, `'use client'`), `app/page.tsx` (add `FAQ`
  import + render call, add a `faqSchema` object built the same way
  `app/locations/[city]/page.tsx` builds its `FAQPage` `mainEntity`, and a
  third `<script type="application/ld+json">` tag for it).
- **What to add/change**: `lib/faqs.ts` already has 9 real, grounded Q&As
  (project types, timelines, international clients, pricing structure,
  WordPress vs custom, SSR/SEO, security practices, code ownership,
  post-launch support) — none of these need new content, they just need a
  renderer and schema wired back up. The pricing-tiers answer (item 4 in
  `lib/faqs.ts`) must be updated in lockstep with gap 4 below before this
  ships, so it doesn't cite numbers the rest of the site contradicts.
- **Benchmark item satisfied**: "FAQ sections with `FAQPage` schema, ~10 real
  long-tail buyer questions" (currently only true per-city, not sitewide).
- **Content readiness**: **ready now** for 8 of 9 answers (already real,
  already written, just orphaned). The 9th (pricing) is blocked on gap 4.

### 2. Restore a homepage Pricing section
- **Target files**: new `components/sections/Pricing.jsx`, `app/page.tsx`
  (import + render, positioned after `Services`).
- **What to add/change**: A tiers section presenting starting-from pricing,
  matching the "Enterprise/SaaS moved to a bottom CTA banner" structure the
  08-31 work used (the CTA banner pattern still exists in `CTA.jsx` and can
  be extended, not rebuilt).
- **Benchmark item satisfied**: "Transparent starting-from pricing tiers."
- **Content readiness**: **needs a content decision before implementation** —
  see gap 4. Two different real price sets currently exist in the live
  codebase (`lib/faqs.ts`'s orphaned ₹9,999/₹19,999/₹32,999/₹75,000 tiers vs.
  `components/pages/ServicesPage.jsx`'s per-service ₹20,000/₹75,000/₹30,000
  per mo/₹25,000 per mo figures), and neither matches
  `components/pages/ContactPage.jsx`'s budget-bucket ranges
  (₹20k–50k / 50k–150k / 150k–500k / 500k+). Building a new tiers section
  without first confirming which numbers are current would ship
  self-contradictory pricing on the same domain — do not guess; confirm with
  Aman/Gurav which set is authoritative, or explicitly retire the stale one.

### 3. Fix `localBusinessSchema` property name: `serviceArea` → `areaServed`
- **Target file**: `app/page.tsx` (`localBusinessSchema` object, currently
  line ~55).
- **What to add/change**: Rename `serviceArea: { "@type": "Country", name: "India" }`
  to `areaServed: { "@type": "Country", name: "India" }` (or add `areaServed`
  alongside if `serviceArea` is kept for compatibility) — `areaServed` is the
  schema.org / Google-documented property for a `ProfessionalService`'s
  coverage area; `serviceArea` is a narrower, distinct property expecting a
  `GeoShape` and isn't what the benchmark or Google's structured-data docs
  reference for this use.
- **Benchmark item satisfied**: "Full `Organization`+`ProfessionalService`
  JSON-LD ... `areaServed` ..."
- **Content readiness**: **ready now** — same real value ("India"), pure
  rename/addition, zero new content.

### 4. Single source of truth for pricing figures
- **Target files**: new `lib/pricing.ts` (following the `lib/faqs.ts` /
  `lib/locations.ts` convention), then update `components/pages/ServicesPage.jsx`
  (per-service `pricing:` fields), the rebuilt `Pricing.jsx` (gap 2), and the
  pricing FAQ answer in `lib/faqs.ts` (gap 1) to all import from it.
- **What to add/change**: This is a prerequisite decision-and-refactor step,
  not new UI. Once Aman/Gurav confirm which price points are current and
  real, encode them once in `lib/pricing.ts` and have every consumer read
  from there — mirrors exactly how commit `cea6e2b` fixed the FAQ text/schema
  drift by moving to a single `lib/faqs.ts`, for the same reason: three
  independent hand-typed copies of pricing already disagree with each other
  today, and each future edit is another chance to re-diverge.
- **Benchmark item satisfied**: supports "Transparent starting-from pricing
  tiers" by making the number sitewide-consistent, which the benchmark
  implies (a prospect who sees three different starting prices on one site
  trusts none of them).
- **Content readiness**: **needs more real content first** — specifically,
  needs Aman/Gurav to state the current authoritative price points (nothing
  in the codebase can resolve which of the three existing figures is
  correct; do not average or guess).

### 5. Trust-bar metrics (on-time %, response-time SLA)
- **Target file**: `components/sections/Stats.jsx` (if data becomes
  available in a future run).
- **What to add/change**: **Nothing, for this run.** The benchmark menu asks
  for a trust bar with "projects delivered, rating, on-time %, response-time
  SLA." `Stats.jsx` already covers projects delivered ("150+") and rating
  ("4.9/5"), which the 08-31 work correctly left alone (per commit
  `cea6e2b`'s note that these were specified directly in an earlier content
  brief, unlike fabricated named quotes). No on-time-delivery percentage or
  response-time SLA figure exists anywhere in the codebase or any other real
  content source.
- **Benchmark item satisfied**: N/A — explicitly **not** being closed this
  run.
- **Content readiness**: **cut back to what's real.** Per the non-negotiable
  rule, do not invent an on-time % or SLA number. Leave `Stats.jsx` exactly
  as-is (2 of the 4 asked-for metrics, both real). Flag to Aman that the
  other two need real operational data (e.g., from project-delivery records)
  before they can ever be added.

---

## Pricing decision (resolved 2026-09-15, by Aman)

Aman confirmed the authoritative price set is the `lib/faqs.ts` tier structure:
**Landing Page ₹9,999 · Starter ₹19,999 · Business Website ₹32,999 · Growth MVP
₹75,000**, Enterprise/SaaS via a bottom CTA banner (not a 5th tier). This
unblocks gaps 2 and 4 above. `ServicesPage.jsx`'s per-service monthly figures
and `ContactPage.jsx`'s budget buckets are the stale/inconsistent ones —
Stage 2 should reconcile them to read from the new `lib/pricing.ts` (or, where
a field is a genuinely different concept, such as ContactPage's broad intake
budget-range selector, leave the field but make sure it's not contradicting
the published tiers — use judgment, but the tier numbers above are ground
truth).

---

## Google Ads item — status

**Pending, external, not a code task.** Per-service-line Google Ads campaign
restructuring, numeric-hook ad headlines, and sitelink extensions require
direct access to Mehta Technologies' live Google Ads account, which this
pipeline does not have. Client notes explicitly scope this out. No code
change is proposed or attempted for it in this spec. It should stay on
Aman/Gurav's own action list until Ads-account access work happens outside
this repo.
