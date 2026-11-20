import { ArrowLeftRegular } from '@fluentui/react-icons/headless/svg/arrow-left'
import { MailReadRegular } from '@fluentui/react-icons/headless/svg/mail-read'
import { useEffect, useState } from 'react'
import { NavButton } from '@/components/ui/nav-button'
import { getMails, mailFolders } from '@/data/mails'
import type { MailFolder } from '@/data/mails'
import useLocalize from '@/hooks/useLocalize'
import { cn } from '@/lib/utils'
import { useMailStore } from '@/stores/mail.store'
import { Compose } from './compose'
import { FolderList } from './folder-list'
import { MailList } from './mail-list'
import { MailView } from './mail-view'

type View =
  | { type: 'empty' }
  | { type: 'read'; id: string }
  | { type: 'compose' }

export function Mail() {
  const localize = useLocalize()
  const sent = useMailStore((state) => state.sent)
  const composeRequest = useMailStore((state) => state.composeRequest)
  const clearComposeRequest = useMailStore((state) => state.clearComposeRequest)
  const [folder, setFolder] = useState<MailFolder>('inbox')
  const [view, setView] = useState<View>({ type: 'empty' })

  // A request from outside (e.g. the start menu) opens a draft once, on arrival.
  const [shownRequest, setShownRequest] = useState<number | null>(null)
  if (composeRequest !== null && composeRequest !== shownRequest) {
    setShownRequest(composeRequest)
    setView({ type: 'compose' })
  }
  useEffect(() => {
    if (composeRequest !== null) clearComposeRequest()
  }, [composeRequest, clearComposeRequest])

  const folderMails = getMails(folder, sent)
  const counts = Object.fromEntries(
    mailFolders.map((f) => [f, getMails(f, sent).length]),
  ) as Record<MailFolder, number>
  const selected =
    view.type === 'read'
      ? folderMails.find((mail) => mail.id === view.id)
      : undefined
  const isOpen = view.type !== 'empty'
  const close = () => setView({ type: 'empty' })

  return (
    <div className="flex h-full flex-col bg-popover/50 text-sm text-popover-foreground @md:flex-row">
      <FolderList
        current={folder}
        counts={counts}
        onSelect={(next) => {
          setFolder(next)
          close()
        }}
        onCompose={() => setView({ type: 'compose' })}
      />

      <section
        aria-label={localize(folder)}
        className={cn(
          'min-h-0 grow overflow-y-auto border-muted-foreground/50 @md:block @md:w-72 @md:shrink-0 @md:grow-0 @md:border-r',
          isOpen && 'hidden',
        )}
      >
        <MailList
          mails={folderMails}
          selectedId={selected?.id ?? null}
          onSelect={(id) => setView({ type: 'read', id })}
        />
      </section>

      <section
        className={cn(
          'min-h-0 min-w-0 grow flex-col @md:flex',
          isOpen ? 'flex' : 'hidden',
        )}
      >
        {isOpen && (
          <div className="shrink-0 border-b border-muted-foreground/50 p-1 @md:hidden">
            <NavButton label={localize('back')} onClick={close}>
              <ArrowLeftRegular className="size-4 text-foreground dark:text-(--white)" />
            </NavButton>
          </div>
        )}
        {view.type === 'compose' ? (
          <Compose onDone={close} />
        ) : selected ? (
          <MailView key={selected.id} mail={selected} />
        ) : (
          <div className="flex grow flex-col items-center justify-center gap-2 opacity-60">
            <MailReadRegular className="size-12" />
            <p>{localize('mail_select_item')}</p>
          </div>
        )}
      </section>
    </div>
  )
}
