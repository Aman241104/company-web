# Creative Improvement — Round 3

Implements the top 5 ranked items from `research/creative-review-round-3.md`. Verified against a
production build (`npm run build && npm run start`, port 4173) with Playwright/Chromium at
375×812, 768×900 and 1440×900 — not dev/HMR, and not single at-rest screenshots. `npm run lint`
and `npm run build` both pass clean (0 errors; only pre-existing warnings unrelated to this work).

---

## 1. `lib/useClearanceGuard.ts` now reacts to scroll, not just mount/resize

**Root cause (confirmed):** the hook only ran `applyClearance()` on mount, a 350ms settle timer,
and `resize`/`orientationchange`. Scrolling — the one event the bug is actually about — was never
listened for, so a field could scroll into the fixed WhatsApp button's/mobile dock's danger band
mid-transit with no correction ever firing.

**Fix:** added a passive, rAF-throttled `scroll` listener that re-runs the same `applyClearance()`
check on every animation frame while the user scrolls. Also generalized the hook to accept an
array of clearance CSS vars (takes the max/tallest danger band across all of them — needed for
item 2 below) and an optional `deps` array so a caller can force an immediate re-check when
something other than scroll/resize changes layout (e.g. an accordion toggling).

**Verification — real scroll-position sweep, production build, 375×812, `scroll-behavior` forced
to `auto` (the site sets `scroll-behavior: smooth` globally in `globals.css`, which was silently
causing an earlier naive sweep attempt to under-shoot requested scroll positions — caught and
corrected before trusting any result):**

- Swept `scrollY` from 0 to 1000px in 5px steps (`window.scrollTo({top, behavior:'auto'})`, 2
  animation frames + 15ms settle per step, `maxAchieved` scrollY confirmed to reach the full
  requested 1000px — i.e. the sweep genuinely covered the range, not a smooth-scroll-lagged
  partial one) on the homepage.
- Measured `getBoundingClientRect()` overlap between the floating WhatsApp button
  (`a[aria-label="Chat with us on WhatsApp"]`) and the quick-quote phone input
  (`input[name="phone"]`) at every step.
- **Result: 0 overlapping steps across the full 0–1000px range** (round 3 had measured up to
  44×34px overlap around scrollY≈203–240 with the pre-fix hook).
- Confirmed the fix is doing real work, not coincidentally passing: sampled the lead-capture
  block's `style.marginTop` across the same range — it actively grows (247px → 365px+) as scrollY
  increases, proving the scroll listener is firing and repositioning the element in real time, not
  sitting idle.
- Confirmed inert above the breakpoint: at 1440×900 the same block's `marginTop` is `""` (guard
  correctly no-ops above the 768px breakpoint).

## 2. Locations mobile accordion wired into the same clearance guard

**Root cause (confirmed):** `LocationsIndexPage.jsx` was never wired to `useClearanceGuard` at
all. The Ahmedabad row is open by default, so on mobile it rendered directly behind both the
floating WhatsApp button and the fixed mobile dock nav with zero interaction required.

**Fix:** each `LocationRow` now holds a ref on its own row wrapper and calls
`useClearanceGuard(['--whatsapp-clearance', '--mobile-dock-clearance'], [rowRef], {}, [isOpen])`
— guarding against whichever fixed element's danger band is taller, and re-checking immediately
when a row's `isOpen` state flips (so switching cities doesn't have to wait for the next
scroll/resize event to get corrected). This reuses the exact mechanism from item 1, so it's also
scroll-reactive going forward.

Considered the "static bottom padding" alternative from the review but rejected it: padding after
the content doesn't stop content from initially rendering into the fixed elements' viewport band —
only pushing the block down (what the guard already does) does. Padding would also have to guess
at per-city content height, which the review explicitly flagged as unpredictable.

**Verification — production build, 375×812, zero scroll (matching the exact reported bug: visible
on initial load with no interaction):**

- On load, before any scroll: Ahmedabad's panel `[role="region"]` rect measured `top: 858,
  bottom: 1300`; WhatsApp button rect `top: 652, bottom: 700`; mobile dock rect `top: 742, bottom:
  800`. **Overlap with either: `null` (none).**
- Confirmed the guard is actually engaged (not just naturally non-overlapping): the row's
  `style.marginTop` was `459px` at measurement time — without that push the panel would render
  ~459px higher, landing squarely inside both the WhatsApp and dock bands.
- Toggle case: clicked to close Ahmedabad and open Surat instead (`aria-expanded` states
  confirmed). Re-measured — Surat's panel also shows **zero overlap** with either fixed element,
  confirming the `isOpen`-driven re-check works, not just the initial-mount case.
- 768px/1440px: guard correctly inert (`window.innerWidth >= breakpoint` short-circuits).

## 3. Full `text-neutral-400`-on-copy sweep (exhaustive, not instance-by-instance)

Grepped every `neutral-400` usage in the codebase (5 total, confirmed complete —
`grep -rn "neutral-400"` across `.tsx/.ts/.jsx/.js/.css`, non-`node_modules`). Classified each:

| Location | Usage | Classification | Action |
|---|---|---|---|
| `components/sections/FAQ.jsx:24` | icon fill inside accordion +/− circle | decorative icon | left as-is |
| `components/pages/SolutionsPage.jsx:111` | industry-tab icon fill | decorative icon | left as-is |
| `components/pages/LocationPage.jsx:71` | arrow-icon fill on a link | decorative icon | left as-is |
| `components/sections/Team.jsx:101` | "Mehta Tech Core" card caption | **real copy** | bumped to `neutral-500` |
| `components/pages/WorkPage.jsx:335` | "Enterprise Client IP Protected" fallback label | **real copy** (dormant) | bumped to `neutral-500` |

**Verification — canvas-resolved contrast (matching round 2/3's own methodology, since this
codebase's Tailwind v4 palette serializes computed colors as `lab(...)`, which a naive
string/regex check gets wrong):**

- Team.jsx caption, live on `/about#team`, production build: resolved foreground `lab(48.496 0 0)`
  → `rgb(115,115,115)`, background (card) `rgb(255,255,255)` → **contrast ratio 4.74:1** (was
  2.58:1 pre-fix per round 3's measurement). Passes WCAG AA for normal text (≥4.5:1).
- WorkPage.jsx label: currently unreachable in the live dataset (every project has `url` or
  `inProgress: true`), so it can't be measured in situ. Verified by rendering the exact class list
  (`text-xs font-medium text-neutral-500 border border-neutral-200`) in an injected probe node and
  resolving its computed color the same way — identical token, so identical **4.74:1** ratio on a
  white background. Same latent-bug risk closed even though the branch isn't live today.

## 4. Two one-line content fixes

- **Privacy/Terms dates** (`app/privacy/page.tsx:36`, `app/terms/page.tsx:36`): "Last Updated"
  changed from "August 2025" to "September 2026" (today's real date, per the environment's system
  clock — 2026-09-16). Left "Effective Date: January 1, 2024" untouched — that marks when the
  policy first took effect, not when it was last edited, and changing it would itself be an
  unverifiable factual claim.
- **Kavya Reddy's avatar** (`components/sections/Team.jsx`): did not fabricate a photo. Instead
  made the initials-fallback read as a deliberate design choice: same 56px circular frame/border/
  shadow as every photo card (unchanged), but the fill is now a branded `blue-500→indigo-600`
  gradient with white text at the same font weight/size class other emphasis text uses, plus the
  same `group-hover:scale-105` micro-interaction the photos get, plus `role="img"
  aria-label={member.name}` for parity with the photo cards' `alt` text. Documented the pattern in
  code as intentional (comment on the `team` array entry): "no photo yet" fallback, not a missing
  asset, with an explicit instruction to swap in a real `image` path (never fabricate one) the
  moment a photo exists. Confirmed visually at 1440px — the KR monogram now has equal visual
  weight to the five photo cards next to it, not a washed-out placeholder.

## 5. Homepage hero opener restructured

Removed the standalone pill badge that sat above the H1 (the same opener recipe About/Work/
Solutions/Locations still use, and the one Contact/Labs already proved could be broken). The H1
now leads the column directly. The "Full-Service Web & Software Partner" badge wasn't deleted —
it now sits as the eyebrow label directly on the lead-capture form block (`Or get a free quote in
under a minute:`), matching Contact's approach of folding the identity line into the block that
actually needs context, instead of a banner above everything.

No real functionality touched or regressed: lead-capture form (name/phone/submit, honeypot,
`/api/contact` POST + mailto fallback), trust/CTA buttons, location line, and
`HeroDashboardShowcase` screenshot mockup (laptop + phone images, floating trust chips) are all
unchanged, just reflowed. Verified visually at 1440×900 and 375×812 in the production build —
H1 leads immediately, CTAs/location line follow, badge now anchors the lead-capture block, and the
screenshot mockup renders unchanged in the right column.

---

## Lint / Build status

- `npm run lint` — **0 errors**, 28 pre-existing warnings (all unrelated to this round's files;
  unchanged from before this work — unused-import and exhaustive-deps warnings in files this round
  didn't touch, e.g. `Navbar.jsx`, `ProjectModal.jsx`, `typewriter.tsx`).
- `npm run build` — **clean**, all 39 static pages + dynamic routes generated successfully.
- Re-verified in `npm run start` (production build), not dev/HMR, per the round-3 playbook's
  explicit warning about the round-2 false positive.
- No debug `console.log` statements added. Scratch screenshots taken during verification
  (`.playwright-mcp/*.png`) were deleted before finishing; nothing scratch-related was committed.

## Known limitation, disclosed

The clearance-guard's correction mechanism (push via `margin-top`, recomputed every scroll frame)
"chases" the danger zone rather than reserving space up front — visually this means a guarded
element's effective scroll speed slows slightly while it's near the danger band, rather than
moving at a perfectly uniform rate. This was true before this round's fix and is unchanged in
character; this round only extended *when* the existing mechanism fires (continuously vs.
once-at-mount), not its fundamental approach. It fully eliminates the measured overlap (the
review's pass/fail bar), but a smoother approach (e.g. permanently reserving clearance space via
padding rather than reactive margin pushes) would be a reasonable next-round follow-up if the
chase effect is ever visually objectionable.
