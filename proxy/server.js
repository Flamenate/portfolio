import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { bootstrap } from '@mercuryworkshop/proxy-bootstrap'
import { server as wisp } from '@mercuryworkshop/wisp-js/server'

const directory = dirname(fileURLToPath(import.meta.url))

// Replaces a Scramjet worker left on the portfolio origin by older builds.
const killSwitch = `self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => self.clients.matchAll({ type: 'window' })).then((clients) => Promise.all(clients.map((client) => client.navigate(client.url)))),
  )
})
`

function assertSharedWisp() {
  const fromApp = import.meta.resolve('@mercuryworkshop/wisp-js/server')
  const fromBootstrap = import.meta.resolve(
    '@mercuryworkshop/wisp-js/server',
    import.meta.resolve('@mercuryworkshop/proxy-bootstrap'),
  )
  if (fromApp !== fromBootstrap) {
    throw new Error(
      `wisp-js is loaded twice, so the port and UDP limits would not apply.\nApp: ${fromApp}\nBootstrap: ${fromBootstrap}`,
    )
  }
}

function originOf(value, label) {
  try {
    return new URL(value).origin
  } catch {
    throw new Error(`${label} must be an absolute URL`)
  }
}

function jsonAttribute(value) {
  return JSON.stringify(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '\\u003c')
}

function pathnameOf(url) {
  try {
    return new URL(url ?? '/', 'http://localhost').pathname
  } catch {
    return '/'
  }
}

function sameOrigin(header, origin) {
  if (typeof header !== 'string' || header === 'null') return false
  try {
    return new URL(header).origin === origin
  } catch {
    return false
  }
}

export async function createProxyRouter({ proxyOrigin, portfolioOrigin }) {
  assertSharedWisp()
  const proxy = originOf(proxyOrigin, 'VITE_PROXY_ORIGIN')
  const portfolio = originOf(portfolioOrigin, 'portfolio origin')
  if (proxy === portfolio) {
    throw new Error(
      'VITE_PROXY_ORIGIN must be a different origin from the portfolio',
    )
  }
  const proxyHost = new URL(proxy).host

  wisp.options.allow_udp_streams = false
  wisp.options.port_whitelist = [80, 443]

  const { routeRequest, routeUpgrade } = await bootstrap()

  function isProxyHost(req) {
    const host = req.headers.host
    return typeof host === 'string' && host.toLowerCase() === proxyHost
  }

  function handleRequest(req, res) {
    const path = pathnameOf(req.url)
    if (!isProxyHost(req)) {
      if (path !== '/sw.js') return false
      res.writeHead(200, {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache',
      })
      res.end(killSwitch)
      return true
    }

    if (path === '/') {
      const html = readFileSync(join(directory, 'shell.html'), 'utf8').replace(
        '__PORTFOLIO_ORIGIN__',
        jsonAttribute(portfolio),
      )
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Security-Policy': `frame-ancestors ${portfolio}`,
        'Cache-Control': 'no-cache',
      })
      res.end(html)
      return true
    }

    if (path === '/shell.js') {
      res.writeHead(200, {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache',
      })
      res.end(readFileSync(join(directory, 'shell.js')))
      return true
    }

    if (routeRequest(req, res)) return true
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found')
    return true
  }

  function handleUpgrade(req, socket, head) {
    if (!isProxyHost(req)) return false
    const path = pathnameOf(req.url)
    if (path === '/wisp/' && sameOrigin(req.headers.origin, proxy)) {
      return routeUpgrade(req, socket, head)
    }
    socket.destroy()
    return true
  }

  return { handleRequest, handleUpgrade }
}
