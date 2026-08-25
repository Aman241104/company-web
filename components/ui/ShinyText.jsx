'use client'

export default function ShinyText({
  children,
  className = '',
  shimmerWidth = 100,
}) {
  return (
    <span
      className={`inline-block bg-[linear-gradient(110deg,#93c5fd,45%,#ffffff,55%,#93c5fd)] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer ${className}`}
    >
      {children}
    </span>
  )
}
