import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useLocalize from '@/hooks/useLocalize'
import WindowsShortcut from '../../windows-shortcut'
import { AtAGlance } from './at-a-glance'
import { StartMenuFooter } from './footer'
import { LiveTiles } from './live-tiles'
import { QuickActions } from './quick-actions'
import { Recommended } from './recommended'

export function StartMenu() {
  const localize = useLocalize()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <WindowsShortcut aria-label={localize('start')} />
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>{localize('start')}</TooltipContent>
      </Tooltip>
      <PopoverContent>
        {/* 80px keeps the menu clear of the taskbar and the screen's top edge. */}
        <section className="flex h-[min(720px,calc(100dvh-80px))] w-[min(680px,calc(100vw-1rem))] flex-col rounded-sm">
          <div className="flex min-h-0 grow flex-col gap-4 overflow-y-auto px-8 pt-5 pb-4">
            <AtAGlance />
            <LiveTiles />
            <QuickActions onAction={close} />
            <Recommended onAction={close} />
          </div>
          <StartMenuFooter onAction={close} />
        </section>
      </PopoverContent>
    </Popover>
  )
}
