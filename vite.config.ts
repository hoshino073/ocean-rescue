import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/ocean-rescue/, so assets need the
  // repo name as a base path rather than the domain root.
  base: '/ocean-rescue/',
  plugins: [react(), tailwindcss()],
  build: {
    // Three.js is inherently large and is already split into its own lazy chunk.
    chunkSizeWarningLimit: 1000,
  },
})
