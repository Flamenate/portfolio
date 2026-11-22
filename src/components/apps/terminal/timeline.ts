import type { Period, TechnologyStack } from '@/data/personal'

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

export function joinTechStack({
  frontend,
  backend,
  databases,
}: TechnologyStack) {
  // A tool can belong to several categories (e.g. a full-stack framework).
  return [...new Set([...frontend, ...backend, ...databases])].join(', ')
}
