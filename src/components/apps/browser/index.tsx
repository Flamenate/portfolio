import { ArrowClockwiseRegular } from '@fluentui/react-icons/headless/svg/arrow-clockwise'
import { ArrowLeftRegular } from '@fluentui/react-icons/headless/svg/arrow-left'
import { ArrowRightRegular } from '@fluentui/react-icons/headless/svg/arrow-right'
import { InfoRegular } from '@fluentui/react-icons/headless/svg/info'
import { OpenRegular } from '@fluentui/react-icons/headless/svg/open'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { NavButton } from '@/components/ui/nav-button'
import { WindowLoading } from '@/components/ui/window-loading'
import { env } from '@/env'
import useLocale from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/stores/theme.store'
import { BrowseConfirmDialog } from './browse-confirm-dialog'

const START_URL = 'https://github.com/Flamenate'
const SEARCH_URL = 'https://www.bing.com/search?q='
const PROXY_ORIGIN = new URL(env.VITE_PROXY_ORIGIN).origin

const colorSchemes = {
  light: 'light',
  dark: 'dark',
  system: 'light dark',
} as const

function toNavigableUrl(input: string) {
  const value = input.trim()
  if (/^https?:\/\//i.test(value)) return value
  if (!/\s/.test(value) && value.includes('.')) return `https://${value}`
  return SEARCH_URL + encodeURIComponent(value)
}

function isHttpUrl(value: string) {
  const protocol = URL.parse(value)?.protocol
  return protocol === 'http:' || protocol === 'https:'
}

type History = { entries: string[]; index: number }

type ShellMessage =
  | { type: 'hello' }
  | { type: 'ready' }
  | { type: 'error' }
  | { type: 'url'; url: string }
  | { type: 'load'; url: string }

function readShellMessage(data: unknown): ShellMessage | null {
  if (typeof data !== 'object' || data === null || !('type' in data))
    return null
  if (data.type === 'hello' || data.type === 'ready' || data.type === 'error') {
    return { type: data.type }
  }
  if (
    (data.type === 'url' || data.type === 'load') &&
    'url' in data &&
    typeof data.url === 'string'
  ) {
    return { type: data.type, url: data.url }
  }
  return null
}

const homeRoute = getRouteApi('/home')

export function Browser() {
  const locale = useLocale()
  const palette = useThemeStore((state) => state.palette)
  const { browse } = homeRoute.useSearch()
  const navigateRoute = homeRoute.useNavigate()
  const [browseUrl] = useState(() => (browse ? toNavigableUrl(browse) : null))
  // Anyone can link to /home?browse=, so the visitor confirms before it loads.
  const [startUrl, setStartUrl] = useState(browseUrl ? null : START_URL)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // The iframe shares session history with the desktop, so back/forward replay
  // our own entries instead of calling history.back() on the frame.
  const pendingUrlRef = useRef<string>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [address, setAddress] = useState(browseUrl ?? START_URL)
  // The page's real URL, unlike `address`, which may hold unsubmitted typing.
  const pageUrl = useRef(browseUrl ?? START_URL)
  const [history, setHistory] = useState<History>({ entries: [], index: -1 })

  const isReady = status === 'ready'
  const canGoBack = isReady && history.index > 0
  const canGoForward = isReady && history.index < history.entries.length - 1

  function chooseStartUrl(url: string) {
    setStartUrl(url)
    setAddress(url)
    pageUrl.current = url
  }

  // The shell repeats its hello until it gets an init, so holding the init
  // back is enough to keep the page from loading until the visitor chooses.
  const sendShellInit = useEffectEvent((shell: HTMLIFrameElement) => {
    if (!startUrl) return
    shell.contentWindow?.postMessage(
      {
        type: 'init',
        url: startUrl,
        ui: {
          title: locale.text('browser_unsupported_title'),
          description: locale.text('browser_unsupported_description', '{0}'),
          openInNewTab: locale.text('browser_open_in_new_tab'),
          lang: locale.code === 'eng' ? 'en' : locale.code,
          colorScheme: colorSchemes[palette],
        },
      },
      PROXY_ORIGIN,
    )
  })

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const shell = iframe

    function showUrl(url: string) {
      pageUrl.current = url
      if (document.activeElement !== inputRef.current) setAddress(url)
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== PROXY_ORIGIN) return
      if (event.source !== shell.contentWindow) return
      const message = readShellMessage(event.data)
      if (!message) return

      if (message.type === 'hello') {
        sendShellInit(shell)
        return
      }
      if (message.type === 'ready') {
        setStatus('ready')
        return
      }
      if (message.type === 'error') {
        setStatus('error')
        return
      }
      if (message.type === 'url') {
        showUrl(message.url)
        return
      }
      showUrl(message.url)
      if (pendingUrlRef.current === message.url) {
        pendingUrlRef.current = null
        return
      }
      pendingUrlRef.current = null
      setHistory(({ entries, index }) =>
        entries[index] === message.url
          ? { entries, index }
          : {
              entries: [...entries.slice(0, index + 1), message.url],
              index: index + 1,
            },
      )
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    if (browse) navigateRoute({ search: {}, replace: true })
  }, [browse, navigateRoute])

  function post(message: { type: 'go'; url: string } | { type: 'reload' }) {
    iframeRef.current?.contentWindow?.postMessage(message, PROXY_ORIGIN)
  }

  function navigate(url: string) {
    post({ type: 'go', url })
  }

  function goToEntry(index: number) {
    const url = history.entries[index]
    pendingUrlRef.current = url
    setHistory({ entries: history.entries, index })
    setAddress(url)
    navigate(url)
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!address.trim()) return
    navigate(toNavigableUrl(address))
    inputRef.current?.blur()
  }

  return (
    <section className="flex h-full flex-col">
      <header className="flex h-14 shrink-0 items-center border-b border-muted-foreground/50 p-1">
        <NavButton
          label={locale.text('back')}
          disabled={!canGoBack}
          onClick={() => goToEntry(history.index - 1)}
        >
          <ArrowLeftRegular
            className={cn(
              'size-4',
              canGoBack && 'text-foreground dark:text-(--white)',
            )}
          />
        </NavButton>
        <NavButton
          label={locale.text('forward')}
          disabled={!canGoForward}
          onClick={() => goToEntry(history.index + 1)}
        >
          <ArrowRightRegular
            className={cn(
              'size-4',
              canGoForward && 'text-foreground dark:text-(--white)',
            )}
          />
        </NavButton>
        <NavButton
          label={locale.text('reload')}
          disabled={!isReady}
          onClick={() => post({ type: 'reload' })}
        >
          <ArrowClockwiseRegular
            className={cn(
              'size-4',
              isReady && 'text-foreground dark:text-(--white)',
            )}
          />
        </NavButton>
        <NavButton
          label={locale.text('browser_open_in_own_browser')}
          onClick={() => {
            if (!isHttpUrl(pageUrl.current)) return
            window.open(pageUrl.current, '_blank', 'noopener,noreferrer')
          }}
        >
          <OpenRegular className="size-4 text-foreground dark:text-(--white)" />
        </NavButton>
        <form onSubmit={handleSubmit} className="flex min-w-0 grow">
          <Input
            ref={inputRef}
            type="text"
            inputMode="url"
            spellCheck={false}
            autoComplete="off"
            aria-label={locale.text('search_or_enter_address')}
            placeholder={locale.text('search_or_enter_address')}
            disabled={!isReady}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            onFocus={(event) => event.currentTarget.select()}
            // The desktop cancels Enter keydowns, which would block implicit form submission.
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.stopPropagation()
            }}
          />
        </form>
        <Dialog>
          <DialogTrigger asChild>
            <NavButton label={locale.text('browser_info')}>
              <InfoRegular className="size-4 text-foreground dark:text-(--white)" />
            </NavButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{locale.text('browser_info_title')}</DialogTitle>
              <DialogDescription>
                {locale.text('browser_info_description')}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>
      <div className="relative min-h-0 grow">
        <iframe
          ref={iframeRef}
          src={`${PROXY_ORIGIN}/`}
          className="h-full w-full border-0 bg-white"
          title={locale.text('browser')}
          // react-doctor-disable-next-line react-doctor/iframe-missing-sandbox
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
        {status === 'loading' && (
          <WindowLoading className="absolute inset-0 bg-background" />
        )}
        {status === 'error' && (
          <p
            role="alert"
            className="absolute inset-0 flex items-center justify-center bg-background p-4 text-center"
          >
            {locale.text('browser_failed_to_start')}
          </p>
        )}
      </div>
      <BrowseConfirmDialog
        url={startUrl ? null : browseUrl}
        onOpen={chooseStartUrl}
        onCancel={() => chooseStartUrl(START_URL)}
      />
    </section>
  )
}
