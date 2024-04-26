import { resolve } from 'path'
import { defineConfig } from 'vite'
import viteDts from 'vite-plugin-dts'

const PROD = process.env.NODE_ENV === 'production'

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
  esbuild: {
    drop: PROD ? ['console'] : [],
  },
  server: {
    host: true,
  },
})
