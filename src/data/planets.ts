export interface Planet {
  name: string
  distanceAU: number
  visualDistance: number
  radius: number
  color: string
  textureFile?: string
  hasRings?: boolean
  orbitalPeriodYears: number
  meanLongJ2000: number
  stats: {
    diameter: string
    gravity: string
    temperature: string
    moons: string
    dayLength: string
    yearLength: string
    atmosphere: string
  }
  description: string
}

// Visual distances use log scale so outer planets aren't invisible
export const planets: Planet[] = [
  {
    name: 'Mercury',
    distanceAU: 0.39,
    visualDistance: 14,
    radius: 0.08,
    color: '#a0a0a0',
    textureFile: '/textures/mercury.jpg',
    orbitalPeriodYears: 0.2408,
    meanLongJ2000: 252.25,
    stats: {
      diameter: '4,879 km',
      gravity: '3.7 m/s²',
      temperature: '-180°C to 430°C',
      moons: 'None',
      dayLength: '59 Earth days',
      yearLength: '88 Earth days',
      atmosphere: 'None (trace exosphere)',
    },
    description: 'Smallest planet and closest to the Sun. Extreme temperature swings between day and night.',
  },
  {
    name: 'Venus',
    distanceAU: 0.72,
    visualDistance: 18,
    radius: 0.15,
    color: '#e8cda0',
    textureFile: '/textures/venus.jpg',
    orbitalPeriodYears: 0.6152,
    meanLongJ2000: 181.98,
    stats: {
      diameter: '12,104 km',
      gravity: '8.87 m/s²',
      temperature: '462°C (surface)',
      moons: 'None',
      dayLength: '243 Earth days',
      yearLength: '225 Earth days',
      atmosphere: 'CO₂, sulfuric acid clouds',
    },
    description: 'Hottest planet due to runaway greenhouse effect. Spins backwards. A day lasts longer than its year.',
  },
  {
    name: 'Earth',
    distanceAU: 1.0,
    visualDistance: 21,
    radius: 0.16,
    color: '#4488ff',
    textureFile: '/textures/earth_color.jpg',
    orbitalPeriodYears: 1.0,
    meanLongJ2000: 100.46,
    stats: {
      diameter: '12,742 km',
      gravity: '9.81 m/s²',
      temperature: '-89°C to 57°C',
      moons: '1 (the Moon)',
      dayLength: '24 hours',
      yearLength: '365.25 days',
      atmosphere: 'N₂, O₂',
    },
    description: 'Our home. The only known planet with life. 71% of the surface is covered by water.',
  },
  {
    name: 'Mars',
    distanceAU: 1.52,
    visualDistance: 25,
    radius: 0.11,
    color: '#c1440e',
    textureFile: '/textures/mars.jpg',
    orbitalPeriodYears: 1.8809,
    meanLongJ2000: 355.45,
    stats: {
      diameter: '6,779 km',
      gravity: '3.72 m/s²',
      temperature: '-87°C to -5°C',
      moons: '2 (Phobos, Deimos)',
      dayLength: '24h 37m',
      yearLength: '687 Earth days',
      atmosphere: 'Thin CO₂',
    },
    description: 'The Red Planet. Home to the largest volcano (Olympus Mons) and canyon (Valles Marineris) in the solar system.',
  },
  {
    name: 'Jupiter',
    distanceAU: 5.2,
    visualDistance: 35,
    radius: 0.5,
    color: '#c88b3a',
    textureFile: '/textures/jupiter.jpg',
    orbitalPeriodYears: 11.862,
    meanLongJ2000: 34.40,
    stats: {
      diameter: '139,820 km',
      gravity: '24.79 m/s²',
      temperature: '-110°C (clouds)',
      moons: '95 known (4 major: Io, Europa, Ganymede, Callisto)',
      dayLength: '9h 56m',
      yearLength: '11.9 Earth years',
      atmosphere: 'H₂, He, ammonia clouds',
    },
    description: 'Largest planet. The Great Red Spot is a storm bigger than Earth that has raged for centuries.',
  },
  {
    name: 'Saturn',
    distanceAU: 9.54,
    visualDistance: 45,
    radius: 0.42,
    color: '#e8d5a3',
    textureFile: '/textures/saturn.jpg',
    hasRings: true,
    orbitalPeriodYears: 29.457,
    meanLongJ2000: 49.94,
    stats: {
      diameter: '116,460 km',
      gravity: '10.44 m/s²',
      temperature: '-140°C (clouds)',
      moons: '146 known (major: Titan, Enceladus)',
      dayLength: '10h 42m',
      yearLength: '29.5 Earth years',
      atmosphere: 'H₂, He',
    },
    description: 'Famous for its rings made of ice and rock. Least dense planet — it would float in water.',
  },
  {
    name: 'Uranus',
    distanceAU: 19.2,
    visualDistance: 55,
    radius: 0.25,
    color: '#7ec8e3',
    textureFile: '/textures/uranus.jpg',
    orbitalPeriodYears: 84.011,
    meanLongJ2000: 313.23,
    stats: {
      diameter: '50,724 km',
      gravity: '8.87 m/s²',
      temperature: '-195°C',
      moons: '28 known (largest: Titania)',
      dayLength: '17h 14m',
      yearLength: '84 Earth years',
      atmosphere: 'H₂, He, methane',
    },
    description: 'Tilted 98° on its axis — essentially rolling around the Sun. Methane gives it a blue-green color.',
  },
  {
    name: 'Neptune',
    distanceAU: 30.06,
    visualDistance: 65,
    radius: 0.24,
    color: '#4b70dd',
    textureFile: '/textures/neptune.jpg',
    orbitalPeriodYears: 164.79,
    meanLongJ2000: 304.88,
    stats: {
      diameter: '49,528 km',
      gravity: '11.15 m/s²',
      temperature: '-200°C',
      moons: '16 known (largest: Triton)',
      dayLength: '16h 6m',
      yearLength: '165 Earth years',
      atmosphere: 'H₂, He, methane',
    },
    description: 'Windiest planet with speeds up to 2,100 km/h. Discovered by mathematical prediction before visual observation.',
  },
  {
    name: 'Pluto',
    distanceAU: 39.48,
    visualDistance: 78,
    radius: 0.08,
    color: '#c9b8a4',
    textureFile: '/textures/neptune.jpg', // reuse Neptune texture, closest match
    orbitalPeriodYears: 247.94,
    meanLongJ2000: 238.93,
    stats: {
      diameter: '2,377 km',
      gravity: '0.62 m/s²',
      temperature: '-230°C',
      moons: '5 (largest: Charon)',
      dayLength: '6.4 Earth days',
      yearLength: '248 Earth years',
      atmosphere: 'Thin N₂, CH₄, CO',
    },
    description: 'Dwarf planet with a heart-shaped glacier (Tombaugh Regio). Reclassified from planet in 2006. New Horizons flew by in 2015, revealing a surprisingly complex and geologically active world.',
  },
]

/**
 * Get the orbital angle (radians) for a planet at a given fractional year.
 * Uses real mean longitudes at J2000 and real orbital periods.
 */
export function getPlanetAngle(planet: Planet, fractionalYear: number): number {
  const J2000 = 2000.0
  const yearsSinceJ2000 = fractionalYear - J2000
  const orbitsCompleted = yearsSinceJ2000 / planet.orbitalPeriodYears
  const meanLongRad = (planet.meanLongJ2000 * Math.PI) / 180
  return meanLongRad + orbitsCompleted * 2 * Math.PI
}

/**
 * Get the x/z position for a planet at a given fractional year.
 */
export function getPlanetPosition(planet: Planet, fractionalYear: number): [number, number, number] {
  const angle = getPlanetAngle(planet, fractionalYear)
  return [
    Math.cos(angle) * planet.visualDistance,
    0,
    Math.sin(angle) * planet.visualDistance,
  ]
}
