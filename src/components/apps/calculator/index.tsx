import { BackspaceRegular } from '@fluentui/react-icons/headless/svg/backspace'
import { HistoryRegular } from '@fluentui/react-icons/headless/svg/history'
import { useEffect, useReducer, useRef, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useLocalize } from '@/hooks/useLocalize'
import type { CalculatorAction, HistoryEntry, Operator } from '@/lib/calculator'
import {
  calculatorReducer,
  initialCalculatorState,
  specialValue,
} from '@/lib/calculator'
import { cn } from '@/lib/utils'
import useAppStore from '@/stores/app.store'

const enabledDuringError = new Set<CalculatorAction['type']>([
  'digit',
  'clear',
  'ce',
  'backspace',
])

const operator = (value: Operator): CalculatorAction => ({
  type: 'operator',
  operator: value,
})

const operators: Record<string, Operator> = {
  '+': '+',
  '-': '−',
  '−': '−',
  '*': '×',
  x: '×',
  X: '×',
  '×': '×',
  '/': '÷',
  '÷': '÷',
}

function keyAction(key: string): CalculatorAction | null {
  if (key >= '0' && key <= '9') return { type: 'digit', digit: key }
  if (key in operators) return operator(operators[key])
  if (key === '.' || key === ',') return { type: 'decimal' }
  if (key === 'Enter' || key === '=') return { type: 'equals' }
  if (key === 'Backspace') return { type: 'backspace' }
  if (key === '%') return { type: 'percent' }
  if (key === 'Escape') return { type: 'clear' }
  return null
}

const keypad: Array<
  Array<{ label: string; action: CalculatorAction; accent?: boolean }>
> = [
  [
    { label: '%', action: { type: 'percent' } },
    { label: 'CE', action: { type: 'ce' } },
    { label: 'C', action: { type: 'clear' } },
    { label: 'Backspace', action: { type: 'backspace' } },
  ],
  [
    { label: '1/x', action: { type: 'reciprocal' } },
    { label: 'x²', action: { type: 'square' } },
    { label: '²√x', action: { type: 'sqrt' } },
    { label: '÷', action: operator('÷') },
  ],
  [
    { label: '7', action: { type: 'digit', digit: '7' } },
    { label: '8', action: { type: 'digit', digit: '8' } },
    { label: '9', action: { type: 'digit', digit: '9' } },
    { label: '×', action: operator('×') },
  ],
  [
    { label: '4', action: { type: 'digit', digit: '4' } },
    { label: '5', action: { type: 'digit', digit: '5' } },
    { label: '6', action: { type: 'digit', digit: '6' } },
    { label: '−', action: operator('−') },
  ],
  [
    { label: '1', action: { type: 'digit', digit: '1' } },
    { label: '2', action: { type: 'digit', digit: '2' } },
    { label: '3', action: { type: 'digit', digit: '3' } },
    { label: '+', action: operator('+') },
  ],
  [
    { label: '±', action: { type: 'negate' } },
    { label: '0', action: { type: 'digit', digit: '0' } },
    { label: '.', action: { type: 'decimal' } },
    { label: '=', action: { type: 'equals' }, accent: true },
  ],
]

function CalculatorKeypad({
  error,
  onPress,
}: {
  error: boolean
  onPress: (action: CalculatorAction) => void
}) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-6 gap-1 p-1 container-short:gap-0.5">
      {keypad.flat().map((key) => {
        const disabled = error && !enabledDuringError.has(key.action.type)
        return (
          <button
            key={key.label}
            type="button"
            aria-label={key.label}
            disabled={disabled}
            className={cn(
              'inline-flex min-h-0 items-center justify-center rounded-md text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 @sm:text-base container-short:text-xs',
              key.accent
                ? 'bg-accent text-foreground transition-colors duration-150 hover:bg-accent/85'
                : key.action.type !== 'digit'
                  ? 'bg-popover-foreground/10 hover-shade active:bg-popover-foreground/20'
                  : 'bg-popover-foreground/20 hover-shade active:bg-popover-foreground/30',
            )}
            onClick={() => onPress(key.action)}
          >
            {key.action.type === 'backspace' ? (
              <BackspaceRegular className="size-5 container-short:size-4" />
            ) : (
              key.label
            )}
          </button>
        )
      })}
    </div>
  )
}

function HistoryMenu({
  entries,
  onRecall,
  className,
}: {
  entries: HistoryEntry[]
  onRecall: (result: string) => void
  className?: string
}) {
  if (entries.length === 0) {
    return (
      <p className={cn('p-3 text-sm text-muted-foreground', className)}>
        There's no history yet
      </p>
    )
  }

  return (
    <ul className={cn('overflow-y-auto', className)}>
      {entries.map((entry, index) => (
        <li key={entry.id}>
          <button
            type="button"
            className={cn(
              'w-full px-3 py-2 text-right hover:bg-popover-foreground/10',
              index === 0 && 'rounded-t-md',
              index !== 0 && index === entries.length - 1 && 'rounded-b-md',
            )}
            onClick={() => onRecall(entry.result)}
          >
            <span className="block truncate text-xs text-muted-foreground">
              {entry.expression}
            </span>
            <span
              className="block truncate text-lg dark:text-(--white)"
              title={entry.result}
            >
              {entry.result}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

const defaultTitle = 'standard'

export function Calculator() {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    initialCalculatorState,
  )
  const [historyOpen, setHistoryOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const localize = useLocalize()
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new ResizeObserver(([entry]) => {
      const xl =
        36 *
        Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
      if (entry.contentRect.width >= xl) setHistoryOpen(false)
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const { apps, focusedAppLabel } = useAppStore.getState()
      const app = apps.calculator
      if (
        focusedAppLabel !== 'calculator' ||
        app.state === 'closed' ||
        app.state === 'minimized'
      )
        return
      const action = keyAction(event.key)
      if (!action) return
      event.preventDefault()
      dispatch(action)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])
  const title = state.error
    ? defaultTitle
    : (specialValue(state.display) ?? defaultTitle)
  const shown = state.error ?? state.display

  return (
    <div
      ref={rootRef}
      // Size containment lets the layout shrink with the Window's height, so
      // the keypad always fits without scrolling.
      className="[container-type:size] flex h-full min-h-0 bg-popover/80 dark:bg-popover/50"
    >
      <section className="flex h-full w-full min-w-0 flex-col text-popover-foreground">
        <header className="flex items-center justify-between px-4 pt-3 pb-1 container-short:pt-1 container-short:pb-0">
          <h1 className="truncate text-lg font-semibold container-short:text-base">
            {localize(title)}
          </h1>
          <Popover open={historyOpen} onOpenChange={setHistoryOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="rounded-md p-2 hover:bg-popover-foreground/10 @xl:hidden container-short:p-1"
                aria-label="History"
              >
                <HistoryRegular className="size-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-0">
              <HistoryMenu
                entries={state.history}
                className="max-h-72"
                onRecall={(result) => {
                  dispatch({ type: 'recall', result })
                  setHistoryOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </header>
        <div className="px-4 pb-2 text-right container-short:pb-1">
          <p className="min-h-5 truncate text-sm text-muted-foreground container-short:min-h-4 container-short:text-xs">
            {state.expression}
          </p>
          <p
            className={cn(
              'truncate leading-tight font-semibold',
              'text-4xl @sm:text-5xl container-short:text-2xl',
            )}
          >
            {shown}
          </p>
        </div>
        <CalculatorKeypad
          error={state.error !== null}
          onPress={(action) => dispatch(action)}
        />
      </section>
      <aside className="hidden min-h-0 min-w-50 flex-1 flex-col border-l border-muted-foreground/30 @xl:flex">
        <HistoryMenu
          entries={state.history}
          className="min-h-0 flex-1"
          onRecall={(result) => dispatch({ type: 'recall', result })}
        />
      </aside>
    </div>
  )
}
