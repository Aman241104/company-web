# Critique — Restored Pricing/FAQ vs. the live Zan Services reference

_Stage 4 (Analyst, critique pass). Verified against the running dev server
(`localhost:3000`, desktop 1440px + mobile 390px, via Playwright) and against
zanservices.com fetched live on 2026-09-15 — not against the 2026-08-31
memory or the build spec's characterization of Zan. No new content proposed;
no code written._

## Headline finding: the framing in the build spec needs a correction

The build spec (and this stage's own brief) assumed Zan Services has a
concrete "pricing tier presentation" to match or beat. **It doesn't.**
Zan's live homepage has no pricing section, no tiers, and no numbers at all.
Its only pricing-related copy is one line under "Why us": *"Transparent
pricing, no hidden costs and flexible packages — quoted against scope, not
against how the project is going."* Everything is "Start a Project" →
custom quote.

So this isn't a case of "does our tiers section match Zan's tiers section."
There's nothing on the other side to match. What Mehta shipped — four real,
numbered, feature-scoped tiers (₹9,999 / ₹19,999 / ₹32,999 / ₹75,000) with
visible timelines and inclusions — is **more transparent than the actual
competitor**, not a copy of it. That's worth stating plainly rather than
grading it against a pattern Zan doesn't use. If anything, published
starting prices are a genuine differentiation angle against Zan, not table
stakes to catch up on.

## Section-by-section

### Pricing
Zan: no section to compare. Mehta: 4-card grid at `/#pricing`, confirmed live
at desktop and mobile — clean grid, correct "Most Popular" badge on Business
Website only, Enterprise handled as a banner below the grid rather than a
5th card (matches spec). Card copy (timelines, feature bullets, "N months
post-launch SLA support" per tier) reads as real, tier-appropriate
commitments, not marketing fluff — no fabricated stats here. Mobile layout
stacks cleanly, no overflow, buttons keep full-width tap targets. This
section is solid as shipped.

The one real problem is downstream, not in this section itself: the
**`/services` page ("Website Development" service card)** shows `From
₹9,999` — the Landing Page tier's exact price — sitting directly next to a
feature list (headless CMS integration, multi-currency/i18n support,
automated A/B testing architecture, WCAG 2.2 AA compliance, server-side
analytics/lead routing) and a `3–6 weeks` timeline that describe something
between the Business Website and Growth MVP tiers, not a 3–5-day single
page. I loaded this page live and it reads exactly as jarring as QA's
write-up implied — a prospect who lands on `/services` before `/` sees
₹9,999 quoted against a feature set several tiers above it. This is a
credibility problem on a page whose whole job is to build trust before a
quote conversation.

### FAQ
Zan: 10 questions live (confirmed by direct fetch, correcting an earlier
9-count read) — What does Zan do, why choose Zan in Kolkata, industries
served, cost, international clients, timeline, how to start, tech stack,
post-launch support, location. Mostly brand/trust-building, generic-intent
questions.

Mehta: 10 questions in `lib/faqs.ts` (QA's re-count was correct; the spec's
and changelog's "9" was a miscount, not missing content) — project types,
timeline, international clients, pricing, WordPress vs. custom, SSR/SEO,
security practices, code/IP ownership, existing-codebase upgrades,
post-launch support. Tested the accordion live: single-open behavior works,
`FAQPage` schema present once with all 10 in `mainEntity`, matches
`app/locations/[city]/page.tsx`'s established pattern.

Count is now a tie (10–10), so the "10 vs 9" gap the brief flagged is
already closed — QA's fresh grep resolved that before this stage started.
On substance, Mehta's FAQ set is arguably stronger for SEO: "WordPress vs.
custom," "SSR and SEO," "who owns the code," and "security practices" are
genuine long-tail buyer-intent questions a technical prospect actually
searches for; Zan's list leans more generic/brand ("what does X do," "where
is X located"). Not a fabrication concern either way — no reason to add a
"why choose Mehta" question just to mirror Zan's brand-y one, since that
ground is already covered by the separate `WhyUs` section elsewhere on the
same homepage. No action needed here.

### Trust bar / stats
Not this stage's core scope, but worth noting since Zan's live bar was
re-fetched anyway: Zan shows 80+ projects, 50+ clients, 4.9 rating, 99%
on-time. Mehta's `Stats.jsx` shows 150+ projects, 100+ clients, 4.9/5
rating, "Ongoing" support — correctly filling the 4th slot with a real,
non-numeric claim instead of fabricating an on-time % or response-time SLA
it can't back up. This is the right call per the no-fabrication rule and
matches gap 5's disposition in the build spec. No change warranted.

## Verdicts on the 3 carried-over QA issues

**1. `/contact` "Service Focus" dropdown doesn't pre-select after a Pricing
CTA click — fix it now.** Confirmed live: `/contact?service=Landing%20Page&budget=9999`
shows "Estimated Budget" correctly pre-filled (₹9,999 – ₹50,000) while
"Service Focus" shows the blank placeholder. This isn't a hedge call — it's
cheap to fix (add the 4 tier names as `<option>`s in `ContactPage.jsx`'s
`services` list, or have `Pricing.jsx`'s CTA hrefs map each tier to its
closest existing category) and it happens at the exact moment a prospect
converts from the Pricing section this whole stage restored. Leaving a
visibly-blank field right after someone clicks "Start your landing page" is
the kind of small trust leak that undercuts the "transparent, no surprises"
positioning the Pricing section itself is selling. Low effort, real payoff — fix it.

**2. ServicesPage pricing/feature-list optics — fix it now, not later.**
Seeing it live upgrades this past QA's "Low–Medium, defensible reading"
call. The mismatch isn't subtle on the page — the price is a landing-page
price, the bullet list and timeline describe a full custom-CMS website, and
nothing on the page tells the reader "From ₹9,999" means "off a stripped-
down single page," while the feature list is what a `₹32,999+` engagement
buys. This is a live pricing-integrity issue on a page one click from
`/contact`, not a cosmetic one. Two buildable fixes, either is fine:
(a) split "Website Development" into two rows (landing page vs. full
business site) each pointing at its actual tier, or (b) keep one row but
change the label to `From ₹9,999 for a single page` / `Full builds from
₹32,999` so the number and the feature list stop contradicting each other.
Either is a content/label change, not a redesign — in scope for a quick
follow-up.

**3. `pricingSummary` hardcoded-label drift risk — leave it, but it's a
five-minute fix if anyone's already in the file.** Genuinely low priority:
the sentence is correct today, nothing is broken, and it doesn't affect a
prospect right now. It doesn't need its own stage. But since the fix is
trivial (key the three description phrases off `tier.id` via a lookup
object instead of positional `pricingTiers[0..3]` indexing — the same
pattern `cheapestTier`/`flagshipTier` already use two lines above it) and
the whole point of `lib/pricing.ts` existing is to prevent exactly this
class of silent drift, it's worth doing opportunistically the next time
`lib/pricing.ts` is touched for any other reason. Not worth a dedicated
follow-up stage on its own.

## What's honestly fine as shipped (not just complaints)

- The core restoration did what it needed to: Pricing and FAQ are both
  live, both wired to real `lib/` data sources following the established
  no-drift convention, both render correctly at desktop and mobile widths,
  both pass a real accordion/interaction test (not just a DOM-presence
  check), and neither introduces a new lint or console regression. Verified
  independently, not just re-read from the changelog.
- `FAQPage` schema and the `areaServed` rename are both correct and present
  exactly once, sourced from static data with zero `dangerouslySetInnerHTML`
  injection risk — QA's security pass checked out on live inspection too.
- The pricing figures are now genuinely single-sourced (`lib/pricing.ts`)
  and the three previously-contradicting numbers on `/`, `/services`, and
  `/contact` are consistent in the cases that were reconciled (ContactPage's
  budget floor now correctly matches the ₹9,999 tier).
  The one place that's still inconsistent (`ServicesPage.jsx`'s feature-list
  optics) is a labeling problem, not a re-introduction of the original
  three-different-numbers bug — the number itself is correctly sourced from
  `lib/pricing.ts`, it's just paired with the wrong feature list.
- The no-fabrication rule held throughout the restored content — no
  invented stats, testimonials, SLAs, or client claims anywhere in the
  restored sections. `Stats.jsx`'s honest 2-real/2-honest fill of the trust
  bar remains the right call, confirmed against what Zan actually shows.
- Choosing not to rebuild the old dark-theme dark-era scope calculator was
  the right scope call — it would have reintroduced a second uncoordinated
  price list the same day the point of this work was eliminating exactly
  that problem.

## Ranked top items to fix (N=3, no padding)

1. **Fix the `/contact` Service Focus dropdown pre-fill** so it visibly
   matches the tier a prospect just clicked from the homepage Pricing
   section. Cheapest fix, highest-leverage moment (point of conversion).
2. **Resolve the `ServicesPage.jsx` "Website Development" price/feature-list
   mismatch** — either split the row into two tier-matched entries or
   qualify the `From ₹9,999` label so it stops sitting next to a headless-
   CMS/multi-currency feature list it doesn't buy. This is a trust-integrity
   issue on a pre-conversion page, more urgent live than QA's writeup made
   it sound.
3. **Key `pricingSummary` off `tier.id` instead of array position** in
   `lib/pricing.ts` — low urgency, but it's the kind of five-line fix that
   permanently closes a drift-risk class the file was built specifically to
   prevent, so it's worth doing the next time that file is opened for any
   reason, rather than waiting for it to actually go wrong first.

No 4th item makes the cut — the mobile floating-WhatsApp button visually
overlapping FAQ row toggles at certain scroll positions is real but is a
sitewide fixed-widget behavior that predates and is unrelated to this
stage's Pricing/FAQ restoration, not something this critique is scoping in.
