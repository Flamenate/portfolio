// @vitest-environment jsdom
import { act, cleanup, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { FileExplorer } from '@/components/apps/file-explorer'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAppStore } from '@/stores/app.store'
import { EXPLORER_APP_LABEL, useExplorerStore } from '@/stores/explorer.store'

const explorer = () => useExplorerStore.getState()
const windowTitle = () => useAppStore.getState().apps[EXPLORER_APP_LABEL].title

describe('FileExplorer window', () => {
  beforeEach(() => {
    useAppStore.getState().closeApp(EXPLORER_APP_LABEL)
    explorer().reset()
    useAppStore.getState().setAppTitle(EXPLORER_APP_LABEL, null)
  })
  afterEach(cleanup)

  it('keeps the window title on the current folder while mounted', () => {
    render(<FileExplorer />, { wrapper: TooltipProvider })
    expect(windowTitle()).toBe('this_pc')

    act(() => explorer().navigate(['documents']))
    expect(windowTitle()).toBe('documents')

    act(() => explorer().back())
    expect(windowTitle()).toBe('this_pc')
  })

  it('titles the window with the folder it was opened at', () => {
    act(() => explorer().openFolder(['documents']))

    render(<FileExplorer />, {
      wrapper: TooltipProvider,
      reactStrictMode: true,
    })

    expect(explorer().location.path).toEqual(['documents'])
    expect(windowTitle()).toBe('documents')
  })
})
