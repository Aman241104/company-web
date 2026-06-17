export default function FloatingOrb({ color = '#2563EB', size = 400, x = '50%', y = '50%', delay = 0 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        background: color,
        filter: 'blur(80px)',
        opacity: 0.18,
        animation: `float 7s ease-in-out ${delay}s infinite`,
        willChange: 'transform',
      }}
    />
  )
}
