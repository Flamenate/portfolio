import { defineConfig } from 'react-doctor/api'

export default defineConfig({
  ignore: {
    rules: [
      'react-doctor/no-layout-property-animation',
      'react-doctor/use-lazy-motion',
    ],
    files: ['*.mjs'],
  },
  verbose: true,
  share: false,
})
