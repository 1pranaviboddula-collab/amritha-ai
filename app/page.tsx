'use client'

import Link from 'next/link'
import {
  Pill,
  Stethoscope,
  MapPin,
  Users,
  Clock,
  HeartPulse,
  ChevronRight,
  CalendarDays,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { EmergencyCard } from '@/components/emergency-dialog'
import { useApp } from '@/lib/store'
import { tr } from '@/lib/i18n'

const quickActions = [
  { key: 'medicines', href: '/medicines', icon: Pill, tint: 'green' },
  { key: 'doctorVisits', href: '/visits', icon: Stethoscope, tint: 'teal' },
  { key: 'nearbyCare', href: '/visits', icon: MapPin, tint: 'amber' },
  { key: 'family', href: '/profile', icon: Users, tint: 'rose' },
  { key: 'history', href: '/profile', icon: Clock, tint: 'blue' },
  { key: 'ashaPortal', href: '/assistant', icon: HeartPulse, tint: 'teal' },
] as const

const tintClass: Record<string, string> = {
  green: 'bg-tint-green text-tint-green-foreground',
  teal: 'bg-tint-teal text-tint-teal-foreground',
  amber: 'bg-tint-amber text-tint-amber-foreground',
  rose: 'bg-tint-rose text-tint-rose-foreground',
  blue: 'bg-tint-blue text-tint-blue-foreground',
}

export default function HomePage() {
  const { lang, profile, medicines, visits } = useApp()

  const nextMedicine = medicines.find((m) => !m.taken)
  const nextVisit = [...visits]
    .filter((v) => !v.past)
    .sort((a, b) => a.date.localeCompare(b.date))[0]

  const readText = `${tr('greeting', lang)} ${profile.name}. ${tr('feeling', lang)} ${
    nextMedicine ? `${tr('nextMedicine', lang)}: ${nextMedicine.name}` : ''
  }`

  return (
    <AppShell>
      <PageHeader
        title={`${tr('greeting', lang)}, ${profile.name}`}
        subtitle={tr('feeling', lang)}
        readText={readText}
        accent="greeting"
      />

      <div className="mt-5 flex flex-col gap-4">
        <EmergencyCard />

        {nextMedicine && (
          <Link
            href="/medicines"
            className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-tint-green text-tint-green-foreground">
              <Pill className="size-7" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {tr('nextMedicine', lang)}
              </span>
              <span className="block truncate text-lg font-extrabold text-foreground">
                {nextMedicine.name}
              </span>
              <span className="block text-sm text-muted-foreground">
                {nextMedicine.times[0]} · {nextMedicine.condition}
              </span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
          </Link>
        )}

        {nextVisit && (
          <Link
            href="/visits"
            className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-sm"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-tint-teal text-tint-teal-foreground">
              <CalendarDays className="size-7" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {tr('upcomingVisit', lang)}
              </span>
              <span className="block truncate text-lg font-extrabold text-foreground">
                {nextVisit.doctor}
              </span>
              <span className="block text-sm text-muted-foreground">
                {formatWhen(nextVisit.date, lang)} · {nextVisit.time} ·{' '}
                {nextVisit.mode === 'video' ? tr('video', lang) : tr('inPerson', lang)}
              </span>
            </span>
            <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
          </Link>
        )}

        <section className="mt-1">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {tr('quickActions', lang)}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => {
              const Icon = a.icon
              return (
                <Link
                  key={a.key}
                  href={a.href}
                  className="flex flex-col gap-3 rounded-3xl bg-card p-4 shadow-sm transition-transform active:scale-[0.97]"
                >
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${tintClass[a.tint]}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="text-base font-bold text-foreground">
                    {tr(a.key, lang)}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <p className="mt-1 rounded-2xl bg-tint-blue/60 px-4 py-3 text-center text-sm leading-relaxed text-tint-blue-foreground">
          {tr('micHint', lang)}
        </p>
      </div>
    </AppShell>
  )
}

function formatWhen(date: string, lang: ReturnType<typeof useApp>['lang']) {
  const today = new Date().toISOString().slice(0, 10)
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  if (date === today) return lang === 'hi' ? 'आज' : lang === 'te' ? 'ఈరోజు' : 'Today'
  if (date === tomorrow)
    return lang === 'hi' ? 'कल' : lang === 'te' ? 'రేపు' : 'Tomorrow'
  return new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
  })
}
