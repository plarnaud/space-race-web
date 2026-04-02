import { create } from 'zustand'

const MIN_DATE = 1957.0
const MAX_DATE = 2030.0

interface TimelineState {
  date: number
  selectedMissionId: string | null
  filteredCountry: string | null // null = show all
  zoomLevel: 'solar-system' | 'earth-moon' | 'mission-detail'
  setDate: (date: number) => void
  selectMission: (id: string | null) => void
  setFilteredCountry: (code: string | null) => void
  setZoomLevel: (level: TimelineState['zoomLevel']) => void
}

export const useTimelineStore = create<TimelineState>((set) => ({
  date: 2026.25,
  selectedMissionId: null,
  filteredCountry: null,
  zoomLevel: 'earth-moon',
  setDate: (date) => set({ date: Math.max(MIN_DATE, Math.min(MAX_DATE, date)) }),
  selectMission: (id) => set({ selectedMissionId: id }),
  setFilteredCountry: (code) => set((s) => ({ filteredCountry: s.filteredCountry === code ? null : code })),
  setZoomLevel: (level) => set({ zoomLevel: level }),
}))

export function dateToLabel(date: number): string {
  const year = Math.floor(date)
  const dayOfYear = (date - year) * 365.25
  const d = new Date(year, 0, 1)
  d.setDate(d.getDate() + Math.floor(dayOfYear))
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export function dateToYear(date: number): number {
  return Math.floor(date)
}

export { MIN_DATE, MAX_DATE }
