import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' })],
  server: {
    open: true
  },
  base: '/frontend/mizzou-scheduler/',
  test: {
    globals: true,       // Use Vitest's global APIs (e.g., `expect`, `describe`)
    environment: 'jsdom', // Simulate a browser environment for DOM testing
  },
});
  

