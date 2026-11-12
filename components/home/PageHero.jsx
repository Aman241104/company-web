import { Eyebrow, wrap } from './primitives'

/** @param {{ eyebrow: import("react").ReactNode, title: import("react").ReactNode, intro?: import("react").ReactNode, children?: import("react").ReactNode }} props */
export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 bg-cream overflow-hidden">
      <div className="absolute inset-0 bg-grid-dots opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_30%_10%,black,transparent)]" />
      <div className={`${wrap} relative`}>
        <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        <h1 className="font-display text-[40px] leading-[1.02] sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink max-w-4xl">{title}</h1>
        {intro && <p className="mt-6 text-base sm:text-lg text-ink/70 leading-relaxed max-w-2xl">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
