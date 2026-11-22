// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { MockInstance } from 'vitest'
import { FileExplorer } from '@/components/apps/file-explorer'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAppStore } from '@/stores/app.store'
import { EXPLORER_APP_LABEL, useExplorerStore } from '@/stores/explorer.store'
import { usePdfStore } from '@/stores/pdf.store'

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

describe('opening a PDF from the file explorer', () => {
  beforeEach(() => {
    useAppStore.setState(useAppStore.getInitialState(), true)
    usePdfStore.setState(usePdfStore.getInitialState(), true)
    explorer().reset()
  })
  afterEach(cleanup)

  it('opens Gymnast on the PDF and records it as most recent', () => {
    act(() => explorer().navigate(['documents']))
    render(<FileExplorer />, { wrapper: TooltipProvider })

    fireEvent.doubleClick(screen.getByText('EF SET Certificate.pdf'))

    expect(useAppStore.getState().apps.gymnast_pdf.state).toBe('open')
    expect(usePdfStore.getState().recent[0]).toMatchObject({
      src: '/documents/EF SET Certificate.pdf',
      path: ['documents'],
    })
  })
})

describe('opening an unsupported File from the file explorer', () => {
  const openWindows = () =>
    Object.values(useAppStore.getState().apps).filter(
      (app) => app.state !== 'closed',
    )
  const fileButton = () =>
    screen.getByRole('button', { name: 'definitely_not_a_virus.exe' })
  const queryDialog = () => screen.queryByRole('alertdialog')
  let play: MockInstance<(this: HTMLMediaElement) => Promise<void>>

  beforeEach(() => {
    play = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockResolvedValue(undefined)
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockReturnValue(undefined)
    useAppStore.setState(useAppStore.getInitialState(), true)
    explorer().reset()
    act(() => explorer().navigate(['downloads']))
    render(<FileExplorer />, { wrapper: TooltipProvider })
  })
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('warns with an alert titled after the File instead of opening a Window', () => {
    fireEvent.doubleClick(screen.getByText('definitely_not_a_virus.exe'))

    const dialog = screen.getByRole('alertdialog', {
      name: 'definitely_not_a_virus.exe',
    })
    expect(
      within(dialog).getByText(
        'The requested file format is no longer supported.',
      ),
    ).toBeTruthy()
    expect(openWindows()).toEqual([])
  })

  it('warns when the File is opened with Enter and focuses OK', () => {
    fireEvent.keyDown(screen.getByText('node_modules.zip'), { key: 'Enter' })

    const dialog = screen.getByRole('alertdialog', { name: 'node_modules.zip' })
    expect(document.activeElement).toBe(
      within(dialog).getByRole('button', { name: 'OK' }),
    )
  })

  it.each([
    ['OK', () => fireEvent.click(screen.getByRole('button', { name: 'OK' }))],
    [
      'the X button',
      () => fireEvent.click(screen.getByRole('button', { name: 'Close' })),
    ],
    [
      'Escape',
      () =>
        fireEvent.keyDown(screen.getByRole('alertdialog'), { key: 'Escape' }),
    ],
  ])('closes with %s and returns focus to the File', async (_, dismiss) => {
    fileButton().focus()
    fireEvent.keyDown(fileButton(), { key: 'Enter' })
    expect(queryDialog()).not.toBeNull()

    dismiss()

    expect(queryDialog()).toBeNull()
    await waitFor(() => expect(document.activeElement).toBe(fileButton()))
  })

  it('plays the error sound each time the alert opens', () => {
    const errorSoundPlays = () =>
      play.mock.contexts.filter((audio) =>
        audio.src.endsWith('/audio/error.wav'),
      ).length

    fireEvent.doubleClick(fileButton())
    expect(errorSoundPlays()).toBe(1)

    fireEvent.click(screen.getByRole('button', { name: 'OK' }))
    fireEvent.doubleClick(fileButton())
    expect(errorSoundPlays()).toBe(2)
  })
})
