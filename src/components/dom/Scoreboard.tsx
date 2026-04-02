'use client'

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
  const scores = getCountryScores(date)

  return (
    <div
      className="fixed top-6 left-6 z-10 flex flex-col gap-2 pointer-events-auto"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <div className="flex items-center gap-3 mb-1">
        <span
          className="text-[10px] uppercase tracking-[2px]"
          style={{ color: '#3d4f65' }}
        >
          Mission Count
        </span>
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
              style={{
                color: isFiltered ? '#e8ecf1' : '#7a8ba3',
                fontWeight: 500,
              }}
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
  )
}
