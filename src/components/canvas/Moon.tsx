'use client'

import { useMemo, useState } from 'react'
import { useTexture, Html } from '@react-three/drei'
import { useTimelineStore } from '@/stores/timeline-store'
import { planets, getPlanetPosition } from '@/data/planets'

const MOON_VISUAL_DISTANCE = 0.8
const MOON_SCALE = 0.05
const LUNAR_PERIOD_YEARS = 27.322 / 365.25

export function Moon() {
  const date = useTimelineStore((s) => s.date)
  const tapObject = useTimelineStore((s) => s.tapObject)
  const focusedId = useTimelineStore((s) => s.focusedId)
  const selectedId = useTimelineStore((s) => s.selectedMissionId)
  const isSelected = selectedId === 'moon-luna'
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const [hovered, setHovered] = useState(false)

  const [colorMap, bumpMap] = useTexture([
    '/textures/moon_color.jpg',
    '/textures/moon_bump.jpg',
  ])

  const position = useMemo((): [number, number, number] => {
    const earth = planets.find((p) => p.name === 'Earth')!
    const [ex, ey, ez] = getPlanetPosition(earth, date)
    const orbits = (date - 2000.0) / LUNAR_PERIOD_YEARS
    const angle = orbits * Math.PI * 2
    return [
      ex + Math.cos(angle) * MOON_VISUAL_DISTANCE,
      ey + 0.05,
      ez + Math.sin(angle) * MOON_VISUAL_DISTANCE,
    ]
  }, [date])

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          tapObject('moon-luna', isMobile)
          if (focusedId !== 'moon-luna') {
            window.dispatchEvent(new CustomEvent('center-mission', {
              detail: { x: position[0], y: position[1], z: position[2] },
            }))
          }
        }}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default' }}
      >
        <sphereGeometry args={[MOON_SCALE, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.02}
          metalness={0}
          roughness={0.9}
        />
      </mesh>

      <Html
        position={[0, MOON_SCALE + 0.08, 0]}
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
          Moon
        </div>
      </Html>
    </group>
  )
}

export { MOON_VISUAL_DISTANCE, MOON_SCALE }
