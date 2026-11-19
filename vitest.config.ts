import { defineConfig } from 'vitest/config'

// Kept separate from vite.config.ts: the app config pulls in TanStack Start, Nitro and the
// Scramjet dev proxy, none of which the tests need.
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
