import { ArrowLeftRegular } from '@fluentui/react-icons/headless/svg/arrow-left'
import { FolderRegular } from '@fluentui/react-icons/headless/svg/folder'
import { FolderOpenRegular } from '@fluentui/react-icons/headless/svg/folder-open'
import { ImageMultipleRegular } from '@fluentui/react-icons/headless/svg/image-multiple'
import { format, parseISO } from 'date-fns'
import { useState } from 'react'
import { FolderTree } from '@/components/ui/folder-tree'
import type { FolderTreeNode } from '@/components/ui/folder-tree'
import { NavButton } from '@/components/ui/nav-button'
import useLocalize from '@/hooks/useLocalize'
import { fileLabel, getFolder, pathKey, root } from '@/lib/directories'
import type { FolderPath } from '@/lib/directories'
import { photoFolders, photosByMonth, photosUnder } from '@/lib/photos'
import type { Photo, PhotoFolder } from '@/lib/photos'
import { cn } from '@/lib/utils'
import { datefnsLocales, useThemeStore } from '@/stores/theme.store'

function photoKey(photo: Photo) {
  return `${pathKey(photo.path)}/${fileLabel(photo)}`
}

function selectedLabel(path: FolderPath | null) {
  if (path === null) return 'all_photos'
  return (getFolder(path) ?? root).name
}

function photoTreeNode(node: PhotoFolder): FolderTreeNode {
  return {
    name: node.folder.name,
    path: node.path,
    children: node.children.map(photoTreeNode),
  }
}

function photoFolderIcon(_node: FolderTreeNode, isCurrent: boolean) {
  const Icon = isCurrent ? FolderOpenRegular : FolderRegular
  return <Icon className="size-5 shrink-0" />
}

function PhotoMasonry({
  photos,
  onOpen,
}: {
  photos: Photo[]
  onOpen: (photo: Photo) => void
}) {
  return (
    <ul className="columns-2 gap-2 p-2 @3xl:columns-3 @5xl:columns-4">
      {photos.map((item) => (
        <li key={photoKey(item)} className="mb-2 break-inside-avoid">
          <button
            type="button"
            aria-label={fileLabel(item)}
            className="relative block w-full overflow-hidden rounded-sm outline-accent-foreground focus-visible:outline-1"
            onClick={() => onOpen(item)}
          >
            <img
              src={item.src}
              alt=""
              draggable={false}
              className="block w-full"
            />
            <span aria-hidden className="absolute inset-0 hover-shade" />
          </button>
        </li>
      ))}
    </ul>
  )
}

function PhotoMonths({
  photos,
  onOpen,
}: {
  photos: Photo[]
  onOpen: (photo: Photo) => void
}) {
  const locale = useThemeStore((state) => state.locale)
  return (
    <>
      {photosByMonth(photos).map((group) => (
        <div key={group.key}>
          {group.date && (
            <h2 className="px-2 pt-2">
              {format(parseISO(group.date), 'MMMM yyyy', {
                locale: datefnsLocales[locale],
              })}
            </h2>
          )}
          <PhotoMasonry photos={group.photos} onOpen={onOpen} />
        </div>
      ))}
    </>
  )
}

export function Photos() {
  const localize = useLocalize()
  const [path, setPath] = useState<FolderPath | null>(null)
  const [browsing, setBrowsing] = useState(false)
  const [photo, setPhoto] = useState<Photo | null>(null)
  const tree = photoFolders(root)
  const photos = photosUnder(path)
  const title = selectedLabel(path)
  const HeaderIcon = path === null ? ImageMultipleRegular : FolderOpenRegular

  const selectFolder = (next: FolderPath | null) => {
    setPath(next)
    setBrowsing(true)
    setPhoto(null)
  }

  if (photo) {
    const label = fileLabel(photo)
    return (
      <div className="flex h-full flex-col bg-popover/50 text-popover-foreground">
        <div className="shrink-0 border-b border-muted-foreground/50 p-1">
          <NavButton label={localize('back')} onClick={() => setPhoto(null)}>
            <ArrowLeftRegular className="size-4 text-foreground dark:text-(--white)" />
          </NavButton>
        </div>
        <div className="relative min-h-0 grow">
          <img
            src={photo.src}
            alt={label}
            className="absolute top-1/2 left-1/2 max-h-full max-w-full -translate-1/2 object-contain p-2"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-popover/50 text-sm text-popover-foreground @md:flex-row">
      <aside
        aria-label={localize('photos')}
        className={cn(
          'min-h-0 shrink-0 overflow-y-auto p-1 @md:w-48',
          browsing && 'hidden @md:block',
        )}
      >
        <FolderTree
          nodes={tree ? [photoTreeNode(tree)] : []}
          currentPath={path}
          onSelect={selectFolder}
          renderIcon={photoFolderIcon}
          rowClassName="gap-2 px-3 py-2.5"
          indentBase={0.75}
        >
          <li>
            <button
              type="button"
              aria-current={path === null ? 'page' : undefined}
              className={cn(
                'mb-5 flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2.5 text-left whitespace-nowrap',
                path === null ? 'bg-accent/30' : 'hover:bg-accent/20',
              )}
              onClick={() => selectFolder(null)}
            >
              <ImageMultipleRegular className="size-5 shrink-0" />
              <span className="truncate">{localize('all_photos')}</span>
            </button>
          </li>
        </FolderTree>
      </aside>

      <section
        aria-label={localize(title)}
        className={cn(
          'm-1 min-h-0 min-w-0 grow flex-col overflow-y-auto rounded-md bg-popover dark:bg-background',
          browsing ? 'flex' : 'hidden @md:flex',
        )}
      >
        <div className="shrink-0 p-1 @md:hidden">
          <NavButton
            label={localize('back')}
            onClick={() => setBrowsing(false)}
          >
            <ArrowLeftRegular className="size-4 text-foreground dark:text-(--white)" />
          </NavButton>
        </div>
        <div className="mb-5 px-3 pt-3">
          <div className="flex items-center gap-2">
            <HeaderIcon className="size-8 shrink-0" />
            <h1 className="truncate text-lg">{localize(title)}</h1>
          </div>
          <p className="text-muted-foreground">
            {photos.length === 1
              ? localize('photo_count_one')
              : localize('photo_count', photos.length)}
          </p>
        </div>
        <PhotoMonths photos={photos} onOpen={setPhoto} />
      </section>
    </div>
  )
}
