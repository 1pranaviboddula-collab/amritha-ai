import type { Lang } from './i18n'

const SPEECH_LOCALE: Record<Lang, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  pa: 'pa-IN',
  ur: 'ur-IN',
  or: 'or-IN',
  as: 'as-IN',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  ja: 'ja-JP',
  ko: 'ko-KR',
  zh: 'zh-CN',
  ar: 'ar-SA',
  pt: 'pt-PT',
  ru: 'ru-RU',
  it: 'it-IT',
}
export function speak(text: string, lang: Lang, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.()
    return
  }
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = SPEECH_LOCALE[lang]
  utter.rate = 0.95
  utter.pitch = 1
  const voices = window.speechSynthesis.getVoices()
  const locale = SPEECH_LOCALE[lang]

const match =
  voices.find((v) => v.lang === locale) ||
  voices.find((v) => v.lang.startsWith(lang)) ||
  voices.find((v) => v.lang.startsWith(locale.split('-')[0]))
  if (match) utter.voice = match
  utter.onend = () => onEnd?.()
  utter.onerror = () => onEnd?.()
  window.speechSynthesis.speak(utter)
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

type SpeechRecognitionLike = {
  lang: string
  interimResults: boolean
  continuous: boolean
  onresult: ((e: { results: { 0: { transcript: string } }[] }) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
}

export function createRecognition(lang: Lang): SpeechRecognitionLike | null {
  if (typeof window === 'undefined') return null
  const Ctor =
    (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: unknown })
      .webkitSpeechRecognition
  if (!Ctor) return null
  const rec = new (Ctor as new () => SpeechRecognitionLike)()
  rec.lang = SPEECH_LOCALE[lang]
  rec.interimResults = false
  rec.continuous = false
  return rec
}

export function recognitionSupported() {
  if (typeof window === 'undefined') return false
  return Boolean(
    (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition,
  )
}
