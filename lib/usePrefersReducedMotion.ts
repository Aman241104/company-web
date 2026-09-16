import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Intentionally deferred to the effect rather than a useState lazy
    // initializer: this hook backs SSR'd, hydrated components (CustomCursor,
    // SmoothScroll), so the server and the client's first render both need
    // to start from the same `false` for hydration to match — only after
    // mount can the real media-query value be read and applied.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
