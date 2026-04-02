export interface MoonData {
  id: string
  name: string
  parent: string // planet name
  radius: number // visual radius in scene
  orbitRadius: number // visual distance from parent
  orbitalPeriodDays: number
  color: string
  stats: {
    diameter: string
    gravity: string
    orbitalPeriod: string
    discoveredBy?: string
    discoveredYear?: number
    notableFeature: string
  }
  description: string
  wikiTitle: string // for image lookup
  detailUrl: string // NASA if available, otherwise Wikipedia
}

// Earth's Moon is rendered separately in Moon.tsx with textures.
// Its info panel data is in lunaData below.

export const lunaData: MoonData = {
  id: 'luna',
  name: 'The Moon',
  parent: 'Earth',
  radius: 0.05,
  orbitRadius: 0.8,
  orbitalPeriodDays: 27.322,
  color: '#c0c0c0',
  stats: {
    diameter: '3,474 km',
    gravity: '1.62 m/s²',
    orbitalPeriod: '27.3 days',
    notableFeature: 'Only celestial body visited by humans',
  },
  description: 'Earth\'s only natural satellite. Twelve humans have walked on its surface between 1969 and 1972. It stabilizes Earth\'s axial tilt and creates our tides. The target of the new space race.',
  wikiTitle: 'Moon',
  detailUrl: 'https://science.nasa.gov/moon/',
}

export const moons: MoonData[] = [
  // === MARS ===
  {
    id: 'phobos',
    name: 'Phobos',
    parent: 'Mars',
    radius: 0.02,
    orbitRadius: 0.3,
    orbitalPeriodDays: 0.319,
    color: '#8a7e6b',
    stats: {
      diameter: '22.4 km',
      gravity: '0.0057 m/s²',
      orbitalPeriod: '7 hours 39 min',
      discoveredBy: 'Asaph Hall',
      discoveredYear: 1877,
      notableFeature: 'Stickney crater (9 km wide)',
    },
    description: 'Larger of Mars\'s two moons. Orbits so close it will crash into Mars or break apart in ~50 million years. Completes 3 orbits per Martian day.',
    wikiTitle: 'Phobos_(moon)',
    detailUrl: 'https://science.nasa.gov/mars/moons/phobos/',
  },
  {
    id: 'deimos',
    name: 'Deimos',
    parent: 'Mars',
    radius: 0.015,
    orbitRadius: 0.5,
    orbitalPeriodDays: 1.263,
    color: '#9e9585',
    stats: {
      diameter: '12.4 km',
      gravity: '0.003 m/s²',
      orbitalPeriod: '30 hours 18 min',
      discoveredBy: 'Asaph Hall',
      discoveredYear: 1877,
      notableFeature: 'Smoothest surface of any small body',
    },
    description: 'Smaller of Mars\'s moons. Slowly spiraling away from Mars. May be a captured asteroid.',
    wikiTitle: 'Deimos_(moon)',
    detailUrl: 'https://science.nasa.gov/mars/moons/deimos/',
  },

  // === JUPITER (Galilean moons) ===
  {
    id: 'io',
    name: 'Io',
    parent: 'Jupiter',
    radius: 0.05,
    orbitRadius: 1.0,
    orbitalPeriodDays: 1.769,
    color: '#e8c84a',
    stats: {
      diameter: '3,643 km',
      gravity: '1.796 m/s²',
      orbitalPeriod: '1.77 days',
      discoveredBy: 'Galileo Galilei',
      discoveredYear: 1610,
      notableFeature: '400+ active volcanoes',
    },
    description: 'Most volcanically active body in the solar system. Tidal heating from Jupiter creates over 400 active volcanoes. Surface constantly reshaped by lava flows.',
    wikiTitle: 'Io_(moon)',
    detailUrl: 'https://science.nasa.gov/jupiter/moons/io/',
  },
  {
    id: 'europa',
    name: 'Europa',
    parent: 'Jupiter',
    radius: 0.045,
    orbitRadius: 1.4,
    orbitalPeriodDays: 3.551,
    color: '#c8bfa8',
    stats: {
      diameter: '3,122 km',
      gravity: '1.315 m/s²',
      orbitalPeriod: '3.55 days',
      discoveredBy: 'Galileo Galilei',
      discoveredYear: 1610,
      notableFeature: 'Subsurface ocean with more water than Earth',
    },
    description: 'Covered in a smooth ice shell hiding a global saltwater ocean. One of the most promising places to search for extraterrestrial life.',
    wikiTitle: 'Europa_(moon)',
    detailUrl: 'https://science.nasa.gov/jupiter/moons/europa/',
  },
  {
    id: 'ganymede',
    name: 'Ganymede',
    parent: 'Jupiter',
    radius: 0.06,
    orbitRadius: 1.9,
    orbitalPeriodDays: 7.155,
    color: '#8a8578',
    stats: {
      diameter: '5,268 km',
      gravity: '1.428 m/s²',
      orbitalPeriod: '7.15 days',
      discoveredBy: 'Galileo Galilei',
      discoveredYear: 1610,
      notableFeature: 'Largest moon in the solar system',
    },
    description: 'Larger than Mercury. Only moon with its own magnetic field. Has a subsurface ocean sandwiched between layers of ice.',
    wikiTitle: 'Ganymede_(moon)',
    detailUrl: 'https://science.nasa.gov/jupiter/moons/ganymede/',
  },
  {
    id: 'callisto',
    name: 'Callisto',
    parent: 'Jupiter',
    radius: 0.055,
    orbitRadius: 2.5,
    orbitalPeriodDays: 16.689,
    color: '#5a574e',
    stats: {
      diameter: '4,821 km',
      gravity: '1.235 m/s²',
      orbitalPeriod: '16.69 days',
      discoveredBy: 'Galileo Galilei',
      discoveredYear: 1610,
      notableFeature: 'Most heavily cratered object in the solar system',
    },
    description: 'Most heavily cratered object known. Surface hasn\'t changed in 4 billion years. May also have a subsurface ocean.',
    wikiTitle: 'Callisto_(moon)',
    detailUrl: 'https://science.nasa.gov/jupiter/moons/callisto/',
  },

  // === SATURN ===
  {
    id: 'titan',
    name: 'Titan',
    parent: 'Saturn',
    radius: 0.06,
    orbitRadius: 1.2,
    orbitalPeriodDays: 15.945,
    color: '#d4a843',
    stats: {
      diameter: '5,150 km',
      gravity: '1.352 m/s²',
      orbitalPeriod: '15.95 days',
      discoveredBy: 'Christiaan Huygens',
      discoveredYear: 1655,
      notableFeature: 'Only moon with a thick atmosphere and liquid lakes',
    },
    description: 'Only moon with a dense atmosphere (thicker than Earth\'s). Has lakes and seas of liquid methane and ethane. Huygens probe landed here in 2005.',
    wikiTitle: 'Titan_(moon)',
    detailUrl: 'https://science.nasa.gov/saturn/moons/titan/',
  },
  {
    id: 'enceladus',
    name: 'Enceladus',
    parent: 'Saturn',
    radius: 0.03,
    orbitRadius: 0.8,
    orbitalPeriodDays: 1.370,
    color: '#f0f0f0',
    stats: {
      diameter: '504 km',
      gravity: '0.113 m/s²',
      orbitalPeriod: '1.37 days',
      discoveredBy: 'William Herschel',
      discoveredYear: 1789,
      notableFeature: 'Water geysers erupting from south pole',
    },
    description: 'Shoots geysers of water ice into space from its south pole. Has a global subsurface ocean with hydrothermal vents. Top candidate for life beyond Earth.',
    wikiTitle: 'Enceladus',
    detailUrl: 'https://science.nasa.gov/saturn/moons/enceladus/',
  },

  // === URANUS ===
  {
    id: 'titania',
    name: 'Titania',
    parent: 'Uranus',
    radius: 0.035,
    orbitRadius: 0.7,
    orbitalPeriodDays: 8.706,
    color: '#8a8580',
    stats: {
      diameter: '1,578 km',
      gravity: '0.379 m/s²',
      orbitalPeriod: '8.71 days',
      discoveredBy: 'William Herschel',
      discoveredYear: 1787,
      notableFeature: 'Largest moon of Uranus',
    },
    description: 'Largest moon of Uranus. Surface shows huge canyons and fault scarps, suggesting past geological activity.',
    wikiTitle: 'Titania_(moon)',
    detailUrl: 'https://science.nasa.gov/uranus/moons/titania/',
  },

  // === NEPTUNE ===
  {
    id: 'triton',
    name: 'Triton',
    parent: 'Neptune',
    radius: 0.04,
    orbitRadius: 0.8,
    orbitalPeriodDays: 5.877,
    color: '#b8c4c8',
    stats: {
      diameter: '2,707 km',
      gravity: '0.779 m/s²',
      orbitalPeriod: '5.88 days (retrograde)',
      discoveredBy: 'William Lassell',
      discoveredYear: 1846,
      notableFeature: 'Orbits backwards — likely a captured Kuiper Belt object',
    },
    description: 'Only large moon that orbits in the opposite direction of its planet\'s rotation. Probably a captured dwarf planet from the Kuiper Belt. Has nitrogen geysers.',
    wikiTitle: 'Triton_(moon)',
    detailUrl: 'https://science.nasa.gov/neptune/moons/triton/',
  },

  // === PLUTO ===
  {
    id: 'charon',
    name: 'Charon',
    parent: 'Pluto',
    radius: 0.04,
    orbitRadius: 0.4,
    orbitalPeriodDays: 6.387,
    color: '#8a8580',
    stats: {
      diameter: '1,212 km',
      gravity: '0.288 m/s²',
      orbitalPeriod: '6.39 days (tidally locked)',
      discoveredBy: 'James Christy',
      discoveredYear: 1978,
      notableFeature: 'Half the size of Pluto — largest moon relative to its planet',
    },
    description: 'So large relative to Pluto that the two orbit a shared center of gravity between them. Both are tidally locked, always showing the same face to each other. Features a dark red polar cap.',
    wikiTitle: 'Charon_(moon)',
    detailUrl: 'https://science.nasa.gov/pluto/moons/charon/',
  },
]
