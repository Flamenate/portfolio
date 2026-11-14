import { cn } from '@/lib/utils'

export function WindowLoading({ className }: { className?: string }) {
  return (
    <div
      role="status"
      className={cn(
        'flex h-full w-full items-center justify-center',
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="size-12" aria-hidden="true">
        <circle
          className="win-progress-ring stroke-accent-foreground dark:stroke-[#60cdff]"
          cx="16"
          cy="16"
          r="14"
          fill="none"
          pathLength="100"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">loading</span>
    </div>
  )
}
