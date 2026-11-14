import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';
import babel from '@rolldown/plugin-babel';

const config = defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    tanstackStart(),
    react(),
    babel({presets: [reactCompilerPreset()]}),
    tailwindcss(),
    nitro({
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
