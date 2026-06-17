"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowRight, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const rotationAngleRef = useRef<number>(0)
  const frameRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number>(0)
  const expandedRef = useRef<Record<number, boolean>>({})

  useEffect(() => { expandedRef.current = expandedItems }, [expandedItems])

  const applyPositions = useCallback((angle: number) => {
    timelineData.forEach((item, index) => {
      const el = nodeRefs.current[item.id]
      if (!el || expandedRef.current[item.id]) return
      const nodeAngle = ((index / timelineData.length) * 360 + angle) % 360
      const radian = (nodeAngle * Math.PI) / 180
      const x = 180 * Math.cos(radian)
      const y = 180 * Math.sin(radian)
      const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2)))
      el.style.transform = `translate(${x}px, ${y}px)`
      el.style.opacity = opacity.toFixed(3)
      el.style.zIndex = String(Math.round(100 + 50 * Math.cos(radian)))
    })
  }, [timelineData])

  useEffect(() => {
    if (!autoRotate) {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      return
    }
    lastTimestampRef.current = 0

    const tick = (timestamp: number) => {
      if (lastTimestampRef.current === 0) lastTimestampRef.current = timestamp
      const delta = Math.min(timestamp - lastTimestampRef.current, 50)
      lastTimestampRef.current = timestamp

      rotationAngleRef.current = (rotationAngleRef.current + delta * 0.005) % 360
      applyPositions(rotationAngleRef.current)

      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [autoRotate, applyPositions])

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId)
    return currentItem ? currentItem.relatedIds : []
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => { if (parseInt(key) !== id) newState[parseInt(key)] = false })
      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)
        const newPulseEffect: Record<number, boolean> = {}
        getRelatedItems(id).forEach((relId) => { newPulseEffect[relId] = true })
        setPulseEffect(newPulseEffect)

        const nodeIndex = timelineData.findIndex((item) => item.id === id)
        const targetAngle = (270 - (nodeIndex / timelineData.length) * 360 + 360) % 360
        rotationAngleRef.current = targetAngle
        applyPositions(targetAngle)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }
      return newState
    })
  }

  const getInitialPos = (index: number) => {
    const angle = ((index / timelineData.length) * 360 + rotationAngleRef.current) % 360
    const radian = (angle * Math.PI) / 180
    return {
      x: 180 * Math.cos(radian),
      y: 180 * Math.sin(radian),
      zIndex: Math.round(100 + 50 * Math.cos(radian)),
      opacity: Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2))),
    }
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(itemId)
  }

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-white bg-[#5B8AF7]/80 border-[#5B8AF7]"
      case "in-progress": return "text-white bg-[#8B5CF6]/80 border-[#8B5CF6]"
      case "pending": return "text-white/60 bg-white/5 border-white/20"
      default: return "text-white/60 bg-white/5 border-white/20"
    }
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: 520 }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-3xl flex items-center justify-center" style={{ height: 520 }}>
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Center orb */}
          <div
            className="absolute w-14 h-14 rounded-full flex items-center justify-center z-10"
            style={{ background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', animation: 'opacity-glow 3s ease-in-out infinite alternate' }}
          >
            <div className="absolute rounded-full border border-white/20" style={{ width: 72, height: 72, animation: 'ring-expand 2.4s cubic-bezier(0,0,0.2,1) infinite', opacity: 0.4 }} />
            <div className="absolute rounded-full border border-white/10" style={{ width: 88, height: 88, animation: 'ring-expand 2.4s cubic-bezier(0,0,0.2,1) infinite 0.8s', opacity: 0.25 }} />
            <div className="w-7 h-7 rounded-full" style={{ background: 'rgba(255,255,255,0.9)' }} />
          </div>

          {/* Orbit ring */}
          <div className="absolute rounded-full" style={{ width: 380, height: 380, border: '1px solid rgba(91,138,247,0.15)' }} />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const pos = getInitialPos(index)
            const isExpanded = expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = pulseEffect[item.id]
            const Icon = item.icon

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el }}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                  willChange: 'transform, opacity',
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id) }}
              >
                {/* Energy aura */}
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(91,138,247,0.15) 0%, rgba(91,138,247,0) 70%)',
                    width: `${item.energy * 0.4 + 36}px`,
                    height: `${item.energy * 0.4 + 36}px`,
                    left: `-${(item.energy * 0.4) / 2}px`,
                    top: `-${(item.energy * 0.4) / 2}px`,
                    animation: isPulsing ? 'opacity-glow 1s ease-in-out infinite alternate' : 'none',
                  }}
                />

                {/* Node circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isExpanded ? 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' : isRelated ? 'rgba(91,138,247,0.4)' : 'rgba(255,255,255,0.06)',
                    border: isExpanded ? '2px solid rgba(91,138,247,0.8)' : isRelated ? '2px solid #5B8AF7' : '2px solid rgba(255,255,255,0.2)',
                    boxShadow: isExpanded ? '0 0 20px rgba(91,138,247,0.4)' : 'none',
                    transform: isExpanded ? 'scale(1.4)' : 'scale(1)',
                    color: isExpanded ? '#fff' : 'rgba(255,255,255,0.7)',
                  }}
                >
                  <Icon size={15} />
                </div>

                {/* Label */}
                <div
                  className="absolute whitespace-nowrap text-xs font-semibold tracking-wider"
                  style={{
                    top: 44,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: isExpanded ? '#fff' : 'rgba(255,255,255,0.5)',
                    fontSize: isExpanded ? 12 : 11,
                    transition: 'color 0.3s, font-size 0.3s',
                  }}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card
                    className="absolute top-16 bg-[#0A0A1A]/95 border-[rgba(91,138,247,0.3)] shadow-xl backdrop-blur-xl overflow-visible"
                    style={{ left: '50%', transform: 'translateX(-50%)', width: 240, minWidth: 240 }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3" style={{ background: 'rgba(91,138,247,0.5)' }} />
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge className={`px-2 text-[10px] ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "DONE" : item.status === "in-progress" ? "IN PROGRESS" : "UPCOMING"}
                        </Badge>
                        <span className="text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.date}</span>
                      </div>
                      <CardTitle className="text-sm text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{item.content}</p>
                      <div className="border-t mb-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                        <div className="flex justify-between items-center text-xs mt-3 mb-1.5">
                          <span className="flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            <Zap size={9} /> Momentum
                          </span>
                          <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                          <div className="h-full rounded-full" style={{ width: `${item.energy}%`, background: 'linear-gradient(90deg, #5B8AF7, #8B5CF6)' }} />
                        </div>
                      </div>
                      {item.relatedIds.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.relatedIds.map((relatedId) => {
                            const relatedItem = timelineData.find((i) => i.id === relatedId)
                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                className="h-5 px-2 text-[10px] rounded-sm"
                                style={{ borderColor: 'rgba(91,138,247,0.3)', background: 'rgba(91,138,247,0.08)', color: 'rgba(255,255,255,0.65)' }}
                                onClick={(e) => { e.stopPropagation(); toggleItem(relatedId) }}
                              >
                                {relatedItem?.title} <ArrowRight size={7} className="ml-1" />
                              </Button>
                            )
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
