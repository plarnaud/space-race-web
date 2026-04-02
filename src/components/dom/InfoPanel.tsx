'use client'

import { useState, useEffect } from 'react'
import { useTimelineStore } from '@/stores/timeline-store'
import { missions } from '@/data/missions'
import { planets } from '@/data/planets'
import { moons } from '@/data/moons'
import { AnimatePresence, motion } from 'framer-motion'

function WikiImage({ title, alt }: { title: string; alt: string }) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    setSrc(null)
    fetch(`/api/wiki-image?title=${encodeURIComponent(title)}`)
      .then((r) => r.json())
      .then((data) => { if (data.src) setSrc(data.src) })
      .catch(() => {})
  }, [title])

  if (!src) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-[120px] object-cover rounded-sm mb-3"
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    />
  )
}

const FLAG_COLORS: Record<string, string> = {
  US: '#4488ff', CN: '#ff4444', IN: '#ff8800', JP: '#ff88cc', EU: '#44ddff', RU: '#ffcc00',
}

const FLAG_MAP: Record<string, string> = {
  US: '🇺🇸',
  CN: '🇨🇳',
  IN: '🇮🇳',
  JP: '🇯🇵',
  EU: '🇪🇺',
  RU: '🇷🇺',
}

const STATUS_COLORS: Record<string, string> = {
  active: '#00d4ff',
  completed: '#4ade80',
  planned: '#fbbf24',
  failed: '#f87171',
}

function PlanetPanel({ planetName, onClose }: { planetName: string; onClose: () => void }) {
  const planet = planets.find((p) => p.name.toLowerCase() === planetName)
  if (!planet) return null

  return (
    <motion.div
      initial={{ x: 340, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 340, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-6 top-6 z-20 w-[300px] max-h-[calc(100vh-120px)] overflow-y-auto pointer-events-auto"
      style={{
        background: 'rgba(10, 18, 32, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 212, 255, 0.15)',
        borderRadius: '4px',
        padding: '24px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
        style={{ color: '#7a8ba3', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
      >
        x
      </button>

      <WikiImage title={`${planet.name}_(planet)`} alt={planet.name} />

      <div className="text-[10px] uppercase tracking-[2px] mb-1" style={{ color: '#3d4f65' }}>
        Planet
      </div>
      <h2 className="text-xl mb-3" style={{ color: '#e8ecf1', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
        {planet.name}
      </h2>

      <DetailRow label="DIAMETER" value={planet.stats.diameter} />
      <DetailRow label="GRAVITY" value={planet.stats.gravity} />
      <DetailRow label="TEMPERATURE" value={planet.stats.temperature} />
      <DetailRow label="MOONS" value={String(planet.stats.moons)} />
      <DetailRow label="DAY LENGTH" value={planet.stats.dayLength} />
      <DetailRow label="YEAR LENGTH" value={planet.stats.yearLength} />
      <DetailRow label="ATMOSPHERE" value={planet.stats.atmosphere} />

      <p className="text-[13px] mt-4 leading-relaxed" style={{ color: '#7a8ba3', fontFamily: 'var(--font-display)' }}>
        {planet.description}
      </p>
      <a
        href={`https://science.nasa.gov/${planet.name.toLowerCase()}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-[11px] uppercase tracking-wider text-center py-2 rounded-sm hover:bg-white/5 transition-colors"
        style={{ color: '#7a8ba3', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        More on NASA.gov →
      </a>
    </motion.div>
  )
}

function SunPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: 340, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 340, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-6 top-6 z-20 w-[300px] max-h-[calc(100vh-120px)] overflow-y-auto pointer-events-auto"
      style={{
        background: 'rgba(10, 18, 32, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 212, 255, 0.15)',
        borderRadius: '4px',
        padding: '24px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
        style={{ color: '#7a8ba3', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
      >
        x
      </button>
      <div className="text-[10px] uppercase tracking-[2px] mb-1" style={{ color: '#3d4f65' }}>Star</div>
      <h2 className="text-xl mb-3" style={{ color: '#e8ecf1', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
        The Sun
      </h2>
      <DetailRow label="TYPE" value="G2V Main Sequence" />
      <DetailRow label="DIAMETER" value="1,391,000 km" />
      <DetailRow label="MASS" value="1.989 x 10³⁰ kg" />
      <DetailRow label="SURFACE TEMP" value="5,500°C" />
      <DetailRow label="CORE TEMP" value="15,000,000°C" />
      <DetailRow label="AGE" value="4.6 billion years" />
      <DetailRow label="COMPOSITION" value="73% H, 25% He" />
      <p className="text-[13px] mt-4 leading-relaxed" style={{ color: '#7a8ba3', fontFamily: 'var(--font-display)' }}>
        Our star. Contains 99.86% of the solar system&apos;s mass. Light takes 8 minutes and 20 seconds to reach Earth.
        Every second, it converts 600 million tons of hydrogen into helium through nuclear fusion.
      </p>
      <a
        href="https://science.nasa.gov/sun/"
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-[11px] uppercase tracking-wider text-center py-2 rounded-sm hover:bg-white/5 transition-colors"
        style={{ color: '#7a8ba3', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        More on NASA.gov →
      </a>
    </motion.div>
  )
}

function MoonPanel({ moonId, onClose }: { moonId: string; onClose: () => void }) {
  const moon = moons.find((m) => m.id === moonId)
  if (!moon) return null

  return (
    <motion.div
      initial={{ x: 340, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 340, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-6 top-6 z-20 w-[300px] max-h-[calc(100vh-120px)] overflow-y-auto pointer-events-auto"
      style={{
        background: 'rgba(10, 18, 32, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 212, 255, 0.15)',
        borderRadius: '4px',
        padding: '24px',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
        style={{ color: '#7a8ba3', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
      >
        x
      </button>

      <WikiImage title={moon.wikiTitle} alt={moon.name} />

      <div className="text-[10px] uppercase tracking-[2px] mb-1" style={{ color: '#3d4f65' }}>
        Moon of {moon.parent}
      </div>
      <h2 className="text-xl mb-3" style={{ color: '#e8ecf1', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
        {moon.name}
      </h2>

      <DetailRow label="DIAMETER" value={moon.stats.diameter} />
      <DetailRow label="GRAVITY" value={moon.stats.gravity} />
      <DetailRow label="ORBIT" value={moon.stats.orbitalPeriod} />
      {moon.stats.discoveredBy && (
        <DetailRow label="DISCOVERED" value={`${moon.stats.discoveredBy} (${moon.stats.discoveredYear})`} />
      )}
      <DetailRow label="NOTABLE" value={moon.stats.notableFeature} />

      <p className="text-[13px] mt-4 leading-relaxed" style={{ color: '#7a8ba3', fontFamily: 'var(--font-display)' }}>
        {moon.description}
      </p>

      <a
        href={`https://en.wikipedia.org/wiki/${moon.wikiTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-[11px] uppercase tracking-wider text-center py-2 rounded-sm hover:bg-white/5 transition-colors"
        style={{ color: '#7a8ba3', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        More on Wikipedia →
      </a>
    </motion.div>
  )
}

export function InfoPanel() {
  const selectedId = useTimelineStore((s) => s.selectedMissionId)
  const selectMission = useTimelineStore((s) => s.selectMission)

  const isSun = selectedId === 'sun'
  const isPlanet = selectedId?.startsWith('planet-') ?? false
  const isMoon = selectedId?.startsWith('moon-') ?? false
  const moonId = isMoon && selectedId ? selectedId.replace('moon-', '') : null
  const mission = selectedId && !isPlanet && !isSun && !isMoon ? missions.find((m) => m.id === selectedId) : null
  const planetName = isPlanet && selectedId ? selectedId.replace('planet-', '') : null

  return (
    <AnimatePresence>
      {isSun && (
        <SunPanel onClose={() => selectMission(null)} />
      )}
      {planetName && (
        <PlanetPanel planetName={planetName} onClose={() => selectMission(null)} />
      )}
      {moonId && (
        <MoonPanel moonId={moonId} onClose={() => selectMission(null)} />
      )}
      {mission && (
        <motion.div
          initial={{ x: 340, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 340, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-6 top-6 z-20 w-[300px] max-h-[calc(100vh-120px)] overflow-y-auto pointer-events-auto"
          style={{
            background: 'rgba(10, 18, 32, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 212, 255, 0.15)',
            borderRadius: '4px',
            padding: '24px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => selectMission(null)}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
            style={{ color: '#7a8ba3', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
          >
            ×
          </button>

          {/* Mission image from Wikipedia */}
          <WikiImage title={mission.name} alt={mission.name} />

          {/* Country color bar */}
          <div className="w-full h-[3px] rounded-sm mb-3" style={{
            background: FLAG_COLORS[mission.country] || '#7a8ba3',
          }} />

          {/* Country + Agency */}
          <div className="text-xs" style={{ color: '#7a8ba3' }}>
            {FLAG_MAP[mission.country]} {mission.agency}
          </div>

          {/* Mission name */}
          <h2
            className="text-xl mt-2 mb-1"
            style={{ color: '#e8ecf1', fontFamily: 'var(--font-display)', fontWeight: 400 }}
          >
            {mission.name}
          </h2>

          {/* Status + type badges */}
          <div className="flex gap-2 mb-4">
            <span
              className="inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded-sm"
              style={{
                color: STATUS_COLORS[mission.status],
                border: `1px solid ${STATUS_COLORS[mission.status]}33`,
                background: `${STATUS_COLORS[mission.status]}15`,
              }}
            >
              {mission.status}
            </span>
            <span
              className="inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider rounded-sm"
              style={{
                color: '#7a8ba3',
                border: '1px solid rgba(122, 139, 163, 0.2)',
                background: 'rgba(122, 139, 163, 0.08)',
              }}
            >
              {mission.type}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-0">
            <DetailRow label="LAUNCH" value={formatDate(mission.launchDate)} />
            {mission.endDate && <DetailRow label="END" value={formatDate(mission.endDate)} />}
            {!mission.endDate && mission.status === 'active' && (
              <DetailRow label="DURATION" value={`${Math.floor((Date.now() - new Date(mission.launchDate).getTime()) / 86400000)} days and counting`} />
            )}
            <DetailRow label="DESTINATION" value={mission.destination.replace('-', ' ').toUpperCase()} />
          </div>

          {/* Description */}
          <p
            className="text-[13px] mt-4 leading-relaxed"
            style={{ color: '#7a8ba3', fontFamily: 'var(--font-display)' }}
          >
            {mission.description}
          </p>

          {/* Notable fact */}
          {mission.fact && (
            <div
              className="mt-3 px-3 py-2 rounded-sm text-[12px]"
              style={{
                color: 'rgba(0, 212, 255, 0.8)',
                background: 'rgba(0, 212, 255, 0.06)',
                border: '1px solid rgba(0, 212, 255, 0.12)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {mission.fact}
            </div>
          )}

          {/* Crew */}
          {mission.crew && mission.crew.length > 0 && (
            <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                className="text-[10px] uppercase tracking-[2px] mb-2"
                style={{ color: '#3d4f65' }}
              >
                Crew ({mission.crew.length})
              </div>
              {mission.crew.map((c) => (
                <div key={c.name} className="text-[13px] py-0.5" style={{ color: '#7a8ba3' }}>
                  {c.name}{' '}
                  <span style={{ color: '#3d4f65' }}>· {c.role}</span>
                </div>
              ))}
            </div>
          )}

          {/* Detail link */}
          {mission.detailUrl && (
            <a
              href={mission.detailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-[11px] uppercase tracking-wider text-center py-2 rounded-sm hover:bg-white/5 transition-colors"
              style={{
                color: '#7a8ba3',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {mission.detailUrl.includes('nasa.gov') ? 'More on NASA.gov →' :
               mission.detailUrl.includes('esa.int') ? 'More on ESA.int →' :
               'More on Wikipedia →'}
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between py-2"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      <span className="text-[10px] uppercase tracking-wider" style={{ color: '#3d4f65' }}>
        {label}
      </span>
      <span className="text-[13px]" style={{ color: '#e8ecf1' }}>
        {value}
      </span>
    </div>
  )
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
