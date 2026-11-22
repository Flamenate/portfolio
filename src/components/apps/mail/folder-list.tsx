import type { FluentIcon } from '@fluentui/react-icons/headless'
import { ArchiveRegular } from '@fluentui/react-icons/headless/svg/archive'
import { ComposeRegular } from '@fluentui/react-icons/headless/svg/compose'
import { DraftsRegular } from '@fluentui/react-icons/headless/svg/drafts'
import { MailInboxRegular } from '@fluentui/react-icons/headless/svg/mail-inbox'
import { SendRegular } from '@fluentui/react-icons/headless/svg/send'
import { ShieldErrorRegular } from '@fluentui/react-icons/headless/svg/shield-error'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mailFolders } from '@/data/mails'
import type { MailFolder } from '@/data/mails'
import useLocale from '@/hooks/useLocale'

const folderIcons: Record<MailFolder, FluentIcon> = {
  inbox: MailInboxRegular,
  junk: ShieldErrorRegular,
  drafts: DraftsRegular,
  sent_items: SendRegular,
  archive: ArchiveRegular,
}

type FolderListProps = {
  current: MailFolder
  counts: Record<MailFolder, number>
  onSelect: (folder: MailFolder) => void
  onCompose: () => void
}

export function FolderList({
  current,
  counts,
  onSelect,
  onCompose,
}: FolderListProps) {
  const locale = useLocale()
  const onValueChange = (value: string) => onSelect(value as MailFolder)

  return (
    <>
      <div className="flex shrink-0 items-center gap-1 border-b border-muted-foreground/50 p-1 @md:hidden">
        <Button
          size="icon-sm"
          aria-label={locale.text('mail_new')}
          title={locale.text('mail_new')}
          onClick={onCompose}
        >
          <ComposeRegular />
        </Button>
        <Tabs
          value={current}
          onValueChange={onValueChange}
          className="min-w-0 grow"
        >
          <TabsList
            aria-label={locale.text('mail')}
            className="w-full scroll-fade-x justify-start overflow-x-auto"
          >
            {mailFolders.map((folder) => (
              <TabsTrigger key={folder} value={folder} className="px-2.5">
                {locale.text(folder)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <aside className="hidden w-44 shrink-0 flex-col gap-2 overflow-y-auto border-r border-muted-foreground/50 p-1 @md:flex">
        <Button
          variant="ghost"
          className="w-full cursor-pointer justify-start rounded-xs bg-accent-foreground"
          onClick={onCompose}
        >
          <ComposeRegular />
          {locale.text('mail_new')}
        </Button>
        <Tabs
          orientation="vertical"
          value={current}
          onValueChange={onValueChange}
        >
          <TabsList aria-label={locale.text('mail')} className="w-full">
            {mailFolders.map((folder) => {
              const Icon = folderIcons[folder]
              return (
                <TabsTrigger key={folder} value={folder} className="py-1.5">
                  <Icon />
                  <span className="grow truncate text-left">
                    {locale.text(folder)}
                  </span>
                  {counts[folder] > 0 && (
                    <span className="text-xs opacity-60">{counts[folder]}</span>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      </aside>
    </>
  )
}
