import { BluetoothRegular } from '@fluentui/react-icons/headless/svg/bluetooth'
import { FullScreenMaximizeRegular } from '@fluentui/react-icons/headless/svg/full-screen-maximize'
import { ProhibitedRegular } from '@fluentui/react-icons/headless/svg/prohibited'
import { ShareRegular } from '@fluentui/react-icons/headless/svg/share'
import { WeatherSunnyRegular } from '@fluentui/react-icons/headless/svg/weather-sunny'
import { Wifi1Regular } from '@fluentui/react-icons/headless/svg/wifi'
import { useEffect, useRef, useSyncExternalStore, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Battery } from '@/components/SVGs/battery'
import Chromium from '@/components/SVGs/chromium'
import { Volume } from '@/components/SVGs/volume'
import { Wifi } from '@/components/SVGs/wifi'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Slider } from '@/components/ui/slider'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { env } from '@/env'
import { useAudio } from '@/hooks/useAudio'
import { useBattery } from '@/hooks/useBattery'
import { useConnectionType } from '@/hooks/useConnectionType'
import { useIsFullscreen } from '@/hooks/useIsFullscreen'
import useLocalize from '@/hooks/useLocalize'
import { cn } from '@/lib/utils'
import { useNotificationStore } from '@/stores/notification.store'
import useThemeStore from '@/stores/theme.store'

type ClientFlags = {
  canShare: boolean
  isChromium: boolean
  canFullscreen: boolean
}

const serverClientFlags: ClientFlags = {
  canShare: false,
  isChromium: false,
  canFullscreen: false,
}

let cachedClientFlags: ClientFlags | null = null

function readClientFlags(): ClientFlags {
  if (cachedClientFlags) return cachedClientFlags
  cachedClientFlags = {
    canShare:
      'canShare' in navigator && navigator.canShare({ url: env.VITE_DOMAIN }),
    isChromium: 'chrome' in window,
    canFullscreen: document.fullscreenEnabled,
  }
  return cachedClientFlags
}

function subscribeClientFlags() {
  return () => {}
}

function UtilityPill({
  icon,
  label,
  activated,
  disabled,
  onClick,
  className,
}: {
  icon: React.ReactNode
  label: string
  activated?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      className={cn(
        `flex w-24 flex-col gap-1.5 ${disabled ? 'opacity-50' : ''}`,
        className,
      )}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      <div
        className={`${activated ? 'dark:text- bg-accent text-accent dark:bg-accent-foreground' : 'bg-popover text-(--white)'} ${!disabled ? 'hover-shade active:bg-accent-foreground/40' : ''} flex h-12 items-center justify-center rounded-sm border shadow`}
      >
        <span
          className={`${activated ? 'text-(--white)' : 'text-accent-foreground'}`}
        >
          {icon}
        </span>
      </div>
      <span className="truncate text-center align-baseline text-xs select-none">
        {label}
      </span>
    </button>
  )
}

export function UtilityMenu() {
  const { isFullscreen, toggleFullScreen } = useIsFullscreen()

  const battery = useBattery()

  const [volume, setVolume] = useThemeStore(
    useShallow((state) => [state.volume, state.setVolume]),
  )
  const lastAudibleVolume = useRef(volume || 75)
  const [previewVolume, setPreviewVolume] = useState<number | null>(null)
  const shownVolume = previewVolume ?? volume
  const alertAudio = useAudio('/audio/notification.wav')
  useEffect(() => {
    if (volume > 0) lastAudibleVolume.current = volume
  }, [volume])
  const muteVolume = () => {
    setPreviewVolume(null)
    setVolume(0)
  }
  const unmuteVolume = () => {
    const restored = lastAudibleVolume.current || 75
    setPreviewVolume(null)
    setVolume(restored)
    alertAudio.play({ forceVolume: restored })
  }

  const connectionType = useConnectionType()
  const localize = useLocalize()
  const clientFlags = useSyncExternalStore(
    subscribeClientFlags,
    readClientFlags,
    () => serverClientFlags,
  )

  const { doNotDisturb, toggleDoNotDisturb } = useNotificationStore(
    useShallow((state) => ({
      doNotDisturb: state.doNotDisturb,
      toggleDoNotDisturb: state.toggleDoNotDisturb,
    })),
  )
  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="flex flex-row-reverse items-center gap-1.5 px-2"
              aria-label={`${localize('battery_status')}: ${battery.level}%. ${localize('volume')}: ${volume}%`}
            >
              <span className="grid size-6 place-items-center">
                <Battery
                  batteryLevel={battery.level}
                  isCharging={battery.isCharging}
                />
              </span>
              <span className="grid size-6 place-items-center">
                <Volume volume={volume} />
              </span>
              <span className="grid size-6 place-items-center">
                <Wifi connectionType={connectionType} />
              </span>
            </button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>
          {localize('battery_status')}: {battery.level}% {localize('remaining')}
          <br />
          {localize('volume')}: {volume}%
          <br />
          {connectionType?.toUpperCase() || '4G'}
        </TooltipContent>
      </Tooltip>
      <PopoverContent sideOffset={12} className="mr-1">
        <div className="flex w-90 flex-col justify-center *:px-3">
          <div className="flex flex-wrap items-end justify-center gap-3.5 py-4">
            <UtilityPill
              icon={<Wifi1Regular className="mb-1.5 size-4.5" />}
              label={`${connectionType?.toUpperCase() ?? ''} Internet`}
              activated={connectionType !== null}
              className="self-center"
            />
            <UtilityPill
              icon={<BluetoothRegular className="size-4.5" />}
              label="Bluetooth"
              disabled
              activated
            />
            <UtilityPill
              icon={<ProhibitedRegular className="size-4.5" />}
              label={localize('dnd')}
              activated={doNotDisturb}
              onClick={toggleDoNotDisturb}
            />

            <UtilityPill
              icon={<Chromium />}
              label={localize('using_chromium')}
              activated={clientFlags.isChromium}
              disabled
            />
            <UtilityPill
              icon={<ShareRegular className="size-4.5" />}
              label={localize('share')}
              disabled={!clientFlags.canShare}
              onClick={() => {
                navigator.share({
                  title: 'Haythem Frikha',
                  text: "Check out Haythem Frikha's portfolio!",
                  url: env.VITE_DOMAIN,
                })
              }}
            />
            <UtilityPill
              icon={<FullScreenMaximizeRegular className="size-4.5" />}
              label={localize('fullscreen')}
              activated={isFullscreen}
              onClick={toggleFullScreen}
              disabled={!clientFlags.canFullscreen}
            />
          </div>
          <div className="flex flex-col gap-4 border-t py-4 pr-5!">
            <div className="flex justify-start">
              <button
                className="mr-1 flex items-center justify-center rounded-sm p-2"
                type="button"
                disabled
                aria-label={localize('theme')}
              >
                <WeatherSunnyRegular className="size-5" />
              </button>
              <Slider defaultValue={[100]} disabled />
            </div>
            <div className="flex justify-start">
              <button
                className="hover-shade mr-1 flex items-center justify-center rounded-sm p-2"
                aria-label={localize(volume === 0 ? 'volume' : 'mute')}
                onClick={() => {
                  if (volume === 0) {
                    unmuteVolume()
                  } else {
                    muteVolume()
                  }
                }}
                type="button"
              >
                <Volume volume={volume} size={20} />
              </button>
              <Slider
                value={[shownVolume]}
                max={100}
                step={1}
                onValueChange={([value]) => {
                  setPreviewVolume(value)
                }}
                onValueCommit={([value]) => {
                  setPreviewVolume(null)
                  setVolume(value)
                  alertAudio.play({ forceReplay: true, forceVolume: value })
                }}
              />
            </div>
          </div>
          <div className="rounded-b-md border-t py-1 backdrop-blur-xs select-none">
            <div className="hover-shade flex w-fit justify-baseline gap-1.5 rounded-sm p-2 text-xs">
              <Battery
                batteryLevel={battery.level}
                isCharging={battery.isCharging}
                size={18}
              />
              <span>
                {battery.level}%{' '}
                {battery.isCharging ? `(${localize('charging')})` : ''}
              </span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
