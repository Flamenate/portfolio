import { forwardRef } from 'react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const WindowsShortcut = forwardRef<
  HTMLButtonElement,
  ComponentProps<'button'>
>(function WindowsShortcut({ className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn(
        'group hover-taskbar-effect relative flex h-full w-12 items-center justify-center rounded-sm p-2 transition-colors duration-150 select-none',
        className,
      )}
    >
      <img
        src="/images/icons/windows.png"
        alt=""
        className="mt-0.5 object-cover transition-[scale_filter] group-active:scale-80 group-active:contrast-150 group-active:saturate-200"
        draggable="false"
      />
    </button>
  )
})

export default WindowsShortcut
