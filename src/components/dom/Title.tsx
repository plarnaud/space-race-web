'use client'

import { useTimelineStore, dateToLabel } from '@/stores/timeline-store'

const ERAS = [
  { start: 1957, label: 'The Space Race' },
  { start: 1981, label: 'The Shuttle Era' },
  { start: 1998, label: 'The ISS Era' },
  { start: 2018, label: 'The New Space Race' },
]

function getEra(date: number): string {
  const year = Math.floor(date)
  for (let i = ERAS.length - 1; i >= 0; i--) {
    if (year >= ERAS[i].start) return ERAS[i].label
  }
  return 'Before the Space Age'
}

export function Title() {
  const date = useTimelineStore((s) => s.date)

  return (
    <div className="fixed top-[50px] md:top-[74px] left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none select-none">
      <h1
        className="text-[11px] md:text-[16px] tracking-[4px] md:tracking-[8px] uppercase font-light"
        style={{ color: 'rgba(232, 236, 241, 0.8)', fontFamily: 'var(--font-display)' }}
      >
        {getEra(date)}
      </h1>
      <div
        className="text-[15px] md:text-[20px] font-medium leading-none mt-1 md:mt-2"
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
