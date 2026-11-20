import { format } from 'date-fns'
import type { Period, TechnologyStack } from '@/data/personal'
import localize from '@/lib/localize'
import { datefnsLocales } from '@/stores/theme.store'
import type { Locale } from '@/stores/theme.store'

const FIRST_YEAR = 2020

// Out-of-range or non-numeric input means "no filter".
export function parseYearArg(arg: string | undefined): number | null {
  const year = parseInt(arg ?? '', 10)
  return isNaN(year) || year < FIRST_YEAR || year > new Date().getFullYear()
    ? null
    : year
}

export function overlapsYear({ start, end }: Period, year: number) {
  return start.getFullYear() <= year && (!end || end.getFullYear() >= year)
}

export function formatPeriod({ start, end }: Period, locale: Locale) {
  const formatMonth = (date: Date) =>
    format(date, 'MMM yyyy', { locale: datefnsLocales[locale] })
  return `${formatMonth(start)} - ${end ? formatMonth(end) : localize('present', locale)}`
}

export function joinTechStack({
  frontend,
  backend,
  databases,
}: TechnologyStack) {
  // A tool can belong to several categories (e.g. a full-stack framework).
  return [...new Set([...frontend, ...backend, ...databases])].join(', ')
}
