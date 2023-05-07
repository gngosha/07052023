import { resolve } from 'path'
import { defineConfig } from 'vite'

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html'),
//         nested: resolve(__dirname, 'nested/text.html'),
//       },
//     },
//     target: 'esnext',
//   },
// })

// vite.config.js
export default {
    build: {
      target: 'esnext',
    },
    optimizeDeps: {
      include: ['leaflet', 'axios']
    },
    // Configure pages
    pages: {
      index: {
        // entry for the page
        entry: 'client/index.html',
        // the source template
        template: 'client/index.html',
        // output as dist/index.html
        filename: 'index.html'
      },
      map: {
        // entry for the page
        entry: 'client/map.html',
        // the source template
        template: 'client/map.html',
        // output as dist/map/index.html
        filename: 'map/index.html'
      },
      text: {
        // entry for the page
        entry: 'client/text.html',
        // the source template
        template: 'client/text.html',
        // output as dist/text/index.html
        filename: 'text/index.html'
      }
    },
  }
  