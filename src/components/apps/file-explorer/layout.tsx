import type { ReactNode } from 'react'

export function FileExplorerLayout({
  header,
  sidebar,
  children,
}: {
  header: ReactNode
  sidebar: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex h-full flex-col bg-popover/50 text-sm text-popover-foreground">
      {header}
      <div className="flex min-h-0 grow">
        {sidebar}
        <div className="min-w-0 grow overflow-y-auto p-2">{children}</div>
      </div>
    </div>
  )
}
