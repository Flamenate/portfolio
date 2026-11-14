import { ArrowLeftRegular } from '@fluentui/react-icons/headless/svg/arrow-left'
import { ArrowRightRegular } from '@fluentui/react-icons/headless/svg/arrow-right'
import { ChevronRightRegular } from '@fluentui/react-icons/headless/svg/chevron-right'
import { Fragment } from 'react'
import type { ComponentProps } from 'react'
import { useShallow } from 'zustand/react/shallow'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useLocalize from '@/hooks/useLocalize'
import { root } from '@/lib/directories'
import type { FolderPath } from '@/lib/directories'
import { cn } from '@/lib/utils'
import { useExplorerStore } from '@/stores/explorer.store'

function NavButton({
  label,
  ...props
}: ComponentProps<'button'> & { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="flex size-10.5 cursor-pointer items-center justify-center rounded-sm hover-shade disabled:cursor-default disabled:opacity-40"
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent sideOffset={4}>{label}</TooltipContent>
    </Tooltip>
  )
}

export function NavigationBar({ path }: { path: FolderPath }) {
  const localize = useLocalize()
  const { canGoBack, canGoForward, back, forward, navigate } = useExplorerStore(
    useShallow((state) => ({
      canGoBack: state.index > 0,
      canGoForward: state.index < state.entries.length - 1,
      back: state.back,
      forward: state.forward,
      navigate: state.navigate,
    })),
  )

  const crumbs = [root.name, ...path]

  return (
    <header className="flex h-14 shrink-0 items-center gap-1 border-b border-muted-foreground/50 p-1">
      <NavButton label={localize('back')} disabled={!canGoBack} onClick={back}>
        <ArrowLeftRegular
          className={`size-4 ${canGoBack && 'text-foreground dark:text-(--white)'}`}
        />
      </NavButton>
      <NavButton
        label={localize('forward')}
        disabled={!canGoForward}
        onClick={forward}
      >
        <ArrowRightRegular
          className={`size-4 ${canGoForward && 'text-foreground dark:text-(--white)'}`}
        />
      </NavButton>
      <nav
        aria-label="Breadcrumb"
        className="flex min-w-0 grow items-center overflow-x-auto rounded-sm border border-border bg-muted px-1 py-2 dark:bg-muted/50 dark:backdrop-blur-sm"
      >
        {crumbs.map((name, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <Fragment key={i}>
              {i > 0 && (
                <ChevronRightRegular className="size-3 shrink-0 opacity-60" />
              )}
              <button
                type="button"
                disabled={isLast}
                aria-current={isLast ? 'page' : undefined}
                onClick={() => navigate(path.slice(0, i))}
                className={cn(
                  'shrink-0 rounded-sm px-1.5 py-0.5 whitespace-nowrap',
                  !isLast && 'cursor-pointer hover-shade',
                )}
              >
                {name}
              </button>
            </Fragment>
          )
        })}
      </nav>
    </header>
  )
}
