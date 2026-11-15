import { useThemeStore } from '@/stores/theme.store'
import localize from '@/utils/localize'

const colorSchemes = { light: 'light', dark: 'dark', system: 'light dark' }

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)
}

export function renderUnsupportedPage(url: string) {
  const { locale, palette } = useThemeStore.getState()
  const parsed = URL.parse(url)
  const title = escapeHtml(localize('browser_unsupported_title', locale))
  const description = escapeHtml(
    localize('browser_unsupported_description', locale, parsed?.host || url),
  )
  const link = parsed
    ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(localize('browser_open_in_new_tab', locale))}</a>`
    : ''

  return `<!doctype html>
<html lang="${locale === 'eng' ? 'en' : locale}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  :root { color-scheme: ${colorSchemes[palette]}; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    box-sizing: border-box;
    font-family: system-ui, sans-serif;
    text-align: center;
    background: light-dark(#f3f3f3, #202020);
    color: light-dark(#1a1a1a, #f3f3f3);
  }
  main { max-width: 28rem; }
  h1 { margin: 0 0 0.5rem; font-size: 1.25rem; }
  p { margin: 0 0 1.25rem; opacity: 0.8; line-height: 1.5; }
  a { color: light-dark(#005fb8, #60cdff); }
</style>
</head>
<body>
<main>
  <h1>${title}</h1>
  <p>${description}</p>
  ${link}
</main>
</body>
</html>`
}
