import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { useEffect, useEffectEvent } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useApplyTheme } from '@/hooks/useApplyTheme'
import { useNotificationStore } from '@/stores/notification.store'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Haythem Frikha',
      },
      {
        property: 'og:title',
        content: 'Haythem Frikha',
      },
      {
        property: 'og:description',
        content:
          'Haythem Frikha — Front-end developer portfolio showcasing responsive web apps, TypeScript/React projects, design case studies, and ways to connect.',
      },
      {
        property: 'og:image',
        content: '/images/pictures/ena.jpg',
      },
      {
        property: 'og:url',
        content: 'https://haythemfrikha.com',
      },
      {
        name: 'twitter:title',
        content: 'Haythem Frikha',
      },
      {
        name: 'twitter:description',
        content:
          'Haythem Frikha — Full-stack developer portfolio showcasing career projects and ways to connect in a fun, engaging, and interactive way.',
      },
      {
        name: 'twitter:image',
        content: '/images/pictures/ena.jpg',
      },
      {
        name: 'twitter:url',
        content: 'https://haythemfrikha.com',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/images/icons/windows.png',
        type: 'image/png',
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFound,
  errorComponent: ({ error }) => {
    console.error(error)
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
        <h1 className="mb-4 text-2xl font-bold">An error occurred</h1>
        <pre className="text-center whitespace-pre-wrap">
          {error instanceof Error ? error.message : 'An error occurred'}
        </pre>
      </div>
    )
  },
})

function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
      <p>Not found</p>
    </div>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  useApplyTheme()
  const addSystemNotification = useNotificationStore(
    (state) => state.addSystemNotification,
  )
  const handleGlobalError = useEffectEvent((event: ErrorEvent) => {
    if (
      event.message ===
      'ResizeObserver loop completed with undelivered notifications.'
    )
      return
    addSystemNotification({
      content: 'something_went_wrong',
      subcontent: 'something_went_wrong_description',
    })
  })
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest(
          'input, textarea, [contenteditable]:not([contenteditable="false"])',
        )
      )
        return
      event.preventDefault()
    }
    window.addEventListener('error', handleGlobalError)
    document.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('error', handleGlobalError)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body>
        <TooltipProvider>
          <main className='h-screen w-screen overscroll-none bg-[url("/images/pictures/desktop_bg.webp")] bg-cover bg-center bg-no-repeat dark:bg-[url("/images/pictures/desktop_dark_bg.png")]'>
            {children}
          </main>
        </TooltipProvider>

        {/* <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        /> */}
        <Scripts />
      </body>
    </html>
  )
}
