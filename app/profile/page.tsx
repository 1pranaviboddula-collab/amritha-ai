'use client'
import { TranslatedText } from "@/components/ui/TranslatedText";
import { Phone, HeartPulse, Droplet, User, Type, Globe, Check } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { PageHeader } from '@/components/page-header'
import { useApp } from '@/lib/store'
import { tr, LANGUAGES, type Lang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const {
    lang,
    profile,
    contacts,
    largeText,
    toggleLargeText,
    setLang,
  } = useApp()

  return (
    <AppShell>
      <PageHeader
        title={tr('profile', lang)}
        readText={`${profile.name}, ${tr('age', lang)} ${profile.age}, ${tr(
          'bloodGroup',
          lang,
        )} ${profile.bloodGroup}`}
      />

      <div className="mt-5 flex items-center gap-4 rounded-3xl bg-card p-5 shadow-sm">
        <span className="flex size-16 items-center justify-center rounded-full bg-tint-blue text-tint-blue-foreground">
          <User className="size-8" />
        </span>
        <div>
          <h2 className="text-xl font-extrabold text-foreground">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">
            {tr('age', lang)} {profile.age} · {tr('bloodGroup', lang)} {profile.bloodGroup}
          </p>
        </div>
      </div>

      {/* Health info */}
      <Section title={tr('healthInfo', lang)}>
        <div className="flex flex-col gap-3 rounded-3xl bg-card p-4 shadow-sm">
          <Row icon={HeartPulse} tint="rose" label={tr('conditions', lang)}>
            <div className="flex flex-wrap gap-2">
              {profile.conditions.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-muted px-3 py-1 text-sm font-semibold text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </Row>
          <Row icon={Droplet} tint="teal" label={tr('bloodGroup', lang)}>
            <span className="text-base font-bold text-foreground">{profile.bloodGroup}</span>
          </Row>
        </div>
      </Section>

      {/* Emergency contacts */}
      <Section title={tr('emergencyContacts', lang)}>
        <div className="flex flex-col gap-2">
          {contacts.map((c) => (
            <a
              key={c.id}
              href={`tel:${c.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-between rounded-3xl bg-card px-4 py-3 shadow-sm active:scale-[0.98]"
            >
              <span>
                <span className="block font-bold text-foreground">{c.name}</span>
                <span className="block text-sm text-muted-foreground">{c.phone}</span>
              </span>
              <span className="flex size-11 items-center justify-center rounded-full bg-tint-green text-tint-green-foreground">
                <Phone className="size-5" />
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* Settings */}
      <Section title={tr('settings', lang)}>
        <div className="flex flex-col gap-3 rounded-3xl bg-card p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-tint-blue text-tint-blue-foreground">
              <Globe className="size-5" />
            </span>
            <div className="flex-1">
              <p className="mb-2 font-bold text-foreground">{tr('language', lang)}</p>
              <div className="grid max-h-80 grid-cols-2 gap-2 overflow-y-auto">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code as Lang)}
                    className={cn(
                      'rounded-2xl border py-2.5 text-sm font-bold transition-colors',
                      lang === l.code
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-background text-foreground',
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleLargeText}
            className="flex items-center gap-3 rounded-2xl bg-background px-3 py-3 text-left"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-tint-amber text-tint-amber-foreground">
              <Type className="size-5" />
            </span>
            <span className="flex-1 font-bold text-foreground">{tr('largeText', lang)}</span>
            <span
              className={cn(
                'flex h-7 w-12 items-center rounded-full p-1 transition-colors',
                largeText ? 'justify-end bg-primary' : 'justify-start bg-muted',
              )}
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-card text-primary">
                {largeText && <Check className="size-3.5" />}
              </span>
            </span>
          </button>
        </div>
      </Section>
    </AppShell>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({
  icon: Icon,
  tint,
  label,
  children,
}: {
  icon: typeof HeartPulse
  tint: string
  label: string
  children: React.ReactNode
}) {
  const tintClass: Record<string, string> = {
    rose: 'bg-tint-rose text-tint-rose-foreground',
    teal: 'bg-tint-teal text-tint-teal-foreground',
  }
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-2xl',
          tintClass[tint],
        )}
      >
        <Icon className="size-5" />
      </span>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  )
}
