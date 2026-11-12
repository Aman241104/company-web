'use client'
import { btnClass, Arrow } from './ui'
import { openConsult } from './consult'

export default function ConsultButton({ children = 'Start a Project', service = '', variant = 'primary', size = 'lg', className = '' }) {
  return (
    <button type="button" onClick={() => openConsult(service)} className={btnClass(variant, size, className)}>
      <span>{children}</span>
      {variant === 'primary' && <Arrow />}
    </button>
  )
}
