import { beforeEach, describe, expect, it } from 'vitest'
import { root } from '@/data/directories'
import { useAppStore } from '@/stores/app.store'
import { EXPLORER_APP_LABEL, useExplorerStore } from '@/stores/explorer.store'

const explorer = () => useExplorerStore.getState()
const apps = () => useAppStore.getState()

describe('Explorer navigation', () => {
  beforeEach(() => {
    explorer().reset()
    useAppStore.setState(useAppStore.getInitialState(), true)
  })

  it('starts at the root folder', () => {
    expect(explorer().location).toEqual({ path: [], folder: root })
    expect(explorer().canGoBack).toBe(false)
    expect(explorer().canGoForward).toBe(false)
  })

  it('navigates into a folder', () => {
    explorer().navigate(['documents'])

    expect(explorer().location.path).toEqual(['documents'])
    expect(explorer().location.folder.name).toBe('documents')
    expect(explorer().canGoBack).toBe(true)
  })

  it('goes back and forward through history', () => {
    explorer().navigate(['documents'])
    explorer().navigate(['pictures'])

    explorer().back()
    expect(explorer().location.path).toEqual(['documents'])
    expect(explorer().canGoForward).toBe(true)

    explorer().forward()
    expect(explorer().location.path).toEqual(['pictures'])
    expect(explorer().canGoForward).toBe(false)
  })

  it('ignores paths that are not in the folder tree', () => {
    explorer().navigate(['documents'])
    explorer().navigate(['documents', 'pictures'])

    expect(explorer().location.path).toEqual(['documents'])
    explorer().back()
    expect(explorer().location.path).toEqual([])
  })

  it('ignores navigating to the current folder', () => {
    explorer().navigate(['documents'])
    explorer().navigate(['documents'])

    explorer().back()
    expect(explorer().location.path).toEqual([])
  })

  it('drops forward entries when navigating from the middle of history', () => {
    explorer().navigate(['documents'])
    explorer().navigate(['pictures'])
    explorer().back()

    explorer().navigate(['music'])

    expect(explorer().canGoForward).toBe(false)
    explorer().back()
    expect(explorer().location.path).toEqual(['documents'])
  })

  it('stops at both ends of history', () => {
    explorer().navigate(['documents'])

    explorer().forward()
    expect(explorer().location.path).toEqual(['documents'])

    explorer().back()
    explorer().back()
    expect(explorer().location.path).toEqual([])
  })

  it('opens a folder in the explorer window and keeps the previous place in history', () => {
    explorer().navigate(['documents'])

    explorer().openFolder(['pictures'])

    expect(explorer().location.path).toEqual(['pictures'])
    expect(apps().apps[EXPLORER_APP_LABEL].state).toBe('open')
    expect(apps().focusedAppLabel).toBe(EXPLORER_APP_LABEL)
    explorer().back()
    expect(explorer().location.path).toEqual(['documents'])
  })

  it('resets to a fresh history at the root', () => {
    explorer().navigate(['documents'])

    explorer().reset()

    expect(explorer().location.path).toEqual([])
    expect(explorer().canGoBack).toBe(false)
  })

  it('keeps history while the explorer window is minimized', () => {
    explorer().openFolder(['documents'])

    apps().minimizeApp(EXPLORER_APP_LABEL)

    expect(explorer().location.path).toEqual(['documents'])
  })

  it('starts fresh at the root when the explorer window closes, even from minimized', () => {
    explorer().openFolder(['documents'])
    apps().minimizeApp(EXPLORER_APP_LABEL)

    apps().closeApp(EXPLORER_APP_LABEL)

    expect(explorer().location.path).toEqual([])
    expect(explorer().canGoBack).toBe(false)
  })
})
