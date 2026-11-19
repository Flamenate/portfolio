import type { FolderNode } from '@/lib/directories'

export const root: FolderNode = {
  type: 'folder',
  name: 'this_pc',
  children: [
    {
      type: 'folder',
      name: 'downloads',
      iconSrc: '/images/icons/downloads.webp',
      children: [],
    },
    {
      type: 'folder',
      name: 'documents',
      iconSrc: '/images/icons/documents.webp',
      children: [
        {
          type: 'file',
          name: 'Haythem_FRIKHA_ENG',
          extension: 'pdf',
          src: '/documents/Haythem_FRIKHA_ENG.pdf',
        },
        {
          type: 'file',
          name: 'Haythem_FRIKHA_FR',
          extension: 'pdf',
          src: '/documents/Haythem_FRIKHA_FR.pdf',
        },
      ],
    },
    {
      type: 'folder',
      name: 'pictures',
      iconSrc: '/images/icons/pictures.webp',
      children: [
        {
          type: 'file',
          name: 'ena',
          extension: 'jpg',
          src: '/images/pictures/ena.jpg',
          date: '2026-11-02',
        },
        {
          type: 'file',
          name: 'login_bg',
          extension: 'jpg',
          src: '/images/pictures/login_bg.webp',
          date: '2026-11-08',
        },
        {
          type: 'file',
          name: 'desktop_bg',
          extension: 'webp',
          src: '/images/pictures/desktop_bg.webp',
          date: '2026-10-14',
        },
        {
          type: 'file',
          name: 'desktop_bg_old',
          extension: 'webp',
          src: '/images/pictures/desktop_bg_old.webp',
          date: '2026-10-03',
        },
        {
          type: 'file',
          name: 'desktop_dark_bg',
          extension: 'png',
          src: '/images/pictures/desktop_dark_bg.webp',
          date: '2026-09-21',
        },
      ],
    },
    {
      type: 'folder',
      name: 'music',
      iconSrc: '/images/icons/music.webp',
      children: [],
    },
    {
      type: 'folder',
      name: 'recycle_bin',
      desktopShortcut: true,
      iconSrc: '/images/icons/recycle_bin_full.webp',
      children: [],
    },
    {
      type: 'folder',
      name: 'regrets',
      children: [],
    },
  ],
}
