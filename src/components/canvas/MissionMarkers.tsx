'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useTimelineStore } from '@/stores/timeline-store'
import { getMissionsByDate, countries, type Mission } from '@/data/missions'
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

function markerPosition(
  mission: Mission,
  index: number,
  total: number,
  date: number,
): [number, number, number] {
  const earthPos = getBodyPos('Earth', date)
  const marsPos = getBodyPos('Mars', date)

  if (mission.destination === 'lunar') {
    const moonPos = getMoonPos(date)
    if (mission.landed) {
      // On the Moon's surface — spread around it at its radius
      const angle = (index / Math.max(total, 1)) * Math.PI * 2 + index * 0.7
      const r = MOON_SCALE + 0.01
      return [
        moonPos[0] + Math.cos(angle) * r,
        moonPos[1] + Math.sin(angle) * r * 0.5,
        moonPos[2] + Math.sin(angle) * r,
      ]
    }
    // Orbiting near the Moon
    const angle = (index / Math.max(total, 1)) * Math.PI * 2
    const r = 0.3 + (index % 3) * 0.1
    return [
      moonPos[0] + Math.cos(angle) * r,
      moonPos[1] + Math.sin(angle) * r * 0.3,
      moonPos[2] + Math.sin(angle) * r,
    ]
  }

  if (mission.destination === 'mars') {
    const marsRadius = 0.11
    if (mission.landed) {
      // On Mars surface
      const angle = (index / Math.max(total, 1)) * Math.PI * 2 + index * 0.5
      const r = marsRadius + 0.015
      return [
        marsPos[0] + Math.cos(angle) * r,
        marsPos[1] + Math.sin(angle) * r * 0.5,
        marsPos[2] + Math.sin(angle) * r,
      ]
    }
    // Orbiting Mars
    const angle = (index / Math.max(total, 1)) * Math.PI * 2
    const r = 0.4
    return [
      marsPos[0] + Math.cos(angle) * r,
      marsPos[1] + Math.sin(angle) * r * 0.3,
      marsPos[2] + Math.sin(angle) * r,
    ]
  }

  if (mission.destination === 'deep-space') {
    const angle = index * 1.8 + 0.5
    const dist = 80 + index * 12
    return [Math.cos(angle) * dist, Math.sin(angle) * 3, Math.sin(angle) * dist]
  }

  // Earth orbit
  const angle = (index / Math.max(total, 1)) * Math.PI * 2
  const r = 0.5 + (index % 2) * 0.15
  return [
    earthPos[0] + Math.cos(angle) * r,
    earthPos[1] + Math.sin(angle) * r * 0.2 + 0.1,
    earthPos[2] + Math.sin(angle) * r,
  ]
}

function formatMissionDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function MissionDot({ mission, position }: { mission: Mission; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const color = COUNTRY_COLORS[mission.country] || '#ffffff'
  const tapObject = useTimelineStore((s) => s.tapObject)
  const selectedId = useTimelineStore((s) => s.selectedMissionId)
  const isSelected = selectedId === mission.id
  const isActive = mission.status === 'active'
  const [hovered, setHovered] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useFrame(() => {
    if (!meshRef.current) return
    if (isActive) {
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.3
      meshRef.current.scale.setScalar(scale)
    }
  })

  const handleClick = () => {
    tapObject(mission.id, isMobile)
    // No camera recentering for missions — only planets/moons move the camera
  }

  return (
    <group position={position}>
      {/* Visible dot + click target */}
      <mesh
        ref={meshRef}
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
        <sphereGeometry args={[0.025, 8, 8]} />
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

  const visibleMissions = useMemo(() => {
    let all = getMissionsByDate(date)
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
  }, [date, filteredCountry])

  return (
    <group>
      {visibleMissions.map(({ mission, pos }) => (
        <MissionDot key={mission.id} mission={mission} position={pos} />
      ))}
    </group>
  )
}
