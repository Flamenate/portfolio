import { createEnv } from '@t3-oss/env-core'
import * as z from 'zod/mini'
import { version } from '../package.json'

export const env = createEnv({
  runtimeEnv: import.meta.env,
  clientPrefix: 'VITE_',
  client: {
    VITE_NODE_ENV: z._default(
      z.enum(['development', 'production']),
      'development',
    ),
    VITE_DOMAIN: z.url(),
    VITE_APP_VERSION: z._default(z.string(), version),
    VITE_LAST_UPDATE: z._default(z.date(), new Date()),
  },
  server: {},
  emptyStringAsUndefined: true,
})
