'use client'

import { useTimelineStore } from '@/stores/timeline-store'

// Correct order: Sun, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
const BODIES = [
  { name: 'Sun', id: 'sun', color: '#ffcc00', r: 8 },
  { name: 'Mercury', id: 'planet-mercury', color: '#a0a0a0', r: 4 },
  { name: 'Venus', id: 'planet-venus', color: '#e8cda0', r: 5 },
  { name: 'Earth', id: 'planet-earth', color: '#4488ff', r: 5.5 },
  { name: 'Mars', id: 'planet-mars', color: '#c1440e', r: 4.5 },
  { name: 'Jupiter', id: 'planet-jupiter', color: '#c88b3a', r: 7 },
  { name: 'Saturn', id: 'planet-saturn', color: '#e8d5a3', r: 6.5, rings: true },
  { name: 'Uranus', id: 'planet-uranus', color: '#7ec8e3', r: 5.5 },
  { name: 'Neptune', id: 'planet-neptune', color: '#4b70dd', r: 5.5 },
]

const BAR_WIDTH = 720
const BAR_HEIGHT = 56
const CENTER_Y = 22
const LABEL_Y = 46
const MARGIN = 30

export function SolarSystemBar() {
  const selectMission = useTimelineStore((s) => s.selectMission)
  const selectedId = useTimelineStore((s) => s.selectedMissionId)

  const spacing = (BAR_WIDTH - MARGIN * 2) / (BODIES.length - 1)

  return (
    <div
      className="fixed top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <svg
        width={BAR_WIDTH}
        height={BAR_HEIGHT}
        viewBox={`0 0 ${BAR_WIDTH} ${BAR_HEIGHT}`}
        style={{ overflow: 'visible' }}
      >
        {/* Background track */}
        <line
          x1={MARGIN} y1={CENTER_Y}
          x2={BAR_WIDTH - MARGIN} y2={CENTER_Y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />

        {BODIES.map((body, i) => {
          const x = MARGIN + i * spacing
          const isSelected = body.id !== null && selectedId === body.id
          const isClickable = body.id !== null

          return (
            <g
              key={body.name}
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
              onClick={() => {
                if (!isClickable) return
                selectMission(isSelected ? null : body.id)
                window.dispatchEvent(
                  new CustomEvent('center-planet', {
                    detail: body.name.toLowerCase(),
                  })
                )
              }}
            >
              {/* Hit area */}
              <circle cx={x} cy={CENTER_Y} r={18} fill="transparent" />

              {/* Dot */}
              <circle
                cx={x} cy={CENTER_Y} r={body.r}
                fill={body.color}
                style={{
                  filter: isSelected
                    ? `drop-shadow(0 0 6px ${body.color})`
                    : `drop-shadow(0 0 3px ${body.color}50)`,
                  transition: 'filter 0.2s',
                }}
              />

              {/* Saturn rings */}
              {body.rings && (
                <ellipse
                  cx={x} cy={CENTER_Y}
                  rx={body.r * 2.2} ry={body.r * 0.5}
                  fill="none"
                  stroke={body.color}
                  strokeWidth={1}
                  opacity={0.5}
                />
              )}

              {/* Full name label */}
              <text
                x={x} y={LABEL_Y}
                textAnchor="middle"
                fill={isSelected ? '#e8ecf1' : 'rgba(255,255,255,0.35)'}
                fontSize={8}
                fontFamily="var(--font-mono)"
                letterSpacing="0.5"
                style={{ transition: 'fill 0.2s', userSelect: 'none' }}
              >
                {body.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
