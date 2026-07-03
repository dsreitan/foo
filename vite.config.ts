import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works on GitHub Pages project sites
  base: './',
  plugins: [react(), vanillaExtractPlugin()],
})
