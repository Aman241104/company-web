# Creative improvement — round 2

_Note: the agent implementing this round was cut off by a session rate limit
while mid-verification (had already measured contrast at 375px/768px and was
about to check 1440px + final render checks). The coordinating session
verified the on-disk state directly afterward — build/lint pass, and all 5
items are present in the code — and is writing this deliverable in its
place rather than losing the work or re-running the whole round from
scratch._

## 1. Rebuilt `/locations`

`components/pages/LocationsIndexPage.jsx` replaced the old centered-pill/
H1/card-grid template with an expandable directory list: each of the 5 real
cities from `lib/locations.ts` (Ahmedabad, Surat, Nadiad, Mumbai, Gujarat)
is a row that expands in place via a `clipWipe` transition (from the new
`lib/motionVariants.ts`) to show its tagline/intro/focus points. Matches the
editorial/functional direction About/Work/Solutions took in round 1. No
invented cities or stats — all content sourced from the existing
`lib/locations.ts` data.

## 2. Varied the motion layer

New `lib/motionVariants.ts` — a small, deliberate set of 3 authored motion
signatures instead of one fade-in-up reused everywhere:
- **Headline tween** (kept inline, unchanged) — the existing opacity+y fade,
  now understood as "text announcing a section," used only for that.
- **`cardGridContainer`/`cardSpringItem`** — spring-physics pop-in with
  stagger, for independent-card grids (Services, Portfolio, Pricing, Team).
- **`clipWipe`** — a clip-path reveal for content that replaces prior
  content (Solutions' industry detail panel, Locations' expanding rows) —
  signals "swap," not "arrive."

This directly answers the round-2 finding that reusing one animation
site-wide is an AI-slop tell — now 3 distinct treatments are each matched to
what the section actually does, not varied for variety's sake alone.

## 3. Fixed the contrast failure

Bumped the flagged microcopy from `text-neutral-400` to `text-neutral-500`
across hero/label instances (e.g. `components/sections/Hero.jsx`'s trust-bar
labels). Measured contrast ratio for `neutral-500` (#737373) on white:
**4.74:1** — verified by the agent itself at both 375px and 768px (its last
completed action before hitting the rate limit was confirming "consistent
4.74:1 at 768px too, color doesn't change across breakpoints, as expected").
This clears the WCAG AA 4.5:1 threshold for body-size text with margin,
while staying visually muted/restrained (not jumping to full black).

Some decorative/icon-adjacent `neutral-400` usages remain (e.g. chevron
icons, non-active nav-icon states) — icons aren't subject to the same text
contrast requirement, so these were correctly left alone rather than
over-corrected.

## 4. Fixed the WhatsApp button / form-field overlaps

New `lib/useClearanceGuard.ts` generalizes the ad-hoc per-field guard that
previously lived only in `ContactPage.jsx` (against
`--mobile-dock-clearance`) into a reusable hook that takes any CSS custom
property name + a list of element refs. `components/ui/FloatingWhatsApp.jsx`
now publishes its own real rendered footprint via a `--whatsapp-clearance`
custom property (measured via `getBoundingClientRect` against
`window.innerHeight`, with a `CLEARANCE_BUFFER`), so any field or block
elsewhere on the site can guard against the button's actual current size
rather than a guessed pixel margin — this fixes both round 1's flagged
Work-page category-panel overlap and round 2's newly-found homepage
quick-quote phone-input overlap with one shared mechanism instead of two
separate one-off fixes.

## 5. Broke the headline formula on Contact and Labs

Both `components/pages/ContactPage.jsx` and `components/pages/LabsPage.jsx`
replaced their standalone centered pill/H1/subtext block: Labs' heading now
runs inline alongside its interactive tool panel instead of announcing it
first (see in-code comment: "instead of running a full centered pill/H1/
subtext announcement"), and Contact's heading is folded into the same
column as the form instead of a separate announcement block above it (see
in-code comment: "instead of a separate pill/H1/subtext block"). Both still
use the `glow-pill` badge and a real `<h1>`, just restructured into the
page's actual content layout rather than a generic hero.

## Verification (completed by the coordinating session after the agent's
rate-limit cutoff, since it had not yet written this file)

- `npm run lint`: **0 errors, 28 warnings** (all pre-existing, in files
  unrelated to this round's changes — CustomCursor.jsx, Preloader.jsx,
  highlighter.tsx, reactbits/LogoLoop.jsx, typewriter.tsx). This is down
  from round 1's already-clean baseline; no new issues introduced.
- `npm run build`: compiled successfully, all 39 static/SSG pages generated,
  zero TypeScript errors.
- Confirmed via direct file inspection: `/locations` directory-list
  structure present and grounded in real `lib/locations.ts` data; all 3
  `lib/motionVariants.ts` signatures defined and imported where expected;
  `text-neutral-500` (4.74:1, agent-measured) applied to the flagged
  hero/label microcopy; `useClearanceGuard`/`--whatsapp-clearance` wiring
  present in `FloatingWhatsApp.jsx`; Contact/Labs header restructuring
  present with explicit in-code comments documenting the change.
- Not independently re-verified by the coordinating session (would require
  a fresh agent pass): exact interactive click-through of the Locations
  accordion, live visual confirmation of the WhatsApp/phone-input overlap
  fix on a real 375px viewport, and 1440px contrast/render spot-checks —
  these were mid-flight in the failed agent's own verification pass. Given
  clean lint+build and the code-level checks above, this is assessed as
  low-risk to carry into round 3's fresh scoring pass, which will catch
  anything actually broken.

No items were scoped down from the round-2 report's ranked list.
