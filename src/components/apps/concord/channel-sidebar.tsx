import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down'
import { LockClosedRegular } from '@fluentui/react-icons/headless/svg/lock-closed'
import { NumberSymbolRegular } from '@fluentui/react-icons/headless/svg/number-symbol'
import { Speaker2Regular } from '@fluentui/react-icons/headless/svg/speaker'
import type { ComponentProps } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useLocale from '@/hooks/useLocale'
import type { Channel, Server } from '@/lib/concord/types'
import { cn } from '@/lib/utils'

function ChannelIcon({ channel }: { channel: Channel }) {
  const className = 'size-5 shrink-0'
  if (channel.type === 'voice') return <Speaker2Regular className={className} />
  return channel.locked ? (
    <LockClosedRegular className={className} />
  ) : (
    <NumberSymbolRegular className={className} />
  )
}

function ChannelButton({
  channel,
  active,
  onOpen,
  ...props
}: ComponentProps<'button'> & {
  channel: Channel
  active: boolean
  onOpen: (channelId: string) => void
}) {
  const locked = channel.type === 'text' && channel.locked
  const disabled = channel.type === 'voice' || locked

  return (
    <button
      {...props}
      type="button"
      aria-disabled={disabled || undefined}
      aria-current={active ? 'page' : undefined}
      onClick={disabled ? undefined : () => onOpen(channel.id)}
      className={cn(
        'flex w-full items-center gap-1.5 rounded-sm px-2 py-1.5 text-left',
        active
          ? 'bg-accent/30'
          : 'text-muted-foreground hover:bg-accent/20 hover:text-popover-foreground',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        locked && 'opacity-50',
      )}
    >
      <ChannelIcon channel={channel} />
      <span className="truncate">{channel.name}</span>
    </button>
  )
}

function ChannelList({
  channels,
  current,
  onSelect,
}: {
  channels: Channel[]
  current: string | null
  onSelect: (channelId: string) => void
}) {
  const locale = useLocale()

  return (
    <ul className="flex flex-col gap-0.5">
      {channels.map((channel) => {
        const button = (
          <ChannelButton
            channel={channel}
            active={channel.id === current}
            onOpen={onSelect}
          />
        )
        return (
          <li key={channel.id}>
            {channel.type === 'voice' ? (
              <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  {locale.text('concord_voice_unavailable')}
                </TooltipContent>
              </Tooltip>
            ) : (
              button
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function ChannelSidebar({
  server,
  current,
  onSelect,
  className,
}: {
  server: Server
  current: string | null
  onSelect: (channelId: string) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col border-l border-muted-foreground/30',
        className,
      )}
    >
      <h2 className="flex h-14 shrink-0 items-center border-b border-muted-foreground/30 px-4 font-semibold">
        <span className="truncate">{server.name}</span>
      </h2>
      <div className="min-h-0 grow overflow-y-auto p-2">
        {server.categories.map((category) =>
          category.name === null ? (
            <ChannelList
              key={category.id}
              channels={category.channels}
              current={current}
              onSelect={onSelect}
            />
          ) : (
            <Collapsible
              key={category.id}
              defaultOpen
              className="group/category mt-4 first:mt-0"
            >
              <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-1 px-1 py-1 text-xs font-semibold text-muted-foreground hover:text-popover-foreground pointer-coarse:min-h-8">
                <ChevronDownRegular className="size-3 shrink-0 transition-transform group-data-[state=closed]/category:-rotate-90" />
                <span className="truncate">{category.name}</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ChannelList
                  channels={category.channels}
                  current={current}
                  onSelect={onSelect}
                />
              </CollapsibleContent>
            </Collapsible>
          ),
        )}
      </div>
    </div>
  )
}
