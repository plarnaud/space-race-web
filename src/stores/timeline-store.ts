import { create } from 'zustand'

const MIN_DATE = 1957.0
const MAX_DATE = 2030.0

interface TimelineState {
  date: number
  focusedId: string | null // camera centered on this (first tap on mobile)
  selectedMissionId: string | null // inspect panel open (second tap on mobile, or click on desktop)
  filteredCountry: string | null
  zoomLevel: 'solar-system' | 'earth-moon' | 'mission-detail'
  setDate: (date: number) => void
  // On desktop: focus + select in one click. On mobile: first tap focuses, second selects.
  focusOn: (id: string | null) => void
  selectMission: (id: string | null) => void
  tapObject: (id: string, isMobile: boolean) => void
  setFilteredCountry: (code: string | null) => void
  setZoomLevel: (level: TimelineState['zoomLevel']) => void
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  date: 2026.25,
  focusedId: null,
  selectedMissionId: null,
  filteredCountry: null,
  zoomLevel: 'earth-moon',
  setDate: (date) => set({ date: Math.max(MIN_DATE, Math.min(MAX_DATE, date)) }),
  focusOn: (id) => set({ focusedId: id }),
  selectMission: (id) => set({ selectedMissionId: id, focusedId: id }),
  tapObject: (id, isMobile) => {
    const state = get()
    if (!isMobile) {
      // Desktop: always open inspect immediately
      if (state.selectedMissionId === id) {
        set({ selectedMissionId: null, focusedId: null })
      } else {
        set({ selectedMissionId: id, focusedId: id })
      }
    } else {
      // Mobile: first tap = focus (center camera). Second tap on same = open inspect.
      if (state.focusedId === id && state.selectedMissionId === id) {
        // Already inspecting, close
        set({ selectedMissionId: null, focusedId: null })
      } else if (state.focusedId === id) {
        // Already focused, open inspect
        set({ selectedMissionId: id })
      } else {
        // New object, just focus (center camera), close any open inspect
        set({ focusedId: id, selectedMissionId: null })
      }
    }
  },
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
