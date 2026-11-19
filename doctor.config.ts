import { defineConfig } from 'react-doctor/api'

export default defineConfig({
  ignore: {
    rules: [
      'react-doctor/no-layout-property-animation',
      'react-doctor/use-lazy-motion',
      'react-doctor/only-export-components',
      'react-doctor/tanstack-form-on-submit-requires-prevent-default', //until https://github.com/millionco/react-doctor/issues/2519 is resolved
    ],
    files: ['*.mjs'],
  },
  verbose: true,
  share: false,
})
