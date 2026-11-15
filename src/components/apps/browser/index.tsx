import { ArrowClockwiseRegular } from '@fluentui/react-icons/headless/svg/arrow-clockwise'
import { ArrowLeftRegular } from '@fluentui/react-icons/headless/svg/arrow-left'
import { ArrowRightRegular } from '@fluentui/react-icons/headless/svg/arrow-right'
import { HomeRegular } from '@fluentui/react-icons/headless/svg/home'
import { InfoRegular } from '@fluentui/react-icons/headless/svg/info'
import type { Frame } from '@mercuryworkshop/scramjet-controller'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
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
import useLocalize from '@/hooks/useLocalize'
import { createProxyFrame, getFrameUrl } from '@/lib/scramjet'
import { cn } from '@/lib/utils'
import { renderUnsupportedPage } from '../../../lib/unsupported-page'

const HOME_URL = 'https://github.com/Flamenate'
const SEARCH_URL = 'https://www.bing.com/search?q='

function toNavigableUrl(input: string) {
  const value = input.trim()
  if (/^https?:\/\//i.test(value)) return value
  if (!/\s/.test(value) && value.includes('.')) return `https://${value}`
  return SEARCH_URL + encodeURIComponent(value)
}

function escapedTabLocation(url: string) {
  return `/home?browse=${encodeURIComponent(url)}`
}

type History = { entries: string[]; index: number }

const homeRoute = getRouteApi('/home')

export function Browser() {
  const localize = useLocalize()
  const { browse } = homeRoute.useSearch()
  const navigateRoute = homeRoute.useNavigate()
  const [initialUrl] = useState(() =>
    browse ? toNavigableUrl(browse) : HOME_URL,
  )
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const frameRef = useRef<Frame>(null)
  // The iframe shares session history with the desktop, so back/forward replay
  // our own entries instead of calling history.back() on the frame.
  const pendingUrlRef = useRef<string>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [address, setAddress] = useState(initialUrl)
  const [history, setHistory] = useState<History>({ entries: [], index: -1 })

  const isReady = status === 'ready'
  const canGoBack = isReady && history.index > 0
  const canGoForward = isReady && history.index < history.entries.length - 1

  function showUrl(url: string) {
    if (document.activeElement !== inputRef.current) setAddress(url)
  }

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const abortController = new AbortController()
    const { signal } = abortController

    createProxyFrame(iframe, {
      onUrlChange: (url) => {
        if (!signal.aborted) showUrl(url)
      },
      renderUnsupportedPage,
      escapedTabLocation,
    }).then(
      (frame) => {
        if (signal.aborted) return
        frameRef.current = frame
        frame.go(initialUrl)
        setStatus('ready')
      },
      (error: unknown) => {
        console.error(error)
        if (!signal.aborted) setStatus('error')
      },
    )

    return () => abortController.abort()
  }, [initialUrl])

  useEffect(() => {
    if (browse) navigateRoute({ search: {}, replace: true })
  }, [browse, navigateRoute])

  function navigate(url: string) {
    frameRef.current?.go(url)
  }

  // History is built from document loads only: the URL watcher also fires on
  // replaceState, which would otherwise trap Back on pages that rewrite their URL.
  function handleLoad() {
    const url = frameRef.current && getFrameUrl(frameRef.current)
    if (!url) return

    showUrl(url)
    if (pendingUrlRef.current === url) {
      pendingUrlRef.current = null
      return
    }
    pendingUrlRef.current = null
    setHistory(({ entries, index }) =>
      entries[index] === url
        ? { entries, index }
        : { entries: [...entries.slice(0, index + 1), url], index: index + 1 },
    )
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
          label={localize('back')}
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
          label={localize('forward')}
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
          label={localize('reload')}
          disabled={!isReady}
          onClick={() => frameRef.current?.reload()}
        >
          <ArrowClockwiseRegular
            className={cn(
              'size-4',
              isReady && 'text-foreground dark:text-(--white)',
            )}
          />
        </NavButton>
        <NavButton
          label={localize('home')}
          disabled={!isReady}
          onClick={() => navigate(HOME_URL)}
        >
          <HomeRegular
            className={cn(
              'size-4',
              isReady && 'text-foreground dark:text-(--white)',
            )}
          />
        </NavButton>
        <form onSubmit={handleSubmit} className="flex min-w-0 grow">
          <Input
            ref={inputRef}
            type="text"
            inputMode="url"
            spellCheck={false}
            autoComplete="off"
            aria-label={localize('search_or_enter_address')}
            placeholder={localize('search_or_enter_address')}
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
            <NavButton label={localize('browser_info')}>
              <InfoRegular className="size-4 text-foreground dark:text-(--white)" />
            </NavButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{localize('browser_info_title')}</DialogTitle>
              <DialogDescription>
                {localize('browser_info_description')}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </header>
      <div className="relative min-h-0 grow">
        <iframe
          ref={iframeRef}
          onLoad={handleLoad}
          className="h-full w-full border-0 bg-white"
          title={localize('browser')}
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
            {localize('browser_failed_to_start')}
          </p>
        )}
      </div>
    </section>
  )
}
