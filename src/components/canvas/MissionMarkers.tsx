'use client'

import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { useTimelineStore } from '@/stores/timeline-store'
import { getMissionsByDate, getActiveMissions, countries, type Mission } from '@/data/missions'
import { planets, getPlanetPosition } from '@/data/planets'
import { MOON_SCALE } from './Moon'

const COUNTRY_COLORS: Record<string, string> = Object.fromEntries(
  countries.map((c) => [c.code, c.color])
)

const LUNAR_PERIOD_YEARS = 27.322 / 365.25

function getBodyPos(name: string, date: number): [number, number, number] {
  const p = planets.find((pl) => pl.name === name)!
  return getPlanetPosition(p, date)
}

function getMoonPos(date: number): [number, number, number] {
  const [ex, ey, ez] = getBodyPos('Earth', date)
  const orbits = (date - 2000.0) / LUNAR_PERIOD_YEARS
  const angle = orbits * Math.PI * 2
  return [ex + Math.cos(angle) * 0.8, ey + 0.05, ez + Math.sin(angle) * 0.8]
}

// Simple hash to get a stable unique angle per mission
function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) - h + id.charCodeAt(i)) | 0
  }
  return (Math.abs(h) % 1000) / 1000 // 0..1
}

function markerPosition(
  mission: Mission,
  index: number,
  total: number,
  date: number,
): [number, number, number] {
  const earthPos = getBodyPos('Earth', date)
  const marsPos = getBodyPos('Mars', date)
  const seed = hashId(mission.id)

  if (mission.destination === 'lunar') {
    const moonPos = getMoonPos(date)
    if (mission.landed) {
      const angle = seed * Math.PI * 2
      const tilt = (seed * 0.6 - 0.3)
      const r = MOON_SCALE + 0.01 + seed * 0.005
      return [
        moonPos[0] + Math.cos(angle) * r,
        moonPos[1] + tilt * r,
        moonPos[2] + Math.sin(angle) * r,
      ]
    }
    const angle = seed * Math.PI * 2
    const r = 0.25 + seed * 0.2
    return [
      moonPos[0] + Math.cos(angle) * r,
      moonPos[1] + (seed - 0.5) * 0.2,
      moonPos[2] + Math.sin(angle) * r,
    ]
  }

  if (mission.destination === 'mars') {
    const marsRadius = 0.11
    if (mission.landed) {
      const angle = seed * Math.PI * 2
      const tilt = (seed * 0.6 - 0.3)
      const r = marsRadius + 0.01 + seed * 0.005
      return [
        marsPos[0] + Math.cos(angle) * r,
        marsPos[1] + tilt * r,
        marsPos[2] + Math.sin(angle) * r,
      ]
    }
    const angle = seed * Math.PI * 2
    const r = 0.3 + seed * 0.2
    return [
      marsPos[0] + Math.cos(angle) * r,
      marsPos[1] + (seed - 0.5) * 0.15,
      marsPos[2] + Math.sin(angle) * r,
    ]
  }

  if (mission.destination === 'deep-space') {
    const angle = seed * Math.PI * 2
    const dist = 80 + seed * 30
    return [Math.cos(angle) * dist, (seed - 0.5) * 4, Math.sin(angle) * dist]
  }

  // Earth orbit
  const angle = seed * Math.PI * 2
  const r = 0.4 + seed * 0.3
  return [
    earthPos[0] + Math.cos(angle) * r,
    earthPos[1] + (seed - 0.5) * 0.2,
    earthPos[2] + Math.sin(angle) * r,
  ]
}

function formatMissionDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function MissionDot({ mission, position }: { mission: Mission; position: [number, number, number] }) {
  const color = COUNTRY_COLORS[mission.country] || '#ffffff'
  const tapObject = useTimelineStore((s) => s.tapObject)
  const selectedId = useTimelineStore((s) => s.selectedMissionId)
  const isSelected = selectedId === mission.id
  const [hovered, setHovered] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleClick = () => {
    tapObject(mission.id, isMobile)
    // Center camera if the mission is far from current camera position
    window.dispatchEvent(new CustomEvent('center-if-far', {
      detail: { x: position[0], y: position[1], z: position[2] },
    }))
  }

  return (
    <group position={position}>
      {/* Visible dot + click target */}
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          handleClick()
        }}
        onPointerEnter={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Label */}
      <Html
        position={[0, 0.15, 0]}
        center
        style={{ whiteSpace: 'nowrap' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '1px',
            color: (isSelected || hovered) ? '#ffffff' : 'rgba(232, 236, 241, 0.45)',
            textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(0,0,0,0.9)',
            textAlign: 'center',
            transition: 'color 0.2s',
            cursor: 'pointer',
            padding: '4px 6px',
            pointerEvents: 'auto',
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleClick()
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div>{mission.name}</div>
          {(hovered || isSelected) && (
            <div style={{ fontSize: '8px', color: '#7a8ba3', marginTop: '2px', letterSpacing: '0.5px' }}>
              {formatMissionDate(mission.launchDate)}
              {mission.landed && ' · LANDED'}
              {mission.status === 'failed' && ' · FAILED'}
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}

export function MissionMarkers() {
  const date = useTimelineStore((s) => s.date)
  const filteredCountry = useTimelineStore((s) => s.filteredCountry)
  const onlyActive = useTimelineStore((s) => s.onlyActive)

  const visibleMissions = useMemo(() => {
    let all = onlyActive ? getActiveMissions(date) : getMissionsByDate(date)
    if (filteredCountry) {
      all = all.filter((m) => m.country === filteredCountry)
    }

    // Group by destination, with landed missions separate for positioning
    const lunarLanded = all.filter((m) => m.destination === 'lunar' && m.landed)
    const lunarOrbit = all.filter((m) => m.destination === 'lunar' && !m.landed)
    const marsLanded = all.filter((m) => m.destination === 'mars' && m.landed)
    const marsOrbit = all.filter((m) => m.destination === 'mars' && !m.landed)
    const orbit = all.filter((m) => m.destination === 'earth-orbit')
    const deep = all.filter((m) => m.destination === 'deep-space')

    return [
      ...lunarLanded.map((m, i) => ({ mission: m, pos: markerPosition(m, i, lunarLanded.length, date) })),
      ...lunarOrbit.map((m, i) => ({ mission: m, pos: markerPosition(m, i, lunarOrbit.length, date) })),
      ...marsLanded.map((m, i) => ({ mission: m, pos: markerPosition(m, i, marsLanded.length, date) })),
      ...marsOrbit.map((m, i) => ({ mission: m, pos: markerPosition(m, i, marsOrbit.length, date) })),
      ...orbit.map((m, i) => ({ mission: m, pos: markerPosition(m, i, orbit.length, date) })),
      ...deep.map((m, i) => ({ mission: m, pos: markerPosition(m, i, deep.length, date) })),
    ]
  }, [date, filteredCountry, onlyActive])

  return (
    <group>
      {visibleMissions.map(({ mission, pos }) => (
        <MissionDot key={mission.id} mission={mission} position={pos} />
      ))}
    </group>
  )
}
