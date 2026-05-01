import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Set `base` to the repository name so assets load correctly on gh-pages
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/emotion-design-system/' : '/',
  plugins: [react()],
}))
