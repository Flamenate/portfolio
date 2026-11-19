import { createEnv } from '@t3-oss/env-core'
import * as z from 'zod/mini'
import { version } from '../package.json'

export const env = createEnv({
  runtimeEnv: { ...import.meta.env, ...process.env },
  clientPrefix: 'VITE_',
  client: {
    VITE_NODE_ENV: z._default(
      z.enum(['development', 'production']),
      'development',
    ),
    VITE_DOMAIN: z.url(),
    VITE_PROXY_ORIGIN: z.url(),
    VITE_APP_VERSION: z._default(z.string(), version),
    VITE_LAST_UPDATE: z._default(z.date(), new Date()),
  },
  server: {
    RESEND_API_KEY: z.string(),
    SESSION_SECRET: z.string(),
    MAIL_FROM: z.string(),
    PORT: z._default(z.coerce.number(), 3000),
    TWITCH_IGDB_SECRET: z.string(),
    TWITCH_IGDB_CLIENT_ID: z.string(),
    STEAM_API_KEY: z.string(),
  },
  emptyStringAsUndefined: true,
})
