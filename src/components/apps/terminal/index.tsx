import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import localize from '@/lib/localize'
import { findCommand } from '@/lib/terminal-commands'
import useThemeStore from '@/stores/theme.store'
import type { Locale } from '@/stores/theme.store'

interface HistoryEntry {
  id: number
  rawInput: string
  output: ReactNode
}

function unknownCommandOutput(commandName: string, locale: Locale) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: localize(
          'terminal_unknown_command',
          locale,
          commandName.replaceAll(/</g, '&lt;').replaceAll(/>/g, '&gt;'),
        ),
      }}
    />
  )
}

export function Terminal() {
  const locale = useThemeStore((state) => state.locale)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const [history, setHistory] = useState<HistoryEntry[]>([])

  const executeCommand = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim()
      if (!trimmed) return

      const [commandName, ...args] = trimmed.split(' ')
      const command = findCommand(commandName)

      // `clear` empties the history instead of adding its own entry.
      const execution = { cleared: false }
      const output = command
        ? command.run({
            args,
            locale,
            clearHistory: () => {
              execution.cleared = true
            },
          })
        : unknownCommandOutput(commandName, locale)

      const entry: HistoryEntry = { id: Date.now(), rawInput: trimmed, output }
      setHistory((prev) => (execution.cleared ? [] : [...prev, entry]))
    },
    [locale],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        executeCommand(e.currentTarget.value)
        e.currentTarget.value = ''
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const lastCommand = history[history.length - 1]?.rawInput ?? ''
        e.currentTarget.value = lastCommand
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.currentTarget.value = ''
      }
    },
    [executeCommand, history],
  )

  return (
    <section
      className="h-full overflow-hidden overflow-y-auto bg-black/85 px-1 text-xs wrap-break-word break-all text-white/80 select-text @sm:text-sm @5xl:text-base [&_*::selection]:bg-white [&_*::selection]:text-black [&>code]:mb-1.5 [&>code]:block [&>code]:leading-tight"
      onPointerUp={() => {
        inputRef.current?.focus()
      }}
    >
      <code>Haythem Frikha - [Version 0.1.019011.25]</code>
      <code>(?) {localize('terminal_disclaimer', locale)}</code>
      <code>{localize('terminal_help', locale)}</code>
      <br />

      {history.map((entry) => (
        <code key={entry.id}>
          C:\Users\Flamenate&gt; {entry.rawInput}
          <br />
          {entry.output}
        </code>
      ))}

      <code className="flex! flex-nowrap items-baseline justify-baseline gap-1">
        <span className="text-nowrap">C:\Users\Flamenate&gt; </span>
        <Input
          ref={inputRef}
          className="inline-block h-fit max-w-full grow rounded-none border-0 bg-transparent! py-0 pl-1 caret-white outline-none focus-visible:ring-0 @5xl:text-base"
          onKeyDown={handleKeyDown}
          onKeyUp={(e) => {
            if (e.key !== 'Enter') return
            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'end' })
          }}
        />
      </code>
    </section>
  )
}
