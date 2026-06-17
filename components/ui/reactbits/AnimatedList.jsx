'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedItem({ children, delay = 0, index, onMouseEnter, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false })
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.25, delay }}
      style={{ marginBottom: '0.75rem', cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  )
}

export default function AnimatedList({
  items = [],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = false,
  initialSelectedIndex = -1,
  renderItem,
  height = 320,
  gradientColor = '#04050e',
}) {
  const listRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
  const [keyboardNav, setKeyboardNav] = useState(false)
  const [topGradientOpacity, setTopGradientOpacity] = useState(0)
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1)

  const handleItemMouseEnter = useCallback(index => setSelectedIndex(index), [])

  const handleItemClick = useCallback((item, index) => {
    setSelectedIndex(index)
    if (onItemSelect) onItemSelect(item, index)
  }, [onItemSelect])

  const handleScroll = useCallback(e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    setTopGradientOpacity(Math.min(scrollTop / 50, 1))
    const bottom = scrollHeight - (scrollTop + clientHeight)
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottom / 50, 1))
  }, [])

  useEffect(() => {
    if (!enableArrowNavigation) return
    const handleKeyDown = e => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1))
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault()
          if (onItemSelect) onItemSelect(items[selectedIndex], selectedIndex)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation])

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return
    const container = listRef.current
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`)
    if (selectedItem) {
      const extra = 50
      const top = selectedItem.offsetTop
      const bottom = top + selectedItem.offsetHeight
      if (top < container.scrollTop + extra) container.scrollTo({ top: top - extra, behavior: 'smooth' })
      else if (bottom > container.scrollTop + container.clientHeight - extra) container.scrollTo({ top: bottom - container.clientHeight + extra, behavior: 'smooth' })
    }
    setKeyboardNav(false)
  }, [selectedIndex, keyboardNav])

  return (
    <div style={{ position: 'relative', width: '100%', height }} className={className}>
      <div
        ref={listRef}
        onScroll={handleScroll}
        style={{
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: displayScrollbar ? undefined : 0,
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',
          msOverflowStyle: displayScrollbar ? 'auto' : 'none',
        }}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.05}
            index={index}
            onMouseEnter={() => handleItemMouseEnter(index)}
            onClick={() => handleItemClick(item, index)}
          >
            {renderItem
              ? renderItem(item, index, selectedIndex === index)
              : (
                <div
                  className={itemClassName}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '0.75rem',
                    border: `1px solid ${selectedIndex === index ? 'rgba(37,99,235,0.25)' : 'rgba(255,255,255,0.06)'}`,
                    background: selectedIndex === index ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.02)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <p style={{ color: selectedIndex === index ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)', fontSize: '0.875rem', margin: 0 }}>
                    {typeof item === 'string' ? item : item.label || item.text || String(item)}
                  </p>
                </div>
              )}
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to bottom, ${gradientColor}, transparent)`, pointerEvents: 'none', zIndex: 10, opacity: topGradientOpacity }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: `linear-gradient(to top, ${gradientColor}, transparent)`, pointerEvents: 'none', zIndex: 10, opacity: bottomGradientOpacity }} />
        </>
      )}
    </div>
  )
}
