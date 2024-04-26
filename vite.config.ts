import { resolve } from 'path'
import { defineConfig } from 'vite'
import viteDts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [viteDts()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      name: 'DOMPlus',
      entry: resolve(__dirname, './src/index.ts'),
      fileName: 'index',
      formats: ['cjs', 'es', 'umd'],
    },
  },
  server: {
    host: true,
  },
})
