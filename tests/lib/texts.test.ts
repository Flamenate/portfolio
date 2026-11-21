import { describe, expect, it } from 'vitest'
import { appForExtension, fileLabel, findFiles } from '@/lib/directories'
import { bundledText } from '@/lib/texts'

describe('Text Files', () => {
  it('bundles text for every File that opens in Notepad', () => {
    const missing = findFiles(
      (file) => appForExtension(file.extension) === 'notepad',
    )
      .filter((file) => bundledText(file.src) === undefined)
      .map(fileLabel)

    expect(missing).toEqual([])
  })
})
