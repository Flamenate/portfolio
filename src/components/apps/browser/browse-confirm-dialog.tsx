import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss'
import { WarningFilled } from '@fluentui/react-icons/headless/svg/warning'
import { useRef, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import useLocalize from '@/hooks/useLocalize'

export function BrowseConfirmDialog({
  url,
  onOpen,
  onCancel,
}: {
  url: string | null
  onOpen: (url: string) => void
  onCancel: () => void
}) {
  const localize = useLocalize()
  const cancelRef = useRef<HTMLButtonElement>(null)
  // Keeps the URL during the close animation, after url is cleared.
  const [shownUrl, setShownUrl] = useState(url)
  if (url && url !== shownUrl) setShownUrl(url)
  const host = shownUrl ? (URL.parse(shownUrl)?.host ?? shownUrl) : ''

  return (
    <AlertDialog
      open={url !== null}
      onOpenChange={(open) => {
        if (!open) onCancel()
      }}
    >
      <AlertDialogContent
        className="gap-0 overflow-hidden rounded-sm border bg-popover/50 p-0 ring-0 backdrop-blur-xl data-[size=default]:max-w-sm data-[size=default]:sm:max-w-md"
        onOpenAutoFocus={(event) => {
          // Cancel is the safe default for a link someone else wrote.
          event.preventDefault()
          cancelRef.current?.focus()
        }}
      >
        <header className="flex h-10 items-center border-b bg-linear-to-r from-background/15 via-background/25 to-background/15 dark:text-(--white)">
          <AlertDialogTitle className="min-w-0 flex-1 truncate pl-3 text-sm font-light">
            {localize('browser_confirm_title')}
          </AlertDialogTitle>
          <AlertDialogCancel
            variant="ghost"
            className="h-full rounded-none border-0 px-3 shadow-none hover:bg-destructive has-[>svg]:px-3"
            aria-label={localize('close')}
          >
            <DismissRegular className="size-4" />
          </AlertDialogCancel>
        </header>
        <div className="flex items-start gap-3 px-4 py-5">
          <WarningFilled className="size-8 shrink-0 text-amber-500" />
          <div className="flex min-w-0 flex-col gap-2">
            <AlertDialogDescription className="text-popover-foreground">
              {localize('browser_confirm_description', host)}
            </AlertDialogDescription>
            <p className="text-xs break-all text-muted-foreground">
              {shownUrl}
            </p>
          </div>
        </div>
        <AlertDialogFooter className="mx-0 mb-0 flex-row justify-end gap-2 rounded-none bg-black/5 px-4 py-3 dark:bg-black/20">
          <AlertDialogCancel ref={cancelRef} className="min-w-20">
            {localize('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            className="min-w-20"
            onClick={(event) => {
              // Closing through Radix would also report a cancel; clearing
              // `url` closes the dialog instead.
              event.preventDefault()
              if (url) onOpen(url)
            }}
          >
            {localize('open')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
