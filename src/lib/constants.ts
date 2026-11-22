export const TASKBAR_HEIGHT = 64

// Compact mode: Windows render maximized and the taskbar scrolls. Keep in sync
// with the `compact` custom variant in styles.css.
export const COMPACT_MEDIA_QUERY = '(width <= 56rem)'

export const MINIMUM_WINDOW_SIZE = { width: 250, height: 300 }

export const DEFAULT_WINDOW_COORDINATES = {
  x: 150,
  y: 150,
  width: 720,
  height: 480,
}

// A Window opening for the first time covers this share of the viewport.
export const FIRST_OPEN_VIEWPORT_RATIO = 0.6

// A restored Window grows from this far above the taskbar.
export const RESTORE_ORIGIN_GAP = 16
