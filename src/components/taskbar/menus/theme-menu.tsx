import { DarkThemeRegular } from '@fluentui/react-icons/headless/svg/dark-theme'
import { WeatherMoonRegular } from '@fluentui/react-icons/headless/svg/weather-moon'
import { WeatherSunnyRegular } from '@fluentui/react-icons/headless/svg/weather-sunny'
import { useShallow } from 'zustand/react/shallow'
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
import useLocale from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import useThemeStore, {
  paletteDescriptions,
  localeDescriptions,
  locales,
} from '@/stores/theme.store'
import type { Locale, Palette } from '@/stores/theme.store'

function PaletteIcon({ palette, size }: { palette: Palette; size?: number }) {
  const style = { width: size ?? 24, height: size ?? 24 }
  switch (palette) {
    case 'light':
      return <WeatherSunnyRegular style={style} />
    case 'dark':
      return <WeatherMoonRegular style={style} />
    case 'system':
      return <DarkThemeRegular style={style} />
  }
}

function LocaleItem({
  locale,
  selected,
  onClick,
}: {
  locale: Locale
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      className={cn(
        'relative flex w-full items-center gap-2 rounded-sm hover-shade px-3 py-1 text-left select-none',
        selected && 'bg-accent/15',
      )}
      onClick={onClick}
      type="button"
    >
      {selected && (
        <div className="absolute top-1/2 left-px h-6 w-1 -translate-y-1/2 rounded-full bg-accent-foreground" />
      )}
      <span className="w-8 text-xs uppercase">{locale}</span>
      <p>
        <span className="text-xs">{locales[locale]}</span>
        <br />
        <span className="text-xs text-nowrap text-muted-foreground">
          {localeDescriptions[locale]}
        </span>
      </p>
    </button>
  )
}

function PalettePill({
  palette,
  selected,
  onClick,
}: {
  palette: Palette
  selected: boolean
  onClick: () => void
}) {
  const locale = useLocale()
  return (
    <button
      className={cn(
        'relative flex items-center gap-2 rounded-sm hover-shade px-3 py-1 text-left capitalize select-none',
        selected && 'bg-accent/15',
      )}
      onClick={onClick}
      type="button"
    >
      {selected && (
        <div className="absolute top-1/2 left-px h-6 w-1 -translate-y-1/2 rounded-full bg-accent-foreground" />
      )}
      <span className="w-8">
        <PaletteIcon palette={palette} size={20} />
      </span>
      <p>
        <span className="text-xs">{locale.text(palette)}</span>
        <br />
        <span className="text-xs text-nowrap text-muted-foreground">
          {paletteDescriptions[palette]}
        </span>
      </p>
    </button>
  )
}

export function ThemeMenu() {
  const [palette, setLocale, setPalette] = useThemeStore(
    useShallow((state) => [state.palette, state.setLocale, state.setPalette]),
  )
  const locale = useLocale()
  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="flex flex-col items-center justify-center gap-1.5 px-3.5 py-1 uppercase"
              aria-label={`${locale.text('locale')}: ${locales[locale.code]}. ${locale.text('theme')}: ${locale.text(palette)}`}
            >
              <span className="text-xs">{locale.code}</span>
              <PaletteIcon palette={palette} size={18} />
            </button>
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>
          <p>
            <span className="font-bold">{locale.text('locale')}:</span>
            <span> {locales[locale.code]}</span>
            <br />
            <span className="font-bold">{locale.text('theme')}:</span>
            <span className="capitalize"> {locale.text(palette)}</span>
          </p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent sideOffset={12} className="w-90 border-none">
        <div className="mb-1 rounded-sm border border-border p-1.5 text-sm">
          <p className="px-1.5 py-2 font-medium">{locale.text('locale')}</p>
          <div className="flex flex-col gap-1">
            {(Object.keys(locales) as Locale[]).map((loc) => (
              <LocaleItem
                key={loc}
                locale={loc}
                selected={loc === locale.code}
                onClick={() => setLocale(loc)}
              />
            ))}
          </div>
        </div>
        <div className="rounded-sm border border-border p-1.5 text-sm">
          <p className="px-1.5 py-2 font-medium">{locale.text('theme')}</p>
          <div className="flex flex-col gap-1">
            {(Object.keys(paletteDescriptions) as Palette[]).map((pal) => (
              <PalettePill
                key={pal}
                palette={pal}
                selected={pal === palette}
                onClick={() => setPalette(pal)}
              />
            ))}
          </div>
        </div>
        {/* <div className="flex w-90 flex-col px-1.5 py-2 text-sm">
        </div> */}
      </PopoverContent>
    </Popover>
  )
}
