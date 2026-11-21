const texts = import.meta.glob<string>('/src/data/texts/*.txt', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export function bundledText(fileName: string): string | undefined {
  return texts[`/src/data/texts/${fileName}`]
}
