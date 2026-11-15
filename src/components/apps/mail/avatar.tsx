import { cn } from '@/lib/utils'

const colors = [
  'bg-sky-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-violet-600',
  'bg-teal-600',
  'bg-orange-600',
  'bg-indigo-600',
]

function colorFor(name: string) {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return colors[Math.abs(hash) % colors.length]
}

export function Avatar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex size-9 shrink-0 items-center justify-center rounded-full font-semibold text-white',
        colorFor(name),
        className,
      )}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}
