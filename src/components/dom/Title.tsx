'use client'

import { useTimelineStore, dateToLabel } from '@/stores/timeline-store'

export function Title() {
  const date = useTimelineStore((s) => s.date)

  return (
    <div className="fixed top-[74px] left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none select-none">
      <h1
        className="text-[16px] tracking-[8px] uppercase font-light"
        style={{ color: 'rgba(232, 236, 241, 0.8)', fontFamily: 'var(--font-display)' }}
      >
        The New Space Race
      </h1>
      <div
        className="text-[20px] font-medium leading-none mt-2"
        style={{
          color: 'rgba(0, 212, 255, 0.7)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '2px',
        }}
      >
        {dateToLabel(date)}
      </div>
    </div>
  )
}
