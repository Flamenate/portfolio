// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AppShortcut } from '@/components/desktop/shortcut'
import { useAppStore } from '@/stores/app.store'
import { useDesktopSelectionStore } from '@/stores/desktop-selection.store'

const notepadState = () => useAppStore.getState().apps.notepad.state
const selected = () => useDesktopSelectionStore.getState().selected

function renderNotepadShortcut() {
  render(<AppShortcut appLabel="notepad" containerRef={{ current: null }} />)
  return screen.getByRole('button')
}

describe('Desktop shortcut input', () => {
  beforeEach(() => {
    useAppStore.setState(useAppStore.getInitialState(), true)
    useDesktopSelectionStore.setState(
      useDesktopSelectionStore.getInitialState(),
      true,
    )
  })
  afterEach(cleanup)

  it('opens on a single tap with touch input', () => {
    const shortcut = renderNotepadShortcut()

    fireEvent.pointerDown(shortcut, { pointerType: 'touch' })
    fireEvent.click(shortcut)

    expect(notepadState()).toBe('open')
    expect(selected()).toEqual([])
  })

  it('only selects on a mouse click', () => {
    const shortcut = renderNotepadShortcut()

    fireEvent.pointerDown(shortcut, { pointerType: 'mouse' })
    fireEvent.click(shortcut)

    expect(notepadState()).toBe('closed')
    expect(selected()).toEqual([{ kind: 'app', label: 'notepad' }])
  })

  it('opens no context menu with touch input', () => {
    const shortcut = renderNotepadShortcut()

    fireEvent.pointerDown(shortcut, { pointerType: 'touch' })
    fireEvent.contextMenu(shortcut)

    expect(screen.queryByRole('menu')).toBeNull()
    expect(selected()).toEqual([])
  })

  it('opens the context menu on a mouse right-click', () => {
    const shortcut = renderNotepadShortcut()

    fireEvent.pointerDown(shortcut, { pointerType: 'mouse', button: 2 })
    fireEvent.contextMenu(shortcut)

    expect(screen.getByRole('menu')).toBeTruthy()
  })
})
