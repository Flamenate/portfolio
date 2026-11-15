/* oxlint-disable no-shadow */
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down'
import { ChevronLeftRegular } from '@fluentui/react-icons/headless/svg/chevron-left'
import { ChevronRightRegular } from '@fluentui/react-icons/headless/svg/chevron-right'
import { useEffect, useRef } from 'react'
import type { ComponentProps } from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import type { DayButton } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: ComponentProps<typeof DayPicker> & {
  buttonVariant?: ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      animate
      fixedWeeks
      showOutsideDays={showOutsideDays}
      className={cn('group/calendar p-3 [--cell-size:--spacing(6)]', className)}
      captionLayout="label"
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months,
        ),
        month: cn('flex w-full flex-col gap-3', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          // buttonVariants({ variant: buttonVariant }),
          defaultClassNames.button_previous,
          'inline-flex size-(--cell-size) shrink-0 items-center justify-center rounded-sm hover-shade p-0 outline-none select-none aria-disabled:opacity-50',
        ),
        button_next: cn(
          // buttonVariants({ variant: buttonVariant }),
          defaultClassNames.button_next,
          'inline-flex size-(--cell-size) shrink-0 items-center justify-center rounded-sm hover-shade p-0 outline-none select-none aria-disabled:opacity-50',
        ),
        month_caption: cn(
          'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
          defaultClassNames.month_caption,
        ),
        caption_label: cn(
          'text-sm font-medium select-none',
          defaultClassNames.caption_label,
        ),
        // table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 rounded-md text-[0.8rem] font-normal text-muted-foreground select-none',
          defaultClassNames.weekday,
        ),
        week: cn('mt-1 flex w-full', defaultClassNames.week),
        day: cn(
          'group/day relative aspect-square h-full w-full p-0 text-center select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-md bg-accent',
          defaultClassNames.range_start,
        ),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(
          'rounded-full bg-accent text-primary-foreground',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-muted-foreground opacity-50',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, style }) => {
          const iconClass = cn('size-4', className)
          if (orientation === 'left') {
            return <ChevronLeftRegular className={iconClass} style={style} />
          }

          if (orientation === 'right') {
            return <ChevronRightRegular className={iconClass} style={style} />
          }

          return <ChevronDownRegular className={iconClass} style={style} />
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected}
      className={cn(
        'flex aspect-square h-auto w-full min-w-(--cell-size) rounded-full leading-none font-normal hover:bg-accent/25 hover:text-primary data-[selected-single=true]:bg-accent-foreground data-[selected-single=true]:text-primary-foreground',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
