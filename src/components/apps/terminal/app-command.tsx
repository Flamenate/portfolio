import { isAppLabel } from '@/lib/apps'
import type { AppLabel } from '@/lib/apps'
import localize from '@/lib/localize'
import type { TranslationKey } from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'

type AppStoreState = ReturnType<typeof useAppStore.getState>

// Terminal input is case-insensitive and accepts an optional `.exe` suffix.
function parseAppLabel(raw: string | undefined): AppLabel | undefined {
  const normalized = raw?.toLowerCase().replace(/\.exe$/, '')
  return normalized && isAppLabel(normalized) ? normalized : undefined
}

export function appCommand({
  isApplied,
  apply,
  messages,
  showExe = false,
}: {
  isApplied: (state: AppStoreState, label: AppLabel) => boolean
  apply: (state: AppStoreState, label: AppLabel) => void
  messages: { alreadyApplied: TranslationKey; applied: TranslationKey }
  showExe?: boolean
}): Command {
  return ({ args, locale }) => {
    const label = parseAppLabel(args[0])
    if (!label) return <p>{localize('terminal_invalid_app', locale)}</p>

    const state = useAppStore.getState()
    if (isApplied(state, label)) {
      return <p>{localize(messages.alreadyApplied, locale, label)}</p>
    }

    apply(state, label)
    const name = showExe ? `${label}.exe` : label
    return <p>{localize(messages.applied, locale, name)}</p>
  }
}
