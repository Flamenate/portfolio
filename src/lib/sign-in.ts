import { createIsomorphicFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

// A cookie, not localStorage, so SSR sees the Sign-in instead of redirecting before hydration.
const COOKIE_NAME = 'signedIn'
const COOKIE_VALUE = '1'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export const isSignedIn = createIsomorphicFn()
  .server(() => getCookie(COOKIE_NAME) === COOKIE_VALUE)
  .client(() =>
    document.cookie.split('; ').includes(`${COOKIE_NAME}=${COOKIE_VALUE}`),
  )

export function markSignedIn() {
  document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax`
}
