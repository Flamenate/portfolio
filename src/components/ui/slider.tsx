import * as SliderPrimitive from '@radix-ui/react-slider'
import { useMemo, useRef } from 'react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  )
  const thumbRef = useRef<HTMLDivElement | null>(null)

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'group relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      onPointerDown={() => {
        if (!thumbRef.current) return
        thumbRef.current.dataset.pressed = 'true'
        requestAnimationFrame(() => {
          thumbRef.current!.style.setProperty('--thumb-scale', '0.7')
        })
      }}
      onPointerUp={() => {
        if (!thumbRef.current) return
        delete thumbRef.current.dataset.pressed
        requestAnimationFrame(() => {
          if (thumbRef.current!.matches(':hover')) {
            thumbRef.current!.style.setProperty('--thumb-scale', '1.3')
          } else {
            thumbRef.current!.style.setProperty('--thumb-scale', '1')
          }
        })
      }}
      onPointerCancel={() => {
        if (!thumbRef.current) return
        delete thumbRef.current.dataset.pressed
        requestAnimationFrame(() => {
          thumbRef.current!.style.setProperty('--thumb-scale', '1')
        })
      }}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          'peer relative grow overflow-hidden rounded-full bg-muted-foreground data-[orientation=horizontal]:h-1.25 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5',
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            'absolute bg-accent data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full',
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <SliderPrimitive.Thumb data-slot="slider-thumb" key={index} asChild>
              <div className="relative grid size-4.75 shrink-0 place-items-center rounded-full bg-background outline-none">
                <div className="absolute inset-0 rounded-full bg-muted" />
                <div
                  ref={thumbRef}
                  className="relative z-10 size-2.75 rounded-full bg-accent transition-transform duration-125 ease-in-out"
                  style={{
                    // @ts-ignore - CSS variable
                    '--thumb-scale': 1,
                    transform: 'scale(var(--thumb-scale))',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    if (!el.dataset.pressed && !props.disabled) {
                      requestAnimationFrame(() => {
                        el.style.setProperty('--thumb-scale', '1.3')
                      })
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    if (!el.dataset.pressed && !props.disabled) {
                      requestAnimationFrame(() => {
                        el.style.setProperty('--thumb-scale', '1')
                      })
                    }
                  }}
                />
              </div>
            </SliderPrimitive.Thumb>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1.5">
            {_values[index]}
          </TooltipContent>
        </Tooltip>
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
