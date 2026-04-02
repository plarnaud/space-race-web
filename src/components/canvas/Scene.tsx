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
  const prevDate = useRef(date)
  const trackedPlanet = useRef<string>('Earth') // which planet the camera is following

  // Center on planet/sun/mission
  useEffect(() => {
    function handleCenter(e: Event) {
      const name = (e as CustomEvent).detail as string

      if (name === 'sun') {
        trackedPlanet.current = ''
        targetLookAt.current = new THREE.Vector3(0, 0, 0)
        targetPos.current = new THREE.Vector3(0, 5, 10)
        return
      }

      const planet = planets.find((p) => p.name.toLowerCase() === name)
      if (planet) {
        trackedPlanet.current = planet.name
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

    function handleCenterIfFar(e: Event) {
      const pos = (e as CustomEvent).detail as { x: number; y: number; z: number }
      const target = new THREE.Vector3(pos.x, pos.y, pos.z)
      const dist = camera.position.distanceTo(target)
      if (dist > 20) {
        targetLookAt.current = target
        targetPos.current = new THREE.Vector3(pos.x, pos.y + 2, pos.z + 5)
      }
    }

    window.addEventListener('center-planet', handleCenter)
    window.addEventListener('center-mission', handleCenterMission)
    window.addEventListener('center-if-far', handleCenterIfFar)
    return () => {
      window.removeEventListener('center-planet', handleCenter)
      window.removeEventListener('center-mission', handleCenterMission)
      window.removeEventListener('center-if-far', handleCenterIfFar)
    }
  }, [date, camera])


  useFrame(() => {
    if (!controlsRef.current) return

    // When the date changes, shift camera + target to follow the tracked planet
    if (date !== prevDate.current && trackedPlanet.current) {
      const planet = planets.find((p) => p.name === trackedPlanet.current)
      if (planet) {
        const oldPos = getPlanetPosition(planet, prevDate.current)
        const newPos = getPlanetPosition(planet, date)
        const dx = newPos[0] - oldPos[0]
        const dy = newPos[1] - oldPos[1]
        const dz = newPos[2] - oldPos[2]

        camera.position.x += dx
        camera.position.y += dy
        camera.position.z += dz
        controlsRef.current.target.x += dx
        controlsRef.current.target.y += dy
        controlsRef.current.target.z += dz
        controlsRef.current.update()
      }
      prevDate.current = date
    }

    // Smooth fly-to animation
    if (targetPos.current) {
      camera.position.lerp(targetPos.current, 0.06)
      controlsRef.current.target.lerp(targetLookAt.current!, 0.06)
      controlsRef.current.update()
      if (camera.position.distanceTo(targetPos.current) < 0.1) {
        targetPos.current = null
        targetLookAt.current = null
      }
    }
  })

  return null
}

function SceneContent() {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  // Start looking at Earth
  const earth = planets.find((p) => p.name === 'Earth')!
  const [ex, , ez] = getPlanetPosition(earth, 2026.25)

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
        target={[ex, 0, ez]}
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
  const earth = planets.find((p) => p.name === 'Earth')!
  const [ix, , iz] = getPlanetPosition(earth, 2026.25)

  return (
    <Canvas
      camera={{ position: [ix + 1, 1.5, iz + 3], fov: 45 }}
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
