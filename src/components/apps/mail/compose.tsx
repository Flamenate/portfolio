import { DeleteRegular } from '@fluentui/react-icons/headless/svg/delete'
import { SendRegular } from '@fluentui/react-icons/headless/svg/send'
import { useForm } from '@tanstack/react-form'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useLocalize from '@/hooks/useLocalize'
import { mailSchema } from '@/lib/mail-schema'
import { resume } from '@/lib/personal'
import { sendMail } from '@/lib/send-mail'
import { useMailStore } from '@/stores/mail.store'
import { useNotificationStore } from '@/stores/notification.store'

const inputClassName =
  'h-8 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent'

function notify(content: 'mail_sent' | 'mail_failed' | 'mail_limit') {
  useNotificationStore.getState().addNotification({
    source: { label: 'mail', iconSrc: '/images/icons/mail.png' },
    content,
    subcontent: `${content}_description`,
  })
}

function FieldRow({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div className="flex items-center gap-2 border-b border-muted-foreground/30 px-3 py-1">
      <label
        htmlFor={htmlFor}
        className="min-w-14 rounded-xs border border-primary px-2 py-1 text-primary"
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export function Compose({ onDone }: { onDone: () => void }) {
  const localize = useLocalize()
  const addSent = useMailStore((state) => state.addSent)
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      content: '',
      website: '',
    },
    validators: {
      onSubmit: mailSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await sendMail({ data: value })
        if (!result.ok) {
          notify('mail_limit')
          return
        }
        addSent({
          id: crypto.randomUUID(),
          folder: 'sent_items',
          sender: value.name.trim(),
          senderEmail: value.email,
          subject: value.subject.trim(),
          date: new Date(),
          body: value.content.trim().split(/\n\s*\n/),
        })
        notify('mail_sent')
        onDone()
      } catch {
        notify('mail_failed')
      }
    },
  })

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        const input = event.currentTarget.elements.namedItem('website')
        form.setFieldValue(
          'website',
          input instanceof HTMLInputElement ? input.value : '',
          {
            dontUpdateMeta: true,
            dontValidate: true,
            dontRunListeners: true,
          },
        )
        form.handleSubmit()
      }}
      className="flex min-h-0 grow flex-col overflow-y-auto"
    >
      <form.Subscribe
        selector={(state) =>
          [
            state.isSubmitting,
            mailSchema.safeParse(state.values).success,
          ] as const
        }
      >
        {([isSubmitting, isValid]) => (
          <div className="flex items-center gap-2 border-b border-muted-foreground/30 px-2 py-1.5">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="cursor-pointer rounded-xs"
            >
              <SendRegular />
              {localize(isSubmitting ? 'mail_sending' : 'mail_send')}
            </Button>
            <p className="min-w-0 grow truncate text-sm opacity-70">
              {localize('mail_to')}: {resume.contact.email}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={localize('mail_discard')}
              title={localize('mail_discard')}
              disabled={isSubmitting}
              onClick={onDone}
            >
              <DeleteRegular />
            </Button>
          </div>
        )}
      </form.Subscribe>
      <form.Field name="name">
        {(field) => (
          <FieldRow label={localize('mail_name')} htmlFor="mail-name">
            <Input
              id="mail-name"
              name={field.name}
              value={field.state.value}
              autoComplete="name"
              maxLength={100}
              onChange={(event) => field.handleChange(event.target.value)}
              className={inputClassName}
            />
          </FieldRow>
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <FieldRow label={localize('mail_from')} htmlFor="mail-email">
            <Input
              id="mail-email"
              name={field.name}
              type="email"
              value={field.state.value}
              autoComplete="email"
              onChange={(event) => field.handleChange(event.target.value)}
              className={inputClassName}
            />
          </FieldRow>
        )}
      </form.Field>
      <form.Field name="subject">
        {(field) => (
          <div className="border-b border-muted-foreground/30 px-2 py-1">
            <Input
              id="mail-subject"
              name={field.name}
              value={field.state.value}
              maxLength={200}
              placeholder={localize('mail_subject')}
              aria-label={localize('mail_subject')}
              onChange={(event) => field.handleChange(event.target.value)}
              className={inputClassName}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="website">
        {(field) => (
          <div aria-hidden className="sr-only">
            <input
              name={field.name}
              value={field.state.value}
              tabIndex={-1}
              autoComplete="off"
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="content">
        {(field) => (
          <Textarea
            id="mail-content"
            name={field.name}
            value={field.state.value}
            maxLength={5000}
            aria-label={localize('mail_content')}
            placeholder={localize('mail_content')}
            onChange={(event) => field.handleChange(event.target.value)}
            className="min-h-32 grow resize-none rounded-none border-0 bg-transparent px-3 py-2 shadow-none ring-0 select-text focus-visible:ring-0 dark:bg-transparent"
          />
        )}
      </form.Field>
    </form>
  )
}
