'use client'

import { useState } from 'react'
import {
  Plus,
  Video,
  MapPin,
  X,
  CalendarDays,
  Stethoscope,
  Trash2,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { useApp, type Visit } from '@/lib/store'
import { tr } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export default function VisitsPage() {
  const { lang, visits, addVisit, cancelVisit } = useApp()
  const [showForm, setShowForm] = useState(false)

  const upcoming = visits
    .filter((v) => !v.past)
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = visits.filter((v) => v.past)

  return (
    <AppShell>
      <PageHeader
        title={tr('myVisits', lang)}
        subtitle={`${upcoming.length} ${tr('upcoming', lang).toLowerCase()}`}
        readText={`${tr('myVisits', lang)}. ${upcoming
          .map((v) => `${v.doctor}, ${v.date}, ${v.time}`)
          .join('. ')}`}
      />

      <button
        type="button"
        onClick={() => setShowForm(true)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-base font-bold text-primary-foreground active:scale-[0.98]"
      >
        <Plus className="size-5" />
        {tr('bookVisit', lang)}
      </button>

      {upcoming.length > 0 && (
        <Section title={tr('upcoming', lang)}>
          {upcoming.map((v) => (
            <VisitCard key={v.id} visit={v} lang={lang} onCancel={cancelVisit} />
          ))}
        </Section>
      )}

      {past.length > 0 && (
        <Section title={tr('past', lang)}>
          {past.map((v) => (
            <VisitCard key={v.id} visit={v} lang={lang} onCancel={cancelVisit} />
          ))}
        </Section>
      )}

      {showForm && (
        <BookVisitForm
          lang={lang}
          onClose={() => setShowForm(false)}
          onSave={(v) => {
            addVisit(v)
            setShowForm(false)
          }}
        />
      )}
    </AppShell>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  )
}

function VisitCard({
  visit,
  lang,
  onCancel,
}: {
  visit: Visit
  lang: ReturnType<typeof useApp>['lang']
  onCancel: (id: string) => void
}) {
  const isVideo = visit.mode === 'video'
  return (
    <article className={cn('rounded-3xl bg-card p-4 shadow-sm', visit.past && 'opacity-70')}>
      <div className="flex items-start gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-tint-teal text-tint-teal-foreground">
          <Stethoscope className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-extrabold leading-tight text-foreground">
            {visit.doctor}
          </h3>
          <p className="text-sm text-muted-foreground">{visit.reason}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground">
            <span className="flex items-center gap-1 font-semibold">
              <CalendarDays className="size-4 text-primary" />
              {formatDate(visit.date)} · {visit.time}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              {isVideo ? <Video className="size-4" /> : <MapPin className="size-4" />}
              {isVideo ? tr('video', lang) : visit.location ?? tr('inPerson', lang)}
            </span>
          </div>
        </div>
      </div>

      {!visit.past && (
        <div className="mt-3 flex gap-2">
          {isVideo ? (
            <a
              href="https://meet.google.com/"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 text-sm font-bold text-primary-foreground active:scale-[0.98]"
            >
              <Video className="size-4" />
              {tr('joinVideo', lang)}
            </a>
          ) : (
            <a
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                visit.location ?? 'clinic',
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 text-sm font-bold text-primary-foreground active:scale-[0.98]"
            >
              <MapPin className="size-4" />
              {tr('getDirections', lang)}
            </a>
          )}
          <button
            type="button"
            onClick={() => onCancel(visit.id)}
            aria-label={tr('cancel', lang)}
            className="flex size-11 items-center justify-center rounded-2xl bg-muted text-destructive active:scale-95"
          >
            <Trash2 className="size-5" />
          </button>
        </div>
      )}
    </article>
  )
}

function BookVisitForm({
  lang,
  onClose,
  onSave,
}: {
  lang: ReturnType<typeof useApp>['lang']
  onClose: () => void
  onSave: (v: Omit<Visit, 'id'>) => void
}) {
  const [doctor, setDoctor] = useState('')
  const [reason, setReason] = useState('')
  const [date, setDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 10))
  const [time, setTime] = useState('11:00 AM')
  const [mode, setMode] = useState<'video' | 'in-person'>('video')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!doctor.trim()) return
    onSave({
      doctor: doctor.trim(),
      reason: reason.trim() || '—',
      date,
      time: time.trim() || '11:00 AM',
      mode,
      location: mode === 'in-person' ? 'Clinic' : undefined,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-3"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-foreground">{tr('bookVisit', lang)}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={tr('cancel', lang)}
            className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <Field label={tr('doctorName', lang)}>
            <input
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              autoFocus
              placeholder="Dr. Priya Sharma"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary"
            />
          </Field>
          <Field label={tr('reason', lang)}>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Check-up"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={tr('date', lang)}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-base text-foreground outline-none focus:border-primary"
              />
            </Field>
            <Field label={tr('time', lang)}>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary"
              />
            </Field>
          </div>
          <Field label={tr('mode', lang)}>
            <div className="grid grid-cols-2 gap-2">
              {(['video', 'in-person'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    'rounded-2xl border py-3 text-sm font-bold transition-colors',
                    mode === m
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground',
                  )}
                >
                  {m === 'video' ? tr('video', lang) : tr('inPerson', lang)}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-2xl bg-primary py-3.5 text-base font-bold text-primary-foreground active:scale-[0.98]"
        >
          {tr('save', lang)}
        </button>
      </form>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">{label}</span>
      {children}
    </label>
  )
}

function formatDate(date: string) {
  const today = new Date().toISOString().slice(0, 10)
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  if (date === today) return 'Today'
  if (date === tomorrow) return 'Tomorrow'
  return new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}
