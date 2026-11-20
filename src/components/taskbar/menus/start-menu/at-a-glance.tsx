import { LocationRegular } from '@fluentui/react-icons/headless/svg/location'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { resume } from '@/data/personal'
import useLocalize from '@/hooks/useLocalize'

const currentYear = new Date().getFullYear()

function Timeline() {
  const localize = useLocalize()
  const milestones = [
    ...resume.education.map((entry) => ({
      start: entry.start,
      title: entry.institution.split(' - ')[0],
      detail: `${entry.institution} · ${localize(entry.degree)}`,
    })),
    ...resume.experience.map((entry) => ({
      start: entry.period.start,
      title: entry.company,
      detail: `${localize(entry.role)} · ${entry.company}`,
    })),
  ].toSorted((a, b) => a.start.getTime() - b.start.getTime())

  return (
    <ol className="relative flex border-t border-muted-foreground/20 pt-3">
      <span
        aria-hidden
        className="absolute top-[2.6rem] right-6 left-6 h-px bg-muted-foreground/40"
      />
      {milestones.map((milestone) => (
        <li
          key={`${milestone.title}-${milestone.start.getTime()}`}
          className="flex min-w-0 flex-1 flex-col items-center"
        >
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="flex w-full flex-col items-center gap-1.5">
                <span className="text-xs text-muted-foreground">
                  {milestone.start.getFullYear()}
                </span>
                <span className="relative size-2.5 rounded-full border-2 border-accent bg-popover" />
                <span className="w-full truncate px-1 text-center text-xs">
                  {milestone.title}
                </span>
                <span className="sr-only">{milestone.detail}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>{milestone.detail}</TooltipContent>
          </Tooltip>
        </li>
      ))}
      <li className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
        <span className="text-xs text-muted-foreground">{currentYear}</span>
        <span className="relative flex size-2.5">
          <span className="relative inline-flex size-full rounded-full bg-accent" />
        </span>
        <span className="text-xs font-semibold">
          {localize('start_menu_now')}
        </span>
      </li>
    </ol>
  )
}

export function AtAGlance() {
  const localize = useLocalize()
  return (
    <article className="flex flex-col gap-1.5 rounded-md border bg-popover/40 px-4 py-3">
      <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {localize('start_menu_at_a_glance')}
      </h2>
      <p className="text-sm leading-relaxed">{localize('start_menu_bio')}</p>
      <p className="mb-1.5 flex items-center gap-1 text-xs text-muted-foreground">
        <LocationRegular className="size-3.5" />
        {localize('tunisia')} → {localize('france')}
      </p>
      <Timeline />
    </article>
  )
}
