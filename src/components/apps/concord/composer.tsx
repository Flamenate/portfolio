import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

export function Composer({
  placeholder,
  onSend,
}: {
  placeholder: string
  onSend: (content: string) => void
}) {
  const [value, setValue] = useState('')

  return (
    <form
      className="shrink-0 px-4 pb-2"
      onSubmit={(event) => {
        event.preventDefault()
        if (!value.trim()) return
        onSend(value)
        setValue('')
      }}
    >
      <Textarea
        rows={1}
        value={value}
        maxLength={2000}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (
            event.key !== 'Enter' ||
            event.shiftKey ||
            event.nativeEvent.isComposing
          )
            return
          event.preventDefault()
          event.currentTarget.form?.requestSubmit()
        }}
        className="max-h-47.5 min-h-14 resize-none rounded-md border border-muted-foreground/15 bg-muted-foreground/15 px-4 py-4 text-sm shadow-none select-text focus-visible:ring-0"
      />
    </form>
  )
}
