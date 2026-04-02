'use client'

import { useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { moons, type MoonData } from '@/data/moons'
import { planets, getPlanetPosition } from '@/data/planets'
import { useTimelineStore } from '@/stores/timeline-store'

function MoonMesh({ moon, position }: { moon: MoonData; position: [number, number, number] }) {
  const tapObject = useTimelineStore((s) => s.tapObject)
  const focusedId = useTimelineStore((s) => s.focusedId)
  const selectedId = useTimelineStore((s) => s.selectedMissionId)
  const moonId = `moon-${moon.id}`
  const isSelected = selectedId === moonId
  const [hovered, setHovered] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <group position={position}>
      <group
        onClick={(e) => {
          e.stopPropagation()
          tapObject(moonId, isMobile)
          if (focusedId !== moonId) {
            window.dispatchEvent(new CustomEvent('center-mission', {
              detail: { x: position[0], y: position[1], z: position[2] },
            }))
          }
        }}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        <mesh>
          <sphereGeometry args={[moon.radius, 16, 16]} />
          <meshStandardMaterial
            color={moon.color}
            emissive={moon.color}
            emissiveIntensity={isSelected ? 0.3 : 0.1}
          />
        </mesh>
      </group>

      {/* Label */}
      <Html
        position={[0, moon.radius + 0.12, 0]}
        center
        style={{ pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}
      >
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '7px',
          letterSpacing: '1px',
          color: (isSelected || hovered) ? '#e8ecf1' : 'rgba(232, 236, 241, 0.3)',
          textTransform: 'uppercase',
          textShadow: '0 0 6px rgba(0,0,0,0.9)',
        }}>
          {moon.name}
        </div>
      </Html>
    </group>
  )
}

export function PlanetaryMoons() {
  const date = useTimelineStore((s) => s.date)

  const moonPositions = useMemo(() => {
    return moons.map((moon) => {
      const parentPlanet = planets.find((p) => p.name === moon.parent)
      if (!parentPlanet) return null

      const [px, py, pz] = getPlanetPosition(parentPlanet, date)
      const orbits = (date - 2000.0) / (moon.orbitalPeriodDays / 365.25)
      const angle = orbits * Math.PI * 2

      const pos: [number, number, number] = [
        px + Math.cos(angle) * moon.orbitRadius,
        py + Math.sin(angle) * 0.1,
        pz + Math.sin(angle) * moon.orbitRadius,
      ]

      return { moon, pos }
    }).filter(Boolean) as { moon: MoonData; pos: [number, number, number] }[]
  }, [date])

  return (
    <group>
      {moonPositions.map(({ moon, pos }) => (
        <MoonMesh key={moon.id} moon={moon} position={pos} />
      ))}
    </group>
  )
}
