import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

// Exact component classes from the zanservices.com benchmark, Mehta tokens.
const btnBase =
  'group/btn relative isolate inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap select-none transition-[transform,box-shadow,background-color,background-position,color,border-color] duration-300 ease-out-expo active:scale-[0.98]'
const variants = {
  primary:
    'bg-brand-gradient text-on-brand shadow-[0_10px_24px_-12px_color-mix(in_oklab,var(--color-brand)_45%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_color-mix(in_oklab,var(--color-brand)_60%,transparent)]',
  secondary: 'border border-line-strong bg-bg/75 text-ink backdrop-blur-sm hover:-translate-y-0.5 hover:border-ink',
  ghost: 'px-0! text-ink hover:text-brand-ink',
}
const sizes = { md: 'h-11 px-5 text-[0.9375rem]', lg: 'h-13 px-7 text-base' }

export function btnClass(variant = 'primary', size = 'lg', extra = '') {
  return `${btnBase} ${variants[variant]} ${sizes[size]} ${extra}`
}

export const Arrow = () => (
  <ArrowUpRight
    aria-hidden="true"
    className="size-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
  />
)

/** @param {any} props */
export function Btn({ href, variant = 'primary', size = 'lg', className = '', children, arrow = variant === 'primary', icon = null, external = false, ...rest }) {
  const cls = btnClass(variant, size, className)
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  )
  if (href && (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')))
    return (
      <a href={href} className={cls} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {inner}
      </a>
    )
  if (href)
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    )
  return (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  )
}

/** @param {any} props */
export function Eyebrow({ children, className = '', as: Tag = 'p' }) {
  return (
    <Tag className={`inline-flex items-center gap-2.5 font-mono text-eyebrow uppercase text-brand-ink ${className}`}>
      <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
      {children}
    </Tag>
  )
}

// Heading whose lines slide up out of a mask (data-reveal="line").
/** @param {any} props */
export function LineHeading({ lines, as: Tag = 'h2', className = 'font-display text-balance text-h1', id }) {
  return (
    <Tag className={className} aria-label={lines.join(' ')} id={id}>
      {lines.map((l, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]" aria-hidden="true">
          <span className="block" data-reveal="line" style={{ '--i': i }}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  )
}

// "m o v e s" style per-letter float heading word.
/** @param {any} props */
export function FloatWord({ word, className = '' }) {
  const chars = [...word]
  return (
    <span className={`scroll-float ${className}`}>
      {chars.map((c, i) => (
        <span key={i} className="scroll-float-char" data-float-char="true">
          <span className="scroll-float-glyph text-brand-gradient scroll-float-gradient" data-float-glyph="true" data-reveal="float" style={{ '--i': i, '--n': chars.length }}>
            {c}
          </span>
        </span>
      ))}
    </span>
  )
}
