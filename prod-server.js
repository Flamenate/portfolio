import http from 'node:http'
import { createProxyRouter } from './proxy/server.js'
import { middleware } from './.output/server/index.mjs'

const proxyOrigin = process.env.VITE_PROXY_ORIGIN
const portfolioOrigin = process.env.VITE_DOMAIN
if (!proxyOrigin || !portfolioOrigin) {
  throw new Error('VITE_PROXY_ORIGIN and VITE_DOMAIN must be set')
}

const { handleRequest, handleUpgrade } = await createProxyRouter({
  proxyOrigin,
  portfolioOrigin,
})

const server = http.createServer((req, res) => {
  if (!handleRequest(req, res)) middleware(req, res)
})

server.on('upgrade', (req, socket, head) => {
  if (!handleUpgrade(req, socket, head)) socket.destroy()
})

const port = Number(process.env.PORT ?? 3000)
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
