import { ArrowDownloadRegular } from '@fluentui/react-icons/headless/svg/arrow-download'
import { ArrowLeftRegular } from '@fluentui/react-icons/headless/svg/arrow-left'
import { ArrowUploadRegular } from '@fluentui/react-icons/headless/svg/arrow-upload'
import { DocumentPdfRegular } from '@fluentui/react-icons/headless/svg/document-pdf'
import { format, parseISO } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { NavButton } from '@/components/ui/nav-button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { root } from '@/data/directories'
import useLocalize from '@/hooks/useLocalize'
import { fileLabel, getFolder, pathKey } from '@/lib/directories'
import type { FolderPath } from '@/lib/directories'
import { pdfFolders, pdfId, pdfsIn } from '@/lib/pdfs'
import { cn } from '@/lib/utils'
import { usePdfStore } from '@/stores/pdf.store'
import type { PdfEntry } from '@/stores/pdf.store'
import { datefnsLocales, useThemeStore } from '@/stores/theme.store'
import type { Locale } from '@/stores/theme.store'

const cloudItems = [
  'your_files',
  'scans',
  'shared_by_you',
  'shared_by_others',
] as const

const columns = 'grid items-center gap-3 px-3'
const columnStyle = { gridTemplateColumns: 'minmax(0, 1fr) 12rem 4.5rem' }
const sectionTitleClassName =
  'px-2 pt-4 pb-1 text-xs text-muted-foreground dark:text-(--white)'

function formatSize(bytes: number) {
  const compact = (value: number) => {
    const rounded =
      value >= 10 ? Math.round(value) : Math.round(value * 10) / 10
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
  }
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${compact(kb)} KB`
  return `${compact(kb / 1024)} MB`
}

function openedLabel(openedAt: string | null, locale: Locale) {
  if (!openedAt) return ''
  return format(parseISO(openedAt), 'PPp', { locale: datefnsLocales[locale] })
}

// Uploads have no path: they are the visitor's own files, not ours to offer.
function DownloadLink({
  entry,
  label,
  className,
}: {
  entry: PdfEntry
  label: string
  className?: string
}) {
  if (entry.path === null) return null
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={entry.src}
          download={fileLabel(entry)}
          aria-label={label}
          className={cn(
            'flex size-10.5 shrink-0 items-center justify-center rounded-sm hover-shade',
            className,
          )}
        >
          <ArrowDownloadRegular className="size-4 text-foreground dark:text-(--white)" />
        </a>
      </TooltipTrigger>
      <TooltipContent sideOffset={4}>{label}</TooltipContent>
    </Tooltip>
  )
}

function entriesIn(path: FolderPath, recent: PdfEntry[]): PdfEntry[] {
  const folder = getFolder(path)
  if (!folder) return []
  return pdfsIn(folder, path).map((file) => {
    const id = pdfId(file)
    const known = recent.find((item) => item.id === id)
    return (
      known ?? {
        id,
        name: file.name,
        extension: file.extension,
        src: file.src,
        path: file.path,
        openedAt: null,
        size: null,
      }
    )
  })
}

export function Gymnast() {
  const localize = useLocalize()
  const locale = useThemeStore((state) => state.locale)
  const recent = usePdfStore((state) => state.recent)
  const recordOpen = usePdfStore((state) => state.recordOpen)
  const addUpload = usePdfStore((state) => state.addUpload)
  const requested = usePdfStore((state) => state.requested)
  const clearRequest = usePdfStore((state) => state.clearRequest)
  const inputRef = useRef<HTMLInputElement>(null)
  const [path, setPath] = useState<FolderPath | null>(null)
  const [browsing, setBrowsing] = useState(false)
  const [viewing, setViewing] = useState<PdfEntry | null>(null)
  const folders = pdfFolders(root)
  const title = path === null ? 'recent' : (getFolder(path)?.name ?? 'recent')
  const rows = path === null ? recent : entriesIn(path, recent)
  const tab = path === null ? 'recent' : pathKey(path)

  // A request from outside (e.g. the start menu) is shown once, on arrival.
  const [shownRequest, setShownRequest] = useState<PdfEntry | null>(null)
  if (requested && requested !== shownRequest) {
    setShownRequest(requested)
    setPath(null)
    setViewing(requested)
    setBrowsing(true)
  }
  useEffect(() => {
    if (requested) clearRequest()
  }, [requested, clearRequest])

  const selectRecent = () => {
    setPath(null)
    setViewing(null)
    setBrowsing(true)
  }

  const selectFolder = (next: FolderPath) => {
    setPath(next)
    setViewing(null)
    setBrowsing(true)
  }

  const onTab = (value: string) => {
    if (value === 'recent') {
      selectRecent()
      return
    }
    const folder = folders.find((node) => pathKey(node.path) === value)
    if (folder) selectFolder(folder.path)
  }

  const openEntry = (entry: PdfEntry) => {
    recordOpen(entry)
    setViewing(entry)
    setBrowsing(true)
  }

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) return
    addUpload(file)
    selectRecent()
  }

  return (
    <div className="flex h-full flex-col bg-popover/50 text-sm text-popover-foreground @md:flex-row">
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        tabIndex={-1}
        className="hidden"
        onChange={onUpload}
      />
      <aside
        aria-label={localize('gymnast_pdf')}
        className={cn(
          'min-h-0 shrink-0 flex-col gap-2 overflow-y-auto p-1 @md:w-56',
          browsing ? 'hidden @md:flex' : 'flex',
        )}
      >
        <Button
          variant="ghost"
          className="cursor-pointer justify-start rounded-xs bg-accent text-foreground"
          onClick={() => inputRef.current?.click()}
        >
          <ArrowUploadRegular />
          {localize('upload')}
        </Button>
        <Tabs
          orientation="vertical"
          value={tab}
          onValueChange={onTab}
          className="flex-col gap-0"
        >
          <TabsList aria-label={localize('recent')} className="w-full">
            <TabsTrigger value="recent" className="py-1.5">
              <span className="grow truncate text-left">
                {localize('recent')}
              </span>
            </TabsTrigger>
          </TabsList>
          <h2 className={sectionTitleClassName}>{localize('cloud_storage')}</h2>
          <TabsList aria-label={localize('cloud_storage')} className="w-full">
            {cloudItems.map((item) => (
              <TabsTrigger key={item} value={item} disabled className="py-1.5">
                <span className="grow truncate text-left">
                  {localize(item)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          <h2 className={sectionTitleClassName}>{localize('this_pc')}</h2>
          <TabsList aria-label={localize('this_pc')} className="w-full">
            {folders.map((node) => (
              <TabsTrigger
                key={pathKey(node.path)}
                value={pathKey(node.path)}
                className="py-1.5"
              >
                <span className="grow truncate text-left">
                  {localize(node.folder.name)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </aside>

      <section
        aria-label={viewing ? fileLabel(viewing) : localize(title)}
        className={cn(
          'm-1 min-h-0 min-w-0 grow flex-col rounded-md bg-popover dark:bg-background',
          browsing ? 'flex' : 'hidden @md:flex',
          viewing ? 'overflow-hidden' : 'overflow-auto',
        )}
      >
        {viewing ? (
          <>
            <div className="flex shrink-0 border-b border-muted-foreground/50 p-1">
              <NavButton
                label={localize('back')}
                onClick={() => setViewing(null)}
              >
                <ArrowLeftRegular className="size-4 text-foreground dark:text-(--white)" />
              </NavButton>
              <DownloadLink entry={viewing} label={localize('download')} />
            </div>
            <div className="relative min-h-0 grow">
              {/* react-doctor-disable-next-line react-doctor/iframe-missing-sandbox */}
              <iframe
                key={viewing.id}
                title={fileLabel(viewing)}
                src={viewing.src}
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </>
        ) : (
          <>
            <div className="shrink-0 p-1 @md:hidden">
              <NavButton
                label={localize('back')}
                onClick={() => setBrowsing(false)}
              >
                <ArrowLeftRegular className="size-4 text-foreground dark:text-(--white)" />
              </NavButton>
            </div>
            <h1 className="px-3 pt-3 pb-2 text-lg">{localize(title)}</h1>
            {/* The spacer matches the download slot in front of each row. */}
            <div className="flex pl-1">
              <span aria-hidden className="w-10.5 shrink-0" />
              <div
                className={cn(
                  columns,
                  'grow py-2 text-xs tracking-wide text-muted-foreground uppercase',
                )}
                style={columnStyle}
              >
                <span>{localize('name')}</span>
                <span>{localize('opened')}</span>
                <span className="text-right">{localize('size')}</span>
              </div>
            </div>
            <ul>
              {rows.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center border-t border-foreground/10 pl-1"
                >
                  <DownloadLink
                    entry={entry}
                    label={localize('download')}
                    className="h-13 rounded-none"
                  />
                  <button
                    type="button"
                    className={cn(
                      columns,
                      'min-w-0 grow cursor-pointer py-2 text-left hover:bg-accent/20',
                    )}
                    style={columnStyle}
                    onClick={() => openEntry(entry)}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <DocumentPdfRegular className="size-8 shrink-0" />
                      <span className="min-w-0">
                        <span className="block truncate">{entry.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {localize(entry.path?.at(-1) ?? 'uploaded')}
                        </span>
                      </span>
                    </span>
                    <span className="truncate">
                      {openedLabel(entry.openedAt, locale)}
                    </span>
                    <span className="text-right">
                      {entry.size == null ? '' : formatSize(entry.size)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  )
}
