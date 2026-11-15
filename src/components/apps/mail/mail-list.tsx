import { format, isToday } from 'date-fns'
import useLocalize from '@/hooks/useLocalize'
import type { Mail } from '@/lib/mails'
import { cn } from '@/lib/utils'
import { datefnsLocales, useThemeStore } from '@/stores/theme.store'
import { Avatar } from './avatar'

export function MailList({
  mails,
  selectedId,
  onSelect,
}: {
  mails: Mail[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const localize = useLocalize()
  const locale = useThemeStore((state) => state.locale)

  if (mails.length === 0) {
    return (
      <p className="mt-6 text-center opacity-60">
        {localize('mail_empty_folder')}
      </p>
    )
  }

  return (
    <ul>
      {mails.map((mail) => (
        <li key={mail.id}>
          <button
            type="button"
            aria-current={mail.id === selectedId ? 'true' : undefined}
            onClick={() => onSelect(mail.id)}
            className={cn(
              'flex w-full cursor-pointer gap-2.5 border-b border-muted-foreground/20 p-2 text-left',
              mail.id === selectedId ? 'bg-accent/30' : 'hover:bg-accent/20',
            )}
          >
            <Avatar name={mail.sender} />
            <div className="min-w-0 grow">
              <div className="flex items-baseline gap-2">
                <span className="grow truncate font-semibold">
                  {mail.sender}
                </span>
                <span
                  className="shrink-0 text-xs opacity-60"
                  suppressHydrationWarning
                >
                  {format(mail.date, isToday(mail.date) ? 'p' : 'P', {
                    locale: datefnsLocales[locale],
                  })}
                </span>
              </div>
              <p className="truncate">{mail.subject}</p>
              <p className="truncate text-xs opacity-60">{mail.body[0]}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
