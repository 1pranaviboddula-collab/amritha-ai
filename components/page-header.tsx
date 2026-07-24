'use client'

import { useState } from 'react'
import { Volume2, VolumeX, Languages } from 'lucide-react'
import { useApp } from '@/lib/store'
import { tr } from '@/lib/i18n'
import { speak, stopSpeaking, speechSupported } from '@/lib/speech'
import { cn } from '@/lib/utils'

export function PageHeader({
  title,
  subtitle,
  readText,
  accent = 'plain',
}: {
  title: string
  subtitle?: string
  readText?: string
  accent?: 'plain' | 'greeting'
}) {
  const { lang, cycleLang } = useApp()
  const [speaking, setSpeaking] = useState(false)

  const handleRead = () => {
    if (!speechSupported()) return
    if (speaking) {
      stopSpeaking()
      setSpeaking(false)
      return
    }
    const text = readText ?? `${title}. ${subtitle ?? ''}`
    setSpeaking(true)
    speak(text, lang, () => setSpeaking(false))
  }

  return (
    <header className="flex items-start justify-between gap-3 pt-2">
      <div className="min-w-0">
        <h1
          className={cn(
            'text-pretty font-extrabold leading-tight text-foreground',
            accent === 'greeting' ? 'text-3xl' : 'text-2xl',
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-base text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={handleRead}
          aria-label={tr('readAloud', lang)}
          aria-pressed={speaking}
          className={cn(
            'flex size-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors',
            speaking && 'border-primary bg-primary text-primary-foreground',
          )}
        >
          {speaking ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
        <button
          type="button"
          onClick={cycleLang}
          aria-label={tr('language', lang)}
          className="flex h-12 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-foreground shadow-sm"
        >
          <Languages className="size-5" />
          <span className="text-sm font-bold">
            {lang === 'en' ? 'EN' : lang === 'hi' ? 'हि' : 'తె'}
          </span>
        </button>
      </div>
    </header>
  )
}
