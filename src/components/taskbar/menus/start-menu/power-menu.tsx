import { ArrowClockwiseRegular } from '@fluentui/react-icons/headless/svg/arrow-clockwise'
import { LockClosedRegular } from '@fluentui/react-icons/headless/svg/lock-closed'
import { PowerRegular } from '@fluentui/react-icons/headless/svg/power'
import { useNavigate } from '@tanstack/react-router'
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
import { clearSignedIn } from '@/lib/sign-in'
import { useAppStore } from '@/stores/app.store'
import { useNotificationStore } from '@/stores/notification.store'

export function PowerMenu({ onAction }: { onAction: () => void }) {
  const localize = useLocalize()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // Windows live in a global store, so they are still there after a Lock.
  const lock = () => navigate({ to: '/' })
  // Without the Sign-in cookie, the welcome screen greets a first visit again.
  const restart = () => {
    useAppStore.getState().closeAllApps()
    clearSignedIn()
    navigate({ to: '/' })
  }
  const shutDown = () =>
    useNotificationStore.getState().addSystemNotification({
      content: 'shut_down_refused',
      subcontent: 'shut_down_refused_description',
    })

  const items = [
    { key: 'lock', icon: LockClosedRegular, run: lock },
    { key: 'restart', icon: ArrowClockwiseRegular, run: restart },
    { key: 'shut_down', icon: PowerRegular, run: shutDown },
  ] as const

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip delayDuration={300}>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={localize('power')}
              className="rounded-sm hover-shade p-3"
            >
              <PowerRegular className="size-6" />
            </button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>{localize('power')}</TooltipContent>
      </Tooltip>
      <PopoverContent side="top" align="end" className="w-44 p-1">
        <ul className="flex flex-col">
          {items.map(({ key, icon: Icon, run }) => (
            <li key={key}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-sm hover-shade px-3 py-2 text-sm"
                onClick={() => {
                  setOpen(false)
                  onAction()
                  run()
                }}
              >
                <Icon className="size-4.5" />
                {localize(key)}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
