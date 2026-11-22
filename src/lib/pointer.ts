// Touch input is decided per gesture, from the pointer that started it, so a
// touchscreen laptop gets mouse behaviour with a mouse and touch behaviour
// with a finger.
let lastPointerType = ''

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointerdown',
    (event) => {
      lastPointerType = event.pointerType
    },
    { capture: true, passive: true },
  )
}

export function isTouchInput() {
  return lastPointerType === 'touch'
}
