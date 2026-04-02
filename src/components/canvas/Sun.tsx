'use client'

import { Suspense } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'
import { useTimelineStore } from '@/stores/timeline-store'

function SunSphere() {
  const texture = useTexture('/textures/sun.jpg')
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

export function Sun() {
  const tapObject = useTimelineStore((s) => s.tapObject)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <group position={[0, 0, 0]}>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          tapObject('sun', isMobile)
          // No camera recentering for sun — only planets/moons move the camera
        }}
        onPointerEnter={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { document.body.style.cursor = 'default' }}
        visible={false}
      >
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial />
      </mesh>

      {/* Textured sun */}
      <Suspense fallback={
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#ffcc00" />
        </mesh>
      }>
        <SunSphere />
      </Suspense>

      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          uniforms={{
            glowColor: { value: new THREE.Color('#ffcc00') },
          }}
          vertexShader={`
            varying float vIntensity;
            void main() {
              vec3 vNormal = normalize(normalMatrix * normal);
              vec3 vNormel = normalize(normalMatrix * vec3(0.0, 0.0, 1.0));
              vIntensity = pow(0.7 - dot(vNormal, vNormel), 2.0);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 glowColor;
            varying float vIntensity;
            void main() {
              gl_FragColor = vec4(glowColor, vIntensity * 0.3);
            }
          `}
        />
      </mesh>

      <pointLight color="#ffeecc" intensity={2} distance={200} decay={0.5} />
    </group>
  )
}
