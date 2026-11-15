import { format } from 'date-fns'
import type { Mail } from '@/lib/mails'
import { datefnsLocales, useThemeStore } from '@/stores/theme.store'
import { Avatar } from './avatar'

export function MailView({ mail }: { mail: Mail }) {
  const locale = useThemeStore((state) => state.locale)

  return (
    <article className="flex min-h-0 grow flex-col overflow-y-auto p-4 select-text">
      <h2 className="mb-4 text-lg font-semibold">{mail.subject}</h2>
      <header className="mb-4 flex items-center gap-3">
        <Avatar name={mail.sender} className="size-10" />
        <div className="min-w-0">
          <p className="truncate font-semibold">
            {mail.sender}{' '}
            <span className="font-normal opacity-60">
              &lt;{mail.senderEmail}&gt;
            </span>
          </p>
          <p className="text-xs opacity-60" suppressHydrationWarning>
            {format(mail.date, 'PPPP p', { locale: datefnsLocales[locale] })}
          </p>
        </div>
      </header>
      <div className="flex flex-col gap-3 text-justify leading-relaxed whitespace-pre-line">
        {mail.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
