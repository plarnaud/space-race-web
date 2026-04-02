'use client'

import dynamic from 'next/dynamic'
import { Title } from '@/components/dom/Title'
import { Scoreboard } from '@/components/dom/Scoreboard'
import { Timeline } from '@/components/dom/Timeline'
import { InfoPanel } from '@/components/dom/InfoPanel'
import { Controls } from '@/components/dom/Controls'
import { SolarSystemBar } from '@/components/dom/SolarSystemBar'
import { missions } from '@/data/missions'
import { planets } from '@/data/planets'

const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((mod) => mod.Scene),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="w-full h-screen relative overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* HUD overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <SolarSystemBar />
        <Title />
        <Scoreboard />
        <Timeline />
        <InfoPanel />
        <Controls />
      </div>

      {/* SEO content — visually hidden but crawlable by search engines */}
      <div className="sr-only">
        <h1>Space Race 101 — Interactive 3D Solar System & Space Mission Timeline</h1>
        <p>
          Explore the complete history of space exploration from 1957 to 2030 in an interactive
          3D solar system. Track over 50 major missions from NASA, Roscosmos, CNSA, ISRO, JAXA,
          and ESA. See real planetary positions, click on planets and moons for detailed information,
          and watch the space race unfold in real time.
        </p>

        <h2>Solar System Planets</h2>
        <ul>
          {planets.map((p) => (
            <li key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <p>Diameter: {p.stats.diameter}. Gravity: {p.stats.gravity}. Temperature: {p.stats.temperature}. Moons: {p.stats.moons}.</p>
            </li>
          ))}
        </ul>

        <h2>Space Missions Timeline (1957–2030)</h2>
        <ul>
          {missions.map((m) => (
            <li key={m.id}>
              <h3>{m.name} ({m.agency}, {new Date(m.launchDate).getFullYear()})</h3>
              <p>{m.description}</p>
              <p>Country: {m.country}. Type: {m.type}. Destination: {m.destination}. Status: {m.status}. Launch date: {m.launchDate}.</p>
              {m.crew && <p>Crew: {m.crew.map(c => `${c.name} (${c.role})`).join(', ')}</p>}
              {m.fact && <p>{m.fact}</p>}
            </li>
          ))}
        </ul>

        <h2>The Space Race: From Sputnik to Artemis</h2>
        <p>
          The space race began on October 4, 1957, when the Soviet Union launched Sputnik 1,
          the first artificial satellite. This triggered a competition with the United States
          that culminated in the Apollo 11 Moon landing on July 20, 1969, when Neil Armstrong
          became the first human to walk on the lunar surface.
        </p>
        <p>
          After the Apollo program ended in 1972, space exploration entered the Space Shuttle
          era and the construction of the International Space Station. Today, a new multi-nation
          space race is underway. China has landed rovers on the far side of the Moon, India
          achieved the first lunar south pole landing, Japan demonstrated precision landing
          technology, and NASA&apos;s Artemis program aims to return humans to the Moon.
        </p>
        <p>
          Meanwhile, Mars exploration continues with NASA&apos;s Curiosity and Perseverance rovers,
          China&apos;s Tianwen-1 mission, and deep space probes like Voyager 1 and 2 that have
          entered interstellar space. The James Webb Space Telescope is revealing the universe
          in unprecedented detail from its orbit 1.5 million kilometers from Earth.
        </p>

        <h2>Countries in the Space Race</h2>
        <h3>United States (NASA, SpaceX)</h3>
        <p>Pioneer of human spaceflight. Apollo Moon landings, Space Shuttle, Mars rovers, Voyager probes, Hubble and James Webb telescopes, and the Artemis return-to-Moon program.</p>
        <h3>Russia (Roscosmos)</h3>
        <p>First satellite (Sputnik), first human in space (Yuri Gagarin), Mir space station, and decades of Soyuz crew transport to the ISS.</p>
        <h3>China (CNSA)</h3>
        <p>Rapidly growing program. First far-side Moon landing (Chang&apos;e 4), lunar sample returns, Tiangong space station, and Mars rover Zhurong.</p>
        <h3>India (ISRO)</h3>
        <p>First lunar south pole landing (Chandrayaan-3), Mars Orbiter Mission on first attempt at record-low cost, and upcoming Gaganyaan crewed mission.</p>
        <h3>Japan (JAXA)</h3>
        <p>Asteroid sample returns (Hayabusa missions) and precision Moon landing (SLIM).</p>
        <h3>Europe (ESA)</h3>
        <p>Cassini-Huygens Saturn mission, Rosetta comet landing, JUICE Jupiter mission, and collaboration on ISS and Hubble/Webb telescopes.</p>
      </div>
    </main>
  )
}
