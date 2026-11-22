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
import { fileLabel } from '@/lib/directories'
import type { FileNode } from '@/lib/directories'

export function UnsupportedFileDialog({
  file,
  onClose,
}: {
  file: FileNode | null
  onClose: () => void
}) {
  const localize = useLocalize()
  const okRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  // Keeps the title during the close animation, after file is cleared.
  const [shownFile, setShownFile] = useState(file)
  if (file && file !== shownFile) setShownFile(file)

  return (
    <AlertDialog
      open={file !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <AlertDialogContent
        className="gap-0 overflow-hidden rounded-sm border bg-popover/50 p-0 ring-0 backdrop-blur-xl data-[size=default]:max-w-sm data-[size=default]:sm:max-w-md"
        onOpenAutoFocus={(event) => {
          // There's no Trigger, so remember the opener for focus return, and
          // focus OK rather than Radix's default Cancel control (the X).
          if (document.activeElement instanceof HTMLElement)
            returnFocusRef.current = document.activeElement
          event.preventDefault()
          okRef.current?.focus()
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          returnFocusRef.current?.focus()
        }}
      >
        <header className="flex h-10 items-center border-b bg-linear-to-r from-background/15 via-background/25 to-background/15 dark:text-(--white)">
          <AlertDialogTitle className="min-w-0 flex-1 truncate pl-3 text-sm font-light">
            {shownFile && fileLabel(shownFile)}
          </AlertDialogTitle>
          <AlertDialogCancel
            variant="ghost"
            className="h-full rounded-none border-0 px-3 shadow-none hover:bg-destructive has-[>svg]:px-3"
            aria-label={localize('close')}
          >
            <DismissRegular className="size-4" />
          </AlertDialogCancel>
        </header>
        <div className="flex items-center gap-3 px-4 py-5">
          <WarningFilled className="size-8 shrink-0 text-amber-500" />
          <AlertDialogDescription className="text-popover-foreground">
            {localize('unsupported_file_format')}
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter className="mx-0 mb-0 flex-row justify-end rounded-none bg-black/5 px-4 py-3 dark:bg-black/20">
          <AlertDialogAction ref={okRef} className="min-w-20">
            {localize('ok')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
