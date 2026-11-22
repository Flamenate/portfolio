// @vitest-environment jsdom
import { act, cleanup } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { useConnectionType } from '@/hooks/useConnectionType'
import { useNotificationStore } from '@/stores/notification.store'

function Probe() {
  useConnectionType()
  return null
}

const notifications = () => useNotificationStore.getState().notifications

function setOnline(online: boolean) {
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    get: () => online,
  })
}

describe('useConnectionType', () => {
  beforeEach(() => {
    useNotificationStore.setState(useNotificationStore.getInitialState(), true)
    setOnline(true)
  })
  afterEach(cleanup)

  it('does not notify when hydration replaces the server snapshot', () => {
    const container = document.createElement('div')
    container.innerHTML = renderToString(<Probe />)

    let root!: Root
    act(() => {
      root = hydrateRoot(container, <Probe />)
    })
    expect(notifications()).toHaveLength(0)

    setOnline(false)
    act(() => {
      window.dispatchEvent(new Event('offline'))
    })
    expect(notifications().map((n) => n.content)).toEqual(['connection_lost'])

    act(() => root.unmount())
  })
})
