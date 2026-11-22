import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { server as wisp } from '@mercuryworkshop/wisp-js/server'

const directory = dirname(fileURLToPath(import.meta.url))

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

export function createProxyRouter({ proxyOrigin, portfolioOrigin }) {
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
    const path = pathnameOf(req.url)
    if (path === '/wisp/' && sameOrigin(req.headers.origin, proxy)) {
      wisp.routeRequest(req, socket, head)
      return true
    }
    socket.destroy()
    return true
  }

  return { handleRequest, handleUpgrade }
}
