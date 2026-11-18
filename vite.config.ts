import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import { createProxyRouter } from './proxy/server.js'

function scramjetProxy(): Plugin {
  return {
    name: 'scramjet-proxy',
    apply: 'serve',
    async configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      const proxyOrigin = env.VITE_PROXY_ORIGIN
      if (!proxyOrigin) throw new Error('VITE_PROXY_ORIGIN must be set')
      // VITE_DOMAIN is the public site URL. The dev server is opened on localhost.
      const port = server.config.server.port
      const { handleRequest, handleUpgrade } = await createProxyRouter({
        proxyOrigin,
        portfolioOrigin: `http://localhost:${port}`,
      })
      server.middlewares.use((req, res, next) => {
        if (!handleRequest(req, res)) next()
      })
      // Vite's HMR socket shares this event, so unhandled upgrades must be left alone.
      server.httpServer?.on('upgrade', (req, socket, head) => {
        handleUpgrade(req, socket, head)
      })
    },
  }
}

const config = defineConfig({
  server: {
    // proxy.localhost resolves to 127.0.0.1. The default localhost bind is IPv6-only on Windows.
    host: '127.0.0.1',
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    scramjetProxy(),
    tanstackStart(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    nitro({
      preset: 'node-middleware',
      serveStatic: true,
      routeRules: {
        '/public/*': {
          headers: {
            'Cache-Control': 'public, max-age=31536000',
          },
        },
      },
      compressPublicAssets: {
        brotli: true,
        gzip: true,
      },
      buildDir: 'dist',
    }),
  ],
})

export default config
