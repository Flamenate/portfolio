import type { ComponentProps } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function NavButton({
  label,
  ...props
}: ComponentProps<'button'> & { label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="flex size-10.5 cursor-pointer items-center justify-center rounded-sm hover-shade disabled:cursor-not-allowed disabled:text-muted-foreground/60"
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent sideOffset={4}>{label}</TooltipContent>
    </Tooltip>
  )
}
