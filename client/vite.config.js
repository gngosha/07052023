import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/text.html'),
        nested: resolve(__dirname, 'nested/map.html'),
      },
    },
    target: 'esnext',
  },
})