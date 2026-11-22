import { Avatar } from '@/components/ui/avatar'
import type { Mail } from '@/data/mails'
import useLocale from '@/hooks/useLocale'

export function MailView({ mail }: { mail: Mail }) {
  const locale = useLocale()

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
            {locale.date(mail.date, 'PPPP p')}
          </p>
        </div>
      </header>
      <div className="flex flex-col gap-3 text-justify leading-relaxed whitespace-pre-line">
        {mail.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
