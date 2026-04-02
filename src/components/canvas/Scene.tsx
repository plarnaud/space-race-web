'use client'

import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Moon } from './Moon'
import { Stars } from './Stars'
import { Sun } from './Sun'
import { MissionMarkers } from './MissionMarkers'
import { PlanetaryMoons } from './Moons'
import { Planets } from './Planets'
import { planets, getPlanetPosition } from '@/data/planets'
import { useTimelineStore } from '@/stores/timeline-store'

function CameraController({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree()
  const targetPos = useRef<THREE.Vector3 | null>(null)
  const targetLookAt = useRef<THREE.Vector3 | null>(null)
  const date = useTimelineStore((s) => s.date)

  // Center on planet/sun/mission
  useEffect(() => {
    function handleCenter(e: Event) {
      const name = (e as CustomEvent).detail as string

      if (name === 'sun') {
        targetLookAt.current = new THREE.Vector3(0, 0, 0)
        targetPos.current = new THREE.Vector3(0, 5, 10)
        return
      }

      const planet = planets.find((p) => p.name.toLowerCase() === name)
      if (planet) {
        const [px, py, pz] = getPlanetPosition(planet, date)
        targetLookAt.current = new THREE.Vector3(px, py, pz)
        const dist = Math.max(planet.radius * 15, 2)
        targetPos.current = new THREE.Vector3(px, py + dist * 0.4, pz + dist)
      }
    }

    function handleCenterMission(e: Event) {
      const pos = (e as CustomEvent).detail as { x: number; y: number; z: number }
      targetLookAt.current = new THREE.Vector3(pos.x, pos.y, pos.z)
      targetPos.current = new THREE.Vector3(pos.x, pos.y + 1, pos.z + 2)
    }

    window.addEventListener('center-planet', handleCenter)
    window.addEventListener('center-mission', handleCenterMission)
    return () => {
      window.removeEventListener('center-planet', handleCenter)
      window.removeEventListener('center-mission', handleCenterMission)
    }
  }, [date, camera])


  useFrame(() => {
    if (!targetPos.current || !controlsRef.current) return
    camera.position.lerp(targetPos.current, 0.06)
    controlsRef.current.target.lerp(targetLookAt.current!, 0.06)
    controlsRef.current.update()
    if (camera.position.distanceTo(targetPos.current) < 0.1) {
      targetPos.current = null
      targetLookAt.current = null
    }
  })

  return null
}

function SceneContent() {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  return (
    <>
      <ambientLight intensity={0.3} />

      <Stars count={5000} />
      <Sun />
      <Planets />
      <Moon />
      <PlanetaryMoons />
      <MissionMarkers />

      <CameraController controlsRef={controlsRef} />

      <OrbitControls
        ref={controlsRef}
        target={[0, 0, 0]}
        enablePan
        panSpeed={0.8}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
        minDistance={0.5}
        maxDistance={150}
        enableDamping
        dampingFactor={0.05}
        zoomSpeed={0.8}
      />

      <Preload all />
    </>
  )
}

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 25], fov: 45 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ background: '#06080d' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
