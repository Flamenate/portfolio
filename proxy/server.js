import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { server as wisp } from '@mercuryworkshop/wisp-js/server'

const directory = dirname(fileURLToPath(import.meta.url))

// The wisp endpoint relays TCP to the public internet, so it is gated by a
// ticket from the shell page and capped per client.
const TICKET_LIFETIME_MS = 12 * 60 * 60 * 1000
const CONNECTION_LIFETIME_MS = 30 * 60 * 1000
const CONNECTIONS_PER_IP = 4
const STREAMS_PER_CONNECTION = 64
const STREAMS_PER_HOST = 16

// Every package entry point lives in its dist folder, next to the browser bundles.
function distFile(specifier, file) {
  return join(dirname(fileURLToPath(import.meta.resolve(specifier))), file)
}

// Served from node_modules so the versions pinned in package.json are the ones
// that run. Keep the paths in sync with shell.js.
const assetFiles = {
  '/scram/scramjet.js': [
    distFile('@mercuryworkshop/scramjet', 'scramjet.js'),
    'application/javascript; charset=utf-8',
  ],
  '/scram/scramjet.wasm': [
    distFile('@mercuryworkshop/scramjet', 'scramjet.wasm'),
    'application/wasm',
  ],
  '/scram/scramjet-utils.js': [
    distFile('@mercuryworkshop/scramjet-utils', 'scramjet-utils.js'),
    'application/javascript; charset=utf-8',
  ],
  '/controller/controller.api.js': [
    distFile('@mercuryworkshop/scramjet-controller', 'controller.api.js'),
    'application/javascript; charset=utf-8',
  ],
  '/controller/controller.inject.js': [
    distFile('@mercuryworkshop/scramjet-controller', 'controller.inject.js'),
    'application/javascript; charset=utf-8',
  ],
  '/controller/controller.sw.js': [
    distFile('@mercuryworkshop/scramjet-controller', 'controller.sw.js'),
    'application/javascript; charset=utf-8',
  ],
  '/clients/libcurl-client.js': [
    distFile('@mercuryworkshop/libcurl-transport', 'index.js'),
    'application/javascript; charset=utf-8',
  ],
}

const serviceWorker = `importScripts('/controller/controller.sw.js')
addEventListener('fetch', (event) => {
  if ($scramjetController.shouldRoute(event)) {
    event.respondWith($scramjetController.route(event))
  }
})
`

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

function parseRequestUrl(url) {
  try {
    return new URL(url ?? '/', 'http://localhost')
  } catch {
    return new URL('http://localhost/')
  }
}

// Behind a trusted reverse proxy, the socket address is the proxy's, so the
// client is the rightmost X-Forwarded-For entry: the one the proxy appended.
// Entries to its left come from the client and can be spoofed.
// IPv4 clients on a dual-stack socket show up as ::ffff:a.b.c.d.
function clientIp(req, trustProxy) {
  const forwarded = req.headers['x-forwarded-for']
  const address =
    trustProxy && typeof forwarded === 'string'
      ? forwarded.split(',').at(-1).trim()
      : (req.socket.remoteAddress ?? '')
  return address.startsWith('::ffff:') ? address.slice(7) : address
}

function rejectUpgrade(socket, status) {
  socket.end(`HTTP/1.1 ${status}\r\nConnection: close\r\n\r\n`)
}

function sameOrigin(header, origin) {
  if (typeof header !== 'string' || header === 'null') return false
  try {
    return new URL(header).origin === origin
  } catch {
    return false
  }
}

export function createProxyRouter({
  proxyOrigin,
  portfolioOrigin,
  trustProxy = false,
}) {
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
  // Per wisp connection. A heavy page opens a few dozen streams at once.
  wisp.options.stream_limit_total = STREAMS_PER_CONNECTION
  wisp.options.stream_limit_per_host = STREAMS_PER_HOST

  // Tickets only need to survive this process, so the key is never stored.
  const ticketKey = randomBytes(32)
  const connectionsByIp = new Map()

  function sign(ip, expiry) {
    return createHmac('sha256', ticketKey)
      .update(`${ip}|${expiry}`)
      .digest('base64url')
  }

  function issueTicket(ip) {
    const expiry = Date.now() + TICKET_LIFETIME_MS
    return `${expiry}.${sign(ip, expiry)}`
  }

  function isValidTicket(ticket, ip) {
    const [expiryText, signature] = ticket?.split('.') ?? []
    const expiry = Number(expiryText)
    if (!signature || !Number.isSafeInteger(expiry) || expiry < Date.now()) {
      return false
    }
    const expected = Buffer.from(sign(ip, expiry))
    const actual = Buffer.from(signature)
    return (
      actual.length === expected.length && timingSafeEqual(actual, expected)
    )
  }

  const assets = new Map(
    Object.entries(assetFiles).map(([path, [file, type]]) => [
      path,
      { body: readFileSync(file), type },
    ]),
  )

  function isProxyHost(req) {
    const host = req.headers.host
    return typeof host === 'string' && host.toLowerCase() === proxyHost
  }

  function handleRequest(req, res) {
    const path = parseRequestUrl(req.url).pathname
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
      const html = readFileSync(join(directory, 'shell.html'), 'utf8')
        .replace('__PORTFOLIO_ORIGIN__', jsonAttribute(portfolio))
        .replace(
          '__WISP_TICKET__',
          jsonAttribute(issueTicket(clientIp(req, trustProxy))),
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

    if (path === '/sw.js') {
      res.writeHead(200, {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache',
      })
      res.end(serviceWorker)
      return true
    }

    const asset = assets.get(path)
    if (asset) {
      res.writeHead(200, { 'Content-Type': asset.type })
      res.end(asset.body)
      return true
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found')
    return true
  }

  function handleUpgrade(req, socket, head) {
    if (!isProxyHost(req)) return false
    const url = parseRequestUrl(req.url)
    const ip = clientIp(req, trustProxy)
    // libcurl only accepts wisp URLs ending in a slash, so the ticket is a
    // path segment: /wisp/<ticket>/
    const ticket = /^\/wisp\/([^/]+)\/$/.exec(url.pathname)?.[1]
    if (
      !ticket ||
      !sameOrigin(req.headers.origin, proxy) ||
      !isValidTicket(ticket, ip)
    ) {
      rejectUpgrade(socket, '403 Forbidden')
      return true
    }

    const open = connectionsByIp.get(ip) ?? 0
    if (open >= CONNECTIONS_PER_IP) {
      rejectUpgrade(socket, '429 Too Many Requests')
      return true
    }
    connectionsByIp.set(ip, open + 1)
    const lifetime = setTimeout(() => socket.destroy(), CONNECTION_LIFETIME_MS)
    socket.once('close', () => {
      clearTimeout(lifetime)
      const remaining = (connectionsByIp.get(ip) ?? 1) - 1
      if (remaining > 0) connectionsByIp.set(ip, remaining)
      else connectionsByIp.delete(ip)
    })

    // wisp-js reads the path, and the ticket shouldn't end up in its logs.
    req.url = '/wisp/'
    wisp.routeRequest(req, socket, head)
    return true
  }

  return { handleRequest, handleUpgrade }
}
