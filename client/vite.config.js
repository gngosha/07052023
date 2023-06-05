import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/text.html'),
        anotherNested: resolve(__dirname, 'nested/map.html'),
        tableBody: resolve(__dirname, 'table/body.html'),
        tableMenu: resolve(__dirname, 'table/menu.html'),
        tablesVVP: resolve(__dirname, 'table/tables/vvp.html'),
        tablesICHR: resolve(__dirname, 'table/tables/ichr.html'),
        tablesPopulation: resolve(__dirname, 'table/tables/population.html')
      },
    },
    target: 'esnext',
  },
})

  