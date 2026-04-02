'use client'

import dynamic from 'next/dynamic'
import { Title } from '@/components/dom/Title'
import { Scoreboard } from '@/components/dom/Scoreboard'
import { Timeline } from '@/components/dom/Timeline'
import { InfoPanel } from '@/components/dom/InfoPanel'
import { Controls } from '@/components/dom/Controls'
import { SolarSystemBar } from '@/components/dom/SolarSystemBar'

const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((mod) => mod.Scene),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="w-full h-screen relative overflow-hidden">
      {/* 3D Canvas — z-0 */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* HUD overlay — z-10, pointer-events-none so clicks pass through to 3D.
          Each child sets pointer-events-auto on its own interactive areas. */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <SolarSystemBar />
        <Title />
        <Scoreboard />
        <Timeline />
        <InfoPanel />
        <Controls />
      </div>
    </main>
  )
}
