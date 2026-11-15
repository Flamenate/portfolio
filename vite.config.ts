import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import babel from '@rolldown/plugin-babel';
import { bootstrap } from '@mercuryworkshop/proxy-bootstrap';

function scramjetProxy(): Plugin {
  return {
    name: 'scramjet-proxy',
    apply: 'serve',
    async configureServer(server) {
      const { routeRequest, routeUpgrade } = await bootstrap()
      server.middlewares.use((req, res, next) => {
        if (!routeRequest(req, res)) next()
      })
      // Vite's HMR socket shares this event, so unhandled upgrades must be left alone.
      server.httpServer?.on('upgrade', (req, socket, head) => {
        routeUpgrade(req, socket, head)
      })
    },
  }
}

const config = defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    scramjetProxy(),
    tanstackStart(),
    react(),
    babel({presets: [reactCompilerPreset()]}),
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
      buildDir: 'dist'
    }),
  ],
})

export default config
