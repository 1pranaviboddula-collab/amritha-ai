'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Pill, Calendar, User, Mic } from 'lucide-react'
import { useApp } from '@/lib/store'
import { tr } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const items = [
  { href: '/', key: 'home', icon: Home },
  { href: '/medicines', key: 'medicines', icon: Pill },
  { href: '/visits', key: 'visits', icon: Calendar },
  { href: '/profile', key: 'profile', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()
  const { lang } = useApp()

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-md items-end justify-around border-t border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur"
    >
      {items.slice(0, 2).map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} lang={lang} />
      ))}

      <Link
        href="/assistant"
        aria-label={tr('assistant', lang)}
        className="relative -mt-8 flex flex-col items-center"
      >
        <span
          className={cn(
            'flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background transition-transform active:scale-95',
            pathname === '/assistant' && 'ring-primary/30',
          )}
        >
          <Mic className="size-7" />
        </span>
      </Link>

      {items.slice(2).map((item) => (
        <NavLink key={item.href} item={item} pathname={pathname} lang={lang} />
      ))}
    </nav>
  )
}

function NavLink({
  item,
  pathname,
  lang,
}: {
  item: { href: string; key: string; icon: typeof Home }
  pathname: string
  lang: ReturnType<typeof useApp>['lang']
}) {
  const active = pathname === item.href
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      className={cn(
        'flex w-16 flex-col items-center gap-1 rounded-lg py-1 text-xs font-semibold transition-colors',
        active ? 'text-primary' : 'text-muted-foreground',
      )}
      aria-current={active ? 'page' : undefined}
    >
      <Icon className="size-6" />
      <span>{tr(item.key, lang)}</span>
    </Link>
  )
}
