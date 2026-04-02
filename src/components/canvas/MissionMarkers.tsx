'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useTimelineStore } from '@/stores/timeline-store'
import { getActiveMissions, countries, type Mission } from '@/data/missions'
import { planets, getPlanetPosition } from '@/data/planets'

const COUNTRY_COLORS: Record<string, string> = Object.fromEntries(
  countries.map((c) => [c.code, c.color])
)

function getEarthPos(date: number): [number, number, number] {
  const earth = planets.find((p) => p.name === 'Earth')!
  return getPlanetPosition(earth, date)
}

function getMarsPos(date: number): [number, number, number] {
  const mars = planets.find((p) => p.name === 'Mars')!
  return getPlanetPosition(mars, date)
}

function markerPosition(
  mission: Mission,
  index: number,
  total: number,
  earthPos: [number, number, number],
  marsPos: [number, number, number],
): [number, number, number] {
  if (mission.destination === 'lunar') {
    const angle = (index / Math.max(total, 1)) * Math.PI * 2
    const r = 0.4 + (index % 3) * 0.15
    return [
      earthPos[0] + Math.cos(angle) * r * 1.5,
      earthPos[1] + Math.sin(angle) * r * 0.3,
      earthPos[2] + Math.sin(angle) * r,
    ]
  }
  if (mission.destination === 'mars') {
    const angle = (index / Math.max(total, 1)) * Math.PI * 2
    const r = 0.5
    return [
      marsPos[0] + Math.cos(angle) * r,
      marsPos[1] + Math.sin(angle) * r * 0.3,
      marsPos[2] + Math.sin(angle) * r,
    ]
  }
  if (mission.destination === 'deep-space') {
    // Far outside the solar system (Neptune is at visualDistance 65)
    // Spread them out beyond Neptune, each at a different angle
    const angle = index * 1.8 + 0.5
    const dist = 80 + index * 12
    return [Math.cos(angle) * dist, Math.sin(angle) * 3, Math.sin(angle) * dist]
  }
  // Earth orbit — near Earth
  const angle = (index / Math.max(total, 1)) * Math.PI * 2
  const r = 0.5 + (index % 2) * 0.2
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
  const selectMission = useTimelineStore((s) => s.selectMission)
  const selectedId = useTimelineStore((s) => s.selectedMissionId)
  const isSelected = selectedId === mission.id
  const isActive = mission.status === 'active'
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (!meshRef.current) return
    if (isActive) {
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.3
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={position}>
      {/* Visible dot + click target */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          selectMission(isSelected ? null : mission.id)
          if (!isSelected) {
            window.dispatchEvent(new CustomEvent('center-mission', {
              detail: { x: position[0], y: position[1], z: position[2] },
            }))
          }
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

      {/* Label — clickable via HTML, not 3D mesh */}
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
            selectMission(isSelected ? null : mission.id)
            if (!isSelected) {
              window.dispatchEvent(new CustomEvent('center-mission', {
                detail: { x: position[0], y: position[1], z: position[2] },
              }))
            }
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div>{mission.name}</div>
          {(hovered || isSelected) && (
            <div style={{ fontSize: '8px', color: '#7a8ba3', marginTop: '2px', letterSpacing: '0.5px' }}>
              {formatMissionDate(mission.launchDate)}
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
    let all = getActiveMissions(date)
    if (filteredCountry) {
      all = all.filter((m) => m.country === filteredCountry)
    }

    const earthPos = getEarthPos(date)
    const marsPos = getMarsPos(date)

    const lunar = all.filter((m) => m.destination === 'lunar')
    const orbit = all.filter((m) => m.destination === 'earth-orbit')
    const deep = all.filter((m) => m.destination === 'deep-space')
    const mars = all.filter((m) => m.destination === 'mars')

    return [
      ...lunar.map((m, i) => ({ mission: m, pos: markerPosition(m, i, lunar.length, earthPos, marsPos) })),
      ...orbit.map((m, i) => ({ mission: m, pos: markerPosition(m, i, orbit.length, earthPos, marsPos) })),
      ...deep.map((m, i) => ({ mission: m, pos: markerPosition(m, i, deep.length, earthPos, marsPos) })),
      ...mars.map((m, i) => ({ mission: m, pos: markerPosition(m, i, mars.length, earthPos, marsPos) })),
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
