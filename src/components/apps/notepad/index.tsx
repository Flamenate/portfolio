import { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import useLocalize from '@/hooks/useLocalize'
import { useAppRequest } from '@/lib/app-request'
import { fileLabel } from '@/lib/directories'
import type { FileNode } from '@/lib/directories'
import { bundledText } from '@/lib/texts'
import { useAppStore } from '@/stores/app.store'
import { useNotepadStore } from '@/stores/notepad.store'

export function Notepad() {
  const localize = useLocalize()
  const [file, setFile] = useState<FileNode | null>(null)
  // Bumped on every open so even the same file starts over from its content.
  const [opens, setOpens] = useState(0)
  const setAppTitle = useAppStore((state) => state.setAppTitle)
  const requested = useNotepadStore((state) => state.requested)
  const clearRequest = useNotepadStore((state) => state.clearRequest)

  useAppRequest(requested, clearRequest, (next) => {
    setFile(next)
    setOpens(opens + 1)
  })

  const title = file ? `${fileLabel(file)} - ${localize('notepad')}` : null
  useEffect(() => {
    setAppTitle('notepad', title)
  }, [title, setAppTitle])

  return (
    <Textarea
      key={opens}
      className="field-sizing-fixed h-full min-h-0 w-full resize-none overflow-auto rounded-none border-0 bg-(--white) p-2 text-base ring-0 outline-none select-text focus-visible:border-0 focus-visible:ring-0 md:text-base dark:bg-background dark:text-(--white)"
      defaultValue={
        file
          ? (bundledText(file.src) ?? '')
          : "Write to your heart's content... none of it will be saved."
      }
    />
  )
}
