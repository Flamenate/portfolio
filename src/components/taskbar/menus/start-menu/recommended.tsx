import { DocumentPdfRegular } from '@fluentui/react-icons/headless/svg/document-pdf'
import { parseISO } from 'date-fns'
import { useShallow } from 'zustand/react/shallow'
import useLocale from '@/hooks/useLocale'
import { appTitle } from '@/lib/apps'
import {
  fileIconSrc,
  fileId,
  fileLabel,
  recommendedFiles,
} from '@/lib/directories'
import { openFile } from '@/lib/open-file'
import { useAppStore } from '@/stores/app.store'
import { usePdfStore } from '@/stores/pdf.store'
import { StartMenuSection } from './section'

const MAX_ITEMS = 6
const MAX_FILES = 3

function RecommendedItem({
  icon,
  title,
  subtitle,
  onOpen,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
  onOpen: () => void
}) {
  return (
    <li>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-sm hover-shade px-2 py-1.5 text-left"
        onClick={onOpen}
      >
        <span className="grid size-8 shrink-0 place-items-center">{icon}</span>
        <span className="min-w-0">
          <span className="block truncate text-sm">{title}</span>
          {subtitle && (
            <span className="block truncate text-xs text-muted-foreground">
              {subtitle}
            </span>
          )}
        </span>
      </button>
    </li>
  )
}

export function Recommended({ onAction }: { onAction: () => void }) {
  const locale = useLocale()
  const { apps, focusHistory, openApp } = useAppStore(
    useShallow((state) => ({
      apps: state.apps,
      focusHistory: state.focusHistory,
      openApp: state.openApp,
    })),
  )
  const { recent, openPdf } = usePdfStore(
    useShallow((state) => ({ recent: state.recent, openPdf: state.openPdf })),
  )

  const featured = recommendedFiles.slice(0, MAX_FILES)
  const featuredIds = new Set(featured.map((file) => fileId(file)))
  const files = recent
    .filter((entry) => entry.openedAt !== null && !featuredIds.has(entry.id))
    .slice(0, MAX_FILES - featured.length)
  const recentApps = focusHistory.slice(
    0,
    MAX_ITEMS - featured.length - files.length,
  )

  return (
    <StartMenuSection title={locale.text('start_menu_recommended')}>
      {featured.length + files.length + recentApps.length === 0 ? (
        <p className="px-1 text-sm text-muted-foreground">
          {locale.text('start_menu_recommended_empty')}
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-1">
          {featured.map((file) => (
            <RecommendedItem
              key={fileId(file)}
              icon={
                <img
                  src={fileIconSrc(file)}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 object-contain"
                />
              }
              title={fileLabel(file)}
              onOpen={() => {
                openFile(file)
                onAction()
              }}
            />
          ))}
          {files.map((entry) => (
            <RecommendedItem
              key={entry.id}
              icon={<DocumentPdfRegular className="size-7 text-red-500" />}
              title={fileLabel(entry)}
              subtitle={locale.since(parseISO(entry.openedAt ?? ''))}
              onOpen={() => {
                openPdf(entry)
                onAction()
              }}
            />
          ))}
          {recentApps.map((label) => (
            <RecommendedItem
              key={label}
              icon={
                <img
                  src={apps[label].iconSrc}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 object-contain"
                />
              }
              title={appTitle(label, locale)}
              subtitle={locale.text(
                apps[label].state === 'closed'
                  ? 'start_menu_recently_used'
                  : 'start_menu_running',
              )}
              onOpen={() => {
                openApp(label)
                onAction()
              }}
            />
          ))}
        </ul>
      )}
    </StartMenuSection>
  )
}
