'use client'

import { useState, useEffect } from 'react'

const BOOT_LINES = [
  { text: 'SPACE RACE 101 - MISSION CONTROL', delay: 0 },
  { text: '════════════════════════════════════', delay: 100 },
  { text: '', delay: 200 },
  { text: 'INITIALIZING SYSTEMS...', delay: 300 },
  { text: '> Loading solar system ephemeris data', delay: 500 },
  { text: '> Calculating orbital positions (1957–2030)', delay: 900 },
  { text: '> Loading planet textures [Mercury, Venus, Earth, Mars]', delay: 1400 },
  { text: '> Loading planet textures [Jupiter, Saturn, Uranus, Neptune, Pluto]', delay: 1900 },
  { text: '> Loading Moon surface map', delay: 2300 },
  { text: '> Loading Sun SDO imagery', delay: 2600 },
  { text: '> Initializing WebGL renderer', delay: 2900 },
  { text: '> Compiling atmosphere shaders', delay: 3200 },
  { text: '> Loading mission database [52 missions, 6 agencies]', delay: 3500 },
  { text: '> Mapping planetary moons [11 bodies]', delay: 3800 },
  { text: '> Synchronizing timeline to current date', delay: 4100 },
  { text: '', delay: 4400 },
  { text: 'ALL SYSTEMS NOMINAL', delay: 4500 },
  { text: 'LAUNCHING...', delay: 4800 },
]

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay))
    })

    // Start fade out
    timers.push(setTimeout(() => setFading(true), 5200))
    // Complete
    timers.push(setTimeout(() => onComplete(), 5800))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: '#06080d',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div
        className="w-full max-w-lg px-6"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.015) 2px, rgba(0,212,255,0.015) 4px)',
          }}
        />

        {/* Boot log */}
        <div className="space-y-1">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className="text-[12px] md:text-[13px]"
              style={{
                color: line.text === 'ALL SYSTEMS NOMINAL'
                  ? '#4ade80'
                  : line.text === 'LAUNCHING...'
                    ? '#00d4ff'
                    : line.text.startsWith('>')
                      ? '#7a8ba3'
                      : line.text.startsWith('═')
                        ? 'rgba(0, 212, 255, 0.3)'
                        : '#e8ecf1',
                letterSpacing: line.text.startsWith('SPACE RACE') ? '3px' : '0.5px',
                fontWeight: line.text.startsWith('SPACE RACE') ? 500 : 400,
              }}
            >
              {line.text}
              {i === visibleLines - 1 && !fading && (
                <span className="animate-pulse" style={{ color: '#00d4ff' }}>█</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="mt-6 h-[2px] rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(100, (visibleLines / BOOT_LINES.length) * 100)}%`,
              background: 'linear-gradient(to right, rgba(0, 212, 255, 0.3), #00d4ff)',
              transition: 'width 0.3s ease-out',
            }}
          />
        </div>
      </div>
    </div>
  )
}
