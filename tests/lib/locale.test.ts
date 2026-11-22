import { afterEach, describe, expect, it, vi } from 'vitest'
import { createLocale } from '@/lib/locale'
import type { TranslationKey } from '@/lib/locale'

vi.mock('@/locales.json', () => ({
  default: {
    only_eng: { eng: 'Only English', fr: '', es: '' },
    untranslated: { eng: '', fr: '', es: '' },
    range: { eng: '{0} of {1}', fr: '{0} sur {1}', es: '' },
    present: { eng: 'Present', fr: 'Présent', es: 'Presente' },
  },
}))

const key = (value: string) => value as TranslationKey

describe('Locale', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('falls back to English, then to the key itself', () => {
    const fr = createLocale('fr')

    expect(fr.text(key('only_eng'))).toBe('Only English')
    expect(fr.text(key('untranslated'))).toBe('untranslated')
  })

  it('fills {n} placeholders and keeps the ones without a value', () => {
    const fr = createLocale('fr')

    expect(fr.text(key('range'), 3, 'dix')).toBe('3 sur dix')
    expect(fr.text(key('range'), 3)).toBe('3 sur {1}')
  })

  it('formats dates in the Locale', () => {
    expect(createLocale('fr').date(new Date(2024, 0, 15), 'PPP')).toBe(
      '15 janvier 2024',
    )
  })

  it('describes elapsed time in the Locale', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 0, 18))

    expect(createLocale('fr').since(new Date(2024, 0, 15))).toBe(
      'il y a 3 jours',
    )
  })

  it('shows an open period as ongoing', () => {
    const period = { start: new Date(2023, 8, 1), end: null }

    expect(createLocale('fr').period(period)).toBe('sept. 2023 - Présent')
  })
})
