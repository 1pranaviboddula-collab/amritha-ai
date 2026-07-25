'use client'
import { TranslatedText } from "@/components/ui/TranslatedText";
import { useState } from 'react'
import { Camera, Plus, Check, Clock, Pill, X } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { useApp, type Medicine } from '@/lib/store'
import { tr } from '@/lib/i18n'
import { speak } from '@/lib/speech'
import { cn } from '@/lib/utils'

export default function MedicinesPage() {
  const { lang, medicines, toggleMedicine, addMedicine } = useApp()
  const [showForm, setShowForm] = useState(false)

  const toTake = medicines.filter((m) => !m.taken)
  const done = medicines.filter((m) => m.taken)

  const subtitle =
    toTake.length > 0
      ? `${toTake.length} ${tr('pendingToday', lang)}`
      : tr('allDone', lang)

  return (
    <AppShell>
      <PageHeader
        title={tr('myMedicines', lang)}
        subtitle={subtitle}
        readText={`${tr('myMedicines', lang)}. ${subtitle}. ${toTake
          .map((m) => `${m.name}, ${m.times.join(', ')}`)
          .join('. ')}`}
      />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => speak(tr('scanPrescription', lang), lang)}
          className="flex flex-col gap-2 rounded-3xl bg-card p-4 text-left shadow-sm active:scale-[0.97]"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-tint-blue text-tint-blue-foreground">
            <Camera className="size-6" />
          </span>
          <span className="font-bold text-foreground">{tr('scanPrescription', lang)}</span>
          <span className="text-xs text-muted-foreground">{tr('cameraOcr', lang)}</span>
        </button>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex flex-col gap-2 rounded-3xl bg-card p-4 text-left shadow-sm active:scale-[0.97]"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-tint-green text-tint-green-foreground">
            <Plus className="size-6" />
          </span>
          <span className="font-bold text-foreground">{tr('addManually', lang)}</span>
          <span className="text-xs text-muted-foreground">{tr('enterDetails', lang)}</span>
        </button>
      </div>

      {toTake.length > 0 && (
        <Section title={tr('toTake', lang)}>
          {toTake.map((m) => (
            <MedicineCard key={m.id} med={m} lang={lang} onToggle={toggleMedicine} />
          ))}
        </Section>
      )}

      {done.length > 0 && (
        <Section title={tr('alreadyTaken', lang)}>
          {done.map((m) => (
            <MedicineCard key={m.id} med={m} lang={lang} onToggle={toggleMedicine} />
          ))}
        </Section>
      )}

      {showForm && (
        <AddMedicineForm
          lang={lang}
          onClose={() => setShowForm(false)}
          onSave={(m) => {
            addMedicine(m)
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

function MedicineCard({
  med,
  lang,
  onToggle,
}: {
  med: Medicine
  lang: ReturnType<typeof useApp>['lang']
  onToggle: (id: string) => void
}) {
  return (
    <article className="rounded-3xl bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'flex size-12 shrink-0 items-center justify-center rounded-2xl',
            med.taken
              ? 'bg-tint-green text-tint-green-foreground'
              : 'bg-tint-amber text-tint-amber-foreground',
          )}
        >
          <Pill className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-extrabold leading-tight text-foreground">
  <TranslatedText text={med.name} />
</h3>

<p className="text-sm text-muted-foreground">
  <TranslatedText text={med.condition} /> · <TranslatedText text={med.dosage} />
</p>
          {med.doctor && (
  <p className="text-xs text-muted-foreground">
    <TranslatedText text={med.doctor} />
  </p>
)}
          <div className="mt-2 flex flex-wrap gap-2">
            {med.times.map((time) => (
              <span
                key={time}
                className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-foreground"
              >
                <Clock className="size-3.5" />
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onToggle(med.id)}
        className={cn(
          'mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-base font-bold transition-colors active:scale-[0.98]',
          med.taken
            ? 'bg-tint-green text-tint-green-foreground'
            : 'bg-primary text-primary-foreground',
        )}
      >
        <Check className="size-5" />
        {med.taken ? `${tr('taken', lang)} · ${tr('undo', lang)}` : tr('markTaken', lang)}
      </button>
    </article>
  )
}

function AddMedicineForm({
  lang,
  onClose,
  onSave,
}: {
  lang: ReturnType<typeof useApp>['lang']
  onClose: () => void
  onSave: (m: Omit<Medicine, 'id' | 'taken'>) => void
}) {
  const [name, setName] = useState('')
  const [condition, setCondition] = useState('')
  condition: condition.trim() || '—',
dosage: dosage.trim() || '1 tablet',
  const [time, setTime] = useState('9:00 AM')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({
      name: name.trim(),
      condition: condition.trim() || '—',
      dosage: dosage.trim() || '1 tablet',
      times: [time.trim() || '9:00 AM'],
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
          <h2 className="text-lg font-extrabold text-foreground">
            {tr('addManually', lang)}
          </h2>
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
          <Field label={tr('medicineName', lang)}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              placeholder={tr("medicineName", lang)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary"
            />
          </Field>
          <Field label={tr('forCondition', lang)}>
            <input
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder={tr("forCondition", lang)}
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={tr('dosage', lang)}>
              <input
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary"
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
