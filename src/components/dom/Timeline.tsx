'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import { useTimelineStore, MIN_DATE, MAX_DATE } from '@/stores/timeline-store'
import { getContextualFact } from '@/data/missions'

const ERAS = [
  { label: 'Space Race', date: 1957 },
  { label: 'Shuttle Era', date: 1981 },
  { label: 'ISS Era', date: 1998 },
  { label: 'New Space Race', date: 2018 },
]

const YEAR_MARKS = [1957, 1965, 1975, 1985, 1995, 2005, 2015, 2025, 2030]

export function Timeline() {
  const date = useTimelineStore((s) => s.date)
  const setDate = useTimelineStore((s) => s.setDate)
  const selectMission = useTimelineStore((s) => s.selectMission)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const fact = getContextualFact(date)

  const dateToPercent = (d: number) => ((d - MIN_DATE) / (MAX_DATE - MIN_DATE)) * 100

  const percentToDate = useCallback((pct: number) => {
    return MIN_DATE + (pct / 100) * (MAX_DATE - MIN_DATE)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    setShowHint(false)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
      setDate(percentToDate(pct))
    },
    [isDragging, setDate, percentToDate],
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
      setDate(percentToDate(pct))
      setShowHint(false)
    },
    [setDate, percentToDate],
  )

  // Keyboard: arrow keys move by 1 month
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setDate(date + 7 / 365.25) // ~1 week
      if (e.key === 'ArrowLeft') setDate(date - 7 / 365.25)
      if (e.key === 'Escape') selectMission(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [date, setDate, selectMission])

  const currentYear = Math.floor(date)

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-10 px-12 pb-5 pt-8 pointer-events-auto"
      style={{
        background: 'linear-gradient(to top, rgba(6, 8, 13, 0.95), transparent)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Contextual fact */}
      {fact && (
        <div
          className="text-center text-xs mb-3 transition-opacity duration-500"
          style={{ color: 'rgba(0, 212, 255, 0.7)', letterSpacing: '1px' }}
        >
          {fact.fact}
        </div>
      )}

      {/* Era labels */}
      <div className="flex justify-between mb-2 relative">
        {ERAS.map((era, i) => (
          <button
            key={era.date}
            onClick={() => { setDate(era.date); setShowHint(false) }}
            className="text-[10px] uppercase tracking-[1.5px] hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            style={{
              color: currentYear >= era.date && (ERAS[i + 1]?.date ?? MAX_DATE + 1) > currentYear
                ? '#00d4ff'
                : 'rgba(232, 236, 241, 0.15)',
              fontFamily: 'var(--font-mono)',
              fontWeight: currentYear >= era.date && (ERAS[i + 1]?.date ?? MAX_DATE + 1) > currentYear ? 500 : 400,
            }}
          >
            {era.label}
          </button>
        ))}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-1 rounded-sm cursor-pointer mb-2"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}
        onClick={handleTrackClick}
        role="slider"
        aria-valuemin={MIN_DATE}
        aria-valuemax={MAX_DATE}
        aria-valuenow={date}
        aria-label="Timeline date"
        tabIndex={0}
      >
        {/* Progress fill */}
        <div
          className="absolute h-full rounded-sm"
          style={{
            width: `${dateToPercent(date)}%`,
            background: 'linear-gradient(to right, rgba(0, 212, 255, 0.2), #00d4ff)',
          }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full cursor-grab active:cursor-grabbing"
          style={{
            left: `${dateToPercent(date)}%`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#00d4ff',
            boxShadow: '0 0 16px rgba(0, 212, 255, 0.5)',
            animation: showHint ? 'pulse-hint 2s ease-in-out infinite' : 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />

        {/* Hint label */}
        {showHint && (
          <div
            className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider animate-pulse"
            style={{ color: 'rgba(0, 212, 255, 0.5)' }}
          >
            Drag to explore
          </div>
        )}
      </div>

      {/* Year marks */}
      <div className="flex justify-between">
        {YEAR_MARKS.map((y) => (
          <span
            key={y}
            className="text-[10px]"
            style={{
              color: Math.abs(y - currentYear) < 3 ? '#00d4ff' : 'rgba(232, 236, 241, 0.2)',
              fontWeight: Math.abs(y - currentYear) < 3 ? 500 : 300,
            }}
          >
            {y}
          </span>
        ))}
      </div>
    </div>
  )
}
