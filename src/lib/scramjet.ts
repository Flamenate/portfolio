import type {} from '@mercuryworkshop/proxy-bootstrap'
import type { Controller, Frame } from '@mercuryworkshop/scramjet-controller'
import type {} from '@mercuryworkshop/scramjet-utils'

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

type RequestErrorEvent = { rawrequest: { rawUrl: string; destination: string } }
type RequestErrorResult = {
  suppressError: boolean
  setResponse?: {
    body: string
    status: number
    statusText: string
    headers: [string, string][]
  }
}

let controllerPromise: Promise<Controller> | undefined

function loadBootstrapScript() {
  if ('initBootstrap' in window) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = '/bootstrap-init.js'
    script.onload = () => resolve()
    script.onerror = () =>
      reject(new Error('Failed to load /bootstrap-init.js'))
    document.head.append(script)
  })
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

export function getController() {
  controllerPromise ??= initController().catch((error: unknown) => {
    controllerPromise = undefined
    throw error
  })
  return controllerPromise
}

type Tap = <Event, Result>(
  hook: unknown,
  callback: (event: Event, result: Result) => void,
) => void

function definePlugin(name: string, setup: (frame: Frame, tap: Tap) => void) {
  class BrowserPlugin extends $scramjetController.ManagedPlugin {
    // Inherited from Scramjet's Plugin, which the installed 1.x typings lack.
    declare tap: Tap

    install(frame: Frame) {
      super.install(frame)
      setup(frame, (hook, callback) => this.tap(hook, callback))
    }
  }
  return new BrowserPlugin(name, [])
}

function createUnsupportedSitePlugin(renderPage: (url: string) => string) {
  return definePlugin('unsupported-site', (frame, tap) => {
    tap<RequestErrorEvent, RequestErrorResult>(
      frame.hooks.error.request,
      ({ rawrequest }, result) => {
        if (!['document', 'iframe'].includes(rawrequest.destination)) return
        result.suppressError = true
        result.setResponse = {
          body: renderPage(decodeUrl(frame, rawrequest.rawUrl) ?? ''),
          status: 502,
          statusText: 'Bad Gateway',
          headers: [['Content-Type', 'text/html; charset=utf-8']],
        }
      },
    )
  })
}

function findLink(event: MouseEvent) {
  for (const node of event.composedPath()) {
    const { tagName } = node as Partial<Element>
    if (tagName === 'A' || tagName === 'AREA') return node as HTMLAnchorElement
  }
  return null
}

function opensNewTab(event: MouseEvent, link: HTMLAnchorElement) {
  if (event.button === 1 || event.ctrlKey || event.metaKey || event.shiftKey) {
    return true
  }
  return !['', '_self', '_parent', '_top'].includes(link.target.toLowerCase())
}

// The bundled LinkHandlerPlugin hijacks every link click, so this only takes
// over the ones that would open a new tab.
function createSameFrameLinksPlugin() {
  return definePlugin('same-frame-links', (frame, tap) => {
    tap<{ window: Window }, unknown>(
      frame.hooks.init.post,
      ({ window: frameWindow }) => {
        const handleClick = (event: MouseEvent) => {
          if (event.defaultPrevented || event.button > 1) return
          const link = findLink(event)
          if (!link || !opensNewTab(event, link)) return
          const url = decodeUrl(frame, link.href) ?? link.href
          if (!/^https?:/i.test(url)) return
          event.preventDefault()
          frame.go(url)
        }
        frameWindow.addEventListener('click', handleClick)
        frameWindow.addEventListener('auxclick', handleClick)
      },
    )
  })
}

export async function createProxyFrame(
  element: HTMLIFrameElement,
  {
    onUrlChange,
    renderUnsupportedPage,
    escapedTabLocation,
  }: {
    onUrlChange: (url: string) => void
    /** HTML shown in place of a page the proxy failed to load. */
    renderUnsupportedPage: (url: string) => string
    /** Where to redirect real tabs opened by the site, e.g. through window.open. */
    escapedTabLocation: (url: string) => string
  },
): Promise<Frame> {
  const controller = await getController()
  return controller.createFrame(element, {
    plugins: [
      new $scramjetUtils.HttpCachePlugin(),
      new $scramjetUtils.UrlWatcherPlugin(onUrlChange),
      new $scramjetUtils.CatchEscapedLinksPlugin((url) =>
        escapedTabLocation(url.href),
      ),
      createUnsupportedSitePlugin(renderUnsupportedPage),
      createSameFrameLinksPlugin(),
    ],
  })
}

function decodeUrl(frame: Frame, href: string) {
  try {
    const base = location.origin + frame.prefix
    if (!href.startsWith(base)) return null
    const decoded = frame.controller.config.codec.decode(
      href.slice(base.length),
    )
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

/** The real URL of the document loaded in the frame, or null if it isn't proxied. */
export function getFrameUrl(frame: Frame) {
  try {
    return decodeUrl(frame, frame.element.contentWindow?.location.href ?? '')
  } catch {
    return null
  }
}
