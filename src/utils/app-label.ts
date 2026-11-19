import { isAppLabel } from '@/lib/apps'
import type { AppLabel } from '@/lib/apps'

// Terminal input is case-insensitive and accepts an optional `.exe` suffix.
export function parseAppLabel(raw: string | undefined): AppLabel | undefined {
  const normalized = raw?.toLowerCase().replace(/\.exe$/, '')
  return normalized && isAppLabel(normalized) ? normalized : undefined
}
