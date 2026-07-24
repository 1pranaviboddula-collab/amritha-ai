'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, Volume2, Square, Send, TriangleAlert } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { useApp } from '@/lib/store'
import { tr, LANGUAGES } from '@/lib/i18n'
import { getReply } from '@/lib/assistant'
import {
  speak,
  stopSpeaking,
  createRecognition,
  recognitionSupported,
} from '@/lib/speech'
import { cn } from '@/lib/utils'

type Message = { id: string; role: 'user' | 'assistant'; text: string }

export default function AssistantPage() {
  const { lang, medicines, visits, profile } = useApp()
  const [messages, setMessages] = useState<Message[]>([])
  const [listening, setListening] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const recRef = useRef<ReturnType<typeof createRecognition> | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const intro: Message = { id: 'intro', role: 'assistant', text: tr('intro', lang) }
  const allMessages = [intro, ...messages]

  const suggestions =
    lang === 'hi'
      ? [
          'मुझे बीपी की दवा कब लेनी चाहिए?',
          'सुबह से बुखार है।',
          'मेरे पैर में दर्द है।',
          'मैं सुबह की दवा भूल गया।',
        ]
      : lang === 'te'
        ? [
            'నా బీపీ మందు ఎప్పుడు తీసుకోవాలి?',
            'ఉదయం నుండి జ్వరం ఉంది.',
            'నా కాలు నొప్పిగా ఉంది.',
            'ఉదయం మందు మర్చిపోయాను.',
          ]
        : [
            'When should I take my BP medicine?',
            'I have fever since morning.',
            'My leg is hurting.',
            'I forgot my morning medicine.',
          ]

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => () => stopSpeaking(), [])

  const respond = async (text: string) => {
  const userMsg = {
    id: crypto.randomUUID(),
    role: "user" as const,
    text,
  };

  setMessages((m) => [...m, userMsg]);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  message: text,
  language: langLabel,
}),
    });

    const data = await res.json();

    const botMsg = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      text: data.reply,
    };

    setMessages((m) => [...m, botMsg]);

    setSpeakingId(botMsg.id);
    speak(data.reply, lang, () => setSpeakingId(null));
  } catch {
    const botMsg = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      text: "Sorry, something went wrong.",
    };

    setMessages((m) => [...m, botMsg]);
  }
};

  const startListening = () => {
    if (listening) {
      recRef.current?.stop()
      setListening(false)
      return
    }
    stopSpeaking()
    setSpeakingId(null)
    const rec = createRecognition(lang)
    if (!rec) {
      // No speech recognition — focus the text box instead
      document.getElementById('assistant-input')?.focus()
      return
    }
    recRef.current = rec
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      respond(transcript)
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    setListening(true)
    rec.start()
  }

  const playMessage = (msg: Message) => {
    if (speakingId === msg.id) {
      stopSpeaking()
      setSpeakingId(null)
      return
    }
    setSpeakingId(msg.id)
    speak(msg.text, lang, () => setSpeakingId(null))
  }

  const submitText = (e: React.FormEvent) => {
    e.preventDefault()
    const value = input.trim()
    if (!value) return
    respond(value)
    setInput('')
  }

  const langLabel = LANGUAGES.find((l) => l.code === lang)?.label ?? 'English'

  return (
    <AppShell>
      <PageHeader
        title={tr('voiceAssistant', lang)}
        subtitle={`${tr('speaking', lang)}: ${langLabel}`}
        readText={tr('intro', lang)}
      />

      <div className="mt-4 flex flex-col gap-3">
        {allMessages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start',
            )}
          >
            <div
              className={cn(
                'max-w-[85%] rounded-3xl px-4 py-3 text-base leading-relaxed shadow-sm',
                msg.role === 'user'
                  ? 'rounded-br-lg bg-primary text-primary-foreground'
                  : 'rounded-bl-lg bg-card text-foreground',
              )}
            >
              <p className="text-pretty">{msg.text}</p>
              {msg.role === 'assistant' && (
                <button
                  type="button"
                  onClick={() => playMessage(msg)}
                  className="mt-2 flex items-center gap-1.5 text-sm font-bold text-primary"
                >
                  {speakingId === msg.id ? (
                    <>
                      <Square className="size-4" /> {tr('stop', lang)}
                    </>
                  ) : (
                    <>
                      <Volume2 className="size-4" /> {tr('play', lang)}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {messages.length === 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {tr('tryAsking', lang)}
          </p>
          <div className="flex flex-col gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => respond(s)}
                className="rounded-2xl border border-border bg-card px-4 py-3 text-left text-base font-semibold text-foreground active:scale-[0.98]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={startListening}
          aria-pressed={listening}
          aria-label={tr('tapToSpeak', lang)}
          className={cn(
            'flex size-20 items-center justify-center rounded-full text-primary-foreground shadow-lg transition-transform active:scale-95',
            listening ? 'animate-pulse bg-destructive' : 'bg-primary',
          )}
        >
          <Mic className="size-9" />
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {listening ? tr('listening', lang) : tr('tapToSpeak', lang)}
        </span>
      </div>

      <form onSubmit={submitText} className="mt-4 flex items-center gap-2">
        <input
          id="assistant-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            recognitionSupported() ? 'Type a question…' : 'Type your question here…'
          }
          className="min-w-0 flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-base text-foreground outline-none focus:border-primary"
        />
        <button
          type="submit"
          aria-label={tr('play', lang)}
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground active:scale-95"
        >
          <Send className="size-5" />
        </button>
      </form>

      <p className="mt-5 flex items-start gap-2 rounded-2xl bg-tint-amber/60 px-4 py-3 text-sm leading-relaxed text-tint-amber-foreground">
        <TriangleAlert className="mt-0.5 size-5 shrink-0" />
        <span>{tr('disclaimer', lang)}</span>
      </p>
    </AppShell>
  )
}
