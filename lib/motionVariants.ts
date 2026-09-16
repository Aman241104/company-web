// Shared motion variants — a small, deliberate set of entrance treatments so
// different section *types* signal their nature through movement, not just
// through layout. Each one is reused consistently across the site rather
// than invented ad hoc per component, so this stays "a few authored
// signatures" and not motion soup:
//
//  - headline tween  (unchanged, inline per-component): the simple
//    opacity+y fade already used for hero/H1 blocks sitewide. Kept as-is —
//    it's a legitimate, deliberate signature for "text announcing a
//    section," not the problem. The problem was reusing it for everything.
//  - cardGridContainer / cardSpringItem: a spring-physics pop-in with a
//    light stagger, for grids of independent cards (Services, Portfolio,
//    Pricing, Team). Springs read as livelier/snappier than the headline
//    tween, matching "these are separate, browsable objects."
//  - clipWipe: a clip-path reveal for content that *replaces* what was
//    there a moment ago (Solutions' industry detail panel, Locations'
//    expanding city row) — signals "swap," not "arrive."

export const cardGridContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
}

export const cardSpringItem = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22, mass: 0.7 },
  },
}

export const clipWipe = {
  initial: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  animate: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}
