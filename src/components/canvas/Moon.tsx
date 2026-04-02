'use client'

import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { useTimelineStore } from '@/stores/timeline-store'
import { planets, getPlanetPosition } from '@/data/planets'

const MOON_VISUAL_DISTANCE = 0.8 // Visual distance from Earth (not to scale)
const MOON_SCALE = 0.05
const LUNAR_PERIOD_YEARS = 27.322 / 365.25

export function Moon() {
  const date = useTimelineStore((s) => s.date)

  const [colorMap, bumpMap] = useTexture([
    '/textures/moon_color.jpg',
    '/textures/moon_bump.jpg',
  ])

  const position = useMemo((): [number, number, number] => {
    // Get Earth's position first
    const earth = planets.find((p) => p.name === 'Earth')!
    const [ex, ey, ez] = getPlanetPosition(earth, date)

    // Moon orbits Earth
    const orbits = (date - 2000.0) / LUNAR_PERIOD_YEARS
    const angle = orbits * Math.PI * 2
    return [
      ex + Math.cos(angle) * MOON_VISUAL_DISTANCE,
      ey + 0.05,
      ez + Math.sin(angle) * MOON_VISUAL_DISTANCE,
    ]
  }, [date])

  return (
    <mesh position={position}>
      <sphereGeometry args={[MOON_SCALE, 32, 32]} />
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.02}
        metalness={0}
        roughness={0.9}
      />
    </mesh>
  )
}

export { MOON_VISUAL_DISTANCE, MOON_SCALE }
