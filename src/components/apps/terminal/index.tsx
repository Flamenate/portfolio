import { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import useLocalize from '@/hooks/useLocalize'
import type { CommandSnapshot } from '@/lib/terminal-commands'
import { commandLookup } from '@/lib/terminal-commands'
import useThemeStore from '@/stores/theme.store'

interface CommandExecution {
  id: number
  rawInput: string
  commandName: string
  args: string[]
  snapshot: CommandSnapshot
}

function CommandOutput({
  execution,
  clearHistory,
}: {
  execution: CommandExecution
  clearHistory: () => void
}) {
  const CommandComponent = commandLookup[execution.commandName]
  const localize = useLocalize()
  if (!CommandComponent) {
    return (
      <code>
        C:\Users\Flamenate&gt; {execution.rawInput}
        <br />
        <p
          dangerouslySetInnerHTML={{
            __html: localize(
              'terminal_unknown_command',
              execution.commandName
                .replaceAll(/</g, '&lt;')
                .replaceAll(/>/g, '&gt;'),
            ),
          }}
        />
      </code>
    )
  }

  return (
    <code>
      C:\Users\Flamenate&gt; {execution.rawInput}
      <br />
      <CommandComponent
        args={execution.args}
        snapshot={execution.snapshot}
        clearHistory={clearHistory}
      />
    </code>
  )
}

export function Terminal() {
  const localize = useLocalize()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const [history, setHistory] = useState<CommandExecution[]>([])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const executeCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim()
    if (!trimmed) return

    const [commandName, ...args] = trimmed.split(' ')

    const themeStore = useThemeStore.getState()
    const snapshot: CommandSnapshot = {
      locale: themeStore.locale,
      random: Math.random(),
    }

    const execution: CommandExecution = {
      id: Date.now(),
      rawInput: trimmed,
      commandName,
      args,
      snapshot,
    }

    setHistory((prev) => [...prev, execution])
  }, [])

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
      <code>(?) {localize('terminal_disclaimer')}</code>
      <code>{localize('terminal_help')}</code>
      <br />

      {history.map((execution) => (
        <CommandOutput
          key={execution.id}
          execution={execution}
          clearHistory={clearHistory}
        />
      ))}

      <code className="flex! flex-nowrap items-baseline justify-baseline gap-1">
        <span className="text-nowrap">C:\Users\Flamenate&gt; </span>
        <Input
          ref={inputRef}
          className="inline-block h-fit max-w-full grow rounded-none border-0 bg-transparent! py-0 pl-1 caret-white outline-none focus-visible:ring-0"
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
