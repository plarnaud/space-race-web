'use client'

import { useMemo, Suspense } from 'react'
import { Html, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { planets, getPlanetPosition, type Planet } from '@/data/planets'
import { useTimelineStore } from '@/stores/timeline-store'

function TexturedPlanet({ planet, isPlanetSelected }: { planet: Planet; isPlanetSelected: boolean }) {
  const texture = useTexture(planet.textureFile!)
  return (
    <mesh>
      <sphereGeometry args={[planet.radius, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        emissive={planet.color}
        emissiveIntensity={isPlanetSelected ? 0.2 : 0.05}
      />
    </mesh>
  )
}

function ColorPlanet({ planet, isPlanetSelected }: { planet: Planet; isPlanetSelected: boolean }) {
  return (
    <mesh>
      <sphereGeometry args={[planet.radius, 32, 32]} />
      <meshStandardMaterial
        color={planet.color}
        emissive={planet.color}
        emissiveIntensity={isPlanetSelected ? 0.3 : 0.1}
      />
    </mesh>
  )
}

function PlanetMesh({ planet, position }: { planet: Planet; position: [number, number, number] }) {
  const selectMission = useTimelineStore((s) => s.selectMission)
  const selectedId = useTimelineStore((s) => s.selectedMissionId)
  const isPlanetSelected = selectedId === `planet-${planet.name.toLowerCase()}`

  return (
    <group>
      {/* Orbit ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.visualDistance - 0.02, planet.visualDistance + 0.02, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>

      <group position={position}>
        {/* Textured planet — IS the click target */}
        <group
          onClick={(e) => {
            e.stopPropagation()
            selectMission(isPlanetSelected ? null : `planet-${planet.name.toLowerCase()}`)
            window.dispatchEvent(new CustomEvent('center-planet', { detail: planet.name.toLowerCase() }))
          }}
          onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
          onPointerLeave={() => { document.body.style.cursor = 'default' }}
        >
          <Suspense fallback={<ColorPlanet planet={planet} isPlanetSelected={isPlanetSelected} />}>
            {planet.textureFile
              ? <TexturedPlanet planet={planet} isPlanetSelected={isPlanetSelected} />
              : <ColorPlanet planet={planet} isPlanetSelected={isPlanetSelected} />
            }
          </Suspense>
        </group>

        {/* Saturn rings */}
        {planet.hasRings && (
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[planet.radius * 1.4, planet.radius * 2.2, 64]} />
            <meshBasicMaterial color="#d4c49a" transparent opacity={0.5} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Label */}
        <Html
          position={[0, planet.radius + 0.4, 0]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '1.5px',
            color: isPlanetSelected ? '#e8ecf1' : 'rgba(232, 236, 241, 0.4)',
            textTransform: 'uppercase',
            textShadow: '0 0 8px rgba(0,0,0,0.9)',
          }}>
            {planet.name}
          </div>
        </Html>
      </group>
    </group>
  )
}

export function Planets() {
  const date = useTimelineStore((s) => s.date)

  const positions = useMemo(() => {
    return planets.map((planet) => ({
      planet,
      position: getPlanetPosition(planet, date),
    }))
  }, [date])

  return (
    <group>
      {positions.map(({ planet, position }) => (
        <PlanetMesh key={planet.name} planet={planet} position={position} />
      ))}
    </group>
  )
}
