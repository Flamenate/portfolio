// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { FileExplorer } from '@/components/apps/file-explorer'
import { Photos } from '@/components/apps/photos'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useAppStore } from '@/stores/app.store'
import { useExplorerStore } from '@/stores/explorer.store'
import { usePhotosStore } from '@/stores/photos.store'

const photoTitle = () => useAppStore.getState().apps.photos.title

describe('opening a photo from the file explorer', () => {
  beforeEach(() => {
    useAppStore.setState(useAppStore.getInitialState(), true)
    usePhotosStore.setState(usePhotosStore.getInitialState(), true)
    useExplorerStore.getState().reset()
  })
  afterEach(cleanup)

  it('opens Photos on the photo that was double-clicked', () => {
    act(() => useExplorerStore.getState().navigate(['pictures', 'paris']))
    render(<FileExplorer />, { wrapper: TooltipProvider })

    fireEvent.doubleClick(screen.getByText('paris_shiba_inu.webp'))

    expect(useAppStore.getState().apps.photos.state).toBe('open')
    expect(usePhotosStore.getState().requested).toMatchObject({
      src: '/media/pictures/paris/paris_shiba_inu.webp',
      path: ['pictures', 'paris'],
    })
  })

  it('shows the requested photo in its folder and titles the window', () => {
    act(() =>
      usePhotosStore.getState().openPhoto({
        name: 'paris_shiba_inu',
        extension: 'webp',
        src: '/media/pictures/paris/paris_shiba_inu.webp',
        path: ['pictures', 'paris'],
      }),
    )

    render(<Photos />, { wrapper: TooltipProvider, reactStrictMode: true })

    expect(
      screen.getByRole('img', { name: 'paris_shiba_inu.webp' }),
    ).toBeTruthy()
    expect(photoTitle()).toBe('paris_shiba_inu.webp')
    expect(usePhotosStore.getState().requested).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /back/i }))

    expect(
      screen.queryByRole('img', { name: 'paris_shiba_inu.webp' }),
    ).toBeNull()
    expect(screen.getByRole('heading', { name: /paris/i })).toBeTruthy()
    expect(photoTitle()).toBeNull()
  })
})
