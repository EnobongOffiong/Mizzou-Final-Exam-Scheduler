// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react({ jsxRuntime: 'automatic' })],
//   server: {
//     open: true
//   },
//   base: '/',
//   test: {
//     globals: true,       // Use Vitest's global APIs (e.g., `expect`, `describe`)
//     environment: 'jsdom', // Simulate a browser environment for DOM testing
//   },
// });
  

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  base: '/',
  test: {
    globals: true,
    environment: 'jsdom'
  }
})