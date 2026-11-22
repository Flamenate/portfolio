import { EventEmitter } from 'node:events'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createProxyRouter } from '../../proxy/server.js'

const { routeRequest } = vi.hoisted(() => ({ routeRequest: vi.fn() }))
vi.mock('@mercuryworkshop/wisp-js/server', () => ({
  server: { options: {}, routeRequest },
}))

const proxyHost = 'proxy.localhost:3000'

function request(url: string, ip: string) {
  return {
    url,
    headers: { host: proxyHost, origin: `http://${proxyHost}` },
    socket: { remoteAddress: ip },
  }
}

class FakeSocket extends EventEmitter {
  written = ''
  end(data = '') {
    this.written += data
  }
  destroy() {
    this.emit('close')
  }
}

function setup() {
  const router = createProxyRouter({
    proxyOrigin: `http://${proxyHost}`,
    portfolioOrigin: 'http://localhost:3000',
  })

  function ticketFor(ip: string) {
    let html = ''
    router.handleRequest(
      request('/', ip) as never,
      {
        writeHead: () => {},
        end: (body: string) => (html = body),
      } as never,
    )
    const attribute = /data-wisp-ticket="([^"]+)"/.exec(html)?.[1] ?? ''
    return JSON.parse(attribute.replaceAll('&quot;', '"')) as string
  }

  function upgrade(path: string, ip: string) {
    const socket = new FakeSocket()
    router.handleUpgrade(
      request(path, ip) as never,
      socket as never,
      Buffer.alloc(0),
    )
    return socket
  }

  return { ticketFor, upgrade }
}

describe('wisp upgrades', () => {
  beforeEach(() => routeRequest.mockClear())

  it('rejects connections without a valid ticket for the client IP', () => {
    const { ticketFor, upgrade } = setup()
    const ticket = ticketFor('203.0.113.1')
    const [expiry, signature] = ticket.split('.')

    for (const path of [
      '/wisp/',
      `/wisp/${expiry}.${signature.slice(0, -1)}A/`,
      `/wisp/${Number(expiry) + 1000}.${signature}/`,
    ]) {
      expect(upgrade(path, '203.0.113.1').written).toContain('403')
    }
    expect(upgrade(`/wisp/${ticket}/`, '203.0.113.2').written).toContain('403')
    expect(routeRequest).not.toHaveBeenCalled()
  })

  it('hands valid tickets to wisp with the ticket stripped from the path', () => {
    const { ticketFor, upgrade } = setup()
    // Dual-stack sockets report IPv4 clients as IPv4-mapped IPv6.
    const ticket = ticketFor('::ffff:203.0.113.1')

    upgrade(`/wisp/${ticket}/`, '203.0.113.1')

    expect(routeRequest).toHaveBeenCalledOnce()
    expect(routeRequest.mock.calls[0][0].url).toBe('/wisp/')
  })

  it('caps open connections per IP and frees a slot when one closes', () => {
    const { ticketFor, upgrade } = setup()
    const path = `/wisp/${ticketFor('203.0.113.1')}/`
    const open = Array.from({ length: 4 }, () => upgrade(path, '203.0.113.1'))

    expect(upgrade(path, '203.0.113.1').written).toContain('429')

    open[0].destroy()
    expect(upgrade(path, '203.0.113.1').written).toBe('')
    expect(routeRequest).toHaveBeenCalledTimes(5)
  })
})
