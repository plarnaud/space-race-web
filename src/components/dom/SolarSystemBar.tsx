'use client'

import { useTimelineStore } from '@/stores/timeline-store'

const BODIES = [
  { name: 'Sun', id: 'sun', color: '#ffcc00', r: 8, rMobile: 6 },
  { name: 'Mercury', id: 'planet-mercury', color: '#a0a0a0', r: 4, rMobile: 3 },
  { name: 'Venus', id: 'planet-venus', color: '#e8cda0', r: 5, rMobile: 4 },
  { name: 'Earth', id: 'planet-earth', color: '#4488ff', r: 5.5, rMobile: 4.5 },
  { name: 'Mars', id: 'planet-mars', color: '#c1440e', r: 4.5, rMobile: 3.5 },
  { name: 'Jupiter', id: 'planet-jupiter', color: '#c88b3a', r: 7, rMobile: 5 },
  { name: 'Saturn', id: 'planet-saturn', color: '#e8d5a3', r: 6.5, rMobile: 5, rings: true },
  { name: 'Uranus', id: 'planet-uranus', color: '#7ec8e3', r: 5.5, rMobile: 4 },
  { name: 'Neptune', id: 'planet-neptune', color: '#4b70dd', r: 5.5, rMobile: 4 },
  { name: 'Pluto', id: 'planet-pluto', color: '#c9b8a4', r: 3.5, rMobile: 2.5 },
]

function SolarSystemSVG({ width, height, mobile }: { width: number; height: number; mobile: boolean }) {
  const selectMission = useTimelineStore((s) => s.selectMission)
  const selectedId = useTimelineStore((s) => s.selectedMissionId)

  const margin = mobile ? 20 : 30
  const centerY = mobile ? 16 : 22
  const labelY = mobile ? 36 : 46
  const spacing = (width - margin * 2) / (BODIES.length - 1)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible' }}
    >
      <line
        x1={margin} y1={centerY}
        x2={width - margin} y2={centerY}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
      />

      {BODIES.map((body, i) => {
        const x = margin + i * spacing
        const isSelected = selectedId === body.id
        const dotR = mobile ? body.rMobile : body.r

        return (
          <g
            key={body.name}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              selectMission(isSelected ? null : body.id)
              window.dispatchEvent(
                new CustomEvent('center-planet', { detail: body.name.toLowerCase() })
              )
            }}
          >
            <circle cx={x} cy={centerY} r={mobile ? 14 : 18} fill="transparent" />

            <circle
              cx={x} cy={centerY} r={dotR}
              fill={body.color}
              style={{
                filter: isSelected
                  ? `drop-shadow(0 0 6px ${body.color})`
                  : `drop-shadow(0 0 3px ${body.color}50)`,
                transition: 'filter 0.2s',
              }}
            />

            {body.rings && (
              <ellipse
                cx={x} cy={centerY}
                rx={dotR * 2.2} ry={dotR * 0.5}
                fill="none"
                stroke={body.color}
                strokeWidth={mobile ? 0.6 : 1}
                opacity={0.5}
              />
            )}

            <text
              x={x} y={labelY}
              textAnchor="middle"
              fill={isSelected ? '#e8ecf1' : 'rgba(255,255,255,0.35)'}
              fontSize={mobile ? 6 : 8}
              fontFamily="var(--font-mono)"
              letterSpacing="0.5"
              style={{ transition: 'fill 0.2s', userSelect: 'none' }}
            >
              {mobile ? body.name.slice(0, 3).toUpperCase() : body.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function SolarSystemBar() {
  return (
    <div
      className="fixed top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-auto md:top-3"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* Desktop */}
      <div className="hidden md:block">
        <SolarSystemSVG width={720} height={56} mobile={false} />
      </div>
      {/* Mobile */}
      <div className="block md:hidden">
        <SolarSystemSVG width={340} height={42} mobile={true} />
      </div>
    </div>
  )
}
