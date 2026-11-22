import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Duplex } from 'node:stream'

export function createProxyRouter(options: {
  proxyOrigin: string
  portfolioOrigin: string
}): {
  handleRequest: (req: IncomingMessage, res: ServerResponse) => boolean
  handleUpgrade: (req: IncomingMessage, socket: Duplex, head: Buffer) => boolean
}
