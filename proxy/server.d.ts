import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Duplex } from 'node:stream'

export function createProxyRouter(options: {
  proxyOrigin: string
  portfolioOrigin: string
  /** Read the client IP from the rightmost X-Forwarded-For entry. */
  trustProxy?: boolean
}): {
  handleRequest: (req: IncomingMessage, res: ServerResponse) => boolean
  handleUpgrade: (req: IncomingMessage, socket: Duplex, head: Buffer) => boolean
}
