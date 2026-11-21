import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function WindowsShortcut({
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        'group relative flex h-full w-12 items-center justify-center rounded-sm hover-taskbar-effect p-2 transition-colors duration-150 select-none',
        className,
      )}
    >
      <img
        src="/media/icons/flame_os.webp"
        alt=""
        className="mt-0.5 object-cover transition-[filter,scale] group-active:scale-80 group-active:contrast-150 group-active:saturate-200"
        draggable="false"
      />
    </button>
  )
}

export default WindowsShortcut
