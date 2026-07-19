import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Note: TailwindCSS v4 is integrated via PostCSS (@tailwindcss/postcss),
// not through the Vite plugin. This Vite config is kept for tooling compatibility.
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
