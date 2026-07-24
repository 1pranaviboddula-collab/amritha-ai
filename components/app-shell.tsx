'use client'

import type { ReactNode } from 'react'
import { BottomNav } from './bottom-nav'
import { useApp } from '@/lib/store'

export function AppShell({ children }: { children: ReactNode }) {
  const { hydrated } = useApp()

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-background">
      <main className="flex-1 px-4 pb-28 pt-3">
        {hydrated ? (
          children
        ) : (
          <div
            className="flex min-h-[60svh] items-center justify-center text-muted-foreground"
            aria-busy="true"
          >
            <span className="sr-only">Loading</span>
            <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
