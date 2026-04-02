# The New Space Race

An interactive 3D solar system explorer and space mission timeline covering 1957 to 2030.

Explore the history of space exploration from Sputnik to Artemis. Scrub through time, click planets and missions, and discover the new multi-nation race to the Moon and beyond.

## Features

- Full 3D solar system with accurate planet positions and orbital mechanics
- 50+ space missions across 6 space programs (NASA, Roscosmos, CNSA, ISRO, JAXA, ESA)
- Interactive timeline with day-level precision from 1957 to 2030
- Planet and moon info panels with stats, images, and external links
- Country-by-country mission scoreboard with filtering
- Contextual facts at key historical moments

## Tech Stack

- Next.js 14 (App Router)
- React Three Fiber + Three.js
- Zustand (state management)
- Tailwind CSS
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Controls

- **Left click + drag** — Orbit camera
- **Right click + drag** — Pan camera
- **Scroll wheel** — Zoom
- **Arrow keys** — Scrub timeline (1 week per press)
- **Click planet/mission/moon** — Inspect details

## Data Sources

Planet textures from Solar System Scope. Mission data compiled from NASA, ESA, and public records. Planet images via Wikipedia REST API.
