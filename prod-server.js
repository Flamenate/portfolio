import http from 'node:http'
import { bootstrap } from '@mercuryworkshop/proxy-bootstrap'
import { middleware } from './.output/server/index.mjs'

const { routeRequest, routeUpgrade } = await bootstrap()

const server = http.createServer((req, res) => {
  if (!routeRequest(req, res)) middleware(req, res)
})

server.on('upgrade', (req, socket, head) => {
  if (!routeUpgrade(req, socket, head)) socket.destroy()
})

const port = Number(process.env.PORT ?? 3000)
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
