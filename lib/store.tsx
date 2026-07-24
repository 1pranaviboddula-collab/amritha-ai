'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Lang } from './i18n'

export type Medicine = {
  id: string
  name: string
  condition: string
  dosage: string
  times: string[]
  doctor?: string
  taken: boolean
}

export type Visit = {
  id: string
  doctor: string
  reason: string
  date: string // ISO date
  time: string
  mode: 'video' | 'in-person'
  location?: string
  past?: boolean
}

export type Contact = {
  id: string
  name: string
  relation: string
  phone: string
}

export type Profile = {
  name: string
  age: number
  bloodGroup: string
  conditions: string[]
}

type State = {
  lang: Lang
  largeText: boolean
  medicines: Medicine[]
  visits: Visit[]
  contacts: Contact[]
  profile: Profile
}

type AppContextType = State & {
  hydrated: boolean
  setLang: (l: Lang) => void
  cycleLang: () => void
  toggleLargeText: () => void
  toggleMedicine: (id: string) => void
  addMedicine: (m: Omit<Medicine, 'id' | 'taken'>) => void
  addVisit: (v: Omit<Visit, 'id'>) => void
  cancelVisit: (id: string) => void
}

const LANG_ORDER: Lang[] = ['en', 'hi', 'te']

const uid = () => Math.random().toString(36).slice(2, 9)

const initialState: State = {
  lang: 'en',
  largeText: false,
  medicines: [
    {
      id: 'm1',
      name: 'Metformin 500mg',
      condition: 'Diabetes',
      dosage: '1 tablet after meal',
      times: ['9:00 AM', '9:00 PM'],
      doctor: 'Dr. Ravi Kumar',
      taken: false,
    },
    {
      id: 'm2',
      name: 'Calcium + Vitamin D',
      condition: 'Bone health',
      dosage: '1 tablet',
      times: ['2:00 PM'],
      taken: false,
    },
    {
      id: 'm3',
      name: 'Amlodipine 5mg',
      condition: 'Blood Pressure',
      dosage: '1 tablet after food',
      times: ['8:00 AM'],
      doctor: 'Dr. Priya Sharma',
      taken: true,
    },
  ],
  visits: [
    {
      id: 'v1',
      doctor: 'Dr. Priya Sharma',
      reason: 'Blood pressure review',
      date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      time: '11:00 AM',
      mode: 'video',
    },
    {
      id: 'v2',
      doctor: 'Dr. Ravi Kumar',
      reason: 'Diabetes check-up',
      date: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
      time: '10:30 AM',
      mode: 'in-person',
      location: 'Sunrise Clinic, MG Road',
    },
    {
      id: 'v3',
      doctor: 'Dr. Anita Rao',
      reason: 'Eye check-up',
      date: new Date(Date.now() - 20 * 86400000).toISOString().slice(0, 10),
      time: '4:00 PM',
      mode: 'in-person',
      location: 'Vision Care Centre',
      past: true,
    },
  ],
  contacts: [
    { id: 'c1', name: 'Suresh (Son)', relation: 'Son', phone: '+91 98765 43210' },
    { id: 'c2', name: 'Lakshmi (Daughter)', relation: 'Daughter', phone: '+91 91234 56789' },
    { id: 'c3', name: 'Emergency 108', relation: 'Ambulance', phone: '108' },
  ],
  profile: {
    name: 'Ramaiah',
    age: 68,
    bloodGroup: 'B+',
    conditions: ['Diabetes', 'Blood Pressure'],
  },
}

const STORAGE_KEY = 'amritha-state-v1'

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initialState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>
        setState((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // ignore
    }
  }, [state, hydrated])

  useEffect(() => {
    document.documentElement.style.fontSize = state.largeText ? '19px' : '16px'
  }, [state.largeText])

  const value: AppContextType = {
    ...state,
    hydrated,
    setLang: (lang) => setState((s) => ({ ...s, lang })),
    cycleLang: () =>
      setState((s) => {
        const idx = LANG_ORDER.indexOf(s.lang)
        return { ...s, lang: LANG_ORDER[(idx + 1) % LANG_ORDER.length] }
      }),
    toggleLargeText: () => setState((s) => ({ ...s, largeText: !s.largeText })),
    toggleMedicine: (id) =>
      setState((s) => ({
        ...s,
        medicines: s.medicines.map((m) =>
          m.id === id ? { ...m, taken: !m.taken } : m,
        ),
      })),
    addMedicine: (m) =>
      setState((s) => ({
        ...s,
        medicines: [...s.medicines, { ...m, id: uid(), taken: false }],
      })),
    addVisit: (v) =>
      setState((s) => ({ ...s, visits: [...s.visits, { ...v, id: uid() }] })),
    cancelVisit: (id) =>
      setState((s) => ({ ...s, visits: s.visits.filter((v) => v.id !== id) })),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
