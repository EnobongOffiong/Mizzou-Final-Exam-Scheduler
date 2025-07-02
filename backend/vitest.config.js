import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // Specify the test environment (in this case, Node.js)
  },
})

