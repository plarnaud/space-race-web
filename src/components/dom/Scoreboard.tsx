'use client'

import { useState } from 'react'
import { useTimelineStore } from '@/stores/timeline-store'
import { getCountryScores } from '@/data/missions'

const FLAG_MAP: Record<string, string> = {
  US: '🇺🇸',
  CN: '🇨🇳',
  IN: '🇮🇳',
  JP: '🇯🇵',
  EU: '🇪🇺',
  RU: '🇷🇺',
}

export function Scoreboard() {
  const date = useTimelineStore((s) => s.date)
  const filteredCountry = useTimelineStore((s) => s.filteredCountry)
  const setFilteredCountry = useTimelineStore((s) => s.setFilteredCountry)
  const onlyActive = useTimelineStore((s) => s.onlyActive)
  const toggleOnlyActive = useTimelineStore((s) => s.toggleOnlyActive)
  const scores = getCountryScores(date)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className="fixed top-6 left-6 z-10 pointer-events-auto md:top-6 md:left-6 max-md:top-auto max-md:bottom-[110px] max-md:left-3 max-md:right-3"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* Header with collapse toggle */}
      <div className="flex items-center gap-3 mb-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[10px] uppercase tracking-[2px] bg-transparent border-none cursor-pointer flex items-center gap-1.5"
          style={{ color: '#3d4f65', fontFamily: 'var(--font-mono)' }}
        >
          <span style={{ fontSize: '8px' }}>{collapsed ? '▶' : '▼'}</span>
          Mission Count
        </button>
        {filteredCountry && (
          <button
            onClick={() => setFilteredCountry(null)}
            className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
            style={{
              color: '#00d4ff',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              background: 'rgba(0, 212, 255, 0.1)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Active-only toggle */}
      {!collapsed && (
        <button
          onClick={toggleOnlyActive}
          className="flex items-center gap-1.5 mb-2 text-[9px] uppercase tracking-wider bg-transparent border-none cursor-pointer"
          style={{ color: onlyActive ? '#00d4ff' : '#3d4f65', fontFamily: 'var(--font-mono)' }}
        >
          <span
            className="inline-block w-3 h-3 rounded-sm border"
            style={{
              borderColor: onlyActive ? '#00d4ff' : '#3d4f65',
              background: onlyActive ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
            }}
          >
            {onlyActive && <span style={{ display: 'block', textAlign: 'center', lineHeight: '12px', fontSize: '9px' }}>✓</span>}
          </span>
          Only active missions
        </button>
      )}

      {!collapsed && (
        <>
          {/* Desktop: vertical list */}
          <div className="hidden md:flex flex-col gap-2">
            {scores.map((country) => {
              const isActive = filteredCountry === null || filteredCountry === country.code
              const isFiltered = filteredCountry === country.code
              return (
                <div
                  key={country.code}
                  className="flex items-center gap-2.5"
                  style={{
                    opacity: isActive ? 1 : 0.3,
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                  onClick={() => setFilteredCountry(country.code)}
                >
                  <span className="text-base w-6 text-center">{FLAG_MAP[country.code] ?? '🏳️'}</span>
                  <span
                    className="text-[11px] uppercase tracking-wider w-10"
                    style={{ color: isFiltered ? '#e8ecf1' : '#7a8ba3', fontWeight: 500 }}
                  >
                    {country.name}
                  </span>
                  <div className="h-[3px] rounded-sm" style={{
                    width: `${Math.max(4, country.count * 8)}px`,
                    backgroundColor: country.color,
                    transition: 'width 0.3s ease-out',
                  }} />
                  <span
                    className="text-sm w-6 text-right"
                    style={{ color: isFiltered ? '#e8ecf1' : '#00d4ff', fontWeight: 400 }}
                  >
                    {country.count}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Mobile: horizontal compact strip */}
          <div className="flex md:hidden gap-2 flex-wrap">
            {scores.map((country) => {
              const isActive = filteredCountry === null || filteredCountry === country.code
              const isFiltered = filteredCountry === country.code
              return (
                <button
                  key={country.code}
                  className="flex items-center gap-1 px-2 py-1 rounded-sm border-none"
                  style={{
                    opacity: isActive ? 1 : 0.3,
                    cursor: 'pointer',
                    background: isFiltered ? 'rgba(0, 212, 255, 0.1)' : 'rgba(10, 18, 32, 0.7)',
                    border: isFiltered ? '1px solid rgba(0, 212, 255, 0.3)' : '1px solid rgba(255,255,255,0.06)',
                    fontFamily: 'var(--font-mono)',
                    transition: 'opacity 0.2s',
                  }}
                  onClick={() => setFilteredCountry(country.code)}
                >
                  <span className="text-sm">{FLAG_MAP[country.code] ?? '🏳️'}</span>
                  <span className="text-[11px]" style={{ color: '#00d4ff' }}>{country.count}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
