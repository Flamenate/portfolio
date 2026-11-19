// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { useAppStore } from '@/stores/app.store'
import { useDesktopSelectionStore } from '@/stores/desktop-selection.store'
import type { DesktopShortcut } from '@/stores/desktop-selection.store'
import { useExplorerStore } from '@/stores/explorer.store'

const selection = () => useDesktopSelectionStore.getState()
const apps = () => useAppStore.getState().apps

const notepad: DesktopShortcut = { kind: 'app', label: 'notepad' }
const terminal: DesktopShortcut = { kind: 'app', label: 'terminal' }
const documents: DesktopShortcut = { kind: 'folder', path: ['documents'] }

describe('Desktop selection', () => {
  beforeEach(() => {
    useDesktopSelectionStore.setState(
      useDesktopSelectionStore.getInitialState(),
      true,
    )
    useAppStore.setState(useAppStore.getInitialState(), true)
    useExplorerStore.getState().reset()
  })

  it('selects only the clicked Desktop shortcut', () => {
    selection().click(notepad, { ctrl: false })
    selection().click(terminal, { ctrl: false })

    expect(selection().selected).toEqual([terminal])
  })

  it('adds and removes Desktop shortcuts with ctrl-click', () => {
    selection().click(notepad, { ctrl: false })
    selection().click(documents, { ctrl: true })
    selection().click(terminal, { ctrl: true })

    selection().click(notepad, { ctrl: true })

    expect(selection().selected).toEqual([documents, terminal])
  })

  it('narrows a multi-item Selection to the plain-clicked Desktop shortcut', () => {
    selection().click(notepad, { ctrl: false })
    selection().click(documents, { ctrl: true })

    selection().click({ kind: 'folder', path: ['documents'] }, { ctrl: false })

    expect(selection().selected).toEqual([documents])
  })

  it('keeps the only selected Desktop shortcut selected when clicked again', () => {
    selection().click(notepad, { ctrl: false })

    selection().click(notepad, { ctrl: false })

    expect(selection().selected).toEqual([notepad])
  })

  it('selects an unselected Desktop shortcut on right-click, and keeps the Selection otherwise', () => {
    selection().click(notepad, { ctrl: false })
    selection().click(terminal, { ctrl: true })

    selection().contextClick(terminal)
    expect(selection().selected).toEqual([notepad, terminal])

    selection().contextClick(documents)
    expect(selection().selected).toEqual([documents])
  })

  it('clears the Selection', () => {
    selection().click(notepad, { ctrl: false })

    selection().clear()

    expect(selection().selected).toEqual([])
  })

  it('opens one Desktop shortcut and clears the Selection', () => {
    selection().click(notepad, { ctrl: false })
    selection().click(terminal, { ctrl: true })

    selection().openShortcut(terminal)

    expect(apps().terminal.state).toBe('open')
    expect(apps().notepad.state).toBe('closed')
    expect(selection().selected).toEqual([])
  })

  it('opens every selected App and Folder and clears the Selection', () => {
    selection().click(notepad, { ctrl: false })
    selection().click(documents, { ctrl: true })

    selection().openSelected()

    expect(apps().notepad.state).toBe('open')
    expect(apps().haythem_frikha.state).toBe('open')
    expect(useExplorerStore.getState().location.path).toEqual(['documents'])
    expect(selection().selected).toEqual([])
  })
})
