// Request metadata Scramjet appends to the URL of redirected navigations.
const INTERNAL_PARAMS = [
  '$rfp',
  '$rfs',
  '$module',
  '$tf',
  '$pf',
  '$iframe',
  '$mode',
  '$cred',
  '$dest',
  '$io',
  '$fs',
  '$csr',
  '$fakedataurl',
]

const portfolioOrigin = JSON.parse(
  document.body.dataset.portfolioOrigin ?? '""',
)

function post(message) {
  if (parent === window) return
  parent.postMessage(message, portfolioOrigin)
}

function loadBootstrapScript() {
  if ('initBootstrap' in window) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = '/bootstrap-init.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load /bootstrap-init.js'))
    document.head.append(script)
  })
}

let controllerPromise

function getController() {
  controllerPromise ??= initController().catch((error) => {
    controllerPromise = undefined
    throw error
  })
  return controllerPromise
}

async function initController() {
  await loadBootstrapScript()
  const controller = await window.initBootstrap()
  await controller.wait()
  // The service worker only keeps its frame registry in memory, so the request
  // that wakes it after an idle shutdown bypasses the proxy and 404s.
  setInterval(() => {
    controller.serviceWorkerController.postMessage(null)
  }, 20_000)
  return controller
}

function definePlugin(name, setup) {
  class BrowserPlugin extends globalThis.$scramjetController.ManagedPlugin {
    install(frame) {
      super.install(frame)
      setup(frame, (hook, callback) => this.tap(hook, callback))
    }
  }
  return new BrowserPlugin(name, [])
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)
}

function renderUnsupportedPage(url, ui) {
  const parsed = URL.parse(url)
  const title = escapeHtml(ui.title)
  const description = escapeHtml(
    ui.description.replaceAll('{0}', parsed?.host || url),
  )
  const link = parsed
    ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(ui.openInNewTab)}</a>`
    : ''

  return `<!doctype html>
<html lang="${escapeHtml(ui.lang)}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  :root { color-scheme: ${ui.colorScheme}; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    box-sizing: border-box;
    font-family: system-ui, sans-serif;
    text-align: center;
    background: light-dark(#f3f3f3, #202020);
    color: light-dark(#1a1a1a, #f3f3f3);
  }
  main { max-width: 28rem; }
  h1 { margin: 0 0 0.5rem; font-size: 1.25rem; }
  p { margin: 0 0 1.25rem; opacity: 0.8; line-height: 1.5; }
  a { color: light-dark(#005fb8, #60cdff); }
</style>
</head>
<body>
<main>
  <h1>${title}</h1>
  <p>${description}</p>
  ${link}
</main>
</body>
</html>`
}

function createUnsupportedSitePlugin(renderPage) {
  return definePlugin('unsupported-site', (frame, tap) => {
    tap(frame.hooks.error.request, ({ rawrequest }, result) => {
      if (!['document', 'iframe'].includes(rawrequest.destination)) return
      result.suppressError = true
      result.setResponse = {
        body: renderPage(decodeUrl(frame, rawrequest.rawUrl) ?? ''),
        status: 502,
        statusText: 'Bad Gateway',
        headers: [['Content-Type', 'text/html; charset=utf-8']],
      }
    })
  })
}

function findLink(event) {
  for (const node of event.composedPath()) {
    const { tagName } = node
    if (tagName === 'A' || tagName === 'AREA') return node
  }
  return null
}

function opensNewTab(event, link) {
  if (event.button === 1 || event.ctrlKey || event.metaKey || event.shiftKey) {
    return true
  }
  return !['', '_self', '_parent', '_top'].includes(link.target.toLowerCase())
}

// The bundled LinkHandlerPlugin hijacks every link click, so this only takes
// over the ones that would open a new tab.
function createSameFrameLinksPlugin() {
  return definePlugin('same-frame-links', (frame, tap) => {
    tap(frame.hooks.init.post, ({ window: frameWindow }) => {
      const handleClick = (event) => {
        if (event.defaultPrevented || event.button > 1) return
        const link = findLink(event)
        if (!link || !opensNewTab(event, link)) return
        const url = decodeUrl(frame, link.href) ?? link.href
        if (!isHttpUrl(url)) return
        event.preventDefault()
        frame.go(url)
      }
      frameWindow.addEventListener('click', handleClick)
      frameWindow.addEventListener('auxclick', handleClick)
    })
  })
}

function decodeUrl(frame, href) {
  try {
    const base = location.origin + frame.prefix
    if (!href.startsWith(base)) return null
    const decoded = frame.controller.config.codec.decode(href.slice(base.length))
    const url = new URL(decoded)
    if (!INTERNAL_PARAMS.some((param) => url.searchParams.has(param))) {
      return decoded
    }
    for (const param of INTERNAL_PARAMS) url.searchParams.delete(param)
    return url.href
  } catch {
    return null
  }
}

function getFrameUrl(frame) {
  try {
    return decodeUrl(frame, frame.element.contentWindow?.location.href ?? '')
  } catch {
    return null
  }
}

function isHttpUrl(value) {
  if (typeof value !== 'string') return false
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

function readUi(value) {
  if (typeof value !== 'object' || value === null) return null
  const { title, description, openInNewTab, lang, colorScheme } = value
  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof openInNewTab !== 'string' ||
    typeof lang !== 'string'
  ) {
    return null
  }
  if (
    colorScheme !== 'light' &&
    colorScheme !== 'dark' &&
    colorScheme !== 'light dark'
  ) {
    return null
  }
  return { title, description, openInNewTab, lang, colorScheme }
}

const view = document.querySelector('#view')
let frame = null
let ui = null

async function start(url) {
  const controller = await getController()
  frame = await controller.createFrame(view, {
    plugins: [
      new globalThis.$scramjetUtils.HttpCachePlugin(),
      new globalThis.$scramjetUtils.UrlWatcherPlugin((next) => {
        post({ type: 'url', url: String(next) })
      }),
      new globalThis.$scramjetUtils.CatchEscapedLinksPlugin(
        (escaped) =>
          `${portfolioOrigin}/home?browse=${encodeURIComponent(escaped.href)}`,
      ),
      createUnsupportedSitePlugin((failedUrl) =>
        renderUnsupportedPage(failedUrl, ui),
      ),
      createSameFrameLinksPlugin(),
    ],
  })
  view.addEventListener('load', () => {
    const current = getFrameUrl(frame)
    if (current) post({ type: 'load', url: current })
  })
  frame.go(url)
}

let starting = null

function onMessage(event) {
  if (event.origin !== portfolioOrigin || event.source !== parent) return
  const data = event.data
  if (typeof data !== 'object' || data === null) return

  if (data.type === 'init') {
    if (starting || frame) return
    const nextUi = readUi(data.ui)
    if (!nextUi || !isHttpUrl(data.url)) {
      post({ type: 'error' })
      return
    }
    ui = nextUi
    starting = start(data.url).then(
      () => {
        post({ type: 'ready' })
      },
      (error) => {
        console.error(error)
        post({ type: 'error' })
      },
    )
    return
  }

  if (!frame) return
  if (data.type === 'go' && isHttpUrl(data.url)) frame.go(data.url)
  if (data.type === 'reload') frame.reload()
}

window.addEventListener('message', onMessage)
post({ type: 'hello' })
setInterval(() => {
  if (!starting) post({ type: 'hello' })
}, 250)
