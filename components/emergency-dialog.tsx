'use client'

import { useEffect, useState } from 'react'
import { Phone, X, MapPin, Siren } from 'lucide-react'
import { useApp } from '@/lib/store'
import { tr } from '@/lib/i18n'
import { speak } from '@/lib/speech'

export function EmergencyCard() {
  const { lang, contacts } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          speak(tr('callHelp', lang), lang)
        }}
        className="flex w-full items-center gap-4 rounded-3xl bg-destructive px-5 py-5 text-left text-primary-foreground shadow-lg shadow-destructive/25 transition-transform active:scale-[0.98]"
      >
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/80">
            {tr('emergency', lang)}
          </p>
          <p className="text-xl font-extrabold leading-tight">{tr('callHelp', lang)}</p>
          <p className="mt-0.5 text-sm text-primary-foreground/85">
            {tr('emergencyDesc', lang)}
          </p>
        </div>
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20">
          <Phone className="size-7" />
        </span>
      </button>

      {open && <EmergencySheet contacts={contacts} lang={lang} onClose={() => setOpen(false)} />}
    </>
  )
}

function EmergencySheet({
  contacts,
  lang,
  onClose,
}: {
  contacts: ReturnType<typeof useApp>['contacts']
  lang: ReturnType<typeof useApp>['lang']
  onClose: () => void
}) {
  const [count, setCount] = useState(5)

  useEffect(() => {
    if (count <= 0) return
    const timer = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count])

  const primary = contacts[0]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-3"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-destructive">
            <Siren className="size-6" />
            <h2 className="text-lg font-extrabold">{tr('emergency', lang)}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={tr('cancel', lang)}
            className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
          <MapPin className="size-5 shrink-0 text-primary" />
          <span>Sharing your live location with your caregiver.</span>
        </div>

        {count > 0 ? (
          <p className="mt-4 text-center text-base font-semibold text-foreground">
            Calling {primary.name} in{' '}
            <span className="text-destructive">{count}</span>…
          </p>
        ) : (
          <p className="mt-4 text-center text-base font-semibold text-destructive">
            Connecting to {primary.name}…
          </p>
        )}

        <div className="mt-4 flex flex-col gap-2">
          {contacts.map((c) => (
            <a
              key={c.id}
              href={`tel:${c.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3"
            >
              <span>
                <span className="block font-bold text-foreground">{c.name}</span>
                <span className="block text-sm text-muted-foreground">{c.phone}</span>
              </span>
              <span className="flex size-11 items-center justify-center rounded-full bg-destructive text-primary-foreground">
                <Phone className="size-5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
