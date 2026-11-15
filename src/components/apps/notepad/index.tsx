import { Textarea } from '@/components/ui/textarea'

export function Notepad() {
  return (
    <Textarea
      className="h-full min-h-0 w-full resize-none field-sizing-fixed overflow-auto rounded-none border-0 bg-(--white) p-2 text-base ring-0 outline-none select-text focus-visible:border-0 focus-visible:ring-0 md:text-base dark:bg-background dark:text-(--white)"
      defaultValue="Write to your heart's content... none of it will be saved."
    />
  )
}
