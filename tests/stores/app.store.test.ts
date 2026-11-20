// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { useAppStore } from '@/stores/app.store'
import { useLogStore } from '@/stores/log.store'

const store = () => useAppStore.getState()

describe('Window lifecycle', () => {
  beforeEach(() => {
    useAppStore.setState(useAppStore.getInitialState(), true)
    useLogStore.setState(useLogStore.getInitialState(), true)
  })

  describe('focus', () => {
    it('passes focus to the most recently focused visible Window when the Focused Window is minimized', () => {
      store().openApp('notepad')
      store().openApp('terminal')
      store().openApp('mail')
      store().focusApp('notepad')
      store().focusApp('mail')

      store().minimizeApp('mail')

      expect(store().focusedAppLabel).toBe('notepad')
    })

    it('passes focus to a visible Window, never a minimized one, when the Focused Window is closed', () => {
      store().openApp('notepad')
      store().openApp('terminal')
      store().minimizeApp('terminal')
      store().openApp('mail')

      store().closeApp('mail')

      expect(store().focusedAppLabel).toBe('notepad')
    })

    it('leaves no Window focused when the last visible Window is minimized', () => {
      store().openApp('notepad')

      store().minimizeApp('notepad')

      expect(store().focusedAppLabel).toBeNull()
    })

    it('ignores focusing a minimized or closed Window', () => {
      store().openApp('notepad')
      store().openApp('terminal')
      store().minimizeApp('terminal')

      store().focusApp('terminal')
      store().focusApp('mail')

      expect(store().focusedAppLabel).toBe('notepad')
    })
  })

  describe('Window state', () => {
    it('restores a minimized Window straight to open, at its un-maximized coordinates', () => {
      store().openApp('notepad')
      const restored = store().apps.notepad.coordinates
      store().toggleMaximizeApp('notepad')
      store().minimizeApp('notepad')

      store().openApp('notepad')

      expect(store().apps.notepad.state).toBe('open')
      expect(store().apps.notepad.coordinates).toEqual(restored)
    })

    it('opens a Window at 60% of the viewport the first time', () => {
      store().openApp('notepad')

      expect(store().apps.notepad.coordinates).toEqual({
        x: 150,
        y: 150,
        width: 614,
        height: 461,
      })
    })

    it('reopens a Window where it was when closed, even if it was maximized', () => {
      store().openApp('notepad')
      store().updateAppCoordinates('notepad', { x: 10, y: 20 })
      store().toggleMaximizeApp('notepad')
      store().closeApp('notepad')

      store().openApp('notepad')

      expect(store().apps.notepad.coordinates).toEqual({
        x: 10,
        y: 20,
        width: 614,
        height: 461,
      })
    })

    it('maximizes to the viewport above the taskbar and back', () => {
      store().openApp('notepad')
      const restored = store().apps.notepad.coordinates

      store().toggleMaximizeApp('notepad')
      expect(store().apps.notepad.state).toBe('maximized')
      expect(store().apps.notepad.coordinates).toEqual({
        x: 0,
        y: 0,
        width: 1024,
        height: 704,
      })

      store().toggleMaximizeApp('notepad')
      expect(store().apps.notepad.state).toBe('open')
      expect(store().apps.notepad.coordinates).toEqual(restored)
    })

    it('ignores maximizing a minimized or closed Window', () => {
      store().openApp('notepad')
      store().minimizeApp('notepad')

      store().toggleMaximizeApp('notepad')
      store().toggleMaximizeApp('mail')

      expect(store().apps.notepad.state).toBe('minimized')
      expect(store().apps.mail.state).toBe('closed')
    })

    it('leaves maximize at the current frame and focuses when a resize begins', () => {
      store().openApp('notepad')
      store().toggleMaximizeApp('notepad')
      store().openApp('terminal')

      store().beginResizeApp('notepad')

      expect(store().apps.notepad.state).toBe('open')
      expect(store().apps.notepad.coordinates).toEqual({
        x: 0,
        y: 0,
        width: 1024,
        height: 704,
      })
      expect(store().focusedAppLabel).toBe('notepad')
    })

    it('closes every Window, minimized or maximized, when all are closed', () => {
      store().openApp('notepad')
      store().openApp('terminal')
      store().minimizeApp('terminal')
      store().openApp('mail')
      store().toggleMaximizeApp('mail')

      store().closeAllApps()

      expect(store().openAppLabels).toEqual([])
      expect(store().focusedAppLabel).toBeNull()
      for (const label of ['notepad', 'terminal', 'mail'] as const) {
        expect(store().apps[label].state).toBe('closed')
      }
    })
  })

  describe('activating from the taskbar', () => {
    it('opens a closed App', () => {
      expect(store().activateApp('notepad')).toBe('opened')
      expect(store().apps.notepad.state).toBe('open')
      expect(store().focusedAppLabel).toBe('notepad')
    })

    it('minimizes the Focused Window', () => {
      store().openApp('notepad')

      expect(store().activateApp('notepad')).toBe('minimized')
      expect(store().apps.notepad.state).toBe('minimized')
    })

    it('restores a minimized App and focuses it', () => {
      store().openApp('notepad')
      store().minimizeApp('notepad')

      expect(store().activateApp('notepad')).toBe('restored')
      expect(store().apps.notepad.state).not.toBe('minimized')
      expect(store().focusedAppLabel).toBe('notepad')
    })

    it('focuses a visible Window that is not focused', () => {
      store().openApp('notepad')
      store().openApp('terminal')

      expect(store().activateApp('notepad')).toBe('focused')
      expect(store().apps.notepad.state).toBe('open')
      expect(store().focusedAppLabel).toBe('notepad')
    })
  })

  describe('action log', () => {
    const loggedTitles = () =>
      useLogStore.getState().actions.map((action) => action.title)

    it('logs a restore when a minimized App is opened', () => {
      store().openApp('notepad')
      store().minimizeApp('notepad')

      store().openApp('notepad')

      expect(loggedTitles()).toEqual([
        'unminimize_app',
        'minimize_app',
        'open_app',
      ])
    })

    it('logs nothing for focus changes or actions that change nothing', () => {
      store().openApp('notepad')
      store().openApp('terminal')

      store().focusApp('notepad')
      store().openApp('notepad')
      store().closeApp('mail')
      store().beginResizeApp('notepad')
      store().updateAppCoordinates('notepad', {})
      store().pinApp('haythem_frikha')

      expect(loggedTitles()).toEqual(['open_app', 'open_app'])
    })
  })
})
